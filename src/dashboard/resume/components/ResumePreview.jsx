import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummaryPreview from './preview/SummaryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillPreview from './preview/SkillPreview'

const ResumePreview = () => {

  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)

  return (
    <div className='shadow-lg h-full p-14 border-t-[20px] border' style={{borderTopColor: resumeInfo?.themeColor}}>
      {/* personal details */}
      <PersonalDetailPreview resumeInfo={resumeInfo}/>


      {/* summary */}
      <SummaryPreview resumeInfo={resumeInfo}/>

      {/* professional experience */}
      <ExperiencePreview resumeInfo={resumeInfo}/>

      
      {/* educational */}
      <EducationalPreview resumeInfo={resumeInfo}/>

      {/* skills */}
      <SkillPreview resumeInfo={resumeInfo}/>


    </div>
  )
}

export default ResumePreview