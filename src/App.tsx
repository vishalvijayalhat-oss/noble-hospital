/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {useEffect, useState} from 'react';
import {AboutSection} from './components/AboutSection';
import {AppointmentSection} from './components/AppointmentSection';
import {ContactSection} from './components/ContactSection';
import {FaqSection} from './components/FaqSection';
import {FloatingWhatsApp} from './components/FloatingWhatsApp';
import {Footer} from './components/Footer';
import {Header} from './components/Header';
import {HeroSection} from './components/HeroSection';
import {TestimonialsSection} from './components/TestimonialsSection';
import {WhyChooseSection} from './components/WhyChooseSection';

export default function App() {
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  useEffect(() => {
    const handleQuotaExceeded = () => {
      setQuotaExceeded(true);
    };
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      <Header />

      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <WhyChooseSection />
        <AppointmentSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection quotaExceeded={quotaExceeded} />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
