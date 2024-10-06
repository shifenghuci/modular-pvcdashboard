"use client"

import React, { useState } from 'react'
import { Wrench, Calendar, Activity, BarChart2, Droplet } from "lucide-react"
import dynamic from 'next/dynamic'
import NodeDiagram from './NodeDiagram.jsx'

export default function PVCIrrigationDashboard() {
  const [systemOn, setSystemOn] = useState(false)
  const [autoMode, setAutoMode] = useState(true)
  const [waterLevel, setWaterLevel] = useState(9) // Example water level

  const isTankFilled = waterLevel > 10 // Assuming pipe is considered filled if water level > 10%

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-6 lg:p-8 rounded-lg shadow-lg">
      <header className="mb-6 bg-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center">
          <Droplet className="h-10 w-10 text-blue-600 mr-4" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Modular Planter PVC Dashboard</h1>
            <p className="text-xs md:text-sm text-gray-600 font-medium">Real-time Monitoring Dashboard</p>
          </div>
        </div>
      </header>

      <div className="grid gap-4 md:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-3">
        {/* System Control Panel */}
        <div className="bg-white shadow-lg rounded-lg border-t-4 border-blue-500 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">System Control Panel</h2>
            <Wrench className="h-5 w-5 text-blue-500" />
          </div>
          <div className="space-y-4">
            {['System Power', 'Auto Mode'].map((label, index) => (
              <div className="flex items-center justify-between" key={index}>
                <span className="font-medium">{label}</span>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${index === 0 ? (systemOn ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800") : (autoMode ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800")}`}>
                    {index === 0 ? (systemOn ? "ON" : "OFF") : (autoMode ? "ON" : "OFF")}
                  </span>
                  <button className={`w-12 h-6 rounded-full flex items-center p-1 ${index === 0 ? (systemOn ? "bg-blue-600" : "bg-gray-300") : (autoMode ? "bg-blue-600" : "bg-gray-300")} focus:outline-none`} onClick={() => index === 0 ? setSystemOn(!systemOn) : setAutoMode(!autoMode)}>
                    <div className={`w-4 h-4 rounded-full bg-white shadow-md transform duration-300 ease-in-out ${index === 0 ? (systemOn ? "translate-x-6" : "translate-x-0") : (autoMode ? "translate-x-6" : "translate-x-0")}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Watering Schedule Manager */}
        <div className="bg-white shadow-lg rounded-lg border-t-4 border-green-500 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Watering Schedule Manager</h2>
            <Calendar className="h-5 w-5 text-green-500" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Next Watering:</p>
            <p className="text-lg font-bold">Today, 6:00 PM</p>
            <p className="text-sm text-gray-600">Duration: 30 minutes</p>
            <button className="mt-2 w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
              Adjust Schedule
            </button>
          </div>
        </div>

        {/* Sensor Data */}
        <div className="bg-white shadow-lg rounded-lg border-t-4 border-yellow-500 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Sensor Data</h2>
            <Activity className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Water Level:</span>
                <span className="font-bold">{waterLevel}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${waterLevel}%` }}></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Tank Status:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${isTankFilled ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800 animate-bounce"}`}>
                {isTankFilled ? "Filled" : "Not Filled"}
              </span>
            </div>
          </div>
        </div>

        {/* Node Diagram */}
        <div className="col-span-1 md:col-span-3 bg-transparent shadow-xl rounded-lg">
          <div className="h-[400px] md:h-[500px]">
            <NodeDiagram />
          </div>
        </div>
      </div>
    </div>
  )
}
