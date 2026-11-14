const BASE_URL = process.env.NEXT_PUBLIC_BETTER_AUTH
export const getAllJobs = async () => {
    const res = await fetch(`${BASE_URL}/jobs`)
    return res.json()

}