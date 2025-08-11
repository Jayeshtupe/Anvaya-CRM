import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const LeadContext = createContext()
const useLeads = () => useContext(LeadContext)
export default useLeads

export const LeadProvider = ({ children }) => {
    const url = "https://anvaya-crm-lyart.vercel.app"

    const [leads, setLeads] = useState([])
    const [tags, setTags] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [message, setMessage] = useState("")

    useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage("");
      setError("");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [message, error]);

  useEffect(() => {
    getLeads();
  }, []);

  const getLeads = async (query = "") => {
    setLoading(true)
    try {
        const res = await axios.get(`${url}/leads${query}`)
        setLeads(res.data)
    } catch(error) {
        setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const getLeadById = async (id) => {
    setLoading(true)
  try {
    const res = await axios.get(`${url}/leads/${id}`);
    return res.data;
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false)
  }
};

  const getTags = async (query = "") => {
    setLoading(true)
    try{
      const res = await axios.get(`${url}/tags${query}`)
      setTags(res.data)
    } catch(error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const addLead = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(`${url}/leads`, data);
      setMessage(res.data.message || "Lead added");
      getLeads();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

    const editLead = async (id, data) => {
    setLoading(true);
    try {
      const res = await axios.patch(`${url}/leads/${id}`, data);
      setMessage(res.data.message || "Lead updated");
      getLeads(); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteLead = async (id) => {
    setLoading(true)
    try {
      const res = await axios.delete(`${url}/leads/${id}`)
      setMessage(res.data.message || "Lead deleted")
      getLeads(); 
    } catch(err){
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

 return (
    <LeadContext.Provider value={{leads, getLeads, getLeadById, addLead, editLead, deleteLead, getTags, tags, loading, error, message}}>
        {children}
    </LeadContext.Provider>
 )
}





  

  