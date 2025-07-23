"use client";

import React from "react";
import { useMyContext } from "../Provider";
import { SEVERITY_LEVEL } from "../types";

const DetectionHistory = () => {
  const { histories, setRecordId, historyDetail } = useMyContext();

  const healthyLevel = (level: SEVERITY_LEVEL) => {
    let src = "";
    let title = "";

    switch (level) {
      case SEVERITY_LEVEL.LOW:
        src = "/low.png";
        title = "Healthy leaf";
        break;
      case SEVERITY_LEVEL.MEDIUM:
        src = "/medium.png";
        title = "Slightly diseased leaf";
        break;
      case SEVERITY_LEVEL.HIGH:
        src = "/high.png";
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
        <img src={src} className="h-5 w-5" alt={title} />
      </div>
    );
  };
  return (
    <div className=" overflow-hidden w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-2">Detection History</h2>
      <div className=" overflow-auto h-[calc(100vh-450px)]  border border-r-0 border-gray-300">
        <table className="min-w-full h-full table-auto border-r border-gray-300">
          <thead className="sticky top-0 z-[1]">
            <tr className="bg-primary text-white">
              <th className="p-2 text-left">Plant</th>
              <th className="p-2 text-left">Disease</th>
              <th className="p-2 text-left">Health level</th>
              <th className="p-2 text-left">Time</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {histories?.history.map((item, index) => {
              return (
                <tr
                  onClick={() => {
                    console.log(item.record_id);

                    setRecordId(item.record_id);
                    historyDetail();
                  }}
                  key={index}
                  className="border-t border-gray-300"
                >
                  <td className="p-2">{item.plant}</td>
                  <td className="p-2">{item.disease_name}</td>
                  <td className="p-2">{healthyLevel(item.severity_level)}</td>
                  <td className="p-2">
                    {new Date(item.timestamp).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetectionHistory;
