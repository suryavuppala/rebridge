"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, Truck, CheckCircle, XCircle, Calendar, UploadCloud, DollarSign, Clock, ChevronRight, Menu, X } from 'lucide-react';
import GoogleMapWithCurrentLocation from '../components/GoogleMapWithCurrentLocation';

export default function PartnerDashboard() {
  const [activeTab, setActiveTab] = useState('pickups');
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Sample data
  const pickups = [
    { id: 1, address: 'Kukatpally', wasteType: 'Paper', timeSlot: '9:00 AM - 11:00 AM', weight: '5.2kg', status: 'pending' },
    { id: 2, address: 'Nizampet', wasteType: 'Plastic', timeSlot: '11:30 AM - 1:30 PM', weight: '3.7kg', status: 'pending' },
    { id: 3, address: 'Pragathi Nagar', wasteType: 'Metal', timeSlot: '2:00 PM - 4:00 PM', weight: '7.1kg', status: 'pending' },
    { id: 4, address: 'SR Nagar', wasteType: 'Metal', timeSlot: '4:00 PM - 6:00 PM', weight: '7.1kg', status: 'pending' },
    { id: 5, address: 'GandiMaisammah', wasteType: 'Metal', timeSlot: '6:00 PM - 8:00 PM', weight: '7.1kg', status: 'pending' },
    { id: 6, address: 'Bachupally', wasteType: 'Metal', timeSlot: '8:00 PM - 9:00 PM', weight: '7.1kg', status: 'pending' },
    { id: 7, address: 'Miyapur', wasteType: 'Metal', timeSlot: '9:00 PM - 10:00 PM', weight: '7.1kg', status: 'pending' },
    { id: 8, address: 'Gajularamaram', wasteType: 'Metal', timeSlot: '10:00 PM - 11:00 PM', weight: '7.1kg', status: 'pending' },
  ];
  
  const earnings = {
    today: 42.50,
    week: 287.75,
    month: 1245.00,
    nextPayment: '15 April 2025'
  };
  
  const schedule = {
    available: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    timeSlots: ['9:00 AM - 1:00 PM', '2:00 PM - 6:00 PM']
  };
  
  const [pickupStatuses, setPickupStatuses] = useState({});
  
  const updatePickupStatus = (id, status) => {
    setPickupStatuses(prev => ({
      ...prev,
      [id]: status
    }));
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  const tabVariants = {
    inactive: { color: "#666", borderColor: "transparent" },
    active: { color: "#22c55e", borderColor: "#22c55e" }
  };
  
  const renderTabContent = () => {
    switch(activeTab) {
      case 'pickups':
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Daily Pickup List</h2>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {setActiveTab('map')}}
                className="bg-green-500 text-white p-2 rounded-lg flex items-center gap-2"
              >
                <Map size={18} /> View Route Map
              </motion.button>
            </div>
            
            {pickups.map(pickup => (
              <motion.div 
                key={pickup.id}
                variants={itemVariants}
                className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{pickup.address}</h3>
                    <div className="flex gap-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div> {pickup.wasteType}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> {pickup.timeSlot}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign size={14} /> {pickup.weight}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {pickupStatuses[pickup.id] ? (
                      <span className={`px-2 py-1 rounded text-xs ${
                        pickupStatuses[pickup.id] === 'picked' ? 'bg-green-100 text-green-800' : 
                        pickupStatuses[pickup.id] === 'missed' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {pickupStatuses[pickup.id].charAt(0).toUpperCase() + pickupStatuses[pickup.id].slice(1)}
                      </span>
                    ) : (
                      <>
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updatePickupStatus(pickup.id, 'picked')}
                          className="p-1 bg-green-100 text-green-600 rounded"
                        >
                          <CheckCircle size={18} />
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updatePickupStatus(pickup.id, 'missed')}
                          className="p-1 bg-red-100 text-red-600 rounded"
                        >
                          <XCircle size={18} />
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updatePickupStatus(pickup.id, 'rescheduled')}
                          className="p-1 bg-yellow-100 text-yellow-600 rounded"
                        >
                          <Calendar size={18} />
                        </motion.button>
                      </>
                    )}
                  </div>
                </div>
                
                {pickupStatuses[pickup.id] && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-3 pt-3 border-t border-gray-100"
                  >
                    <div className="flex items-center gap-2">
                      <button className="text-green-600 flex items-center gap-1 text-sm">
                        <UploadCloud size={14} /> Upload Photo Proof
                      </button>
                      <div className="h-4 w-px bg-gray-200"></div>
                      <button className="text-green-600 flex items-center gap-1 text-sm">
                        Add Notes
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        );
      
      case 'earnings':
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold">Earnings Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div variants={itemVariants} className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-500 text-sm">Today</p>
                <p className="text-2xl font-bold text-green-600">${earnings.today}</p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-500 text-sm">This Week</p>
                <p className="text-2xl font-bold text-green-600">${earnings.week}</p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-500 text-sm">This Month</p>
                <p className="text-2xl font-bold text-green-600">${earnings.month}</p>
              </motion.div>
            </div>
            
            <motion.div variants={itemVariants} className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium">Payment Schedule</h3>
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-600">Next payment</p>
                <p className="font-semibold">{earnings.nextPayment}</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium">Bonus Opportunities</h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Complete 10 pickups</p>
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 w-24 h-2 rounded-full">
                      <div className="bg-green-500 w-16 h-2 rounded-full"></div>
                    </div>
                    <p className="text-sm font-medium">6/10</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Collect 100kg waste</p>
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 w-24 h-2 rounded-full">
                      <div className="bg-green-500 w-12 h-2 rounded-full"></div>
                    </div>
                    <p className="text-sm font-medium">45/100kg</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      
      case 'schedule':
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible" 
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold">Schedule & Availability</h2>
            
            <motion.div variants={itemVariants} className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium">Working Days</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <div 
                    key={day}
                    className={`px-3 py-1 rounded-full text-sm ${
                      schedule.available.includes(day) 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium">Working Hours</h3>
              <div className="mt-2 space-y-2">
                {schedule.timeSlots.map((slot, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Clock size={16} className="text-green-500" />
                    <span>{slot}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex gap-4">
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 bg-green-500 text-white p-3 rounded-lg font-medium"
              >
                Edit Schedule
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 bg-white border border-gray-300 p-3 rounded-lg font-medium"
              >
                Take Break
              </motion.button>
            </motion.div>
          </motion.div>
        );
      
        case 'map':
            return (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <h2 className="text-xl font-semibold">Route Optimization</h2>
                
                {/* This is the fixed part - removing unnecessary wrapper div */}
                <GoogleMapWithCurrentLocation />
                
                <motion.div variants={itemVariants} className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-medium">Scheduled Pickups</h3>
                  <div className="mt-2 space-y-2">
                    {pickups.map(pickup => (
                      <div key={pickup.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="font-medium">{pickup.address}</p>
                          <p className="text-sm text-gray-500">{pickup.timeSlot}</p>
                        </div>
                        <ChevronRight size={16} className="text-gray-400" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="font-bold text-xl text-green-600">Partner Dashboard</h1>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>
      
      {/* Sidebar for mobile */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: menuOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg md:hidden pt-16"
      >
        <div className="p-4">
          <div className="space-y-2">
            {[
              { id: 'pickups', label: 'Daily Pickups', icon: <Truck size={20} /> },
              { id: 'earnings', label: 'Earnings', icon: <DollarSign size={20} /> },
              { id: 'schedule', label: 'Schedule', icon: <Calendar size={20} /> },
              { id: 'map', label: 'Route Map', icon: <Map size={20} /> },
            ].map(tab => (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-lg ${
                  activeTab === tab.id ? 'bg-green-50 text-green-600' : 'hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
      
      <div className="flex">
        {/* Sidebar for desktop */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "16rem", opacity: 1 }}
          className="hidden md:block w-64 bg-white shadow-sm h-screen fixed"
        >
          <div className="p-6">
            <h1 className="font-bold text-xl text-green-600 mb-8">Partner Dashboard</h1>
            
            <div className="space-y-2">
              {[
                { id: 'pickups', label: 'Daily Pickups', icon: <Truck size={20} /> },
                { id: 'earnings', label: 'Earnings', icon: <DollarSign size={20} /> },
                { id: 'schedule', label: 'Schedule', icon: <Calendar size={20} /> },
                { id: 'map', label: 'Route Map', icon: <Map size={20} /> },
              ].map(tab => (
                <motion.button
                  key={tab.id}
                  variants={tabVariants}
                  initial="inactive"
                  animate={activeTab === tab.id ? "active" : "inactive"}
                  whileHover={{ backgroundColor: "#f9fafb" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left border-l-2 ${
                    activeTab === tab.id ? 'border-green-500 bg-green-50' : 'border-transparent'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Main content */}
        <div className="flex-1 md:ml-64 p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}