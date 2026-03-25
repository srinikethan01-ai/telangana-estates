import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Building2, Menu, X, User as UserIcon, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useLogout } from "@workspace/api-client-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function Navbar() {
  const [location, setLocation] = useLocation();
  const { isAuthenticated, user, refetchUser } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { mutate: logout } = useLogout();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        refetchUser();
        toast({ title: "Logged out successfully", variant: "default" });
        setLocation("/");
      }
    });
  };

  const navLinks = [
    { name: "Properties", href: "/#properties" },
    { name: "Agent Plans", href: "/#plans" },
    { name: "About", href: "/#about" },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        isScrolled ? "bg-background/80 backdrop-blur-md border-border/50 shadow-lg shadow-black/20 py-3" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold text-xl tracking-wider text-foreground">
              Telangana<span className="text-primary">Estates</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4 pl-6 border-l border-border/50">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                    <UserIcon className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-sm font-medium text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                    Sign In
                  </Link>
                  <Link 
                    href="/signup" 
                    className="px-5 py-2.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
                  >
                    Partner With Us
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border/50 shadow-xl py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg"
            >
              {link.name}
            </a>
          ))}
          <div className="h-px w-full bg-border/50 my-2" />
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-base font-medium text-foreground hover:bg-secondary rounded-lg flex items-center gap-2">
                <UserIcon className="w-4 h-4" /> Dashboard
              </Link>
              <button 
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-2 text-base font-medium text-destructive hover:bg-secondary rounded-lg flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 px-2">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full py-3 text-center border border-border rounded-lg font-medium">
                Sign In
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full py-3 text-center bg-primary text-primary-foreground rounded-lg font-medium">
                Partner With Us
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
