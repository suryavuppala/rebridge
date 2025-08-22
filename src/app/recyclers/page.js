"use client"


// pages/dashboard.js
import { useState } from 'react';
import Head from 'next/head';
import { FaBox, FaHistory, FaCreditCard, FaMapMarkerAlt, FaHome } from 'react-icons/fa';

export default function RecyclerDashboard() {
  const [activeTab, setActiveTab] = useState('incomingOffers');
  
  // Sample data for demonstration
  const incomingOffers = [
    { id: 1, type: 'Paper', quantity: '250 kg', location: 'North District', pickupDate: '2025-04-15', askingPrice: '$125' },
    { id: 2, type: 'Plastic', quantity: '180 kg', location: 'East District', pickupDate: '2025-04-16', askingPrice: '$90' },
    { id: 3, type: 'Glass', quantity: '120 kg', location: 'South District', pickupDate: '2025-04-17', askingPrice: '$60' },
    { id: 4, type: 'Metal', quantity: '300 kg', location: 'West District', pickupDate: '2025-04-18', askingPrice: '$210' },
  ];

  const purchaseHistory = [
    { id: 1, date: '2025-04-01', type: 'Paper', weight: '300 kg', pricePaid: '$150', deliveryPartner: 'John', status: 'Delivered' },
    { id: 2, date: '2025-04-03', type: 'Plastic', weight: '200 kg', pricePaid: '$100', deliveryPartner: 'Sam', status: 'Delivered' },
    { id: 3, date: '2025-04-05', type: 'Metal', weight: '150 kg', pricePaid: '$105', deliveryPartner: 'Amy', status: 'In Transit' },
    { id: 4, date: '2025-04-07', type: 'Glass', weight: '100 kg', pricePaid: '$50', deliveryPartner: 'David', status: 'Cancelled' },
  ];

  const deliveryTracking = [
    { id: 1, type: 'Paper', quantity: '180 kg', location: 'North District', estimatedArrival: '2025-04-09 15:30', status: 'In Transit', deliveryPartner: 'Jack' },
    { id: 2, type: 'Plastic', quantity: '120 kg', location: 'East District', estimatedArrival: '2025-04-09 16:45', status: 'Confirmed', deliveryPartner: 'Lisa' },
  ];

  const transactions = [
    { id: 1, date: '2025-04-01', description: 'Paper waste purchase', amount: '$150' },
    { id: 2, date: '2025-04-03', description: 'Plastic waste purchase', amount: '$100' },
    { id: 3, date: '2025-04-05', description: 'Metal waste purchase', amount: '$105' },
  ];

  // Helper function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'text-green-600';
      case 'In Transit':
        return 'text-blue-600';
      case 'Cancelled':
        return 'text-red-600';
      case 'Confirmed':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Recycler Dashboard</title>
        <meta name="description" content="Waste Recycling Platform Dashboard" />
      </Head>

      {/* Header */}
      <header className="bg-green-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <FaHome className="mr-2" /> Recycler Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <div className="bg-green-700 rounded-full p-2">
              <span className="font-semibold">RC</span>
            </div>
            <span>Recycler Company</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Tabs */}
        <div className="flex mb-6 bg-white rounded-lg shadow overflow-hidden">
          <button
            onClick={() => setActiveTab('incomingOffers')}
            className={`flex items-center px-4 py-3 ${
              activeTab === 'incomingOffers' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FaBox className="mr-2" /> Incoming Waste Offers
          </button>
          <button
            onClick={() => setActiveTab('purchaseHistory')}
            className={`flex items-center px-4 py-3 ${
              activeTab === 'purchaseHistory' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FaHistory className="mr-2" /> Purchase History
          </button>
          <button
            onClick={() => setActiveTab('paymentBilling')}
            className={`flex items-center px-4 py-3 ${
              activeTab === 'paymentBilling' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FaCreditCard className="mr-2" /> Payment & Billing
          </button>
          <button
            onClick={() => setActiveTab('deliveryTracking')}
            className={`flex items-center px-4 py-3 ${
              activeTab === 'deliveryTracking' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FaMapMarkerAlt className="mr-2" /> Delivery Tracking
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {/* Incoming Waste Offers */}
          {activeTab === 'incomingOffers' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Incoming Waste Offers</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Type</th>
                      <th className="py-3 px-6 text-left">Quantity</th>
                      <th className="py-3 px-6 text-left">Location</th>
                      <th className="py-3 px-6 text-left">Pickup Date</th>
                      <th className="py-3 px-6 text-left">Asking Price</th>
                      <th className="py-3 px-6 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm">
                    {incomingOffers.map((offer) => (
                      <tr key={offer.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 text-left">{offer.type}</td>
                        <td className="py-3 px-6 text-left">{offer.quantity}</td>
                        <td className="py-3 px-6 text-left">{offer.location}</td>
                        <td className="py-3 px-6 text-left">{offer.pickupDate}</td>
                        <td className="py-3 px-6 text-left">{offer.askingPrice}</td>
                        <td className="py-3 px-6 text-left">
                          <div className="flex space-x-2">
                            <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                              Accept
                            </button>
                            <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                              Negotiate
                            </button>
                            <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Purchase History */}
          {activeTab === 'purchaseHistory' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Purchase History</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Date</th>
                      <th className="py-3 px-6 text-left">Waste Type</th>
                      <th className="py-3 px-6 text-left">Weight</th>
                      <th className="py-3 px-6 text-left">Price Paid</th>
                      <th className="py-3 px-6 text-left">Delivery Partner</th>
                      <th className="py-3 px-6 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm">
                    {purchaseHistory.map((purchase) => (
                      <tr key={purchase.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 text-left">{purchase.date}</td>
                        <td className="py-3 px-6 text-left">{purchase.type}</td>
                        <td className="py-3 px-6 text-left">{purchase.weight}</td>
                        <td className="py-3 px-6 text-left">{purchase.pricePaid}</td>
                        <td className="py-3 px-6 text-left">{purchase.deliveryPartner}</td>
                        <td className={`py-3 px-6 text-left ${getStatusColor(purchase.status)}`}>
                          {purchase.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Payment & Billing */}
          {activeTab === 'paymentBilling' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Payment & Billing</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Total Spent This Month</h3>
                  <p className="text-3xl font-bold text-green-600">$405.00</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Account Balance</h3>
                  <p className="text-3xl font-bold text-green-600">$1,250.00</p>
                  <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    Add Funds
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Transaction History</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Date</th>
                        <th className="py-3 px-6 text-left">Description</th>
                        <th className="py-3 px-6 text-left">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="py-3 px-6 text-left">{transaction.date}</td>
                          <td className="py-3 px-6 text-left">{transaction.description}</td>
                          <td className="py-3 px-6 text-left">{transaction.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Delivery Tracking */}
          {activeTab === 'deliveryTracking' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Delivery Tracking</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {deliveryTracking.map((delivery) => (
                  <div key={delivery.id} className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium">{delivery.type} Waste</h3>
                      <span className={`font-medium ${getStatusColor(delivery.status)}`}>
                        {delivery.status}
                      </span>
                    </div>
                    <div className="mt-4 space-y-2">
                      <p><span className="font-medium">Quantity:</span> {delivery.quantity}</p>
                      <p><span className="font-medium">Pickup Location:</span> {delivery.location}</p>
                      <p><span className="font-medium">Est. Arrival:</span> {delivery.estimatedArrival}</p>
                      <p><span className="font-medium">Delivery Partner:</span> {delivery.deliveryPartner}</p>
                    </div>
                    <div className="mt-4">
                      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Confirm Receipt
                      </button>
                      <button className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
                        Track Location
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-4 mt-6">
        <p className="text-gray-600">© 2025 Sustainable Waste Recycling Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}