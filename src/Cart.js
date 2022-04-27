import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon,ChartBarIcon,
  AcademicCapIcon,
  CursorClickIcon,
  TrendingUpIcon, } from '@heroicons/react/outline'
import logo from "./logo.png"
import { useEffect, useState } from 'react';
import {db,auth, onAuthStateChanged, doc, getDoc, updateDoc, arrayUnion, collection, setDoc, query, where} from "./firebase";
import { useNavigate } from 'react-router-dom';
import { async } from '@firebase/util';
const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: false },
  { name: 'Registered Events', href: '/registered-events', current: false },
  { name: 'All Events', href: '/all-events', current: false },
  { name: 'Calendar', href: '/calender', current: false },
  { name: 'Rules', href: '/rules', current: false },
  { name: 'Cart', href: '/cart', current: true }
]
const userNavigation = [
  { name: 'Sign out', href: '/sign-out' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
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

export default function Cart() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [userData, setUserData]= useState({
    name: '',
    email: '',
    imageUrl: false,
  });
  const [cart,setCart] = useState({});
  const [cartTotal, setCartTotal] = useState(0);
  const [cartMaper,setCartMaper] = useState([]);
  useEffect(()=>{
    let cartRef = localStorage.getItem('cart')
    if(cartRef){
      let temp = {}
      let ct = 0
      JSON.parse(cartRef).forEach(c=>{
          temp[c] = true;
      })
      setCart(temp)
      Object.keys(temp).forEach(e=>{
        ct += eventpriceKeyMap[e]
      })
      setCartTotal(ct)
    }
    onAuthStateChanged(auth, async (user)=>{
      if(user){
        setUserId(user.uid)
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData({
            name: {
              first: user.displayName.split(' ')[0],
              last: user.displayName.split(' ')[1]
            },
            email: user.email,
            imageUrl: user.photoURL,
            ...docSnap.data(),
          })
        } else {
          console.log("User Not Found");
        }
      }
    });
  },[])
  useEffect(()=>{
    setCartMaper(Object.keys(cart))
    let ct = 0
    Object.keys(cart).forEach(e=>{
      ct += eventpriceKeyMap[e]
    })
    setCartTotal(ct)
  },[cart])
  async function displayRazorpay(){
    //POST request to Nodejs
    const data = await fetch("https://stormy-journey-29948.herokuapp.com/razorpay",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          price: cartTotal
        }),
    }).then((t)=> t.json())
    const options = {
        key: "rzp_live_u6DNFurSsXh9o3",
        currency: data.currency,
        amount: data.amount,
        description: '',
        image: 'https://stormy-journey-29948.herokuapp.com/logo.jpg',
        order_id: data.id,
        handler: function(response){
            resgisterEvents();
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
  async function resgisterEvents(){
     for await (const key of Object.keys(cart)){
           await resgisterEvent(key)
     }
  }
  async function resgisterEvent(key){
    if(key === 'hackathon'){
      //
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
      // await fetch(`https://mail-micros.herokuapp.com/${rMap[key]}?evgId=${userData.evg_id}`,{
      //   method: 'POST'
      // });
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
              <h1 className="text-3xl font-bold text-white">Cart</h1>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="bg-white rounded-lg shadow flex flex-col items-center justify-center">
           {(cartTotal === 0) ? <div className='text-lg font-medium text-gray-900 max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8'>Cart is empty</div>: <div className="bg-white">
      <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
         <section className="lg:col-span-7">
            <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
              {cartMaper.map((key, index) => (
                <li key={index} className="flex py-3">
                  <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                              {eventNameKeyMap[key]}
                          </h3>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">₹{eventpriceKeyMap[key]}</p>
                      </div>
                    </div>
                    
                  </div>
                  <button type="button" className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500" onClick={(e)=>{
                    let tc = {...cart}
                    delete tc[key];
                    setCart(tc);
                    let temp = []
                      Object.keys(cart).forEach(e=>{
                        temp.push(e)
                      })
                      localStorage.setItem('cart',JSON.stringify(temp))
                  }}>
                            <XIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                </li>
              ))}
            </ul>
          </section>
          <section
            aria-labelledby="summary-heading"
            className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Total</dt>
                <dd className="text-sm font-medium text-gray-900">₹{cartTotal}</dd>
              </div>
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Your are registering for {Object.keys(cart).length} events together</span>
                </dt>
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                onClick={(e)=>{
                  e.preventDefault();
                  e.target.innerText = 'Loading ...';
                  displayRazorpay();
                }}
               >
                Register
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>}
            </div>
            {/* /End replace */}

          </div>
        </main>
      </div>
    </>
  )
}
