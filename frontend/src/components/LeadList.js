import { useLocation } from "react-router-dom";
import useFetch from "../useFetch";

const LeadList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(searchParams.entries());

  const { data, loading } = useFetch('https://anvaya-crm-lyart.vercel.app/leads');

  if (loading) return <p>Loading leads...</p>;

  return (
    <div>
      <h2>Lead List</h2>
      {data?.map((lead) => (
        <div key={lead._id} className="lead-card">
          <h3>{lead.name}</h3>
          <p>Status: {lead.status}</p>
          <p>Agent: {lead.salesAgent?.name}</p>
        </div>
      ))}
    </div>
  );
};

export default LeadList;