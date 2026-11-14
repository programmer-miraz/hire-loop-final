export type JobData = {
    jobTitle: string;
    companyName: string;
    location: string;
    jobType: string;
    salaryMin: string;
    salaryMax: string;
    skills: string;
    description: string;
};


/// from add new jobs --- new-jobs-folder
const BASE_URL = process.env.NEXT_PUBLIC_BETTER_AUTH
export const createJobs = async (data: JobData) => {

    const res = await fetch(`${BASE_URL}/jobs`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data),
    })
    const jobsData = await res.json();

    if (jobsData.acknowledged) {
        console.log("Job created successfully");
    }
    return jobsData;

}

// recuiter job data delete
export const jobDataDelete = async (jobId: string) => {
    const res = await fetch(`${BASE_URL}/jobs/${jobId}`,{
        method: "DELETE",
    });
      const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Delete failed");
    }

    return data;


};

