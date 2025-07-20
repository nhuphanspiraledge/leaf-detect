export interface IPredictModel {
  "plant": string,
  "top_prediction": string,
  "disease_confidences":IDiseaseConfidence[],
  "explanation":IExplanation
}
export interface IExplanation {
     "description": string,
    "cause": string,
    "care_instructions": string,
    "treatment": string,
    "vendors": string[]
}
export interface IDiseaseConfidence {
    "disease": string,
      "confidence":number
}
export interface IHistoryItem {
  user_id: number;
  full_name: string;
  disease_name: string;
  timestamp: string;
}
export interface IHistories{
  history: IHistoryItem[]
}