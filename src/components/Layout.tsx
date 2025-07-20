import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="flex-grow" role="main">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout; 