import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: black;
  color: #ECF0F1; 
  padding: 15px 30px; 
  box-shadow: 0px 4px 2px -2px gray;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: #ECF0F1; 
  margin-right: 20px; 
  text-decoration: none;
  font-size: 1.1em; 
  transition: color 0.3s linear;

  &:hover {
    color: #F39C12; 
  }
`;

const BrandName = styled.div`
  font-size: 1.5em;
  font-weight: bold;
`;

export default function Navbar() {
    return (
        <NavbarContainer>
            <BrandName>CityPulse</BrandName>
            <NavLinks>
                <StyledLink to="/">Home</StyledLink>
                <StyledLink to="/about">About Us</StyledLink>
            </NavLinks>
        </NavbarContainer>
    );
}
