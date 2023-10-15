import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: black;
  color: #ECF0F1; 
  padding: 15px 30px; 
  box-shadow: 0px 4px 2px -2px gray;

   position: fixed; 
   top :0 ; 
   width :100% ; 
   z-index :100 ;
`;

const BrandName = styled.div`
  font-size: 1.5em;
  font-weight: bold;
`;

export default function Navbar() {
    return (
        <NavbarContainer>
            <BrandName>CityPulse</BrandName>
        </NavbarContainer>
    );
}
