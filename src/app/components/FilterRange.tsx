import React, { useState, useRef } from 'react';
import styled from 'styled-components';

// Main Filter Button
const FilterButton = styled.div`
  padding: 0.25rem 0.50rem;
  border-radius: 20px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  position: relative;
`;

// Popup container for the range inputs
const PopupContainer = styled.div`
  position: absolute;
  top: 2.5rem;
  left: 0;
  padding: 1rem;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  z-index: 100;
`;


const PriceInput = styled.input`
  width: 80px;
  padding: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.8rem;
  outline: none;
`;

const PriceRange = styled.span`
  color: #999; 
  font-weight: normal;
  font-size: 0.9rem;
`;

interface Filters {
    minPrice: number;
    maxPrice: number;
}

interface FilterRangeProps {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const FilterRange: React.FC<FilterRangeProps> = ({ filters, setFilters }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [localMinPrice, setLocalMinPrice] = useState<number>(filters.minPrice);
    const [localMaxPrice, setLocalMaxPrice] = useState<number>(filters.maxPrice);
    const popupRef = useRef<HTMLDivElement | null>(null);

  // Toggle the popup
  const handleButtonClick = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Close the popup if clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsPopupOpen(false);
    }
  };

  // Add an event listener for outside clicks
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

const handleLocalMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalMinPrice(Number(e.target.value));
};

const handleLocalMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalMaxPrice(Number(e.target.value));
};

const applyFilters = () => {
    setFilters({ minPrice: localMinPrice, maxPrice: localMaxPrice });
    setIsPopupOpen(false);
};

 return (
    <div style={{ position: 'relative' }}>
      <FilterButton onClick={handleButtonClick}>
         Price: <PriceRange>€{filters.minPrice} - €{filters.maxPrice} </PriceRange>
      </FilterButton>

      {isPopupOpen && (
        <PopupContainer ref={popupRef}>
          <label>
            Min Price
            <PriceInput
              type="number"
              value={localMinPrice}
              onChange={handleLocalMinPriceChange}
            />
          </label>
          <label>
            Max Price
            <PriceInput
              type="number"
              value={localMaxPrice}
              onChange={handleLocalMaxPriceChange}
            />
          </label>
          <button onClick={applyFilters}>Apply</button>
        </PopupContainer>
      )}
    </div>
  );
};

export default FilterRange;
