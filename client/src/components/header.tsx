import { useState, useEffect } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isAuthenticated, getCurrentUser, logout } from "@/lib/auth";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <header className="bg-az-magenta shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            {/* AstraZeneca Logo */}
            <div className="w-10 h-10 bg-az-gold rounded-lg flex items-center justify-center">
              <span className="text-az-magenta font-bold text-xl">AZ</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Clinical Trials Portal</h1>
              <p className="text-pink-200 text-sm">Advancing Healthcare Research</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-white hover:text-az-gold transition-colors duration-200 font-medium">
              Trials
            </a>
            <a href="/eligibility" className="text-white hover:text-az-gold transition-colors duration-200 font-medium">
              Eligibility
            </a>
            {user && (
              <a href="/appointment-booking" className="text-white hover:text-az-gold transition-colors duration-200 font-medium">
                Book Appointment
              </a>
            )}
            {user && (
              <a href="/dashboard" className="text-white hover:text-az-gold transition-colors duration-200 font-medium">
                Dashboard
              </a>
            )}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-white text-sm">Welcome, {user.firstName}</span>
                <Button 
                  onClick={logout}
                  variant="outline" 
                  className="border-az-gold text-az-gold hover:bg-az-gold hover:text-az-magenta"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <a href="/login">
                <Button className="bg-az-gold hover:bg-yellow-500 text-az-magenta font-semibold">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </a>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden text-white hover:text-az-gold transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <a href="/" className="text-white hover:text-az-gold transition-colors duration-200 font-medium">
                Trials
              </a>
              <a href="/eligibility" className="text-white hover:text-az-gold transition-colors duration-200 font-medium">
                Eligibility
              </a>
              {user && (
                <a href="/appointment-booking" className="text-white hover:text-az-gold transition-colors duration-200 font-medium">
                  Book Appointment
                </a>
              )}
              {user && (
                <a href="/dashboard" className="text-white hover:text-az-gold transition-colors duration-200 font-medium">
                  Dashboard
                </a>
              )}
              {user ? (
                <div className="space-y-3">
                  <span className="text-white text-sm block">Welcome, {user.firstName}</span>
                  <Button 
                    onClick={logout}
                    variant="outline" 
                    className="border-az-gold text-az-gold hover:bg-az-gold hover:text-az-magenta w-fit"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <a href="/login">
                  <Button className="bg-az-gold hover:bg-yellow-500 text-az-magenta font-semibold w-fit">
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
