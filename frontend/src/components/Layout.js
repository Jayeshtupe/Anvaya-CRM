import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Header from "./Header"

const Layout = ({children, pageTitle}) => {

  return (
    <div className="d-flex">
      <Sidebar/>
      <div className="flex-grow-1">
        <Header title={pageTitle}/>
        <main className="p-4">
          <Outlet/>
          </main>
      </div>
    </div>
  )
}

export default Layout