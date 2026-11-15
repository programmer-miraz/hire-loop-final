
import { getAllJobs } from "@/lib/api/jobs";
import { Suspense } from "react";

const JobsContent = async ({ searchParams, }: { searchParams: Promise<{ [key: string]: string | string[] | undefined; }>; }) => {

    const search = await searchParams;
    const qury = new URLSearchParams(search as Record<string, string>).toString()
    const jobData = await getAllJobs(qury)


    return (
        <div>

            {
                jobData.map((job, ind: number) => <h2 className="text-red-500" key={ind}>{job.company} {job.type}</h2>)
            }


        </div>
    );
};

const Page = ({ searchParams, }: { searchParams: Promise<{ [key: string]: string | string[] | undefined; }> }) => {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <JobsContent searchParams={searchParams} />
        </Suspense>
    );
};

export default Page;