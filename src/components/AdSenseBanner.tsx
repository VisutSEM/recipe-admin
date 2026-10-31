import React, { useEffect, useRef } from 'react';

interface AdSenseBannerProps {
  client?: string;
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
  label?: string;
  showDevPlaceholder?: boolean;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  client = 'ca-pub-3863858633068691',
  slot,
  format = 'auto',
  responsive = true,
  style,
  className = '',
  label = 'Sponsored / Advertisement',
  showDevPlaceholder = false,
}) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const isPushedRef = useRef(false);

  useEffect(() => {
    // Only attempt push if AdSense script is available and not already pushed for this instance
    if (!isPushedRef.current && adRef.current) {
      try {
        if (typeof window !== 'undefined') {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          isPushedRef.current = true;
        }
      } catch (err) {
        // Ignored or logged in debug - AdSense can throw if blocked by AdBlock or duplicated in React StrictMode
        console.debug('AdSense push notification:', err);
      }
    }
  }, []);

  return (
    <div className={`adsense-wrapper no-print ${className}`}>
      {label && <div className="adsense-label">{label}</div>}

      <div className="adsense-box">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', minHeight: '90px', ...style }}
          data-ad-client={client}
          {...(slot ? { 'data-ad-slot': slot } : {})}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />

        {showDevPlaceholder && import.meta.env.DEV && (
          <div className="adsense-dev-note">
            <span>📢 Google AdSense Slot Active</span>
            <small>Client: {client}{slot ? ` • Slot: ${slot}` : ' (Auto / Responsive)'}</small>
          </div>
        )}
      </div>
    </div>
  );
};
