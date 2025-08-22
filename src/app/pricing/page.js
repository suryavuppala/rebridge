"use client"


import { useState, useEffect } from 'react';

export default function BulkOrderCalculator() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalNormal, setTotalNormal] = useState(0);
  const [totalBulk, setTotalBulk] = useState(0);
  const [savings, setSavings] = useState(0);
  const [showItems, setShowItems] = useState(false);
  
  const items = [
    { name: "File", normal: 15, bulk: 12 },
    { name: "Pen", normal: 5, bulk: 4 },
    { name: "Pencil", normal: 4, bulk: 3 },
    { name: "Sharpener", normal: 6, bulk: 5 },
    { name: "Eraser", normal: 5, bulk: 4 },
    { name: "Long Book", normal: 50, bulk: 45 },
    { name: "Small Book", normal: 25, bulk: 20 },
    { name: "A4 Sheet (bundle)", normal: 100, bulk: 90 },
    { name: "Pen Stand", normal: 40, bulk: 35 },
    { name: "Geometry Box", normal: 60, bulk: 55 },
    { name: "Graph Book", normal: 40, bulk: 35 },
    { name: "Practical Record Book", normal: 50, bulk: 45 },
    { name: "Attendance Register", normal: 90, bulk: 80 },
    { name: "Stock Register", normal: 150, bulk: 135 },
    { name: "Mark Register", normal: 100, bulk: 90 },
    { name: "Staff Meeting Register", normal: 120, bulk: 105 },
    { name: "Lesson Plan Book", normal: 110, bulk: 100 },
    { name: "Teachers' Diary", normal: 130, bulk: 115 },
    { name: "School Bell", normal: 200, bulk: 180 },
    { name: "White Board Marker (Set of 4)", normal: 40, bulk: 35 },
    { name: "Duster", normal: 20, bulk: 15 },
    { name: "Chalk Box", normal: 30, bulk: 25 },
    { name: "Dust Bin", normal: 70, bulk: 60 },
    { name: "Bucket", normal: 100, bulk: 90 },
    { name: "Mop", normal: 90, bulk: 80 },
    { name: "Phenyl", normal: 60, bulk: 55 },
    { name: "Harpic", normal: 45, bulk: 40 },
    { name: "Toilet Brush", normal: 40, bulk: 35 },
    { name: "Broom Stick", normal: 40, bulk: 35 },
    { name: "Cobweb Brush", normal: 80, bulk: 70 },
    { name: "Floor Wiper", normal: 85, bulk: 75 },
    { name: "Extension Box", normal: 150, bulk: 135 },
    { name: "Torch", normal: 120, bulk: 110 },
    { name: "Emergency Light", normal: 300, bulk: 275 },
    { name: "Ceiling Fan", normal: 1200, bulk: 1100 },
    { name: "Table Fan", normal: 850, bulk: 780 },
    { name: "Wall Clock", normal: 250, bulk: 230 },
    { name: "Computer Mouse", normal: 250, bulk: 220 },
    { name: "Keyboard", normal: 400, bulk: 360 },
    { name: "CPU", normal: 20000, bulk: 18500 },
    { name: "Monitor", normal: 8000, bulk: 7500 },
    { name: "UPS", normal: 3000, bulk: 2800 },
    { name: "Printer", normal: 9000, bulk: 8500 },
    { name: "Printer Cartridge", normal: 2000, bulk: 1800 },
    { name: "Pen Drive", normal: 500, bulk: 450 },
    { name: "Chair", normal: 600, bulk: 550 },
    { name: "Table", normal: 1000, bulk: 950 },
    { name: "Almirah", normal: 7000, bulk: 6500 }
  ];

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addItem = (item) => {
    const existingItem = selectedItems.find(i => i.name === item.name);
    
    if (existingItem) {
      const updated = selectedItems.map(i => 
        i.name === item.name ? {...i, quantity: i.quantity + 1} : i
      );
      setSelectedItems(updated);
    } else {
      setSelectedItems([...selectedItems, {...item, quantity: 1}]);
    }
  };

  const removeItem = (itemName) => {
    setSelectedItems(selectedItems.filter(item => item.name !== itemName));
  };

  const updateQuantity = (itemName, quantity) => {
    const numericQuantity = Math.max(1, parseInt(quantity) || 1);
    
    setSelectedItems(selectedItems.map(item => 
      item.name === itemName ? {...item, quantity: numericQuantity} : item
    ));
  };

  useEffect(() => {
    const calcTotalNormal = selectedItems.reduce((acc, item) => 
      acc + (item.normal * item.quantity), 0);
    
    const calcTotalBulk = selectedItems.reduce((acc, item) => 
      acc + (item.bulk * item.quantity), 0);
    
    setTotalNormal(calcTotalNormal);
    setTotalBulk(calcTotalBulk);
    setSavings(calcTotalNormal - calcTotalBulk);
  }, [selectedItems]);

  // Animation for showing items
  useEffect(() => {
    setTimeout(() => {
      setShowItems(true);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center transform transition-all duration-500 translate-y-0 opacity-100">
          <h1 className="text-3xl font-bold text-green-600 mb-2">Order Calculator</h1>
          <p className="text-black">Calculate your savings when ordering supplies in bulk</p>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Side - Item Selection */}
          <div className="md:col-span-1 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-green-700 mb-4">Select Items</h2>
            
            {/* Search Box */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search items..."
                className="w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Items List */}
            <div className="h-96 overflow-y-auto pr-2 text-black">
              <ul className="space-y-2">
                {filteredItems.map((item, index) => (
                  <li 
                    key={index}
                    className={`flex justify-between items-center p-2 hover:bg-green-50 rounded-md cursor-pointer transform transition-all duration-300 ${
                      showItems ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 30}ms` }}
                    onClick={() => addItem(item)}
                  >
                    <span>{item.name}</span>
                    <div className="text-sm text-black">
                      <span className="line-through mr-2">₹{item.normal}</span>
                      <span className="text-green-600 font-medium">₹{item.bulk}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Right Side - Selected Items and Totals */}
          <div className="md:col-span-2">
            {/* Selected Items */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
              <h2 className="text-xl font-semibold text-green-700 mb-4">Your Order</h2>
              
              {selectedItems.length === 0 ? (
                <div className="text-center py-6 text-black italic">
                  No items selected yet. Click on items from the list to add them to your order.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-black">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Item</th>
                        <th className="text-center py-2">Quantity</th>
                        <th className="text-right py-2">Normal Price</th>
                        <th className="text-right py-2">Bulk Price</th>
                        <th className="text-right py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedItems.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-2">{item.name}</td>
                          <td className="py-2">
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.name, e.target.value)}
                              className="w-16 p-1 text-center border border-gray-300 rounded-md mx-auto block"
                            />
                          </td>
                          <td className="text-right py-2">₹{item.normal * item.quantity}</td>
                          <td className="text-right py-2 text-green-600">₹{item.bulk * item.quantity}</td>
                          <td className="text-right py-2">
                            <button 
                              onClick={() => removeItem(item.name)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            
            {/* Summary */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-green-700 mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center text-black">
                  <span>Normal Price Total:</span>
                  <span className="font-medium">₹{totalNormal}</span>
                </div>
                <div className="flex justify-between items-center text-black">
                  <span>Bulk Price Total:</span>
                  <span className="font-medium text-green-600">₹{totalBulk}</span>
                </div>
                <div className="flex justify-between items-center border-t pt-2 mt-2 text-black">
                  <span className="font-semibold">Your Savings:</span>
                  <span className="font-bold text-green-600">
                    ₹{savings} ({totalNormal > 0 ? Math.round((savings / totalNormal) * 100) : 0}%)
                  </span>
                </div>
              </div>
              
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium transition-colors transform hover:scale-105 duration-200">
                Place Bulk Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}