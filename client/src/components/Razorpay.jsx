import axios from 'axios';
import React from 'react'

function Razorpay({booking}) {
  async function paymentHandler(e){
    const {data}=await axios.post('/order',booking);
    var options = {
      "key": "rzp_test_idNIYZeNs4uhA5", // Enter the Key ID generated from the Dashboard
      "amount": (booking.bookingPrice)*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "booking app",
      "order_id": data.id, 
      "handler": function (response){
        axios.post('/order/validate',response).then(({data})=>{
          alert(data.msg);
          alert(data.orderId);
          alert(data.paymentId)
        })
          
      },
      "prefill": {
          "name": "manu",
          "email": "manu@gmail.com",
          "contact": "9745241752"
      },
      /*"notes": {
          "address": "Razorpay Corporate Office"
      },*/
      "theme": {
          "color": "#3399cc"
      }
  };
  var rzp1 = new window.Razorpay(options);
  rzp1.on('payment.failed', function (response){
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
  });
  rzp1.open();
e.preventDefault();
}
  return (
    <div>
      <button className='bg-primary p-5 rounded-2xl text-white text-center mt-2 sm:mt-0' onClick={paymentHandler}>
          <p className='text-sm'>Pay now</p>
          <h2 className='text-xl'>₹{booking.bookingPrice}</h2>
      </button>
    </div>
  )
}

export default Razorpay