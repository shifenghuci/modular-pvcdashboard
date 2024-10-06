import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

function WaterTankNode(_props: NodeProps) {
    return (
        <div className="water-tank-node">
            <Handle type="source" position={Position.Left} />
            <div>
                <label>Water Tank</label>
            </div>
            <Handle type="target" position={Position.Right} />
        </div>
    );
}

export default WaterTankNode;