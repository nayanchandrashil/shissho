"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BookOpenCheck } from "lucide-react";

export function CourseViewer({ course }: { course: any }) {
  const router = useRouter();
  const [activeLesson, setActiveLesson] = useState<any>(course.lessons?.[0] || null);

  const activeLessonVideoUrl = activeLesson?.videourl || activeLesson?.videoUrl || "";

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1]?.split("&")[0];
    } else if (url.includes("embed/")) {
      return url;
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FAF7EF] flex flex-col md:flex-row font-sans">
      {/* ---------- Sidebar (ink, notebook-texture) ---------- */}
      <div className="relative w-full md:w-80 bg-[#16152E] flex flex-col h-auto md:h-[calc(100vh-4rem)] sticky top-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 35px, #E3A43D 36px)",
          }}
        />
        <div className="absolute -top-[20%] -right-[30%] w-[80%] h-[50%] rounded-full bg-[#2F8F7E]/15 blur-[100px] pointer-events-none" />

        <div className="relative z-10 p-6 border-b border-white/10">
          <Button
            onClick={() => router.push("/dashboard")}
            variant="outline"
            className="mb-4 w-full bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white"
          >
            &larr; Back to Dashboard
          </Button>
          <h2 className="font-serif font-bold text-xl text-white leading-tight">{course.title}</h2>
          <p className="text-sm text-slate-400 mt-2 line-clamp-2">{course.description}</p>
        </div>
        <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-2">
          <h3 className="text-xs font-mono font-bold text-[#E3A43D] uppercase tracking-widest mb-4 px-2">
            Course Curriculum
          </h3>
          {!course.lessons || course.lessons.length === 0 ? (
            <p className="text-sm text-slate-400 px-2">No lessons available yet.</p>
          ) : (
            course.lessons.map((lesson: any, index: number) => (
              <button
                key={lesson.documentId}
                onClick={() => setActiveLesson(lesson)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all flex items-start gap-3 ${
                  activeLesson?.documentId === lesson.documentId
                    ? "bg-[#E3A43D]/15 border border-[#E3A43D]/30 text-[#E3A43D] font-semibold"
                    : "hover:bg-white/5 text-slate-300 border border-transparent"
                }`}
              >
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    activeLesson?.documentId === lesson.documentId
                      ? "bg-[#E3A43D] text-[#16152E] font-bold"
                      : "bg-white/10 text-slate-300"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="line-clamp-2 mt-0.5">{lesson.title}</span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* ---------- Lesson content ---------- */}
      <div className="flex-1 p-6 md:p-12 overflow-y-auto h-[calc(100vh-4rem)]">
        <div className="max-w-4xl mx-auto">
          {!activeLesson ? (
            <div className="bg-white p-12 rounded-2xl border border-black/5 shadow-[0_8px_30px_-12px_rgba(22,21,46,0.15)] text-center">
              <div className="w-12 h-12 rounded-xl bg-[#2F8F7E]/10 flex items-center justify-center mx-auto mb-4">
                <BookOpenCheck className="w-6 h-6 text-[#2F8F7E]" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#16152E] mb-2">Welcome to the course!</h2>
              <p className="text-[#55526C]">Please select a lesson from the left menu to start learning.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-black/5 shadow-[0_8px_30px_-12px_rgba(22,21,46,0.15)] overflow-hidden">
              {activeLessonVideoUrl && (
                <div className="w-full aspect-video bg-[#16152E]">
                  <iframe
                    src={getEmbedUrl(activeLessonVideoUrl)}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              <div className="p-8 md:p-12">
                <h1 className="font-serif text-3xl font-extrabold text-[#16152E] mb-6">{activeLesson.title}</h1>
                <div className="prose max-w-none text-[#55526C] whitespace-pre-wrap leading-relaxed">
                  {activeLesson.content}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
