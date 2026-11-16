import {CLINIC_INFO} from '../data/clinicData';

export interface AppointmentPayload {
  patientName: string;
  mobileNumber: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
}

export interface EnquiryPayload {
  name: string;
  contact: string;
  message: string;
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function getDefaultWhatsAppUrl(): string {
  return buildWhatsAppUrl(CLINIC_INFO.whatsappDefaultMessage);
}

export function buildAppointmentWhatsAppUrl(payload: AppointmentPayload): string {
  const lines = [
    `Hello ${CLINIC_INFO.name},`,
    '',
    'I would like to submit an *Appointment Request* with the following details:',
    `• Patient Name: ${payload.patientName}`,
    `• Mobile Number: ${payload.mobileNumber}`,
    ...(payload.email ? [`• Email Address: ${payload.email}`] : []),
    `• Preferred Date: ${payload.preferredDate}`,
    `• Preferred Time: ${payload.preferredTime}`,
    '',
    'Note: I understand this is an appointment request and awaits confirmation from the clinic.',
  ];

  return buildWhatsAppUrl(lines.join('\n'));
}

export function buildEnquiryWhatsAppUrl(payload: EnquiryPayload): string {
  const lines = [
    `Hello ${CLINIC_INFO.name},`,
    '',
    'I have a clinic enquiry:',
    `• Name: ${payload.name}`,
    `• Contact: ${payload.contact}`,
    `• Message: ${payload.message}`,
  ];

  return buildWhatsAppUrl(lines.join('\n'));
}

export function triggerExternalLink(url: string): void {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
