import React, { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

export default function PayElectricityBill() {
  const { currentUser } = useAuth();
  const [amount, setAmount] = useState("");
  const [meterNo, setMeterNo] = useState("");

  async function submitPayment() {
    if (!amount || !meterNo) return alert("All fields required");

    await addDoc(collection(db, "payments-electricity"), {
      uid: currentUser.uid,
      meterNo,
      amount,
      status: "Pending",        // Admin will change this
      createdAt: serverTimestamp(),
    });

    alert("Bill Submitted! Admin will verify.");
    setAmount(""); setMeterNo("");
  }

  return (
    <div className="min-h-screen p-6 text-white bg-gray-900">
      <h1 className="text-2xl font-bold mb-4">Electricity Bill Payment</h1>

      <input className="p-2 w-full bg-black/40 border mb-3"
        placeholder="Meter Number"
        value={meterNo} onChange={e=>setMeterNo(e.target.value)}
      />

      <input className="p-2 w-full bg-black/40 border mb-3"
        placeholder="Amount ₹"
        value={amount} onChange={e=>setAmount(e.target.value)}
      />

      <button onClick={submitPayment}
        className="bg-emerald-600 px-4 py-2 rounded hover:bg-emerald-700">
        Submit Bill
      </button>
    </div>
  );
}
