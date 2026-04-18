import { useState, useEffect, useCallback } from "react";
import Navbar       from "./components/Navbar";
import Footer       from "./components/Footer";
import Toast        from "./components/Toast";
import HomePage     from "./pages/HomePage";
import DetailPage   from "./pages/DetailPage";
import TimelinePage from "./pages/TimelinePage";
import StatsPage    from "./pages/StatsPage";
import NotFoundPage from "./pages/NotFoundPage";
import friendsData  from "./data/friends.json";

export default function App() {
  const [page, setPage]                   = useState("home");
  const [currentFriend, setCurrentFriend] = useState(null);
  const [friends]                         = useState(friendsData);
  const [timeline, setTimeline]           = useState([]);
  const [toasts, setToasts]               = useState([]);
  const [loading, setLoading]             = useState(true);

  useEffect(() => {
    // Loading timer
    const t = setTimeout(() => setLoading(false), 1200);

    // URL check — unknown path হলে 404 দেখাবে
    const path = window.location.pathname;
    const validPaths = ["/", "/home", "/timeline", "/stats", "/detail"];
    if (!validPaths.includes(path)) {
      setPage("notfound");
    }

    return () => clearTimeout(t);
  }, []);

  const addTimelineEntry = useCallback((entry) => {
    setTimeline((prev) => [entry, ...prev]);
  }, []);

  const showToast = useCallback(({ icon, message }) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, icon, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  const renderPage = () => {
    if (page === "home") {
      return (
        <HomePage
          friends={friends}
          loading={loading}
          setPage={setPage}
          setCurrentFriend={setCurrentFriend}
        />
      );
    }
    if (page === "detail") {
      return currentFriend ? (
        <DetailPage
          friend={currentFriend}
          setPage={setPage}
          addTimelineEntry={addTimelineEntry}
          showToast={showToast}
        />
      ) : (
        <NotFoundPage setPage={setPage} />
      );
    }
    if (page === "timeline") {
      return <TimelinePage timeline={timeline} />;
    }
    if (page === "stats") {
      return <StatsPage timeline={timeline} friends={friends} />;
    }
    if (page === "notfound") {
      return <NotFoundPage setPage={setPage} />;
    }
    // যেকোনো unknown page
    return <NotFoundPage setPage={setPage} />;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar page={page} setPage={setPage} />
      <main>{renderPage()}</main>
      <Footer />
      <Toast toasts={toasts} />
    </div>
  );
}