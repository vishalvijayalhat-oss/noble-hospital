import {MessageCircle} from 'lucide-react';
import {getDefaultWhatsAppUrl} from '../utils/whatsapp';

export function FloatingWhatsApp() {
  return (
    <a
      href={getDefaultWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp with Noble Dental Hospital"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 px-4 py-3 rounded-full bg-teal-700 hover:bg-teal-800 text-white shadow-lg border border-teal-600/50 transition-transform duration-150 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
    >
      <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline text-sm font-semibold whitespace-nowrap shrink-0">
        Chat on WhatsApp
      </span>
    </a>
  );
}
