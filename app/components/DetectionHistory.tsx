"use client";

import React, { useState } from "react";
import { useMyContext } from "../Provider";
import { SEVERITY_LEVEL } from "../types";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { FaLeaf } from "react-icons/fa";

export const healthyLevel = (level: SEVERITY_LEVEL) => {
  let title = "";
  let color = "";

  switch (level) {
    case SEVERITY_LEVEL.LOW:
      color = "primary";
      title = "Healthy leaf";
      break;
    case SEVERITY_LEVEL.MEDIUM:
      color = "yellow-400";
      title = "Slightly diseased leaf";
      break;
    case SEVERITY_LEVEL.HIGH:
      color = "red-600";
      title = "Heavily diseased leaf";
      break;
    default:
      title = "Unknown health status";
  }

  return (
    <div
      className="w-10 h-10 grid place-items-center cursor-pointer"
      title={title}
    >
      <FaLeaf className={`h-5 w-5 text-${color}`} />
    </div>
  );
};

const DetectionHistory = () => {
  const { histories, setRecordId, historyDetail, exportHistory } =
    useMyContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [showPicker, setShowPicker] = useState(false);

  const filteredHistory = histories?.history.filter((item) => {
    const matchesText =
      item.plant?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.disease_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const timestamp = new Date(item.timestamp);
    const matchesStart = range?.from ? timestamp >= range.from : true;
    const matchesEnd = range?.to ? timestamp <= range.to : true;
    return matchesText && matchesStart && matchesEnd;
  });

  return (
    <div className="overflow-hidden w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-2">Detection History</h2>
      <div className="flex flex-col md:flex-row md:items-center justify-end gap-2 mb-2">
        <div className="relative w-full">
          {showPicker && (
            <div className="absolute z-[100] w-fit mt-2 bg-white shadow-md border rounded p-2">
              <DayPicker
                mode="range"
                selected={range}
                onSelect={setRange as any}
                numberOfMonths={2}
                required
              />
            </div>
          )}
        </div>
      </div>
      <div className="overflow-auto h-[calc(100vh-500px)] border border-r-0 border-gray-300">
        <table className="min-w-full h-full table-auto border-r border-gray-300">
          <thead className="sticky top-0 z-[1]">
            <tr className="bg-primary text-white">
              <th className="p-2 text-left">Plant</th>
              <th className="p-2 text-left">Disease</th>
              <th className="p-2 text-left">Health level</th>
              <th className="p-2 text-left">Time</th>
              <th className="p-2 text-left">Export</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {filteredHistory?.map((item, index) => (
              <tr
                onClick={() => {
                  setRecordId(item.record_id);
                  historyDetail();
                }}
                key={index}
                className="border-t cursor-pointer hover:bg-gray-100 border-gray-300"
              >
                <td className="p-2">{item.plant}</td>
                <td className="p-2">{item.disease_name}</td>
                <td className="pl-5">{healthyLevel(item.severity_level)}</td>
                <td className="p-2">
                  {new Date(item.timestamp).toLocaleString()}
                </td>
                <td className="pl-5">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      exportHistory(item.record_id);
                    }}
                    className="text-primary cursor-pointer"
                  >
                    🖨️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetectionHistory;
