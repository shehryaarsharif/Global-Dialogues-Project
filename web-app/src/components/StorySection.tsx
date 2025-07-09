import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface ChartData {
  type: string;
  data: any[];
  labels: string[];
}

interface StorySectionProps {
  chartData: ChartData;
  chartType: string;
}

const StorySection: React.FC<StorySectionProps> = ({ chartData, chartType }) => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    d3.select(chartRef.current).selectAll('*').remove();
    const width = 800;
    const height = 400;
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const g = d3
      .select(chartRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    if (chartType === 'bar') {
      const x = d3
        .scaleBand()
        .domain(chartData.labels)
        .range([0, width - margin.left - margin.right])
        .padding(0.1);
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(chartData.data, (d: any) => d.value) || 0])
        .nice()
        .range([height - margin.top - margin.bottom, 0]);
      g.selectAll('.bar')
        .data(chartData.data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d: any) => x(d.label) || 0)
        .attr('y', (d: any) => y(d.value))
        .attr('width', x.bandwidth())
        .attr('height', (d: any) => y(0) - y(d.value))
        .attr('fill', '#2563eb')
        .attr('rx', 4);
      g.append('g')
        .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
        .call(d3.axisBottom(x));
      g.append('g').call(d3.axisLeft(y));
    } else if (chartType === 'line') {
      const x = d3
        .scalePoint()
        .domain(chartData.labels)
        .range([0, width - margin.left - margin.right]);
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(chartData.data, (d: any) => d.value) || 0])
        .nice()
        .range([height - margin.top - margin.bottom, 0]);
      const line = d3
        .line<any>()
        .x((d: any) => x(d.label) || 0)
        .y((d: any) => y(d.value));
      g.append('path')
        .datum(chartData.data)
        .attr('fill', 'none')
        .attr('stroke', '#2563eb')
        .attr('stroke-width', 2)
        .attr('d', line);
      g.selectAll('.point')
        .data(chartData.data)
        .enter()
        .append('circle')
        .attr('class', 'point')
        .attr('cx', (d: any) => x(d.label) || 0)
        .attr('cy', (d: any) => y(d.value))
        .attr('r', 5)
        .attr('fill', '#2563eb');
      g.append('g')
        .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
        .call(d3.axisBottom(x));
      g.append('g').call(d3.axisLeft(y));
    } else if (chartType === 'pie') {
      const radius = Math.min(width, height) / 2 - 40;
      const color = d3.scaleOrdinal(d3.schemeCategory10);
      const pie = d3.pie<any>().value((d: any) => d.value);
      const arc = d3.arc<any>().innerRadius(0).outerRadius(radius);
      g.attr('transform', `translate(${width / 2 - margin.left},${height / 2 - margin.top})`);
      g.selectAll('.arc')
        .data(pie(chartData.data))
        .enter()
        .append('g')
        .attr('class', 'arc');
      g.selectAll('.arc')
        .data(pie(chartData.data))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', (d, i) => color(chartData.labels[i]) as string);
      g.selectAll('.arc')
        .data(pie(chartData.data))
        .enter()
        .append('text')
        .attr('transform', (d: any) => `translate(${arc.centroid(d)})`)
        .attr('dy', '0.35em')
        .attr('text-anchor', 'middle')
        .text((d: any, i: number) => chartData.labels[i]);
    } else if (chartType === 'radar') {
      const radius = Math.min(width, height) / 2 - 40;
      const angleSlice = (Math.PI * 2) / chartData.labels.length;
      const rScale = d3.scaleLinear().domain([0, 100]).range([0, radius]);
      g.selectAll('.gridCircle')
        .data(d3.range(1, 6).reverse())
        .enter()
        .append('circle')
        .attr('class', 'gridCircle')
        .attr('r', d => radius / 5 * d)
        .style('fill', '#CDCDCD')
        .style('stroke', '#CDCDCD')
        .style('fill-opacity', 0.1)
        .style('stroke-width', '0.5px');
      g.selectAll('.axis')
        .data(chartData.labels)
        .enter()
        .append('g')
        .attr('class', 'axis');
      g.selectAll('.axis')
        .data(chartData.labels)
        .enter()
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', (d, i) => rScale(100) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr('y2', (d, i) => rScale(100) * Math.sin(angleSlice * i - Math.PI / 2))
        .style('stroke', 'gray')
        .style('stroke-width', '1px');
      g.selectAll('.axis')
        .data(chartData.labels)
        .enter()
        .append('text')
        .attr('class', 'legend')
        .style('font-size', '11px')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .attr('x', (d, i) => rScale(110) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr('y', (d, i) => rScale(110) * Math.sin(angleSlice * i - Math.PI / 2))
        .text(d => d);
      const line = d3.line<{ angle: number; value: number }>()
        .x(d => rScale(d.value) * Math.cos(d.angle - Math.PI / 2))
        .y(d => rScale(d.value) * Math.sin(d.angle - Math.PI / 2));
    }
  }, [chartData, chartType]);

  return (
    <section className="w-full py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <svg ref={chartRef}></svg>
      </div>
    </section>
  );
};

export default StorySection; 