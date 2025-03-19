import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
      <nav className="bg-blue-500 text-white p-4">
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link href="/search" className="hover:underline">Search</Link>
          </li>
          <li>
            <Link href="/contacts" className="hover:underline">Contacts</Link>
          </li>
        </ul>
      </nav>
    );
  };

export default Navbar;