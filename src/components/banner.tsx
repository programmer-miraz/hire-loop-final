import Link from "next/link";
import { Briefcase, MapPin, Search } from "lucide-react";

// Small round chips shown below the search bar
const trendingPositions = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-[#080808] py-20 md:py-28">
      {/* Decorative glowing dots (hidden on small screens) */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="absolute top-1/2 left-[12%] size-1 rounded-full bg-blue-400/40" />
        <div className="absolute top-2/3 left-[38%] size-1 rounded-full bg-indigo-400/30" />
        <div className="absolute top-1/4 right-[16%] size-1 rounded-full bg-blue-400/40" />
        <div className="absolute top-3/4 right-[30%] size-1 rounded-full bg-indigo-300/30" />
        <div className="absolute bottom-[12%] left-[24%] size-1 rounded-full bg-blue-300/30" />
      </div>

      {/* Center everything inside this container */}
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 text-center">
        {/* Badge: "50,000+ NEW JOBS THIS MONTH" */}
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#131313] py-1.5 pr-5 pl-1.5">
          <span className="flex size-7 items-center justify-center rounded-lg bg-orange-500/15">
            <Briefcase className="size-4 text-orange-500" />
          </span>
          <span className="text-sm font-bold text-white">50,000+</span>
          <span className="font-mono text-xs tracking-widest text-neutral-400 uppercase">
            New Jobs This Month
          </span>
        </div>

        {/* Main heading */}
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
          Find Your Dream Job Today
        </h1>

        {/* Short description */}
        <p className="mt-5 max-w-xl text-base text-neutral-400">
          HireLoop connects top talent with world-class companies. Browse thousands
          of curated opportunities and land your next role — faster.
        </p>

        {/* Search bar: job title on the left, location on the right */}
        <div className="mt-8 flex w-full max-w-2xl flex-col gap-2 rounded-3xl border border-white/10 bg-[#101418] p-2 md:flex-row md:items-center md:rounded-full">
          {/* Job title input */}
          <div className="flex flex-1 items-center gap-2 px-4 py-2">
            <Search className="size-4 shrink-0 text-neutral-500" />
            <input
              type="text"
              placeholder="Job title, skill or company"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
            />
          </div>

          {/* Vertical divider (only shows on desktop) */}
          <div className="hidden h-6 w-px bg-white/10 md:block" />

          {/* Location input */}
          <div className="flex flex-1 items-center gap-2 px-4 py-2">
            <MapPin className="size-4 shrink-0 text-neutral-500" />
            <input
              type="text"
              placeholder="Location or Remote"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
            />
          </div>

          {/* Purple search button at the right end */}
          <button
            aria-label="Search"
            className="mx-auto flex size-11 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white hover:bg-violet-500 md:mx-0"
          >
            <Search className="size-4" />
          </button>
        </div>

        {/* Trending positions row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <span className="mr-1 text-sm text-neutral-500">Trending Position</span>
          {trendingPositions.map((position) => (
            <Link
              key={position}
              href="/browse-jobs"
              className="rounded-full border border-white/10 bg-[#141414] px-3.5 py-1.5 text-xs text-neutral-300 hover:bg-white/10"
            >
              {position}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
