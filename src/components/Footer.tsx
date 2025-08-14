import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Shield, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <Globe className="h-8 w-8 text-blue-400" />
                <Shield className="h-4 w-4 text-amber-400 absolute -top-1 -right-1" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">GLOBAL PATHWAY</span>
                <span className="text-xs text-amber-400 font-medium">VISA SERVICES</span>
              </div>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              Your trusted partner in global visa applications and immigration services. 
              We provide secure, professional assistance for your pathway to new opportunities worldwide.
            </p>
            <div className="flex items-center space-x-2 text-sm text-amber-400">
              <Shield className="h-4 w-4" />
              <span>SSL Secured & Confidential</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/apply" className="text-gray-300 hover:text-white transition-colors">Apply Now</Link></li>
              <li><Link to="/faqs" className="text-gray-300 hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy & Terms</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@globalpathwayvisa.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>New York, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Global Pathway Visa Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;