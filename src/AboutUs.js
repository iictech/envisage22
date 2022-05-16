import Footer from "./Footer";
import Header from "./Header";

export default function About(){
    return (
      <>
        <Header/>
        <div className="text-center flex justify-center items-center h-screen">
            <div className="bg-white rounded-lg shadow px-5 py-6 md:w-2/3">
              <p className="text-lg font-bold text-center p-2"> What is Envisage</p>
              <p>Envisage is the official E-Summit of Techno Main Salt Lake. It is born out of the dreams and aspirations of the youth who have the zest and the zeal to take their future into their own hands. Supporting the growing startup culture in the country, we are promised to inculcate and identify the best ideas and b-plans. Envisage is the platform for budding entrepreneurs to showcase the power of their ideas and to be appreciated and mentored by the best in the fields. So come along be a part of this wonderful and exciting journey.</p>
              <p className="text-lg font-bold text-center p-2">Our goals</p>
              <p>Our goal is to provide a platform for budding entrepreneurs to showcase the power of their ideas and to be appreciated and mentored by the best in the fields.</p>

            </div>
        </div>
        <Footer/>
      </>
    )
}
