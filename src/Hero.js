import logocloud from './logocloud.png';
export default function Example() {
  return (
    <div className="relative overflow-hidden">
      <main>
        <div className="pt-10 bg-black sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
          <div className="mx-auto max-w-7xl lg:px-8">
            <div className="p-8 text-white flex flex-col items-center justify-center">
              <img className="animate-pulse md:h-96" src={logocloud} alt="" />
              <a
                href="/sign-up"
                className="bg-gradient-to-r p-1 from-blue-400 to-green-500 mt-7 animate-pulse inline-flex items-center justify-center rounded-md shadow-sm  font-medium text-white"
              >
                <p className='px-4 py-2 text-xl sm:px-6 sm:py-4 sm:text-3xl bg-black rounded-md'>Register Now</p>
              </a>
            </div>
          </div>
        </div>

        {/* More main page content here... */}
      </main>
    </div>
  )
}
