import ChatBox from "./components/ChatBox";
import DetectInformation from "./components/DetectInformation";
import DetectionHistory from "./components/DetectionHistory";
import ImageChooser from "./components/ImageChooser";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full">
      <ChatBox />
      <div className="h-16 text-[40px] bg-primary grid place-items-center">
        <h1 className="text-white text-center font-bold tracking-wider">
          Leaf Scan AI
        </h1>
      </div>
      <div className="w-full mx-auto h-full flex justify-center">
        <div className="max-w-7xl h-full w-full flex">
          <div className="flex-1 grid h-full place-items-center">
            <ImageChooser />
            <DetectionHistory />
          </div>
          <div className="w-2/5 p-5 h-[calc(100vh-64px)]">
            <div className="h-full overflow-auto">
              <DetectInformation />
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
