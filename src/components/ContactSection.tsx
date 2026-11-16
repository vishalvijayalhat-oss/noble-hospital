import {type FormEvent, useState} from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  Navigation,
  PhoneCall,
} from 'lucide-react';
import {CLINIC_INFO} from '../data/clinicData';
import {
  buildEnquiryWhatsAppUrl,
  getDefaultWhatsAppUrl,
  triggerExternalLink,
} from '../utils/whatsapp';
import {ClinicMap} from './ClinicMap';

interface ContactSectionProps {
  quotaExceeded: boolean;
}

interface EnquiryErrors {
  name?: string;
  contact?: string;
  message?: string;
}

export function ContactSection({quotaExceeded}: ContactSectionProps) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [submittedEnquiryUrl, setSubmittedEnquiryUrl] = useState<string | null>(null);

  const handleEnquirySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: EnquiryErrors = {};

    if (name.trim().length < 2) {
      nextErrors.name = 'Please enter your name.';
    }
    if (contact.trim().length < 6) {
      nextErrors.contact = 'Please enter a valid phone number or email address.';
    }
    if (message.trim().length < 5) {
      nextErrors.message = 'Please enter your enquiry message.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    const whatsappUrl = buildEnquiryWhatsAppUrl({
      name: name.trim(),
      contact: contact.trim(),
      message: message.trim(),
    });
    setSubmittedEnquiryUrl(whatsappUrl);
    triggerExternalLink(whatsappUrl);
  };

  const resetEnquiry = () => {
    setSubmittedEnquiryUrl(null);
    setName('');
    setContact('');
    setMessage('');
    setErrors({});
  };

  return (
    <section
      id="contact"
      className="py-16 lg:py-24 bg-sky-50/50 border-t border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-semibold text-teal-700 mb-2">Contact &amp; Directions</p>
          <h2
            style={{textWrap: 'balance'}}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-950 tracking-tight"
          >
            Visit Noble Dental Hospital &amp; Research Centre
          </h2>
          <p className="text-base text-slate-600 mt-3 leading-relaxed">
            Reach us directly by phone or WhatsApp, locate our clinic in Malwadi, Hadapsar, or send
            us a quick enquiry below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left column: Clinic Details + Interactive Map */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7">
              <h3 className="text-xl font-bold text-slate-950 mb-5">{CLINIC_INFO.name}</h3>

              <div className="space-y-4 text-sm sm:text-base text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-sky-800 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-slate-900">Clinic Address</p>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">
                      {CLINIC_INFO.addressLine1}
                      <br />
                      {CLINIC_INFO.addressLine2}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <PhoneCall
                    className="w-5 h-5 text-sky-800 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-medium text-slate-900">Phone</p>
                    <a
                      href={CLINIC_INFO.phoneHref}
                      className="text-sky-800 font-semibold hover:underline tabular-nums mt-0.5 inline-block"
                    >
                      {CLINIC_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-sky-800 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-slate-900">Consultation Schedule</p>
                    <p className="text-slate-600 mt-0.5 tabular-nums">{CLINIC_INFO.hoursSummary}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-slate-200">
                <a
                  href={CLINIC_INFO.phoneHref}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-sky-800 hover:bg-sky-900 rounded-xl transition-colors whitespace-nowrap shrink-0"
                >
                  <PhoneCall className="w-4 h-4" aria-hidden="true" />
                  <span>Call {CLINIC_INFO.phoneDisplay}</span>
                </a>

                <a
                  href={getDefaultWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-4 h-4 text-teal-700" aria-hidden="true" />
                  <span>WhatsApp Us</span>
                </a>

                <a
                  href={CLINIC_INFO.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors whitespace-nowrap shrink-0"
                >
                  <Navigation className="w-4 h-4 text-sky-800" aria-hidden="true" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            <ClinicMap quotaExceeded={quotaExceeded} />
          </div>

          {/* Right column: Clinic Enquiry Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-950 mb-2">Clinic Enquiry Form</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Have a question about dental treatments, clinic timings, or directions? Send an
                enquiry directly to our clinic team.
              </p>

              {submittedEnquiryUrl ? (
                <div role="status" aria-live="polite" className="space-y-5 py-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-teal-700" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-slate-900">Enquiry Ready to Send</p>
                      <p className="text-sm text-slate-600 mt-1">
                        Thank you, {name}. Your enquiry has been prepared for WhatsApp so our
                        reception team can assist you promptly.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                    <a
                      href={submittedEnquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors whitespace-nowrap shrink-0"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Send via WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={resetEnquiry}
                      className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Send Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} noValidate className="space-y-4">
                  <div>
                    <label
                      htmlFor="enquiry-name"
                      className="block text-sm font-medium text-slate-800 mb-1.5"
                    >
                      Your Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="enquiry-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'enquiry-name-error' : undefined}
                      className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-700/20 focus:border-sky-700"
                    />
                    {errors.name && (
                      <p
                        id="enquiry-name-error"
                        className="mt-1.5 text-xs text-rose-700 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-contact"
                      className="block text-sm font-medium text-slate-800 mb-1.5"
                    >
                      Phone Number or Email <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="enquiry-contact"
                      type="text"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="e.g. 99228 58687 or email"
                      aria-invalid={Boolean(errors.contact)}
                      aria-describedby={errors.contact ? 'enquiry-contact-error' : undefined}
                      className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-700/20 focus:border-sky-700"
                    />
                    {errors.contact && (
                      <p
                        id="enquiry-contact-error"
                        className="mt-1.5 text-xs text-rose-700 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.contact}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-message"
                      className="block text-sm font-medium text-slate-800 mb-1.5"
                    >
                      Enquiry Message <span className="text-rose-600">*</span>
                    </label>
                    <textarea
                      id="enquiry-message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your question for our dental care team..."
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'enquiry-message-error' : undefined}
                      className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-700/20 focus:border-sky-700"
                    />
                    {errors.message && (
                      <p
                        id="enquiry-message-error"
                        className="mt-1.5 text-xs text-rose-700 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-semibold text-white bg-sky-800 hover:bg-sky-900 rounded-xl transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Send Clinic Enquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
