const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const User=require('./models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const download=require('image-downloader');
const path=require('path');
const multer=require('multer');
const Razorpay=require('razorpay');
const crypto=require('crypto');
const Place=require('./models/Place');
const Booking = require('./models/Booking');
require('dotenv').config();
const app=express();

const jwtScretKey=process.env.JWT_SECRET_KEY;
const Razorpay_key_id=process.env.RAZORPAY_KEY_ID;
const Razorpay_secret_id=process.env.RAZORPAY_SECRET_ID;
const PORT=process.env.PORT;

//mongodb connection start
const url=process.env.MONGO_DB_URL;   //lNfkuYaLUvQ5nJfi
mongoose.connect(url);
const conn=mongoose.connection;
conn.once('open',()=>{console.log('database connection successful')});
conn.on('error',()=>{
    console.log('error connecting to data base');
    process.exit();
})
//mongodb connection end

app.use(express.json()); //for parsing data
app.use(cors({
    credentials:true,
    origin:'https://bookfirst.netlify.app/'
}));

// Set up Multer for single file upload
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/');  // Specify the destination folder
    },
    filename:(req,file,cb)=>{
        cb(null,'photo'+Date.now()+'.png')
    }
})
const upload=multer({storage:storage})
app.use(cookieParser());
app.use('/downloads',express.static(path.join(__dirname,'uploads')))


app.post('/register',(req,res)=>{
    const {name,email,password}=req.body;
    const newUser=new User({
        name,
        email,
        password:bcrypt.hashSync(password,10)
    });
    newUser.save()
    .then((result)=>{
        res.json('user registered')
    })
    .catch((error)=>{
        return res.status(500).json('error ocuuring on user creation')
    })
})

app.post('/login',async (req,res)=>{
    const {email,password}=req.body;
    const onlineUser=await User.findOne({email});
    if(onlineUser){
        const passwordTrue=bcrypt.compareSync(password,onlineUser.password);
        if(passwordTrue){
            //creating jwt token
            jwt.sign({id:onlineUser._id,email:onlineUser.email,name:onlineUser.name},jwtScretKey,{},(err,token)=>{
                if(err){
                    throw err
                }else{
                    res.cookie('token',token,{ sameSite: 'None', secure: true }).json(onlineUser)
                }
            })
        }else{
            res.status(422).json('incorrect password')
        }
    }else{
        res.status(404).json({error:'user not found'})
    }
});
app.get('/profile',(req,res)=>{
    const {token}=req.cookies;
    if(token){
        jwt.verify(token,jwtScretKey,async (err,decodedData)=>{
            if (err) throw err
            const {_id,email,name}=await User.findOne({email:decodedData.email})
            res.json({_id,email,name})
        })
    }else{
        res.json(null)
    }
    
    
});
app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true)
});

app.post('/upload-by-link',async (req,res)=>{
    const {link}=req.body;
    const destinationFolder=path.join(__dirname,'uploads')
    const newName='photo'+Date.now()+'.png'
    await download.image({                     //download images from given link and save to the uploads folder
        url:link,
        dest:path.join(destinationFolder,newName)
    })
    .then(({filename})=>{
        res.status(200).json(newName)
    }).catch(err=>{
        res.status(404).json('download failure')
    })

})

app.post('/upload-from-device',upload.single('file'),(req,res)=>{
    const file=req.file;
    if(!file){
        res.status(404).json('upload failed')
    }
    const {filename}=file
    res.status(200).json(filename)
});

app.post('/places',(req,res)=>{
    const {title,address,perks,
          addedPhoto:photos,description,
          extraInfo,checkIn,checkOut,
          maxGuests,price}=req.body

          const {token}=req.cookies;
          if(token){
          jwt.verify(token,jwtScretKey,async (err,decodedData)=>{
            if (err) throw err
            const {_id:owner}=await User.findOne({email:decodedData.email})
            
            const newPlace=new Place({
                owner,
                title,address,perks,
                photos,description,
                extraInfo,checkIn,checkOut,
                maxGuests,price
            });
            await newPlace.save()
            .then((data)=>{
                res.status(200).json('data successfully saved in database')
            }).catch((err)=>{
                res.status(404).json('data not saved in database :',err)
            })
        })
    }
          
});

app.get('/user-places',async (req,res)=>{
          const {token}=req.cookies;
          if(token){
          jwt.verify(token,jwtScretKey,async (err,decodedData)=>{
            if (err) throw err
            const {id}=decodedData;
            const placesDetails=await Place.find({owner:id})
            res.json(placesDetails)
        })}
});

app.get('/places/:placeId',async (req,res)=>{
   const {placeId}= req.params;
   const placesDetails=await Place.findOne({_id:placeId});
   res.json(placesDetails)
   
});

app.put('/places',(req,res)=>{
    const {placeId,title,address,perks,
        addedPhoto:photos,description,
        extraInfo,checkIn,checkOut,
        maxGuests,price}=req.body;
        const {token}=req.cookies;
        if(token){
        jwt.verify(token,jwtScretKey,async (err,decodedData)=>{
          if (err) throw err
          await Place.updateMany({_id:placeId},{$set:{title,address,perks,
            photos,description,
            extraInfo,checkIn,checkOut,
            maxGuests,price}});
            res.status(200).json('data successfully updated')
        })}
        
});

app.get('/places',async (req,res)=>{
    const allPlaces=await Place.find();
    res.json(allPlaces)
});

app.get('/place/:id',async (req,res)=>{
    const {id}=req.params;
    const placeDetails=await Place.findById(id)
    res.json(placeDetails)
});

app.post('/booking',async (req,res)=>{
    const {token}=req.cookies;
        if(token){
        jwt.verify(token,jwtScretKey,async (err,decodedData)=>{
          if (err) throw err
          const userId=decodedData.id
          const {placeId,checkin,checkout,
            maxguests,name,mobile,bookingPrice}=req.body
      const newBooking=new Booking({
            place:placeId,userId,checkin,checkout,
            maxguests,name,mobile,bookingPrice
      })
      newBooking.save().then(result=>{
          res.json(result)
      }).catch(err=>{
          res.status(500)
      })
        })}
});

app.get('/bookings',(req,res)=>{
    const {token}=req.cookies;
    if(token){
    jwt.verify(token,jwtScretKey,(err,decodedData)=>{
      if (err) throw err
      const userId=decodedData.id;
      Booking.find({userId}).populate('place').then(result=>{
        res.json(result)
      }).catch(err=>{
        res.status(404).json('no data found')
      })
    })}
});

const razorpay = new Razorpay({ key_id: Razorpay_key_id, key_secret: Razorpay_secret_id });
app.post('/order',(req,res)=>{
    const {bookingPrice}=req.body
    try{
        var options = {
            amount: bookingPrice*100,
            currency: "INR",
            receipt: "order_rcptid_"+Date.now(),
          };
        razorpay.orders.create(options,(err,order)=>{
            if(err) throw err
            res.json(order)
        });
    }catch(err){
        res.status(500).json(err)
    }
});
app.post('/order/validate',(req,res)=>{
    const {razorpay_payment_id,razorpay_order_id,razorpay_signature}=req.body;
    const sha=crypto.createHmac('sha256',Razorpay_secret_id);
    sha.update(razorpay_order_id + "|" + razorpay_payment_id);
    const digest=sha.digest('hex');
    if (digest !== razorpay_signature) {
        return res.status(400).json({msg:'transaction is not legit'})
      } else {
        res.json({
            msg:'transaction succesful',
            orderId:razorpay_order_id,
            paymentId:razorpay_payment_id,
        })
      }

});

app.listen(PORT,()=>console.log('server started'))