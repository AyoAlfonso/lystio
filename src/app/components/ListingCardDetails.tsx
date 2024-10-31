import React from 'react';
import styled from 'styled-components';
import { TitleIcon } from './ListingHeader';

const CardContainer = styled.div`
  padding: 1rem;
  border-radius: 8px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem
  color: #666;
  gap: 1.5rem;
`;

const VerifiedBadge = styled.span`
  color: #9c27b0;
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 0.8rem;
  margin: 0.5rem 0;
`;

const Address = styled.div`
  margin-bottom: 0.5rem;
  font-size: 0.6rem;
  font-weight: bold;

  a {
    color: #666;
  }
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #666;
  font-size: 0.6rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Availability = styled.div`
 font-size: 0.6rem;
  color: #666;

  span {
    font-weight: bold;
    color: #333;
  }
`;

interface ListingCardDetailsProps {
  title: string;
  address: string;
  area: string;
  beds: string;
  baths: string;
  price: string;
  availableFrom: string;
  daysAgo: string;
}

const ListingCardDetails: React.FC<ListingCardDetailsProps> = ({
  title,
  address,
  area,
  beds,
  baths,
  price,
  availableFrom,
  daysAgo,
}) => (
  <CardContainer>
   
    <Header>
      <VerifiedBadge> <TitleIcon src="badge.svg" alt="Icon" /> Verified</VerifiedBadge>
      <div className="spacer"></div>

      <div>{daysAgo}</div>
      
    </Header>

    <Title>{title}</Title>

    <Address>
      <a href="#">{address}</a>
    </Address>

  
    <Details>
      <span>📏 {area}</span>
      <span>🛏️ {beds}</span>
      <span>🛁 {baths}</span>
    </Details>

    <Price>{price}</Price>

    <Availability>
      Available From: <span>{availableFrom}</span>
    </Availability>
  </CardContainer>
);

export default ListingCardDetails;
