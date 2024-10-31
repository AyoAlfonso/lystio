
export interface Owner {
    country: string;
    name: string;
    email: string;
    phone: string;
    description: string | null;
    vat: string | null;
    billingAddress: string | null;
  }
  
  export interface User {
    id: number;
  }
  
  export interface MediaItem {
    type: string;
    name: string;
    cdnUrl: string;
    sort: number;
    title: string;
    bluredDataURL: string;
    id: number;
  }
  
  export interface Listing {
    owner: Owner;
    user: User;
    title: string;
    abstract: string;
    address: string;
    addressDoor: string;
    zip: string;
    city: string;
    country: string;
    rooms: number;
    roomsBed: number;
    roomsBath: number;
    size: number;
    rent: number;
    rentUtilities: number;
    rentFull: number | null;
    rentDeposit: number | null;
    amenities: number[];
    amenitiesTexts: { [key: string]: string };
    location: [number, number];
    locationReal: [number, number] | null;
    createdAt: string;
    updatedAt: string;
    type: number;
    subType: number;
    condition: number;
    accessibility: number;
    unitType: 'single' | 'multiple';
    rentType: string;
    floorType: number;
    heatingType: number;
    leaseDuration: number;
    availableFrom: string | null;
    highlight: string | null;
    active: boolean;
    verified: boolean;
    deleted: boolean;
    autoRenewUntil: string | null;
    lastRenewAt: string | null;
    constructionYear: number | null;
    modernisationYear: number | null;
    floor: number | null;
    id: number;
    media: MediaItem[];
    tenements: Listing[];
    sizeRange?: [number, number];
    rentRange?: [number, number];
    roomsRange?: [number, number];
    roomsBathRange?: [number, number];
    roomsBedRange?: [number, number];
  }
  
  export interface Filters {
    minPrice: number;
    maxPrice: number;
    mapBounds?: mapboxgl.LngLatBounds;
    within?: any; 
  }
  
  export interface ApiResponse {
    res: any
    paging: {
      pageCount: number;
      page: number;
      pageSize: number;
      totalCount: number;
    };
  }
  export interface MapMarker {
    id: number;
    count: number;
    pt: [number, number]; 
    sizeRange: [number, number];
    rentRange: [number, number];
    gj: GeoJSON.Point; 
  }
  