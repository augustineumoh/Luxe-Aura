import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import logo from"./main logo.png";
import { BsInstagram } from "react-icons/bs";
 import { IoPersonOutline } from "react-icons/io5";
 import { BsBag } from "react-icons/bs";
 import SearchToggle from "./search";
import { BsTwitterX } from "react-icons/bs";
 import { useEffect, useState } from "react";
// import HeroCarousel from "./hro";
import { FaFacebook } from "react-icons/fa";
import "aos/dist/aos.css";
import { Link } from "react-router";


export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href:"https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;700&family=Raleway:wght@300;400;600&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
   const [scrolled, setScrolled] = useState(false);
  
   useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
   useEffect(() => {
    // Only run on client
    if (typeof window !== 'undefined') {
      import('aos').then((AOS) => {
        AOS.init({ duration: 1000 });
      });
      import('aos/dist/aos.css');
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#FFFFF0] text-black shadow-md' : 'bg-transparent text-black'
        }`} data-aos="fade-down">
              <div className="flex items-center w-full justify-center gap-70 py-1">
                <div>
                  <ul className="flex gap-5 uppercase font-bold text-rose-900">
                    <Link to="/new_product"><li>New</li></Link>
                    <Link to="/perfume"><li>Perfume</li></Link>
                    <Link to="/jewery"><li>Jewelries</li></Link> 
                  </ul>
                </div>
                <div>
                  <Link to="/mainpage"><img src={logo} alt="Scentelle Logo" width={180} /></Link>
                </div>
                <div className="flex gap-4 items-center font-extrabold text-rose-900">
                  <SearchToggle />
                  <IoPersonOutline size={18} />
                  <BsBag size={18} />
                </div>
              </div>
            </nav>
        {/* <HeroCarousel/> */}

        {children}
        <footer className="bg-[#B76E79] text-[#fffff0] pt-16  text-center" data-aos="fade-up">
  {/* Manifesto */}
  <p className="text-lg italic text-[#fffff0] max-w-2xl mx-auto mb-8">
    Luxe Aura is more than a brand—it’s a philosophy. We believe elegance is a daily ritual, and every detail matters.
  </p>

  {/* Newsletter Signup */}
  <form className="max-w-md mx-auto mb-10 text-[#fffff0]">
    <label htmlFor="email" className="block text-sm mb-2 font-medium">Join our newsletter</label>
    <div className="flex items-center border border-deepplum rounded-full overflow-hidden">
      <input
        type="email"
        id="email"
        placeholder="Enter your email"
        className="flex-grow px-4 py-2 bg-transparent focus:outline-none"
      />
      <button
        type="submit"
        className="bg-deepplum text-[#fffff0] px-6 py-2 font-medium hover:bg-rosegold transition"
      >
        Subscribe
      </button>
    </div>
  </form>

  {/* Social Icons */}
  <div className="flex justify-center space-x-6 mb-8">
    <a href="https://instagram.com/luxeaura" className="text-[#fffff0] hover:text-rose-300 transition">
      <BsInstagram />
    </a>
    <a href="https://facebook.com/luxeaura" className="text-[#fffff0] hover:text-rose-300 transition">
      <FaFacebook />
    </a>
    <a href="https://twitter.com/luxeaura" className="text-[#fffff0] hover:text-rose-300 transition">
      <BsTwitterX />
    </a>
  </div>

  {/* Footer Links */}
  <div className="text-sm text-[#fffff0] space-x-4">
    <a href="/about" className="hover:underline">About</a>
    <a href="/journal" className="hover:underline">Journal</a>
    <a href="/contact" className="hover:underline">Contact</a>
    <a href="/privacy" className="hover:underline">Privacy</a>
  </div>

  {/* Copyright */}
  <div className="h-1 max-w-full bg-gradient-to-r from-rose-200 via-[#fffff0] to-rose-200 opacity-30 mb-2 mt-6"></div>

  <div className="border-t border-rose-700 text-center py-4 text-sm sm:text-base text-[#fffff0]">
    © {new Date().getFullYear()} Luxe Aura. All rights reserved.
  </div>
</footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
