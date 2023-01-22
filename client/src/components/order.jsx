import React from 'react'
import { Link } from 'react-router-dom';

function Order({order}) {

  const { _id, orderAmount, shippingAddress, shippingAmount, images, orderDate } = order;

  return (
    <div className='order'>
      <div className='order__top'>
          <div className='order__top__section1'>
            <p className='order__top__title'>ORDER PLACED</p>
            <p className='order__top__title__values'>{orderDate}</p>
          </div>
          <div className='order__top__section2'>
            <p className='order__top__title'>TOTAL</p>
            <p className='order__top__title__values price'>{`₹${orderAmount} - ${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.postal_code}`}</p>
          </div>

            <p className='order__top__items__count' > {images.length} items</p>
            <p className='order_id'>ORDER # {_id}</p>

      </div>
      <div className='order__bottom'>
        {images.map(image=><Link to={`/product/${_id}`}><img className='order__image' src={image} /></Link>)}
      </div>
    </div>
  )
}

export default Order;