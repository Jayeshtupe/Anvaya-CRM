import { useParams } from "react-router-dom"
import useLeads from "../context/LeadContext"


const SalesAgentOverview = () => {
    const { id } = useParams()
    const { leads } = useLeads()
    
    const filteredLeads = leads.filter((lead) => lead.salesAgent._id === id)

    if (filteredLeads.length === 0) {
    return (
      <div className="container mt-3">
        <h4 className="my-3 text-center fw-bold">
          Lead Handle by Agent: <span className="badge bg-secondary">Unknown</span>
        </h4>
        <p className="alert alert-warning">
          No leads assigned to this agent
        </p>
      </div>
    );
  }

    const agent = filteredLeads[0].salesAgent
   
     return (
        <div className="container mt-3">
            <h4 className="my-3 text-center fw-bold">Lead Handle by Agent: <span className="badge bg-secondary">{agent.name}</span></h4>
             <div className="card">
                <div className="card-header fw-bold">
                   Agent: {agent.name}
                </div>
                <div className="card-body">
                    <ol className="list-group list-group-flush">
                        {filteredLeads.map((lead, index) => (
                            <li key={lead._id} className="list-group-item d-flex justify-content-between align items-center">
                                <span className="fw-medium">{index + 1}. {lead.name}</span>
                                <small className="text-secondary" >Status: <span className="badge bg-warning text-black">{lead.status}</span></small>
                            </li>
                        ))}
                    </ol>
                </div>
         <div className="card-footer bg-white p-4">
            <h6 className="fw-bold mb-2">Agent Details</h6>
            <p className="mb-1"><strong>Name:</strong> {agent.name}</p>
            <p className="mb-0"><strong>Email:</strong> {agent.email}</p>
        </div>

            </div>
           
            
        </div>
    )
}

export default SalesAgentOverview