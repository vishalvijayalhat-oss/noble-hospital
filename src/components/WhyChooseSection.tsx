import {WHY_CHOOSE_US} from '../data/clinicData';

export function WhyChooseSection() {
  return (
    <section className="py-16 lg:py-20 bg-sky-50/60 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-semibold text-teal-700 mb-2">Why Choose Us</p>
          <h2
            style={{textWrap: 'balance'}}
            className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight"
          >
            Dependable Oral Healthcare for Individuals and Families in Hadapsar
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item) => (
            <article
              key={item.number}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between transition-colors duration-150 hover:border-sky-300"
            >
              <div>
                <p className="font-display text-sm font-bold text-sky-800 tabular-nums mb-3">
                  {item.number}.
                </p>
                <h3 className="text-lg font-semibold text-slate-900 leading-snug mb-2.5">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
