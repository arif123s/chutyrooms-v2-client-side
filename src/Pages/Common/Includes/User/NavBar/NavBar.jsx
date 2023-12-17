import chutyLogo from "../../../../../assets/icons/Chuty-Logo.svg"
import propertyLogo from "../../../../../assets/icons/Property.svg"
import memberLogo from "../../../../../assets/icons/Member.svg"
import globalLogo from "../../../../../assets/icons/Global.svg"
import "./NavBar.css"

const NavBar = () => {
    return (
      <div className="navbar w-full">
        <div className=" w-full">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            ></ul>
          </div>
          <div className="flex justify-between">
            <a className="nav-chuty-logo">
              <img src={chutyLogo}></img>
            </a>

            <ul className="menu menu-horizontal px-1">
              <li>
                <a className="bg-[#E8F5ED] text-[#159947] mr-4">
                  <img src={propertyLogo}></img>
                  Chuty Property
                </a>
              </li>
              <li>
                <a className="bg-[#E8F5ED] text-[#159947]">
                  <img src={memberLogo}></img>
                  Deal Membership
                </a>
              </li>
              <li>
                <a className="">
                  <img src={globalLogo}></img>
                  <select name="" id="">
                    <option value="">BDT</option>
                  </select>
                </a>
              </li>
              <li>
                <a className="bg-[#159947] text-white">Login</a>
              </li>
            </ul>
          </div>
        </div>
        {/* <div className=" hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a className="bg-[#E8F5ED] text-[#159947] mr-4">
                <img src={propertyLogo}></img>
                Chuty Property
              </a>
            </li>
            <li>
              <a className="bg-[#E8F5ED] text-[#159947]">
                <img src={memberLogo}></img>
                Deal Membership
              </a>
            </li>
            <li>
              <a className="">
                <img src={globalLogo}></img>
                <select name="" id="">
                  <option value="">BDT</option>
                </select>
              </a>
            </li>
            <li>
              <a className="bg-[#159947] text-white">Login</a>
            </li>
          </ul>
        </div> */}
      </div>
    );
};

export default NavBar;