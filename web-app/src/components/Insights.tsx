import React from 'react';
import { motion } from 'framer-motion';

const Insights: React.FC = () => {
  const insights = [
    {
      title: 'Cultural Sensitivity',
      description: '87% of participants want AI tailored to their local context, with strong emphasis on cultural understanding.',
      icon: '🌍',
      color: 'bg-blue-500'
    },
    {
      title: 'Trust Building',
      description: 'Participants across all regions emphasize the importance of AI systems that demonstrate cultural respect and understanding.',
      icon: '🤝',
      color: 'bg-green-500'
    },
    {
      title: 'Local Context',
      description: 'Rural communities particularly value AI that understands local languages, customs, and practical needs like mobile money integration.',
      icon: '🏘️',
      color: 'bg-purple-500'
    }
  ];

  return (
    <section className="py-20 gradient-bg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-16"
        >
          Key Insights
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{insight.icon}</div>
              <h3 className="text-2xl font-semibold mb-4 text-secondary">
                {insight.title}
              </h3>
              <p className="text-lg opacity-90 leading-relaxed">
                {insight.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold mb-6">Data from the Global Dialogues Challenge</h3>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            2,324 voices from 70+ countries sharing their perspectives on AI development and governance. 
            This data provides a unique opportunity to understand global perspectives and create solutions 
            that truly serve diverse populations worldwide.
          </p>
        </motion.div> */}
      </div>
    </section>
  );
};

export default Insights; 