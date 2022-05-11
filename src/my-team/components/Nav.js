import React from "react";
import {GiHamburgerMenu} from "react-icons/gi"
import {ImCross} from "react-icons/im"
import '../nav.css'
import tig from '../images/navbarimg1.png'
import iic from '../images/navbarimg2.png'

export default function Nav() {

    const [openmenu, setMenu] = React.useState(false);

    console.log(openmenu);

    const menuOpen = () => {
        return (
            <div className={`menuOpt ${openmenu}`}>
                <div className="backContainer">
                    <ImCross onClick={() => {
                        setMenu(false)
                    }} style={{cursor:"pointer",margin:"5px 8px"}}/>
                </div>
                <div className="menuLinks">
                    <a href="#">Home</a>
                    <a href="/events">Events</a>
                    <a href="/etalk">E-Talk</a>
                    <a href="/team">Team</a>
                    <a href="/gallery">Gallery</a>
                    <a href="/sponsors">Sponsors</a>
                    {/* <a href="#">About</a> */}
                </div>
            </div>
        )
    }
    const menuBackground = () => { 
        return (
            <div className={`menuBackground ${openmenu}`} onClick={() => {setMenu(false)}}></div>
        )
    }

    return (
        <>
        {menuOpen()}
        {menuBackground()}
        <div className="navBar">
            <div className="companyLogo">
                <img className='tig' src= {tig} alt=''/>
                <img className='iic' src= {iic} alt=''/>
            </div>
                <div className="navMenu" onClick={() => {
                    setMenu(true)
                }}>
                <GiHamburgerMenu style={{cursor:"pointer"}}/>
            </div>
        </div>

            
        </>
    );
}