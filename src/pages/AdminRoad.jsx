import React, { useState } from "react";

export default function AdminRoad() {

  const [projects,setProjects] = useState([]);
  const [name,setName] = useState("");

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-10">

      <h1 className="text-4xl font-bold text-red-400 mb-6">🛣 Road Work Department</h1>

      <div className="bg-red-900/20 p-6 rounded-xl border border-red-500 shadow-lg">
        <h2 className="text-2xl font-bold">Start New Road Project</h2>

        <div className="flex mt-4">
          <input
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="Road name/location"
            className="flex-1 bg-black px-3 py-2 rounded-l-lg"
          />
          
          <button
            onClick={()=>{setProjects([...projects,{name,progress:"0%"}]);setName("");}}
            className="bg-red-500 px-5 py-2 rounded-r-lg font-semibold"
          >
            Launch
          </button>
        </div>

        {projects.map((p,i)=>(
          <div key={i} className="bg-red-800/30 p-4 mt-3 rounded-xl">
            🏗 {p.name}  
            <div className="bg-black w-full h-2 rounded mt-2">
              <div className="bg-red-500 h-2 rounded" style={{width:p.progress}}></div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
