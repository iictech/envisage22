import './Events.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faExternalLink, faBookOpen, faCartFlatbed, faChartGantt, faBrain, faCode, faBaseballBatBall, faBusinessTime } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
const events = [
    {
        name:'Biz Plan',
        description:'Young entrepreneurs with creative minds will have an opportunity of presenting their fresh and innovative business ideas, in front of an esteemed panel of judges, with a chance of getting rewarded generously. Apart from their valuable feedback and unique insights into industrial requirements, participants will also stand a chance of getting rewarded for their practical innovation and pitching skills.',
        id:'biz_plan',
        logo:faChartLine,
        price:'100',
        isTeamEvent:true,
    },
    {
        name:'Case Study',
        description:'A case challenge where participants with strong business and problem- solving skills compete among themselves to develop the best solution to a real business case study within a given time frame. Participants can showcase their great analytical and presenting skills and prove their entrepreneurial mettle.',
        id:'case_study',
        logo:faBookOpen,
        price:'20',
        isTeamEvent:true
    },
    {
        name:'Stockify',
        description:'An online simulation trading game where one can create and manage their own portfolio to compete with other players. One needs to have good trading and analytical skills in a fidgety environment to conquer this game of finance.',
        id:'stockify',
        logo:faChartGantt,
        price:'60',
        isTeamEvent:false
    },
    {
        name:'Brain-it-Out',
        description:'An exciting quiz where participants are quizzed on relevant business, technology and innovation topics and the team with the most answers correct, wins the game. to analyse your brain capacity and grip over the business world.',
        id:'brain_it_out',
        logo:faBrain,
        price:'100',
        isTeamEvent:true
    },
    {
        name:'Hack Ur Way',
        description:'A competitive hackathon where students can proliferate their hands-on skills on problem-solving abilities and design web/software solutions to the relevant problem statements like healthcare, public services, etc. It is a great opportunity for them to exhibit their cognitive expertise and come up with solutions to problems involving daily life circumstances.',
        id:'hackathon',
        logo:faCode,
        price:'150',
        isTeamEvent:true
    },
    {
        name:'Mock IPL',
        description:'A real-time mock IPL Auction where every team gets a fixed amount of virtual money which they can use to bid on international T20 players. The team with strong analytical and strategic skills wins the game. This game requires proper planning and presence of mind. So buckle yourself and be ready to assemble your fantasy team.',
        id:'mock_ipl',
        logo:faBaseballBatBall,
        price:'150',
        isTeamEvent:true
    },
    {
        name:'Business Debate',
        description:'An engaging event where participants will be tested on their ability to analyse market problems and present viable arguments to convince the audience via their debating and oratory skills.',
        id:'biz_debate',
        logo:faBusinessTime,
        price:'50',
        isTeamEvent:false
    },
    {
        name:'Reel O Mania',
        description:'Passionate filmmakers will compete among themselves by creating short films / videos on certain topics provided by us, to showcase their creativity and the power of storytelling. Participants will create intriguing reels on given topics based on technology, innovation, business and promulgate your ideas.',
        id:'reels',
        logo:faChartLine,
        price:'0',
        isTeamEvent:false
    }
]
function Events() {
    const [linkico, setlinkico] = useState(false);
    const [cartCounter, setcartCounter] = useState(0);
    const [cartOpen, setcartOpen] = useState(false);
    const [teamOpen, setTeamOpen] = useState(false);
    const [cartItems, setcartItems] = useState({});
    const [subtotal, setSubtotal] = useState(0);
    const [charges, setCharges] = useState(0);
    useEffect(() => {
        setcartCounter(Object.keys(cartItems).length);
        let subtotal = 0;
        Object.keys(cartItems).forEach(key => {
            subtotal += parseFloat(events.find(event => event.id === key).price);
        })
        setSubtotal(subtotal);
        setCharges(subtotal * 2 / 100);
    } , [cartItems]);
  return (
    <div className="event-body">
        <div className="event-container">
            <div className="event-header">
                <h1>All Events</h1>
            </div>
            <div className="event-content">
              <div className="events-list">
                {events.map((event,index)=>(
                    <div className="event-item" key={index} onMouseEnter={()=>{
                        setlinkico(true);
                    }}
                    onMouseLeave={()=>{
                        setlinkico(false);
                    }}
                    >
                        <div className="event-item-header">
                        <div className="event-logo"><FontAwesomeIcon icon={event.logo} /></div>
                            <span>{event.name} &nbsp;{linkico ? <FontAwesomeIcon icon={faExternalLink} size="sm"/>:''}</span>
                        </div>
                        <div className="event-item-content">
                        {event.description}
                        <p>Registration Price : ₹ {event.price}</p>
                        </div>
                        <div className="event-button-container">
                        <button className="event-register-button" onClick={(e)=>{
                            if(events.isTeamEvent){

                            } else {
                              setcartItems({...cartItems, [event.id]:true});
                            }
                            e.target.disabled = true;
                        }} disabled={cartItems[event.id] ? true : false}>
                        <div>{cartItems[event.id] ? 'Added To Cart' : 'Add to registration cart'}</div>
                        <div>{cartItems[event.id] ? '' : <FontAwesomeIcon icon={faCartFlatbed} />}</div>
                        </button>
                        </div>
                    </div>
                ))}
              </div>
            </div>
        </div>
        <div className="cart-icon border-2" onClick={()=>{setcartOpen(true)}}>
        <FontAwesomeIcon icon={faCartFlatbed} /> {cartCounter}
        </div>
        {cartOpen ? <div className="cart-body">
            <div className="cart-main">
                <div className='cart-header'>
                   <div>Registration Cart</div>
                   <div className='close-cart' onClick={()=>{setcartOpen(false)}}>X</div>
                </div>
                {cartCounter > 0 ? <div className='cart-content'>
                   {Object.keys(cartItems).map((item,index)=>(
                       <div className='cart-content-item'>
                           <div className='cart-content-item-logo'><FontAwesomeIcon icon={events.find(event=>event.id===item).logo} /></div>
                           <div className='cart-content-item-name'>{events.find(event=>event.id===item).name}</div>
                           <div className='cart-content-item-price'>₹ {events.find(event=>event.id===item).price}</div>
                           <div className='cart-content-item-delete' onClick={()=>{
                               const newCart = {...cartItems};
                               delete newCart[item];
                               setcartItems(newCart);
                           }}>x</div>
                       </div>
                   ))}
                   <div className='cart-summary'>
                          <div className='cart-summary-light'>
                              <div>Subtotal</div>
                              <div>₹ {subtotal}</div>
                          </div>
                          <div className='cart-summary-light'>
                              <div>Payment Gateway Charges ( 2 % ) </div>
                              <div>₹ {charges}</div>
                          </div>
                          <div className='cart-summary-bold'>
                              <div>Total</div>
                              <div>₹ {parseFloat(charges + subtotal)}</div>
                          </div>
                          <button className='cart-checkout-button'
                          onClick={()=>{
                              
                          }}
                          >
                                Proceed to Payment
                          </button>
                   </div>
                </div>:'Cart is empty'}
            </div>
        </div>:''}
        {teamOpen ? <div className="cart-body">
            <div className="cart-main">
                <div className='cart-header'>
                <div>Team Details</div>
                   <div className='close-cart' onClick={()=>{setTeamOpen(false)}}>X</div>
                </div>
                <div className='cart-content'>
                  Team Lead: 
                </div>
            </div>
        </div> : ''}
    </div>
  );
}

export default Events;
