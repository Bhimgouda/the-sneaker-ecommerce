import React from "react";
import {useDispatch, useSelector} from "react-redux"
import { getUser, removeUser } from "../../slices/userSlice";
import queryString from "query-string"
import { getTotalQuantity } from "../../slices/cartSlice";

const UserSection = ({ onCartClick }) => {

  const totalquantity = useSelector(getTotalQuantity)

    // This is to generate a query string
    const query = queryString.stringify({
      client_id: "1030463715027-p7jmac6ju1iia3fbj6a09d6hnt866ec1.apps.googleusercontent.com",
      redirect_uri: 'http://localhost:5000/api/auth/google/callback',
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ].join(' '), // space seperated string
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
    });
    
    // This link takes the user from client to google's sign in page
    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${query}`

  const user = useSelector(getUser);
  const dispatch = useDispatch()

  const handleLogout = ()=>{
    dispatch(removeUser())
  }

  return (
    <div className="user-section">
      <div onClick={onCartClick} className="user__cart-icon">
        <span className="user__total-quantity">{totalquantity}</span>
        <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
            fill="hsl(219, 9%, 45%)"
            fillRule="nonzero"
          />
        </svg>
      </div>
      <div className="user__profile">
        {
          user ?
          <div onClick={handleLogout} className="user__image">
            <img loading="lazy" src={user.profilePic} alt="" />
          </div>
          :
          <div className="user__login">
              <a href={googleLoginUrl} className="nav__links">Login</a>
          </div>
        }
      </div>
    </div>
  );
};

export default UserSection;
