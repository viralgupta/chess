import React from 'react'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="text-white body-font bg-gray-800">
      <div className="container px-5 py-24 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
          <div className="rounded-lg h-64 overflow-hidden">
            <img alt="content" className="object-cover object-center h-full w-full" src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/94179748156327.58906bd0233e2.jpg" />
          </div>
          <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
              <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                <img src="https://media.licdn.com/dms/image/D5603AQGIdJtyF__bXA/profile-displayphoto-shrink_400_400/0/1679766705176?e=1691625600&v=beta&t=B4G5GKJHz8tzVcgPm-jSQwRD0S1u41sfH-Vz3M_Qgi4" className='rounded-full' alt="" />
              </div>
              <div className="flex flex-col items-center text-center justify-center">
                <h2 className="font-medium title-font mt-4 text-gray-100 text-lg">Viral Gupta</h2>
                <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                <p className="text-base">Raclette knausgaard hella meggs normcore williamsburg enamel pin sartorial venmo tbh hot chicken gentrify portland.</p>
              </div>
            </div>
            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <p className="leading-relaxed text-lg mb-4 text-white">Welcome to our online chess community! Whether you're a beginner or a grandmaster, we have something for everyone.</p>
              <p className="leading-relaxed text-lg mb-4 text-white">Join our vibrant community and engage with other players through our forums, chat rooms, and social media channels. Connect with fellow chess fans, share your thoughts and strategies, and stay up-to-date with the latest news and events in the world of chess.</p>
              <Link to='/play' className="text-indigo-500 inline-flex items-center cursor-pointer">Start Playing
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home