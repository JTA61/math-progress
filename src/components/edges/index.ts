import type { Edge, EdgeTypes } from "@xyflow/react";
import yaml from "js-yaml";
import graphData from "../../data/graph.yaml";

// The YAML is imported as a raw string by webpack's raw-loader.
// We need to parse it with js-yaml.
const graph = yaml.load(graphData);

export const initialEdges: Edge[] = [];
if (graph && graph.graph) {
  graph.graph.forEach((edge: string) => {
    const [source, target] = edge.split(" -> ");
    if (source && target) {
      initialEdges.push({
        id: edge,
        source: source.trim(),
        target: target.trim(),
        animated: true,
      });
    }
  });
}

export const edgeTypes: EdgeTypes = {
  // Add your custom edge types here!
};
