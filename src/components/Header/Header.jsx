import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const renderGetStartedButton = () => {
    if (location.pathname === '/portfolio-public') {
      return (
        <Link to="/portfolio-create" className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400">
          Go Back to Create
        </Link>
      );
    }
    
    if (location.pathname !== '/portfolio-create') {
      return (
        <Link to="/portfolio-create" className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400">
          Get Started
        </Link>
      );
    }

    return null;
  };

  return (
    <header className="bg-gray-800 text-stone-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4 px-5 sm:px-16">
        <div className="text-3xl font-bold">
          <Link to="/" className="text-yellow-500 hover:text-yellow-400">ArtFolio</Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-stone-50 text-lg hover:text-yellow-400">Home</Link>
          {renderGetStartedButton()}
        </nav>
        <button
          className="md:hidden flex items-center px-3 py-2 border rounded text-white border-white hover:text-yellow-400 hover:border-yellow-400"
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-gray-700`}>
        <nav className="flex flex-col items-center py-4 space-y-2">
          <Link to="/" className="text-white hover:text-yellow-400" onClick={toggleMenu}>Home</Link>
          {renderGetStartedButton() && (
            <Link to={location.pathname === '/portfolio-public' ? '/portfolio-create' : '/portfolio-create'}
              className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400"
              onClick={toggleMenu}
            >
              {location.pathname === '/portfolio-public' ? 'Go Back to Create' : 'Get Started'}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
