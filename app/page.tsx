'use client';

import CinematicSequence from '@/components/CinematicSequence';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Benefits from '@/components/Benefits';
import Services from '@/components/Services';

export default function Home() {
  return (
    <main className="relative bg-dark min-h-screen">
      {/* Cinematic Sequence - Fixed Background */}
      <CinematicSequence />

      {/* Navigation - Top Right */}
      <Navigation />

      {/* Content Sections - Above Canvas */}
      <div className="relative z-10">
        <Hero />
        <Benefits />
        <Services />
      </div>
    </main>
  );
}
