import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import TestimonialBox from "./TestimonialBox";

export default function TestimonialSlider({ testimonials }) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div>
      <Slider {...settings}>
        {testimonials.map((item, idx) => (
          <LogoWrapper key={idx} className="flexCenter">
            <TestimonialBox text={item.paragraph} author={item.writer} />
          </LogoWrapper>
        ))}
      </Slider>
    </div>
  );
}

const LogoWrapper = styled.div`
  width: 90%;
  padding: 0 5%;
  cursor: pointer;
  :focus-visible {
    outline: none;
    border: 0px;
  }
`;
