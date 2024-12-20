import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../components/FormSection';
import ResumePreview from '../components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import dummy from '@/data/dummy';
import GlobalApi from './../../../../service/GlobalApi';

const EditResume = () => {
    const {resumeId} = useParams();
    const [resumeInfo, setResumeInfo] = useState()

    useEffect(() => {
        getResumeInfo()
    },[])

    const getResumeInfo = () => {
      GlobalApi.GetResumeById(resumeId).then(res => {
        console.log(res.data.data)
        setResumeInfo(res?.data?.data)
      })
    }


  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
      <div className='grid grid-cols-1 md:grid-cols-2 p-10 pt-24 gap-10'>
        {/* form section */}
        <FormSection/>
        
        {/* preview section */}
        <ResumePreview/>
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume