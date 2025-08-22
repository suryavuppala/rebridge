"use client"

// pages/contact.tsx
import { useState } from 'react';
import Head from 'next/head';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Users, Info } from 'lucide-react';
import Link from 'next/link';

export default function Contact() {
  // State for contact form
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  // State for partnership form
  const [partnerForm, setPartnerForm] = useState({
    name: '',
    email: '',
    organization: '',
    partnerType: 'recycler', // Default value
    message: ''
  });

  // State for feedback form
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    feedbackType: 'suggestion', // Default value
    details: ''
  });

  // State for active tab
  const [activeTab, setActiveTab] = useState('contact');

  // Handle contact form submission
  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    // Add your form submission logic here
    // Reset form
    setContactForm({ name: '', email: '', message: '' });
    alert('Message sent successfully! We will get back to you soon.');
  };

  // Handle partnership form submission
  const handlePartnerSubmit = (e) => {
    e.preventDefault();
    console.log('Partnership form submitted:', partnerForm);
    // Add your form submission logic here
    // Reset form
    setPartnerForm({
      name: '',
      email: '',
      organization: '',
      partnerType: 'recycler',
      message: ''
    });
    alert('Partnership request submitted! Our team will review and contact you shortly.');
  };

  // Handle feedback form submission
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback form submitted:', feedbackForm);
    // Add your form submission logic here
    // Reset form
    setFeedbackForm({
      name: '',
      email: '',
      feedbackType: 'suggestion',
      details: ''
    });
    alert('Thank you for your feedback! It helps us improve our service.');
  };

  return (
    <>
      <Head>
        <title>Contact Us | EcoRecycle</title>
        <meta name="description" content="Get in touch with our recycling platform" />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="bg-green-600 text-white">
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
            <p className="text-xl max-w-2xl">
              Have questions about our recycling services? Want to partner with us? 
              We're here to help make recycling easier and more rewarding.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Contact Information */}
            <div className="lg:w-1/3">
              <div className="bg-white shadow-md rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-semibold text-green-700 mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Phone className="text-green-600 mr-4 mt-1" size={20} />
                    <div>
                      <h3 className="font-medium text-gray-800">Phone</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="text-green-600 mr-4 mt-1" size={20} />
                    <div>
                      <h3 className="font-medium text-gray-800">Email</h3>
                      <p className="text-gray-600">support@ecorecycle.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="text-green-600 mr-4 mt-1" size={20} />
                    <div>
                      <h3 className="font-medium text-gray-800">Office Address</h3>
                      <p className="text-gray-600">123 Green Street, Eco City,<br />EC 12345</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="text-green-600 mr-4 mt-1" size={20} />
                    <div>
                      <h3 className="font-medium text-gray-800">Operating Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9AM - 6PM<br />Saturday: 10AM - 2PM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-green-700 mb-6">Connect With Us</h2>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                    </svg>
                  </a>
                </div>
                
                {/* Newsletter */}
                <div className="mt-8">
                  <h3 className="font-medium text-gray-800 mb-3">Subscribe to Our Newsletter</h3>
                  <form className="flex gap-2">
                    <input 
                      type="email" 
                      placeholder="Your email"
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                    <button 
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      Subscribe
                    </button>
                  </form>
                  <p className="text-sm text-gray-500 mt-2">Get sustainability tips and recycling updates</p>
                </div>
              </div>
            </div>
            
            {/* Forms Section */}
            <div className="lg:w-2/3">
              <div className="bg-white shadow-md rounded-lg p-8">
                {/* Tabs */}
                <div className="flex border-b mb-6">
                  <button 
                    onClick={() => setActiveTab('contact')}
                    className={`px-4 py-2 mr-2 font-medium ${activeTab === 'contact' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-green-600'}`}
                  >
                    <div className="flex items-center">
                      <MessageSquare className="mr-2" size={18} />
                      Contact Us
                    </div>
                  </button>
                  <button 
                    onClick={() => setActiveTab('partnership')}
                    className={`px-4 py-2 mr-2 font-medium ${activeTab === 'partnership' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-green-600'}`}
                  >
                    <div className="flex items-center">
                      <Users className="mr-2" size={18} />
                      Partnership
                    </div>
                  </button>
                  <button 
                    onClick={() => setActiveTab('feedback')}
                    className={`px-4 py-2 font-medium ${activeTab === 'feedback' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-green-600'}`}
                  >
                    <div className="flex items-center">
                      <Info className="mr-2" size={18} />
                      Feedback
                    </div>
                  </button>
                </div>
                
                {/* Contact Form */}
                {activeTab === 'contact' && (
                  <>
                    <h2 className="text-2xl font-semibold text-green-700 mb-6">Send Us a Message</h2>
                    <form onSubmit={handleContactSubmit}>
                      <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                        <textarea
                          id="message"
                          rows={5}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          value={contactForm.message}
                          onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                          required
                        ></textarea>
                      </div>
                      
                      <button
                        type="submit"
                        className="w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center"
                      >
                        <Send className="mr-2" size={18} />
                        Send Message
                      </button>
                    </form>
                    
                    <div className="mt-8">
                      <h3 className="font-medium text-gray-800 mb-3">Need Quick Help?</h3>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/faqs" className="flex-1 border border-green-600 text-green-600 px-4 py-3 rounded-md hover:bg-green-50 transition-colors text-center">
                          View FAQs
                        </Link>
                        <button className="flex-1 bg-gray-100 text-gray-800 px-4 py-3 rounded-md hover:bg-gray-200 transition-colors">
                          Start Live Chat
                        </button>
                      </div>
                    </div>
                  </>
                )}
                
                {/* Partnership Form */}
                {activeTab === 'partnership' && (
                  <>
                    <h2 className="text-2xl font-semibold text-green-700 mb-6">Partnership Inquiry</h2>
                    <form onSubmit={handlePartnerSubmit}>
                      <div className="mb-4">
                        <label htmlFor="partnerName" className="block text-gray-700 mb-2">Name</label>
                        <input
                          type="text"
                          id="partnerName"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          value={partnerForm.name}
                          onChange={(e) => setPartnerForm({...partnerForm, name: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="partnerEmail" className="block text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          id="partnerEmail"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          value={partnerForm.email}
                          onChange={(e) => setPartnerForm({...partnerForm, email: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="organization" className="block text-gray-700 mb-2">Organization</label>
                        <input
                          type="text"
                          id="organization"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          value={partnerForm.organization}
                          onChange={(e) => setPartnerForm({...partnerForm, organization: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="partnerType" className="block text-gray-700 mb-2">Partnership Type</label>
                        <select
                          id="partnerType"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          value={partnerForm.partnerType}
                          onChange={(e) => setPartnerForm({...partnerForm, partnerType: e.target.value})}
                          required
                        >
                          <option value="recycler">Recycler</option>
                          <option value="delivery">Delivery Partner</option>
                          <option value="ngo">NGO/Non-Profit</option>
                          <option value="government">Government Organization</option>
                          <option value="corporate">Corporate Partnership</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="partnerMessage" className="block text-gray-700 mb-2">Partnership Details</label>
                        <textarea
                          id="partnerMessage"
                          rows={5}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          value={partnerForm.message}
                          onChange={(e) => setPartnerForm({...partnerForm, message: e.target.value})}
                          placeholder="Tell us about your organization and how you'd like to partner with us"
                          required
                        ></textarea>
                      </div>
                      
                      <button
                        type="submit"
                        className="w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center"
                      >
                        <Users className="mr-2" size={18} />
                        Submit Partnership Inquiry
                      </button>
                    </form>
                  </>
                )}
                
                {/* Feedback Form */}
                {activeTab === 'feedback' && (
                  <>
                    <h2 className="text-2xl font-semibold text-green-700 mb-6">Provide Feedback</h2>
                    <form onSubmit={handleFeedbackSubmit}>
                      <div className="mb-4">
                        <label htmlFor="feedbackName" className="block text-gray-700 mb-2">Name</label>
                        <input
                          type="text"
                          id="feedbackName"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          value={feedbackForm.name}
                          onChange={(e) => setFeedbackForm({...feedbackForm, name: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="feedbackEmail" className="block text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          id="feedbackEmail"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          value={feedbackForm.email}
                          onChange={(e) => setFeedbackForm({...feedbackForm, email: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="feedbackType" className="block text-gray-700 mb-2">Feedback Type</label>
                        <select
                          id="feedbackType"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          value={feedbackForm.feedbackType}
                          onChange={(e) => setFeedbackForm({...feedbackForm, feedbackType: e.target.value})}
                          required
                        >
                          <option value="suggestion">Feature Suggestion</option>
                          <option value="bug">Bug Report</option>
                          <option value="experience">Experience Feedback</option>
                          <option value="complaint">Complaint</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="feedbackDetails" className="block text-gray-700 mb-2">Details</label>
                        <textarea
                          id="feedbackDetails"
                          rows={5}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          value={feedbackForm.details}
                          onChange={(e) => setFeedbackForm({...feedbackForm, details: e.target.value})}
                          required
                        ></textarea>
                      </div>
                      
                      <button
                        type="submit"
                        className="w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center"
                      >
                        <Info className="mr-2" size={18} />
                        Submit Feedback
                      </button>
                    </form>
                  </>
                )}
              </div>
              
              {/* Map */}
              <div className="bg-white shadow-md rounded-lg p-8 mt-8">
                <h2 className="text-2xl font-semibold text-green-700 mb-6">Our Service Area</h2>
                <div className="h-64 bg-gray-200 rounded-md flex items-center justify-center">
                  {/* Placeholder for map - in a real implementation you would use a map API */}
                  <div className="text-center">
                    <MapPin className="text-green-600 mx-auto mb-2" size={32} />
                    <p className="text-gray-600">Map integration would go here</p>
                    <p className="text-sm text-gray-500">Showing our service coverage areas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}