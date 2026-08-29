"use client";

import { useState } from "react";
import { createCourse, updateCourse, deleteCourse } from "@/lib/api/courses";
import { createLesson, updateLesson, deleteLesson } from "@/lib/api/lessons";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowLeft, Pencil, Trash2, PlayCircle } from "lucide-react";

export function CourseManagement({
  initialCourses,
  token,
  instructors = [],
}: {
  initialCourses: any[];
  token: string;
  instructors?: any[];
}) {
  const [courses, setCourses] = useState(initialCourses);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editInstructorId, setEditInstructorId] = useState("");

  const [activeCourse, setActiveCourse] = useState<any | null>(null);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [lessonVideoUrl, setLessonVideoUrl] = useState("");
  const [lessonLoading, setLessonLoading] = useState(false);

  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [editLessonTitle, setEditLessonTitle] = useState("");
  const [editLessonContent, setEditLessonContent] = useState("");
  const [editLessonVideoUrl, setEditLessonVideoUrl] = useState("");

  const inputClasses =
    "w-full px-4 py-2.5 bg-white border border-black/10 rounded-lg focus:ring-2 focus:ring-[#E3A43D] focus:border-[#E3A43D] transition-all outline-none text-[#16152E] placeholder:text-[#55526C]/50";

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload: any = { title, description };
      if (instructorId) payload.instructor = instructorId;

      const res = await createCourse(payload, token);
      if (res.data) {
        const selectedInst = instructors.find((inst: any) => inst.id.toString() === instructorId.toString());

        setCourses([
          ...courses,
          {
            ...res.data,
            lessons: [],
            instructor: selectedInst ? { id: selectedInst.id, username: selectedInst.username } : null,
          },
        ]);

        setTitle("");
        setDescription("");
        setInstructorId("");
      }
    } catch (error) {
      console.error("Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCourse = async (documentId: string) => {
    try {
      const payload: any = { title: editTitle, description: editDescription };
      if (editInstructorId) payload.instructor = editInstructorId;

      const res = await updateCourse(documentId, payload, token);
      if (res.data) {
        const selectedInst = instructors.find((inst: any) => inst.id.toString() === editInstructorId.toString());

        setCourses(
          courses.map((course) =>
            course.documentId === documentId
              ? {
                  ...res.data,
                  lessons: course.lessons,
                  instructor: selectedInst ? { id: selectedInst.id, username: selectedInst.username } : null,
                }
              : course,
          ),
        );
        setEditingId(null);
      }
    } catch (error) {
      console.error("Failed to update course");
    }
  };

  const handleDeleteCourse = async (documentId: string) => {
    try {
      await deleteCourse(documentId, token);
      setCourses(courses.filter((course) => course.documentId !== documentId));
      if (activeCourse?.documentId === documentId) setActiveCourse(null);
    } catch (error) {
      console.error("Failed to delete course");
    }
  };

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCourse) return;
    setLessonLoading(true);
    try {
      const res = await createLesson(
        {
          title: lessonTitle,
          content: lessonContent,
          videourl: lessonVideoUrl || undefined,
          course: activeCourse.documentId,
        },
        token,
      );

      if (res.data) {
        const updatedCourse = {
          ...activeCourse,
          lessons: [...(activeCourse.lessons || []), res.data],
        };
        setActiveCourse(updatedCourse);
        setCourses(courses.map((c) => (c.documentId === activeCourse.documentId ? updatedCourse : c)));
        setLessonTitle("");
        setLessonContent("");
        setLessonVideoUrl("");
      }
    } catch (error) {
      console.error("Failed to create lesson:", error);
    } finally {
      setLessonLoading(false);
    }
  };

  const handleUpdateLesson = async (documentId: string) => {
    try {
      const res = await updateLesson(
        documentId,
        {
          title: editLessonTitle,
          content: editLessonContent,
          videourl: editLessonVideoUrl || undefined,
        },
        token,
      );

      if (res.data && activeCourse) {
        const updatedLessons = activeCourse.lessons.map((l: any) => (l.documentId === documentId ? res.data : l));
        const updatedCourse = { ...activeCourse, lessons: updatedLessons };
        setActiveCourse(updatedCourse);
        setCourses(courses.map((c) => (c.documentId === activeCourse.documentId ? updatedCourse : c)));
        setEditingLessonId(null);
      }
    } catch (error) {
      console.error("Failed to update lesson");
    }
  };

  const handleDeleteLesson = async (documentId: string) => {
    try {
      await deleteLesson(documentId, token);
      if (activeCourse) {
        const updatedLessons = activeCourse.lessons.filter((l: any) => l.documentId !== documentId);
        const updatedCourse = { ...activeCourse, lessons: updatedLessons };
        setActiveCourse(updatedCourse);
        setCourses(courses.map((c) => (c.documentId === activeCourse.documentId ? updatedCourse : c)));
      }
    } catch (error) {
      console.error("Failed to delete lesson");
    }
  };

  if (activeCourse) {
    return (
      <div className="bg-transparent mt-8">
        <div className="space-y-6">
          <Button
            onClick={() => setActiveCourse(null)}
            variant="outline"
            className="border-black/10 text-[#16152E] hover:bg-white transition-colors gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Course List
          </Button>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5">
            <div className="border-b border-black/5 pb-4 mb-6">
              <h2 className="font-serif text-2xl font-bold text-[#16152E]">{activeCourse.title}</h2>
              <p className="text-[#55526C] mt-1">Manage lessons for this course</p>
            </div>

            <form onSubmit={handleCreateLesson} className="space-y-5 bg-[#FAF7EF] p-6 rounded-xl border border-black/5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-semibold text-[#16152E] mb-2">Lesson Title</label>
                  <input
                    required
                    type="text"
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    className={inputClasses}
                    placeholder="e.g. Introduction to React"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-semibold text-[#16152E] mb-2">Video URL (Optional)</label>
                  <input
                    type="url"
                    value={lessonVideoUrl}
                    onChange={(e) => setLessonVideoUrl(e.target.value)}
                    className={inputClasses}
                    placeholder="https://youtube.com/..."
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-[#16152E] mb-2">Text Content</label>
                  <textarea
                    required
                    value={lessonContent}
                    onChange={(e) => setLessonContent(e.target.value)}
                    className={`${inputClasses} min-h-[120px]`}
                    placeholder="Write lesson details here..."
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={lessonLoading}
                  className="bg-[#E3A43D] hover:bg-[#cf9333] text-[#16152E] font-semibold px-6"
                >
                  {lessonLoading ? "Adding Lesson..." : "Add New Lesson"}
                </Button>
              </div>
            </form>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#16152E] px-1">Curriculum</h3>
            {!activeCourse.lessons || activeCourse.lessons.length === 0 ? (
              <div className="bg-white p-10 rounded-2xl shadow-sm border border-black/5 text-center">
                <p className="text-[#55526C]">No lessons added to this course yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeCourse.lessons.map((lesson: any, index: number) => (
                  <div
                    key={lesson.documentId}
                    className="bg-white p-6 rounded-xl shadow-sm border border-black/5 hover:shadow-md transition-shadow"
                  >
                    {editingLessonId === lesson.documentId ? (
                      <div className="space-y-4">
                        <input
                          value={editLessonTitle}
                          onChange={(e) => setEditLessonTitle(e.target.value)}
                          className={inputClasses}
                        />
                        <textarea
                          value={editLessonContent}
                          onChange={(e) => setEditLessonContent(e.target.value)}
                          className={`${inputClasses} text-sm min-h-[100px]`}
                        />
                        <input
                          value={editLessonVideoUrl}
                          onChange={(e) => setEditLessonVideoUrl(e.target.value)}
                          className={inputClasses}
                        />
                        <div className="flex gap-3">
                          <Button
                            onClick={() => handleUpdateLesson(lesson.documentId)}
                            className="bg-[#2F8F7E] hover:bg-[#256f64] text-white"
                          >
                            Save Changes
                          </Button>
                          <Button
                            onClick={() => setEditingLessonId(null)}
                            variant="outline"
                            className="border-black/10 text-[#16152E]"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-serif text-lg font-bold text-[#16152E]">
                            <span className="font-mono text-sm text-[#c98f2f] mr-2">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            {lesson.title}
                          </h4>
                          <div className="flex gap-2 shrink-0">
                            <Button
                              size="sm"
                              onClick={() => {
                                setEditingLessonId(lesson.documentId);
                                setEditLessonTitle(lesson.title);
                                setEditLessonContent(lesson.content);
                                setEditLessonVideoUrl(lesson.videourl || lesson.videoUrl || "");
                              }}
                              variant="outline"
                              className="border-[#2F8F7E]/30 text-[#2F8F7E] hover:bg-[#2F8F7E]/10 gap-1.5"
                            >
                              <Pencil className="w-3.5 h-3.5" /> Edit
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleDeleteLesson(lesson.documentId)}
                              className="bg-rose-500 hover:bg-rose-600 text-white gap-1.5"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Delete
                            </Button>
                          </div>
                        </div>
                        <p className="text-[#55526C] whitespace-pre-wrap mb-4 text-sm leading-relaxed bg-[#FAF7EF] p-4 rounded-lg">
                          {lesson.content}
                        </p>
                        {(lesson.videourl || lesson.videoUrl) && (
                          <a
                            href={lesson.videourl || lesson.videoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2F8F7E] hover:text-[#256f64] hover:underline"
                          >
                            <PlayCircle className="w-4 h-4" /> Watch Video Material &rarr;
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent mt-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 sticky top-6">
            <h2 className="font-serif text-xl font-bold text-[#16152E] mb-6">Create New Course</h2>
            <form onSubmit={handleCreateCourse} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#16152E] mb-2">Course Title</label>
                <input
                  required
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={inputClasses}
                  placeholder="e.g. Advanced TypeScript"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#16152E] mb-2">Description</label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`${inputClasses} min-h-[120px]`}
                  placeholder="What will students learn?"
                />
              </div>

              {instructors.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-[#16152E] mb-2">Assign Instructor</label>
                  <select
                    value={instructorId}
                    onChange={(e) => setInstructorId(e.target.value)}
                    className={inputClasses}
                  >
                    <option value="">Select an instructor...</option>
                    {instructors.map((inst: any) => (
                      <option key={inst.id} value={inst.id}>
                        {inst.username}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#E3A43D] hover:bg-[#cf9333] text-[#16152E] py-6 rounded-xl font-semibold text-md transition-all"
              >
                {loading ? "Publishing..." : "Publish Course"}
              </Button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#16152E] flex items-center justify-between">
            Course Library
            <span className="font-sans bg-[#2F8F7E]/10 text-[#256f64] text-sm py-1 px-3 rounded-full">
              {courses.length} Total
            </span>
          </h2>

          {courses.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-black/5 text-center flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-16 h-16 bg-[#E3A43D]/10 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-7 h-7 text-[#c98f2f]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#16152E] mb-1">No courses found</h3>
              <p className="text-[#55526C]">Get started by creating your first course on the left.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              {courses.map((course) => (
                <div
                  key={course.documentId}
                  className="bg-white rounded-2xl shadow-sm border border-black/5 hover:border-[#E3A43D]/40 hover:shadow-md transition-all flex flex-col overflow-hidden"
                >
                  {editingId === course.documentId ? (
                    <div className="p-5 flex flex-col h-full space-y-4">
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className={inputClasses}
                      />
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className={`${inputClasses} text-sm min-h-[100px] flex-1`}
                      />

                      {instructors.length > 0 && (
                        <select
                          value={editInstructorId}
                          onChange={(e) => setEditInstructorId(e.target.value)}
                          className={`${inputClasses} text-sm`}
                        >
                          <option value="">Select an instructor...</option>
                          {instructors.map((inst: any) => (
                            <option key={inst.id} value={inst.id}>
                              {inst.username}
                            </option>
                          ))}
                        </select>
                      )}

                      <div className="grid grid-cols-2 gap-2 mt-auto pt-2">
                        <Button
                          onClick={() => handleUpdateCourse(course.documentId)}
                          className="w-full bg-[#2F8F7E] hover:bg-[#256f64] text-white"
                        >
                          Save
                        </Button>
                        <Button
                          onClick={() => setEditingId(null)}
                          variant="outline"
                          className="w-full border-black/10 text-[#16152E] hover:bg-[#FAF7EF]"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 flex flex-col h-full">
                      <div className="mb-4 flex-1">
                        <h3 className="font-serif font-bold text-lg text-[#16152E] mb-2 leading-tight">
                          {course.title}
                        </h3>
                        <p className="text-sm text-[#55526C] line-clamp-3 leading-relaxed">{course.description}</p>
                      </div>

                      {course.instructor?.username && (
                        <div className="mb-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#E3A43D]/10 text-[#a8781f] text-xs font-semibold border border-[#E3A43D]/20">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            {course.instructor.username}
                          </span>
                        </div>
                      )}

                      <div className="space-y-2 mt-auto border-t border-black/5 pt-4">
                        <Button
                          onClick={() => setActiveCourse(course)}
                          className="w-full bg-[#16152E] hover:bg-[#232047] text-white shadow-sm transition-colors"
                        >
                          Manage Lessons
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            onClick={() => {
                              setEditingId(course.documentId);
                              setEditTitle(course.title);
                              setEditDescription(course.description);
                              setEditInstructorId(course.instructor?.id || "");
                            }}
                            variant="outline"
                            className="w-full border-[#2F8F7E]/30 text-[#2F8F7E] hover:bg-[#2F8F7E]/10"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDeleteCourse(course.documentId)}
                            variant="outline"
                            className="w-full border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
