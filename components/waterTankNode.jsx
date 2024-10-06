import {Handle, Position} from '@xyflow/react'


function WaterTankNode() {
    const isConnectable = true;
    return (
        <div className="water-tank-node">
            <Handle type="source" position={Position.Left} isConnectable={isConnectable} />
            <div>
                <label>Water Tank</label>
            </div>
            <Handle type="target" position={Position.Right} isConnectable={isConnectable} />
        </div>
    );
}

export default WaterTankNode;