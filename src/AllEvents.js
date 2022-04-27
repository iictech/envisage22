import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon,
  ChartBarIcon,
  AcademicCapIcon,
  CursorClickIcon,
  TrendingUpIcon, } from '@heroicons/react/outline'
import logo from "./logo.png"
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {db,auth, onAuthStateChanged, doc, getDoc, updateDoc, arrayUnion, collection, setDoc, query, where} from "./firebase";
import { nanoid } from 'nanoid';
const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: false },
  { name: 'Registered Events', href: '/registered-events', current: false },
  { name: 'All Events', href: '/all-events', current: true },
  { name: 'Calendar', href: '/calender', current: false },
  { name: 'Rules', href: '/rules', current: false },
  { name: 'Cart', href: '/cart', current: false }
]
const userNavigation = [
  { name: 'Sign out', href: '/sign-out' },
]

const events = [
  {
    name: 'Brain-It-Out',
    description: 'An exciting quiz where participants are quizzed on relevant business, technology and innovation topics and the team with the most answers correct, wins the game',
    href: '#',
    icon: ChartBarIcon,
    payment: true,
    key: 'brain_it_out',
    registered: false,
    price: '30'
  },
  {
    name: 'HackUrWay',
    description: 'A platform where students will have to solve problems on relevant daily life problems by inculcating their problem-solving skills.',
    href: '#',
    icon: CursorClickIcon,
    payment: true,
    key: 'hackathon',
    registered: false,
    price: '100'
  },
  { 
    name: 'Logo and Poster Designing', 
    description: "A creative outlet for students with a hidden marketing and designing side.", 
    href: '#', 
    icon: TrendingUpIcon,
    payment: true,
    key: 'logo_and_poster',
    registered: false,
    price: '20'
  },
  {
    name: 'IPR Workshop',
    description: "Introduction to the Patent Side of the Business World to help you achieve an identity for your startup idea",
    href: '#',
    icon: AcademicCapIcon,
    payment: false,
    key: 'ipr_workshop',
    registered: false,
    price: 'free'
  },
]

const eventNameKeyMap = {
  brain_it_out: 'Brain-It-Out',
  ipr_workshop: 'IPR Workshop',
  hackathon: 'HackUrWay',
  logo_and_poster: 'Logo and Poster Designing'
}

const eventpriceKeyMap = {
  brain_it_out: 30,
  ipr_workshop: 0,
  hackathon: 100,
  logo_and_poster: 20
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function RegisteredEvents() {
  const navigate = useNavigate();
  const [hacReg, setHacReg] = useState(false);
  const [cart,setCart] = useState({});
  function addTocart(key){
    let cart = localStorage.getItem('cart');
    if(cart){
      cart = JSON.parse(cart)
      cart.push(key);
      localStorage.setItem('cart',JSON.stringify(cart))
    } else {
      cart = [key]
      localStorage.setItem('cart',JSON.stringify(cart))
    }
    let cartRef = localStorage.getItem('cart')
    if(cartRef){
      let temp = {}
      JSON.parse(cartRef).forEach(c=>{
          temp[c] = true;
      })
      setCart(temp)
    }
  }
  const [teamEvgId, setTeamEvgId] = useState('');
  const [hacRegData, setHacRegData] = useState({
    team_name: '',
    team_lead: '',
    m1: false,
    m2: false,
    m3: false,
  });
  const [userId, setUserId] = useState('');
  const [userData, setUserData]= useState({
    name: '',
    email: '',
    imageUrl: false,
  });
  useEffect(()=>{
    let cartRef = localStorage.getItem('cart')
    if(cartRef){
      let temp = {}
      JSON.parse(cartRef).forEach(c=>{
          temp[c] = true;
      })
      setCart(temp)
    }
    setTeamEvgId('22EVG'+nanoid(3).replace('-','Z').replace('_','X').toUpperCase()+Date.now().toString().substr(7));
    setTimeout(()=>{
      if(!auth.currentUser){
        navigate('/');
      }
    },2000)
    onAuthStateChanged(auth, async (user)=>{
      if(user){
        setUserId(user.uid)
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setHacRegData({...hacRegData,team_lead:docSnap.data().evg_id});
          setUserData({
            name: user.displayName,
            email: user.email,
            imageUrl: user.photoURL,
            ...docSnap.data(),
          });
          if(docSnap.data()?.reg_events){
            events.forEach((event,i)=>{
              if(event.key === 'hackathon'){
                if(docSnap.data()?.reg_events[event.key].is_registered){
                  events[i].registered = true;
                }
              } else {
                if(docSnap.data()?.reg_events[event.key]){
                  events[i].registered = true;
                }
              }
            })
          }
        }
      }
    });
  },[]);
  async function displayRazorpay(key){
    //POST request to Nodejs
    const data = await fetch("https://stormy-journey-29948.herokuapp.com/razorpay",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          price: eventpriceKeyMap[key]
        }),
    }).then((t)=> t.json())
    const options = {
        key: "rzp_live_u6DNFurSsXh9o3",
        currency: data.currency,
        amount: data.amount,
        description: eventNameKeyMap[key],
        image: 'https://stormy-journey-29948.herokuapp.com/logo.jpg',
        order_id: data.id,
        handler: function(response){
            resgisterEvent(key);
        },
        prefill: {
            name: userData.displayName,
            email: userData.email,
            contact: userData.number,
        },
        notes: {
           evg_id: userData.evg_id,
        }
    };
  
    const paymentObject = new window.Razorpay(options)
    paymentObject.on('payment.failed', function (response){
      alert("Payment Failed");
  });
    paymentObject.open()
  } 

  async function resgisterEvent(key){
    if(key === 'hackathon'){
      await updateDoc(doc(db, "users", userId), {
        reg_events: {
          ...userData.reg_events,
          hackathon: {
            is_registered: true,
            is_lead: true,
            team_id: teamEvgId,
          }
        }
      });
      await setDoc(doc(db, `events/hackathon/${teamEvgId}/${teamEvgId}`), {
        ...hacRegData
      });
      let postUrl = `https://mail-micros.herokuapp.com/mailteam?leadEvgId=${userData.evg_id}&teamEvgId=${teamEvgId}`
      if(hacRegData.m1) postUrl += `&member1EvgId=${hacRegData.m1}`;
      if(hacRegData.m2) postUrl += `&member2EvgId=${hacRegData.m2}`;
      if(hacRegData.m3) postUrl += `&member3EvgId=${hacRegData.m3}`;
      await fetch(postUrl,{
      method: 'POST'
    });
    await fetch(`https://mail-micros.herokuapp.com/hackathon?evgId=${userData.evg_id}&teamEvgId=${teamEvgId}`,{
      method: 'POST'
    })
    } else {
      await updateDoc(doc(db, "users", userId), {
        reg_events: {
          ...userData.reg_events,
          [key]: true,
        }
      });
      const rMap = {
        brain_it_out: 'brainitout',
        ipr_workshop: 'iprworkshop',
        logo_and_poster: 'logoandposter'
      }
      await fetch(`https://mail-micros.herokuapp.com/${rMap[key]}?evgId=${userData.evg_id}`,{
        method: 'POST'
      });
    }
    await updateDoc(doc(db, "events", key), {
      registered: arrayUnion(userData.evg_id),
    });
    navigate('/registered-events');
  }
  return (
    <>
      <div className="min-h-full">
        <div className="bg-gray-800 pb-32">
          <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
              <>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                  <div className="border-b border-gray-700">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                        <a href='/'>
                          <img
                            className="h-8 w-8"
                            src={logo}
                            alt=""
                          />
                          </a>
                        </div>
                        <div className="hidden md:block">
                          <div className="ml-10 flex items-baseline space-x-4">
                            {navigation.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                  'px-3 py-2 rounded-md text-sm font-medium'
                                )}
                                aria-current={item.current ? 'page' : undefined}
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                          <button
                            type="button"
                            className="bg-gray-800 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                          >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                          </button>

                          {/* Profile dropdown */}
                          <Menu as="div" className="ml-3 relative">
                            <div>
                              <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <span className="sr-only">Open user menu</span>
                                <img className="h-8 w-8 rounded-full" src={userData.imageUrl || logo} alt="" />
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {userNavigation.map((item) => (
                                  <Menu.Item key={item.name}>
                                    {({ active }) => (
                                      <a
                                        href={item.href}
                                        className={classNames(
                                          active ? 'bg-gray-100' : '',
                                          'block px-4 py-2 text-sm text-gray-700'
                                        )}
                                      >
                                        {item.name}
                                      </a>
                                    )}
                                  </Menu.Item>
                                ))}
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                      <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                        <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                          ) : (
                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                          )}
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                  <div className="px-2 py-3 space-y-1 sm:px-3">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block px-3 py-2 rounded-md text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                  <div className="pt-4 pb-3 border-t border-gray-700">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={userData.imageUrl} alt="" />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">{userData.name.first + ' ' + userData.name.last}</div>
                        <div className="text-sm font-medium leading-none text-gray-400">{userData.email}</div>
                      </div>
                      <button
                        type="button"
                        className="ml-auto bg-gray-800 flex-shrink-0 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-3 px-2 space-y-1">
                      {userNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <header className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-white">All Events</h1>
            </div>
          </header>
        </div>
        <main className="-mt-32">
          <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
            <div className={hacReg ? 'hidden':''}>
            <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6 sm:grid grid-cols-2">
            {events.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="m-3 p-3 flex flex-col justify-between rounded-lg hover:bg-gray-300"
                            >
                              <div className="flex md:h-full lg:flex-col">
                                <div className="flex-shrink-0">
                                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                                    <item.icon className="h-6 w-6" aria-hidden="true" />
                                  </span>
                                </div>
                                <div className="ml-4 md:flex-1 md:flex md:flex-col md:justify-between lg:ml-0 lg:mt-4">
                                  <div>
                                    <p className="text-base font-medium text-gray-900">{item.name}</p>
                                    <p className="mt-1 text-sm text-gray-700">{item.description}</p>
                                    <p className="mt-1 text-sm text-green-700">Registration : {item.price === 'free' ? '' : '₹'} {item.price}</p>
                                  </div>
                                  <p className="mt-2 text-sm font-medium text-indigo-600 lg:mt-3">
                                  {!item.registered ? 
                                    <div>
                                      <button
                                      type="button"
                                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                      onClick={(e)=>{
                                      e.target.innerText = 'Loading ...';
                                      if(item.key === 'hackathon'){
                                        setHacReg(true);
                                      } else {
                                        if(item.payment){
                                          displayRazorpay(item.key);
                                        } else {
                                          resgisterEvent(item.key);
                                        }
                                      }
                                    }}
                                    >
                                      Register Now &nbsp;<span aria-hidden="true">&rarr;</span>
                                    </button>
                                    {(item.key === 'hackathon') ? '':<button
                                      type="button"
                                      className="inline-flex items-center sm:ml-3 mt-3 px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                      onClick={(e)=>{
                                        addTocart(item.key)
                                      }}
                                    >
                                      {cart[item.key] ? <a href='/cart'>Go to Cart &nbsp;<span aria-hidden="true">&rarr;</span></a>: <span>Add to Registration cart &nbsp;<span aria-hidden="true">+</span></span>}
                                      
                                    </button>}
                                    </div>
                                  : 'Registered'
                                  }
                                  </p>
                                </div>
                              </div>
                            </a>
                          ))}
            </div>
            </div>
            <div id="hac_reg" className={hacReg ? '':'hidden'}>
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="space-y-6">
                <p className='font-bold text-lg'>Register For Hackathon</p>
              <div>
              <label htmlFor="fname" className="block text-sm font-medium text-gray-700">
               Team Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter your team name"
                  onChange={(e)=>{
                    setHacRegData({...hacRegData,team_name:e.target.value})
                  }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="fname" className="block text-sm font-medium text-gray-700">
               Team Leader EVG ID
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder=""
                  disabled
                  value={userData.evg_id}
                />
              </div>
            </div>

            <div>
              <label htmlFor="fname" className="block text-sm font-medium text-gray-700">
               Member 1 EVG ID
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Member 1 EVG ID"
                  onChange={(e)=>{
                    setHacRegData({...hacRegData,m1:e.target.value})
                  }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="fname" className="block text-sm font-medium text-gray-700">
               Member 2 EVG ID
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Member 2 EVG ID"
                  onChange={(e)=>{
                    setHacRegData({...hacRegData,m2:e.target.value})
                  }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="fname" className="block text-sm font-medium text-gray-700">
               Member 3 EVG ID
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Member 3 EVG ID"
                  onChange={(e)=>{
                    setHacRegData({...hacRegData,m3:e.target.value})
                  }}
                />
              </div>
            </div>

            <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={async (e)=>{
                    e.target.innerText = 'Loading ...';
                    displayRazorpay('hackathon');
                  }}
                >
                  Save and Register
                </button>
              </div>

              </div>
            </div>
        </div>
          </div>
        </main>
        
      </div>
    </>
  )
}
