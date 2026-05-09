"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { resetAllPathWiseData } from "@/lib/demo-storage";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  
  const navLinks = [
    { name: "About Us", href: "/about" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Assessment", href: "/assessment" },
    { name: "Programs", href: "/programs" },
    { name: "Compare", href: "/compare" },
    { name: "Decision Board", href: "/decision-board" },
    { name: "AI Coach", href: "/coach" },
  ];

  const handleStartFree = (e: React.MouseEvent) => {
    e.preventDefault();
    resetAllPathWiseData();
    router.push("/assessment");
    // Force a reload to clear any context state if needed, 
    // but usually router.push is enough for Next.js to re-fetch on new page
    window.location.href = "/assessment";
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <img src="/logo.png" alt="PathWise Logo" className="w-8 h-8 rounded-lg shadow-sm" />
            <span className="font-bold text-xl tracking-tight text-primary">PathWise</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium overflow-x-auto">
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
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Link 
            href="/login" 
            className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
          >
            Login
          </Link>
          <button 
            onClick={handleStartFree}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 cursor-pointer"
          >
            Start Free
          </button>
        </div>
      </div>
    </nav>
  );
}
