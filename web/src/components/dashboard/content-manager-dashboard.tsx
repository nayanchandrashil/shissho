"use client";

import { CourseManagement } from "./course-management";
import { LayoutDashboard, BookOpen } from "lucide-react";

export function ContentManagerDashboard({
  initialCourses,
  token,
  instructors = [],
}: {
  initialCourses: any[];
  token: string;
  instructors?: any[];
}) {
  return (
    <div className="min-h-screen bg-[#FAF7EF] font-sans">
      <div className="relative bg-[#16152E] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 35px, #E3A43D 36px)",
          }}
        />
        <div className="absolute -top-[40%] -right-[5%] w-[45%] h-[140%] rounded-full bg-[#2F8F7E]/15 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-12 pb-24">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E3A43D] mb-3">
            <LayoutDashboard className="w-3.5 h-3.5" />
            Content Manager
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight">Content Workspace</h1>
          <p className="text-slate-400 mt-2 text-base max-w-xl">Oversee, manage, and scale the platform curriculum.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 -mt-14 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-[0_8px_30px_-12px_rgba(22,21,46,0.15)] flex items-center gap-4 sm:col-span-1">
            <div className="w-12 h-12 rounded-xl bg-[#2F8F7E]/10 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6 text-[#2F8F7E]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#55526C] uppercase tracking-wide">Total Courses</p>
              <p className="font-serif text-2xl font-bold text-[#16152E] mt-0.5">{initialCourses.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 space-y-6">
        <CourseManagement initialCourses={initialCourses} token={token} instructors={instructors} />
      </div>
    </div>
  );
}
