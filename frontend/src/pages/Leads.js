import { useEffect } from "react";
import useLeads from "../context/LeadContext";
import { useAgents } from "../context/SalesAgentContext";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Leads = () => {
  const { loading, error, message, leads, getLeads, deleteLead, tags, getTags } = useLeads();
  const { agents } = useAgents()
  const navigate = useNavigate()
  const location = useLocation()
  const  [filters, setFilters] = useState({
    status: "",
    source: "",
    salesAgent: "",
    priority: "",
    tags: ""
  })

  useEffect(() => {
    getLeads(location.search)
    getTags(location.search)
  }, [location.search])

  const handleChange = (e) => {
    const { name, value } = e.target
    
    const updatedFilters = {
      ...filters,
      [name]: value
    }
  
  setFilters(updatedFilters)

  const queryParams = new URLSearchParams()

  Object.entries(updatedFilters).forEach(([key, value]) => {
    if(value) queryParams.set(key, value)
  })

  navigate(`/leads?${queryParams.toString()}`)
}

const clearFilters = () => {
  setFilters({
    status: "",
    salesAgent: "",
    source: "",
    priority: "",
    tags: ""
  })

  navigate("/leads")
}

const handleDelete = async (id) => {
      await deleteLead(id);
  };

  return (
    <div className="container mt-3">
      {loading && <div className="alert alert-info">Loading leads...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <div className="card p-3 mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <h4 className="mb-3">Filter Leads</h4>
          <button onClick={clearFilters} className="btn btn-outline-secondary">Clear Filters</button>
        </div>
        
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Status</label>
            <select value={filters.status} onChange={handleChange} name="status" className="form-select">
            <option value="">All Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Closed">Closed</option>
          </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Source:</label>
            <select value={filters.source} onChange={handleChange} className="form-select" name="source">
              <option value="">All Source</option>
              <option value="Advertisement">New</option>
              <option value="Website">Contacted</option>
               <option value="Cold Call">Cold Call</option>
              <option value="Referral">Qualified</option>
            </select>
          </div>
          
          <div className="col-md-6">
        <label className="form-label">Sales Agent</label>
      <select name="salesAgent" value={filters.salesAgent} onChange={handleChange} className="form-select">
      <option value="">All Agents</option>
      {agents.map((agent) => (
      <option key={agent._id} value={agent._id}>
        {agent.name}
      </option>
    ))}
   </select>
   </div>
          
          <div className="col-md-6">
          <label className="form-label">Priority</label>
          <select name="priority" value={filters.priority} onChange={handleChange} className="form-select">
         <option value="">All Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

          </div>

          <div className="col-md-6">
  <label className="form-label">Tag</label>
  <select name="tags" value={filters.tags} onChange={handleChange} className="form-select">
  <option value="">All Tags</option>
  {tags.map((tag) => (
    <option key={tag._id} value={tag.name}>
      {tag.name}
    </option>
  ))}
</select>

</div>


        </div>
      </div>

      {leads.length === 0 ? (
        <div className="text-center text-secondary">No leads available.</div>
      ) : (
        <ul className="list-group">
          {leads.map((lead) => (
            <li key={lead._id} className="list-group-item d-flex justify-content-between align-items-center p-3">
              <div>
                <h5>{lead.name}</h5>
                <small className="text-muted">Status: <span className="badge bg-secondary">{lead.status}</span>{" "} | Agent:{" "}
                <span className="text-primary fw-semibold">
                    {lead.salesAgent?.name || lead.salesAgent || "N/A"}
                  </span>
                </small>
              </div>

              <div className="ms-auto d-flex gap-2">
              <button onClick={() => navigate(`/leads/${lead._id}`)} className="btn btn-sm btn-outline-primary">View Details</button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDelete(lead._id)}
              >
                Delete
              </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Leads;
