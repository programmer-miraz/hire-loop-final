"use client"; // Needed because the buttons have onClick handlers

import React, { useEffect, useState } from "react";
import {
    Code2,
    PenTool,
    ServerCog,
    Megaphone,
    FlaskConical,
    MapPin,
    Users,
    Pencil,
    Briefcase,
    Trash2,
    Ellipsis,
    Plus,
    ChevronRight,
} from "lucide-react";
import { getAllJobs } from "@/lib/api/jobs";
import Link from "next/link";
import { DeleteDialogJob } from "@/deshbord-components/jobDelete";
export type Job = {
    _id: string;
    title: string;
    department: string;
    icon: string;
    iconColor: string;
    iconBg: string;
    company: string;
    location: string;
    type: string;
    compensation: string;
    applicants: number;
    status: "Active" | "Expired";
    deadline: string;
    posted: string;
};
const icons = {
    Code2,
    PenTool,
    ServerCog,
    Megaphone,
    FlaskConical,
};

function JobIcon({ job }: { job: Job }) {
    const Icon = icons[job.icon as keyof typeof icons] || Briefcase;
    return (
        <div
            className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${job.iconBg}`}
        >
            <Icon className={`size-4 ${job.iconColor}`} />
        </div>
    );
}

// Green "Active" or gray "Expired" pill
function StatusBadge({ status }: { status: string }) {
    const isActive = status === "Active";
    return (
        <span
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ${isActive
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-white/5 text-gray-400"
                }`} >
            <span className={`size-1.5 rounded-full ${isActive ? "bg-emerald-400" : "bg-gray-500"}`} />
            {status}
        </span>
    );
}

// Update / Delete / More buttons (used in both layouts)
function ActionButtons({ job, onDeleteSuccess }: { job: Job, onDeleteSuccess: (id: string) => void }) {

    return (
        <div className="flex items-center gap-1">
            {/* Update button — disabled for expired jobs */}
            <button
                disabled={job.status === "Expired"}
                onClick={() => console.log("Update job", job._id)}
                className="flex items-center gap-1.5 rounded-lg border border-indigo-500/40 px-3 py-1.5 text-xs text-indigo-400 transition hover:bg-indigo-500/10 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            >
                <Pencil className="size-3.5" />
                Update
            </button>

            {/* Delete button */}
            <DeleteDialogJob onDeleteSuccess={onDeleteSuccess} job={job}></DeleteDialogJob>

            {/* More options (three dots) */}
            <button className="rounded-lg p-2 text-gray-500 transition hover:bg-white/5 hover:text-white">
                <Ellipsis className="size-4" />
            </button>
        </div>
    );
}

// ==================================================================
// 3) THE PAGE
// ==================================================================

const NewJobs_page = () => {
    /// use client thaker karone promise function ke useEffect kora hoice
    const [jobs, setjobs] = useState<Job[]>([]) || Briefcase;
    useEffect(() => {
        const getJobs = async () => {
            const data = await getAllJobs()
            setjobs(data)
        }
        getJobs()

    }, [])

    return (
        <div className="min-h-screen bg-[#0E0E11] p-4 text-white sm:p-6">
            {/* ---------- Top header ---------- */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    {/* Breadcrumb: "Manage Jobs > Job Listings & Postings" */}
                    <nav className="flex items-center gap-1.5 text-xs">
                        <span className="text-gray-500">Manage Jobs</span>
                        <ChevronRight className="size-3 text-gray-600" />
                        <span className="text-indigo-400">Job Listings &amp; Postings</span>
                    </nav>

                    {/* Smaller text on mobile, bigger from tablet up */}
                    <h1 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                        Manage Job Posts
                    </h1>
                    <p className="mt-1 max-w-xl text-sm text-gray-400">
                        Review live listings, monitor applicants, and update job details across
                        your organization.
                    </p>
                </div>

                {/* Purple "New Job Post" button — full width on mobile, auto on larger screens */}
                <Link
                    href="/dashboard/recruiter/new-jobs"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500/80 sm:w-auto"
                >
                    <Plus className="size-4" />
                    New Job Post
                </Link>
            </div>

            {/* ================================================
                DESKTOP / LAPTOP TABLE (hidden on mobile)
                NO horizontal scrollbar! Instead of a fixed width,
                less important columns simply hide on smaller screens:
                - hidden lg:table-cell  -> Type (shows on large laptop)
                - hidden xl:table-cell  -> Compensation + Deadline
                  (they only show on wide desktop screens)
                ================================================ */}
            <div className="mt-6 hidden rounded-xl border border-white/10 md:block">
                <table className="w-full text-left text-sm">
                    {/* Table head: small uppercase gray column names */}
                    <thead>
                        <tr className="border-b border-white/10 text-xs uppercase text-gray-500">
                            <th className="px-3 py-3 font-medium sm:px-4">
                                Job Title &amp; Dept
                            </th>
                            <th className="px-3 py-3 font-medium sm:px-4">
                                Company &amp; Location
                            </th>
                            {/* Type column: only from large laptops (1024px) up */}
                            <th className="hidden px-4 py-3 font-medium lg:table-cell">
                                Type
                            </th>
                            <th className="px-3 py-3 font-medium sm:px-4">Compensation</th>
                            <th className="px-3 py-3 font-medium sm:px-4">Applicants</th>
                            <th className="px-3 py-3 font-medium sm:px-4">Status</th>
                            {/* Deadline column: only from wide desktops (1280px) up */}
                            <th className="hidden px-4 py-3 font-medium xl:table-cell">
                                Deadline
                            </th>
                            <th className="px-3 py-3 text-right font-medium sm:px-4">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    {/* Table body: one <tr> per job, generated with .map() */}
                    <tbody>
                        {jobs.map((job, ind) => (
                            <tr
                                key={ind}
                                className="border-b border-white/10 transition last:border-b-0 hover:bg-white/[0.03]"
                            >
                                {/* Job title + department (always visible) */}
                                <td className="px-3 py-3 sm:px-4">
                                    <div className="flex items-center gap-3">
                                        <JobIcon job={job} />
                                        <div>
                                            <p className="font-medium text-white">
                                                {job.title}
                                            </p>
                                            <p className={`text-xs ${job.iconColor}`}>
                                                {job.department}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Company + location (always visible) */}
                                <td className="px-3 py-3 sm:px-4">
                                    <p className="text-white">{job.company}</p>
                                    <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                                        <MapPin className="size-3 shrink-0" />
                                        {job.location}
                                    </p>
                                </td>

                                {/* Job type pill (large laptop and up) */}
                                <td className="hidden px-4 py-3 lg:table-cell">
                                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-gray-300">
                                        {job.type}
                                    </span>
                                </td>

                                {/* Salary (always visible) */}
                                <td className="whitespace-nowrap px-3 py-3 text-gray-200 sm:px-4">
                                    {job.compensation}
                                </td>

                                {/* Applicants count (always visible) */}
                                <td className="px-3 py-3 sm:px-4">
                                    <span className="flex items-center gap-1.5">
                                        <Users className="size-4 shrink-0 text-gray-500" />
                                        <span className="font-semibold text-white">
                                            {job.applicants}
                                        </span>
                                        <span className="hidden text-gray-400 xl:inline">
                                            Candidates
                                        </span>
                                    </span>
                                </td>

                                {/* Status badge (always visible) */}
                                <td className="px-3 py-3 sm:px-4">
                                    <StatusBadge status={job.status} />
                                </td>

                                {/* Deadline + posted date (wide desktop and up) */}
                                <td className="hidden px-4 py-3 xl:table-cell">
                                    <p className="whitespace-nowrap text-white">
                                        {job.deadline}
                                    </p>
                                    <p className="mt-0.5 whitespace-nowrap text-xs text-gray-500">
                                        {job.posted}
                                    </p>
                                </td>

                                {/* Action buttons (always visible) */}
                                <td className="px-3 py-3 sm:px-4">
                                    <div className="flex justify-end">
                                        {/* //delete clint componnet router refreshe */}
                                        <ActionButtons onDeleteSuccess={(id) => {
                                            setjobs((prev) => prev.filter((item) => item._id !== id));
                                        }} job={job} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================================================
                MOBILE CARDS (hidden from tablet up)
                - "md:hidden" = visible only below 768px
                Each job becomes a stacked card — no scrolling needed.
                ================================================ */}
            <div className="mt-6 space-y-3 md:hidden">
                {jobs.map((job) => (
                    <div
                        key={job._id}
                        className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
                    >
                        {/* Top row: icon + title + status badge */}
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <JobIcon job={job} />
                                <div>
                                    <p className="font-medium text-white">{job.title}</p>
                                    <p className={`text-xs ${job.iconColor}`}>
                                        {job.department}
                                    </p>
                                </div>
                            </div>
                            <StatusBadge status={job.status} />
                        </div>

                        {/* Company + location */}
                        <p className="mt-3 text-sm text-white">{job.company}</p>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                            <MapPin className="size-3" />
                            {job.location}
                        </p>

                        {/* Info grid: type / salary / applicants / deadline */}
                        <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <p className="text-xs text-gray-500">Type</p>
                                <p className="text-gray-200">{job.type}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Compensation</p>
                                <p className="text-gray-200">{job.compensation}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Applicants</p>
                                <p className="flex items-center gap-1.5 text-gray-200">
                                    <Users className="size-3.5 text-gray-500" />
                                    {job.applicants} Candidates
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Deadline</p>
                                <p className="text-gray-200">{job.deadline}</p>
                                <p className="text-xs text-gray-500">{job.posted}</p>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="mt-4 border-t border-white/10 pt-3">
                            <ActionButtons onDeleteSuccess={(id) => {
                                setjobs((prev) => prev.filter((item) => item._id !== id));
                            }} job={job} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewJobs_page;
