import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import Spline from '@splinetool/react-spline';
import styled from 'styled-components';

const AppContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const TextContainer = styled.div`
  position: absolute;
  z-index: 1; 
  top: 50%;
  left:5%; 
   transform : translateY(-50%);
   padding :10px ;
   
   background-image : linear-gradient(to right , purple , #8a2be2);
   
    -webkit-background-clip : text ;
    -moz-background-clip : text ;
    background-clip : text ;

    -webkit-text-fill-color : transparent ;
    
    font-size :4em ; 
     font-weight:bold ;  
`;

// Define your Footer component
const Footer = styled.footer`
    position:absolute;
    bottom :0px ;
     width :100%;
     height :70px ;   
     background:#1b1b1b ;
      color:#ffffff ;  

      display:flex ;   
      justify-content:center ;  
       align-items:center ;  
       font-size:1.5em;   
        font-weight:bold;  
`;


export default function Home() {
  return (
    <AppContainer>
        <TextContainer>
          Zexsys
        </TextContainer>
      <Spline scene="https://prod.spline.design/EIXWxLw12PpD7tBQ/scene.splinecode" />
        <Footer>Made by Zexsys, {new Date().getFullYear()}</Footer>
    </AppContainer>
  );
}