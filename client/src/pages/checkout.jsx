import React from 'react'
import { useSelector } from 'react-redux'
import CheckoutProduct from '../components/CheckoutProduct'
import { getCartItems, getTotalQuantity, itemsSubTotal } from '../slices/cartSlice'
import { getUser } from '../slices/userSlice'
import { loadStripe } from "@stripe/stripe-js"
import http from "../services/httpService" 
const stripePromise = loadStripe("pk_test_51MRGDdSJE2KPi040JA7fV8PuGD8isSp5WG8qj6sDDzDiC6yzplfq79kCiKgwWhKJqoo2A1axfVewQoqBmrb8P8qP00TNrPxZyd")

function Checkout() {

    const items = [...useSelector(getCartItems)]
    const user = useSelector(getUser)
    const totalItems = useSelector(getTotalQuantity)
    const itemsSubtotal = useSelector(itemsSubTotal)

    const createCheckoutSession = async()=>{
        const stripe = await stripePromise;

        // Calling the backend to create a stripe checkout session and get the session id
        const {data: sessionId} = await http.post("/api/create-checkout-session", {
          items,
          email: user.email,
        })

        const checkout = await stripe.redirectToCheckout({
          sessionId
        }
        )

        if(checkout.error) alert(checkout.error.message);
    }

  return (
    <div className='bg-gray-100'>
      <main className='checkout container'>

        {/* Left part */}
        <div className="checkout__left">

          <div className="checkout__basket">
            <h1 className="checkout__title">{items.length ? "Your Shopping cart": "Your shopping cart is empty"}</h1>

            {items.map((item, index)=>{
              return <CheckoutProduct key={index} item={item} />
            })}
          </div>
        </div>

        {/* Right Part */}
        {
          items.length ? 
            <div className='checkout__right'>
            <h5 className='checkout__right__subtotal'>Subtotal ({totalItems} Items): <span style={{"fontWeight":"bolder"}}> <span className="price">{itemsSubtotal}</span></span></h5>
              {user ?
              <button onClick={createCheckoutSession} role="link" className='btn btn--checkout' >Proceed to Checkout</button> : 
              <button disabled={!user} className='btn'>Sign in to Checkout</button>
              }
            </div>
            : null
        }
      </main>
    </div>
  )
}

export default Checkout