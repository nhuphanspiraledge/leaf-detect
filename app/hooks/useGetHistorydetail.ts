// services/predictionService.ts

import axios from "axios";
import { IPredictModel } from "../types";

export const fetchPredictionDetail = async (recordId: number): Promise<IPredictModel> => {
  const response = await axios.get<IPredictModel>(
    `http://167.71.210.72:8000/predict/history/detail/${recordId}`
  );
  return response.data;
};
