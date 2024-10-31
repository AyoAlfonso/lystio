import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTh, FaThList, FaExchangeAlt } from 'react-icons/fa';


interface TitleIconProps {
    width?: string;
    height?: string;
  }
  
  export const TitleIcon = styled.img<TitleIconProps>`
    width: ${({ width }) => width || '15px'};
    height: ${({ height }) => height || '15px'};
  `;

const ListingHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TitleText = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const PropertyCount = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  border-radius: 8px;
  padding: 0.2rem;
  background-color: #f9f9f9;
`;

const ToggleButton = styled.button<{ isActive: boolean }>`
  background: ${({ isActive }) => (isActive ? '#ffffff' : '#f9f9f9')};
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  ${({ isActive }) =>
    isActive &&
    `
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `}
`;


const SortSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #333;
  font-size: 0.8rem;
`;

const SortIcon = styled(FaExchangeAlt)`
  font-size: 0.8rem;
  cursor: pointer;
  transform: rotate(90deg);
`;

interface ListingHeaderProps {
    propertyCount: number;
  }


const ListingHeader: React.FC<ListingHeaderProps> = ({ propertyCount }) => {
    const [activeView, setActiveView] = useState<string>('grid');

    const handleViewChange = (view: string) => {
      setActiveView(view);
    };

  return (
    <ListingHeaderContainer>
      <TitleSection>
        <TitleIcon src="lookup.svg" alt="Icon" width='30px' height='30px' />
        <div>
          <TitleText>Listing around me</TitleText>
          <PropertyCount>{propertyCount} properties</PropertyCount>
        </div>
      </TitleSection>
      <ViewToggle>
        <ToggleButton 
          isActive={activeView === 'grid'} 
          onClick={() => handleViewChange('grid')}
        >
         <TitleIcon src="menu-icons/grid.svg" alt="Icon" />
        </ToggleButton>
        <ToggleButton 
          isActive={activeView === 'list'} 
          onClick={() => handleViewChange('list')}
        >
         <TitleIcon src="menu-icons/list.svg" alt="Icon" />
        </ToggleButton>
        <ToggleButton 
          isActive={activeView === 'alt'} 
          onClick={() => handleViewChange('alt')}
        >
        <TitleIcon src="menu-icons/alt.svg" alt="Icon" />
        </ToggleButton>
      </ViewToggle>

      <SortSection>
        <span>Sort by Relevance</span>
        <SortIcon />
      </SortSection>
    </ListingHeaderContainer>
  );
};

export default ListingHeader;
