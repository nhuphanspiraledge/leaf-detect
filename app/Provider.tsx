"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { usePredict } from "./hooks/usePredict";
import { IPredictModel } from "./types";

interface ContextType {
  image: File | null;
  setImage: (image: File) => void;
  predict?: () => void;
  isPredicting: boolean;
  predictData: IPredictModel | null;
}

const Context = createContext<ContextType | undefined>(undefined);

export const useMyContext = (): ContextType => {
  const context = useContext(Context);
  if (!context) throw new Error("useImage must be used within ImageProvider");
  return context;
};

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [image, setImage] = useState<File | null>(null);
  const [predictData, setPredictData] = useState<IPredictModel | null>(null);
  const { mutate, isPending: isPredicting, data } = usePredict();

  const predict = () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("file", image);
    formData.append("model_type", "plantdoc");
    formData.append("username", "quynhnhu");
    mutate(formData);
  };
  useEffect(() => {
    console.log(data, 1243234);
    if (data) setPredictData(data);
  }, [data]);

  return (
    <Context.Provider
      value={{
        image,
        setImage,
        predict,
        isPredicting,
        predictData,
      }}
    >
      {children}
    </Context.Provider>
  );
};
