import './eventshome.css';
import img1 from "./eventimages/Biz Plan.png"
import img2 from "./eventimages/Brain-It-Out.png"
import img3 from "./eventimages/Case Study.png"
import img4 from "./eventimages/HackUrWay.png"
import img5 from "./eventimages/Mock IPL.png"
import img6 from "./eventimages/Reel-o-mania.png"
import img7 from "./eventimages/Stockify.png"
import img8 from "./eventimages/Tweeters.png"


function App() {
  return (
    <div className="App">
      <div class="images">
        <img src={img1} alt=""/>
        <img src= {img2}alt=""/>
        <img src={img3} alt=""/>
        <img src= {img4}alt=""/>
        <img src={img5} alt=""/>
        <img src= {img6}alt=""/>
        <img src= {img7}alt=""/>
        <img src={img8}alt=""/>
      </div>
    </div>
  );
}

export default App;