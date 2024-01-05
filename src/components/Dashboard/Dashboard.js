import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './Dashboard.css';
import { PieChart, Pie, Legend, Tooltip, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const Dashboard = () => {
  const [missionData, setMissionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.ag-grid.com/example-assets/space-mission-data.json');
        const data = await response.json();
        setMissionData(data);
      } catch (error) {
        console.error('Error Occured:', error);
      }
    };

    fetchData();
  }, []);

  const columnDefs = missionData.length > 0 ? Object.keys(missionData[0]).map(key => ({ headerName: key, field: key })) : [];
  const successCount = missionData.filter(mission => mission.successful).length;
  const failureCount = missionData.length - successCount;
  const pieChartData = [
    { name: 'Success', value: successCount },
    { name: 'Failure', value: failureCount },
  ];

  return (
    <div className="table-area">
      <br /><br />
      <div className="ag-theme-alpine" style={{ height: 300, width: '100%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={missionData}
        />
      </div>
      <br />
      <div className="container">
        <div className='box'>
          <p className='success'>Success Rate</p>
          <div className="chart-area">
            <PieChart width={400} height={400}>
              <Pie
                dataKey="value"
                data={pieChartData}
                cx={200}
                cy={200}
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#298bef' : '#e63f5b'} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>


        <div className='box'>
          <p className='price'>Mission Price</p>
          <BarChart
            width={600}
            height={400}
            data={missionData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mission" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="price" fill="#298bef" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
