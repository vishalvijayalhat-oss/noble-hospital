import {useState} from 'react';
import {ChevronDown} from 'lucide-react';
import {FAQ_ITEMS} from '../data/clinicData';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold text-teal-700 mb-2">Frequently Asked Questions</p>
          <h2
            style={{textWrap: 'balance'}}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-950 tracking-tight"
          >
            Common Questions Before Your Appointment
          </h2>
          <p className="text-base text-slate-600 mt-3 leading-relaxed">
            Clear answers about scheduling, first-visit consultations, and locating our Hadapsar
            clinic.
          </p>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `${item.id}-panel`;
            return (
              <div key={item.id}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="w-full py-5 flex items-center justify-between gap-4 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-700 rounded-md"
                  >
                    <span className="text-base sm:text-lg font-semibold text-slate-900">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-sky-800' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                {isOpen && (
                  <div id={panelId} className="pb-5 pr-8 text-sm sm:text-base text-slate-600 leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
