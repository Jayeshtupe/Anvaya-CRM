import useLeadForm from "../hooks/useLeadForm";

const LeadForm = ({ isEditLead = false }) => {
  const { formData, inputHandler, submitHandler, agents, tags } = useLeadForm(isEditLead);

  return (
    <div className="container my-3">
      <h2 className="mb-4">{isEditLead ? "Edit Lead Details" : "Create New Lead"}</h2>
    
        <div className="row">
          <div className="col">
            <form onSubmit={submitHandler} className="card shadow-sm p-4">
              <h5 className="mb-4">{isEditLead ? "Edit Lead" : "New Lead Entry"}</h5>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">Lead Name</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={inputHandler}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="source" className="form-label">Lead Source</label>
                <select
                  required
                  name="source"
                  id="source"
                  className="form-select"
                  value={formData.source}
                  onChange={inputHandler}
                >
                  <option value="">-- Select Source --</option>
                  <option value="Website">Website</option>
                  <option value="Referral">Referral</option>
                  <option value="Cold Call">Cold Call</option>
                  <option value="Advertisement">Advertisement</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="salesAgent" className="form-label">Assigned Sales Agent</label>
                <select
                  required
                  name="salesAgent"
                  id="salesAgent"
                  className="form-select"
                  value={formData.salesAgent}
                  onChange={inputHandler}
                >
                  <option value="">Select Agent</option>
                  {agents.map((agent) => (
                    <option key={agent._id} value={agent._id}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="status" className="form-label">Lead Status</label>
                <select
                  required
                  name="status"
                  id="status"
                  className="form-select"
                  value={formData.status}
                  onChange={inputHandler}
                >
                  <option value="">-- Select Status --</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Closed">Closed</option>
                  {isEditLead && <option value="Closed">Closed</option>}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Tags</label>
                <div className="d-flex flex-wrap gap-3">
                  {Array.isArray(tags) && tags.map((tag) => (
                    <div key={tag._id} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={tag.name}
                        name="tags"
                        value={tag.name}
                        checked={formData.tags.includes(tag.name)}
                        onChange={inputHandler}
                      />
                      <label className="form-check-label" htmlFor={tag.name}>
                        {tag.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="timeToClose" className="form-label">Estimated Time to Close (days)</label>
                <input
                  required
                  type="number"
                  className="form-control"
                  id="timeToClose"
                  name="timeToClose"

                  placeholder="Enter time to close"
                  value={formData.timeToClose}
                  onChange={inputHandler}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="priority" className="form-label">Lead Priority</label>
                <select
                  required
                  name="priority"
                  id="priority"
                  className="form-select"
                  value={formData.priority}
                  onChange={inputHandler}
                >
                  <option value="">-- Select Priority --</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary">
                {isEditLead ? "Update Lead" : "Add Lead"}
              </button>
            </form>
          </div>
        </div>
    </div>
  );
};

export default LeadForm;
