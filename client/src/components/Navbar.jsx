
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import { useClerk, useUser, UserButton } from '@clerk/clerk-react';
const BookIcon= ()=>(
       <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
</svg>
)

const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/rooms' },
        { name: 'Experience', path: '/' },
        { name: 'About', path: '/' },
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const {openSignIn} = useClerk()
    const {user} = useUser()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        // If not on home page, always show scrolled state
        if(location.pathname !== '/'){
            setIsScrolled(true);
            return;
        }
        
        // If on home page, use scroll listener
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    return (
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/90 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "bg-transparent py-4 md:py-6 text-white"}`}>

                {/* Logo */}
                <Link to='/'>
                   <img src={assets.logo} alt="logo" className={`h-9 ${isScrolled && "invert opacity-80"}`} />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-4 lg:gap-8">
                    {navLinks.map((link, i) => (
                        <a key={i} href={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
                            {link.name}
                            <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                        </a>
                    ))}
                    <button className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? 'text-black' : 'text-white'} transition-all`} onClick={() => navigate('/owner')}>
                        Dashboard
                    </button>
                </div>

                {/* Desktop Right */}
                <div className="hidden md:flex items-center gap-4">
                   <img src={assets.searchIcon} alt="Search" className={`${isScrolled && 'invert'} h-7 transition-all duration-500`} />
                   {user ? (
                    <UserButton>  
                        <UserButton.MenuItems> 
                            <UserButton.Action label="My Bookings" labelIcon={<BookIcon/>} onClick={() => navigate('/my-booking')} />
                            <UserButton.Action 
                              label="🏨 Hotel Owner Dashboard" 
                              onClick={() => navigate('/owner')} 
                            />
                        </UserButton.MenuItems>
                    </UserButton>
                   ) : (
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => navigate('/owner/sign-in')}
                        className={`px-4 py-2 rounded-full text-sm transition-all duration-500 border ${
                          isScrolled 
                            ? "border-gray-300 text-gray-700 hover:bg-gray-100" 
                            : "border-white/30 text-white hover:bg-white/10"
                        }`}
                      >
                        Hotel Owner
                      </button>
                      <button onClick={() => navigate('/customer/sign-in')} className={`px-8 py-2.5 rounded-full transition-all duration-500 ${isScrolled ? "text-white bg-black" : "bg-white text-black"}`}>
                          Login
                      </button>
                    </div>
                   )}
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-3 md:hidden">
                    {user && (
                        <UserButton>  
                            <UserButton.MenuItems> 
                                <UserButton.Action label="My Bookings" labelIcon={<BookIcon/>} onClick={() => navigate('/my-booking')} />
                                <UserButton.Action 
                                  label="🏨 Hotel Owner Dashboard" 
                                  onClick={() => navigate('/owner')} 
                                />
                            </UserButton.MenuItems>
                        </UserButton>
                    )}
                    <img onClick={() => setIsMenuOpen(!isMenuOpen)} src={assets.menuIcon} alt="" className={`${isScrolled && "invert"} h-4`}/>
                </div>

                {/* Mobile Menu */}
                <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                      <img src={assets.closeIcon} alt="close-menu" className="h-6" />
                    </button>

                    {navLinks.map((link, i) => (
                        <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
                            {link.name}
                        </a>
                    ))}

                    {user && (
                        <button 
                          className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all hover:bg-gray-100" 
                          onClick={() => {
                            navigate('/owner')
                            setIsMenuOpen(false)
                          }}
                        >
                          🏨 Hotel Owner Dashboard
                        </button>
                    )}

                    {!user && (
                        <div className="flex flex-col gap-3 items-center">
                          <button 
                            onClick={() => {
                              navigate('/owner/sign-in')
                              setIsMenuOpen(false)
                            }}
                            className="border border-gray-300 text-gray-700 px-6 py-2 rounded-full transition-all hover:bg-gray-100"
                          >
                            Hotel Owner Login
                          </button>
                          <button onClick={() => {
                            navigate('/customer/sign-in')
                            setIsMenuOpen(false)
                          }} className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
                              Customer Login
                          </button>
                        </div>
                    )}
                </div>
            </nav>
    );
}

export default Navbar;
