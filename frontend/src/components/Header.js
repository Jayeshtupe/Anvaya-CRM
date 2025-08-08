import {useEffect, useState } from "react";
import { useSidebar } from "../context/SidebarContext";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { toggleSidebar } = useSidebar();
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('')
  
  useEffect(() => {
    const path = location.pathname
    const staticRoutes = {
      '/': 'Anvaya CRM Dashboard',
      '/leads': 'Leads',
      '/salesAgent': 'Sales Agent',
      '/reports': 'Reports',
    };

    if (staticRoutes[path]) {
      setPageTitle(staticRoutes[path]);
    } else if (path.startsWith('/leadDetails')) {
      setPageTitle('Lead Details');
    } else if (path.startsWith('/status-overview')) {
      setPageTitle('Lead Status Overview');
    } else if (path.startsWith('/agent-overview')) {
      setPageTitle('Sales Agent Overview');
    } else if (/^\/leads\/[\w\d]+$/.test(path)) {
    setPageTitle('Lead Details')
    }
    else {
      setPageTitle('');
    }
  }, [location.pathname])

  return (
    <header className="bg-light shadow-sm p-3 d-flex justify-content-between align-items-center position-relative">
      <button className="btn btn-outline-secondary d-md-none z-1" onClick={toggleSidebar}>
        &#9776;
      </button>

      <div className="d-none d-md-block" style={{ height: "40px" }}></div>

      <h2 className="fw-bold position-absolute top-50 start-50 translate-middle text-center">{pageTitle}</h2>
      
    </header>
  );
};

export default Header;