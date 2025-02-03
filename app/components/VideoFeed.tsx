"use client";

import React, { useEffect, useState, useRef } from "react";
import VideoPlayer from "./VideoPlayer";
import { getSupabaseClient } from "../utils/supabase/client";

interface Video {
  id: string; // or number, depending on your video ID type
  file_url: string;
  // Add other properties as needed
}

const VideoFeed: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const supabase = getSupabaseClient(); // Initialize the Supabase client

  console.log("Supabase client initialized:", supabase); // Debugging log

  useEffect(() => {
    console.log("fetchVideos function called"); // Debugging log

    const fetchVideos = async () => {
      console.log("Inside fetchVideos function"); // Debugging log

      const { data, error } = await supabase
        .from("videos") // Replace with your table name
        .select("*");

      if (error) {
        console.error("Error fetching videos:", error);
      } else {
        console.log("Fetched videos:", data); // Debugging log
        if (data.length === 0) {
          console.warn("No videos found in the database.");
        }
        const videoData = data.map((video: Video) => ({
          id: video.id,
          file_url: video.file_url, // Ensure this matches the column name in your database
          // username: video.username,
          // description: video.description,
        }));
        console.log("Video data:", videoData); // Debugging log
        setVideos(videoData);
      }
    };

    fetchVideos();
  }, [supabase]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          video.currentTime = 0; // Reset video to start from the beginning
          video.play().catch((error) => {
            console.error("Error attempting to play video:", error);
          });
        } else {
          video.pause();
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    const videoElements = document.querySelectorAll("video");
    videoElements.forEach((video) => {
      observerRef.current?.observe(video);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [videos]);

  return (
    <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory">
      {videos.map((video) => (
        <div
          key={video.id}
          className="w-full h-screen snap-start flex justify-center items-center"
        >
          <VideoPlayer video={video} />
        </div>
      ))}
    </div>
  );
};

export default VideoFeed;
