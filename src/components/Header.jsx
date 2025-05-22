import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
    const linkClasses = ({ isActive }) =>
        isActive ? 'text-blue-600 underline underline-offset-10 decoration-2 underline-offset-2 font-semibold' : 'font-semibold text-black hover:text-blue-600 hover:underline underline-blue-600 decoration-2 underline-offset-10';

    return (
        <nav className='flex items-center justify-between sticky top-0 z-50 px-5 bg-white shadow-lg py-4'>
            <div className='font-bold text-2xl text-gray-700'>MagicFrames</div>
            <div className='flex items-center gap-14'>
                <div className='flex space-x-5'>
                    <NavLink to="/" className={linkClasses}>Home</NavLink>
                    <NavLink to="/createFrame" className={linkClasses}>Create a Frame</NavLink>
                    <NavLink to="/order-history" className={linkClasses}>Order History</NavLink>
                </div>
                <div className='h-9 w-9 text-3xl overflow-hidden rounded-full bg-gray-200 flex items-center justify-center pt-1'>🙍🏻‍♂️</div>
            </div>
        </nav>
    )
}

export default Header
