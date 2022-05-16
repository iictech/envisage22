import './components/sponsorcard.css'
import SponsorCard from './components/sp-card.js'
import Footer from "./Footer";
import Header from "./Header"

function App() {
  return (
    <div className='full'>
      <Header/>
      <div className='sp-header-wrap'>
        <h1 className='sp-header threeD'> Sponsors </h1>
      </div>
      <div className="sponsors">
        <SponsorCard/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
