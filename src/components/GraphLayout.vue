<template>
  <div ref="graph" class="graph-container"></div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import * as d3 from 'd3';

export default {
  name: 'GraphLayout',
  props: {
    nodes: Array,
    links: Array,
    autoZoom: Boolean,
    layoutCfg: Object,
    activeLinks: Array,
  },
  setup(props) {
    const graph = ref(null);

    const renderGraph = () => {
      console.log('Rendering graph with nodes and links...');
      console.log('Nodes:', props.nodes);
      console.log('Links:', props.links);

      const svg = d3.select(graph.value).append('svg')
          .attr('width', '100%')
          .attr('height', '100%')
          .call(d3.zoom().on("zoom", (event) => {
            svg.attr("transform", event.transform);
          }))
          .append("g");

      const simulation = d3.forceSimulation(props.nodes)
          .force('link', d3.forceLink(props.links).id(d => d.id).distance(50))
          .force('charge', d3.forceManyBody().strength(-200))
          .force('center', d3.forceCenter(graph.value.clientWidth / 2, graph.value.clientHeight / 2));

      const link = svg.append('g')
          .attr('stroke', '#999')
          .attr('stroke-opacity', 0.6)
          .selectAll('line')
          .data(props.links)
          .enter().append('line')
          .attr('stroke-width', 2);

      const node = svg.append('g')
          .attr('stroke', '#fff')
          .attr('stroke-width', 1.5)
          .selectAll('circle')
          .data(props.nodes)
          .enter().append('circle')
          .attr('r', 5)
          .attr('fill', '#000')
          .call(d3.drag()
              .on('start', (event, d) => {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
              })
              .on('drag', (event, d) => {
                d.fx = event.x;
                d.fy = event.y;
              })
              .on('end', (event, d) => {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
              }));

      node.append('title')
          .text(d => d.id);

      simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        node
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
      });

      // Auto-zoom
      if (props.autoZoom) {
        const bounds = svg.node().getBBox();
        const width = graph.value.clientWidth;
        const height = graph.value.clientHeight;
        const midX = (bounds.x + bounds.width) / 2;
        const midY = (bounds.y + bounds.height) / 2;
        const scale = 0.85 / Math.max(bounds.width / width, bounds.height / height);
        const transform = d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(scale)
            .translate(-midX, -midY);

        svg.transition()
            .duration(750)
            .call(d3.zoom().transform, transform);
      }
    };

    watch(() => [props.nodes, props.links], () => {
      d3.select(graph.value).selectAll('*').remove(); // Clear existing graph
      renderGraph();
    }, {deep: true});

    onMounted(() => {
      renderGraph();
    });

    return {
      graph,
    };
  },
};
</script>

<style scoped>
.graph-container {
  width: 100%;
  height: 100%;
}
</style>
