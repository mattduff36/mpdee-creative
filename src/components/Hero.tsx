'use client';

import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      const headerHeight = 64; // h-16 = 64px
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const headerHeight = 64; // h-16 = 64px
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  const scrollToClientLogin = () => {
    const element = document.getElementById('client-login');
    if (element) {
      const headerHeight = 64; // h-16 = 64px
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  if (!isClient) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            MPDEE Creative
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl">
            Professional Audio Production Services
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ marginTop: 0, paddingTop: 0 }}>
      {/* Background Image with Overlay - Hero section only */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <img
          src="/images/IMG_2296_optimized.jpg"
          alt="MPDEE Creative Studio Background"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: 'center top',
            minWidth: '100%',
            minHeight: '100%',
            opacity: '0.25',
            top: 0,
            left: 0
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-gray-50/30"></div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden z-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-30"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-emerald-100 rounded-full opacity-30"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-100 rounded-full opacity-30"></div>
        <div className="absolute bottom-40 right-1/3 w-8 h-8 bg-pink-100 rounded-full opacity-30"></div>
      </div>

      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            MPDEE{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Creative
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
            Professional Audio Production Services
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Specializing in radio commercial production, audio imaging, and event recording. 
            We bring your sound to life with professional quality and creative excellence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToServices}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Our Audio Services
            </button>
            <button
              onClick={scrollToClientLogin}
              className="px-8 py-4 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 bg-white/80 hover:bg-white"
            >
              Client Login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 