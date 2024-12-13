import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from '@/hooks/use-toast'

const Skills = () => {

    const [loading, setLoading] = useState(false)
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
    const [skillsList, setSkillsList] = useState([
        {
            name:'',
            rating: 0
        }
    ])

    useEffect(() => {
        resumeInfo && setSkillsList(resumeInfo?.skills)
    }, [])

    const {resumeId} = useParams()

    const handleChange = (index, name, value) => {
        const newEntries = skillsList.slice()
        newEntries[index][name] = value
        setSkillsList(newEntries)
    }

    const addNewSkill = () => {
        setSkillsList([...skillsList, {
            name:'',
            rating: 0
        }])
    }

    const removeSkill = () => {
        setSkillsList(skillsList => skillsList.slice(0, -1)) 
    }

    useEffect(() => {
        skillsList && setResumeInfo({
            ...resumeInfo,
            skills: skillsList
        })
    }, [skillsList])

    const onSave = () => {
        setLoading(true)
        const data = {
            data: {
                skills: skillsList.map(({id, ...rest}) => rest)
            }
        }

        GlobalApi.UpdateResumeDetail(resumeId, data).then(res => {
            setLoading(false)
            toast({title: 'Details Updated!'})
        }, (error) => {
            setLoading(false)
            toast({title: 'Server Error, Please try again!'})
        })
    }

  return (
    <div>
        <h2 className='font-bold text-lg'>Skills</h2>
        <p>Add your top professional key skill</p>

        <div>
            {skillsList.map((item, index) => (
                <div key={index} className='py-2'>
                    <div className='flex justify-between border rounded-lg p-3'>
                        <div>
                            <label className='text-xs'>Name</label>
                            <Input defaultValue={item?.name} onChange={(e) => handleChange(index, 'name', e.target.value)}/>
                        </div>
                        <Rating style={{ maxWidth: 120 }} value={item.rating} onChange={(v) => handleChange(index, 'rating', v)} />
                       
                    </div>
                </div>
            ))}
         </div>
         <div className='flex justify-between'>
            <div className="flex gap-2">
                <Button variant="outline" className="text-primary" onClick={addNewSkill}>+ Add More Skill</Button>
                <Button variant="outline" className="text-primary" onClick={removeSkill}>- Remove</Button>
            </div>
            <Button disabled={loading} onClick={() => onSave()}>{
                loading ? <LoaderCircle className='animate-spin'/> : 'Save & Done'
                }</Button>
         </div>
    </div>
  )
}

export default Skills