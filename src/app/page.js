"use client"

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const cards = [
    {
      id: 'producers',
      title: 'Waste Producers',
      description: 'Turn your recyclable waste into money. Schedule pickups and get paid based on waste weight.',
      icon: '🏠',
      color: 'from-green-400 to-green-600',
      path: '/producers'
    },
    {
      id: 'recyclers',
      title: 'Recyclers',
      description: 'Source high-quality recyclable materials directly and reduce costs with no middleman.',
      icon: '♻️',
      color: 'from-blue-400 to-blue-600',
      path: '/recyclers'
    },
    {
      id: 'delivery',
      title: 'Delivery Partners',
      description: 'Join our network of delivery partners. Earn more with optimized pickup routes.',
      icon: '🚚',
      color: 'from-purple-400 to-purple-600',
      path: '/delivery'
    }
  ];

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
    }
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>EcoConnect | Direct Recycling Platform</title>
        <meta name="description" content="Connecting waste producers directly with recyclers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            <span className="text-green-600">Eco</span>Connect
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Revolutionizing recycling by connecting producers directly with recyclers,
            eliminating the middleman and increasing value for everyone.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {cards.map((card) => (
            <Link href={card.path} key={card.id} passHref className="block">
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="bg-white rounded-xl overflow-hidden cursor-pointer relative shadow-md h-full"
              >
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-80`}
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: hoveredCard === card.id ? 0.9 : 0.7 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative p-8 text-white h-full flex flex-col">
                  <div className="text-5xl mb-6">{card.icon}</div>
                  <h2 className="text-2xl font-bold mb-4">{card.title}</h2>
                  <p className="text-lg opacity-90 flex-grow">{card.description}</p>
                  
                  <motion.div 
                    className="mt-6 flex items-center text-sm font-medium"
                    initial={{ x: 0 }}
                    animate={{ x: hoveredCard === card.id ? 5 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    Learn more
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-16 text-gray-600"
        >
          <p className="mb-2">Join our sustainable recycling network today</p>
          <p>Reducing waste, increasing value, saving our planet</p>
        </motion.div>
      </main>
    </div>
  );
}