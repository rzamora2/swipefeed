import VideoFeed from "./components/VideoFeed";
import BottomNav from "./components/BottomNav";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <VideoFeed />
      <BottomNav />
    </main>
  );
}
