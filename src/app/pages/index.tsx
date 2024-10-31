'use client'

import React, { useState, useEffect } from 'react';
import MapComponent from '@/app/components/MapComponent';
import ListingsPanel from '@/app/components/ListingsPanel';
import FilterComponent from '@/app/components/FilterComponent';
import HeaderComponent from '@/app/components/HeaderComponent';
import ListingHeader from '@/app/components/ListingHeader';
import { Filters, Listing, MapMarker } from '@/app/utils/types';
import { fetchMapMarkers } from '@/app/utils/api';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = process.env.NEXT_LOCAL_MAPBOX_TOKEN as string;

import {
    Container,
    MapSection,
    ListingsSection,
    ListingsGrid,
    AppContainer
  } from '@/app/styles';
import Navbar from '@/app/components/Navbar';
import { debounce } from '../utils/debounce';

const HomePage: React.FC = () => {

  const [filters, setFilters] = useState<Filters>({
    minPrice: 300,
    maxPrice: 5000,
    // Add other filter defaults
  });
  const [markersData, setMarkersData] = useState<MapMarker[]>([]);
  const [zoom, setZoom] = useState<number>(10); // Initialize zoom state
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const loadMarkers = debounce(async () => {
      try {
        const data = await fetchMapMarkers(filters, zoom);
        console.log(data, "data==")
        setMarkersData(JSON.parse(data));
      } catch (error) {
        console.error('Error fetching markers:', error);
      }
    }, 800); 
  
    loadMarkers();
  }, [filters, zoom]);
  
  function boundsAreEqual(bounds1: mapboxgl.LngLatBounds, bounds2: mapboxgl.LngLatBounds): boolean {
    const sw1 = bounds1.getSouthWest();
    const ne1 = bounds1.getNorthEast();
    const sw2 = bounds2.getSouthWest();
    const ne2 = bounds2.getNorthEast();
  
    return (
      sw1.lng === sw2.lng &&
      sw1.lat === sw2.lat &&
      ne1.lng === ne2.lng &&
      ne1.lat === ne2.lat
    );
  }
  const handleMapChange = (bounds: mapboxgl.LngLatBounds) => {
    setFilters((prev) => {
      if (prev.mapBounds && boundsAreEqual(prev.mapBounds, bounds)) {
        return prev; // Avoid unnecessary state update
      }
      return { ...prev, mapBounds: bounds };
    });
  };
  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom); 
  };
  // const handleZoomChange = (newZoom: number) => {
  //   setZoom((prevZoom) => (prevZoom === newZoom ? prevZoom : newZoom)); // Avoid unnecessary state update
  // };

  const handleDrawUpdate = (geometry: any | null) => {
    setFilters((prev) =>
      geometry ? { ...prev, within: geometry } : { ...prev, within: undefined }
    );
  };

return (
 <AppContainer>
     <Navbar filters={filters} setFilters={setFilters}/>
      <Container>   
      <MapSection>
        <MapComponent
          markersData={markersData}
          listings={listings}
          zoom={zoom}
          onMapChange={handleMapChange}
          onZoomChange={handleZoomChange} 
          onDrawUpdate={handleDrawUpdate} 
        />
      </MapSection>

      <ListingsSection>
      <ListingHeader propertyCount={listings.length}/>
        <ListingsGrid>
          <ListingsPanel filters={filters} listings={listings} setListings={setListings}/>
        </ListingsGrid>
      </ListingsSection>
    </Container>
    </AppContainer>
  );
};

export default HomePage;
