import React from 'react'

function Checkout() {
  return (
    <div className='bg-gray-100'>
      <main className='checkout'>

        {/* Left part */}
        <div className="checkout__left">
          <img loading="lazy" className='checkout__banner' style={{"maxWidth":"1020px", "maxHeight": "250px", "objectFit":"contain"}} src="https://links.papareact.com/ikj"/>
          <div className="checkout__basket">
            <h1 className='title title--underline'>{items.length ? "Your Shopping basket": "Your Amazon basket is empty"}</h1>

            {items.map((item, index)=>{
              return <CheckoutProduct key={index} item={item} />
            })}
          </div>
        </div>

        {/* Right Part */}
        {
          items.length ? 
            <div className='checkout__right'>
            <h5 className='checkout__right__subtotal'>Subtotal ({items.length} Items): <span style={{"fontWeight":"bolder"}}> ₹{itemsSubtotal}</span></h5>
              {user._id ?
              <button onClick={createCheckoutSession} role="link" className='btn btn--atc btn--checkout' >Proceed to Checkout</button> : 
              <button disabled={!user} className='btn btn--grey'>Sign in to Checkout</button>
              }
            </div>
            : null
        }

      </main>
    </div>
  )
}

export default Checkout