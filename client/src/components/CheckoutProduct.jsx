import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { cartItemQuantityDecrementer, cartItemQuantityIncrementer, removeFromcart } from '../slices/cartSlice'


function CheckoutProduct({item}) {
   const dispatch = useDispatch()

    const handleItemIncrease = ()=>{
        dispatch(cartItemQuantityIncrementer(item._id))
      }
      
    const handleItemDecrease = (id)=>{
        dispatch(cartItemQuantityDecrementer(item._id))
    }
      
    const handleRemoveItem = (id)=>{
      dispatch(removeFromcart(item._id))
    }
    
  return (
    <div className='checkout__product'>
        <Link to={`/product/${item._id}`}>
          <img loading="lazy" className='checkout__product__image' src={item.images[0]} alt="" />
        </Link>

        <div className='checkout__product__info'>
            <p className='checkout__product__title'>{item.name}</p>
            <div>
                {Array(item.rating)
                  .fill()
                  .map((star,index)=>{
                      // return <FontAwesomeIcon key={index} style={{"color":"#facc15"}} icon={faStar}/>
                })}
            </div>
            <p className='checkout__product__description line-clamp-2'>{item.desc}</p>
            <div className='checkout__product__price'>
              <span>${item.discountedPrice}</span>
            </div>
        </div>

        <div className='checkout__product__buttons'>
            <div className='checkout__product__quantity-display' >
              <button onClick={handleItemDecrease} className='btn btn--quantity '>-</button>
                <span className='checkout__product__quantity'>{item.quantity}</span>
              <button onClick={handleItemIncrease} className='btn btn--quantity '>+</button>
            </div>
            <button onClick={handleRemoveItem} className='btn btn--remove'>Remove</button>
        </div>
    </div>
  )
}

export default CheckoutProduct