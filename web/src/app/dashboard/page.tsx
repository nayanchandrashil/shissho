import StudentDashboard from "@/components/dashboard/student-dashboard";
import { ProtectedNavbar } from "@/components/layout/protected-navbar";

export default function StudentPage() {
  return (
    <>
      <ProtectedNavbar />
      <StudentDashboard />
    </>
  );
}
