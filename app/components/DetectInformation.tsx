"use client";

import { useMyContext } from "../Provider";

const Row = ({ label, detail }: { label: string; detail: React.ReactNode }) => (
  <tr className="border-t border-gray-300 align-top">
    <td className="p-2 font-medium text-gray-600">{label}</td>
    <td className="p-2">{detail}</td>
  </tr>
);

const DetectInformation = () => {
  const { predictData } = useMyContext();

  if (!predictData) {
    return;
  }

  const explanation = predictData.explanation ?? {};
  const diseaseConfidences = predictData.disease_confidences ?? [];

  return (
    <table className="table-fixed border border-gray-300 w-full">
      <thead className="sticky top-0">
        <tr className="bg-primary text-white">
          <th className="p-2 w-1/3 text-left">Attribute</th>
          <th className="p-2 text-left">Detail</th>
        </tr>
      </thead>
      <tbody className="text-gray-800">
        <Row label="Plant" detail={predictData.plant} />
        <Row label="Top Prediction" detail={predictData.top_prediction} />
        <Row
          label="Disease Confidences"
          detail={
            <ul className="list-disc pl-4">
              {diseaseConfidences.map((item, i) => (
                <li key={i}>
                  <strong>{item.disease}</strong>:{" "}
                  {(item.confidence * 100).toFixed(2)}%
                </li>
              ))}
            </ul>
          }
        />
        <Row label="Explanation" detail={explanation.description} />
        <Row label="Cause" detail={explanation.cause} />
        <Row label="Care Instructions" detail={explanation.care_instructions} />
        <Row label="Treatment" detail={explanation.treatment} />

        <Row
          label="Vendors"
          detail={
            <ul className="list-disc pl-4">
              {(explanation.vendors ?? []).map((vendor: string, i: number) => (
                <li key={i}>{vendor}</li>
              ))}
            </ul>
          }
        />
      </tbody>
    </table>
  );
};

export default DetectInformation;
