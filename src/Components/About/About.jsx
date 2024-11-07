import React from "react";
import img from "../../assets/about.png";
import img1 from "../../assets/team2.jpg";
import img2 from "../../assets/team3.jpg";
import img3 from "../../assets/team1.jpg";
import Slider from "react-slick";

export default function About() {
  let settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <section className="overflow-hidden my-5 py-3">
        <div className="row align-items-center">
          <div className="col-md-7 ps-5">
            <div className="container">
              <h2 className="fs-1">Our Story</h2>
              <p className="pt-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Suscipit unde reiciendis quisquam sequi magni! Alias facilis
                quasi sunt in at earum officia adipisci, libero consectetur, a
                cumque quae dicta tempore? Repellat, recusandae? Minus, aliquid
                maxime! repellendus quisquam unde molestiae consequuntur
                suscipit, veniam, reiciendis, at nesciunt!
              </p>
              <p className="pt-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus accusantium minus ex repudiandae eius dolore
              </p>
            </div>
          </div>
          <div className="col-md-5 col-sm-12 bg-light-subtle">
            <img src={img} alt="" className="w-100" />
          </div>
        </div>
      </section>
      <section className="sec2 container my-5">
        <div className="row">
          <div className="col-md-3">
            <div className="flex-column align-items-center trans border border-2 py-3 box rounded-2 d-flex justify-content-center">
              <i className="rounded-circle mb-3 fs-4 trans d-flex justify-content-center align-items-center fa-solid fa-shop"></i>
              <h3>144+</h3>
              <p>Lorem, ipsum dolor.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="flex-column align-items-center trans border border-2 py-3 box rounded-2 d-flex justify-content-center">
              <i className="rounded-circle mb-3 fs-4 trans d-flex justify-content-center align-items-center fa-solid fa-dollar-sign"></i>
              <h3>144+</h3>
              <p>Lorem, ipsum dolor.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="flex-column align-items-center trans border border-2 py-3 box rounded-2 d-flex justify-content-center">
              <i className="rounded-circle mb-3 fs-4 trans d-flex justify-content-center align-items-center fa-solid fa-bag-shopping"></i>
              <h3>144+</h3>
              <p>Lorem, ipsum dolor.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="flex-column align-items-center trans border border-2 py-3 box rounded-2 d-flex justify-content-center">
              <i className="rounded-circle mb-3 fs-4 trans d-flex justify-content-center align-items-center fa-solid fa-sack-dollar pointer"></i>
              <h3>144+</h3>
              <p>Lorem, ipsum dolor.</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container my-5 py-5">
          <Slider {...settings} className="text-center">
            <div className=" px-2 text-center shadow">
             <div className="text-center mx-auto">
             <img className="mx-auto rounded" width={300} height={341} src={img1} alt="" />
             </div>
              <h2>omair mohammed</h2>
              <p>front-end</p>
              <div className="social d-flex gap-4 align-items-center justify-content-center mt-0">
                <a
                  href="https://www.facebook.com/username">
                  <i className="fa-brands fa-facebook-f text-primary"></i>
                </a>
                <a href="https://www.linkedin.com/in/omair-mohammed-%F0%9F%87%B5%F0%9F%87%B8-4120b2283?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="https://www.instagram.com/omair_660"><i className="fa-brands fa-instagram"></i></a>
              </div>
            </div>
            <div className=" px-2 text-center shadow">
              <div className="text-center mx-auto" >
              <img className="mx-auto rounded" width={300} height={341} src={img2} alt="" />
              </div>
              <h2>omair mohammed</h2>
              <p>back-end</p>
              <div className="social d-flex gap-4 align-items-center justify-content-center mt-0">
                <a
                  href="https://www.facebook.com/username">
                  <i className="fa-brands fa-facebook-f text-primary"></i>
                </a>
                <a href="https://www.linkedin.com/in/omair-mohammed-%F0%9F%87%B5%F0%9F%87%B8-4120b2283?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="https://www.instagram.com/omair_660"><i className="fa-brands fa-instagram"></i></a>
              </div>
            </div>
            <div className=" px-2 text-center shadow">
              <div className="text-center mx-auto" >
              <img className="mx-auto rounded" width={300} height={341} src={img3} alt="" />
              </div>
              <h2>omair mohammed</h2>
              <p>back-end</p>
              <div className="social d-flex gap-4 align-items-center justify-content-center mt-0">
                <a
                  href="https://www.facebook.com/username">
                  <i className="fa-brands fa-facebook-f text-primary"></i>
                </a>
                <a href="https://www.linkedin.com/in/omair-mohammed-%F0%9F%87%B5%F0%9F%87%B8-4120b2283?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="https://www.instagram.com/omair_660"><i className="fa-brands fa-instagram"></i></a>
              </div>
            </div>
            <div className=" px-2 text-center shadow">
              <div className="text-center mx-auto">
              <img className="mx-auto rounded" width={300} height={341} src={img1} alt="" />
              </div>
              <h2>omair mohammed</h2>
              <p>fullstack developer</p>
              <div className="social d-flex gap-4 align-items-center justify-content-center mt-0">
                <a
                  href="https://www.facebook.com/username">
                  <i className="fa-brands fa-facebook-f text-primary"></i>
                </a>
                <a href="https://www.linkedin.com/in/omair-mohammed-%F0%9F%87%B5%F0%9F%87%B8-4120b2283?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="https://www.instagram.com/omair_660"><i className="fa-brands fa-instagram"></i></a>
              </div>
            </div>
            <div className=" px-2 text-center shadow">
              <div className="text-center mx-auto" >
              <img className="mx-auto rounded" width={300} height={341} src={img2} alt="" />
              </div>
              <h2>omair mohammed</h2>
              <p>front-end</p>
              <div className="social d-flex gap-4 align-items-center justify-content-center mt-0">
                <a
                  href="https://www.facebook.com/username">
                  <i className="fa-brands fa-facebook-f text-primary"></i>
                </a>
                <a href="https://www.linkedin.com/in/omair-mohammed-%F0%9F%87%B5%F0%9F%87%B8-4120b2283?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="https://www.instagram.com/omair_660"><i className="fa-brands fa-instagram"></i></a>
              </div>
            </div>
          </Slider>
        </div>
      </section>

      <section className="sec3 container my-5">
        <div className="row">
          <div className="col-md-4">
            <div className="flex-column align-items-center trans py-3 box rounded-2 d-flex justify-content-center">
              <i className="rounded-circle mb-3 fs-4 trans d-flex justify-content-center align-items-center fa-solid fa-shop"></i>
              <h3>144+</h3>
              <p>Lorem, ipsum dolor.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="flex-column align-items-center trans py-3 box rounded-2 d-flex justify-content-center">
              <i className="rounded-circle mb-3 fs-4 trans d-flex justify-content-center align-items-center fa-solid fa-dollar-sign"></i>
              <h3>144+</h3>
              <p>Lorem, ipsum dolor.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="flex-column align-items-center trans py-3 box rounded-2 d-flex justify-content-center">
              <i className="rounded-circle mb-3 fs-4 trans d-flex justify-content-center align-items-center fa-solid fa-bag-shopping"></i>
              <h3>144+</h3>
              <p>Lorem, ipsum dolor.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
