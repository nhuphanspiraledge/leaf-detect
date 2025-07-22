export interface IPredictModel {
  "plant": string,
  "top_prediction": string,
  "severity_level": string,
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
  record_id: number;
  full_name: string;
  disease_name: string;
  timestamp: string;
}
export interface IHistories{
  history: IHistoryItem[]
}
export interface IChatHistories{
  "history": IChatHistoryItem[]
}
export interface IChatHistoryItem{
  message:string,
  reply: string
}
export interface IChatRequest {
  username: string;
  message: string;
  history: string[];
}

export interface IChatResponse {
  reply: string;
}