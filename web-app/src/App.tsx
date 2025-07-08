import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Overview from './components/Overview';
import StorySection from './components/StorySection';
import Insights from './components/Insights';
import { VizData } from './types';

function App() {
  const [data, setData] = useState<VizData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('viz_data.json')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Global Dialogues Data...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Data</h2>
          <p className="text-gray-600">Unable to load visualization data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Overview data={data} />
      
      <StorySection
        id="story-1"
        title="The Optimist's View"
        age="25-34"
        location="Urban"
        region="North America"
        quote={{
          quote: "AI will revolutionize healthcare and make it accessible to everyone. I'm excited about the possibilities for personalized medicine.",
          source: "Sarah, Software Engineer"
        }}
        chartType="bar"
        chartData={{
          labels: ["Healthcare", "Education", "Transportation", "Entertainment", "Finance"],
          data: [85, 72, 68, 45, 38]
        }}
      />

      <StorySection
        id="story-2"
        title="The Cautious Observer"
        age="35-44"
        location="Suburban"
        region="Europe"
        quote={{
          quote: "We need to be careful about AI development. It's powerful technology that needs proper regulation and oversight.",
          source: "Marcus, Policy Analyst"
        }}
        chartType="pie"
        chartData={{
          labels: ["Regulation", "Transparency", "Safety", "Ethics", "Accountability"],
          data: [40, 25, 20, 10, 5]
        }}
      />

      <StorySection
        id="story-3"
        title="The Rural Perspective"
        age="45-54"
        location="Rural"
        region="Asia"
        quote={{
          quote: "AI could help us with farming and bring technology to rural areas. But we need to make sure it benefits everyone.",
          source: "Priya, Agricultural Specialist"
        }}
        chartType="radar"
        chartData={{
          labels: ["Agriculture", "Infrastructure", "Education", "Healthcare", "Communication"],
          data: [90, 75, 60, 70, 80]
        }}
      />

      <StorySection
        id="story-4"
        title="The Student's Hope"
        age="18-24"
        location="Urban"
        region="Global South"
        quote={{
          quote: "AI can help us solve climate change and create a better future. I want to be part of that solution.",
          source: "Aisha, Environmental Science Student"
        }}
        chartType="line"
        chartData={{
          labels: ["2020", "2021", "2022", "2023", "2024"],
          data: [30, 45, 60, 75, 85]
        }}
      />

      <Insights />
    </div>
  );
}

export default App;
