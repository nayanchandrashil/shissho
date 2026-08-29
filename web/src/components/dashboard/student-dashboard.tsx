"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { enrollInCourse } from "@/lib/api/enrollments";
import { BookMarked, Compass } from "lucide-react";

export function StudentDashboard({
  allCourses,
  initialEnrollments,
  token,
}: {
  allCourses: any[];
  initialEnrollments: any[];
  token: string;
}) {
  const router = useRouter();
  const [enrollments, setEnrollments] = useState(initialEnrollments);
  const [activeTab, setActiveTab] = useState<"available" | "enrolled">("available");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Only keep enrollments that actually have a valid course attached —
  // guards against orphaned/empty enrollment records showing blank cards.
  const validEnrollments = enrollments.filter((e: any) => e.course);
  const enrolledCourseIds = validEnrollments.map((e: any) => e.course?.documentId);

  const handleEnroll = async (courseId: string) => {
    setLoadingId(courseId);
    try {
      const res = await enrollInCourse(courseId, token);
      if (res.data) {
        const enrolledCourse = allCourses.find((c) => c.documentId === courseId);
        setEnrollments([...enrollments, { ...res.data, course: enrolledCourse }]);
        setActiveTab("enrolled");
      }
    } catch (error: any) {
      alert(error.message || "Failed to enroll. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7EF] font-sans">
      {/* ---------- Top banner ---------- */}
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
            <Compass className="w-3.5 h-3.5" />
            Student
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight">Student Portal</h1>
          <p className="text-slate-400 mt-2 text-base max-w-xl">Explore courses, enroll, and start learning today.</p>
        </div>
      </div>

      {/* Stat card floats over the banner edge, same layered pattern as Admin Dashboard */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 -mt-14 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-[0_8px_30px_-12px_rgba(22,21,46,0.15)] flex items-center gap-4 sm:col-span-1">
            <div className="w-12 h-12 rounded-xl bg-[#2F8F7E]/10 flex items-center justify-center shrink-0">
              <BookMarked className="w-6 h-6 text-[#2F8F7E]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#55526C] uppercase tracking-wide">My Courses</p>
              <p className="font-serif text-2xl font-bold text-[#16152E] mt-0.5">{validEnrollments.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Body ---------- */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 space-y-6">
        {/* Pill-style tabs, same pattern as Admin Dashboard */}
        <div className="inline-flex items-center gap-1 bg-white border border-black/5 rounded-full p-1 shadow-sm">
          <button
            onClick={() => setActiveTab("available")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeTab === "available" ? "bg-[#16152E] text-white" : "text-[#55526C] hover:text-[#16152E]"
            }`}
          >
            Available Courses
          </button>
          <button
            onClick={() => setActiveTab("enrolled")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeTab === "enrolled" ? "bg-[#16152E] text-white" : "text-[#55526C] hover:text-[#16152E]"
            }`}
          >
            My Learning
          </button>
        </div>

        {activeTab === "available" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCourses.map((course) => {
              const isEnrolled = enrolledCourseIds.includes(course.documentId);
              return (
                <div
                  key={course.documentId}
                  className="bg-white rounded-2xl border border-black/5 shadow-sm p-6 flex flex-col h-full min-h-[280px] hover:shadow-[0_8px_30px_-12px_rgba(22,21,46,0.15)] transition-all"
                >
                  <h3 className="font-serif font-bold text-xl text-[#16152E] mb-2">{course.title}</h3>
                  <p className="text-sm text-[#55526C] line-clamp-3 mb-4 flex-1">{course.description}</p>

                  {course.instructor?.username && (
                    <div className="mb-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#16152E]/8 text-[#16152E] text-xs font-semibold">
                        Instructor: {course.instructor.username}
                      </span>
                    </div>
                  )}

                  <Button
                    onClick={() => handleEnroll(course.documentId)}
                    disabled={isEnrolled || loadingId === course.documentId}
                    className={`w-full py-6 rounded-xl font-bold transition-all ${
                      isEnrolled
                        ? "bg-[#2F8F7E]/15 text-[#256f64] hover:bg-[#2F8F7E]/15 cursor-not-allowed"
                        : "bg-[#E3A43D] hover:bg-[#c98f2f] text-[#16152E]"
                    }`}
                  >
                    {isEnrolled ? "✓ Enrolled" : loadingId === course.documentId ? "Enrolling..." : "Enroll Now"}
                  </Button>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "enrolled" && (
          <div>
            {validEnrollments.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-black/5 shadow-sm text-center">
                <p className="text-[#55526C] text-lg">You haven't enrolled in any courses yet.</p>
                <Button
                  onClick={() => setActiveTab("available")}
                  variant="outline"
                  className="mt-4 border-[#E3A43D]/40 text-[#a8781f] hover:bg-[#E3A43D]/10"
                >
                  Browse Courses
                </Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {validEnrollments.map((enrollment: any) => (
                  <div
                    key={enrollment.documentId}
                    className="bg-white rounded-2xl border border-black/5 shadow-sm p-6 flex flex-col h-full min-h-[280px] hover:shadow-[0_8px_30px_-12px_rgba(22,21,46,0.15)] transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-serif font-bold text-xl text-[#16152E]">{enrollment.course?.title}</h3>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-[#E3A43D]/15 text-[#a8781f] ring-1 ring-[#E3A43D]/20 shrink-0 ml-2">
                        ✓ Enrolled
                      </span>
                    </div>
                    <p className="text-sm text-[#55526C] line-clamp-2 mb-4 flex-1">{enrollment.course?.description}</p>
                    <Button
                      onClick={() => router.push(`/dashboard/course?id=${enrollment.course.documentId}`)}
                      className="w-full py-6 rounded-xl font-bold bg-[#16152E] hover:bg-[#16152E]/90 text-white"
                    >
                      Go to Course &rarr;
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
