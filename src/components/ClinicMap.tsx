import {useCallback, useEffect, useState} from 'react';
import {
  AdvancedMarker,
  APILoadingStatus,
  APIProvider,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import {ExternalLink, MapPin, Navigation} from 'lucide-react';
import {CLINIC_INFO} from '../data/clinicData';

declare const __GOOGLE_MAPS_API_KEY__: string;

function getMapsApiKey(): string {
  const viteKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (typeof viteKey === 'string' && viteKey.trim().length > 0) {
    return viteKey.trim();
  }
  if (typeof __GOOGLE_MAPS_API_KEY__ === 'string' && __GOOGLE_MAPS_API_KEY__.trim().length > 0) {
    return __GOOGLE_MAPS_API_KEY__.trim();
  }
  return '';
}

interface ResolvedLocation {
  lat: number;
  lng: number;
  label: string;
}

function MapFallbackCard() {
  return (
    <div className="w-full h-[380px] rounded-2xl border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-teal-50 p-6 sm:p-8 flex flex-col justify-between">
      <div>
        <div className="w-11 h-11 rounded-xl bg-sky-800 text-white flex items-center justify-center mb-4">
          <MapPin className="w-5 h-5" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">{CLINIC_INFO.name}</h3>
        <p className="text-sm text-slate-600 mt-1.5 leading-relaxed max-w-md">
          {CLINIC_INFO.addressLine1} {CLINIC_INFO.addressLine2}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200/80">
        <a
          href={CLINIC_INFO.mapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-sky-800 hover:bg-sky-900 rounded-xl transition-colors whitespace-nowrap shrink-0"
        >
          <Navigation className="w-4 h-4" aria-hidden="true" />
          <span>Get Directions on Google Maps</span>
        </a>
        <a
          href={CLINIC_INFO.mapsSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-sky-900 bg-white border border-slate-200 hover:border-sky-300 rounded-xl transition-colors whitespace-nowrap shrink-0"
        >
          <span>View Location</span>
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

function ClinicMapCanvas({quotaExceeded}: {quotaExceeded: boolean}) {
  const status = useApiLoadingStatus();
  const placesLib = useMapsLibrary('places');
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);
  const [clinicLocation, setClinicLocation] = useState<ResolvedLocation | null>(null);
  const [lookupError, setLookupError] = useState(false);

  useEffect(() => {
    if (!placesLib || clinicLocation || quotaExceeded) return;

    let cancelled = false;

    async function resolveClinicLocation() {
      if (!placesLib) return;
      const queries = [
        'Noble Dental Hospital & Research Centre, Malwadi, Hadapsar, Pune 411028',
        'Dharmadhikari Hospital, Malwadi, Hadapsar, Pune 411028',
        'Malwadi, Hadapsar, Pune, Maharashtra 411028',
      ];

      for (const textQuery of queries) {
        try {
          const response = await placesLib.Place.searchByText({
            textQuery,
            fields: ['displayName', 'formattedAddress', 'location'],
            maxResultCount: 1,
          });
          const place = response.places?.[0];
          if (place?.location && !cancelled) {
            setClinicLocation({
              lat: place.location.lat(),
              lng: place.location.lng(),
              label: place.displayName || CLINIC_INFO.name,
            });
            return;
          }
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          if (
            message.includes('RESOURCE_EXHAUSTED') ||
            message.includes('OVER_QUERY_LIMIT') ||
            message.includes('429')
          ) {
            window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
            if (!cancelled) setLookupError(true);
            return;
          }
        }
      }

      if (!cancelled) {
        setLookupError(true);
      }
    }

    void resolveClinicLocation();
    return () => {
      cancelled = true;
    };
  }, [placesLib, clinicLocation, quotaExceeded]);

  const handleCloseInfo = useCallback(() => {
    setInfoOpen(false);
  }, []);

  if (
    quotaExceeded ||
    lookupError ||
    status === APILoadingStatus.FAILED ||
    status === APILoadingStatus.AUTH_FAILURE
  ) {
    return <MapFallbackCard />;
  }

  if (!clinicLocation) {
    return (
      <div className="w-full h-[380px] rounded-2xl border border-slate-200 bg-sky-50/50 flex flex-col items-center justify-center p-6 text-center">
        <MapPin className="w-6 h-6 text-sky-700 mb-2" aria-hidden="true" />
        <p className="text-sm font-medium text-slate-700">
          Loading interactive clinic map for Hadapsar, Pune...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-[380px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
      <GoogleMap
        mapId="DEMO_MAP_ID"
        defaultCenter={{lat: clinicLocation.lat, lng: clinicLocation.lng}}
        defaultZoom={16}
        gestureHandling="cooperative"
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        style={{width: '100%', height: '100%'}}
      >
        <AdvancedMarker
          ref={markerRef}
          position={{lat: clinicLocation.lat, lng: clinicLocation.lng}}
          onClick={() => setInfoOpen(true)}
          title={CLINIC_INFO.name}
        >
          <Pin background="#0E5A9C" borderColor="#093E6E" glyphColor="#FFFFFF" />
        </AdvancedMarker>

        {infoOpen && marker && (
          <InfoWindow anchor={marker} onCloseClick={handleCloseInfo} maxWidth={260}>
            <div className="p-1 text-slate-900">
              <p className="font-bold text-sm leading-snug">{CLINIC_INFO.name}</p>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Room No. 05, Next to Dharmadhikari Hospital, Malwadi, Hadapsar, Pune 411028
              </p>
              <a
                href={CLINIC_INFO.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-sky-800 hover:underline mt-2"
              >
                <span>Open Directions</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export function ClinicMap({quotaExceeded}: {quotaExceeded: boolean}) {
  const apiKey = getMapsApiKey();

  if (!apiKey || quotaExceeded) {
    return <MapFallbackCard />;
  }

  return (
    <APIProvider apiKey={apiKey} libraries={['marker', 'places']} language="en" region="IN">
      <ClinicMapCanvas quotaExceeded={quotaExceeded} />
    </APIProvider>
  );
}
