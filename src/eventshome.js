import './eventshome.css';
import img1 from "./eventimages/Biz Plan.png"
import img2 from "./eventimages/Brain-It-Out.png"
import img3 from "./eventimages/Case Study.png"
import img4 from "./eventimages/HackUrWay.png"
import img5 from "./eventimages/Mock IPL.png"
import img6 from "./eventimages/Reel-o-mania.png"
import img7 from "./eventimages/Stockify.png"
import img8 from "./eventimages/Tweeters.png"
import Footer from "./Footer";
import Header from "./Header";


function App() {
  return (
    <div className="App">
      <Header/>
      <div className='events'>
        <h1 className='E-header'>EVENTS</h1>
        <div class="images">
          <img src={img1} className="img" alt=""/>
          <img src= {img2} className="img" alt=""/>
          <img src={img3} className="img" alt=""/>
          <img src= {img4} className="img" alt=""/>
          <img src={img5} className="img" alt=""/>
          <img src= {img6} className="img" alt=""/>
          <img src= {img7} className="img" alt=""/>
          <img src={img8} className="img" alt=""/>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
