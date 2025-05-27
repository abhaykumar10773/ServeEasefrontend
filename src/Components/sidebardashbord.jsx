import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { motion } from "framer-motion";
import log from "../assets/logo/log.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes, faBars, faUser, faCalendarCheck, faBell, faMoneyBill,
  faSignOutAlt, faQuestionCircle, faSliders, faWrench
} from '@fortawesome/free-solid-svg-icons';

const getMenuItems = (role) => {
  const userItems = [
    { to: "/user/users", label: "Dashboard", icon: faUser }, // Adjusted path
    { to: "/user/bookings", label: "My Bookings", icon: faCalendarCheck }, // Adjusted path
    { to: "/user/notifications", label: "Notifications", icon: faBell },
    { to: "/user/settings", label: "Settings", icon: faSliders },
    { to: "/user/support", label: "Help & Support", icon: faQuestionCircle },
    { to: "/user/logout", label: "Logout", icon: faSignOutAlt }
  ];

  const providerItems = [
    { to: "/provider/profile", label: "Dashboard", icon: faUser },
    { to: "/provider/bookings", label: "Bookings Management", icon: faCalendarCheck },
    { to: "/provider/servicemanage", label: "Service Management", icon: faWrench },
    { to: "/provider/earnings", label: "Earnings & Payments", icon: faMoneyBill },
    { to: "/provider/notifications", label: "Notifications", icon: faBell },
    { to: "/provider/settings", label: "Settings", icon: faSliders },
    { to: "/provider/support", label: "Help & Support", icon: faQuestionCircle },
    { to: "/provider/logout", label: "Logout", icon: faSignOutAlt }
  ];

  switch (role) {
    case "user":
      return userItems;
    case "serviceProvider":
      return providerItems;
    default:
      return [];
  }
};

export default function SidebarDashboard({ role }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const sidebarVariants = {
    hidden: { x: -250, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  

  const menuItems = getMenuItems(role); // Pass role to getMenuItems

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isSidebarOpen && !e.target.closest("#sidebar")) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <div className="flex h-screen">
      <div className="md:hidden fixed top-0 left-0 z-50">
        {!isSidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white bg-gray-800 p-2 rounded-none focus:outline-none"
          >
            <FontAwesomeIcon icon={faBars} className="text-2xl" />
          </button>
        )}
      </div>

      <motion.div
        id="sidebar"
        className={`fixed md:static w-64 bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 space-y-6 z-40 ${
          isSidebarOpen ? "block" : "hidden md:block"
        }`}
        variants={sidebarVariants}
        initial="visible"
        animate={isSidebarOpen || window.innerWidth >= 768 ? "visible" : "hidden"}
      >
        {isSidebarOpen && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 text-white p-2 rounded-full focus:outline-none md:hidden"
          >
            <FontAwesomeIcon icon={faTimes} className="text-2xl" />
          </button>
        )}

        <div className="flex items-center space-x-2">
          <img src={log} alt="Logo" className="h-10" />
          <span className="text-xl font-bold">ServeEase</span>
        </div><hr/>
        
        <nav className="mt-1 space-y-1">
          {menuItems.map((item) => (
            <motion.div key={item.to}>
              <Link
                to={item.to}
                className="flex items-center p-3 hover:bg-gray-700 rounded-lg"
                onClick={() => setSidebarOpen(false)}
              >
                <FontAwesomeIcon icon={item.icon} className="mr-3" />
                <span>{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </nav>
      </motion.div>
    </div>
  );
}
