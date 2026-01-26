import React, { useState } from 'react';
import { BsInstagram, BsTwitterX } from 'react-icons/bs';
import { FaFacebook, FaPinterest } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';
import logo from "./main logo.png";
import api from './api/axios';
import { FaArrowUp } from "react-icons/fa6";

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus('loading');
    
    try {
      // Call your backend API to send email via SMTP
      await api.post('/notifictions/subscribe/', { email });
      
      setSubscribeStatus('success');
      setEmail('');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      setSubscribeStatus('error');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-[#8B4555] via-[#B76E79] to-[#8B4555] text-[#fffff0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <img src={logo} alt="Luxe Aura" className="h-12 w-auto mb-3" />
            <p className="text-sm text-rose-100 leading-relaxed">
              Elevate your elegance with our curated collection of luxury perfumes and jewelry.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MdLocationOn className="text-base flex-shrink-0" />
                <span>Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-2">
                <MdPhone className="text-base flex-shrink-0" />
                <a href="tel:+2348001234567" className="hover:text-rose-200 transition">
                  +234 800 LUXE AURA
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MdEmail className="text-base flex-shrink-0" />
                <a href="mailto:hello@luxeaura.com" className="hover:text-rose-200 transition">
                  hello@luxeaura.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              <a 
                href="https://instagram.com/luxeaura" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                aria-label="Instagram"
              >
                <BsInstagram />
              </a>
              <a 
                href="https://facebook.com/luxeaura"
                target="_blank"
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a 
                href="https://twitter.com/luxeaura"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                aria-label="Twitter"
              >
                <BsTwitterX />
              </a>
              <a 
                href="https://pinterest.com/luxeaura"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                aria-label="Pinterest"
              >
                <FaPinterest />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-base">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/perfume" className="hover:text-rose-200 transition">Perfumes</Link></li>
              <li><Link to="/jewery" className="hover:text-rose-200 transition">Jewelry</Link></li>
              <li><Link to="/new_product" className="hover:text-rose-200 transition">New Arrivals</Link></li>
              <li><Link to="/shop_all" className="hover:text-rose-200 transition">Shop All</Link></li>
              <li><Link to="/fragrance_story" className="hover:text-rose-200 transition">About Us</Link></li>
              <li><Link to="/journal" className="hover:text-rose-200 transition">The Luxe Journal</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-semibold mb-4 text-base">Customer Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/orders" className="hover:text-rose-200 transition">Track Order</Link></li>
              <li><Link to="/shipping" className="hover:text-rose-200 transition">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-rose-200 transition">Returns & Refunds</Link></li>
              <li><Link to="/contact" className="hover:text-rose-200 transition">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-rose-200 transition">FAQs</Link></li>
              <li><Link to="/privacy" className="hover:text-rose-200 transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-base">Stay Connected</h4>
            <p className="text-sm text-rose-100 mb-3">
              Get exclusive offers & updates
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="w-full px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-rose-300/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm text-[#fffff0] placeholder-rose-200"
              />
              <button
                type="submit"
                disabled={subscribeStatus === 'loading'}
                className="w-full px-4 py-2.5 rounded-full bg-white text-[#8B4555] hover:bg-rose-50 transition font-semibold text-sm disabled:opacity-50"
              >
                {subscribeStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            
            {subscribeStatus === 'success' && (
              <p className="text-xs text-green-300 mt-2">✓ Successfully subscribed!</p>
            )}
            {subscribeStatus === 'error' && (
              <p className="text-xs text-red-300 mt-2">✗ Failed. Please try again.</p>
            )}

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="mt-4 ml-2 text-sm hover:text-rose-200 transition flex items-center gap-1"
            >
              <FaArrowUp /> Back to Top
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-rose-400/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            {/* Copyright */}
            <p className="text-rose-100">
              © {new Date().getFullYear()} Luxe Aura. All rights reserved.
            </p>

            {/* Payment & Security */}
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <span className="px-2.5 py-1 bg-white rounded text-gray-800 font-semibold">VISA</span>
                <span className="px-2.5 py-1 bg-white rounded text-gray-800 font-semibold">Mastercard</span>
                <span className="px-2.5 py-1 bg-white rounded text-gray-800 font-semibold">Paystack</span>
              </div>
              <div className="flex gap-2">
                <span className="px-2.5 py-1 bg-white/10 rounded font-semibold">🔒 SSL</span>
                <span className="px-2.5 py-1 bg-white/10 rounded font-semibold">✓ PCI-DSS</span>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex gap-3">
              <Link to="/terms" className="hover:text-rose-200 transition">Terms</Link>
              <span>•</span>
              <Link to="/privacy" className="hover:text-rose-200 transition">Privacy</Link>
              <span>•</span>
              <Link to="/accessibility" className="hover:text-rose-200 transition">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;