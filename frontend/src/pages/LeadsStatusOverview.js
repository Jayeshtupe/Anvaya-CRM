import { useParams } from "react-router-dom"
import useLeads from "../context/LeadContext"

const LeadsStatusOverview = () => {
    const { status } = useParams()
    const { leads } = useLeads()

    const filteredLeadsStatus = leads.filter((lead) => (
        lead.status.trim().toLowerCase() === status.toLowerCase()
    ))
    return (
        <div className="container">
            <h4 className="my-3 text-center fw-bold">Lead Status <span className="badge bg-secondary">{status}</span></h4>
            {filteredLeadsStatus.length === 0 ? (
                <p>No Leads found with this status.</p>
            ) : (
               <ul className="list-group">
                {filteredLeadsStatus.map((lead) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3" key={lead._id}>
                        <div>
                <h5 className="fw-bold">{lead.name}</h5>
                <small className="text-muted">Status: <span className="badge bg-secondary">{lead.status}</span>{" "} | Agent:{" "}
                <span className="text-primary fw-semibold">
                    {lead.salesAgent?.name || lead.salesAgent || "N/A"}
                  </span>
                </small>
              </div>

              <div>
                <small className="text-muted">Priority: {" "}<span className="badge bg-warning text-dark">{lead.priority}</span></small>
              </div>
                    </li>
                ))}
               </ul>
            )}
        </div>
    )
}

export default LeadsStatusOverview