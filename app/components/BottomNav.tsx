"use client";

import { Home, Search, PlusSquare, MessageCircle, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BottomNav() {
  const router = useRouter();

  const handleUploadClick = () => {
    console.log("Upload button clicked"); // Debugging log
    router.push("/upload"); // Navigate to the Upload Video Page
  };
  const handleHomePageClick = () => {
    console.log("HomePage button clicked"); // Debugging log
    router.push("/"); // Navigate to the HomePage
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-4 pointer-events-none">
      <ul className="flex justify-around items-center">
        <li>
          <button
            className="flex flex-col items-center pointer-events-auto"
            onClick={handleHomePageClick} // Handle click event
          >
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Home Page</span>
          </button>
        </li>
        <li>
          <button className="flex flex-col items-center pointer-events-auto">
            <Search className="w-6 h-6" />
            <span className="text-xs mt-1">Discover</span>
          </button>
        </li>
        <li>
          <button
            className="flex flex-col items-center pointer-events-auto"
            // onClick={handleUploadClick} // Handle click event
          >
            <PlusSquare className="w-8 h-8" />
          </button>
        </li>
        <li>
          <button className="flex flex-col items-center pointer-events-auto">
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs mt-1">Inbox</span>
          </button>
        </li>
        <li>
          <button className="flex flex-col items-center pointer-events-auto">
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">Me</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
