"use client";

import { Briefcase, Building, Shield } from "lucide-react";

// The values here must match the role field defined in src/lib/auth.ts
const roles = [
  { value: "seeker", label: "Job Seeker" },
  { value: "recruiter", label: "Recruiter" },
  { value: "admin", label: "Admin" },
];

type Props = {
  value: string;
  onChange: (role: string) => void;
};

export default function RoleSelect({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {roles.map((role) => {
        // pick a small icon for each role
        const Icon =role.value === "seeker" ? Briefcase: role.value === "recruiter" ? Building: Shield;

        return (
          <button
            key={role.value}
            type="button" // prevents it from submitting the form
            onClick={() => onChange(role.value)}
            // selected card gets a violet highlight, unselected cards stay dim
            className={
              value === role.value
                ? "flex cursor-pointer flex-col items-center gap-1 rounded-xl border border-violet-500 bg-violet-500/10 px-2 py-3 text-white"
                : "flex cursor-pointer flex-col items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-2 py-3 text-neutral-400 hover:border-white/25 transition-colors"
            }
          >
            <Icon className="size-4" />
            <span className="text-xs font-semibold">{role.label}</span>
          </button>
        );
      })}
    </div>
  );
}
