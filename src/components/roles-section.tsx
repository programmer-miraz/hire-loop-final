import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import roles from "@/data/roles.json";

// Small centered label at the top of the section
function Kicker({ children }: { children: string }) {
  return (
    <div className="flex items-center justify-center gap-2 font-mono text-xs tracking-widest text-neutral-400 uppercase">
      <Sparkles className="size-3.5 text-violet-400" />
      {children}
      <Sparkles className="size-3.5 text-violet-400" />
    </div>
  );
}

export default function RolesSection() {
  return (
    <section className="px-4 py-20">
      <Kicker>What Job Seekers</Kicker>

      <h2 className="mx-auto mt-4 max-w-md text-center text-2xl font-semibold tracking-tight text-white md:text-4xl">
        The roles you&apos;ll never find by searching
      </h2>

      {/* Job cards — all data comes from src/data/roles.json */}
      <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
        {roles.map((role) => (
          <div
            key={role.id}
            className="flex flex-col rounded-xl gap-y-2 border border-white/10 bg-[#0c0c0f] py-8 px-4"
          >
            <h3 className="text-sm font-semibold text-white">{role.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-neutral-500">
              {role.description}
            </p>

            {/* Skill chips */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {role.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md bg-white/5 px-2 py-1 text-[10px] text-neutral-400"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Bottom row: company chips on the left, Apply Now on the right */}
            <div className="mt-auto flex items-center justify-between pt-4">
              <div className="flex flex-wrap gap-1.5">
                {role.companies.map((company) => (
                  <span
                    key={company}
                    className="rounded-md bg-white/5 px-2 py-1 text-[10px] text-neutral-300"
                  >
                    {company}
                  </span>
                ))}
              </div>
              <Link
                href="/browse-jobs"
                className="flex shrink-0 items-center gap-1 text-xs font-medium text-violet-400 hover:text-violet-300"
              >
                Apply Now <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Green button at the bottom */}
      <div className="mt-10 flex justify-center">
        <Link
          href="/browse-jobs"
          className="rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-black hover:bg-emerald-400"
        >
          Browse All Jobs
        </Link>
      </div>
    </section>
  );
}
