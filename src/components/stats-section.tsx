import Image from "next/image";
import { Briefcase, Building2, Star, User } from "lucide-react";
import globe from "../../public/images/globe.png";

// The 4 cards under the globe
const stats = [
  { icon: Briefcase, value: "50K", label: "Active Jobs" },
  { icon: Building2, value: "12K", label: "Companies" },
  { icon: User, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
];

// Star dots in the background (top/left positions in %)
const stars = [
  { top: "5%", left: "10%", size: 3 },
  { top: "12%", left: "24%", size: 2 },
  { top: "6%", left: "38%", size: 2 },
  { top: "15%", left: "50%", size: 3 },
  { top: "9%", left: "63%", size: 2 },
  { top: "18%", left: "74%", size: 3 },
  { top: "7%", left: "88%", size: 2 },
  { top: "28%", left: "5%", size: 2 },
  { top: "34%", left: "16%", size: 3 },
  { top: "42%", left: "3%", size: 2 },
  { top: "52%", left: "10%", size: 3 },
  { top: "30%", left: "92%", size: 2 },
  { top: "44%", left: "96%", size: 2 },
  { top: "58%", left: "90%", size: 3 },
];

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-[#020204] px-4 pt-6 pb-16">
      {/* Star dots in the background */}
      <div className="pointer-events-none absolute inset-0">
        {stars.map((star, index) => (
          <span
            key={index}
            style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
            className="absolute rounded-full bg-white/50"
          />
        ))}
      </div>

      {/* Globe picture with its bottom fading into the black background */}
      <div className="relative mx-auto w-full max-w-5xl">
        <Image src={globe} alt="" className="w-full" />
        {/* fade the lower part of the globe into the page background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_55%,#020204_92%)]" />
      </div>

      {/* Heading sits on top of the globe */}
      <div className="relative z-10 -mt-24 text-center md:-mt-60">
        <p className="text-2xl font-medium tracking-tight text-[#d4d4d8] md:text-4xl">
          Assisting over 15,000 job seekers <br /> find their dream positions.
        </p>
      </div>

      {/* 4 stat cards: 2 columns on mobile, 4 columns on desktop */}
      <div className="relative z-10 mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 md:mt-6 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col rounded-xl bg-gradient-to-b from-[#17171a] to-[#0f0f12] p-5"
          >
            <stat.icon className="size-5 text-neutral-200" />
            <p className="mt-10 text-3xl font-semibold tracking-tight text-white md:mt-13 md:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-neutral-400">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
