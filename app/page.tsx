import DetectInformation from "./components/DetectInformation";
import ImageChooser from "./components/ImageChooser";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="h-16 bg-primary"></div>
      <div className=" w-full mx-auto h-full flex justify-center">
        <div className="max-w-7xl h-full w-full flex">
          <div className="w-2/3 grid place-items-center">
            <ImageChooser />
          </div>
          <div className=" w-1/3 h-[calc(100vh-64px)]">
            <div className="h-full p-5 overflow-auto">
              <DetectInformation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
