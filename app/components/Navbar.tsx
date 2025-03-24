import React from 'react';
import Link from 'next/link';
import { ModeToggle } from "./mode-toggle";
import { ThemeProvider } from "./theme-provider";

const Navbar: React.FC = () => {
    return (
      <nav className="bg-blue-500 text-white p-4 theme-set_redirect-element-field">
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
            <Link href="/posters" className="hover:underline">Most prolific posters</Link>
          </li>
          <li>
            <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange>
              <ModeToggle />
            </ThemeProvider>
          </li>
        </ul>
      </nav>
    );
  };

export default Navbar;