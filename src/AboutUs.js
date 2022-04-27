/* This example requires Tailwind CSS v2.0+ */
export default function AboutUs() {
    return (
      <div className="flex justify-center" id="about-us">
          <div className="w-4/5 relative">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover rounded-xl"
            src="https://images.unsplash.com/photo-1565055887414-3c2b21f9cd73?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
            alt=""
          />
          <div className="absolute inset-0 mix-blend-multiply bg-indigo-800 rounded-xl" aria-hidden="true" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">About Us</h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
          About Us - The Institution's Innovation Council (IIC), an MHRD initiative, was formed with the objective of prospering young minds full of innovative ideas and help them succeed in life by imparting knowledge on innovation, technology, entrepreneurship and start-ups through various workshops, seminars, fests and talk sessions. We provide students a platform where they can explore, showcase and sharpen their talents through various activities that our cell organizes throughout the year. Our ultimate goal is to prepare students for their future endeavours.
          </p>
        </div>
      </div>
      </div>
    )
  }
  