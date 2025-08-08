import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLeads from "../context/LeadContext";

export default function useLeadForm(isEdit = false, editingLead = null, leadId = null) {
  const navigate = useNavigate();
  const { addLead, editLead } = useLeads();

  const [formData, setFormData] = useState({
    name: editingLead?.name || "",
    source: editingLead?.source || "",
    salesAgent: editingLead?.salesAgent || "",
    status: editingLead?.status || "",
    tags: editingLead?.tags || [],
    timeToClose: editingLead?.timeToClose || "",
    priority: editingLead?.priority || "",
  });

  const [agents, setAgents] = useState([]);
  const [tags, setTags] = useState([]);

  // Fetch sales agents and tags when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const agentRes = await fetch("https://anvaya-crm-lyart.vercel.app/agents");
        const tagRes = await fetch("https://anvaya-crm-lyart.vercel.app/tags");

        const agentsData = await agentRes.json();
        const tagsData = await tagRes.json();

        setAgents(agentsData);
        setTags(tagsData);
      } catch (err) {
        console.error("Error loading agents or tags", err);
      }
    };
    fetchData();
  }, []);

  const inputHandler = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "tags" && type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        tags: checked
          ? [...prev.tags, value]
          : prev.tags.filter((t) => t !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (formData.tags.length === 0) {
      alert("Please select at least one tag.");
      return;
    }

    try {
      if (isEdit && leadId) {
        await editLead(leadId, formData);
        navigate(`/leads/${leadId}`);
      } else {
        await addLead(formData);
        navigate("/leads");
      }
    } catch (error) {
      alert("An error occurred while saving the lead.");
      console.error(error);
    }
  };

  return {
    formData,
    inputHandler,
    submitHandler,
    agents,
    tags,
  };
}
