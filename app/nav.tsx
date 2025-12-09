import React, { useState, useEffect } from 'react';
import { IoPersonOutline } from 'react-icons/io5';
import { BsBag } from 'react-icons/bs';
import SearchToggle from './search';
import logo from './assets/logo.png'; // adjust path as needed

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

 useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
  scrolled ? 'bg-white text-black shadow-md' : 'bg-transparent text-white'
}`} >
      <div className="flex items-center w-full justify-evenly py-4">
        <div>
          <ul className="flex gap-5 uppercase font-medium">
            <li>New</li>
            <li>Perfume</li>
            <li>Jewelries</li>
          </ul>
        </div>
        <div>
          <img src={logo} alt="Scentelle Logo" width={150} />
        </div>
        <div className="flex gap-4 items-center">
          <SearchToggle />
          <IoPersonOutline size={18} />
          <BsBag size={18} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;