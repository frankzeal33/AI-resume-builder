import { Loader2, PlusSquare } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { v4 as uuidv4 } from 'uuid';
import GlobalApi from './../../../service/GlobalApi'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

  

const AddResume = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const [resumeTitle, setResumeTitle] = useState("")
    const {user} = useUser()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const onCreate = async () => {
      setLoading(true)
      const uuid = uuidv4();
      const data = {
        data:{
          title: resumeTitle,
          resumeId: uuid,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userName: user?.fullName
        }
      }

      GlobalApi.CreateNewResume(data).then(res => {
        const resumeId = res.data.data.documentId

        if(res){
          setLoading(false)
          navigate(`/dashboard/resume/${resumeId}/edit`)
        }
      }, (error) => {
        setLoading(false)
      })
    }
  return (
    <div>
        <div onClick={() => setOpenDialog(true)} className="p-14 py-24 border items-center flex justify-center bg-secondary rounded h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed">
            <PlusSquare/>
        </div>
        <Dialog open={openDialog}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Create New Resume</DialogTitle>
                <DialogDescription>
                  <p>Add a title for your new resume</p>
                  <Input className="my-2" placeholder="Ex. Full Stack Resume" onChange={(e) => setResumeTitle(e.target.value)}/>
                </DialogDescription>
                <div className='flex justify-end gap-5'>
                  <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                  <Button disabled={!resumeTitle || loading} onClick={() => onCreate()}>{loading ? <Loader2 className='animate-span'/> : 'Create' }</Button>
                </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddResume