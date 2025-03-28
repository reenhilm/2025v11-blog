import React from 'react';
import Link from 'next/link';
import { ModeToggle } from "./mode-toggle";
import { ThemeProvider } from "./theme-provider";
import { Separator } from "@/components/ui/separator"



const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between bg-blue-500 text-white p-4 theme-secondary-colored theme-children-inherit">
      <ul className="flex items-center space-x-4">
        <li>
          <Link href="/" className="hover:underline">Home</Link>
        </li>
        <Separator orientation="vertical" />
        <li>
          <Link href="/search" className="hover:underline">Search</Link>
        </li>
        <Separator orientation="vertical" />
        <li>
          <Link href="/contacts" className="hover:underline">Contacts</Link>
        </li>
        <Separator orientation="vertical" />
        <li>
          <Link href="/posters" className="hover:underline">Most prolific posters</Link>
        </li>
      </ul>
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
      </nav>
  );
};


export default Navbar;