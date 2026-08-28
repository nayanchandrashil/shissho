import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpenText, BookOpen, Users, Play, ArrowRight, LayoutDashboard } from "lucide-react";

export function Homepage() {
  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <header className="px-6 h-[72px] flex items-center bg-slate-950 border-b border-white/10 sticky top-0 z-50">
        <Link className="flex items-center gap-2.5" href="/">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <BookOpenText className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-2xl text-white tracking-tight">shissho</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link href="/login">
            <Button
              variant="ghost"
              className="text-slate-300 hover:text-white hover:bg-white/10 font-medium cursor-pointer"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-6 cursor-pointer">
              Get Started
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col">
        <section className="relative bg-slate-950 overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-indigo-600/20 blur-[120px]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8 text-left">
              <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300">
                <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
                The new standard for online learning
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white leading-[1.1]">
                Accelerate your career with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  Expert Guidance
                </span>
              </h1>
              <p className="max-w-lg text-lg text-slate-400 leading-relaxed">
                Join our premium learning management platform. Explore thousands of interactive courses, track your
                progress, and achieve your goals faster.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/signup">
                  <Button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-8 h-12 text-base cursor-pointer">
                    Start Learning Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button
                    variant="outline"
                    className="border-slate-700 text-slate-900 bg-white hover:bg-slate-200 rounded-full px-8 h-12 text-base cursor-pointer"
                  >
                    View Courses
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-2xl blur-2xl opacity-20"></div>
              <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl aspect-video flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-slate-800/50"></div>
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center opacity-40">
                  <div className="h-3 w-24 bg-slate-700 rounded-full"></div>
                  <div className="flex gap-2">
                    <div className="h-3 w-3 bg-slate-700 rounded-full"></div>
                    <div className="h-3 w-3 bg-slate-700 rounded-full"></div>
                  </div>
                </div>
                <div className="h-16 w-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 cursor-pointer group-hover:scale-110 group-hover:bg-indigo-600 transition-all duration-300 z-10">
                  <Play className="h-6 w-6 text-white ml-1" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-slate-50 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 md:max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                Everything you need to succeed
              </h2>
              <p className="text-lg text-slate-600">
                Designed to provide a seamless learning experience, giving you the tools to master new skills
                effortlessly.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="group p-8 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-indigo-200 transition-all duration-300">
                <div className="h-12 w-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
                  <BookOpen className="h-6 w-6 text-indigo-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-3">Premium Courses</h3>
                <p className="text-slate-600 leading-relaxed">
                  Access highly curated, high-quality video content designed by industry leaders and experts.
                </p>
              </div>

              <div className="group p-8 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-cyan-200 transition-all duration-300">
                <div className="h-12 w-12 bg-cyan-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-500 transition-colors duration-300">
                  <Users className="h-6 w-6 text-cyan-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-3">Expert Community</h3>
                <p className="text-slate-600 leading-relaxed">
                  Connect with mentors and peers. Get personalized feedback and guidance from top global instructors.
                </p>
              </div>

              <div className="group p-8 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-purple-200 transition-all duration-300">
                <div className="h-12 w-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500 transition-colors duration-300">
                  <LayoutDashboard className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-3">Track Progress</h3>
                <p className="text-slate-600 leading-relaxed">
                  Monitor your learning journey with intuitive dashboards and earn verified certificates to boost your
                  resume.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
