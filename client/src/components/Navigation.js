import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";
import Logo from "../assets/images/coolr-logo.png";

// actions
import { unrenderSinglePost } from "../actions/singlePostSubs";
import { renderLikedPost } from "../actions/likedPostsSubs";
import { unrenderLikedPost } from "../actions/likedPostsSubs";
import { renderProfile } from "../actions/profileSubs";
import { unrenderProfile } from "../actions/profileSubs";
import { getProfile } from "../actions/profile";

const navLinks = [
   {
      linkName: "Home",
      path: "/home",
      linkIcon: "fa fa-home",
   },
   {
      linkName: "Liked",
      path: "/liked",
      linkIcon: "far fa-heart",
   },
   {
      linkName: "Profile",
      path: "/profile",
      linkIcon: "far fa-user",
   },
   {
      linkName: "Search",
      path: "/search",
      linkIcon: "fas fa-search",
   },
   {
      linkName: "Logout",
      linkIcon: "fas fa-sign-out-alt",
   },
];

const Navigation = ({
   logout,
   unrenderSinglePost,
   unrenderLikedPost,
   renderLikedPost,
   renderProfile,
   unrenderProfile,
   user,
   getProfile,
}) => {
   const listAction = (link) => {
      if (link.linkName === "Logout") {
         logout();
      } else if (link.linkName === "Home") {
         unrenderSinglePost();
         unrenderLikedPost();
         unrenderProfile();
      } else if (link.linkName === "Liked") {
         renderLikedPost();
         unrenderSinglePost();
         unrenderProfile();
      } else if (link.linkName === "Profile") {
        getProfile(user.id).then(() => {
            renderProfile();
            unrenderSinglePost();
            unrenderLikedPost();
         });
      } else {
         alert("works");
      }
   };

   const logoAction = () => {
      unrenderSinglePost();
      unrenderLikedPost();
      unrenderProfile();
   };

   return (
      <nav className="site-nav">
         <div className="menu-content-container">
            <ul>
               <img
                  src={Logo}
                  id="nav-site-logo"
                  onClick={() => logoAction()}
               />
               {navLinks.map((link, i) => (
                  <li onClick={() => listAction(link)} key={i}>
                     <Link className="wide">
                        <i className={link.linkIcon}></i>
                        <p>{link.linkName}</p>
                     </Link>
                  </li>
               ))}
            </ul>
         </div>
      </nav>
   );
};

const mapStateToProps = (state) => ({
   user: state.auth.user
});

export default connect(mapStateToProps, {
   logout,
   unrenderSinglePost,
   renderLikedPost,
   unrenderLikedPost,
   renderProfile,
   unrenderProfile,
   getProfile,
})(Navigation);
