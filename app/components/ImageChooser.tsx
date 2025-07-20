"use client";
import { useRef, useState } from "react";
import { useMyContext } from "../Provider";

const ImageChooser = () => {
  const { image, setImage, predict, isPredicting } = useMyContext();
  const [uploadedImg, setUploadedImg] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const loadFile = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setUploadedImg(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex justify-center flex-col gap-5 items-center ">
      <div className="relative rounded-full overflow-hidden group w-[350px] h-[350px]">
        <img
          src={
            uploadedImg ??
            "https://cdn.pixabay.com/photo/2017/08/06/21/01/louvre-2596278_960_720.jpg"
          }
          alt="leaf-image"
          className=" w-full h-full object-cover shadow-[0_0_10px_rgba(255,255,255,0.35)]"
        />
        <label
          htmlFor="file"
          className="cursor-pointer absolute bottom-0 w-full h-32 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 bg-black/80 text-white z-10 "
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl">📷</span>
            <span className="text-xl">Upload your leaf</span>
          </div>
        </label>
        <input
          id="file"
          type="file"
          onChange={loadFile}
          className="hidden"
          ref={fileInputRef}
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => predict("plantdoc")}
          disabled={isPredicting}
          className="rounded-sm bg-primary/90 hover:bg-primary disabled:bg-primary/40 py-1.5 px-4 enabled:cursor-pointer text-white"
        >
          Detect by Plant Doc
        </button>
        <button
          onClick={() => predict("plantvillage")}
          disabled={isPredicting}
          className="rounded-sm bg-primary/90 hover:bg-primary disabled:bg-primary/40 py-1.5 px-4 enabled:cursor-pointer text-white"
        >
          Detect by Plant Village
        </button>
      </div>
    </div>
  );
};
export default ImageChooser;
