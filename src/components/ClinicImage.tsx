import {useState} from 'react';
import {ShieldCheck} from 'lucide-react';

interface ClinicImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export function ClinicImage({
  src,
  alt,
  title,
  className = '',
  loading = 'lazy',
}: ClinicImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 via-white to-teal-50 border border-slate-200 text-slate-600 p-6 text-center ${className}`}
      >
        <div className="w-11 h-11 rounded-xl bg-sky-100/80 text-sky-800 flex items-center justify-center mb-3">
          <ShieldCheck className="w-6 h-6" aria-hidden="true" />
        </div>
        <p className="text-sm font-medium text-slate-800">
          {title || 'Noble Dental Hospital & Research Centre'}
        </p>
        <p className="text-xs text-slate-500 mt-1">Malwadi, Hadapsar, Pune</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
