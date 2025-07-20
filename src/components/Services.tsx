'use client';

import React, { useState, useEffect } from 'react';

interface Service {
  title: string;
  description: string;
  features: string[];
  icon: string;
  gradient: string;
  isPrimary?: boolean;
}

const Services: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const services: Service[] = [
    {
      title: 'Radio Commercial Production',
      description: 'Professional radio commercials that capture attention and drive results for your business.',
      features: ['Script Writing', 'Professional Voice Talent', 'Sound Design', 'Full Production'],
      icon: '🎙️',
      gradient: 'service-gradient-web',
      isPrimary: true
    },
    {
      title: 'Audio Imaging',
      description: 'Custom audio branding and imaging to enhance your radio station\'s identity.',
      features: ['Station IDs', 'Jingles & Sweepers', 'Promotional Spots', 'Brand Audio'],
      icon: '🎵',
      gradient: 'service-gradient-design'
    },
    {
      title: 'Event Recording',
      description: 'High-quality audio recording services for live events and special occasions.',
      features: ['Live Recording', 'Multi-track Mixing', 'Audio Post-Production', 'Digital Delivery'],
      icon: '🎤',
      gradient: 'service-gradient-branding'
    }
  ];

  if (!isClient) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional audio production services for radio and beyond
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional audio production services specializing in radio commercials and audio content
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 ${service.gradient} border border-gray-200 ${
                service.isPrimary ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {/* Primary Service Badge */}
              {service.isPrimary && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Primary Service
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className="text-4xl mb-4">{service.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Ready to bring your audio vision to life?
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                const headerHeight = 64; // h-16 = 64px
                const elementPosition = element.offsetTop - headerHeight;
                window.scrollTo({ top: elementPosition, behavior: 'smooth' });
              }
            }}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services; 