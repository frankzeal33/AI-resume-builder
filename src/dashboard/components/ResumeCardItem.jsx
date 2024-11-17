import { Loader2Icon, MoreVertical } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobalApi from './../../../service/GlobalApi'
import { toast } from '@/hooks/use-toast'


const ResumeCardItem = ({resume, refreshData}) => {
  const [openAlert, setOpenAlert] = useState(false)
  const navigation = useNavigate()
  const [loading, setLoading] = useState(false)

  const onDelete = () => {
    setLoading(true)
    GlobalApi.DeleteResumeById(resume.documentId).then(res => {
      toast({title:"Resume Deleted"})  
      refreshData()
      setLoading(false)
      setOpenAlert(false)
    }, (error) => {
      setLoading(false)
    })
  }

  return (
   <div className='bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 border-t-4 rounded-lg hover:scale-105 transition-all hover:shadow-md shadow-primary flex flex-col justify-between'>
      <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
        <div className="flex items-center justify-center h-[280px]" style={{borderColor: resume?.themeColor}}>
          <img src="/cv.png" alt="CV" width={60} height={60}/>
        </div>
      </Link>
      <div className='border rounded-b-lg p-3 flex justify-between text-white' style={{background: resume?.themeColor ? resume?.themeColor : 'grey'}}>
        <h2 className='text-sm'>{resume.title}</h2>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className='h-4 w-4 cursor-pointer'/>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigation(`/dashboard/resume/${resume.documentId}/edit`)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigation(`/my-resume/${resume.documentId}/view`)}>View</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigation(`/my-resume/${resume.documentId}/view`)}>Download</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>{loading ? <Loader2Icon className='animate-spin'/> : 'Delete'}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
   </div>
  )
}

export default ResumeCardItem