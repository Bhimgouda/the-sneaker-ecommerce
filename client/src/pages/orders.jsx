import { useSelector } from 'react-redux';
import Order from '../components/order';
import { getUser } from '../slices/userSlice';

function Orders() {
    const user = useSelector(getUser);
    const {orders} = user ? user : {};
    
return (
    <div className='orders'>
        <h1 className='title title--underline'>Your Orders</h1>

        {user && user._id ? 
            (<p className='title title--small'>{orders && orders.length} orders</p>) :
            (<p>Please Sign in to see your orders</p>)
        }

        <div className='orders__display'>
            {orders && orders.map((order, index)=>{
               return <Order key={index} order={order} />
            })}
        </div>
    </div>
  )
  
}

export default Orders;