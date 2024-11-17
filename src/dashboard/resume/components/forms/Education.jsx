import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { toast } from '@/hooks/use-toast'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'

const Education = () => {

    const [loading, setLoading] = useState(false)
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
    const [educationalList, setEducationalList] = useState([
        {
            universityName:'',
            degree:'',
            major:'',
            startDate:'',
            endDate:'',
            description:''
        }
    ])

    useEffect(() => {
        resumeInfo && setEducationalList(resumeInfo?.education)
    }, [])

    const params = useParams()

    const handleChange = (index, event) => {
        const newEntries = educationalList.slice()
        const {name, value} = event.target
        newEntries[index][name] = value
        setEducationalList(newEntries)
    }

    const addNewEducation = () => {
        setEducationalList([...educationalList, {
            universityName:'',
            degree:'',
            major:'',
            startDate:'',
            endDate:'',
            description:''
        }])
    }

    const removeEducation = () => {
        setEducationalList(educationalList => educationalList.slice(0, -1)) 
    }

    useEffect(() => {
        educationalList && setResumeInfo({
            ...resumeInfo,
            education: educationalList
        })
    }, [educationalList])

    const onSave = () => {
        setLoading(true)
        const data = {
            data: {
                education: educationalList.map(({id, ...rest}) => rest)
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
        <h2 className='font-bold text-lg'>Education</h2>
        <p>Add your Educational Details</p>

        <div>
            {educationalList.map((item, index) => (
                <div key={index}>
                    <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                        <div className='col-span-2'>
                            <label className='text-xs'>University Name</label>
                            <Input name="universityName" defaultValue={item?.universityName} onChange={(event) => handleChange(index, event)}/>
                        </div>
                        <div>
                            <label className='text-xs'>Degree</label>
                            <Input name="degree" defaultValue={item?.degree} onChange={(event) => handleChange(index, event)}/>
                        </div>
                        <div>
                            <label className='text-xs'>Major</label>
                            <Input name="major" defaultValue={item?.major} onChange={(event) => handleChange(index, event)}/>
                        </div>
                        <div>
                            <label className='text-xs'>Start Date</label>
                            <Input type="date" name="startDate" defaultValue={item?.startDate} onChange={(event) => handleChange(index, event)}/>
                        </div>
                        <div>
                            <label className='text-xs'>End Date</label>
                            <Input type="date" name="endDate" defaultValue={item?.endDate} onChange={(event) => handleChange(index, event)}/>
                        </div>
                        <div className='col-span-2'>
                            <label className='text-xs'>Description</label>
                           <Textarea name="description" defaultValue={item?.description} onChange={(event) => handleChange(index, event)}/>
                        </div>
                    </div>
                </div>
            ))}
         </div>
         <div className='flex justify-between'>
            <div className="flex gap-2">
                <Button variant="outline" className="text-primary" onClick={addNewEducation}>+ Add More Education</Button>
                <Button variant="outline" className="text-primary" onClick={removeEducation}>- Remove</Button>
            </div>
            <Button disabled={loading} onClick={() => onSave()}>{
                loading ? <LoaderCircle className='animate-spin'/> : 'Save'
                }</Button>
         </div>
    </div>
  )
}

export default Education