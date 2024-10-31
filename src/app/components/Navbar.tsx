import styled, { css } from 'styled-components';
import FilterRange from './FilterRange'
import { Filters } from '@/app/utils/types';
import { TitleIcon } from './ListingHeader';

interface NavLinkProps {
  hasicon?: boolean;
}

interface NavbarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const NavbarContainer = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  width: 100%;
`;
const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-items: center;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 0.5rem; 
  }
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  gap: 1rem;
  width: 100%;
  padding: 1rem; // Optional padding for inner spacing
  box-sizing: border-box; // Ensures padding doesn't affect width

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 0.5rem; // Adjust padding for mobile view
  }
`;

// Logo section
const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #9c27b0; // Purple color for the brand
  padding: 0 1rem;
`;

// Search bar container
const SearchBar = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 500px;
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;

  @media (max-width: 768px) {
    width: 100%; // Full width on smaller screens
    margin: 0.5rem 0;
  }
`;
const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 0.8rem;
  padding-left: 0.5rem;
`;

const SearchIcon = styled.span`
  position: absolute;
  right: 0.2rem;
  color: #9c27b0; // Purple color for the icon
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #9c27b0;
  color: #fff;
`;

// Navigation links container
const NavLinks = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
  font-size: 0.8rem;
  color: #333;
   @media (max-width: 768px) {
    flex-direction: column;
    width: 100%; // Make the links take full width in stacked mode
    // align-items: center; // Center-align each link
  }
`;

const AISearchButton = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: #fff;  // Purple color
  color: #000;
  font-size: 0.8rem;
  cursor: pointer;
  position: absolute;
  right: 3.5rem;
  top: 50%;
  gap: 5px;
  transform: translateY(-50%);
  
  // Add dropdown arrow using CSS pseudo-element
  &::after {
    content: '▼';
    font-size: 0.4rem;
    margin-left: 4px; // Space between "AI" text and arrow
  }
`;

const NavLink = styled.div<NavLinkProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  font-weight: 500;
  position: relative;
  font-size: 0.8rem;
  gap: 0.8rem;
  
  &:hover {
    color: #9c27b0;
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }

  ${({ hasicon }) =>
    !hasicon &&
    css`
      &::after {
        content: '▼';
        font-size: 0.4rem;
        margin-left: 0.2rem;
      }
    `}
`;


// Profile icons container (e.g., globe, user profile)
const ProfileIcons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const IconButton = styled.div`
  cursor: pointer;
  color: #9c27b0; // Purple color for the icons
  font-size: 0.8rem;
`;
const Navbar: React.FC<NavbarProps> = ({ filters, setFilters }) => {
    return (
      <>
      <NavbarContainer>
      <TopRow>
        <Logo>lystio</Logo>
        
        <SearchBar>
          <SearchInput type="text" placeholder="Search" />
          <AISearchButton> 
            <img src="/sparkles.svg" alt="Search Icon" width="16" height="16" /> 
           AI Search </AISearchButton>
          <SearchIcon>
          🔍</SearchIcon> 
        </SearchBar>
        
        <ProfileIcons>
          <NavLink> Advertise </NavLink>
          <IconButton>🌐</IconButton> 
          <IconButton>👤</IconButton> 
        </ProfileIcons>
      </TopRow>
    
      <BottomRow>
        <NavLinks>
          <NavLink>Rent</NavLink>
          <NavLink>Apartment</NavLink>
        
          <NavLink>Beds/baths</NavLink>
          <NavLink>Living rooms</NavLink>
          <NavLink>Pets</NavLink>
          <NavLink>Deposit</NavLink>
          <FilterRange filters={filters} setFilters={setFilters} />
          <NavLink hasicon={true}>All 
          <TitleIcon src="all.svg" alt="Icon" width="10px" height="10px"/>
          </NavLink>
        </NavLinks>
      </BottomRow>
    </NavbarContainer>
    </>
    );
  };
  
  export default Navbar;
  