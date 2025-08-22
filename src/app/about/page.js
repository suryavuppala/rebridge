// app/about/page.js
"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center text-green-600 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Us
        </motion.h1>

        <motion.div
          className="bg-white p-8 rounded-2xl shadow-lg text-lg leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="mb-6">
            At <span className="font-semibold text-green-600">ReBridge</span>, we're redefining the way recycling works by bridging the gap between waste generators and recyclers—without the need for a middleman. Traditionally, the recycling process involves mediators who connect households or businesses to recyclers through hired delivery personnel. While this system works, it often results in lower returns for waste generators and higher costs for recyclers due to commissions taken by the mediator.
          </p>

          <p className="mb-6">
            We aim to change that.
          </p>

          <p className="mb-6">
            ReBridge is a smart, scalable platform designed to connect households, small-scale industries, communities, and large-scale waste generators directly with recyclers. By removing the intermediary, we’re able to offer better prices to recyclers and pass on more earnings to both the waste generators and the delivery partners. This efficient model also allows us to cover a wider geographical area and reach places mediators often can’t—like individual households.
          </p>

          <p className="mb-6">
            Our platform allows users to schedule pickups based on their convenience and preferred frequency. This helps our delivery partners plan optimal collection routes, reducing the number of trips needed and lowering fuel emissions—contributing to a more sustainable future.
          </p>

          <p className="mb-6">
            Waste generators are compensated fairly based on the frequency of collection and the weight of the recyclable materials. By offering transparency, better pricing, and accessibility, we encourage more people to take part in recycling and contribute to environmental well-being.
          </p>

          <p className="mb-6">
            At the core of ReBridge is a commitment to <span className="font-semibold text-green-600">sustainability</span>, <span className="font-semibold text-green-600">inclusivity</span>, and <span className="font-semibold text-green-600">innovation</span>. We believe that recycling should be easy, rewarding, and impactful for everyone involved.
          </p>

          <p>
            Join us in our mission to transform trash into opportunities—for people, for communities, and for the planet.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
