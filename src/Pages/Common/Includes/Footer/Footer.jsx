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

const Footer = () => {
  return (
    <div className="">
      <footer className="footer-container">
        <h2 className=" footer-head-title">ChutyRooms Discover</h2>
        <hr />
        <div className="container nav-items-container ">
          <div className="nav-item-container">
            <h2 className=" nav-items-title">
              Download ChutyRooms App For Exciting Offers
            </h2>
            <div className="app-google-icon-container">
              <img className="app-google-icon" src={appStoreIcon} alt="" />
              <img className="app-google-icon" src={googlePlayIcon} alt="" />
            </div>
            <div className="w-full">
              <p className="text-center nav-item-title my-2">OR</p>
              <div className="flex  justify-center ">
                <p className="nav-item-title">Scan QR Code</p>
                <img className="qr-img" src={qrCodeIcon} alt="" />
              </div>
            </div>
          </div>

          <hr className="divide" />

          <nav>
            <header className=" nav-items-title">Payment Method</header>
            <div className="payment-items-container">
              <img className="payment-arrow" src={arrowLeftIcon} alt="" />
              <div className="payment-items">
                <img className="payment-icon" src={visaIcon} alt="" />
                <img className="payment-icon" src={mastercardIcon} alt="" />
                <img className="payment-icon" src={americanIcon} alt="" />
                <img className="payment-icon" src={dbblIcon} alt="" />
                <img className="payment-icon" src={citytouchIcon} alt="" />
                <img className="payment-icon" src={bracIcon} alt="" />
                <img className="payment-icon" src={bkashIcon} alt="" />
                <img className="payment-icon" src={nagadIcon} alt="" />
                <img className="payment-icon" src={rocketIcon} alt="" />
              </div>
              <img className="payment-arrow" src={arrowRightIcon} alt="" />
            </div>
          </nav>

          <hr className="divide" />
          <nav>
            <header className=" nav-items-title">Discover</header>
            <div className="discover-items-container">
              <div>
                <p>
                  <a className="link link-hover">About us</a>
                </p>
                <p>
                  <a className="link link-hover">Blog</a>
                </p>
                <p>
                  <a className="link link-hover">Team</a>
                </p>
                <p>
                  {" "}
                  <a className="link link-hover">Terms & Condtions</a>
                </p>
                <p>
                  {" "}
                  <a className="link link-hover">Privacy Policy</a>
                </p>
              </div>
              <div>
                <p>
                  <a className="link link-hover">Refund Policy</a>
                </p>
                <p>
                  {" "}
                  <a className="link link-hover">FAQ</a>
                </p>
                <p>
                  {" "}
                  <a className="link link-hover">Guest Policy</a>
                </p>
                <p>
                  {" "}
                  <a className="link link-hover">Legal</a>
                </p>
                <p>
                  {" "}
                  <a className="link link-hover">Earn with ChutyRooms</a>
                </p>
              </div>
            </div>
          </nav>
          <hr className="divide" />
          <nav>
            <header className="nav-items-title">Contact</header>
            <p>Email: info@chutyrooms.com</p>
            <p>Phone: +88 01958 609900</p>
            <div className="social-accounts-container">
              <img className="social-icon" src="" alt="" />
            </div>
            <p>
              <a className="link link-hover">Subscribes Our Newsletter</a>
            </p>
            <input type="email" />
            <button>Subscribe</button>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
