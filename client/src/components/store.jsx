import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CategoryHelper from "./../utils/categoryHelper";
import { getProducts } from "./../fakeDatabase";
import ProductInStore from "./productsInStore";
import axios from "axios";
import{ useDispatch }from 'react-redux'
import {setUser} from '../slices/userSlice'

const Store = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    const getCurrentUser = async()=>{
      try{
        const {data} = await axios.get('/api/current-user');
        console.log(data)
        dispatch(setUser(data))
      }
      catch(e){
        console.log(e)
      }
    }
    getCurrentUser()

    setProducts(productsInStock);

  }, [useParams()]);

  let productsInStock = [...getProducts()];
  const { id: category } = useParams();
  if (category) {
    productsInStock = CategoryHelper(category, [...productsInStock]);
  }

  return (
    <div className="store__product-gallery container">
      {products.map((product) => (
        <Link key={product._id} to={`product/${product._id}`}>
          <ProductInStore product={product} />
        </Link>
      ))}
    </div>
  );
};

export default Store;
