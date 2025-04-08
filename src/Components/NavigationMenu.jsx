import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

export const NavigationMenu = ({
  isMenuOpen,
  toggleNavigationMenu,
  menuItems = [],
}) => {
  return (
    <>
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-30"
              onClick={toggleNavigationMenu} // Close menu when clicking outside
            ></motion.div>

            {/* Navigation menu */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[350px] bg-white shadow-lg z-40 overflow-y-auto"
            >
              <div className="flex flex-col py-4 px-6">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-primary-blue font-serif">
                    Menu
                  </h2>
                  {/* Close button */}
                  <button
                    className="text-gray-600 hover:text-primary-blue transition-colors duration-200"
                    onClick={toggleNavigationMenu}
                  >
                    <FiX size={28} />
                  </button>
                </div>

                {/* Render menu items */}
                <div className="space-y-4">
                  {menuItems.map((menuItem, index) => (
                    <div key={index}>
                      {menuItem.link ? (
                        <Link
                          to={menuItem.link}
                          className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-primary-blue transition-colors duration-200 group"
                          onClick={toggleNavigationMenu} // Close the menu after navigation
                        >
                          {menuItem.icon && (
                            <menuItem.icon
                              size={20}
                              className="text-primary-blue group-hover:text-primary-blue transition-colors duration-200"
                            />
                          )}
                          <span>{menuItem.name}</span>
                        </Link>
                      ) : (
                        <button
                          onClick={() => {
                            menuItem.onClick?.();
                            toggleNavigationMenu(); // Close the menu after action
                          }}
                          className="flex w-full items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 group"
                        >
                          {menuItem.icon && (
                            <menuItem.icon
                              size={20}
                              className="text-gray-700 group-hover:text-red-600 transition-colors duration-200"
                            />
                          )}
                          <span>{menuItem.name}</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
