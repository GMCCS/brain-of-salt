import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LIGHT, DARK } from "./theme";
import { loadProgress, saveProgress } from "./storage";
import { useIsMobile } from "./hooks/useIsMobile";
import { HomePage } from "./pages/HomePage";
import { LearnPage } from "./pages/LearnPage";

function RedirectToLesson() {
  const saved = loadProgress();
  return <Navigate to={`/learn/${saved?.activeModuleId ?? 1}/${saved?.activeLessonId ?? "1a"}`} replace />;
}

export default function App() {
  const saved = loadProgress();
  const isMobile = useIsMobile();
  const [dark, setDark] = useState(() => saved?.dark ?? false);
  const T = dark ? DARK : LIGHT;

  useEffect(() => {
    saveProgress({ dark });
  }, [dark]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage dark={dark} setDark={setDark} T={T} isMobile={isMobile} />} />
        <Route path="/learn" element={<RedirectToLesson />} />
        <Route path="/learn/:moduleId/:lessonId" element={<LearnPage dark={dark} setDark={setDark} T={T} saved={saved} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
