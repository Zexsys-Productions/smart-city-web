import React, { useState, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import styled, { keyframes, css, createGlobalStyle } from 'styled-components';
import { RaceBy } from '@uiball/loaders';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

// Lottie Animation Settings
import Lottie from 'react-lottie';
import * as smartCityAnimationData from '../lottie/smartcity.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: smartCityAnimationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid meet' 
  }
};

const GlobalStyles = createGlobalStyle`
  body::-webkit-scrollbar {
    display: none;
  }

  body {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;


const AppContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: black;
`;

const SplineWrapper = styled.div`
  position: relative;
  flex-grow: 1;
`;


const TextContainer = styled.div`
  position: absolute;
  z-index: 1; 
  top: 40%;
  left:5%; 
  transform: translateY(-50%);
  padding: 10px;
  
  background-image: linear-gradient(to right, purple, #8a2be2);
  
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;

  -webkit-text-fill-color: transparent;
  
  font-size: 4em; 
  font-weight: bold;  
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 70px;   
  background: #1b1b1b;
  color: #ffffff;  

  display: flex;   
  justify-content: center;  
  align-items: center;  
  font-size: 1.5em;   
  font-weight: bold;  
`;

const InfoSection = styled.section`
  padding: 60px 20px;
  background-color: #040404; 
  font-size: 1.2em;
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
`;

const InfoBlock = styled.div`
  max-width: 800px;
  margin-bottom: 40px;
  
  display: flex;
  flex-wrap: wrap; 
   
   & > * {
     margin-right:20px;
     &:last-child{
       margin-right :0 ;
     }
   }
   @media (max-width :768px){
    & > *{
      width :100%;
      margin-right :0 ;
    }
}
`;


const InfoImage = styled.img`
  max-width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const InfoHeader = styled.h2`
  font-size: 2em;
  margin-bottom: 15px;
`;

const InfoText = styled.p`
  text-align: justify;
`;

const TransparentButton = styled.button`
  margin-top: 20px;
  padding: 8px 16px;
  background-color: black;
  border: 2px solid white; 
  border-radius: 5px;
  color: white; 
  cursor: pointer;
  font-size: 0.5em;  
  font-weight: bold;  
  transition: background-color 0.5s ease, color 0.3s ease, border-color 0.3s ease;


  // Glow effect
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 150%; 
    background-color: rgba(128, 0, 128, 0.3);
    border-radius: 50%;
    z-index: -1;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 50px 20px rgba(128, 0, 128, 0.5); 
  }

  background-clip: padding-box; 
  -webkit-text-fill-color: white;  

  &:hover {
    background-image: linear-gradient(to right, purple, #8a2be2);
    color: #fff; // Optional: If you want to change text color on hover
    border-color: #8a2be2; // Optional: If you want to change border color on hover
  }
`;

const WarningMessage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  font-weight: bold;
  color: black;
  z-index: 9999;
  background-color: white;
`;

const FadeOutAnimation = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black; 
  z-index: 9999;
  animation: ${props => props.shouldFadeOut ? css`${FadeOutAnimation} 1s forwards` : "none"};
`;

const GlowingText = styled.span`
  color: ${props => props.color};
  text-shadow: 0 0 10px ${props => props.color}, 
               0 0 20px ${props => props.color}, 
               0 0 30px ${props => props.color}, 
               0 0 40px ${props => props.color};
`;

const AQISection = styled.section`
  padding: 40px 20px;
  background-color: #111;
  color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 1.5em;
`;

const AQINumber = styled.span`
  color: ${props => props.city === 'Malang (Smart City)' ? 'green' : 'red'};
`;

const AQIData = ({ city, url }) => {
  const [data, setData] = useState(null);
  const [ref, inView] = useInView({
    rootMargin: '0px 0px -100px 0px', 
  });

  useEffect(() => {
    if (inView && !data) {
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const result = await response.json();
          setData(result.data);
        } catch (error) {
          console.error("Error fetching AQI data:", error);
        }
      };
      fetchData();
    }
  }, [url, inView, data]); 

  return (
    <div ref={ref}>
      <strong>{city}: </strong>
      {data !== null && (
        inView ? (
        <GlowingText color={city === 'Malang (Smart City)' ? 'green' : 'red'}>
          <CountUp end={data.aqi} duration={2.5} />
        </GlowingText>
        ) : (
          'Loading...'
        )
      )}
    </div>
  );
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldFadeOut, setShouldFadeOut] = useState(false);
  const parallax = useRef();

  const isMobileView = window.innerWidth <= 768;

  useEffect(() => {
    const loadingDelay = setTimeout(() => {
      setShouldFadeOut(true);
      
      const fadeOutDelay = setTimeout(() => {
        setIsLoaded(true);
      }, 1000); 

      return () => clearTimeout(fadeOutDelay);
    }, 4000); 

    return () => clearTimeout(loadingDelay);
  }, []);

  return (
    <AppContainer>
      {!isLoaded && (
        <LoaderContainer shouldFadeOut={shouldFadeOut}>
          <RaceBy 
            size={250}
            lineWeight={8}
            speed={1.4} 
            color="white" 
          />
        </LoaderContainer>
      )}
      {isMobileView && <WarningMessage>Mobile view not supported, use a desktop browser to continue...</WarningMessage>}
      <Parallax pages={3} ref={parallax}>
        {/* Spline Layer */}
        <ParallaxLayer offset={0} speed={0.3}>
        <SplineWrapper>
          <TextContainer>
            Shaping Tomorrow's 
            <br />
            Cities, Today.
            <br />
            <br />
            <TransparentButton onClick={() => parallax.current.scrollTo(1.25  )}>
              Explore More
            </TransparentButton>
          </TextContainer>
           <Spline scene="https://prod.spline.design/EIXWxLw12PpD7tBQ/scene.splinecode" />
        </SplineWrapper>
        </ParallaxLayer>
        {/* Other Content Layer */}
        <ParallaxLayer offset={1.4} speed={0.7}>
        <InfoSection>
        <InfoBlock>
          <InfoHeader>What is a Smart City?</InfoHeader>
          <InfoText>
            A smart city utilizes digital technology to connect, protect, and enhance the lives of citizens. IoT sensors, video cameras, social media, and other inputs act as a nerve center providing a city operator and its citizens with a real-time view of what's happening.
          </InfoText>
          <Lottie 
            isStopped={false}
            options={defaultOptions}
            height={400}
            width={400}
          />
        </InfoBlock>
</    InfoSection>
      <AQISection>
        <h2>Realtime Air Quality Index:</h2>
        <AQIData 
          city="Malang (Smart City)"
          url="https://api.waqi.info/feed/A416914/?token=133a79b33b32ccd7d5f484ba7746aa1548a53b3e"
        />
        <AQIData 
          city="Palembang (Non-Smart City)"
          url="https://api.waqi.info/feed/@8647/?token=133a79b33b32ccd7d5f484ba7746aa1548a53b3e"
        />
      </AQISection>
      <InfoSection>
        <InfoBlock>
          <InfoHeader>How is AQI changing as a smart city?</InfoHeader>
          <InfoText>
          Smart cities often employ IoT sensors throughout the city to monitor air quality in real time. This data can be analyzed quickly to identify pollution sources, monitor trends, and make informed decisions about how to improve air quality. By leveraging AI and machine learning algorithms, smart cities can predict future AQI based on historical data and current conditions. This allows city officials to take preemptive actions when poor air quality is expected.
          </InfoText>
        </InfoBlock>

        <InfoBlock>
          <InfoHeader>Introducing CityScape</InfoHeader>
          <InfoText>
            From IoT sensors, AI-driven analytics, advanced mobility solutions to cloud platforms, these technologies help cities gather valuable data to make informed decisions, improving urban life.
          </InfoText>
        </InfoBlock>

        <InfoBlock>
          <InfoHeader>How does it work?</InfoHeader>
          <InfoText>
            By partnering and watching official government data, we can provide you with the latest information about the air quality in your city.
          </InfoText>
        </InfoBlock>
      </InfoSection>
      </ParallaxLayer>

        </Parallax>
      <Footer>Made by Zexsys, {new Date().getFullYear()}</Footer>
      <GlobalStyles />
    </AppContainer>
  );
}

      