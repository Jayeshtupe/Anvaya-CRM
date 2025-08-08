import { useState } from "react"
import { useAgents } from "../context/SalesAgentContext"


const SalesAgent = () => {
    const { loading, error, message, agents, addAgent, deleteAgent } = useAgents()

   const [formData, setFormData] = useState({ name: "", email: "" })
   const [showForm, setShowForm] = useState(false)

    const handleDelete = async(id) => {
        await deleteAgent(id)
    }

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return

    await addAgent(formData);
    setFormData({ name: "", email: "" })
    setShowForm(false)
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({ name: "", email: "" })
  };

    return (
        <div className="container mt-3">
            {loading && <div className="alert alert-info">Loading...</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}

            {agents.length === 0 ? (
                <div className="text-center text-secondary">No Sales agent found</div>
            ) : (
                <ul className="list-group">
                    {agents.map((agent) => (
                        <li key={agent._id} className="list-group-item d-flex justify-content-between align-items-center p-3">
                           <div className="text-primary fw-semibold">
                            <strong></strong> {agent.name} - <small><span className="text-muted">{agent.email}</span></small>
                           </div>
                           <div className="ms-auto d-flex gap-2">
                           <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(agent._id)}>Delete</button>
                           </div>
                        </li>
                    ))}
                </ul>
            )}

        {!showForm ? (
        <button className="btn btn-sm btn-primary mt-4" onClick={() => setShowForm(true)}>
          + Add Sales Agent
        </button>
      ) : (
        <div className="card p-3 mt-4">
          <h5 className="mb-3">Add Sales Agent</h5>
          <form onSubmit={handleAdd}>
            <div className="mb-2">
              <input type="text"name="name"className="form-control" placeholder="Enter Agent Name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="mb-2">
                <input type="email" name="email" className="form-control"
                placeholder="Enter Agent Email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-sm btn-outline-primary">
                Submit
              </button>
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

        </div>
    )
}

export default SalesAgent