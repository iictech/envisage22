import img1 from "./images/gallery/img1.jpg"
import img2 from "./images/gallery/img2.jpg"
import img3 from "./images/gallery/img3.jpg"
import img4 from "./images/gallery/img4.jpg"
import img5 from "./images/gallery/img5.jpg"
import img23 from "./images/gallery/img23.jpeg"
import img6 from "./images/gallery/img6.jpeg"
import img7 from "./images/gallery/img7.jpg"
import img8 from "./images/gallery/img8.jpg"
import img9 from "./images/gallery/img19.jpg"
import img26 from "./images/gallery/img26.jpeg"
import img11 from "./images/gallery/img11.jpg"
import img12 from "./images/gallery/img12.jpg"
import img13 from "./images/gallery/img13.jpg"
import img14 from "./images/gallery/img14.jpg"
import img22 from "./images/gallery/img22.jpg"
import img25 from "./images/gallery/img25.jpeg"
import newimg1 from "./images/gallery/newimg1.jpg"
import newimg2 from "./images/gallery/newimg2.jpg"
import newimg3 from "./images/gallery/newimg3.jpg"
import newimg4 from "./images/gallery/newimg4.jpg"
import newimg5 from "./images/gallery/newimg5.jpg"
import imager from "./images/gallery/imager.jpeg"
import newimg7 from "./images/gallery/newimg7.jpg"
import React from  "react";
import './App.css';
import './gallery.css';
import Footer from "./Footer";
import Header from "./Header";

function App() {
  return (
    <>
    <Header/>
    <div className="slidetop">
        <a href="#main"><i className="fas fa-arrow-up"></i></a>
    </div>
    <div id="main" style={{backgroundColor:"Black"}}>
        <header className="neon">
            <h1>GALLERY</h1>
            <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' width='71px' height='11px'>
                <path fill-rule='evenodd'
                    d='M59.669,10.710 L49.164,3.306 L39.428,10.681 L29.714,3.322 L20.006,10.682 L10.295,3.322 L1.185,10.228 L-0.010,8.578 L10.295,0.765 L20.006,8.125 L29.714,0.765 L39.428,8.125 L49.122,0.781 L59.680,8.223 L69.858,1.192 L70.982,2.895 L59.669,10.710 Z' />
            </svg>
        </header>
        <div className="container">
            <div className="row">
                <div className="img"><img src={newimg1} alt=""/></div>
                <div className="img"><img src={newimg2} alt=""/></div>
                <div className="img"><img src={newimg3} alt=""/></div> 
                <div className="img"><img src={newimg4} alt=""/></div>
                <div className="img"><img src={newimg5} alt=""/></div>
                <div className="img"><img src={imager} alt=""/></div>
                <div className="img"><img src={newimg7} alt=""/></div>
            </div>
            <div className="row">
                <div className="img"><img src={img1} alt=""/></div>
                <div className="img"><img src={img2} alt=""/></div>
                <div className="img"><img src={img3} alt=""/></div>
                <div className="img"><img src={img4} alt=""/></div>
                <div className="img"><img src={img5} alt=""/></div>
                <div className="img"><img src={img23} alt=""/></div>
            </div>
            <div className="row">
                <div className="img"><img src={img6} alt=""/></div>
                <div className="img"><img src={img7} alt=""/></div>
                <div className="img"><img src={img8} alt=""/></div>
                <div className="img"><img src={img9} alt=""/></div>
                <div className="img"><img src={img26} alt=""/></div>
            </div>
            <div className="row">
                <div className="img"><img src={img11} alt=""/></div>
                <div className="img"><img src={img12} alt=""/></div>
                <div className="img"><img src={img13} alt=""/></div>
                <div className="img"><img src={img14} alt=""/></div>
                <div className="img"><img src={img22} alt=""/></div>
                <div className="img"><img src={img25} alt=""/></div>
            </div>
        </div>
    </div>
    <Footer/>
    </>
  );
}

export default App;
