import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";


const Header = () => {
    const [user, setUser] = useState({})
    const getUser = () => {
        const random = localStorage.getItem("user")
        setUser(JSON.parse(random))
    }
    useEffect(() => {
        getUser()
    }, [])
    const loginorlogout = () => {
        if (user) {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
        }
        window.location = '/login'
    }

    return (
        <header className="text-white body-font bg-gray-800">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                {user ?
                    <div className='flex items-center space-x-2 lg:w-2/5 flex-wrap text-base md:ml-auto'>
                        <img src={user.picture} alt="" className='h-8 rounded-full' />
                        <div className='text-gray-50'>{user.name}</div>
                    </div>
                    :
                    <div className='flex items-center space-x-2 lg:w-2/5 flex-wrap text-base md:ml-auto'>
                        <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E" alt="" className='h-8 rounded-full' />
                        <div className='text-gray-50'>No Account Info</div>
                    </div>
                }
                <Link to='/' className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center cursor-pointer lg:justify-center mb-4 md:mb-0">
                    <img src="https://www.chess.com/favicon.ico" alt="" />
                    <span className="ml-3 text-xl text-gray-50">Play Chess</span>
                </Link>
                <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
                    <button onClick={loginorlogout} className="inline-flex items-center border-2 border-gray-400 py-1 px-3 focus:outline-none rounded-lg text-gray-50 cursor-pointer text-base mt-4 md:mt-0">{user ? "Logout" : "Login/Signup"}
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header