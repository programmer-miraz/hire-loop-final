import type { LucideIcon } from "lucide-react";
import {
  Bell,
  BookmarkIcon,
  Brain,
  Building,
  Code,
  FileText,
  Globe,
  MessageSquare,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import features from "@/data/features.json";

// Icon names from features.json are matched to real icons here
const icons: Record<string, LucideIcon> = {
  brain: Brain,
  file: FileText,
  building: Building,
  zap: Zap,
  search: Search,
  bell: Bell,
  message: MessageSquare,
  chart: TrendingUp,
  bookmark: BookmarkIcon,
  code: Code,
  users: Users,
  globe: Globe,
};

export default function FeaturesSection() {
  return (
    <section className="px-4 pb-24 bg-[#151516] py-13 mb-20">
      {/* Small centered label */}
      <div className="flex items-center justify-center gap-2 font-mono text-xs tracking-widest text-neutral-400 uppercase">
        <Sparkles className="size-3.5 text-violet-400" />
        Featured Jobs
        <Sparkles className="size-3.5 text-violet-400" />
      </div>

      <h2 className="mx-auto mt-4 max-w-md text-center text-2xl font-semibold tracking-tight text-white md:text-4xl">
        Everything you need <br /> to succeed
      </h2>

      {/* Feature cards — all data comes from src/data/features.json */}
      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4">
        {features.map((feature) => {
          const Icon = icons[feature.icon];
          return (
            <div
              key={feature.id}
              className="rounded-xl border border-white/5 bg-[#0d0d10] p-4"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-white/5">
                <Icon className="size-4 text-violet-400" />
              </span>
              <h3 className="mt-3 text-sm font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
