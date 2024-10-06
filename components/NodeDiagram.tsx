"use client"

import React, { useCallback } from 'react';
import ReactFlow, { 
    ReactFlowProvider, 
    Background, 
    Controls, 
    MiniMap,
    useNodesState,
    useEdgesState,
    addEdge,
    Node,
    Edge,
    Connection,
    NodeProps,
    NodeTypes
} from 'reactflow';
import 'reactflow/dist/style.css';

import WaterTankNode from './WaterTankNode';
import UnitNode from './UnitNode';

const waterBlue = '#ADD8E6'

interface UnitNodeData {
    name: string;
    toggleInfluxAnimation: (id: string) => void;
    toggleOutfluxAnimation: (id: string) => void;
}

const initialNodes: Node<UnitNodeData>[] = [
    {
        id: '1',
        type: 'waterTank',
        position: {x:160, y:-75},
        data: { name: 'Water Tank', toggleInfluxAnimation: () => {}, toggleOutfluxAnimation: () => {} }
    },
    {
        id: '2_A',
        type: 'default',
        position: {x:0, y:50},
        data: { name: 'Artery Pipe', toggleInfluxAnimation: () => {}, toggleOutfluxAnimation: () => {} }
    },
    {
        id:'2_V',
        type: 'default',
        position:{x:400, y:50},
        data: { name: 'Vein Pipe', toggleInfluxAnimation: () => {}, toggleOutfluxAnimation: () => {} },
    },
    {
        id: '3_1',
        position: {x:200, y:150},
        type: 'unitNode',
        data: { name: '1', toggleInfluxAnimation: () => {}, toggleOutfluxAnimation: () => {} }
    },
    {
        id: '3_2',
        position: {x:200, y:225},
        type: 'unitNode',
        data: { name: '2', toggleInfluxAnimation: () => {}, toggleOutfluxAnimation: () => {} }
    },
    {
        id: '3_3',
        position: {x:200, y:295},
        type: 'unitNode',
        data: { name: '3', toggleInfluxAnimation: () => {}, toggleOutfluxAnimation: () => {} }
    },
    {
        id: '3_4',
        position: {x:200, y:365},
        type: 'unitNode',
        data: { name: '4', toggleInfluxAnimation: () => {}, toggleOutfluxAnimation: () => {} }
    }
];

const initialEdges: Edge[] = [
    {id:'e1-2_A', source: '1', target: '2_A'},
    {id:'e2_V-1', source: '2_V', target: '1'},
    {id:'e2_A-3_1', source:'2_A', target: '3_1'},
    {id:'e2_A-3_2', source:'2_A', target: '3_2'},
    {id:'e2_A-3_3', source:'2_A', target: '3_3'},
    {id:'e2_A-3_4', source:'2_A', target: '3_4'},
    {id:'e3_1-2_V', source:'3_1', target: '2_V'},
    {id:'e3_2-2_V', source:'3_2', target: '2_V'},
    {id:'e3_3-2_V', source:'3_3', target: '2_V'},
    {id:'e3_4-2_V', source:'3_4', target: '2_V'},
];

const NodeDiagram = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    const toggleInfluxAnimation = useCallback((n_id: string) => {
        setEdges((currentEdges) =>
            currentEdges.map((currentEdge) => {
                const edge = {...currentEdge}
                if ((currentEdge.source === '1' && currentEdge.target === '2_A') || (currentEdge.source === '2_A' && currentEdge.target === n_id)){
                    edge.animated = true;
                    edge.style = {
                        stroke: waterBlue,
                        strokeWidth: 2
                    };
                }
                return edge
            })
        )
    }, [setEdges]);

    const toggleOutfluxAnimation = useCallback((n_id: string) => {
        setEdges((currentEdges) =>
            currentEdges.map((currentEdge) => {
                const edge = {...currentEdge}
                if ((currentEdge.source === '2_V' && currentEdge.target === '1') || (currentEdge.source === n_id && currentEdge.target === '2_V')){
                    edge.animated = true;
                    edge.style = {
                        stroke: waterBlue,
                        strokeWidth: 2
                    };
                }
                return edge
            })
        )
    }, [setEdges]);

    const nodeTypes: NodeTypes = {
        waterTank: WaterTankNode,
        unitNode: UnitNode
    };

    React.useEffect(() => {
        setNodes((nds) =>
            nds.map((node) => ({
                ...node,
                data: {
                    ...node.data,
                    toggleInfluxAnimation,
                    toggleOutfluxAnimation,
                },
            }))
        );
    }, [setNodes, toggleInfluxAnimation, toggleOutfluxAnimation]);

    return (
        <ReactFlowProvider>
            <div style={{ width: '100%', height: '100%' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    fitView
                    attributionPosition="bottom-left"
                >
                    <Background />
                    <Controls />
                    <MiniMap />
                </ReactFlow>
            </div>
        </ReactFlowProvider>
    )
}

export default NodeDiagram