import {CheckCircle2} from 'lucide-react';
import {ABOUT_PILLARS, CLINIC_IMAGES, CLINIC_INFO} from '../data/clinicData';
import {ClinicImage} from './ClinicImage';

export function AboutSection() {
  return (
    <section id="about" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left column: Consultation photography */}
          <div className="lg:col-span-5 flex">
            <div className="w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 min-h-[300px] lg:min-h-[420px]">
              <ClinicImage
                src={CLINIC_IMAGES.aboutConsultation}
                alt="Warm patient-focused dental consultation at Noble Dental Hospital & Research Centre"
                title="Patient-Focused Care"
                className="w-full h-full object-cover lg:h-full"
              />
            </div>
          </div>

          {/* Right column: About copy & 4 core pillars */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-sm font-semibold text-teal-700 mb-2">About Our Clinic</p>
            <h2
              style={{textWrap: 'balance'}}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-950 tracking-tight mb-4"
            >
              Thoughtful Dental Care Built Around Your Comfort
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-8">
              At <strong className="font-semibold text-slate-900">{CLINIC_INFO.name}</strong> in
              Malwadi, Hadapsar, Pune, we believe visiting the dentist should feel calm, clear, and
              reassuring. Whether you visit us for a routine checkup, toothache relief, or a
              long-term restorative plan, every appointment is guided by honest communication and
              attentive clinical care.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {ABOUT_PILLARS.map((pillar) => (
                <div
                  key={pillar.title}
                  className="p-5 rounded-xl bg-sky-50/50 border border-slate-200/80"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-5 h-5 text-teal-600 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">{pillar.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed mt-1.5">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
