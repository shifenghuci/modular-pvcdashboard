import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface UnitNodeData {
    name: string;
    toggleInfluxAnimation: (id: string) => void;
    toggleOutfluxAnimation: (id: string) => void;
}

function UnitNode({ data }: NodeProps<UnitNodeData>) {
    function updateInflux_active() {
        data.toggleInfluxAnimation(`3_${data.name}`);
        console.log(`Influx activated for Unit ${data.name}`);
    }

    function updateOutflux_active() {
        data.toggleOutfluxAnimation(`3_${data.name}`);
        console.log(`Outflux activated for Unit ${data.name}`);
    }

    return (
        <div className="unit-node">
            <Handle type="target" position={Position.Left} />
            <div>
                <button className="pop-button" id="influx" onMouseEnter={updateInflux_active}>Influx</button>
                <button className="pop-button" id="outflux" onMouseEnter={updateOutflux_active}>Outflux</button>
                <label>{`Unit ${data.name}`}</label>
                <button id="setting-button" onClick={() => console.log("setting")}>
                    <img id="gear" src="/vite.svg" alt="Settings" width="20" height="20" />
                </button>
            </div>
            <Handle type="source" position={Position.Right} />
        </div>
    );
}

export default UnitNode;