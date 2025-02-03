"use client";

import React, { useState } from "react";
import BottomNav from "../components/BottomNav";
import { getSupabaseClient } from "../utils/supabase/client"; // Corrected import path

const UploadVideo = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Please select a file to upload.");
      return;
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      setError("Supabase client is not initialized.");
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const fileName = `${Date.now()}_${selectedFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("videos")
        .upload(fileName, selectedFile);

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const { data: publicUrlData } = supabase.storage
        .from("videos")
        .getPublicUrl(fileName);
      const videoUrl = publicUrlData.publicUrl;

      const { data: insertData, error: insertError } = await supabase
        .from("videos")
        .insert([{ url: videoUrl, fileName }]);

      if (insertError) {
        throw new Error(insertError.message);
      }

      setSuccess("File uploaded and database entry created successfully!");
    } catch (error) {
      if (error instanceof Error) {
        setError(`Error: ${error.message}`);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
      <BottomNav />
    </div>
  );
};

export default UploadVideo;
