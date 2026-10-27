import "./Hero.css";

// Components
import TwelveGrid from "../../../../components/layout/TwelveGrid/TwelveGrid";

function Hero() {
  return (
    <div className="hero-section">
      <TwelveGrid>
        <div>
          <h1>Fragments of life</h1>
          <p>
            A collection of thoughts, experiences, lessons, and moments worth
            remembering.
          </p>
        </div>
      </TwelveGrid>
    </div>
  );
}

export default Hero;
