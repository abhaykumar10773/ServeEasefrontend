import { motion } from "framer-motion";
import Header from "../Components/Heade.jsx"
import SidebarDashboard from "../Components/sidebardashbord.jsx"
import { Outlet } from "react-router";

export default function Dashboard({role}) {
  return (
    <>
    <Header />
    <div className="flex h-screen">
      <SidebarDashboard role={role} />
      <div className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }}>
          <Outlet /> {/* Nested route content will render here */}
        </motion.div>
      </div>
    </div>
  </>
  )
}



