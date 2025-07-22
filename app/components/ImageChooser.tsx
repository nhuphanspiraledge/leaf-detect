"use client";
import { useEffect, useRef, useState } from "react";
import { useMyContext } from "../Provider";
import toast from "react-hot-toast";

const ImageChooser = () => {
  const { image, setImage, predict, isPredicting } = useMyContext();
  const [uploadedImg, setUploadedImg] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file");
        return;
      }
      setImage(file);
      setUploadedImg(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (!image) toast.error("Upload your leaf for detection.");
  }, [image]);

  return (
    <div className="flex flex-col gap-6 items-center p-6">
      <div
        className="w-[350px] h-[300px] border border-gray-200 rounded-xl overflow-hidden relative group bg-gray-50 hover:bg-gray-100 transition"
        style={{
          backgroundImage: uploadedImg ? `url(${uploadedImg})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 group-hover:bg-black/5 transition-all duration-300 ease-in-out flex flex-col items-center justify-center text-white ${
            uploadedImg
              ? "bg-black/20 opacity-0 group-hover:opacity-100"
              : "opacity-100"
          }`}
        >
          <span className="text-sm font-medium text-gray-500">
            Choose a file or drag & drop it here
          </span>
          <span className="text-xs text-gray-400">JPEG, PNG up to 5MB</span>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-3 cursor-pointer text-primary font-semibold text-base bg-white/90 hover:bg-white px-5 py-2 rounded-lg shadow backdrop-blur transition"
          >
            📤 Upload your leaf
          </button>
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={loadFile}
          className="hidden"
          ref={fileInputRef}
        />
      </div>

      {image && (
        <div className="flex gap-2">
          <button
            onClick={() => predict("plantvillage")}
            disabled={isPredicting}
            className="rounded-sm bg-primary/90 hover:bg-primary disabled:bg-primary/40 py-1.5 px-4 enabled:cursor-pointer text-white"
          >
            Detect Leaf
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageChooser;
