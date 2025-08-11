import { useSidebar } from "../context/SidebarContext";
import { Link } from "react-router-dom";
import { FaAddressCard, FaTachometerAlt, FaUsers, FaChartBar, FaHome } from 'react-icons/fa';
import { IoReturnDownBackOutline, IoSettingsOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
const Sidebar = () => {
  const { isSidebarOpen } = useSidebar();
  const location = useLocation()
  const isDashboard = location.pathname === "/"

  return (
    <div className={`bg-black text-white d-flex flex-column p-3 ${isSidebarOpen ? '' : 'd-none d-md-flex'}`}
  style={{ width: "250px", minHeight: "100vh" }}>
      <Link to="/" className="nav-link"><h3 className="text-white d-flex align-items-center gap-2">
          <FaHome /> Anvaya CRM
        </h3></Link>
      <ul className="nav nav-pills flex-column mt-3 gap-2">
        {isDashboard ? (
          <>
          <li className="nav-item">
          <Link to="/leads" className="nav-link text-white d-flex align-items-center gap-2">
            <FaAddressCard /> Leads
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/salesAgent" className="nav-link text-white d-flex align-items-center gap-2">
            <FaUsers /> Sales Agent
          </Link>
        </li>
        <li className="nav-item">
         <Link to="/reports" className="nav-link text-white d-flex align-items-center gap-2">
            <FaChartBar /> Reports
          </Link>
        </li>
        <li className="nav-item">
         <Link to="/settings" className="nav-link text-white d-flex align-items-center gap-2">
            <IoSettingsOutline /> Settings
          </Link>
        </li>
          </>
        ) : (
          <li className="nav-item">
            <Link to="/" className="nav-link text-white d-flex align-items-center gap-2"> <IoReturnDownBackOutline /> Back to Dashboard </Link>
          </li>
        )}
      </ul>
      {
        <style>
          {
            `
            .nav-link:hover{
            background-color: rgba(255, 255, 255, 0.1);
            color: #0dcaf0 !important
            }
             .nav-link:focus {
          background-color: rgba(255, 255, 255, 0.15);
        }
            `
          }
        </style>
      }
    </div>
  );
};

export default Sidebar;