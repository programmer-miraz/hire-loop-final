import { getAllJobs } from "@/lib/api/jobs";
import { Suspense } from "react";
import {
    SearchBar,
    FilterSidebar,
    SortBy,
    JobCard,
    Pagination,
} from "./browse-jobs-ui";

// ==================================================================
// SHARED TYPE — the common fields every job has.
// The UI components import this type, so they always match the data.
// ==================================================================

export type JobFromdata = {
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
    status: string;
    deadline: string;
    posted: string;
};

// Dummy number for the pagination bar.
// Replace with the real total from your API when it supports pagination.
const TOTAL_PAGES = 62;

// ==================================================================
// PAGE CONTENT (server component)
// Fetches the jobs and lays out the page:
// search bar on top -> filters on the left -> job list on the right.
// ==================================================================

const JobsContent = async ({searchParams}:
     {searchParams: Promise<{ [key: string]: string | string[] | undefined }>;}) => {

    const search = await searchParams;
    const qury = new URLSearchParams(search as Record<string, string>).toString();
    const jobData: JobFromdata[] = await getAllJobs(qury);
    const jobs = Array.isArray(jobData) ? jobData : [];

    return (
        <div className="min-h-screen bg-[#020204] p-4 text-white sm:p-6">

            <SearchBar />
      
            <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
                {/* Left column: filters */}
                <FilterSidebar/>

                {/* Right column: results */}
                <div>
                    {/* Results header: job count + sort dropdown */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm font-medium text-white">
                            Found {jobs.length} Professional Jobs
                        </p>
                        <SortBy />
                    </div>

                    {/* The job list (or a friendly message when nothing matches) */}
                    {jobs.length === 0 ? (
                        <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-10 text-center">
                            <p className="font-medium text-white">No jobs found</p>
                            <p className="mt-1 text-sm text-gray-400">
                                Try a different keyword or remove some filters.
                            </p>
                        </div>
                    ) : (
                        <div className="mt-4 space-y-3">
                            {jobs.map((job) => (
                                <JobCard key={job._id} job={job} />
                            ))}
                        </div>
                    )}

                    {/* Bottom page buttons */}
                    {/* <Pagination currentPage={1} totalPages={TOTAL_PAGES} /> */}
                </div>
            </div>
        </div>
    );
};

// ==================================================================
// PAGE WRAPPER
// Suspense shows "Loading..." while the jobs are being fetched.
// ==================================================================

const Page = ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <JobsContent searchParams={searchParams} />
        </Suspense>
    );
};

export default Page;
