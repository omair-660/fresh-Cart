import React from "react";
import Slider from "react-slick";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import img1 from "../../assets/slide1.jpg";
import img2 from "../../assets/slide2.jpg";
import img3 from "../../assets/slide3.jpg";
import img4 from "../../assets/slide4.jpg";
import img5 from "../../assets/slide3.jpg";
export default function MainSlider() {
  let settings = {
    dots: true,
    infinity: true,
    autoplay: true,
    slideToShow: 1,
    slideToscroll: 1,
  };
  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-7">
            <Slider {...settings}>
              <LazyLoadImage className="w-100 imgHomeFirst" effect="blur" src={img1} />
              <LazyLoadImage className="w-100 imgHomeFirst" effect="blur" src={img2} />
              <LazyLoadImage className="w-100 imgHomeFirst" effect="blur" src={img3} />
            </Slider>
          </div>
          <div className="col-md-5">
            <LazyLoadImage className="w-100 imgHomeEr " effect="blur" src={img4} />
            <LazyLoadImage className="w-100 imgHomeEr" effect="blur" src={img5} />
          </div>
        </div>
      </div>
    </>
  );
}
