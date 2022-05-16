async function displayRazorpay(){
    //POST request to Nodejs
    const data = await fetch("https://stormy-journey-29948.herokuapp.com/razorpay",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          price: 1,
        }),
    }).then((t)=> t.json())
    const options = {
        key: "rzp_live_u6DNFurSsXh9o3",
        currency: data.currency,
        amount: data.amount,
        description: '',
        image: 'https://stormy-journey-29948.herokuapp.com/logo.jpg',
        order_id: data.id,
        handler: function(response){
            
        },
    };
  
    const paymentObject = new window.Razorpay(options)
    paymentObject.on('payment.failed', function (response){
      alert("Payment Failed");
  });
    paymentObject.open()
  }
export default function Test(){
    return(<div>
    <button onClick={displayRazorpay} className="bg-white text-black p-4 border-2">Test Pay</button>
    </div>)
}