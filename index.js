import {select, csv, scalelinear, max, scaleBand} from 'd3';
const svg = select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');
const render = data => {
    const xScale = scalelinear()
    .domain([0, max(data, d=> d.votes)])
    .range([0, width]);

    const yScale = scaleBand()
    .domain(data.map(d => d.candidate))
    .range([0, height]);

    console.log(xScale.range());

    svg.selectAll('rect').data(data)
    .enter().append('rect')
    .attr('width', d => xScale(d.votes))
    .attr('height', 300);
};



csv('data.scv').then(data =>{
    data.forEach(d => {
        d.votes = +d.votes;
    });
   render(data);
});