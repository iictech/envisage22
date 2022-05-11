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


export default function Example() {
  return (
    <Popover className="relative bg-black sticky top-0 z-50">
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
              <a href="/" className="text-base font-medium text-gray-100 hover:text-gray-500">
                Home
              </a>
              <a href="/events" className="text-base font-medium text-gray-100 hover:text-gray-500">
              Events
              </a>
              <a href="/e-talk" className="text-base font-medium text-gray-100 hover:text-gray-500">
              E-Talk
              </a>
              <a href="/team" className="text-base font-medium text-gray-100 hover:text-gray-500">
              Team
              </a>
              <a href="/gallery" className="text-base font-medium text-gray-100 hover:text-gray-500">
              Gallery
              </a>
              <a href="/sponsors" className="text-base font-medium text-gray-100 hover:text-gray-500">
              Sponsors
              </a>
              <a href="/contact-us" className="text-base font-medium text-gray-100 hover:text-gray-500">
              Contact Us
              </a>
            </Popover.Group>
            <div className="flex items-center md:ml-12">
              <a href="/sign-in" className="text-base font-medium text-gray-100 hover:text-gray-500">
                Sign in
              </a>
              <a
                href="/sign-up"
                className="ml-8 bg-gradient-to-r p-1 from-blue-400 to-green-500 animate-pulse inline-flex items-center justify-center rounded-md shadow-sm  font-medium text-white"
              >
                <p className='px-4 py-2 text-base bg-black rounded-md'>Sign up</p>
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
              </div>
            </div>
            <div className="py-6 px-5">
              <div className="grid grid-cols-2 gap-4">
              <a href="/" className="text-base font-medium text-gray-100 hover:text-gray-500">
                Home
              </a>
              <a href="/events" className="text-base font-medium text-gray-100 hover:text-gray-500">
              Events
              </a>
              <a href="/e-talk" className="text-base font-medium text-gray-100 hover:text-gray-500">
              E-Talk
              </a>
              <a href="/team" className="text-base font-medium text-gray-100 hover:text-gray-500">
              Team
              </a>
              <a href="/gallery" className="text-base font-medium text-gray-100 hover:text-gray-500">
              Gallery
              </a>
              <a href="/sponsors" className="text-base font-medium text-gray-100 hover:text-gray-500">
              Sponsors
              </a>
              <a href="/contact-us" className="text-base font-medium text-gray-100 hover:text-gray-500">
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
