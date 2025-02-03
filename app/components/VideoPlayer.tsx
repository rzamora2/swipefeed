import React, { useRef } from "react";

interface VideoPlayerProps {
  video: {
    id: string; // or number, depending on your video ID type
    file_url: string;
    // Add other properties as needed
  };
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <video
      key={video.id}
      ref={videoRef}
      className="w-full h-full"
      preload="auto"
      src={video.file_url}
      autoPlay
      loop
      onClick={handleVideoClick}
      onError={(e) => console.error("Error loading video:", e)} // Debugging log
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
