import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { cartItemQuantityDecrementer, cartItemQuantityIncrementer, removeFromcart } from '../slices/cartSlice'


function CheckoutProduct({item}) {


  let {product={}, quantity} = item;

   const dispatch = useDispatch()

    const handleItemIncrease = async()=>{
        dispatch(cartItemQuantityIncrementer(product._id))
        try {
          await axios.patch(`/api/cart/${product._id}`, {quantity: 1})
        } catch (e) {
          // error handling
        }
      }
      
    const handleItemDecrease = async()=>{
        dispatch(cartItemQuantityDecrementer(product._id))
        try{
          await axios.patch(`/api/cart/${product._id}`, {quantity: -1})
        }
        catch(e){
          
        }
    }
      
    const handleRemoveItem = async(id)=>{
      dispatch(removeFromcart(product._id))
      try {
        await axios.delete(`/api/cart/${product._id}`)
      } catch (e) {
        
      }
    }
    
  return (
    <div className='checkout__product'>
        <Link to={`/product/${product._id}`}>
          <img loading="lazy" className='checkout__product__image' src={product.images && product.images[0]} alt="" />
        </Link>

        <div className='checkout__product__info'>
            <p className='checkout__product__title'>{product.name}</p>
            <div>
                {Array(product.rating)
                  .fill()
                  .map((star,index)=>{
                      // return <FontAwesomeIcon key={index} style={{"color":"#facc15"}} icon={faStar}/>
                })}
            </div>
            <p className='checkout__product__description line-clamp-2'>{product.desc}</p>
            <div className='checkout__product__price'>
              <span>${product.discountedPrice}</span>
            </div>
        </div>

        <div className='checkout__product__buttons'>
            <div className='checkout__product__quantity-display' >
              <button onClick={handleItemDecrease} className='btn btn--quantity '>-</button>
                <span className='checkout__product__quantity'>{quantity}</span>
              <button onClick={handleItemIncrease} className='btn btn--quantity '>+</button>
            </div>
            <button onClick={handleRemoveItem} className='btn btn--remove'>Remove</button>
        </div>
    </div>
  )
}

export default CheckoutProduct