import { Button } from '@/components/ui/button'
import React, { useContext, useEffect, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../../../service/GlobalApi'
import { Brain, LoaderCircle } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { AIChatSession } from './../../../../../service/AIModel'

const prompt = "Job Title: {jobTitle}, depends on job title give me summary for my resume within 4-5 lines in JSON format with field experienceLevel and summary, with Experience level for fresher, mid level and experienced"
const Summary = ({enableNext}) => {
    const { toast } = useToast()

    const params = useParams()

    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
    const [summary, setSummary] = useState('')
    const [loading, setLoading] = useState(false)
    const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState()
    
    useEffect(() => {
        summary && setResumeInfo({
            ...resumeInfo,
            summary: summary
        })
    }, [summary])

    const generateSummaryFromAI = async () => {
        setLoading(true)
        const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle)
        const result = await AIChatSession.sendMessage(PROMPT)
        setAiGeneratedSummaryList(JSON.parse([result.response.text()]))
        console.log(result.response.text())
        setLoading(false)
        console.log(aiGeneratedSummaryList)
    }

    const onSave = (e) => {
        e.preventDefault()
        setLoading(true)
        const data = {
            data: {summary}
        }
        GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(res => {
            console.log(res)
            enableNext(true)
            setLoading(false)
            toast({title: "Details Updated"})
        }, (error) => {
            setLoading(false)
        })
    }

  return (
    <div>
        <h2 className='font-bold text-lg'>Summary</h2>
        <p>Add summary for your job title</p>

        <form className='mt-7' onSubmit={onSave}>
            <div className='flex justify-between items-end'>
                <label>Add Summary</label>
                <Button onClick={() => generateSummaryFromAI()} variant="outline" type="button" size="sm" className="border-primary text-primary flex gap-2"> <Brain className='h-4 w-4'/> Generate from AI</Button>
            </div>
            <Textarea required defaultValue={resumeInfo?.summary} className="mt-5" onChange={(e) => setSummary(e.target.value)}/>
            <div className='mt-3 flex justify-end'>
                <Button type="submit" disabled={loading}>{loading ? <LoaderCircle className='animate-spin'/> : 'Save'}</Button>
            </div>
        </form>

        {aiGeneratedSummaryList && <div>
            <h2 className='font-bold text-lg'>Suggestions</h2>
            {aiGeneratedSummaryList.map((item, index) => (
                <div key={index}>
                   <h2 className='font-bold my-1'>Level: {item?.experienceLevel}</h2> 
                   <p>{item?.summary}</p>
                </div>
            ))}
        </div>}
    </div>
  )
}

export default Summary