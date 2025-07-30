import Logo from "/Logo.png";
import { Link } from "react-router-dom";
import { IoReorderThreeOutline } from "react-icons/io5";
import { useState } from "react";
import { NavigationMenu } from "src/Components/NavigationMenu.jsx";

const EmptyHead = ({ showNavigation = false, menuItems }) => {
  const [isNaviagtionMenuOpen, setIsNavigationMenuOpen] = useState(false);

  const toggleNavigationMenu = () => {
    setIsNavigationMenuOpen((state) => !state);
  };

  return (
    <div
      className={`bg-primary-blue flex w-full min-h-12 p-4 md:p-0 md:py-4 md:px-8 justify-between items-center`}
    >
      {/* Logo */}
      <Link to={"/"}>
        <img src={Logo} alt="Nourasense" className={"h-6 sm:h-8 w-auto"} />
      </Link>

      {showNavigation && (
        <button
          className={`text-white flex justify-center transition-colors items-center space-x-1`}
          onClick={toggleNavigationMenu}
        >
          <IoReorderThreeOutline size={36} />
        </button>
      )}

      <NavigationMenu
        toggleNavigationMenu={toggleNavigationMenu}
        isMenuOpen={isNaviagtionMenuOpen}
        menuItems={menuItems}
      />
    </div>
  );
};

export default EmptyHead;
