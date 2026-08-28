import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Trophy, Clock } from "lucide-react";

export default function StudentDashboard() {
  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">My Learning Dashboard</h1>
        <Button>Browse New Courses</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">2 courses in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed Lessons</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Study Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12h 30m</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder for Enrolled Courses List */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Continue Learning</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <Card key={item} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-lg">Introduction to React {item}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-secondary h-2 rounded-full mb-4">
                <div className="bg-primary h-2 rounded-full" style={{ width: "60%" }}></div>
              </div>
              <Button variant="outline" className="w-full">
                Resume Course
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
