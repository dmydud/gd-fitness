import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BioSection } from './components/BioSection';
import { PricingSection } from './components/PricingSection';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('hero');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#0a0c10] text-[#f3f4f6] font-sans antialiased selection:bg-[#e6b800] selection:text-black">
      {/* Sticky Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={() => setIsBookingModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          onOpenBooking={() => setIsBookingModalOpen(true)}
          onNavigateTab={setActiveTab}
        />

        <BioSection />

        <PricingSection
          onOpenBooking={() => setIsBookingModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Booking Quick Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
};

export default App;
