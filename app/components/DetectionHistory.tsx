"use client";

import React from "react";
import { useMyContext } from "../Provider";

const DetectionHistory = () => {
  const { histories } = useMyContext();
  return (
    <div className="mt-10 overflow-hidden w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-2">Detection History</h2>
      <div className=" overflow-auto h-[calc(100vh-560px)]  border border-r-0 border-gray-300">
        <table className="min-w-full h-full table-auto border-r border-gray-300">
          <thead className="sticky top-0 z-[1]">
            <tr className="bg-primary text-white">
              <th className="p-2 text-left">Crop</th>
              <th className="p-2 text-left">Disease</th>
              <th className="p-2 text-left">Time</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {histories?.history.map((item, index) => {
              return (
                <tr key={index} className="border-t border-gray-300">
                  <td className="p-2">{item.disease_name.split(" ")[0]}</td>
                  <td className="p-2">
                    {item.disease_name.slice(
                      item.disease_name.split(" ")[0].length,
                      item.disease_name.length
                    )}
                  </td>
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
