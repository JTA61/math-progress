import React, { useEffect, useState } from 'react';
import yaml from 'js-yaml';
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { initialNodes, nodeTypes } from "./components/nodes";
import { initialEdges, edgeTypes } from "./components/edges";
import graphData from './data/graph.yaml'; // Importez le fichier YAML

export default function App() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  const [graph, setGraph] = useState([]);

  useEffect(() => {
    // Charger le graphe depuis le fichier YAML
    const loadGraph = async () => {
      const data = yaml.load(graphData);
      setGraph(data.graph);
    };

    loadGraph();
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      edges={edges}
      edgeTypes={edgeTypes}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Background />
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
}
