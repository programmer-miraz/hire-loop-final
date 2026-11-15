const BASE_URL = process.env.NEXT_PUBLIC_BETTER_AUTH

export const getAllJobs = async (qury: string = "") => {
    const res = await fetch(`${BASE_URL}/jobs?${qury}`)
    return res.json()
}