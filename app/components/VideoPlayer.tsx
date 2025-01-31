"use client";

import { useState, useRef } from "react";
import { Heart, MessageCircle, Share } from "lucide-react";

interface Video {
  id: string;
  url: string;
  // username: string;
  // description: string;
}

interface VideoPlayerProps {
  video: Video;
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const [isLiked, setIsLiked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch((error) => {
          console.error("Error attempting to play video:", error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div
      className="relative w-full h-full max-w-md max-h-full"
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={video.url}
        className="w-full h-full object-contain"
        loop
        playsInline
      >
        <source src={video.url} type="video/mp4" />
        <source src={video.url} type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute bottom-20 left-4 text-white">
        {/* Uncomment and use these lines if you have username and description */}
        {/* <h2 className="text-lg font-bold">{video.username}</h2> */}
        {/* <p className="text-sm">{video.description}</p> */}
      </div>
      <div className="absolute bottom-20 right-4 flex flex-col items-center gap-4">
        <button
          className={`p-2 rounded-full ${
            isLiked ? "bg-red-500" : "bg-gray-800"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
        >
          <Heart className="text-white" />
        </button>
        <button className="p-2 rounded-full bg-gray-800">
          <MessageCircle className="text-white" />
        </button>
        <button className="p-2 rounded-full bg-gray-800">
          <Share className="text-white" />
        </button>
      </div>
    </div>
  );
}
