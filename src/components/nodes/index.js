import { PositionLoggerNode } from "./PositionLoggerNode";
import yaml from "js-yaml";
import graphData from "../../data/graph.yaml";

// The YAML is imported as a raw string by webpack's raw-loader.
// We need to parse it with js-yaml.
const graph = yaml.load(graphData);

const nodesSet = new Set();
if (graph && graph.graph) {
  graph.graph.forEach((edge) => {
    const [source, target] = edge.split(" -> ");
    if (source) {
      nodesSet.add(source.trim());
    }
    if (target) {
      nodesSet.add(target.trim());
    }
  });
}

export const initialNodes = Array.from(nodesSet).map((nodeId, index) => ({
  id: nodeId,
  // Use a simple layout algorithm to position nodes in a grid
  position: { x: (index % 10) * 150, y: Math.floor(index / 10) * 100 },
  data: { label: nodeId },
}));

export const nodeTypes = {
  // "position-logger": PositionLoggerNode,
  // Add any of your custom nodes here!
};
