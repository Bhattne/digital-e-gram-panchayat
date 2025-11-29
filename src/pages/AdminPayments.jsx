import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);

  useEffect(()=>{ fetchData() }, []);

  async function fetchData() {
    const snap = await getDocs(collection(db, "payments-electricity"));
    setPayments(snap.docs.map(d => ({ id:d.id, ...d.data() })));
  }

  async function updateStatus(id, status) {
    await updateDoc(doc(db, "payments-electricity", id), { status });
    fetchData();
  }

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">
        Electricity Bill Approvals
      </h1>

      {payments.map(p => (
        <div key={p.id} className="bg-gray-800 p-4 rounded mb-3">
          <p><b>Meter:</b> {p.meterNo}</p>
          <p><b>Amount:</b> ₹{p.amount}</p>
          <p className="text-yellow-400"><b>Status:</b> {p.status}</p>

          <div className="flex gap-3 mt-3">
            <button onClick={()=>updateStatus(p.id,"Approved")}
              className="bg-emerald-600 px-3 py-1 rounded">Approve</button>

            <button onClick={()=>updateStatus(p.id,"Rejected")}
              className="bg-red-600 px-3 py-1 rounded">Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}
