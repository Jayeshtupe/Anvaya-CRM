import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import axios from "axios";

const Reports = () => {

  const url = "https://anvaya-crm-lyart.vercel.app"

  const barRef = useRef(null);
  const pieRef = useRef(null);
  const pipelineChartRef = useRef(null);
  const pipelineChart = useRef(null);


  const barChart = useRef(null);
  const pieChart = useRef(null);

  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [inPipeline, setInPipeline] = useState(0);
  const [closedLastWeek, setClosedLastWeek] = useState(0);


  
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [barRes, pieRes, pipelineRes] = await Promise.all([
          axios.get(`${url}/report/closed-leads-by-agent`),
          axios.get(`${url}/report/lead-status-count`),
          axios.get(`${url}/report/pipeline-summary`)
        ]);
        setBarData(barRes.data);
        setPieData(pieRes.data);
        setInPipeline(pipelineRes.data.inPipeline)
        setClosedLastWeek(pipelineRes.data.closedLastWeek)
      } catch (error) {
        console.error("Failed to fetch report data:", error);
      }
    };

    fetchReports();
  }, []);

  useEffect(() => {
    if (barData.length === 0 || pieData.length === 0 ) return;

    barChart.current?.destroy();
    pieChart.current?.destroy();
    
    const agentNames = barData.map((item) => item.agentName);
    const closedLeads = barData.map((item) => item.closedLeads);

    const statusLabels = pieData.map((item) => item.status);
    const statusCounts = pieData.map((item) => item.count);

    barChart.current = new Chart(barRef.current, {
      type: "bar",
      data: {
        labels: agentNames,
        datasets: [
          {
            label: "Leads Closed",
            data: closedLeads,
            barThickness: 100,
            backgroundColor: "#212529",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });

    pieChart.current = new Chart(pieRef.current, {
      type: "pie",
      data: {
        labels: statusLabels,
        datasets: [
          {
            data: statusCounts,
            backgroundColor: ["#0d6efd", "#0dcaf0", "#212529", "#198754", " #ffc107"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" },
        },
      },
    });

    pipelineChart.current?.destroy();

pipelineChart.current = new Chart(pipelineChartRef.current, {
  type: "pie",
  data: {
    labels: ["In Pipeline", "Closed Last Week"],
    datasets: [{
      data: [inPipeline, closedLastWeek],
      backgroundColor: ["#5585ebff", "#212529"],
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
    }
  }
});

    return () => {
      barChart.current?.destroy();
      pieChart.current?.destroy();
    };
  }, [barData, pieData]);

  return (
    <div className="container my-5">
      <div className="mb-5">
        <h5 className="text-primary text-center">Leads Closed by Agents</h5>
        <div className="shadow-sm bg-white rounded p-3" style={{ height: 300}}>
          <canvas ref={barRef} />
        </div>
      </div>

      <div>
        <h5 className="text-primary text-center">Lead Status Distribution</h5>
        <div className="shadow-sm bg-white rounded d-flex justify-content-center align-items-center" style={{ height: 350 }}>
          <canvas ref={pieRef} />
        </div>
      </div>

    <div className="my-5">
  <h5 className="text-primary text-center">Pipeline vs Closed Leads (Last Week)</h5>
  <div className="shadow-sm bg-white rounded d-flex justify-content-center align-items-center" style={{ height: 350 }}>
    <canvas ref={pipelineChartRef} />
  </div>
</div>


    </div>
  );
};

export default Reports;
