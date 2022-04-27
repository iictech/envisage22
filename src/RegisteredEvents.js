import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon,ChartBarIcon,
  AcademicCapIcon,
  CursorClickIcon,
  TrendingUpIcon, } from '@heroicons/react/outline'
import logo from "./logo.png"
import { useEffect, useState } from 'react';
import {db,auth, onAuthStateChanged, doc, getDoc} from "./firebase";
import { useNavigate } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: false },
  { name: 'Registered Events', href: '/registered-events', current: true },
  { name: 'All Events', href: '/all-events', current: false },
  { name: 'Calendar', href: '/calender', current: false },
  { name: 'Rules', href: '/rules', current: false },
  { name: 'Cart', href: '/cart', current: false }
]
const userNavigation = [
  { name: 'Sign out', href: '/sign-out' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function RegisteredEventsList({registeredEvents}){
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(()=>{
      if(!auth.currentUser){
        navigate('/');
      }
    },2000)
  },[])
  if(registeredEvents.length !== 0){
    return (<>
        <div className="sm:grid grid-cols-2">
        {registeredEvents.map((item) => (
          <div
            key={item.name}
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
                  <p className="mt-1 text-sm text-gray-700"><item.description /></p>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      </>)
  } else {
    return (<>
      <div className="text-center p-4 border-4 border-dashed border-gray-200 rounded-lg h-96 text-xl font-semibold ">
      <div className="mt-5">
      You have not registered for any event
      </div>
      <br />
      <a
        href="/all-events"
        type="button"
        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        View All Events
      </a>
    </div>
    </>)
  }
}
const eventNameKeyMap = {
  brain_it_out: 'Brain-It-Out',
  ipr_workshop: 'IPR Workshop',
  hackathon: 'HackUrWay',
  logo_and_poster: 'Logo and Poster Designing'
}

const eventIconKeyMap = {
  brain_it_out: ChartBarIcon,
  ipr_workshop: AcademicCapIcon,
  hackathon: CursorClickIcon,
  logo_and_poster: TrendingUpIcon
}
export default function RegisteredEvents() {
  const [userId, setUserId] = useState('');
  const [registeredEvents,setRegisteredEvents] = useState([]);
  const [userData, setUserData]= useState({
    name: '',
    email: '',
    imageUrl: false,
  });
  useEffect(()=>{
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
          if(docSnap.data()?.reg_events){
            const a = [];
            Object.keys(docSnap.data()?.reg_events).forEach(key=>{
              if(docSnap.data()?.reg_events[key]){
                if(key === 'hackathon'){
                  if(docSnap.data()?.reg_events[key].is_registered){
                    a.push({
                      name: eventNameKeyMap[key],
                      description: ()=>{
                        return(<>
                        EVG ID : {docSnap.data().evg_id} <br/>
                        Team ID : {docSnap.data().reg_events.hackathon.team_id} <br />
                        {docSnap.data().reg_events.hackathon.is_lead ? `Team Leader : ${docSnap.data().name.first + ' ' + docSnap.data().name.last}`:''}
                        </>)
                      },
                      icon: eventIconKeyMap[key]
                    })
                  }
                } else {
                  a.push({
                    name: eventNameKeyMap[key],
                    description: ()=>{
                      return(<>
                      EVG ID : {docSnap.data().evg_id}
                      </>)
                    },
                    icon: eventIconKeyMap[key]
                  })
                }
              }
            })
            setRegisteredEvents(a)
          }
        } else {
          console.log("User Not Found");
        }
      }
    });
  },[])
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
              <h1 className="text-3xl font-bold text-white">Registered Events</h1>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
              <RegisteredEventsList registeredEvents={registeredEvents}/>
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  )
}
