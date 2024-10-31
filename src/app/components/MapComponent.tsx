import React, { useRef, useState, useEffect } from 'react';
import mapboxgl, { Map, LngLatBounds } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { throttle } from 'lodash';
import { createRoot } from 'react-dom/client';
import { Listing, MapMarker } from '../utils/types';
import PreviewCard from './PreviewCard';
import InspectControl from '@mapbox-controls/inspect';
import ZoomControl from '@mapbox-controls/zoom';
import '@mapbox-controls/zoom/src/index.css';

interface MapComponentProps {
  markersData: MapMarker[];
  listings: Listing[];
  zoom: number;
  onMapChange: (bounds: LngLatBounds) => void;
  onZoomChange: (zoom: number) => void; 
  onDrawUpdate: (geometry: any | null) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
  markersData,
  listings,
  zoom,
  onMapChange,
  onZoomChange,
  onDrawUpdate,
}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]); // Store marker references
  const [hoveredListing, setHoveredListing] = useState<Listing | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);

  // Throttled events for map changes
  const throttledOnMapChange = throttle((bounds: LngLatBounds) => onMapChange(bounds), 500);
  const throttledOnZoomChange = throttle((zoom: number) => onZoomChange(zoom), 500);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [16.3738, 48.2082],
      zoom,
    });

    map.current.on('moveend', () => {
      // if (map.current) {
        const bounds = map.current!.getBounds();
        if(bounds) onMapChange(bounds);
      // }
    })

    map.current.on('zoomend', () => {
      if (map.current) onZoomChange(map.current.getZoom());
    });

    
    map.current.addControl(new InspectControl(), 'bottom-right');
    map.current.addControl(new ZoomControl(), 'bottom-right');

    // Add controls, layers, etc., as per your existing code...
  }, [onMapChange, onZoomChange]);

  // Create or update markers when markersData changes
  useEffect(() => {
    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    const popup = new mapboxgl.Popup({ offset: 25, closeButton: true, closeOnClick: false });

    markersData.forEach((markerData) => {
      const listing = listings.find((item) => JSON.stringify(item.location) === JSON.stringify(markerData.pt));
    console.log(listing, "listing")
      if (listing) {
        const popupNode = document.createElement('div');
        const root = createRoot(popupNode);
        root.render(<PreviewCard listing={listing} position={{ x: 0, y: 0 }} />);

        const marker = new mapboxgl.Marker({ color: "#fff"})
          .setLngLat(markerData.pt as [number, number])
          .setPopup(popup.setDOMContent(popupNode))
          .addTo(map.current!);

        markersRef.current.push(marker);
      }
    });
  }, [markersData, listings]);

  return (
    <div ref={mapContainer} style={{ width: '100%', height: '100%', position: 'relative', bottom: '10%' }} />
  );
};

export default MapComponent;
