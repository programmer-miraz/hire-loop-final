
import { Suspense } from "react";
import {
    Wallet,
    MapPin,
    Clock3,
    BriefcaseBusiness,
    Bookmark,
    BadgeCheck,
    Building2,
    ArrowRight,
    HeartPulse,
    Coins,
    Laptop,
    CalendarClock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { JobFromdata } from "../page";
import { getJobDetails } from "@/lib/api/jobs";
import { useSession } from "@/lib/auth-client";
import ApplyNow from "./applyNow";



const DETAILS = {
    experience: "5+ Years",
    description:
        "At CloudScale AI, we're looking for a passionate Senior Product Designer to craft intuitive, accessible, and delightful experiences for our AI-powered products. You'll work closely with product, engineering, and business stakeholders to turn complex ideas into simple, useful interfaces.",
    responsibilities: [
        "Lead the end-to-end design process for new platform features, from discovery to high-fidelity implementation.",
        "Collaborate with cross-functional partners to understand user needs and translate them into actionable design work.",
        "Maintain and evolve our design system, ensuring consistency and accessibility across the product.",
        "Conduct design reviews and usability testing to validate design decisions and iterate based on feedback.",
    ],
    requirementSkills: [
        "Figma Expert",
        "System Thinking",
        "UX/UI Design",
        "Mobile-Friendly",
    ],
    requirementPoints: [
        "5+ years of experience designing complex B2B SaaS products or similar applications.",
        "A strong portfolio demonstrating your design process and problem-solving skills.",
    ],
    companySize: "261 – 500 Employees",
    industry: "SaaS / Artificial Intelligence",
};

// Benefits shown as icon + label pairs
const BENEFITS = [
    { icon: HeartPulse, label: "Full Health & Dental" },
    { icon: Coins, label: "Competitive 401k" },
    { icon: Laptop, label: "Latest Hardware Stipend" },
    { icon: CalendarClock, label: "Unlimited PTO" },
];

// ==================================================================
// SMALL REUSABLE PIECES
// ==================================================================

// One of the 4 small info cards (salary / location / type / experience)
function InfoCard({
    icon: Icon, label, value, }: {
        icon: React.ElementType; // a Lucide icon component
        label: string;
        value: string;
    }) {
    return (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <p className="flex items-center gap-1.5 text-xs uppercase text-gray-500">
                <Icon className="size-3.5" />
                {label}
            </p>
            <p className="mt-2 font-medium text-white">{value}</p>
        </div>
    );
}

// One bullet line (small arrow + text) used in the lists
function BulletPoint({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex items-start gap-2 text-sm text-gray-400">
            <ArrowRight className="mt-0.5 size-3.5 shrink-0 text-gray-500" />
            <span>{children}</span>
        </li>
    );
}

// ==================================================================
// PAGE CONTENT (server component)
// Fetches all jobs and finds the one that matches the id in the URL.
// ==================================================================

const JobDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const job: JobFromdata = await getJobDetails(id);

    if (!job) {
        return (
            <div className="min-h-screen bg-[#020204] p-6 text-white">
                <p className="text-lg font-medium">Job not found</p>
                <p className="mt-1 text-sm text-gray-400">
                    This job may have been removed or the link is incorrect.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020204] p-4 text-white sm:p-6">
            {/* ---------- Header card ---------- */}
            <div className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
                <div className="flex items-center gap-3">
                    {/* Company logo (replace with a real image later) */}
                    <div className="flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                        <Building2 className="size-5 text-gray-400" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white sm:text-xl">
                            {job.title}
                        </h1>
                        <p className="mt-1 flex flex-wrap items-center gap-1.5 text-sm text-gray-400">
                            {job.company}
                            {/* Green "verified" badge */}
                            <Badge className="border-transparent bg-transparent text-emerald-400">
                                <BadgeCheck className="size-3.5!" />
                                Verified Employer
                            </Badge>
                        </p>
                    </div>
                </div>

                {/* Actions: save + apply */}
                <div className="flex items-center gap-2">
                    <button
                        className="cursor-pointer rounded-lg border border-white/10 p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
                        aria-label="Save job"
                    >
                        <Bookmark className="size-4" />
                    </button>
                    <ApplyNow job={job}></ApplyNow>
                </div>
            </div>

            {/* ---------- Two columns: details + company ---------- */}
            <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_300px]">
                {/* ===== Left column ===== */}
                <div>
                    {/* 4 quick info cards (2 per row on mobile, 4 on desktop) */}
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                        <InfoCard icon={Wallet} label="Salary Range" value={job.compensation} />
                        <InfoCard icon={MapPin} label="Location" value={job.location} />
                        <InfoCard icon={Clock3} label="Job Type" value={job.type} />
                        <InfoCard icon={BriefcaseBusiness} label="Experience" value={DETAILS.experience} />
                    </div>

                    {/* Job description card */}
                    <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
                        <h2 className="font-semibold text-white">Job Description</h2>
                        <p className="mt-3 text-sm leading-relaxed text-gray-400">
                            {DETAILS.description}
                        </p>

                        {/* Responsibilities */}
                        <h3 className="mt-6 font-semibold text-white">Responsibilities</h3>
                        <ul className="mt-3 space-y-2.5">
                            {DETAILS.responsibilities.map((item) => (
                                <BulletPoint key={item}>{item}</BulletPoint>
                            ))}
                        </ul>

                        {/* Requirements: skill pills + bullet list */}
                        <h3 className="mt-6 font-semibold text-white">Requirements</h3>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {DETAILS.requirementSkills.map((skill) => (
                                <Badge
                                    key={skill}
                                    variant="outline"
                                    className="border-white/10 bg-white/5 text-gray-300"
                                >
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                        <ul className="mt-4 space-y-2.5">
                            {DETAILS.requirementPoints.map((item) => (
                                <BulletPoint key={item}>{item}</BulletPoint>
                            ))}
                        </ul>

                        {/* Benefits: 2-column grid on small screens and up */}
                        <h3 className="mt-6 font-semibold text-white">Benefits</h3>
                        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {BENEFITS.map((benefit) => (
                                <div
                                    key={benefit.label}
                                    className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-3"
                                >
                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/5">
                                        <benefit.icon className="size-4 text-gray-300" />
                                    </div>
                                    <p className="text-sm text-gray-300">{benefit.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ===== Right column: company overview ===== */}
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <h2 className="font-semibold text-white">Company Overview</h2>

                    {/* Company image (placeholder — replace with a real image) */}
                    <div className="mt-3 flex h-40 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-transparent">
                        <Building2 className="size-10 text-gray-600" />
                    </div>

                    {/* Company facts */}
                    <div className="mt-4 space-y-4">
                        <div>
                            <p className="text-xs uppercase text-gray-500">Size</p>
                            <p className="mt-1 text-sm text-white">{DETAILS.companySize}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase text-gray-500">Industry</p>
                            <p className="mt-1 text-sm text-white">{DETAILS.industry}</p>
                        </div>
                    </div>

                    {/* Visit website button */}
                    <Button variant="outline" className="mt-5 text-black cursor-pointer w-full border-white/10">
                        Visit Website
                    </Button>
                </div>
            </div>
        </div>
    );
};



const JobDetailspage = ({ params }: { params: Promise<{ id: string }> }) => {
    return (
        <Suspense fallback={<div>Loading job details...</div>}>
            <JobDetails params={params} />
        </Suspense>
    );
};

export default JobDetailspage;
