
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bird, Library, Home, Map } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-b border-nature-200/50 backdrop-blur-md">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
              <Bird className="h-8 w-8 text-nature-600" />
              <span className="text-xl font-medium text-nature-800">BirdDex</span>
            </Link>
            
            <nav className="flex items-center space-x-1">
              <Link
                to="/"
                className={`flex items-center justify-center rounded-full p-2.5 text-sm font-medium transition-colors 
                  ${location.pathname === '/' 
                    ? 'bg-nature-100 text-nature-900' 
                    : 'text-nature-600 hover:bg-nature-100 hover:text-nature-900'}`}
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Link>
              
              <Link
                to="/collection"
                className={`flex items-center justify-center rounded-full p-2.5 text-sm font-medium transition-colors 
                  ${location.pathname === '/collection' 
                    ? 'bg-nature-100 text-nature-900' 
                    : 'text-nature-600 hover:bg-nature-100 hover:text-nature-900'}`}
              >
                <Library className="h-5 w-5" />
                <span className="sr-only">Collection</span>
              </Link>
              
              <Link
                to="/overview"
                className={`flex items-center justify-center rounded-full p-2.5 text-sm font-medium transition-colors 
                  ${location.pathname === '/overview' 
                    ? 'bg-nature-100 text-nature-900' 
                    : 'text-nature-600 hover:bg-nature-100 hover:text-nature-900'}`}
              >
                <Map className="h-5 w-5" />
                <span className="sr-only">Overview</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
