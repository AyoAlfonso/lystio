import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { fetchListings } from '@/app/utils/api';
import { Listing, Filters } from '@/app/utils/types';
import Image from 'next/image';
import { amenitiesMap } from '@/app/utils/amenitiesMap';
import { AmenitiesList, BookmarkIcon, Description, ImageWrapper, ListingCard, Pill, PillsContainer, Title } from '../styles';
import ListingCardDetails from './ListingCardDetails';
import { TitleIcon } from './ListingHeader';
// styles.ts or your styles file

interface ListingsPanelProps {
  filters: Filters;
  setListings: Dispatch<SetStateAction<Listing[]>>;
  listings: Listing[];
}
function daysAgo(dateString: string): number {
  // Parse the input date string
  const inputDate = new Date(dateString);
  const currentDate = new Date();

  // Calculate the difference in time (in milliseconds)
  const timeDifference = currentDate.getTime() - inputDate.getTime();

  // Convert the difference from milliseconds to days
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}

function formatDate(dateString: string| null): string {
  if (!dateString) return  "Immediately"
  const date = new Date(dateString);

  // Extract the day, month, and year
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getUTCFullYear();

  // Format as "dd-mm-yyyy"
  return `${day}-${month}-${year}`;
}


const ListingsPanel: React.FC<ListingsPanelProps> = ({ filters, setListings, listings }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchListings(filters);
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setError('Failed to load listings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [filters]);

  if (loading) {
    return <div>Loading...</div>; // Or a skeleton loader
  }

  if (!listings.length) {
    return <div>No listings yet</div>;
  }

  return (
    <>
      {listings.map((listing) => (
        <ListingCard key={listing.id}>
          <ImageWrapper>
             {/* Pills */}
             <PillsContainer>
              <Pill>New</Pill>
              <Pill>3D Tour</Pill>
            </PillsContainer>

            {/* Bookmark Icon */}
            <BookmarkIcon>
              <TitleIcon src="bookmark.svg" alt="Icon" width='15px' height='15px'/>
            </BookmarkIcon>

            {listing.media?.length > 0 && (
              <Image
                src={listing.media[0].cdnUrl}
                alt={listing.title}
                placeholder="blur"
                blurDataURL={listing.media[0].bluredDataURL}
                layout="fill"
                objectFit="cover"
              />
            )}
          </ImageWrapper>
          <ListingCardDetails 
              title={listing.title} 
              address={listing.address} area={'1,300 - 1,300m²'} 
              beds={`${listing.roomsBed} bed`} 
              baths={`${listing.roomsBath} bath`}
              price={`€ ${listing.rent}`}
              availableFrom={`${listing ? formatDate(listing.availableFrom) : "Immediately"} `}
              daysAgo={`${daysAgo(listing.createdAt)} days ago`} />
        </ListingCard>
      ))}
    </>
  );
};

export default ListingsPanel;
