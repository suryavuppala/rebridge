"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Updated card data with titles and images from second_code
  const cards = [
    {
      id: 1,
      image: "/house.png",
      title: "Individual House",
      content: "Innovative approaches to transform waste materials into valuable resources through advanced recycling techniques and sustainable practices.",
      link: "/producers/individual"
    },
    {
      id: 2,
      image: "/small_industry.png",
      title: "Small-Scale Industries",
      content: "Creating positive change in communities by promoting environmental awareness and providing sustainable waste management solutions.",
      link: "/producers/individual"
    },
    {
      id: 3,
      image: "/community.png",
      title: "Housing Communities",
      content: "Leveraging cutting-edge technology to develop eco-friendly processes that minimize environmental impact and maximize resource efficiency.",
      link: "/producers/individual"
    },
    {
      id: 4,
      image: "/large_industry.png",
      title: "Large Scale Industries",
      content: "Building sustainable systems where materials are reused and recycled, reducing waste and creating a more sustainable future.",
      link: "/producers/individual"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-8">
          Trash into Transformation
        </h1>
        
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-600 text-center mb-16">
            Our platform connects households directly with recyclers—no middlemen, just smarter recycling. By selling your recyclable waste through us, you earn more while supporting a cleaner planet. We ensure scheduled pickups based on your convenience, making it easier for our delivery partners to collect efficiently. With wider reach and lower commissions, we pass on the benefits to you and the environment. Every item you recycle helps reduce landfill waste and promotes sustainability. Join the movement—transform your trash into impact, income, and a better tomorrow. Start selling your waste today!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isMounted && cards.map((card) => (
            <Link href={card.link} key={card.id} className="block h-full">
              <motion.div
                className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-48">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    style={{ objectFit: 'fill' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/400x250/22c55e/ffffff?text=ReBridge";
                    }}
                  />
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-semibold text-green-600 mb-3">{card.title}</h3>
                  <p className="text-gray-600">{card.content}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
