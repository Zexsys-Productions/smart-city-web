import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import styled from 'styled-components';

const AppContainer = styled.div`
  position: relative;
`;

const TextContainer = styled.div`
  position: absolute;
  z-index: 1; 
  top: 50%;
  left: 5%; 
  transform: translateY(-50%); 
  padding: 10px;
  font-size: 2em; 
  font-weight: bold; 
  color: #ffffff; 
`;

export default function Home() {
    const [hovered, setHovered] = useState(false);

    return (
        <AppContainer>
            <TextContainer hovered={hovered} onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)}>
                text
            </TextContainer>
            <Spline scene="https://prod.spline.design/EIXWxLw12PpD7tBQ/scene.splinecode" />
        </AppContainer>
    );
}
