import "./Footer.css";
import appStoreIcon from "../../../../assets/icons/app-store.svg";
import googlePlayIcon from "../../../../assets/icons/google-play.svg";
import qrCodeIcon from "../../../../assets/icons/qr-code.svg";
import arrowLeftIcon from "../../../../assets/icons/arrow-left.svg";
import arrowRightIcon from "../../../../assets/icons/arrow-right.svg";
import visaIcon from "../../../../assets/icons/visa.svg";
import mastercardIcon from "../../../../assets/icons/mastercard.svg";
import americanIcon from "../../../../assets/icons/american-express.svg";
import dbblIcon from "../../../../assets/icons/dbbl.svg";
import citytouchIcon from "../../../../assets/icons/citytouch.svg";
import bracIcon from "../../../../assets/icons/brac-bank.svg";
import bkashIcon from "../../../../assets/icons/bkash.svg";
import nagadIcon from "../../../../assets/icons/nagad.svg";
import rocketIcon from "../../../../assets/icons/rocket.svg";
import copyrightIcon from "../../../../assets/icons/copyright.svg";
import facebookIcon from "../../../../assets/icons/facebook.svg";
import instagramIcon from "../../../../assets/icons/instagram.svg";
import linkedinIcon from "../../../../assets/icons/linkedin.svg";
import youtubeIcon from "../../../../assets/icons/youtube.svg";
import { useNavigate } from "react-router-dom";
import { useGetAllActivePaymentMethodsQuery } from "../../../../redux/features/footer/paymentMethods.api";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

const Footer = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllActivePaymentMethodsQuery();

  // console.log("paymentMethods", data?.paymentMethods);

  return (
    <div className="">
      <footer className="footer-container ">
        <h2 className=" footer-head-title">ChutyRooms Discover</h2>

        <hr className="custom-hr" />

        <div className="">
          <div className="custom-container">
            <div className="nav-items-container">
              <div className="download-app-container">
                <div className="download-app">
                  <h2 className=" nav-item-title">
                    Download ChutyRooms App For Exciting Offers
                  </h2>
                  <div className="app-google-icon-container">
                    <img
                      className="app-google-icon"
                      src={appStoreIcon}
                      alt=""
                    />
                    <img
                      className="app-google-icon"
                      src={googlePlayIcon}
                      alt=""
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-center text-sm lg:text-base my-2">OR</p>
                    <div className="flex justify-center items-center">
                      <p className="text-sm lg:text-base">Scan QR Code</p>
                      <img className="qr-img" src={qrCodeIcon} alt="" />
                    </div>
                  </div>
                </div>
                <div className="divide"></div>
              </div>

              <div className="payment-container">
                <div className="payment">
                  <header className="nav-item-title">Payment Method</header>
                  {/* <div className="payment-items-container">
                    <div className="">
                      <Swiper
                        slidesPerView={3} // Display 3 items per slide (3 columns)
                        // slidesPerColumn={3}
                        spaceBetween={10}
                        navigation={true}
                        speed={1000}
                        modules={[Autoplay, Navigation]}
                        className="mySwiper"
                      >
                        <div className="payment-items">
                          <SwiperSlide>
                            <img
                              className="payment-icon"
                              src={visaIcon}
                              alt=""
                            />
                          </SwiperSlide>
                          <SwiperSlide>
                            <img
                              className="payment-icon"
                              src={americanIcon}
                              alt=""
                            />
                          </SwiperSlide>
                          <SwiperSlide>
                            <img
                              className="payment-icon"
                              src={mastercardIcon}
                              alt=""
                            />
                          </SwiperSlide>
                          <SwiperSlide>
                            <img
                              className="payment-icon"
                              src={dbblIcon}
                              alt=""
                            />
                          </SwiperSlide>
                          <SwiperSlide>
                            <img
                              className="payment-icon"
                              src={citytouchIcon}
                              alt=""
                            />
                          </SwiperSlide>
                          <SwiperSlide>
                            <img
                              className="payment-icon"
                              src={bracIcon}
                              alt=""
                            />
                          </SwiperSlide>
                          <SwiperSlide>
                            <img
                              className="payment-icon"
                              src={bkashIcon}
                              alt=""
                            />
                          </SwiperSlide>
                          <SwiperSlide>
                            <img
                              className="payment-icon"
                              src={nagadIcon}
                              alt=""
                            />
                          </SwiperSlide>
                          <SwiperSlide>
                            <img
                              className="payment-icon"
                              src={rocketIcon}
                              alt=""
                            />
                          </SwiperSlide>
                        </div>
                      </Swiper>
                    </div>
                  </div> */}
                  <div className="payment-items-container">
                    <img className="payment-arrow" src={arrowLeftIcon} alt="" />
                    <div className="payment-items">
                      <img className="payment-icon" src={visaIcon} alt="" />
                      <img
                        className="payment-icon"
                        src={mastercardIcon}
                        alt=""
                      />
                      <img className="payment-icon" src={americanIcon} alt="" />
                      <img className="payment-icon" src={dbblIcon} alt="" />
                      <img
                        className="payment-icon"
                        src={citytouchIcon}
                        alt=""
                      />
                      <img className="payment-icon" src={bracIcon} alt="" />
                      <img className="payment-icon" src={bkashIcon} alt="" />
                      <img className="payment-icon" src={nagadIcon} alt="" />
                      <img className="payment-icon" src={rocketIcon} alt="" />
                    </div>
                    <img
                      className="payment-arrow"
                      src={arrowRightIcon}
                      alt=""
                    />
                  </div>
                </div>
                <div className="divide"></div>
              </div>

              <div className="discover-container">
                <div className="discover-items-container">
                  <header className="nav-item-title">Discover</header>
                  <div className="discover-items">
                    <div>
                      <p className="">
                        <a
                          href=""
                          onClick={(e) => {
                            e.preventDefault(), navigate("/about-us");
                          }}
                          className="link link-hover"
                        >
                          About us
                        </a>
                      </p>
                      <p>
                        <a
                          href=""
                          onClick={(e) => {
                            e.preventDefault(), navigate("/blog");
                          }}
                          className="link link-hover"
                        >
                          Blog
                        </a>
                      </p>
                      <p>
                        <a
                          href=""
                          onClick={(e) => {
                            e.preventDefault(), navigate("/team");
                          }}
                          className="link link-hover"
                        >
                          Team
                        </a>
                      </p>
                      <p>
                        <a
                          href=""
                          onClick={(e) => {
                            e.preventDefault(),
                              navigate("/term-and-conditions");
                          }}
                          className="link link-hover"
                        >
                          Terms & Condtions
                        </a>
                      </p>
                      <p>
                        <a
                          href=""
                          onClick={(e) => {
                            e.preventDefault(), navigate("/privacy-policy");
                          }}
                          className="link link-hover"
                        >
                          Privacy Policy
                        </a>
                      </p>
                    </div>
                    <div>
                      <p>
                        <a
                          href=""
                          onClick={(e) => {
                            e.preventDefault(), navigate("/refund-policy");
                          }}
                          className="link link-hover"
                        >
                          Refund Policy
                        </a>
                      </p>
                      <p>
                        <a
                          href=""
                          onClick={(e) => {
                            e.preventDefault(), navigate("/faq");
                          }}
                          className="link link-hover"
                        >
                          FAQ
                        </a>
                      </p>
                      <p>
                        <a
                          href=""
                          onClick={(e) => {
                            e.preventDefault(), navigate("/guest-policy");
                          }}
                          className="link link-hover"
                        >
                          Guest Policy
                        </a>
                      </p>
                      <p>
                        <a
                          href=""
                          onClick={(e) => {
                            e.preventDefault(), navigate("/legal");
                          }}
                          className="link link-hover"
                        >
                          Legal
                        </a>
                      </p>
                      {/* <p>
                        <a
                          href=""
                          onClick={(e) => {
                            e.preventDefault(), navigate("/earn-with-chutyrooms");
                          }}
                          className="link link-hover"
                        >
                          Earn with ChutyRooms
                        </a>
                      </p> */}
                    </div>
                  </div>
                </div>
                <div className="divide"></div>
              </div>

              <div className="contact-container">
                <header className="nav-item-title">Contact</header>
                <p className="contact-info">Email: info@chutyrooms.com</p>
                <p className="contact-info">Phone: +88 01958 609900</p>
                <div className="social-accounts-container">
                  <img className="social-icon" src={facebookIcon} alt="" />
                  <img className="social-icon" src={instagramIcon} alt="" />
                  <img className="social-icon" src={linkedinIcon} alt="" />
                  <img className="social-icon" src={youtubeIcon} alt="" />
                </div>
                <p className="mb-1.5">
                  <a className="nav-item-title">Subscribes Our Newsletter</a>
                </p>
                <div className="flex">
                  <input
                    className="subscribe-email-input text-white"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <button className="subscribe-btn">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <p className="copyright-text custom-container">
            Copyright <img className="mx-1" src={copyrightIcon} alt="" />{" "}
            Chutyrooms {new Date().getFullYear()}. All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
