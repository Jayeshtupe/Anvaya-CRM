# Anvaya CRM 

A full-stack CRM application to manage sales leads, sales agents and reports

This system enables businesses to track leads, assign agents, monitor progress, and visualize performance metrics through charts and reports.

## Demo Link

[Live Demo](https://anvaya-crm-frontend-pi.vercel.app/)

## Quick Start

### clone the repository
git clone https://github.com/Jayeshtupe/Anvaya-crm.git
<br>

### Install dependencies
npm install <br>

### Start development environment
 - cd frontend <br>
 `npm run dev` / `npm start` / ` yarn dev`

## Technologies
- React Js
- React Router
- Bootstrap 5/ Custom CSS
- Node.js
- Express.js
- MongoDB
- Chart.js

## Demo Video
Watch a walkthrough (5 minutes) of all major features of this application
[Loom Video Link](https://www.loom.com/share/672bd9d519e0438d8653a1d65e79b884?sid=30bf6c3f-eb85-46f6-9c2c-c71a9e4fee8a)

## Features
**Home**
- Sidebar Navigation - Quick access to Dashboard, Leads, Sales Agents, and Reports.
- All Leads Button - Redirects to the Leads page showing the complete lead details.
- Lead Status Cards — Cards for New, Contacted, Qualified, Proposal Sent, Closed leads.
Clicking a status card shows all leads with that status.
- All Agents List — Displays all agents with a View Agent Details button.
Agent Details page shows assigned leads for that agent.

**Lead Details Page**
- View full details of a selected lead.
- Edit lead information (status, priority, etc.).
##### Comment Section: 
- Assigned a sales agent from a dropdown.
- Leave comments for the lead.
- Delete Comment as needed.

**Leads Page**
- Display all leads
##### Advanced Filtering
- Filter by Sales Agent, Source, Status, Priority and Tags.
- combine multiple filters at once(URL-based filters)
- View Details - Navigate to the Lead Details page.
- Delete Lead - Remove the lead from the system.

**Sales Agent Page**
- List of all sales agents.
- add a new sales agent.
- delete an existing sales agent.

**Reports Page**
- Bar Chart - Closed leads grouped by sales agent.
- Pie Chart1 - Lead status distribution (all leads by status).
- Pie Chart2 - Pipeline vs. Closed leads in the last 7 days.

## API Reference

## Leads
### **GET /api/leads**<br>	 
Get all leads(with optionaal query filters)<br>	 
Sample Response:<br>
```[{ _id, name, source, salesAgent ... }, …]```

### **GET  /api/leads/:id**<br>
Get single lead details<br>
Sample Response
```[{ _id, name, source, salesAgent ... }, …]```

### **POST /api/leads/**<br>
Create a new lead <br>
```[{ _id, name, source, salesAgent ... }, …]```

### **PUT  /api/leads/:id**<br>
Update an existing lead<br>
Sample Response
```[{ _id, name, source, salesAgent ... }, …]```

### **DELETE  /api/leads/:id**<br>
Delete a lead<br>

## Sales Agents

### **GET  /api/agents/**<br>
Get all agents<br>
Sample Response
```[{ _id, name, email, }, …]```

### **POST  /api/agents**<br>
Create a new agent<br>
Sample Response
```[{ _id, name, email, }, …]```

### **DELETE  /api/agents/:id**<br>
Delete an agent<br>

## Comments

### **POST  /api/leads/:id/comments**<br>
Add a comment to a lead<br>
Sample Response
```[{ _id, commentText, author, }, …]```

### **DELETE  /api/leads/:id/comments/:id**<br>
Delete a comment from a lead<br>

## Contact 
For bugs, suggestions, or feature requests, please reach out to jayeshtupe7@gmail.com





