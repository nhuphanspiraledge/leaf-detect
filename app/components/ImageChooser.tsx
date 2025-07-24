"use client";

import { useEffect, useRef, useState } from "react";
import { useMyContext } from "../Provider";
import toast from "react-hot-toast";

const ImageChooser = () => {
  const { image, setImage, predict, isPredicting, predictData } =
    useMyContext();
  const [uploadedImg, setUploadedImg] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const loadFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }
    setImage(file);
    setUploadedImg(URL.createObjectURL(file));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      loadFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      loadFile(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (image) {
      predict();
    }
  }, [image]);

  return (
    <div className="flex flex-col items-center w-full p-6 gap-6">
      {/* Upload Area */}
      <div
        className="w-full max-w-md border border-dashed border-gray-400 rounded-xl bg-white text-center py-8 px-6"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-gray-600">Choose a file or drag it here</p>
          <p className="text-xs text-gray-400 mb-2 ">JPEG, PNG up to 5 MB</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex cursor-pointer items-center gap-1 px-4 py-2 text-sm font-medium text-primary border border-primary rounded hover:bg-primary hover:text-white transition"
          >
            📤 Upload your leaf
          </button>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
        />
      </div>
      <div className="flex gap-4">
        {/* Detection Preview */}
        {image && (
          <div className="w-full border border-gray-300 rounded-lg bg-white p-1 pr-10 flex gap-6 items-center shadow">
            <div
              className="w-[180px] h-[180px] rounded-md border border-gray-200 bg-gray-100 bg-cover bg-center"
              style={{ backgroundImage: `url(${uploadedImg})` }}
            />

            <div className="flex-1 text-base text-gray-700">
              {isPredicting ? (
                <>
                  <p className="text-xl font-bold text-primary mb-2">
                    Detecting...
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-primary h-4 rounded-full"
                      style={{
                        width: "60%",
                        transition: "width 2s ease-in-out",
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <p className="font-semibold text-lg text-gray-800 mb-1">
                    Detection:&nbsp;
                    {predictData?.disease_name ??
                      predictData?.plant ??
                      predictData?.top_prediction ??
                      "Unknown"}
                  </p>
                </>
              )}
            </div>
          </div>
        )}
        {!isPredicting && predictData?.heatmap && (
          <div className="w-full border border-gray-300 rounded-lg bg-white p-1 flex gap-6 items-center shadow">
            <img
              src={`data:image/png;base64,${predictData.heatmap}`}
              alt="Heatmap"
              className="w-[180px] h-[180px] rounded-md border border-gray-200 object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageChooser;
