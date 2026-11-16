"use client"; // Interactive UI (state + clicks) runs in the browser

import React, { useState } from "react";
import {
    Code2,
    PenTool,
    ServerCog,
    Megaphone,
    FlaskConical,
    Briefcase,
    Search,
    Bookmark,
    Banknote,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { JobFromdata } from "./page"; // the shared type from page.tsx
import { useRouter, useSearchParams } from "next/navigation";

// Sort options shown in the dropdown
const SORT_OPTIONS = [
    { value: "recent", label: "Most Recent" },
    { value: "salary", label: "Salary: High to Low" },
    { value: "applicants", label: "Most Applicants" },
];

// Map the icon NAME string from the API to a real Lucide icon
const icons = { Code2, PenTool, ServerCog, Megaphone, FlaskConical };

const JOB_TYPE_OPTIONS = [
    "Full-time",
    "Contract",
    "Freelance",
    "Part-time",

];
// ==================================================================
// 1) SEARCH BAR (top of the page)
// ==================================================================

export function SearchBar() {
    const router = useRouter();

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        const search = data.search;
        const params = new URLSearchParams();
        params.set("search", search as string)
        router.push(`/browse-jobs?${params.toString()}`)


    };

    return (
        <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-2"
        >
            <Search className="ml-2 size-4 shrink-0 text-gray-500" />

            <Input
                name="search"
                placeholder="Search by job title, keywords..."
                className="h-9 border-0 bg-transparent focus-visible:ring-0"
            />

            <Button
                type="submit"
                className="shrink-0 cursor-pointer bg-white text-black hover:bg-gray-200"
            >
                Search Jobs
            </Button>
        </form>
    );
}

//////////////////////////////////////////////////////////////////////
function FilterSection({ title }: { title: string; }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const selectedType = searchParams.get("type") || "";
    const jobTypes = JOB_TYPE_OPTIONS;

    const handleFilter = (type: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (type === selectedType) {
            params.delete("type");
        } else {
            params.set("type", type);
        }

        router.push(`/browse-jobs?${params.toString()}`);
    };

    return (
        <div>
            <p className="text-sm font-medium text-white">{title}</p>

            <div className="mt-3 space-y-3">
                {jobTypes.map((type) => (
                    <label
                        key={type}
                        className="flex cursor-pointer items-center gap-2"
                    >
                        <Checkbox
                            checked={selectedType === type}
                            onCheckedChange={() => handleFilter(type)}
                        />

                        <span className="text-gray-300">{type}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

export function FilterSidebar() {
    return (
        <div className="rounded-xl border h-min border-white/10 bg-white/[0.02] p-4">
            <h2 className="font-medium text-white">Filters</h2>

            {/* Each section = one common field of JobFromdata */}
            <div className="mt-4 space-y-5">
                <FilterSection title="Job Type" />
            </div>
        </div>
    );
}
///////////////////////////////////////////////////////////////////////
// ==================================================================
// 3) SORT BY DROPDOWN (top right of the results)
// ==================================================================

export function SortBy() {
    return (
        <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Sort by</span>
            {/* TODO: implement sorting here.
                Hint: onValueChange gives you the chosen value
                ("recent" | "salary" | "applicants") — sort the job
                list or update the URL with it. */}
            <Select onValueChange={() => {
                // your code here
            }}>
                <SelectTrigger size="sm" className="w-40 border-white/10 bg-white/5">
                    {/* the text shown before the user picks anything */}
                    <SelectValue placeholder="Most Recent" />
                </SelectTrigger>
                <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}


/// Job cart 
// Colors for the status pill (add more statuses here if needed)
const statusStyles: Record<string, string> = {
    "Easy Apply": "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
    "Hot Job": "border-amber-500/40 bg-amber-500/10 text-amber-400",
};

export function JobCard({ job }: { job: JobFromdata }) {
    const router = useRouter()
    const [saved, setSaved] = useState(false);
    const Icon = icons[job.icon as keyof typeof icons] || Briefcase;
    const statusClass =
        statusStyles[job.status] || "border-white/10 bg-white/5 text-gray-400";
    const handleJobDetails = (jobID: string) => {
        router.push(`/browse-jobs/${jobID}`)
    }

    return (
        <div onClick={() => handleJobDetails(job._id)} className="rounded-xl cursor-pointer border border-white/10 bg-white/[0.02] p-4 transition hover:border-white/20">
            <div className="flex items-start justify-between gap-3">
                {/* Icon + title + company line */}
                <div className="flex items-center gap-3">
                    <div
                        className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${job.iconBg}`}
                    >
                        <Icon className={`size-5 ${job.iconColor}`} />
                    </div>
                    <div>
                        <h3 className="font-medium text-white">{job.title}</h3>
                        <p className="mt-0.5 text-sm text-gray-400">
                            {job.company} • {job.location}
                        </p>
                    </div>
                </div>

                {/* Bookmark (saves the job) */}
                <button
                    onClick={() => setSaved(!saved)}
                    className="cursor-pointer rounded-lg p-2 text-gray-500 transition hover:bg-white/5 hover:text-white"
                    aria-label="Save job"
                >
                    <Bookmark
                        className={`size-4 ${saved ? "fill-indigo-400 text-indigo-400" : ""}`}
                    />
                </button>
            </div>

            {/* Bottom pills: salary • job type • status */}
            <div className="mt-3 flex flex-wrap gap-2">
                <Badge className="border-transparent bg-white/5 text-emerald-400">
                    <Banknote data-icon="inline-start" />
                    {job.compensation}
                </Badge>

                <Badge className="border-transparent bg-white/5 text-gray-300">
                    {job.type}
                </Badge>

                <Badge variant="outline" className={statusClass}>
                    {job.status}
                </Badge>
            </div>
        </div>
    );
}

// ==================================================================
// 5) PAGINATION (bottom of the list)
// Simple version: pages 1 2 3 ... last, plus prev/next arrows.
// Each page is a normal <Link>, so the server refetches on click.
// ==================================================================

export function Pagination({
    currentPage,
    totalPages,
}: {
    currentPage: number;
    totalPages: number;
}) {
    // Keep it simple: always show 1, 2, 3 ... and the last page
    const pages: (number | string)[] = [1, 2, 3, "...", totalPages];

    return (
        <div className="mt-8 flex items-center justify-center gap-1.5">
            {/* Previous arrow (disabled on page 1) */}
            {currentPage <= 1 ? (
                <span className="rounded-lg p-2 text-gray-600">
                    <ChevronLeft className="size-4" />
                </span>
            ) : (
                <Link
                    href={`/browse-jobs?page=${currentPage - 1}`}
                    className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:bg-white/5"
                >
                    <ChevronLeft className="size-4" />
                </Link>
            )}

            {/* Page number buttons */}
            {pages.map((page, index) =>
                typeof page === "string" ? (
                    // the "..." between the numbers
                    <span key={`ellipsis-${index}`} className="px-1.5 text-gray-500">
                        ...
                    </span>
                ) : (
                    <Link
                        key={page}
                        href={`/browse-jobs?page=${page}`}
                        className={`rounded-lg border px-3 py-1.5 text-sm transition ${page === currentPage
                            ? "border-transparent bg-white font-medium text-black" // active page = white
                            : "border-white/10 text-gray-400 hover:bg-white/5"
                            }`}
                    >
                        {page}
                    </Link>
                )
            )}

            {/* Next arrow (disabled on the last page) */}
            {currentPage >= totalPages ? (
                <span className="rounded-lg p-2 text-gray-600">
                    <ChevronRight className="size-4" />
                </span>
            ) : (
                <Link
                    href={`/browse-jobs?page=${currentPage + 1}`}
                    className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:bg-white/5"
                >
                    <ChevronRight className="size-4" />
                </Link>
            )}
        </div>
    );
}
