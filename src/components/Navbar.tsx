"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { resetAllPathWiseData } from "@/lib/demo-storage";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { name: "About Us", href: "/about" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Assessment", href: "/assessment" },
    { name: "Programs", href: "/programs" },
    { name: "Compare", href: "/compare" },
    { name: "Decision Board", href: "/decision-board" },
    { name: "AI Coach", href: "/coach" },
  ];

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleStartFree = (e: React.MouseEvent) => {
    e.preventDefault();
    resetAllPathWiseData();
    window.location.href = "/assessment";
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-8 flex items-center space-x-2">
            <img src="/logo.png" alt="PathWise Logo" className="w-8 h-8 rounded-lg shadow-sm" />
            <span className="font-bold text-xl tracking-tight text-primary">PathWise</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-foreground/80 whitespace-nowrap",
                  pathname?.startsWith(link.href)
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/login" 
              className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
            >
              Login
            </Link>
            <button 
              onClick={handleStartFree}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 cursor-pointer shadow-sm"
            >
              Start Free
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b bg-white overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    pathname?.startsWith(link.href) ? "text-primary" : "text-slate-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-slate-100 my-2" />
              <div className="flex flex-col space-y-4 pt-2">
                <Link 
                  href="/login" 
                  className="text-lg font-medium text-slate-600"
                >
                  Login
                </Link>
                <button 
                  onClick={handleStartFree}
                  className="w-full inline-flex items-center justify-center rounded-xl bg-primary text-white font-bold py-4 shadow-lg shadow-blue-500/20"
                >
                  Start Free
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
