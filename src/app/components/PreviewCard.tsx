// components/PreviewCard.tsx

import React from 'react';
import { Listing } from '@/app/utils/types';
import Image from 'next/image';

interface PreviewCardProps {
  listing: Listing | null;
  position: { x: number; y: number };
}

const PreviewCard: React.FC<PreviewCardProps> = ({ listing, position }) => {
  if (!listing?.id) return <></>
  return (
    <div
      style={{
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          borderRadius: '8px',
          width: '200px',
        }}
      >
        {listing.media && listing.media.length > 0 && (
          <Image
            src={listing.media[0].cdnUrl}
            alt={listing.title}
            width={200}
            height={120}
            style={{ borderRadius: '4px' }}
          />
        )}
        <h3 style={{ margin: '8px 0 4px 0', fontSize: '16px' }}>{listing.title}</h3>
        <p style={{ margin: 0, fontSize: '14px' }}>{listing.abstract}</p>
        <p style={{ margin: '4px 0 0 0', fontSize: '14px', fontWeight: 'bold' }}>
          €{listing.rent} / month
        </p>
      </div>
    </div>
  );
};

export default PreviewCard;
