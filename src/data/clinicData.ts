export interface SampleTestimonial {
  id: string;
  patientName: string;
  treatment: string;
  locality: string;
  quote: string;
  rating: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const CLINIC_INFO = {
  name: 'Noble Dental Hospital & Research Centre',
  shortName: 'Noble Dental Hospital',
  addressLine1: 'Room No. 05, Next to Dharmadhikari Hospital,',
  addressLine2: 'Malwadi, Hadapsar, Pune, Maharashtra 411028, India',
  fullAddress:
    'Room No. 05, Next to Dharmadhikari Hospital, Malwadi, Hadapsar, Pune, Maharashtra 411028, India',
  phoneDisplay: '099228 58687',
  phoneHref: 'tel:+919922858687',
  whatsappNumber: '919922858687',
  whatsappDefaultMessage:
    'Hello Noble Dental Hospital, I would like to enquire about a dental appointment.',
  mapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Dharmadhikari+Hospital,+Malwadi,+Hadapsar,+Pune,+Maharashtra+411028',
  mapsSearchUrl:
    'https://www.google.com/maps/search/?api=1&query=Dharmadhikari+Hospital,+Malwadi,+Hadapsar,+Pune,+Maharashtra+411028',
  hoursSummary: 'Mon – Sat: 10:00 AM – 8:30 PM · Sun: By Appointment Request',
};

export const CLINIC_IMAGES = {
  heroClinic: '/src/assets/images/hero_dental_clinic_1794847296675.jpg',
  aboutConsultation: '/src/assets/images/about_dental_consultation_1794847296614.jpg',
  operatorySuite: '/src/assets/images/service_dental_operatory_1794847296641.jpg',
  cosmeticSmile: '/src/assets/images/service_cosmetic_smile_1794847296912.jpg',
  orthodonticsCare: '/src/assets/images/service_orthodontics_care_1794847297942.jpg',
  sterilizationBay: '/src/assets/images/clinic_sterilization_bay_1794847298823.jpg',
};

export const ABOUT_PILLARS = [
  {
    title: 'Patient-Focused Dental Care',
    description:
      'Every consultation begins with attentive listening, clear explanations of your options, and treatment plans paced around your comfort.',
  },
  {
    title: 'Comfortable Treatment Environment',
    description:
      'Bright, calm clinical spaces in Malwadi, Hadapsar designed to put anxious patients, seniors, and children at ease from arrival to recovery.',
  },
  {
    title: 'Modern Dental-Care Approach',
    description:
      'Contemporary clinical protocols, structured sterilization routines, and conservative techniques focused on preserving natural teeth.',
  },
  {
    title: 'Commitment to Oral Health & Healthy Smiles',
    description:
      'Preventive guidance and long-term follow-through so every visit supports lasting comfort, function, and confidence.',
  },
];

export const WHY_CHOOSE_US = [
  {
    number: '01',
    title: 'Transparent Guidance Before Treatment',
    description:
      'We walk you through every finding, procedural step, and care alternative in plain language so you make informed decisions without pressure.',
  },
  {
    number: '02',
    title: 'Strict Hygiene & Sterilization Standards',
    description:
      'Dedicated sterilization workflows, sealed instrument pouches, and clean operatory preparation between every single patient visit.',
  },
  {
    number: '03',
    title: 'Gentle, Comfort-First Procedures',
    description:
      'From routine scaling to root canals and extractions, our team prioritizes calm pacing and effective pain management throughout.',
  },
  {
    number: '04',
    title: 'Accessible Hadapsar Location & Fast Coordination',
    description:
      'Conveniently located in Room No. 05 next to Dharmadhikari Hospital, Malwadi, with direct phone and WhatsApp appointment coordination.',
  },
];

export const SAMPLE_TESTIMONIALS: SampleTestimonial[] = [
  {
    id: 'sample-1',
    patientName: 'Sneha Kulkarni',
    treatment: 'Root Canal Treatment',
    locality: 'Hadapsar, Pune',
    quote:
      'I arrived feeling very nervous about my toothache, but the team explained each step calmly and kept the entire root canal procedure comfortable.',
    rating: 5,
  },
  {
    id: 'sample-2',
    patientName: 'Rajesh Deshmukh',
    treatment: 'Dental Cleaning and Scaling',
    locality: 'Malwadi, Pune',
    quote:
      'Spotless treatment room, courteous staff, and clear preventive guidance. Booking my follow-up visit through WhatsApp was straightforward.',
    rating: 5,
  },
  {
    id: 'sample-3',
    patientName: 'Priya Joshi',
    treatment: 'Braces and Orthodontics',
    locality: 'Magarpatta Road, Pune',
    quote:
      'The consultation answered all our questions clearly regarding aligner timelines and routine care. We felt genuinely cared for at every checkup.',
    rating: 5,
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How does the online appointment request and confirmation process work?',
    answer:
      'Submitting the online appointment form sends your preferred service, date, and time directly to our clinic team via WhatsApp. Because appointment slots depend on live clinic scheduling, your booking is treated as a request until our reception confirms your exact slot by WhatsApp or phone.',
  },
  {
    id: 'faq-2',
    question: 'Where is Noble Dental Hospital & Research Centre located in Hadapsar?',
    answer:
      'We are located at Room No. 05, Next to Dharmadhikari Hospital, Malwadi, Hadapsar, Pune, Maharashtra 411028. You can use the interactive Google Map or the Get Directions button in the Contact section for turn-by-turn navigation.',
  },
  {
    id: 'faq-3',
    question: 'What should I expect during my first dental consultation?',
    answer:
      'Your first visit includes a thorough discussion of any dental concerns or discomfort, a careful clinical oral examination, and clear guidance on recommended next steps—whether preventive cleaning, restorative treatment, or cosmetic care.',
  },
  {
    id: 'faq-4',
    question: 'Are root canal treatments and tooth extractions painful?',
    answer:
      'Our team prioritizes patient comfort using local anaesthesia and calm, measured clinical techniques. Most patients experience minimal discomfort during the procedure and receive clear aftercare instructions for smooth recovery.',
  },
  {
    id: 'faq-5',
    question: 'Do you treat children and families at the clinic?',
    answer:
      'Yes. Through our Pediatric Dentistry and General Dentistry services, we welcome children, adults, and senior family members in a reassuring, patient-friendly setting.',
  },
  {
    id: 'faq-6',
    question: 'Can I enquire about treatment options on WhatsApp before visiting?',
    answer:
      'Yes. Click any Chat on WhatsApp button or use the floating WhatsApp icon at the bottom right to message our front desk directly on +91 99228 58687 for scheduling or general clinic enquiries.',
  },
];

export const APPOINTMENT_TIME_SLOTS = [
  'Morning (10:00 AM – 11:30 AM)',
  'Midday (11:30 AM – 1:30 PM)',
  'Afternoon (2:30 PM – 4:30 PM)',
  'Evening (5:00 PM – 7:00 PM)',
  'Late Evening (7:00 PM – 8:30 PM)',
];
