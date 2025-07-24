"use client";

import React from "react";
import { useMyContext } from "../Provider";
import { SEVERITY_LEVEL } from "../types";
import { FaLeaf } from "react-icons/fa";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";

export const healthyLevel = (level: SEVERITY_LEVEL) => {
  let title = "";
  let color = "";

  switch (level) {
    case SEVERITY_LEVEL.LOW:
      color = "var(--color-primary)";
      title = "Healthy leaf";
      break;
    case SEVERITY_LEVEL.MEDIUM:
      color = "var(--color-three)";
      title = "Slightly diseased leaf";
      break;
    case SEVERITY_LEVEL.HIGH:
      color = "var(--color-three)";
      title = "Heavily diseased leaf";
      break;
    default:
      color = "#6c757d";
      title = "Unknown health status";
  }

  return (
    <Tippy
      theme="leaf"
      animation="shift-away"
      interactive={true}
      placement="top"
      maxWidth="220px"
      content={
        <>
          <div className="flex items-center gap-2 mb-1">
            <FaLeaf className="text-lg" style={{ color }} />
            <span className="font-bold text-md">{title}</span>
          </div>
          <p className="text-sm text-gray-600">
            This leaf was detected with a {title.toLowerCase()}.
          </p>
        </>
      }
    >
      <div className="w-10 h-10 grid place-items-center cursor-pointer">
        <FaLeaf className="h-5 w-5" style={{ color }} />
      </div>
    </Tippy>
  );
};
import { format, toZonedTime } from "date-fns-tz";
import { isToday, isYesterday } from "date-fns";

const VIETNAM_TIMEZONE = "Asia/Ho_Chi_Minh";

export const formatToVietnamTime = (timestamp: string | Date) => {
  let dateUtc: Date;

  if (typeof timestamp === "string") {
    // Convert "2025-07-24 17:11:57" => "2025-07-24T17:11:57Z"
    const fixed = timestamp.replace(" ", "T") + "Z";
    dateUtc = new Date(fixed);
  } else {
    dateUtc = timestamp;
  }

  const vnDate = toZonedTime(dateUtc, VIETNAM_TIMEZONE);

  if (isToday(vnDate)) {
    return `Today, ${format(vnDate, "HH:mm", {
      timeZone: VIETNAM_TIMEZONE,
    })}`;
  } else if (isYesterday(vnDate)) {
    return `Yesterday, ${format(vnDate, "HH:mm", {
      timeZone: VIETNAM_TIMEZONE,
    })}`;
  } else {
    return format(vnDate, "dd/MM/yyyy, HH:mm", {
      timeZone: VIETNAM_TIMEZONE,
    });
  }
};

const DetectionHistory = () => {
  const { histories, setRecordId, historyDetail, exportHistory } =
    useMyContext();

  return (
    <div className="overflow-hidden w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-2">Detection History</h2>
      <div className="flex flex-col md:flex-row md:items-center justify-end gap-2 mb-2">
        <div className="relative w-full"></div>
      </div>
      <div className="overflow-auto max-h-[calc(100vh-360px)] border border-r-0 border-gray-300">
        <table className="min-w-full h-full table-auto border-r border-gray-300">
          <thead className="sticky top-0 z-[1]">
            <tr className="bg-primary text-white">
              <th className="p-2 text-left">Plant</th>
              <th className="p-2 text-left">Disease</th>
              <th className="p-2 text-left">Health level</th>
              <th className="p-2 text-left pl-10">Time</th>
              <th className="p-2 text-left">Export</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {histories?.history.map((item, index) => (
              <tr
                onClick={() => {
                  setRecordId(item.record_id);
                  historyDetail();
                }}
                key={index}
                className="border-t cursor-pointer hover:bg-gray-100 !h-3 border-gray-300"
              >
                <td className="p-2">{item.plant}</td>
                <td className="p-2">{item.disease_name}</td>
                <td className="pl-5 h-fit">
                  {healthyLevel(item.severity_level)}
                </td>
                <td className="p-2">
                  {formatToVietnamTime(item.timestamp)}
                  {/* {new Date(item.timestamp).toLocaleString()} */}
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
