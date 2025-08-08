import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useAgents } from '../context/SalesAgentContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: leads, loading } = useFetch('https://anvaya-crm-lyart.vercel.app/leads');
  const { agents } = useAgents()

  const statusCount = leads.reduce((acc, lead) => {
    const status = lead.status?.trim(); // trim to avoid trailing/leading spaces
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const badgeColors = {
    New: 'primary',
    Contacted: 'info',
    Qualified: 'warning',
    'Proposal Sent': 'success',
    Closed: 'dark'
  };
  
  if (loading) return <p className="alert alert-info">Loading leads...</p>;

  return (
    <div className='container mt-2'>
      <h4 className=''>All Leads</h4>

      <div className="d-flex flex-wrap gap-3 my-4">
  {leads.map((lead) => (
    <div
      key={lead._id}
      className="px-3 py-2 rounded-pill border text-secondary border border-dark lead-pill"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/leadDetails/${lead._id}`)}
    >
      {lead.name}
    </div>
  ))}
</div>
      <hr />
      <div>
        <h4 className='my-3'>Lead Status Overview</h4>
        <div className='row'>
          {Object.entries(badgeColors).map(([status, color]) => {
            const count = statusCount[status];
            if (!count) return null;

            return (
              <div className='col-md-4 my-3' key={status}>
                <div className={`card h-100 border border-${color}`}>
                  <div className='card-body'>
                    <h5 className={`card-title text-${color}`}>{status}</h5>
                    <p className={`card-text text-${color}`}>Leads: {count}</p>
                    <button
                      className={`btn btn-outline-${color}`}
                      onClick={() => navigate(`/status-overview/${status}`)}
                    >
                      View Leads
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <hr />

      <h4 className='my-3'>Sales Agent Overview</h4>
      <div className='row'>
        {agents.map((agent) => (
          <div className='col-md-4 my-3' key={agents._id}>
            <div className='card h-100 shadow-sm'>
              <div className='card-body d-flex flex-column justify-content-between '>
                  <h5 className='card-tile'>{agent.name}</h5>
                  <button className='btn btn-outline-primary mt-3' onClick={() => navigate(`/agent-overview/${agent._id}`)}>View Agent</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='my-4 d-flex flex-row gap-3'>
        <button onClick={() => navigate('/leadForm')} className='btn btn-success'>+ Add New Lead</button>
        <button onClick={() => navigate('/salesAgent')} className='btn btn-primary'>+ Add New Sales Agent</button>
      </div>
    </div>
  );
};

export default Dashboard;
