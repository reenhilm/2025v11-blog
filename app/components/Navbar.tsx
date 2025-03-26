import React from 'react';
import Link from 'next/link';
import { ModeToggle } from "./mode-toggle";
import { ThemeProvider } from "./theme-provider";

const Navbar: React.FC = () => {
    return (
      <nav className="bg-blue-500 text-white p-4 theme-secondary-colored theme-children-inherit">
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
          <li>
            <div className="theme-break-inherit">
              <ThemeProvider
                      attribute="class"
                      defaultTheme="system"
                      enableSystem
                      disableTransitionOnChange
              >
                <ModeToggle />
              </ThemeProvider>
            </div>
          </li>
        </ul>
      </nav>
    );
  };

export default Navbar;