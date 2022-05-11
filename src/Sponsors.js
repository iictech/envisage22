import sponsors2 from "./images/sponsors/2021/sponsor2.png"
import sponsors1 from "./images/sponsors/2021/sponsor1.png"
import sponsors3 from"./images/sponsors/2021/sponsor3.png"
import sponsors4 from"./images/sponsors/2021/sponsor4.png"
import sponsors5 from"./images/sponsors/2021/sponsor5.png"
import sponsors6 from"./images/sponsors/2021/sponsor6.png"
import sponsors7 from"./images/sponsors/2021/sponsor7.png"
import sponsors8 from"./images/sponsors/2021/sponsor8.png"
import sponsors9 from"./images/sponsors/2021/sponsor9.jpg"
import sponsors10 from"./images/sponsors/2021/sponsor10.png"
import Footer from "./Footer";
import Header from "./Header";

import React from  "react";
import "./sponsors_header.css";
function App2(){
    return (<>
              <Header/>
    <div className="slidetop">
    <a href="#main"><i className="fas fa-arrow-up"></i></a>
</div>
<div id="main" style={{backgroundColor:"Silver"}}>
    
    <header className="wrapper">
        <h1 id="sponsor">SPONSORS</h1>
        <div className="container">
            <div className="sponsor_container">
                <img src={sponsors2} alt=""/>
                <h2>Supported By</h2>
            </div>
            <div className="sponsor_container">
                <img src={sponsors1} alt=""/>
                <h2>Event Partner</h2>
            </div>
            <div className="sponsor_container">
                <img src={sponsors3} alt=""/>
                <h2>Trading Partner</h2>
            </div>
            <div className="sponsor_container">
                <img src={sponsors4} alt=""/>
                <h2>Event Partner</h2>
            </div>
            <div className="sponsor_container">
                <img src={sponsors5} alt=""/>
                <h2>Platform Partner</h2>
            </div>
            <div className="sponsor_container">
                <img src={sponsors6} alt=""/>
                <h2>Startup Travelling Partner</h2>
            </div>
            <div className="sponsor_container">
                <img src={sponsors7} alt=""/>
                <h2>Energy Drink Partner</h2>
            </div>
            <div className="sponsor_container">
                <img src={sponsors8} alt=""/>
                <h2>Event Partner</h2>
            </div>
            <div className="sponsor_container">
                <img src={sponsors9} alt=""/>
                <h2>Event Partner</h2>
            </div>
            <div className="sponsor_container">
                <img src={sponsors10} alt=""/>
                <h2>Event Partner</h2>
            </div>
        </div>
    </header>
</div>
    <Footer/>
    </>)
}
export default App2
