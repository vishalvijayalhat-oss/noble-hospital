import {useState} from 'react';
import {Menu, X} from 'lucide-react';
import {CLINIC_INFO} from '../data/clinicData';

const NAV_LINKS = [
  {label: 'About', href: '#about'},
  {label: 'Appointment', href: '#book-appointment'},
  {label: 'FAQ', href: '#faq'},
  {label: 'Contact', href: '#contact'},
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#top"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700 rounded-md"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <rect width="32" height="32" rx="8" fill="#0E5A9C" />
            <path
              d="M11.2 9.5C9.4 9.5 8 11 8 13.1C8 15.6 9.3 18.1 10.4 21.8C10.8 23.1 11.7 23.6 12.6 22.9C13.6 22.1 14.5 19.3 16 19.3C17.5 19.3 18.4 22.1 19.4 22.9C20.3 23.6 21.2 23.1 21.6 21.8C22.7 18.1 24 15.6 24 13.1C24 11 22.6 9.5 20.8 9.5C19.2 9.5 17.8 10.4 16 10.4C14.2 10.4 12.8 9.5 11.2 9.5Z"
              fill="#FFFFFF"
            />
            <circle cx="23.5" cy="8.5" r="2.5" fill="#14B8A6" />
          </svg>
          <span>{CLINIC_INFO.shortName}</span>
        </a>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-1 border-b-2 border-transparent hover:border-teal-600 hover:text-sky-900 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary CTA action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#book-appointment"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-sky-800 hover:bg-sky-900 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
          >
            Book Appointment
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-sky-700"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-1"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-sky-900 hover:bg-sky-50/70 rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#book-appointment"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full px-5 py-3 text-sm font-semibold text-white bg-sky-800 hover:bg-sky-900 rounded-lg transition-colors"
            >
              Book Appointment
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
