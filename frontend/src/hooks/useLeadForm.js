import { useEffect, useState } from "react";
import useLeads from "../context/LeadContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useLeadForm = (editing = false, id = null) => {
  const { addLead, editLead, getTags, tags } = useLeads();
  const [formData, setFormData] = useState({
    name: "",
    source: "",
    status: "",
    salesAgent: "",
    tags: [],
    timeToClose: "",
    priority: "",
  });
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTags();
    fetchAgents();

    if (editing && id) {
      fetchLeadById(id);
    }
  }, [editing, id]);

  const fetchAgents = async () => {
    try {
      const res = await axios.get("https://anvaya-crm-lyart.vercel.app/agents");
      setAgents(res.data);
    } catch (err) {
      console.error("Error loading agents", err);
    }
  };

  const fetchLeadById = async (id) => {
    try {
      const res = await axios.get(`https://anvaya-crm-lyart.vercel.app/leads/${id}`);
      const lead = res.data;

      setFormData({
        name: lead.name || "",
        source: lead.source || "",
        status: lead.status || "",
        salesAgent: lead.salesAgent?._id || "",
        tags: lead.tags || [],
        timeToClose: lead.timeToClose || "",
        priority: lead.priority || "",
      });
    } catch (err) {
      console.error("Error fetching lead", err);
    }
  };

  const inputHandler = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "tags") {
      let updatedTags = [...formData.tags];
      if (checked) {
        updatedTags.push(value);
      } else {
        updatedTags = updatedTags.filter((tag) => tag !== value);
      }
      setFormData((prev) => ({ ...prev, tags: updatedTags }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (editing && id) {
      await editLead(id, formData);
    } else {
      await addLead(formData);
    }

    navigate("/leads");
  };

  return {
    formData,
    inputHandler,
    submitHandler,
    agents,
    tags,
  };
};

export default useLeadForm;
