import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import Leads from "../pages/Leads"
import LeadForm from "../pages/LeadForm";
import LeadDetails from "../pages/LeadDetails";
import LeadsStatusOverview from "../pages/LeadsStatusOverview"
import SalesAgent from "../pages/SalesAgent";
import SalesAgentOverview from "../pages/SalesAgentOverview";
import Reports from "../pages/Reports";
import Setting from "../pages/Setting";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Dashboard/>
            },
            {
                path: 'leads',
                element: <Leads/>
            },
            {
                path: 'leadForm',
                element: <LeadForm/>
            },
            {
                path: 'leadform/:id',
                element: <LeadForm />
            },
            {
                path: 'leads/:id',
                element: <LeadDetails/>
            },
            {
                path:'status-overview/:status',
                element: <LeadsStatusOverview/>
            },
            {
                path: 'salesAgent',
                element: <SalesAgent/>
            },
            {
                path: 'agent-overview/:id',
                element: <SalesAgentOverview/>
            },
            {
                path: 'reports',
                element: <Reports/>
            },
            {
                path: 'settings',
                element: <Setting/>
            }
        ]
    }
])

export default router