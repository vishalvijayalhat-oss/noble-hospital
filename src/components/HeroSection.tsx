import {CalendarCheck, MessageCircle, PhoneCall} from 'lucide-react';
import {motion} from 'motion/react';
import {CLINIC_IMAGES, CLINIC_INFO} from '../data/clinicData';
import {getDefaultWhatsAppUrl} from '../utils/whatsapp';
import {ClinicImage} from './ClinicImage';

const HERO_STRIPS = [
  {
    label: 'Patient-First Care',
    detail: 'Calm consultations tailored to comfort',
  },
  {
    label: 'Clinical Hygiene',
    detail: 'Structured sterilization workflows',
  },
  {
    label: 'Complete Care',
    detail: 'Comprehensive oral health & smile care',
  },
  {
    label: 'Direct Support',
    detail: 'WhatsApp & phone scheduling',
  },
];

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-white border-b border-slate-200/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12 lg:pt-16 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left column: Hero copy & primary actions */}
          <motion.div
            initial={{opacity: 0, y: 12}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <p className="text-xs sm:text-sm font-medium text-teal-800 tracking-wide mb-4">
              {CLINIC_INFO.name} · Malwadi, Hadapsar, Pune
            </p>

            <h1
              style={{fontSize: 'clamp(2.25rem, 4vw, 3.75rem)', textWrap: 'balance'}}
              className="font-bold text-slate-950 leading-[1.08] tracking-tight mb-5"
            >
              Your Smile, Our Priority
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
              Experience advanced dental care with comfort, compassion and confidence at Noble
              Dental Hospital &amp; Research Centre.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
              <a
                href="#book-appointment"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-sky-800 hover:bg-sky-900 rounded-xl shadow-sm transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
              >
                <CalendarCheck className="w-5 h-5" aria-hidden="true" />
                <span>Book an Appointment</span>
              </a>

              <a
                href={getDefaultWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
              >
                <MessageCircle className="w-5 h-5 text-teal-700" aria-hidden="true" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600 pt-5 border-t border-slate-200/80">
              <a
                href={CLINIC_INFO.phoneHref}
                className="inline-flex items-center gap-2 font-medium text-slate-800 hover:text-sky-800 transition-colors tabular-nums"
              >
                <PhoneCall className="w-4 h-4 text-sky-700" aria-hidden="true" />
                <span>{CLINIC_INFO.phoneDisplay}</span>
              </a>
              <span aria-hidden="true" className="text-slate-300">
                |
              </span>
              <span>Next to Dharmadhikari Hospital, Hadapsar</span>
            </div>
          </motion.div>

          {/* Right column: Full-height clinic visual */}
          <motion.div
            initial={{opacity: 0, y: 14}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-6 flex"
          >
            <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-100 min-h-[280px] sm:min-h-[380px] lg:min-h-[440px]">
              <ClinicImage
                src={CLINIC_IMAGES.heroClinic}
                alt="Noble Dental Hospital & Research Centre modern treatment suite in Hadapsar, Pune"
                title="Noble Dental Hospital & Research Centre"
                loading="eager"
                className="w-full h-full object-cover lg:h-full"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/75 via-slate-950/30 to-transparent pointer-events-none"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white">
                <p className="text-sm font-semibold">
                  Modern Clinical Suite · Malwadi, Hadapsar
                </p>
                <p className="text-xs text-slate-100/90 mt-0.5">
                  Clean, calm dental care environment built around patient comfort
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-width 4-column summary strip below hero split */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {HERO_STRIPS.map((item) => (
            <div key={item.label}>
              <p className="font-display text-sm font-semibold text-slate-900">{item.label}</p>
              <p className="text-sm text-slate-600 mt-1">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
