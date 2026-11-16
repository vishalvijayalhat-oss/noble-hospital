import {Star} from 'lucide-react';
import {SAMPLE_TESTIMONIALS} from '../data/clinicData';

export function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-sky-50/50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-teal-700 mb-2">
              Patient Testimonials · Sample Content
            </p>
            <h2
              style={{textWrap: 'balance'}}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-950 tracking-tight"
            >
              What Patients Value About Their Visits
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-sm">
            Sample testimonials are shown below as layout placeholders until verified patient
            reviews from the clinic are supplied.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLE_TESTIMONIALS.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div
                    className="flex items-center gap-1 text-amber-500"
                    aria-label={`${item.rating} out of 5 stars (sample review)`}
                  >
                    {Array.from({length: item.rating}).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-slate-500">Sample Review</span>
                </div>

                <blockquote className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
                  “{item.quote}”
                </blockquote>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-sm font-semibold text-slate-900">{item.patientName}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {item.treatment} · {item.locality}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
