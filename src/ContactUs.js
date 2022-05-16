import Footer from "./Footer";
import Header from "./Header";

import { MailIcon, PhoneIcon } from '@heroicons/react/solid'
export default function Contact(){
    return (
      <>
        <Header/>
        <div className="text-center flex justify-center items-center h-screen">
            <div className="bg-white rounded-lg shadow px-5 py-6 md:w-2/3">
              <p className="text-lg font-bold text-center p-2">
              Contact IIC</p>
              <div className="w-auto col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
              <div className='p-8 text-center'>
              TECHNO INDIA : EM-4/1, Sector-V, <br/>
            Salt Lake, Kolkata-700091,West Bengal
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="-ml-px w-0 flex-1 flex">
                    <a
                      href='mailto:iic.tmsl@gmail.com'
                      className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                    >
                      <MailIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                      <span className="ml-3">Email</span>
                    </a>
                  </div>
                  <div className="-ml-px w-0 flex-1 flex">
                    <a
                      href={`tel:+918271538524`}
                      className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                    >
                      <PhoneIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                      <span className="ml-3">Phone</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </>
    )
}
