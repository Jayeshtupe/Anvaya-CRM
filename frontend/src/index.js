import React from "react";
import ReactDom from "react-dom/client"
import { StrictMode } from "react";
import './index.css'; 
import App from './App'
import { SidebarProvider } from "./context/SidebarContext";
import { LeadProvider } from "./context/LeadContext";
import { AgentProvider } from "./context/SalesAgentContext";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDom.createRoot(document.getElementById('root'))
root.render(
    <StrictMode>
        
        <LeadProvider>
           <AgentProvider>
        <SidebarProvider>
        <App/>
        </SidebarProvider>
       </AgentProvider>
        </LeadProvider>
       
        </StrictMode>
      
)