"use client"
import { Trash2, Trash2Icon } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Job } from "@/app/dashboard/recruiter/manage-jobs/page"
import { jobDataDelete } from "@/lib/mutions-actions/jobs"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"




export function DeleteDialogJob({ job, onDeleteSuccess }: { job: Job, onDeleteSuccess: (id: string) => void }) {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const handleDelete = async () => {
        const res = await jobDataDelete(job._id)
        console.log(res);
        if (res.deletedCount) {
            setOpen(false)
            toast.success("delete successfull!")
            onDeleteSuccess(job._id)
            router.refresh()
        }
        router.refresh()

    }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger
                render={<button
                    className="rounded-lg p-2 text-gray-500 cursor-pointer transition hover:bg-white/5 hover:text-red-400"
                >
                    <Trash2 className="size-4" />
                </button>}
            />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete chat?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete this chat conversation. View{" "}
                        <a href="#">Settings</a> delete any memories saved during this chat.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="cursor-pointer" variant="destructive" onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
