const BASE_URL = process.env.NEXT_PUBLIC_BETTER_AUTH
/// publick all job cart
export const getAllJobs = async (qury: string = "") => {
    const res = await fetch(`${BASE_URL}/jobs?${qury}`)
    return res.json()
}
/// job er details
export const getJobDetails = async (jobID: string) => {
    const res = await fetch(`${BASE_URL}/jobs/${jobID}`)
    return res.json()

}