"use client";

import { useState } from "react";
import { CourseManagement } from "./course-management";
import { updateUserRole } from "@/lib/api/admin";
import { Users, BookOpen, GraduationCap, ShieldCheck } from "lucide-react";

export function AdminDashboard({
  initialCourses,
  token,
  instructors = [],
  adminData,
}: {
  initialCourses: any[];
  token: string;
  instructors?: any[];
  adminData: any;
}) {
  const [users, setUsers] = useState(adminData.users);
  const [loadingId, setLoadingId] = useState<string | number | null>(null);
  const [activeTab, setActiveTab] = useState<"users" | "courses">("users");

  const roles = adminData.roles;
  const stats = adminData.stats;
  const currentUserId = adminData.currentUserId;

  const handleRoleChange = async (userId: string | number, newRoleId: string) => {
    if (!newRoleId) return;
    setLoadingId(userId);
    try {
      const updatedUser = await updateUserRole(userId, newRoleId, token);
      setUsers(users.map((u: any) => (u.id === userId ? { ...u, role: updatedUser.role } : u)));
    } catch (error: any) {
      alert(error.message || "Failed to update user role");
    } finally {
      setLoadingId(null);
    }
  };

  const roleBadgeClasses = (roleName: string | undefined) => {
    switch (roleName) {
      case "Admin":
        return "bg-[#E3A43D]/15 text-[#a8781f] ring-1 ring-[#E3A43D]/20";
      case "Instructor":
        return "bg-[#2F8F7E]/15 text-[#256f64] ring-1 ring-[#2F8F7E]/20";
      case "Content-Manager":
        return "bg-[#16152E]/8 text-[#16152E] ring-1 ring-[#16152E]/10";
      default:
        return "bg-slate-100 text-slate-600 ring-1 ring-slate-200";
    }
  };

  const avatarPalette = ["#E3A43D", "#2F8F7E", "#16152E", "#a8781f"];
  const avatarColor = (id: number) => avatarPalette[id % avatarPalette.length];

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
            <ShieldCheck className="w-3.5 h-3.5" />
            Super Admin
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight">Admin Dashboard</h1>
          <p className="text-slate-400 mt-2 text-base max-w-xl">
            A system-wide view of users, courses, and enrollments &mdash; and the controls to manage them.
          </p>
        </div>
      </div>

      {/* Stat cards float over the banner edge for a layered, modern feel */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 -mt-14 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-[0_8px_30px_-12px_rgba(22,21,46,0.15)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#2F8F7E]/10 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-[#2F8F7E]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#55526C] uppercase tracking-wide">Total Users</p>
              <p className="font-serif text-2xl font-bold text-[#16152E] mt-0.5">{stats.totalUsers}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-[0_8px_30px_-12px_rgba(22,21,46,0.15)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#E3A43D]/10 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6 text-[#c98f2f]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#55526C] uppercase tracking-wide">Total Courses</p>
              <p className="font-serif text-2xl font-bold text-[#16152E] mt-0.5">{stats.totalCourses}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-[0_8px_30px_-12px_rgba(22,21,46,0.15)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#16152E]/8 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6 text-[#16152E]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#55526C] uppercase tracking-wide">Total Enrollments</p>
              <p className="font-serif text-2xl font-bold text-[#16152E] mt-0.5">{stats.totalEnrollments}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Body ---------- */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 space-y-6">
        {/* Pill-style tabs, modern SaaS pattern */}
        <div className="inline-flex items-center gap-1 bg-white border border-black/5 rounded-full p-1 shadow-sm">
          <button
            onClick={() => setActiveTab("users")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeTab === "users" ? "bg-[#16152E] text-white" : "text-[#55526C] hover:text-[#16152E]"
            }`}
          >
            User Management
          </button>
          <button
            onClick={() => setActiveTab("courses")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeTab === "courses" ? "bg-[#16152E] text-white" : "text-[#55526C] hover:text-[#16152E]"
            }`}
          >
            Course Management
          </button>
        </div>

        {activeTab === "users" && (
          <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-black/5 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-lg font-bold text-[#16152E]">User Role Management</h2>
                <p className="text-sm text-[#55526C] mt-0.5">Assign roles to control what each person can access.</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-[#55526C] border-b border-black/5">
                  <tr>
                    <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wide">User</th>
                    <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wide">Email</th>
                    <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wide">Current Role</th>
                    <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wide">Change Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {users.map((user: any) => (
                    <tr key={user.id} className="hover:bg-[#FAF7EF]/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                            style={{ backgroundColor: avatarColor(user.id) }}
                          >
                            {user.username?.[0]?.toUpperCase() || "?"}
                          </div>
                          <span className="font-semibold text-[#16152E]">
                            {user.username}
                            {user.id === currentUserId && (
                              <span className="text-[#2F8F7E] text-xs ml-2 font-normal">(You)</span>
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#55526C]">{user.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${roleBadgeClasses(user.role?.name)}`}
                        >
                          {user.role?.name || "No Role"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          disabled={loadingId === user.id || user.id === currentUserId}
                          value={user.role?.id || ""}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className={`bg-white border border-black/10 text-[#16152E] text-sm rounded-lg focus:ring-2 focus:ring-[#E3A43D] focus:border-[#E3A43D] block w-full max-w-[180px] p-2 outline-none transition-shadow ${
                            user.id === currentUserId ? "bg-slate-50 cursor-not-allowed opacity-60" : ""
                          } ${loadingId === user.id ? "opacity-50" : ""}`}
                        >
                          <option value="" disabled>
                            Select Role
                          </option>
                          {roles.map((role: any) => (
                            <option key={role.id} value={role.id}>
                              {role.name}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "courses" && (
          <div className="pt-1">
            <CourseManagement initialCourses={initialCourses} token={token} instructors={instructors} />
          </div>
        )}
      </div>
    </div>
  );
}
