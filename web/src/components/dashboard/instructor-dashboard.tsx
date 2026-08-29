"use client";

import { CourseManagement } from "./course-management";
import { GraduationCap } from "lucide-react";

export function InstructorDashboard({ initialCourses, token }: { initialCourses: any[]; token: string }) {
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

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 pt-12 pb-14">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E3A43D] mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            Instructor
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight">Instructor Dashboard</h1>
          <p className="text-slate-400 mt-2 text-base max-w-xl">Welcome back! Manage your courses and lessons below.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-10 space-y-6">
        <CourseManagement initialCourses={initialCourses} token={token} />
      </div>
    </div>
  );
}
