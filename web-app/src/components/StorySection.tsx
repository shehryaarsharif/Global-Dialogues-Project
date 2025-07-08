import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as d3 from 'd3';
import { Quote } from '../types';

interface StorySectionProps {
  id: string;
  title: string;
  age: string;
  location: string;
  region: string;
  quote: Quote;
  chartType: 'bar' | 'radar' | 'pie' | 'line';
  chartData: {
    labels: string[];
    data: number[];
  };
}

const StorySection: React.FC<StorySectionProps> = ({
  id,
  title,
  age,
  location,
  region,
  quote,
  chartType,
  chartData
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const createChart = useCallback(() => {
    if (!chartRef.current) return;

    // Clear previous chart
    d3.select(chartRef.current).selectAll('*').remove();

    const width = 400;
    const height = 300;

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const createBarChart = (g: d3.Selection<SVGGElement, unknown, null, undefined>, width: number, height: number) => {
      const x = d3.scaleBand()
        .domain(chartData.labels)
        .range([0, width])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(chartData.data) as number])
        .range([height, 0]);

      // Add bars
      g.selectAll('.bar')
        .data(chartData.data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d, i) => x(chartData.labels[i]) as number)
        .attr('y', d => y(d))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d))
        .attr('fill', '#2563eb')
        .attr('rx', 4);

      // Add axes
      g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      g.append('g')
        .call(d3.axisLeft(y));
    };

    const createLineChart = (g: d3.Selection<SVGGElement, unknown, null, undefined>, width: number, height: number) => {
      const x = d3.scalePoint()
        .domain(chartData.labels)
        .range([0, width]);

      const y = d3.scaleLinear()
        .domain([0, d3.max(chartData.data) as number])
        .range([height, 0]);

      const line = d3.line<number>()
        .x((d, i) => x(chartData.labels[i]) as number)
        .y(d => y(d));

      // Add line
      g.append('path')
        .datum(chartData.data)
        .attr('fill', 'none')
        .attr('stroke', '#2563eb')
        .attr('stroke-width', 3)
        .attr('d', line);

      // Add points
      g.selectAll('.point')
        .data(chartData.data)
        .enter()
        .append('circle')
        .attr('class', 'point')
        .attr('cx', (d, i) => x(chartData.labels[i]) as number)
        .attr('cy', d => y(d))
        .attr('r', 5)
        .attr('fill', '#2563eb');

      // Add axes
      g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      g.append('g')
        .call(d3.axisLeft(y));
    };

    const createPieChart = (svg: d3.Selection<SVGSVGElement, unknown, null, undefined>, width: number, height: number) => {
      const radius = Math.min(width, height) / 2;
      const g = svg.append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

      const color = d3.scaleOrdinal()
        .domain(chartData.labels)
        .range(['#2563eb', '#fbbf24', '#10b981', '#f59e0b', '#ef4444']);

      const pie = d3.pie<number>()
        .value(d => d);

      const arc = d3.arc<d3.PieArcDatum<number>>()
        .innerRadius(radius * 0.4)
        .outerRadius(radius);

      const arcs = g.selectAll('.arc')
        .data(pie(chartData.data))
        .enter()
        .append('g')
        .attr('class', 'arc');

      arcs.append('path')
        .attr('d', arc)
        .attr('fill', (d, i) => color(chartData.labels[i]) as string)
        .attr('stroke', 'white')
        .attr('stroke-width', 2);
    };

    const createRadarChart = (svg: d3.Selection<SVGSVGElement, unknown, null, undefined>, width: number, height: number) => {
      const radius = Math.min(width, height) / 2 - 40;
      const g = svg.append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

      const angleSlice = (Math.PI * 2) / chartData.labels.length;

      // Create scales
      const rScale = d3.scaleLinear()
        .domain([0, 100])
        .range([0, radius]);

      // Draw the circular grid
      const levels = 5;
      g.selectAll('.gridCircle')
        .data(d3.range(1, levels + 1).reverse())
        .enter()
        .append('circle')
        .attr('class', 'gridCircle')
        .attr('r', d => radius / levels * d)
        .style('fill', '#CDCDCD')
        .style('stroke', '#CDCDCD')
        .style('fill-opacity', 0.1)
        .style('stroke-width', '0.5px');

      // Draw the axis lines
      const axis = g.selectAll('.axis')
        .data(chartData.labels)
        .enter()
        .append('g')
        .attr('class', 'axis');

      axis.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', (d, i) => rScale(100) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr('y2', (d, i) => rScale(100) * Math.sin(angleSlice * i - Math.PI / 2))
        .attr('class', 'line')
        .style('stroke', '#737373')
        .style('stroke-width', '1px');

      // Draw the labels
      axis.append('text')
        .attr('class', 'legend')
        .style('font-size', '11px')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .attr('x', (d, i) => rScale(100) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr('y', (d, i) => rScale(100) * Math.sin(angleSlice * i - Math.PI / 2))
        .text(d => d);

      // Draw the path
      const line = d3.line<{ angle: number; value: number }>()
        .x(d => rScale(d.value) * Math.cos(d.angle - Math.PI / 2))
        .y(d => rScale(d.value) * Math.sin(d.angle - Math.PI / 2));

      g.append('path')
        .datum(chartData.data.map((d, i) => ({ angle: angleSlice * i, value: d })))
        .attr('class', 'radarArea')
        .attr('d', line)
        .style('fill', 'none')
        .style('stroke', '#2563eb')
        .style('stroke-width', '2px');
    };

    if (chartType === 'bar') {
      createBarChart(g, chartWidth, chartHeight);
    } else if (chartType === 'line') {
      createLineChart(g, chartWidth, chartHeight);
    } else if (chartType === 'pie') {
      createPieChart(svg, width, height);
    } else if (chartType === 'radar') {
      createRadarChart(svg, width, height);
    }
  }, [chartType, chartData]);

  useEffect(() => {
    if (inView && chartRef.current) {
      createChart();
    }
  }, [inView, createChart]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{age}</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">{location}</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">{region}</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <blockquote className="text-lg text-gray-700 mb-4">
                "{quote.quote}"
              </blockquote>
              <cite className="text-sm text-gray-500 italic">
                — {quote.source}
              </cite>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center"
          >
            <div ref={chartRef} className="bg-white rounded-xl p-6 shadow-lg" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default StorySection; 