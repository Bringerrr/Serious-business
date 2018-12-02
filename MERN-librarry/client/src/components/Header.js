import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Header.css"

// var header = document.getElementsByClassName("Header");
// var li = document.getElementsByClassName("MainMenu_Item");

// window.onscroll = function() {
//     var scrolled = window.pageYOffset
//     if(scrolled > 0){
//         for (let i = 0; i < li.length; i++) {
//                 li[i].style.color = "red";
//         }
//         header[0].style.backgroundColor = ""
//             }
//     else {
//         for (let i = 0; i < li.length; i++) {
//              li[i].style.color = "white";
//         }
//         header[0].style.backgroundColor = "black"
//     }
// }

class Header extends React.Component {

  render() {

    return (
      <div>
        <div  id="Main" className="Header">
                <NavLink to="/" exact className="MainMenu_Item">Home</NavLink>
                <NavLink to="/films"className="MainMenu_Item" activeClassName="ActivePageLink">Search Film</NavLink>
                <NavLink to="/userlib" className="MainMenu_Item" activeClassName="ActivePageLink">User Library</NavLink>
        </div>
        <div className="Gap">
          <div className="Header opacity">
                <NavLink to="/" exact className="MainMenu_Item">Home</NavLink>
                <NavLink to="/films"className="MainMenu_Item" activeClassName="ActivePageLink">Search Film</NavLink>
                <NavLink to="/userlib" className="MainMenu_Item" activeClassName="ActivePageLink">User Library</NavLink>
          </div>
        </div>

      </div>
    );
  }
}

export default Header;
    