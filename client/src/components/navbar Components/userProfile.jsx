import axios from "axios";
import queryString from "query-string";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartItems, removeFromcart, setUserCart } from "../../slices/cartSlice";
import { getUser, removeUser, setUser } from "../../slices/userSlice";
import http from "../../services/httpService"
import { toast } from "react-hot-toast";

const UserProfile = () => {

  const user = useSelector(getUser)

  const query = queryString.stringify({
    client_id: "1030463715027-p7jmac6ju1iia3fbj6a09d6hnt866ec1.apps.googleusercontent.com",
    redirect_uri: 'http://the-sneaker-ecommerce.bhim.me/api/auth/google/callback', // CHANGES ON PRODUCTION to http://localhost:5000/api/auth/google/callback
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '), // space seperated string
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });
  
  // This link takes the user from client to google's sign in page
  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${query}`;

  const dispatch = useDispatch()

  const handleSignOut = async()=>{
    dispatch(setUser())
    dispatch(setUserCart())
    const {status} = await http.get("/api/logout");
    if(status === 200){
      toast("You have been logged-out successfully")
    }
  }

  return (
    <div className="user-profile user-profile--hidden">
      <div className="user-profile__header">
      {user && 
          <>
            <p>Hello, {user.name}</p>
            <Link to="/orders">
              <p style={{"textDecoration": "underline", "fontWeight": "400", "marginTop":"15px" , "cursor": "pointer", "color": "#3b82f6"}}>My orders</p>
            </Link>
          </>
          ||
          <p>Sign in to place an order</p>
      }
      </div>
      <div className="user-profile__body">
        {/* <div className="user-profile__products">
          <p className="empty-cart-message">Your cart is empty.</p>
        </div> */}
          {/* <button className="btn btn--checkout">
            Sign in
          </button> */}
        {
          user && 
          <>
            <button onClick={handleSignOut} className="btn btn--checkout">
              Sign Out
            </button>
          </>
          ||
          <a href={googleLoginUrl}>
          <div class="google-btn">
            <div class="google-icon-wrapper">
              <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
            </div>
            <p class="btn-text">Sign in with google</p>
          </div>
        </a>
        }
      </div>
    </div>
  );
};

export default UserProfile;
