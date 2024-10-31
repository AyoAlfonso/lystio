import styled from 'styled-components';
import { FaBookmark } from 'react-icons/fa';

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden; // Prevents main page from scrolling
`;

export const MapSection = styled.div`
  flex: 1;
  height: 100%;
  overflow: hidden; // Prevents the map from scrolling
  border-right: 1px solid #eaeaea; // Optional border for separation
`;

export const ListingsSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column; /* Stacks ListingHeader and ListingsGrid vertically */
  height: 100%;
  overflow-y: auto;
  padding: 1rem;
`;
// Main app container
export const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden; // Prevents scrolling for the main container
`;

// Sidebar for the Map (left side)
export const MapContainer = styled.div`
  flex: 1;
  position: relative;
  height: 100%;
  overflow: hidden; // Map should not scroll within its container
  border-right: 1px solid #eaeaea; // Optional border for separation

  @media (max-width: 768px) {
    height: 50vh; // Adjust height on smaller screens if needed
    border-right: none;
  }
`;

// Right-side content container (Listings Grid)
export const ContentContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto; // Enable scrolling for the Listings section only
  // padding: 1rem;

  @media (max-width: 768px) {
    flex: 1;
    height: 50vh;
  }
`;

// Header container inside the ContentContainer
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

// Filter button styling
export const FilterButton = styled.button`
  background-color: #5e72e4;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-right: 0.5rem;

  &:hover {
    background-color: #4c61c0;
  }
`;

// Listings grid for images
export const ListingsGrid = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allows wrapping of items to form two columns */
  gap: 1rem;
  padding: 1rem 0;

  & > div { /* Assuming each listing item is a direct child (e.g., ListingCard) */
    flex: 1 1 45%; /* Two items per row */
    max-width: 50%; /* Restrict each item to take up half the container width */
  
    @media (max-width: 768px) {
      flex: 1 1 45%; /* Switch to one item per row on smaller screens */
      max-width: 100%;
  
    }
  }
`;

// Individual listing card styling
export const ListingCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;


// Listing content inside each card
export const ListingContent = styled.div`
  padding: 1rem;
`;

// Price tag positioning inside the image
export const PriceTag = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  background-color: #5e72e4;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
`;

// Amenities section inside each listing
export const Amenities = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

// Amenity pill styling
export const AmenityPill = styled.span`
  background-color: #e3f2fd;
  color: #007bff;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
`;





//// Listing cards
// export const ListingCard = styled.div`
//   border: 1px solid #e0e0e0;
//   border-radius: 8px;
//   overflow: hidden;
//   padding: 1rem;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   display: flex;
//   flex-direction: column;
//   transition: box-shadow 0.3s;

//   &:hover {
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
//   }
// `;

// Individual pill styling
export const Pill = styled.div`
  background-color: #ffffff;
  color: #333;
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
  border-radius: 15px;
  font-weight: 600;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

// Pills container to hold multiple pills
export const PillsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 10;
`;

// Bookmark icon positioned at the top-right

export const BookmarkIcon = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: #ffffff;
  padding: 0.3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

export const ImageWrapper = styled.div`
  position: relative;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0.5rem 0;
`;

export const Description = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

export const AmenitiesList = styled.ul`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;

  li {
    font-size: 0.8rem;
    background-color: #f3f3f3;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    color: #333;
  }
`;
