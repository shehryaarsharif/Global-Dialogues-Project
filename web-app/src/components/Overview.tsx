import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import { VizData } from '../types';

interface OverviewProps {
  data: VizData;
}

interface SentimentData {
  key: string;
  value: number;
}

const Overview: React.FC<OverviewProps> = ({ data }) => {
  const sentimentRef = useRef<HTMLDivElement>(null);
  const geographicRef = useRef<HTMLDivElement>(null);

  const createSentimentChart = useCallback(() => {
    if (!sentimentRef.current) return;

    // Clear previous chart
    d3.select(sentimentRef.current).selectAll('*').remove();

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(sentimentRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal<string>()
      .domain(Object.keys(data.sentiment))
      .range(['#10b981', '#f59e0b', '#ef4444']);

    const pie = d3.pie<SentimentData>()
      .value(d => d.value);

    const arc = d3.arc<d3.PieArcDatum<SentimentData>>()
      .innerRadius(radius * 0.4)
      .outerRadius(radius);

    const pieData = Object.entries(data.sentiment).map(([key, value]) => ({ key, value }));
    const arcs = g.selectAll('.arc')
      .data(pie(pieData))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.data.key))
      .attr('stroke', 'white')
      .attr('stroke-width', 2);

    // Add labels
    arcs.append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', 'white')
      .text((d) => d.data.key.split(' ')[0]);

    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width + 20}, 0)`);

    const legendItems = legend.selectAll('.legend-item')
      .data(Object.entries(data.sentiment))
      .enter()
      .append('g')
      .attr('class', 'legend-item')
      .attr('transform', (d, i) => `translate(0, ${i * 25})`);

    legendItems.append('rect')
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', (d) => color(d[0]));

    legendItems.append('text')
      .attr('x', 20)
      .attr('y', 12)
      .attr('font-size', '12px')
      .text((d) => d[0]);
  }, [data.sentiment]);

  const createGeographicChart = useCallback(() => {
    if (!geographicRef.current) return;

    // Clear previous chart
    d3.select(geographicRef.current).selectAll('*').remove();

    const width = 400;
    const height = 300;

    const svg = d3.select(geographicRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(Object.keys(data.geographic))
      .range([0, chartWidth])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(Object.values(data.geographic)) as number])
      .range([chartHeight, 0]);

    // Add bars
    g.selectAll('.bar')
      .data(Object.entries(data.geographic))
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d[0]) as number)
      .attr('y', (d) => y(d[1]))
      .attr('width', x.bandwidth())
      .attr('height', (d) => chartHeight - y(d[1]))
      .attr('fill', '#2563eb')
      .attr('rx', 4);

    // Add x-axis
    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    // Add y-axis
    g.append('g')
      .call(d3.axisLeft(y));
  }, [data.geographic]);

  useEffect(() => {
    if (sentimentRef.current && data.sentiment) {
      createSentimentChart();
    }
  }, [data.sentiment, createSentimentChart]);

  useEffect(() => {
    if (geographicRef.current && data.geographic) {
      createGeographicChart();
    }
  }, [data.geographic, createGeographicChart]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center text-gray-900 mb-16"
        >
          Global Perspectives on AI
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">Excitement vs Concern</h3>
            <div ref={sentimentRef} className="flex justify-center" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">Geographic Distribution</h3>
            <div ref={geographicRef} className="flex justify-center" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Overview; 