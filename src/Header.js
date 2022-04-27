import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { useState } from 'react'
import {
  BookmarkAltIcon,
  BriefcaseIcon,
  ChartBarIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  CursorClickIcon,
  TrendingUpIcon,
  DesktopComputerIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  MenuIcon,
  NewspaperIcon,
  OfficeBuildingIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import technoLogo from './techno_logo.png'
import iicLogo from './iic_logo.png'
import logo from './logo.png'
const events = [
  {
    name: 'Brain-It-Out',
    description: 'An exciting quiz where participants are quizzed on relevant business, technology and innovation topics and the team with the most answers correct, wins the game',
    href: '#',
    icon: ChartBarIcon,
  },
  {
    name: 'HackUrWay',
    description: 'A platform where students will have to solve problems on relevant daily life problems by inculcating their problem-solving skills.',
    href: '#',
    icon: CursorClickIcon,
  },
  { 
    name: 'Logo and Poster Designing', 
    description: "A creative outlet for students with a hidden marketing and designing side.", 
    href: '#', 
    icon: TrendingUpIcon },
  {
    name: 'IPR Workshop',
    description: "Introduction to the Patent Side of the Business World to help you achieve an identity for your startup idea",
    href: '#',
    icon: AcademicCapIcon,
  },
]
const callsToAction = []

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const [open,setOpen] = useState(false);
  return (
    <Popover className="relative bg-gray-900 sticky top-0 z-50">
      <div className="absolute inset-0 shadow z-30 pointer-events-none" aria-hidden="true" />
      <div className="relative z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10">
          <div>
            <a href="#" className="flex justify-between">
              <img
                className="h-8 w-auto sm:h-10"
                src={technoLogo}
                alt=""
              />
              <img
                className="h-8 w-auto sm:h-10"
                src={iicLogo}
                alt=""
              />
            </a>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
            <Popover.Group as="nav" className="flex space-x-10">
              <Popover>
                {() => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? 'text-gray-300' : 'text-gray-100',
                        'group bg-gray-900 rounded-md inline-flex items-center text-base font-medium hover:text-gray-400 focus:outline-none'
                      )}
                      onMouseEnter={()=>{setOpen(true)}}
                    >
                      <span>Events</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? 'text-gray-300' : 'text-gray-100',
                          'ml-2 h-5 w-5 group-hover:text-gray-500'
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      show={open}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 -translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 -translate-y-1"
                    >
                      <Popover.Panel static className="hidden md:block absolute z-10 top-full inset-x-0 transform shadow-lg bg-gray-900" onMouseLeave={()=>{setOpen(false)}}>
                        <div className="max-w-7xl mx-auto grid gap-y-6 px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16">
                          {events.map((item) => (
                            <a
                              key={item.name}
                              href="/rule-book"
                              className="-m-3 p-3 flex flex-col justify-between rounded-lg hover:bg-gray-800"
                            >
                              <div className="flex md:h-full lg:flex-col">
                                <div className="flex-shrink-0">
                                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                                    <item.icon className="h-6 w-6" aria-hidden="true" />
                                  </span>
                                </div>
                                <div className="ml-4 md:flex-1 md:flex md:flex-col md:justify-between lg:ml-0 lg:mt-4">
                                  <div>
                                    <p className="text-base font-medium text-gray-100">{item.name}</p>
                                    <p className="mt-1 text-sm text-gray-300">{item.description}</p>
                                  </div>
                                  <p className="mt-2 text-sm font-medium text-indigo-600 lg:mt-4">
                                    Learn more <span aria-hidden="true">&rarr;</span>
                                  </p>
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                        <div className="bg-gray-800">
                          <div className="max-w-7xl mx-auto space-y-6 px-4 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-6 lg:px-8">
                            {callsToAction.map((item) => (
                              <div key={item.name} className="flow-root">
                                <a
                                  href={item.href}
                                  className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-100 hover:bg-gray-500"
                                >
                                  <item.icon className="flex-shrink-0 h-6 w-6 text-gray-100" aria-hidden="true" />
                                  <span className="ml-3">{item.name}</span>
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
              <a href="#about-us" className="text-base font-medium text-gray-100 hover:text-gray-500">
                About Us
              </a>
              <a href="#contact-us" className="text-base font-medium text-gray-100 hover:text-gray-500">
                Contact Us
              </a>
            </Popover.Group>
            <div className="flex items-center md:ml-12">
              <a href="/sign-in" className="text-base font-medium text-gray-100 hover:text-gray-500">
                Sign in
              </a>
              <a
                href="/sign-up"
                className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-gray-900 divide-y-2 divide-gray-800">
            <div className="pt-5 pb-6 px-5 sm:pb-8">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src={logo}
                    alt=""
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6 sm:mt-8">
                <nav>
                  <div className="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                    {events.map((item) => (
                      <a
                        key={item.name}
                        href="/rule-book"
                        className="-m-3 flex items-center p-3 rounded-lg hover:bg-gray-800"
                      >
                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                          <item.icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div className="ml-4 text-base font-medium text-gray-100">{item.name}</div>
                      </a>
                    ))}
                  </div>
                </nav>
              </div>
            </div>
            <div className="py-6 px-5">
              <div className="grid grid-cols-2 gap-4">
                <a href="#about-us" className="rounded-md text-base font-medium text-gray-100 hover:text-gray-400">
                  About Us
                </a>

                <a href="#contact-us" className="rounded-md text-base font-medium text-gray-100 hover:text-gray-400">
                  Contact Us
                </a>
              </div>
              <div className="mt-6">
                <a
                  href="/sign-up"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign up
                </a>
                <p className="mt-6 text-center text-base font-medium text-gray-400">
                  Existing User ?{' '}
                  <a href="/sign-in" className="text-indigo-600 hover:text-indigo-500">
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
