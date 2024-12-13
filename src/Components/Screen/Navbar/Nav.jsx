import React from 'react'
import "./Nav.css"
import card from '../../../Assets/Images/cardicon.png'
const Nav = () => {
    return (
        <>
        <nav class="navbar navbar-expand-lg ">
            <div class="container-fluid">
                <p>WELCOME MR/MOHAMED AHMED</p>

                <div className="search">
                    <div className="cardicon"><img src={card} /></div>
                    <input class="form-control " type="search" placeholder="Search" aria-label="Search" />
                </div>
            </div>
           

        </nav>
         <div className="line"></div>
         </>
    )
};

export default Nav