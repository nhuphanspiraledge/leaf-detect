"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { usePredict } from "./hooks/usePredict";
import { IChatHistories, IHistories, IPredictModel } from "./types";
import { useGetHistory } from "./hooks/useGetHistory";
import toast from "react-hot-toast";
import { useGetChatHistory } from "./hooks/useGetChatHistory";
import { useChat } from "./hooks/useChat";

interface ContextType {
  image: File | null;
  setImage: (image: File) => void;
  predict: (modelType: string) => void;
  isPredicting: boolean;
  predictData: IPredictModel | null;
  setPredictData: (data: IPredictModel | null) => void;
  histories: IHistories | null;
  chatHistories: IChatHistories | null;
  sendChat: (message: string) => void;
  isChatting: boolean;
}

const Context = createContext<ContextType | undefined>(undefined);

export const useMyContext = (): ContextType => {
  const context = useContext(Context);
  if (!context) throw new Error("useImage must be used within ImageProvider");
  return context;
};

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const mockUser = "quynhnhu";
  const [image, setImage] = useState<File | null>(null);
  const [predictData, setPredictData] = useState<IPredictModel | null>(null);
  const [histories, setHistories] = useState<IHistories | null>(null);
  const [chatHistories, setChatHistories] = useState<IChatHistories | null>(
    null
  );
  const { mutate, isPending: isPredicting, data } = usePredict();

  const { data: historiesData, refetch: refetchHistories } =
    useGetHistory(mockUser);
  const { data: chatHistoriesData } = useGetChatHistory(mockUser);
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
  const { mutate: chatMutate, isPending: isChatting } = useChat();
  const sendChat = (message: string) => {
    const historyList = chatHistories?.history || [];
    chatMutate(
      {
        username: mockUser,
        message,
        history: [],
      },
      {
        onSuccess: (res) => {
          const newChat = { message, reply: res.reply };
          setChatHistories({
            history: [...historyList, newChat],
          });
        },
        onError: () => {
          toast.error("Error sending chat.");
        },
      }
    );
  };

  useEffect(() => {
    if (data) {
      setPredictData(data);
    }
    if (historiesData) setHistories(historiesData);
  }, [data, historiesData]);
  useEffect(() => {
    if (chatHistoriesData) setChatHistories(chatHistoriesData);
  }, [chatHistoriesData]);

  return (
    <Context.Provider
      value={{
        image,
        setImage,
        predict,
        isPredicting,
        predictData,
        setPredictData,
        histories,
        chatHistories,
        sendChat,
        isChatting,
      }}
    >
      {children}
    </Context.Provider>
  );
};
