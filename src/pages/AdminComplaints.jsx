// src/pages/AdminComplaints.jsx
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useLanguage } from "../contexts/LanguageContext";

export default function AdminComplaints() {
  const { language } = useLanguage();
  const [complaints, setComplaints] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("pending");

  // 🔴 LIVE FETCH FROM FIRESTORE
  useEffect(() => {
    const q = query(collection(db, "complaints"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setComplaints(list);
    });
    return () => unsub();
  }, []);

  // SMALL STATS
  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === "pending").length,
    inProgress: complaints.filter((c) => c.status === "in-progress").length,
    resolved: complaints.filter((c) => c.status === "resolved").length,
  };

  // FILTERED LIST
  const filtered = complaints.filter((c) => {
    const typeOk = filterType === "all" || c.type === filterType;
    const statusOk = filterStatus === "all" || c.status === filterStatus;
    return typeOk && statusOk;
  });

  // ---- HELPERS ----
  function getAgeInfo(complaint) {
    const created =
      complaint.createdAt?.toDate?.() || new Date(complaint.createdAt || Date.now());
    const now = new Date();
    const diffMs = now - created;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    let label;
    if (diffDays > 0) label = `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    else if (diffHours > 0) label = `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    else label = language === "hi" ? "अभी" : "just now";

    const isOverdue = diffHours >= 48 && complaint.status !== "resolved";
    return { label, isOverdue, createdFormatted: created.toLocaleString() };
  }

  // ---- FIRESTORE UPDATES ----
  async function updateStatus(id, status) {
    try {
      await updateDoc(doc(db, "complaints", id), {
        status,
        updatedAt: new Date(),
      });
    } catch (e) {
      console.error("Status update failed", e);
    }
  }

  async function updateNote(id, note) {
    try {
      await updateDoc(doc(db, "complaints", id), {
        adminNote: note,
        updatedAt: new Date(),
      });
    } catch (e) {
      console.error("Note update failed", e);
    }
  }

  async function updatePriority(id, priority) {
    try {
      await updateDoc(doc(db, "complaints", id), {
        priority,
        updatedAt: new Date(),
      });
    } catch (e) {
      console.error("Priority update failed", e);
    }
  }

  async function updateAssignee(id, assignee) {
    try {
      await updateDoc(doc(db, "complaints", id), {
        assignedTo: assignee,
        updatedAt: new Date(),
      });
    } catch (e) {
      console.error("Assign update failed", e);
    }
  }

  // PRIORITY BADGE COLORS
  function priorityClass(priority) {
    switch (priority) {
      case "high":
        return "bg-red-600/80 text-white";
      case "low":
        return "bg-emerald-600/80 text-white";
      default:
        return "bg-yellow-500/80 text-black";
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-400">
            {language === "hi"
              ? "📄 प्रशासन शिकायत डैशबोर्ड"
              : "📄 Admin Complaint Dashboard"}
          </h1>
          <p className="text-sm text-gray-300">
            {language === "hi"
              ? "सभी नागरिक शिकायतों को यहीं से मॉनिटर और समाधान करें"
              : "Monitor and resolve all village complaints from here."}
          </p>
        </div>

        {/* TOP STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <p className="text-xs text-gray-400">
              {language === "hi" ? "कुल शिकायतें" : "Total Complaints"}
            </p>
            <p className="text-2xl font-bold text-emerald-400">{stats.total}</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <p className="text-xs text-gray-400">
              {language === "hi" ? "लंबित" : "Pending"}
            </p>
            <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <p className="text-xs text-gray-400">
              {language === "hi" ? "कार्य जारी" : "In Progress"}
            </p>
            <p className="text-2xl font-bold text-blue-400">{stats.inProgress}</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <p className="text-xs text-gray-400">
              {language === "hi" ? "सुलझा हुआ" : "Resolved"}
            </p>
            <p className="text-2xl font-bold text-emerald-300">{stats.resolved}</p>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-slate-800 border border-slate-600 rounded px-4 py-2"
          >
            <option value="all">
              {language === "hi" ? "सभी सेवाएँ" : "All Services"}
            </option>
            <option value="electricity">
              {language === "hi" ? "बिजली" : "Electricity"}
            </option>
            <option value="water">
              {language === "hi" ? "पानी" : "Water"}
            </option>
            <option value="road">
              {language === "hi" ? "सड़क" : "Road"}
            </option>
            <option value="general">
              {language === "hi" ? "अन्य" : "General"}
            </option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-800 border border-slate-600 rounded px-4 py-2"
          >
            <option value="pending">
              {language === "hi" ? "लंबित" : "Pending"}
            </option>
            <option value="in-progress">
              {language === "hi" ? "कार्य जारी" : "In Progress"}
            </option>
            <option value="resolved">
              {language === "hi" ? "सुलझा हुआ" : "Resolved"}
            </option>
            <option value="rejected">
              {language === "hi" ? "अस्वीकृत" : "Rejected"}
            </option>
            <option value="all">
              {language === "hi" ? "सभी" : "All"}
            </option>
          </select>
        </div>

        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <p className="text-gray-300">
            {language === "hi"
              ? "इस फ़िल्टर के अनुसार कोई शिकायत नहीं है।"
              : "No complaints match this filter."}
          </p>
        )}

        {/* COMPLAINT LIST */}
        <div className="space-y-5">
          {filtered.map((c) => {
            const { label, isOverdue, createdFormatted } = getAgeInfo(c);
            const priority = c.priority || "normal";
            const assignedTo = c.assignedTo || "";

            // pick best attachment field if any
            const attachmentUrl =
              c.attachmentUrl || c.imageUrl || c.photoUrl || "";

            return (
              <div
                key={c.id}
                className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 shadow-lg"
              >
                <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-start">
                  {/* LEFT SIDE */}
                  <div className="flex-1">
                    {/* Top meta row */}
                    <div className="flex flex-wrap items-center gap-2 text-xs mb-2">
                      <span className="px-2 py-1 rounded bg-slate-700/80 uppercase tracking-wide">
                        {c.type || "GENERAL"}
                      </span>

                      <span
                        className={`px-2 py-1 rounded ${
                          c.status === "resolved"
                            ? "bg-emerald-700/80"
                            : c.status === "in-progress"
                            ? "bg-blue-700/80"
                            : c.status === "rejected"
                            ? "bg-red-700/80"
                            : "bg-yellow-700/80"
                        }`}
                      >
                        {c.status || "pending"}
                      </span>

                      <span
                        className={`px-2 py-1 rounded ${priorityClass(priority)}`}
                      >
                        {language === "hi" ? "प्राथमिकता:" : "Priority:"}{" "}
                        {priority}
                      </span>

                      {isOverdue && (
                        <span className="px-2 py-1 rounded bg-red-800 text-xs">
                          {language === "hi"
                            ? "⚠ 48 घंटे से अधिक लंबित"
                            : "⚠ Pending > 48h"}
                        </span>
                      )}
                    </div>

                    {/* Title & description */}
                    <h2 className="text-xl font-semibold text-emerald-300">
                      {c.title}
                    </h2>
                    <p className="text-gray-200 mt-1">{c.description}</p>

                    {/* Citizen & village info */}
                    <p className="text-xs text-gray-400 mt-2">
                      👤 {c.citizenName || c.citizenId || "Unknown"} • 🏠{" "}
                      {c.village || "—"}
                    </p>

                    {/* Time info */}
                    <p className="text-xs text-gray-500 mt-1">
                      {language === "hi" ? "प्राप्त:" : "Received:"}{" "}
                      {createdFormatted} ({label})
                    </p>

                    {/* Existing admin note */}
                    {c.adminNote && (
                      <p className="text-xs text-emerald-300 mt-2">
                        {language === "hi" ? "प्रशासन टिप्पणी:" : "Admin Note:"}{" "}
                        {c.adminNote}
                      </p>
                    )}

                    {/* Attachment preview/link */}
                    {attachmentUrl && (
                      <a
                        href={attachmentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-3 text-sm text-sky-300 underline"
                      >
                        {language === "hi"
                          ? "संलग्न फ़ाइल देखें"
                          : "Open attachment"}
                      </a>
                    )}
                  </div>

                  {/* RIGHT SIDE ACTIONS */}
                  <div className="flex flex-col gap-2 w-full md:w-52">
                    {/* Status buttons */}
                    <button
                      onClick={() => updateStatus(c.id, "in-progress")}
                      className="px-3 py-2 text-xs rounded bg-blue-600 hover:bg-blue-700"
                    >
                      {language === "hi" ? "कार्य शुरू करें" : "Mark In-Progress"}
                    </button>
                    <button
                      onClick={() => updateStatus(c.id, "resolved")}
                      className="px-3 py-2 text-xs rounded bg-emerald-600 hover:bg-emerald-700"
                    >
                      {language === "hi" ? "समाधान" : "Mark Resolved"}
                    </button>
                    <button
                      onClick={() => updateStatus(c.id, "rejected")}
                      className="px-3 py-2 text-xs rounded bg-red-600 hover:bg-red-700"
                    >
                      {language === "hi" ? "अस्वीकृत" : "Reject"}
                    </button>

                    {/* Priority select */}
                    <select
                      defaultValue={priority}
                      onChange={(e) => updatePriority(c.id, e.target.value)}
                      className="mt-3 px-3 py-2 text-xs rounded bg-slate-900 border border-slate-700"
                    >
                      <option value="low">
                        {language === "hi" ? "कम प्राथमिकता" : "Low priority"}
                      </option>
                      <option value="normal">
                        {language === "hi" ? "सामान्य" : "Normal"}
                      </option>
                      <option value="high">
                        {language === "hi" ? "उच्च प्राथमिकता" : "High priority"}
                      </option>
                    </select>

                    {/* Assign worker */}
                    <input
                      type="text"
                      placeholder={
                        language === "hi"
                          ? "किस अधिकारी को असाइन?"
                          : "Assign to officer/worker"
                      }
                      defaultValue={assignedTo}
                      onBlur={(e) => updateAssignee(c.id, e.target.value)}
                      className="mt-2 px-3 py-2 text-xs rounded bg-slate-900 border border-slate-700"
                    />
                  </div>
                </div>

                {/* Admin note input */}
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder={
                      language === "hi"
                        ? "नागरिक को उत्तर / टिप्पणी लिखें..."
                        : "Write reply / note to citizen..."
                    }
                    defaultValue={c.adminNote || ""}
                    onBlur={(e) => updateNote(c.id, e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-gray-100"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
