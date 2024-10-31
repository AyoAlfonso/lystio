import React, { ChangeEvent } from 'react';
import { Filters } from '@/app/utils/types';
import { debounce } from '@/app/utils/debounce';
  
interface FilterComponentProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}


const FilterComponent: React.FC<FilterComponentProps> = ({ filters, setFilters }) => {
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: Number(value) }));
  };
  
  const debouncedHandlePriceChange = debounce(handlePriceChange, 500);

  return (
    <div>
      <input
        type="number"
        name="minPrice"
        value={filters.minPrice}
        onChange={debouncedHandlePriceChange}
        placeholder="Min Price"
      />
      <input
        type="number"
        name="maxPrice"
        value={filters.maxPrice}
        onChange={handlePriceChange}
        placeholder="Max Price"
      />
    </div>
  );
};

export default FilterComponent;
