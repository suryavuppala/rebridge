"use client"

import { useState, useEffect } from 'react';

export default function ImpactDashboard() {
  // Sample data - in a real app this would come from your backend
  const [stats, setStats] = useState({
    totalWaste: 8754,
    plastic: 3245,
    paper: 2879,
    wood: 1230,
    eWaste: 950,
    carbonReduction: 4500,
    pickups: 1243
  });
  
  const [treesSaved, setTreesSaved] = useState(0);
  const [waterPreserved, setWaterPreserved] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const monthlyData = [
    { name: 'Jan', waste: 720, plastic: 250, paper: 230, wood: 100, eWaste: 70, carbon: 320 },
    { name: 'Feb', waste: 680, plastic: 240, paper: 210, wood: 90, eWaste: 80, carbon: 310 },
    { name: 'Mar', waste: 750, plastic: 260, paper: 240, wood: 120, eWaste: 90, carbon: 340 },
    { name: 'Apr', waste: 800, plastic: 290, paper: 250, wood: 110, eWaste: 80, carbon: 360 },
    { name: 'May', waste: 760, plastic: 275, paper: 245, wood: 100, eWaste: 85, carbon: 350 },
    { name: 'Jun', waste: 810, plastic: 300, paper: 260, wood: 105, eWaste: 95, carbon: 380 },
    { name: 'Jul', waste: 850, plastic: 310, paper: 270, wood: 115, eWaste: 100, carbon: 400 },
    { name: 'Aug', waste: 890, plastic: 325, paper: 290, wood: 130, eWaste: 90, carbon: 420 },
    { name: 'Sep', waste: 920, plastic: 340, paper: 300, wood: 140, eWaste: 95, carbon: 450 },
    { name: 'Oct', waste: 950, plastic: 360, paper: 320, wood: 125, eWaste: 100, carbon: 470 },
  ];

  // Simulate live updating stats
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => ({
        totalWaste: prevStats.totalWaste + Math.floor(Math.random() * 5),
        plastic: prevStats.plastic + Math.floor(Math.random() * 2),
        paper: prevStats.paper + Math.floor(Math.random() * 2),
        wood: prevStats.wood + Math.floor(Math.random() * 1),
        eWaste: prevStats.eWaste + Math.floor(Math.random() * 1),
        carbonReduction: prevStats.carbonReduction + Math.floor(Math.random() * 3),
        pickups: prevStats.pickups + (Math.random() > 0.7 ? 1 : 0)
      }));
    }, 5000); // Update every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Calculate derived environmental impacts
  useEffect(() => {
    // Approximations: 17 trees saved per ton of paper, 25,000 liters of water saved per ton of paper
    setTreesSaved(Math.floor(stats.paper / 1000 * 17));
    setWaterPreserved(Math.floor(stats.paper / 1000 * 25000));
  }, [stats.paper]);

  // Animation for initial load
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, []);

  // Format large numbers
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num;
  };

  // Custom simple chart components
  const SimpleLineChart = ({ data, dataKey, color, maxValue }) => {
    const height = 50;
    const width = 100;
    
    // Find the max value for scaling
    const max = maxValue || Math.max(...data.map(d => d[dataKey]));
    
    // Generate points for the path
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - (item[dataKey] / max) * height;
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <div className="relative h-12 w-24 mt-1">
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
          <polyline
            points={points}
            fill="none"
            stroke={color}
            strokeWidth="2"
          />
        </svg>
      </div>
    );
  };

  const SimpleProgressBar = ({ value, max, color }) => {
    const percentage = (value / max) * 100;
    
    return (
      <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-700 ease-in-out"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center transform transition-all duration-500 translate-y-0 opacity-100">
          <h1 className="text-3xl font-bold text-green-600 mb-2">Recycling Impact Dashboard</h1>
          <p className="text-gray-600">Track the positive environmental impact of our recycling efforts</p>
        </div>
        
        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Waste Card */}
          <div className={`bg-white p-4 rounded-lg shadow-md transition-all duration-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '100ms' }}>
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <span className="text-green-600 text-lg">♻️</span>
              </div>
              <h3 className="text-gray-700">Total Waste Managed</h3>
            </div>
            <div className="flex justify-between items-end">
              <div className="text-2xl font-bold text-gray-800">{formatNumber(stats.totalWaste)} kg</div>
              <div className="text-sm text-green-600">
                <SimpleLineChart 
                  data={monthlyData.slice(-6)} 
                  dataKey="waste" 
                  color="#10B981" 
                />
              </div>
            </div>
          </div>
          
          {/* Plastic Recycled Card */}
          <div className={`bg-white p-4 rounded-lg shadow-md transition-all duration-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <span className="text-blue-600 text-lg">🧴</span>
              </div>
              <h3 className="text-gray-700">Plastic Recycled</h3>
            </div>
            <div className="flex justify-between items-end">
              <div className="text-2xl font-bold text-gray-800">{formatNumber(stats.plastic)} kg</div>
              <div className="text-sm text-green-600">
                <SimpleLineChart 
                  data={monthlyData.slice(-6)} 
                  dataKey="plastic" 
                  color="#3B82F6" 
                />
              </div>
            </div>
            <div className="mt-2">
              <SimpleProgressBar 
                value={stats.plastic} 
                max={stats.totalWaste} 
                color="#3B82F6" 
              />
            </div>
          </div>
          
          {/* Paper Saved Card */}
          <div className={`bg-white p-4 rounded-lg shadow-md transition-all duration-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                <span className="text-yellow-600 text-lg">📄</span>
              </div>
              <h3 className="text-gray-700">Paper Saved</h3>
            </div>
            <div className="flex justify-between items-end">
              <div className="text-2xl font-bold text-gray-800">{formatNumber(stats.paper)} kg</div>
              <div className="text-sm text-green-600">
                <SimpleLineChart 
                  data={monthlyData.slice(-6)} 
                  dataKey="paper" 
                  color="#F59E0B" 
                />
              </div>
            </div>
            <div className="mt-2">
              <SimpleProgressBar 
                value={stats.paper} 
                max={stats.totalWaste} 
                color="#F59E0B" 
              />
            </div>
          </div>
          
          {/* Wood/Furniture Card */}
          <div className={`bg-white p-4 rounded-lg shadow-md transition-all duration-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                <span className="text-amber-600 text-lg">🪵</span>
              </div>
              <h3 className="text-gray-700">Wood Repurposed</h3>
            </div>
            <div className="flex justify-between items-end">
              <div className="text-2xl font-bold text-gray-800">{formatNumber(stats.wood)} kg</div>
              <div className="text-sm text-green-600">
                <SimpleLineChart 
                  data={monthlyData.slice(-6)} 
                  dataKey="wood" 
                  color="#D97706" 
                />
              </div>
            </div>
            <div className="mt-2">
              <SimpleProgressBar 
                value={stats.wood} 
                max={stats.totalWaste} 
                color="#D97706" 
              />
            </div>
          </div>
        </div>
        
        {/* Second Row Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* E-Waste Card */}
          <div className={`bg-white p-4 rounded-lg shadow-md transition-all duration-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '500ms' }}>
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <span className="text-purple-600 text-lg">💡</span>
              </div>
              <h3 className="text-gray-700">E-Waste Diverted</h3>
            </div>
            <div className="flex justify-between items-end">
              <div className="text-2xl font-bold text-gray-800">{formatNumber(stats.eWaste)} kg</div>
              <div className="text-sm text-green-600">
                <SimpleLineChart 
                  data={monthlyData.slice(-6)} 
                  dataKey="eWaste" 
                  color="#8B5CF6" 
                />
              </div>
            </div>
            <div className="mt-2">
              <SimpleProgressBar 
                value={stats.eWaste} 
                max={stats.totalWaste} 
                color="#8B5CF6" 
              />
            </div>
          </div>
          
          {/* Carbon Footprint Card */}
          <div className={`bg-white p-4 rounded-lg shadow-md transition-all duration-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <span className="text-green-600 text-lg">🌱</span>
              </div>
              <h3 className="text-gray-700">Carbon Footprint Reduced</h3>
            </div>
            <div className="flex justify-between items-end">
              <div className="text-2xl font-bold text-gray-800">{formatNumber(stats.carbonReduction)} kg CO₂</div>
              <div className="text-sm text-green-600">
                <SimpleLineChart 
                  data={monthlyData.slice(-6)} 
                  dataKey="carbon" 
                  color="#10B981" 
                />
              </div>
            </div>
          </div>
          
          {/* Pickups Card */}
          <div className={`bg-white p-4 rounded-lg shadow-md transition-all duration-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '700ms' }}>
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <span className="text-blue-600 text-lg">🚚</span>
              </div>
              <h3 className="text-gray-700">Number of Pickups</h3>
            </div>
            <div className="flex justify-between items-end">
              <div className="text-2xl font-bold text-gray-800">{formatNumber(stats.pickups)}</div>
              <div className="text-sm text-green-600">+5.3% this month</div>
            </div>
            <div className="mt-2">
              <div className="relative pt-1">
                <div className="mt-2 flex justify-between">
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    Monthly Goal: 80%
                  </span>
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    {Math.round((stats.pickups % 200) / 2)}%
                  </span>
                </div>
                <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                  <div style={{ width: `${(stats.pickups % 200) / 2}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Trends Chart - FIXED HEIGHT CALCULATION */}
          
          
          {/* Material Breakdown Chart */}
          <div className={`bg-white p-4 rounded-lg shadow-md transition-all duration-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '900ms' }}>
            <h3 className="text-xl font-semibold text-green-700 mb-4">Materials Recycled (Current Month)</h3>
            <div className="h-64 flex items-center justify-center">
              {/* Simple Donut Chart */}
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Calculate segments for pie chart */}
                  {(() => {
                    const latestData = monthlyData[monthlyData.length - 1];
                    const total = latestData.plastic + latestData.paper + latestData.wood + latestData.eWaste;
                    
                    let startAngle = 0;
                    const segments = [
                      { value: latestData.plastic, color: '#3B82F6', label: 'Plastic' },
                      { value: latestData.paper, color: '#F59E0B', label: 'Paper' },
                      { value: latestData.wood, color: '#D97706', label: 'Wood' },
                      { value: latestData.eWaste, color: '#8B5CF6', label: 'E-Waste' }
                    ].map(segment => {
                      const angle = (segment.value / total) * 360;
                      const x1 = 50 + 35 * Math.cos(Math.PI * startAngle / 180);
                      const y1 = 50 + 35 * Math.sin(Math.PI * startAngle / 180);
                      
                      startAngle += angle;
                      
                      const x2 = 50 + 35 * Math.cos(Math.PI * startAngle / 180);
                      const y2 = 50 + 35 * Math.sin(Math.PI * startAngle / 180);
                      
                      const largeArcFlag = angle > 180 ? 1 : 0;
                      
                      return (
                        <path 
                          key={segment.label}
                          d={`M 50 50 L ${x1} ${y1} A 35 35 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                          fill={segment.color}
                          className="transition-all duration-1000 ease-in-out"
                        />
                      );
                    });
                    
                    return <>
                      {segments}
                      <circle cx="50" cy="50" r="25" fill="white" />
                    </>;
                  })()}
                </svg>
              </div>
              
              {/* Legend - FIXED TEXT COLOR */}
              <div className="ml-6 space-y-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 mr-2"></div>
                  <span className="text-gray-800">Plastic</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 mr-2"></div>
                  <span className="text-gray-800">Paper</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-amber-700 mr-2"></div>
                  <span className="text-gray-800">Wood</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 mr-2"></div>
                  <span className="text-gray-800">E-Waste</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Environmental Impact Infographics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Trees Saved */}
          <div className={`bg-white p-6 rounded-lg shadow-md text-center transition-all duration-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '1000ms' }}>
            <div className="text-5xl mb-3 text-green-600">🌳</div>
            <div className="text-3xl font-bold text-gray-800 mb-2">{formatNumber(treesSaved)}</div>
            <div className="text-gray-600">Trees Saved</div>
            <div className="mt-4 flex justify-center">
              {/* Tree icons representation */}
              <div className="flex flex-wrap justify-center max-w-xs">
                {Array.from({ length: Math.min(15, Math.ceil(treesSaved / 10)) }).map((_, i) => (
                  <div key={i} className="m-1 text-xl">🌳</div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Water Preserved */}
          <div className={`bg-white p-6 rounded-lg shadow-md text-center transition-all duration-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '1100ms' }}>
            <div className="text-5xl mb-3 text-blue-600">💧</div>
            <div className="text-3xl font-bold text-gray-800 mb-2">{formatNumber(waterPreserved)} L</div>
            <div className="text-gray-600">Water Preserved</div>
            <div className="mt-4">
              {/* Water level visualization */}
              <div className="w-full h-16 border-2 border-blue-300 rounded-lg relative overflow-hidden">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-blue-400 transition-all duration-1000 ease-in-out"
                  style={{ height: `${Math.min(100, (waterPreserved / 50000) * 100)}%` }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-shadow">
                  {Math.round((waterPreserved / 50000) * 100)}%
                </div>
              </div>
            </div>
          </div>
          
          {/* Landfill Space Saved */}
          <div className={`bg-white p-6 rounded-lg shadow-md text-center transition-all duration-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '1200ms' }}>
            <div className="text-5xl mb-3 text-amber-600">🏞️</div>
            <div className="text-3xl font-bold text-gray-800 mb-2">{formatNumber(stats.totalWaste * 0.15)} m³</div>
            <div className="text-gray-600">Landfill Space Saved</div>
            <div className="mt-4">
              {/* Progress bar showing equivalent to football fields */}
              <div className="text-sm text-gray-500 mb-1">
                Equivalent to {((stats.totalWaste * 0.15) / 100).toFixed(2)} swimming pools
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-amber-600 h-2.5 rounded-full transition-all duration-700 ease-in-out" 
                  style={{ width: `${Math.min(100, ((stats.totalWaste * 0.15) / 2000) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}