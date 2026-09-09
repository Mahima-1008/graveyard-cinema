import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import MobileNav from '../components/layout/MobileNav';
import Footer from '../components/layout/Footer';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Desktop Navigation */}
      <Navbar />
      
      {/* Mobile Navigation */}
      <MobileNav />

      {/* Main Content Area */}
      {/* 
        md:pt-0 because Navbar is transparent at top and covers hero sections. 
        pb-16 on mobile to account for fixed bottom nav bar 
      */}
      <main className="flex-1 flex flex-col relative z-10 pb-16 md:pb-0 pt-14 md:pt-0">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
