import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from '@/hooks/use-toast'

const formField = {
    title:'',
    companyName:'',
    city:'',
    state:'',
    startDate:'',
    endDate:'',
    workSummary:''
}
const Experience = () => {

    const [loading, setLoading] = useState(false)
    const [experienceList, setExperienceList] = useState([formField])
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
    const params = useParams()


    useEffect(() => {
        resumeInfo && setExperienceList(resumeInfo?.experience)
    }, [])

    const handleChange = (index, event) => {
        const newEntries = experienceList.slice()
        const {name, value} = event.target
        newEntries[index][name] = value
        setExperienceList(newEntries)
    }

    const addNewExperience = () => {
        setExperienceList([ ...experienceList, formField])
    }

    const removeExperience = () => {
        setExperienceList(experienceList => experienceList.slice(0, -1))
    }

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = experienceList.slice()
        newEntries[index][name] = e.target.value
        setExperienceList(newEntries)
    }

    useEffect(() => {
        experienceList && setResumeInfo({
            ...resumeInfo,
            experience: experienceList
        })
    }, [experienceList])

    const onSave = () => {
        setLoading(true)
        const data = {
            data: {
                experience: experienceList.map(({id, ...rest}) => rest)
            }
        }

        GlobalApi.UpdateResumeDetail(params.resumeId, data).then(res => {
            setLoading(false)
            toast({title: 'Details Updated!'})
        }, error => {
            setLoading(false)
            toast({title: 'Server Error, Please try again!'})
        })
    }

  return (
    <div>
         <h2 className='font-bold text-lg'>Professional Experience</h2>
         <p>Add your previous Job Experience</p>

         <div>
            {experienceList.map((item, index) => (
                <div key={index}>
                    <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                        <div>
                            <label className='text-xs'>Position Title</label>
                            <Input name="title" defaultValue={item?.title} onChange={(event) => handleChange(index, event)}/>
                        </div>
                        <div>
                            <label className='text-xs'>Company Name</label>
                            <Input name="companyName" defaultValue={item?.companyName} onChange={(event) => handleChange(index, event)}/>
                        </div>
                        <div>
                            <label className='text-xs'>City</label>
                            <Input name="city" defaultValue={item?.city} onChange={(event) => handleChange(index, event)}/>
                        </div>
                        <div>
                            <label className='text-xs'>State</label>
                            <Input name="state" defaultValue={item?.state} onChange={(event) => handleChange(index, event)}/>
                        </div>
                        <div>
                            <label className='text-xs'>Start Date</label>
                            <Input type="date" defaultValue={item?.startDate} name="startDate" onChange={(event) => handleChange(index, event)}/>
                        </div>
                        <div>
                            <label className='text-xs'>End Date</label>
                            <Input type="date" name="endDate" defaultValue={item?.endDate} onChange={(event) => handleChange(index, event)}/>
                        </div>
                        <div className='col-span-2'>
                           <RichTextEditor defaultValue={item?.workSummary} index={index} onRichTextEditorChange={(event) => handleRichTextEditor(event, 'workSummary', index)}/>
                        </div>
                    </div>
                </div>
            ))}
         </div>
         <div className='flex justify-between'>
            <div className="flex gap-2">
                <Button variant="outline" className="text-primary" onClick={addNewExperience}>+ Add More Experience</Button>
                <Button variant="outline" className="text-primary" onClick={removeExperience}>- Remove</Button>
            </div>
            <Button disabled={loading} onClick={() => onSave()}>{
                loading ? <LoaderCircle className='animate-spin'/> : 'Save'
                }</Button>
         </div>

    </div>
  )
}

export default Experience