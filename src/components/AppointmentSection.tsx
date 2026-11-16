import {type FormEvent, useState} from 'react';
import {AlertCircle, Calendar, CheckCircle2, Clock, MessageCircle, PhoneCall} from 'lucide-react';
import {APPOINTMENT_TIME_SLOTS, CLINIC_INFO} from '../data/clinicData';
import {
  type AppointmentPayload,
  buildAppointmentWhatsAppUrl,
  triggerExternalLink,
} from '../utils/whatsapp';

interface FormErrors {
  patientName?: string;
  mobileNumber?: string;
  email?: string;
  preferredDate?: string;
  preferredTime?: string;
}

function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function AppointmentSection() {
  const [patientName, setPatientName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState(APPOINTMENT_TIME_SLOTS[0]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedRequest, setSubmittedRequest] = useState<{
    payload: AppointmentPayload;
    whatsappUrl: string;
  } | null>(null);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    const trimmedName = patientName.trim();
    const digitsOnly = mobileNumber.replace(/\D/g, '');
    const trimmedEmail = email.trim();

    if (trimmedName.length < 2) {
      nextErrors.patientName = 'Please enter the patient’s full name (at least 2 characters).';
    }

    if (digitsOnly.length < 10 || digitsOnly.length > 13) {
      nextErrors.mobileNumber = 'Please enter a valid 10-digit mobile number.';
    }

    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = 'Please enter a valid email address or leave this field blank.';
    }

    if (!preferredDate) {
      nextErrors.preferredDate = 'Please select your preferred appointment date.';
    } else if (preferredDate < getTodayDateString()) {
      nextErrors.preferredDate = 'Please choose today or a future date.';
    }

    if (!preferredTime) {
      nextErrors.preferredTime = 'Please select a preferred time slot.';
    }

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const payload: AppointmentPayload = {
      patientName: patientName.trim(),
      mobileNumber: mobileNumber.trim(),
      email: email.trim(),
      preferredDate,
      preferredTime,
    };

    const whatsappUrl = buildAppointmentWhatsAppUrl(payload);
    setSubmittedRequest({payload, whatsappUrl});
    triggerExternalLink(whatsappUrl);
  };

  const handleReset = () => {
    setSubmittedRequest(null);
    setPatientName('');
    setMobileNumber('');
    setEmail('');
    setPreferredDate('');
    setErrors({});
  };

  return (
    <section
      id="book-appointment"
      className="py-16 lg:py-24 bg-gradient-to-b from-sky-50/70 to-white border-y border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left column: Booking info */}
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-teal-700 mb-2">Online Appointment Booking</p>
            <h2
              style={{textWrap: 'balance'}}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-950 tracking-tight mb-4"
            >
              Request Your Dental Visit in Minutes
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-8">
              Enter your contact details along with your preferred date and time window. Your
              request is forwarded directly to our reception desk on WhatsApp for prompt scheduling
              confirmation.
            </p>

            <div className="space-y-5 border-t border-slate-200 pt-6">
              <div className="flex items-start gap-3.5">
                <Calendar className="w-5 h-5 text-sky-800 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Clinic Confirmation Required
                  </h3>
                  <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">
                    Submitting this form sends an appointment request. Our clinic team will confirm
                    your exact slot via WhatsApp or phone call.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-sky-800 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Direct Phone Desk</h3>
                  <p className="text-sm text-slate-600 mt-0.5">
                    Need immediate assistance? Call{' '}
                    <a
                      href={CLINIC_INFO.phoneHref}
                      className="font-semibold text-sky-800 hover:underline tabular-nums"
                    >
                      {CLINIC_INFO.phoneDisplay}
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Booking form or Confirmation panel */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              {submittedRequest ? (
                <div role="status" aria-live="polite" className="space-y-6">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-teal-700" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-950">
                        Appointment Request Ready
                      </h3>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        Your appointment request details have been prepared and sent to WhatsApp.{' '}
                        <strong className="font-semibold text-slate-900">
                          Please note: this is an appointment request and requires confirmation from{' '}
                          {CLINIC_INFO.name}.
                        </strong>
                      </p>
                    </div>
                  </div>

                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl bg-sky-50/60 border border-slate-200 text-sm">
                    <div>
                      <dt className="text-slate-500">Patient Name</dt>
                      <dd className="font-semibold text-slate-900 mt-0.5">
                        {submittedRequest.payload.patientName}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Mobile Number</dt>
                      <dd className="font-semibold text-slate-900 mt-0.5 tabular-nums">
                        {submittedRequest.payload.mobileNumber}
                      </dd>
                    </div>
                    {submittedRequest.payload.email && (
                      <div className="sm:col-span-2">
                        <dt className="text-slate-500">Email Address</dt>
                        <dd className="font-semibold text-slate-900 mt-0.5">
                          {submittedRequest.payload.email}
                        </dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-slate-500">Preferred Date</dt>
                      <dd className="font-semibold text-slate-900 mt-0.5 tabular-nums">
                        {submittedRequest.payload.preferredDate}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Preferred Time</dt>
                      <dd className="font-semibold text-slate-900 mt-0.5 tabular-nums">
                        {submittedRequest.payload.preferredTime}
                      </dd>
                    </div>
                  </dl>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <a
                      href={submittedRequest.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors whitespace-nowrap shrink-0"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Send Request on WhatsApp</span>
                    </a>

                    <a
                      href={CLINIC_INFO.phoneHref}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-sky-900 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-xl transition-colors whitespace-nowrap shrink-0"
                    >
                      <PhoneCall className="w-4 h-4" aria-hidden="true" />
                      <span>Call {CLINIC_INFO.phoneDisplay}</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      New Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="booking-name"
                        className="block text-sm font-medium text-slate-800 mb-1.5"
                      >
                        Patient Name <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        required
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="e.g. Aarav Kulkarni"
                        aria-invalid={Boolean(errors.patientName)}
                        aria-describedby={errors.patientName ? 'booking-name-error' : undefined}
                        className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-700/20 focus:border-sky-700"
                      />
                      {errors.patientName && (
                        <p
                          id="booking-name-error"
                          className="mt-1.5 text-xs text-rose-700 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.patientName}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="booking-mobile"
                        className="block text-sm font-medium text-slate-800 mb-1.5"
                      >
                        Mobile Number <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="booking-mobile"
                        type="tel"
                        required
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="e.g. 99228 58687"
                        aria-invalid={Boolean(errors.mobileNumber)}
                        aria-describedby={errors.mobileNumber ? 'booking-mobile-error' : undefined}
                        className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-xl tabular-nums focus:outline-none focus:ring-2 focus:ring-sky-700/20 focus:border-sky-700"
                      />
                      {errors.mobileNumber && (
                        <p
                          id="booking-mobile-error"
                          className="mt-1.5 text-xs text-rose-700 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.mobileNumber}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="booking-email"
                      className="block text-sm font-medium text-slate-800 mb-1.5"
                    >
                      Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'booking-email-error' : undefined}
                      className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-700/20 focus:border-sky-700"
                    />
                    {errors.email && (
                      <p
                        id="booking-email-error"
                        className="mt-1.5 text-xs text-rose-700 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="booking-date"
                        className="block text-sm font-medium text-slate-800 mb-1.5"
                      >
                        Preferred Appointment Date <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="booking-date"
                        type="date"
                        required
                        min={getTodayDateString()}
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        aria-invalid={Boolean(errors.preferredDate)}
                        aria-describedby={errors.preferredDate ? 'booking-date-error' : undefined}
                        className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-xl tabular-nums focus:outline-none focus:ring-2 focus:ring-sky-700/20 focus:border-sky-700"
                      />
                      {errors.preferredDate && (
                        <p
                          id="booking-date-error"
                          className="mt-1.5 text-xs text-rose-700 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.preferredDate}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="booking-time"
                        className="block text-sm font-medium text-slate-800 mb-1.5"
                      >
                        Preferred Appointment Time <span className="text-rose-600">*</span>
                      </label>
                      <select
                        id="booking-time"
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        aria-invalid={Boolean(errors.preferredTime)}
                        aria-describedby={errors.preferredTime ? 'booking-time-error' : undefined}
                        className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-xl tabular-nums focus:outline-none focus:ring-2 focus:ring-sky-700/20 focus:border-sky-700"
                      >
                        {APPOINTMENT_TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      {errors.preferredTime && (
                        <p
                          id="booking-time-error"
                          className="mt-1.5 text-xs text-rose-700 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.preferredTime}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-xs text-slate-500">
                      Appointments remain a request until confirmed by the clinic.
                    </p>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-sky-800 hover:bg-sky-900 rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Submit Request via WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
