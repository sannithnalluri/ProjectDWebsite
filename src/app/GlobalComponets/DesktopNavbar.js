import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function DesktopNavbar() {
  return (
    <div className="bg-gray-800 text-white flex justify-between items-center p-4">
      {/* Logo Section */}
      <div className="flex items-center">
        <Image 
          src="/logo.png" 
          alt="Logo" 
          width={50} 
          height={50} 
        />
        <span className="ml-3 text-xl font-bold">Project DashBoard</span>
      </div>

      {/* Navigation Links */}
      <nav>
        <ul className="flex space-x-8">
          <li>
            <Link className="hover:text-gray-400" href="/">Home</Link>
          </li>
          <li>
            <Link className="hover:text-gray-400" href="/">Project</Link>
          </li>

          <li>
            <Link className="hover:text-gray-400" href="/">Finical</Link>
          </li>

          <li>
            <Link className="hover:text-gray-400" href="/">Personal</Link>
          </li>
          <li>
            <Link className="hover:text-gray-400" href="/">Report</Link>
          </li>
          <li>
            <Link className="hover:text-gray-400" href="/">Singout</Link>
          </li>
     
          
        </ul>
      </nav>
    </div>
  );
}
