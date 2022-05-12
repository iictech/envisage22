import './sponsors.css';
import cfp from './images/sponsor_images/cfp.png'
import d2c from './images/sponsor_images/d2c.png'
import ff from './images/sponsor_images/ff.png'
import lwt from './images/sponsor_images/lwt.png'
import sol from './images/sponsor_images/solvoix.png'
import Footer from "./Footer";
import Header from "./Header"

// LWT Knowledge Partner
// Co Founder's Planet Event Partner for Biz-Plan (only) 
// Powered By Unstop (Formerly D2C)
// FreeFlow -> Ecosystem partner
// Solvoix -> Events Partner

function App() {
  return (
    <div className="App">
      <Header/>
      <h1 className='sp-header box threeD'>Sponsors</h1>
      <div className='sponsors'>
          <div className='EP'>
            <h1 className='partner-header'>Events Partner</h1>
            <div className='flex-box'>        
              <div className='img-name'>
                <img className="sp-logos"src = {sol} alt=''/>
                <p className="sp-name">Solvoix</p>  
              </div>
              <div className='img-name'>
                <img className="sp-logos"src = {cfp} alt=''/>
                <p className="sp-name">Co Founder's Planet</p>
              </div>
            </div>
          </div>

        <div className='KP'>
          <h1 className='partner-header'>Knowledge Partner</h1>
          <div className='flex-box'>
            <div className='img-name'>
              <img className="sp-logos"src = {lwt} alt=''/>
              <p className="sp-name">Learning With Travel</p>
            </div>
          </div>
        </div>

        <div className='PB'>
          <h1 className='partner-header'>Powered By</h1>
          <div className='flex-box'> 
            <div className='img-name'>
              <img className="sp-logos"src = {d2c} alt=''/>
              <p className="sp-name">Unstop (Formerly D2C)</p>
            </div>    
          </div>
        </div>

        <div className='ESP'>
          <h1 className='partner-header'>Ecosystem Partner</h1>
          <div className='flex-box'>
            <div className='img-name'>
              <img className="sp-logos"src = {ff} alt=''/>
              <p className="sp-name">FreeFlow Ecosystem partner</p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
