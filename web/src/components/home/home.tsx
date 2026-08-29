import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpenText, ArrowRight, CheckCircle2, Circle, Compass, Users2, Gauge } from "lucide-react";

export function Homepage() {
  return (
    <div className="min-h-screen bg-[#FAF7EF] font-sans flex flex-col">
      {/* ---------- Header ---------- */}
      <header className="px-6 h-[72px] flex items-center bg-[#16152E] border-b border-white/10 sticky top-0 z-50">
        <Link className="flex items-center gap-2.5" href="/">
          <div className="bg-[#E3A43D] p-1.5 rounded-lg">
            <BookOpenText className="h-6 w-6 text-[#16152E]" />
          </div>
          <span className="font-serif font-bold text-2xl text-white tracking-tight">Sissho</span>
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
            <Button className="bg-[#E3A43D] hover:bg-[#cf9333] text-[#16152E] font-semibold rounded-full px-6 cursor-pointer">
              Get Started
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col">
        {/* ---------- Hero ---------- */}
        <section className="relative bg-[#16152E] overflow-hidden">
          {/* Subtle ruled-notebook texture */}
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 35px, #E3A43D 36px)",
            }}
          />
          <div className="absolute -top-[15%] -right-[5%] w-[60%] h-[60%] rounded-full bg-[#2F8F7E]/20 blur-[130px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8 text-left">
              <div className="inline-flex items-center rounded-full border border-[#E3A43D]/30 bg-[#E3A43D]/10 px-4 py-1.5 text-sm font-medium text-[#E3A43D]">
                <span className="flex h-2 w-2 rounded-full bg-[#E3A43D] mr-2" />
                Built around finishing, not just enrolling
              </div>
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white leading-[1.1]">
                Learn in order.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E3A43D] to-[#f0c878]">
                  See it stick.
                </span>
              </h1>
              <p className="max-w-lg text-lg text-slate-400 leading-relaxed">
                Sissho breaks every course into ordered lessons, tracks exactly how far you've come, and grades your
                quizzes the moment you submit &mdash; no guessing where you left off.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/register">
                  <Button className="bg-[#E3A43D] hover:bg-[#cf9333] text-[#16152E] font-semibold rounded-full px-8 h-12 text-base cursor-pointer">
                    Start Learning Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="outline"
                    className="border-white/20 text-white bg-white/5 hover:bg-white/10 rounded-full px-8 h-12 text-base cursor-pointer"
                  >
                    View Courses
                  </Button>
                </Link>
              </div>
            </div>

            {/* Signature element: a progress ledger card, not a generic video mockup */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E3A43D]/30 to-[#2F8F7E]/30 rounded-2xl blur-2xl opacity-40" />
              <div className="relative bg-[#FAF7EF] rounded-2xl shadow-2xl overflow-hidden border border-black/5">
                {/* bookmark ribbon */}
                <div className="absolute -top-1 right-8 w-8 h-16 bg-[#E3A43D] [clip-path:polygon(0_0,100%_0,100%_100%,50%_78%,0_100%)]" />

                <div className="p-7 space-y-5">
                  <div>
                    <p className="font-mono text-xs tracking-widest text-[#2F8F7E] uppercase mb-1">
                      Intro to React &middot; Lesson 4 of 7
                    </p>
                    <h3 className="font-serif text-xl font-bold text-[#16152E]">Component State</h3>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      { label: "JSX & Elements", done: true },
                      { label: "Props & Composition", done: true },
                      { label: "Component State", done: true, current: true },
                      { label: "Effects & Lifecycle", done: false },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                          row.current ? "bg-[#E3A43D]/15 font-semibold text-[#16152E]" : "text-[#55526C]"
                        }`}
                      >
                        {row.done ? (
                          <CheckCircle2 className="h-4 w-4 text-[#2F8F7E] shrink-0" />
                        ) : (
                          <Circle className="h-4 w-4 text-slate-300 shrink-0" />
                        )}
                        {row.label}
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-black/5">
                    <div className="flex items-center justify-between text-xs text-[#55526C] mb-1.5">
                      <span>Course progress</span>
                      <span className="font-mono font-semibold text-[#16152E]">57%</span>
                    </div>
                    <div className="h-2 rounded-full bg-black/5 overflow-hidden">
                      <div className="h-full w-[57%] rounded-full bg-gradient-to-r from-[#2F8F7E] to-[#E3A43D]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Features ---------- */}
        <section className="py-24 bg-[#FAF7EF] px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 md:max-w-2xl">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#16152E] mb-4 tracking-tight">
                Everything you need to actually finish
              </h2>
              <p className="text-lg text-[#55526C]">
                Not another pile of unwatched videos. Sissho is structured so every lesson leads somewhere, and every
                bit of progress is on the record.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="group relative p-8 bg-white rounded-2xl shadow-sm border border-black/5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <span className="font-mono text-[11px] tracking-widest uppercase text-[#2F8F7E] font-semibold">
                  Structure
                </span>
                <div className="h-11 w-11 bg-[#2F8F7E]/10 rounded-xl flex items-center justify-center mt-4 mb-6">
                  <Compass className="h-5 w-5 text-[#2F8F7E]" />
                </div>
                <h3 className="font-serif font-bold text-xl text-[#16152E] mb-3">Ordered Courses</h3>
                <p className="text-[#55526C] leading-relaxed">
                  Every course is a clear sequence of lessons, so you always know exactly what's next.
                </p>
              </div>

              <div className="group relative p-8 bg-white rounded-2xl shadow-sm border border-black/5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <span className="font-mono text-[11px] tracking-widest uppercase text-[#E3A43D] font-semibold">
                  Mentorship
                </span>
                <div className="h-11 w-11 bg-[#E3A43D]/10 rounded-xl flex items-center justify-center mt-4 mb-6">
                  <Users2 className="h-5 w-5 text-[#c98f2f]" />
                </div>
                <h3 className="font-serif font-bold text-xl text-[#16152E] mb-3">Real Instructors</h3>
                <p className="text-[#55526C] leading-relaxed">
                  Courses are built and maintained by instructors who own their material end to end.
                </p>
              </div>

              <div className="group relative p-8 bg-white rounded-2xl shadow-sm border border-black/5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <span className="font-mono text-[11px] tracking-widest uppercase text-[#2F8F7E] font-semibold">
                  Proof
                </span>
                <div className="h-11 w-11 bg-[#2F8F7E]/10 rounded-xl flex items-center justify-center mt-4 mb-6">
                  <Gauge className="h-5 w-5 text-[#2F8F7E]" />
                </div>
                <h3 className="font-serif font-bold text-xl text-[#16152E] mb-3">Tracked Progress</h3>
                <p className="text-[#55526C] leading-relaxed">
                  Completion and quiz scores are recorded automatically &mdash; refresh anytime, nothing resets.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
