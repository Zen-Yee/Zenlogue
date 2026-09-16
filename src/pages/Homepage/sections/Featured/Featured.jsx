import React from "react";
import "./Featured.css";
import TwelveGrid from "../../../../components/layout/TwelveGrid/TwelveGrid";
import Carousel from "../../../../components/ui/Carousel/Carousel";
import BasicCard from "../../../../components/ui/BasicCard/BasicCard";

function Featured() {
  return (
    <div className="featured-section">
      <TwelveGrid>
        <h2 className="section-title">Featured</h2>
        <Carousel className="featured-carousel">
          <BasicCard
            title="Learning to Slow Down"
            content="A reflection on stepping away from the constant pressure to be productive, making space for the things that matter, and learning that progress doesn’t always have to be measured by how much you accomplish."
          />
          <BasicCard
            title="The Things I Never Planned For"
            content="A personal reflection on how life rarely follows the plans we make, and how unexpected changes, mistakes, and detours can sometimes lead us somewhere better."
          />
          <BasicCard
            title="Learning to Enjoy the Ordinary"
            content="A collection of thoughts about finding meaning in everyday moments—the quiet mornings, familiar places, small routines, and simple experiences that often go unnoticed."
          />
        </Carousel>
      </TwelveGrid>
    </div>
  );
}

export default Featured;
