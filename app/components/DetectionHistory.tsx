// "use client";

// import React from "react";
// import { useMyContext } from "../Provider";

// const DetectionHistory = () => {
//   const { histories } = useMyContext();
//   return (
//     <div className=" overflow-hidden w-full max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold text-center mb-2">Detection History</h2>
//       <div className=" overflow-auto h-[calc(100vh-560px)]  border border-r-0 border-gray-300">
//         <table className="min-w-full h-full table-auto border-r border-gray-300">
//           <thead className="sticky top-0 z-[1]">
//             <tr className="bg-primary text-white">
//               <th className="p-2 text-left">Crop</th>
//               <th className="p-2 text-left">Disease</th>
//               <th className="p-2 text-left">Time</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-800">
//             {histories?.history.map((item, index) => {
//               return (
//                 <tr key={index} className="border-t border-gray-300">
//                   <td className="p-2">{item.disease_name.split(" ")[0]}</td>
//                   <td className="p-2">
//                     {item.disease_name.slice(
//                       item.disease_name.split(" ")[0].length,
//                       item.disease_name.length
//                     )}
//                   </td>
//                   <td className="p-2">
//                     {new Date(item.timestamp).toLocaleString()}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DetectionHistory;
"use client";

import React from "react";
import { useMyContext } from "../Provider";
import { fetchPredictionDetail } from "../hooks/useGetHistorydetail";
import { IHistoryItem } from "../types";
import toast from "react-hot-toast";

const DetectionHistory = () => {
  const { histories, setPredictData } = useMyContext();

  const handleRowClick = async (recordId: number) => {
    if (typeof recordId !== "number") {
      toast.error("Invalid record ID");
      return;
    }

    try {
      const detail = await fetchPredictionDetail(recordId);
      setPredictData(detail); // 👉 gán luôn predictData trong context
    } catch (error) {
      toast.error("Failed to fetch prediction detail.");
    }
  };

  return (
    <div className="overflow-hidden w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-2">Detection History</h2>
      <div className="overflow-auto h-[calc(100vh-560px)] border border-r-0 border-gray-300">
        <table className="min-w-full h-full table-auto border-r border-gray-300">
          <thead className="sticky top-0 z-[1]">
            <tr className="bg-primary text-white">
              <th className="p-2 text-left">Crop</th>
              <th className="p-2 text-left">Disease</th>
              <th className="p-2 text-left">Time</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {histories?.history.map((item: IHistoryItem, index: number) => {
              const crop = item.disease_name.split(" ")[0];
              const disease = item.disease_name.slice(crop.length);

              return (
                <tr
                  key={index}
                  onClick={() => handleRowClick(item.record_id)}
                  className="border-t border-gray-300 cursor-pointer hover:bg-gray-100 transition"
                >
                  <td className="p-2">{crop}</td>
                  <td className="p-2">{disease}</td>
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
