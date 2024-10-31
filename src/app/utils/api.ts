import axios from 'axios';
import { Filters, ApiResponse, Listing, MapMarker } from './types';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});


export const fetchMapMarkers = async (filters: Filters, zoom: number) => {
  
  const payload = {
    filter: {
      rent: [filters.minPrice, filters.maxPrice],
      ...(filters.within && { within: filters.within }), // Only adds 'within' if defined
      ...(filters.mapBounds && {
        bbox: [
          filters.mapBounds.getSouthWest().lng,
          filters.mapBounds.getSouthWest().lat,
          filters.mapBounds.getNorthEast().lng,
          filters.mapBounds.getNorthEast().lat,
        ],
      }),
    },
    zoom,
  };

  try {
    const response = await apiClient.post<ApiResponse>('/tenement/search/map', payload);
    console.log(JSON.stringify(response.data)); 
    return JSON.stringify(response.data) 
  } catch (error) {
    console.error("Error fetching map markers:", error);
    throw error;
  }
};
  
export const fetchListings = async (filters: Filters,page: number = 0,
    pageSize: number = 10): Promise<ApiResponse> => {
  const payload = {
    filter: {
      rent: [filters.minPrice, filters.maxPrice],
      // Add other filters as needed
      ...(filters.mapBounds && {
        bbox: [
          filters.mapBounds.getSouthWest().lng,
          filters.mapBounds.getSouthWest().lat,
          filters.mapBounds.getNorthEast().lng,
          filters.mapBounds.getNorthEast().lat,
        ],
      }),
    },
    paging: { pageSize, page },
  };

  const response = await apiClient.post<ApiResponse>('/tenement/search', payload);
  return response.data.res;
};
