import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import { TriggerSheet } from './TriggerSheet';


export type Type = "action" | "trigger";
export type Nodekind = "price-trigger" | "timer-tigger" | "hyperliquid" | "backpack" | "lighter";

interface NodeType {
  data: {
    type: Type,
    kind: Nodekind,
    metadata: NodeMetadata,
    label: string
  },
  id: string, position: { x: number, y: number },
}

export type NodeMetadata = any;

interface Edge {
  id: string,
  source: string,
  target: string
}

export function CreateWorkflow() {
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {!nodes.length && <TriggerSheet onSelect={(kind, metadata) => {
        setNodes([...nodes, {
            id: Math.random().toString(),
            data: {
              type: "trigger",
              kind,
              metadata,
              label: kind
            },
            position: { x: 0, y: 0 }
          }])
        }}/>
      }
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
    </div>
  );
}