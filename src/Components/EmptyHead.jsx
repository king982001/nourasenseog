import Logo from "/Logo.png";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";

const EmptyHead = ({ showLogoutBtn = false, logoutHandler }) => {
  return (
    <div
      className={`bg-primary-blue flex w-full min-h-12 p-4 md:p-0 md:py-4 md:px-8 justify-between items-center`}
    >
      {/* Logo */}
      <Link to={"/"}>
        <img src={Logo} alt="Nourasense" className={"h-6 sm:h-8 w-auto"} />
      </Link>
      {showLogoutBtn && (
        <button
          onClick={logoutHandler}
          className={
            "text-white flex justify-center  hover:text-red-400 transition-colors items-center space-x-1"
          }
        >
          <p className={"font-sans font-normal"}>Logout</p>
          <MdLogout size={28} />
        </button>
      )}
    </div>
  );
};

export default EmptyHead;
