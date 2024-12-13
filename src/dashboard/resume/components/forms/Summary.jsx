import { Button } from '@/components/ui/button'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../../../service/GlobalApi'
import { Brain, LoaderCircle } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { AIChatSession } from './../../../../../service/AIModel'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

const prompt = "Job Title: {jobTitle}, based on job title give me summary for my resume within 4-5 lines in JSON format for fresher, mid level and experienced."
const Summary = ({enableNext}) => {
    const { toast } = useToast()

    const params = useParams()

    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
    const [summary, setSummary] = useState('')
    const [loading, setLoading] = useState(false)
    const [aiLoading, setAiLoading] = useState(false)
    const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState(null)
    
    useEffect(() => {
        summary && setResumeInfo({
            ...resumeInfo,
            summary: summary
        })
    }, [summary])

    const generateSummaryFromAI = async () => {
        setAiLoading(true)
        const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle)
        const result = await AIChatSession.sendMessage(PROMPT)
        setAiGeneratedSummaryList(JSON?.parse(result.response.text()))
        console.log(result.response.text())
        setAiLoading(false)
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

    const handleSelect = (summary) => {
        console.log(summary)
        setSummary(summary)
        setAiGeneratedSummaryList(null);
    }

  return (
    <div>
        <h2 className='font-bold text-lg'>Summary</h2>
        <p>Add summary for your job title</p>

        <form className='mt-7' onSubmit={onSave}>
            <div className='flex justify-between items-end'>
                <label>Add Summary</label>
                <Button disabled={aiLoading} onClick={() => generateSummaryFromAI()} variant="outline" type="button" size="sm" className="border-primary text-primary">{aiLoading ? <LoaderCircle className='animate-spin'/> : <span className='flex items-center gap-2'><Brain className='h-4 w-4'/> Generate from AI</span>}</Button>
            </div>
            <Textarea required defaultValue={resumeInfo?.summary} className="mt-5" onChange={(e) => setSummary(e.target.value)}/>

            {aiGeneratedSummaryList && <div>
                <h2 className='font-bold text-lg mt-4'>Suggestions</h2>
                <p className='text-sm mb-4'>Click on any of the Suggestions to add to summary</p>
                {Object?.entries(aiGeneratedSummaryList)?.map(([experienceLevel, summary], index) => (
                    <Card role="button" key={index} className="my-4 bg-primary/5 shadow-none border-primary/30" onClick={() => handleSelect(summary?.summary)}>
                        <CardHeader className="py-2">
                            <CardTitle className="font-semibold text-md">{experienceLevel}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                            <p>{summary?.summary}</p>
                            
                        </CardContent>
                </Card>              
                ))}
            </div>}

            <div className='mt-3 flex justify-end'>
                <Button type="submit" disabled={loading}>{loading ? <LoaderCircle className='animate-spin'/> : 'Save'}</Button>
            </div>

        </form>
    </div>
  )
}

export default Summary