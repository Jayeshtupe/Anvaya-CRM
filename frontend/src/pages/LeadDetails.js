import { useNavigate, useParams } from "react-router-dom";
import useLeads from "../context/LeadContext";
import { useEffect, useState } from "react";
import axios from "axios";

const LeadDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { leads, loading, error } = useLeads();

  const [author, setAuthor] = useState("");
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [agents, setAgents] = useState([]);
  const [succesMsg, setSuccessMsg] = useState('')

  const lead = leads.find((lead) => lead._id === id);

  useEffect(() => {
    fetchComments();
    fetchAgents();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`https://anvaya-crm-lyart.vercel.app/leads/${id}/comments`);
      setComments(res.data);
    } catch (err) {
      console.error("Error loading comments", err);
    }
  };

  const fetchAgents = async () => {
    try {
      const res = await axios.get("https://anvaya-crm-lyart.vercel.app/agents");
      setAgents(res.data);
    } catch (err) {
      console.error("Error loading agents", err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!author || !commentText.trim()) {
      alert("Author and comment text are required.");
      return;
    }
    
    try {
      await axios.post(`https://anvaya-crm-lyart.vercel.app/leads/${id}/comments`, {
        author,
        commentText,
      });
      setAuthor("");
      setCommentText("");
      fetchComments();
      setSuccessMsg("Comment added successfully")
      setTimeout(() => setSuccessMsg(""), 3000)
    } catch (err) {
      console.error("Error adding comment", err);
    }
  };

const handleDelete = async (id, commentId) => {
  try {
    await axios.delete(`https://anvaya-crm-lyart.vercel.app/leads/${id}/comments/${commentId}`);
  
    setComments(prev => prev.filter(c => c.id !== commentId));
    setSuccessMsg("Comment Deleted SuccessFully")
     setTimeout(() => setSuccessMsg(""), 3000);
  } catch (error) {
    console.error("Error deleting comment", error);
  }
};


  if (loading) return <div className="alert alert-info">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!lead) return <div className="alert alert-warning">Lead not found</div>;

  return (
    <div className="container mt-4">
      {succesMsg && <div className="alert alert-success">{succesMsg}</div>}

      <div className="card">
        <div className="card-header"><h4 className="fw-bold">{lead.name}</h4></div>
        <div className="card-body">
          <p><strong>Status:</strong> {lead.status}</p>
          <p><strong>Source:</strong> {lead.source}</p>
          <p><strong>Sales Agent:</strong> {lead.salesAgent.name}</p>
          <p><strong>Tags:</strong> {lead.tags.join(", ")}</p>
          <p><strong>Priority:</strong> {lead.priority}</p>
          <p><strong>Time to Close:</strong> {lead.timeToClose} Days</p>

          <button className="btn btn-sm btn-outline-primary my-2" onClick={() => navigate(`/leadform/${id}`)}>
            Edit Lead
          </button>

          <hr />

          <h4 className="fw-bold text-center">Comment</h4>
            <div className="mb-3">
              {comments.length === 0 ? (
                <p className="text-center fst-italic text-secondary">No comments yet.</p>
              
              ) : (
                <ul className="list-group">
                  {comments.map((c) => (
                    <li className="list-group-item" key={c._id}>
                      <strong>{c.author}</strong>: {c.commentText}
                      <br />
                      <small className="text-muted">
                        {new Date(c.createdAt).toLocaleString()}
                      </small>
                      <button onClick={() => handleDelete(id, c.id)} className="btn btn-sm btn-outline-danger float-end">Delete</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
         
          <form onSubmit={handleCommentSubmit}>
            <h4 className="fw-bold text-center">Add a Comment</h4>
            <label>Select Author</label><br />
            <select
              className="form-select"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            >
              <option value="">--Select--</option>
              {agents.map((agent) => (
                <option key={agent._id} value={agent._id}>
                  {agent.name}
                </option>
              ))}
            </select>
            <br />

            <label>Comment</label><br />
            <textarea
              className="form-control"
              rows={4}
              value={commentText}
              placeholder="Leave a comment"
              onChange={(e) => setCommentText(e.target.value)}
            />
            <br />

            <button type="submit" className="btn btn-success"> + Add Comment</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;
