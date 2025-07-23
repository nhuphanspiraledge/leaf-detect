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
import { useGetHistoryDetail } from "./hooks/useGetHistoryDetail";

interface ContextType {
  image: File | null;
  setImage: (image: File) => void;
  predict: () => void;
  isPredicting: boolean;
  predictData: IPredictModel | null;
  histories: IHistories | null;
  chatHistories: IChatHistories | null;
  sendChat: (message: string) => void;
  isChatting: boolean;
  historyDetail: () => void;
  recordId: number;
  setRecordId: (recordId: number) => void;
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
  const [recordId, setRecordId] = useState<number>(0);
  const { mutate, isPending: isPredicting, data } = usePredict();

  const { data: historiesData, refetch: refetchHistories } =
    useGetHistory(mockUser);
  const { data: chatHistoriesData } = useGetChatHistory(mockUser);
  const predict = () => {
    if (!image) return toast.error("Please upload image first.");
    const formData = new FormData();
    formData.append("file", image);
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

  const { refetch: refetchHistoryDetail } = useGetHistoryDetail(recordId);

  const historyDetail = async () => {
    try {
      const result = await refetchHistoryDetail();
      if (result.data) {
        setPredictData(result.data);
      } else {
        toast.error("No detail found for this history.");
      }
    } catch {
      toast.error("Failed to fetch history detail.");
    }
  };
  useEffect(() => {
    if (recordId !== 0) {
      historyDetail();
    }
  }, [recordId]);

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
        histories,
        chatHistories,
        sendChat,
        isChatting,
        historyDetail,
        recordId,
        setRecordId,
      }}
    >
      {children}
    </Context.Provider>
  );
};
