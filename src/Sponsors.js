import './components/sponsorcard.css'
import SponsorCard from './components/sp-card.js'
import Footer from "./Footer";
import Header from "./Header"

function App() {
  return (
    <>
      <Header/>
      <div className="sponsors">
        <SponsorCard/>
      </div>
      <Footer/>
    </>
  );
}

export default App;
