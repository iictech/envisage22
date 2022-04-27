import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon,
  ChartBarIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  CursorClickIcon,
  TrendingUpIcon, } from '@heroicons/react/outline'
import logo from "./logo.png"
import { useEffect, useState } from 'react';
import {db,auth, onAuthStateChanged, doc, setDoc} from "./firebase";
import { useNavigate } from 'react-router-dom';
const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: false },
  { name: 'Registered Events', href: '/registered-events', current: false },
  { name: 'All Events', href: '/all-events', current: false },
  { name: 'Calendar', href: '/calender', current: false },
  { name: 'Rules', href: '/rules', current: true },
  { name: 'Cart', href: '/cart', current: false }
]
const userNavigation = [
    { name: 'Sign out', href: '/sign-out' },
  ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function RegisteredEvents() {
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const [userData, setUserData]= useState({
    name: '',
    email: '',
    imageUrl: false,
  });
  useEffect(()=>{
    setTimeout(()=>{
        if(!auth.currentUser){
          navigate('/');
        }
      },2000)
    onAuthStateChanged(auth, (user)=>{
      if(user){
        setUserId(user.uid)
        setUserData({
          name: user.displayName,
          email: user.email,
          imageUrl: user.photoURL,
        })
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
                        <div className="text-base font-medium leading-none text-white">{userData.displayName}</div>
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
              <h1 className="text-3xl font-bold text-white">Rules</h1>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <h1 className="text-xl font-bold text-center p-2">Rule Book for Brain-It-Out</h1>
              <p className="p-3 text-center">
              Brain-It-Out is a fun event where participants will be quizzed on topics such as business, technology, innovation and the market scenario of today’s world. 
              </p>
    <p className="p-3">Rules:
    <ul>
        <li>1. It is a solo event.</li>
      <li>2. There will be 2 rounds in the quiz. The 1st round will be an elimination round, where participants with the most correct answers will be qualified for the final round. </li>
    <li>3. Further details of the quiz will be announced on the spot.</li>
    <li>4. Using any kind of electronic device is prohibited during the quiz. If found, it can lead to disqualification.</li>
    <li>5. The results announced by the panel will be final. No further changes will be made.</li>
    </ul>
    </p>

    <h1 className="text-xl font-bold text-center mt-3">Rule Book for Poster & Logo Designing</h1>
    <p className="p-3 text-center">Poster and Logo designing competition is an event where participants can showcase their creative and marketing side by designing some of the most intriguing and expressive logos and posters on the given topics.</p>
    <p className="p-3">
    Rules:
    <ul>
    <li>1. It is a solo event.</li>
    <li>2. There will be two categories in this event – Logo designing and Poster designing. You can choose any one of them.</li>
    <li>3. For Poster Designing – A topic will be given based on which you will have to design the poster.</li> 
    <li>4. The poster must be professional and should have a resolution of at least 300dpi. The aspect ratio must be 1:1, 4:3 or 16:9</li>
    <li>5. For Logo Designing -  A dummy company will be created. The history and other details about the company will be provided by us. You will have to design a logo for that particular company.</li>
    <li>6. The Problem statement will be out on 17th April’22. </li>
    <li>7. Submissions will start on 19th April’22 in offline mode. </li>
   <li>8. You can use any software for designing.</li>
    <li>9. Your work should be plagiarism free. If found, your submission can be cancelled.</li>
    <li>10. The results announced by the panel will be final. No further changes will be made.</li>
    </ul>
    </p>


<h1 className="text-xl font-bold text-center p-2 mt-3">Rule Book for HackUrWay</h1>
<p className="p-3 text-center">HackUrWay is an exciting hackathon where participants will compete against each other to solve some of the relevant problems we face in our daily lives by inculcating their problem-solving skills.
</p>
<p className="p-3">Rules:
    <ul>
   <li> 1. It is a team event. Each team can have maximum 4 members, including the team leader.</li>
    <li>2.  There will be two problem statements. You can choose any one of them.</li>
    <li>3. The hackathon will have two categories – Ideation and MVP. You can choose any one of them to submit your solution.</li>
    <li>    4. Category 1 (IDEATION) -  For this category, your team will have to prepare a presentation video explaining the solution of the problem and share on YouTube with the tags of IIC [#iictmsl and #iicbizverse] and submit the link in the provided google form.
</li>
   <li> 5. Category 2 (MVP) -  For this category, your team will have to build a prototype of the solution and then record a video explaining it. Then, that video must be uploaded on YouTube and later in the provided google form.</li>
   <li> 6. The video title must contain your team’s name. Tagging IIC TMSL in your video is mandatory.</li>
   <li>7. The results announced by the panel will be final. No further changes will be made.</li>
    </ul>
    </p>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
