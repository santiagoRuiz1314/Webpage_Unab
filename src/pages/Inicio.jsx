import React from 'react';
import Hero from '../components/Hero';
import ProfilePreview from '../components/ProfilePreview';
import QuickLinks from '../components/QuickLinks';
import EventsPreview from '../components/EventsPreview';
import Announcements from '../components/Announcements';
import HorasLibresStats from '../components/HorasLibresStats';
import WelcomeBanner from '../components/WelcomeBanner';

const Inicio = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Main Content */}
      <div className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Welcome Banner */}
          <WelcomeBanner />
          
          {/* Profile and Quick Links Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-1">
              <ProfilePreview />
            </div>
            <div className="md:col-span-2">
              <QuickLinks />
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="mb-8">
            <HorasLibresStats />
          </div>
          
          {/* Events Preview Section */}
          <div className="mb-8" id="eventos">
            <EventsPreview />
          </div>
          
          {/* Announcements Section */}
          <div className="mb-8" id="anuncios">
            <Announcements />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;