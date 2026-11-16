"use client"
import { useSession } from '@/lib/auth-client';
import React from 'react';
import { Button } from "@/components/ui/button";
import { JobFromdata } from '../page';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { applyToJob } from '@/lib/mutions-actions/jobs';
const ApplyNow = ({ job }: { job: JobFromdata }) => {
    const router = useRouter()
    const { data: session } = useSession()
    const user = session?.user

    const handleApplyNow = async () => {
        if (!user) {

            router.push(`/Login?redirectTo=/browse-jobs/${job._id}`)
        }
        else if (user.role === "seeker") {
            const application = {
                userID: user.id,
                email: user.email,
                jobID: job._id,
                jobTitle: job.title,
                company: job.company
            }
            const res = await applyToJob(application)
            if(res.insertedId){
                toast.success("apply successfully bro!")
            }
        }
        else {
            toast.info("user is not job seeker")
        }

    }
    return (
        <div>
            <Button onClick={handleApplyNow} className="bg-white text-black cursor-pointer hover:bg-gray-200">
                Apply Now
            </Button>
        </div>

    );
};

export default ApplyNow;