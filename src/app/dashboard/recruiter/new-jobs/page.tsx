"use client"; // Needed because this page uses useState (interactivity)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { createJobs } from "@/lib/mutions-actions/jobs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



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

const NewJobs_page = () => {
    const router = useRouter()

    // 3) Runs when the user clicks "Post Job"
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // stop the browser from reloading the page
        const formdata = new FormData(event.currentTarget);
        const data = Object.fromEntries(formdata.entries()) as JobData;
        await createJobs(data)
        toast.success("success")
        router.push("/dashboard/recruiter/manage-jobs")

    };

    return (
        <div className="min-h-screen bg-[#0E0E11] p-6 text-white">
            {/* ---------- Page heading ---------- */}
            <h2 className="text-2xl font-bold text-white">Post a New Job</h2>
            <p className="mt-1 text-sm text-muted-foreground">
                Fill in the details below to publish a new job opening.
            </p>

            {/* ---------- Form card ---------- */}
            <Card className="mt-6 max-w-3xl bg-[#16161A] text-white ring-white/10">
                <CardHeader>
                    <CardTitle>Job Details</CardTitle>
                    <CardDescription>
                        This information will be shown to job seekers.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {/* onSubmit fires when the form button is clicked */}
                    <form onSubmit={handleSubmit} className="grid gap-5">

                        {/* Job Title + Company Name (side by side) */}
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="jobTitle">Job Title *</Label>
                                <Input
                                    id="jobTitle"
                                    name="jobTitle"
                                    placeholder="e.g. Frontend Developer"

                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="companyName">Company Name *</Label>
                                <Input
                                    id="companyName"
                                    name="companyName"
                                    placeholder="e.g. HireLoop"

                                    required
                                />
                            </div>
                        </div>

                        {/* Location + Job Type (side by side) */}
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="location">Location *</Label>
                                <Input
                                    id="location"
                                    name="location"
                                    placeholder="e.g. Dhaka, Bangladesh"

                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="jobType">Job Type</Label>
                                {/* A normal select styled to match the dark theme */}
                                <select
                                    id="jobType"
                                    name="jobType"

                                    className="h-8 rounded-lg border border-input  px-2.5 text-sm text-white bg-gray-600 outline-none focus-visible:border-ring"
                                >
                                    <option>Full-time</option>
                                    <option>Part-time</option>
                                    <option>Remote</option>
                                    <option>Internship</option>
                                    <option>Contract</option>
                                </select>
                            </div>
                        </div>

                        {/* Salary range (min + max, side by side) */}
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="salaryMin">Salary Min ($)</Label>
                                <Input
                                    id="salaryMin"
                                    name="salaryMin"
                                    type="number"
                                    placeholder="e.g. 30000"

                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="salaryMax">Salary Max ($)</Label>
                                <Input
                                    id="salaryMax"
                                    name="salaryMax"
                                    type="number"
                                    placeholder="e.g. 60000"

                                />
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="grid gap-2">
                            <Label htmlFor="skills">Required Skills *</Label>
                            <Input
                                id="skills"
                                name="skills"
                                placeholder="e.g. React, TypeScript, Tailwind CSS"

                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="grid gap-2">
                            <Label htmlFor="description">Job Description *</Label>
                            {/* textarea = multi-line input (plain HTML, styled like Input) */}
                            <textarea
                                id="description"
                                name="description"
                                rows={5}
                                placeholder="Describe the role, responsibilities and requirements..."
                                required
                                className="rounded-lg border border-input bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-muted-foreground focus-visible:border-ring"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 pt-2">
                            {/* type="button" + onClick = clear the form without submitting */}
                            <Button
                                type="button"
                                className="text-black hover:text-black cursor-pointer bg-gray-50"

                            >
                                Clear
                            </Button>

                            {/* type="submit" triggers handleSubmit above */}
                            <Button className="cursor-pointer" type="submit">Post Job</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default NewJobs_page;
