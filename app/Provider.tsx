"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { usePredict } from "./hooks/usePredict";
import { IHistories, IPredictModel } from "./types";
import { useGetHistory } from "./hooks/useGetHistory";
import toast from "react-hot-toast";

interface ContextType {
  image: File | null;
  setImage: (image: File) => void;
  predict: (modelType: string) => void;
  isPredicting: boolean;
  predictData: IPredictModel | null;
  histories: IHistories | null;
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
  const [histories, setHistories] = useState<IHistories | null>(null);
  const { mutate, isPending: isPredicting, data } = usePredict();

  const { data: historiesData, refetch: refetchHistories } = useGetHistory();
  const predict = (modelType: string) => {
    if (!image) return toast.error("Please upload image first.");
    const formData = new FormData();
    formData.append("file", image);
    formData.append("model_type", modelType);
    formData.append("username", "quynhnhu");
    const toastId = toast.loading("Detecting...");
    mutate(formData, {
      onError: () => {
        toast.dismiss(toastId);
        toast.error("Please re-upload image, error while detecting.");
      },
      onSuccess: async (result) => {
        toast.dismiss(toastId);
        toast.success("Detection completed!");
        setPredictData(result);
        const refetched = await refetchHistories();
        if (refetched.data) {
          setHistories(refetched.data);
        }
      },
    });
  };
  useEffect(() => {
    if (data) {
      setPredictData(data);
    }
    if (historiesData) setHistories(historiesData);
  }, [data, historiesData]);

  return (
    <Context.Provider
      value={{
        image,
        setImage,
        predict,
        isPredicting,
        predictData,
        histories,
      }}
    >
      {children}
    </Context.Provider>
  );
};
