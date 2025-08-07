const Lead = require("../models/lead.models")
const moment = require("moment");

exports.getClosedLeadsByAgent = async (req, res) => {
  try {
    const leads = await Lead.find({ status: "Closed" }).populate("salesAgent", "name");

    const counts = {};

    leads.forEach((lead) => {
      const agentName = lead.salesAgent?.name || "Unknown";
      counts[agentName] = (counts[agentName] || 0) + 1;
    });

    const result = Object.entries(counts).map(([agentName, closedLeads]) => ({
      agentName,
      closedLeads,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getLeadStatusCount = async (req, res) => {
  try {
    const leads = await Lead.find();

    const statusCounts = {};

    leads.forEach((lead) => {
      const status = lead.status || "Unknown";
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    const result = Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getPipelineSummary = async (req, res) => {
  try {
    const oneWeekAgo = moment().subtract(7, 'days').toDate();

    const closedLastWeek = await Lead.countDocuments({
      status: "Closed",
      updatedAt: { $gte: oneWeekAgo },
    });

    const pipelineStatuses = ["New", "Contacted", "Qualified", "Proposal Sent"];
    const inPipeline = await Lead.countDocuments({
      status: { $in: pipelineStatuses },
    });

    res.json({
      closedLastWeek,
      inPipeline,
    });
  } catch (error) {
    console.error("Error in getPipelineSummary:", error);
    res.status(500).json({ message: "Server error", error: err.message});
  }
};
