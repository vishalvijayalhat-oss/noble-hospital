import {MapPin, MessageCircle, PhoneCall} from 'lucide-react';
import {CLINIC_INFO} from '../data/clinicData';
import {getDefaultWhatsAppUrl} from '../utils/whatsapp';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Clinic Brand & Address */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-display text-lg font-bold text-white tracking-tight">
              {CLINIC_INFO.name}
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Providing patient-focused general, restorative, pediatric, orthodontic, and cosmetic
              dental care in Malwadi, Hadapsar, Pune.
            </p>
            <div className="space-y-2.5 pt-2 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-1" aria-hidden="true" />
                <span className="text-slate-300">{CLINIC_INFO.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-teal-400 shrink-0" aria-hidden="true" />
                <a
                  href={CLINIC_INFO.phoneHref}
                  className="text-white font-medium hover:text-teal-300 transition-colors tabular-nums"
                >
                  {CLINIC_INFO.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#book-appointment" className="hover:text-white transition-colors">
                  Book an Appointment
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact &amp; Directions
                </a>
              </li>
            </ul>
          </div>

          {/* Consultation Hours & Social Links */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Consultation Hours</h3>
              <p className="text-sm text-slate-400 leading-relaxed tabular-nums">
                {CLINIC_INFO.hoursSummary}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Connect With Us</h3>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <a
                  href={getDefaultWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-teal-300 hover:text-white hover:border-teal-600 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={CLINIC_INFO.mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-sky-600 transition-colors"
                >
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  <span>Google Maps</span>
                </a>
                <a
                  href={CLINIC_INFO.phoneHref}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-sky-600 transition-colors"
                >
                  <PhoneCall className="w-4 h-4" aria-hidden="true" />
                  <span>Call Clinic</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {currentYear} {CLINIC_INFO.name}. All rights reserved.
          </p>
          <p>Malwadi, Hadapsar, Pune, Maharashtra 411028</p>
        </div>
      </div>
    </footer>
  );
}
