export interface IPredictModel {
  "plant": string,
  "top_prediction": string,
  "disease_name": string,
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
  plant: string;
  severity_level: SEVERITY_LEVEL
  disease_name: string;
  timestamp: string;
}
export enum SEVERITY_LEVEL {
  MEDIUM= 'medium',
  LOW='low',
  HIGH ='high'
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