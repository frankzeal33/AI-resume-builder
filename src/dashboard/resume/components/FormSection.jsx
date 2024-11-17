import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import Summary from './forms/Summary'
import Experience from './forms/Experience'
import Education from './forms/Education'
import Skills from './forms/Skills'
import { Link, Navigate, useParams } from 'react-router-dom'
import ThemeColor from './ThemeColor'

const FormSection = () => {

  const [activeFormIndex, setActiveFormIndex] = useState(1)
  const [enableNext, setEnableNext] = useState(false)
  const {resumeId} = useParams()

  return (
    <div  className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <div className='flex justify-between items-center mb-3'>
        <div className='flex gap-2'>
          <Link to={"/dashboard"}><Button className="flex gap-2" size="sm"> <Home/> </Button></Link>
          <ThemeColor/>
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 &&   <Button size="sm" onClick={() => setActiveFormIndex(activeFormIndex-1)}><ArrowLeft/></Button>}
          <Button disabled={!enableNext} className="flex gap-2" size="sm" onClick={() => setActiveFormIndex(activeFormIndex+1)}>Next <ArrowRight/></Button>
        </div>
      </div>

      {/* personal details */}
      {activeFormIndex ===1 && <PersonalDetail enableNext={(v) => setEnableNext(v)}/>}

      {/* summary */}
      {activeFormIndex ===2 && <Summary enableNext={(v) => setEnableNext(v)} />}
    

      {/* professional experience */}
      {activeFormIndex ===3 && <Experience/>}
      
      
      {/* educational */}
      {activeFormIndex ===4 && <Education/>}


      {/* skills */}
      {activeFormIndex ===5 && <Skills/>}

      {/* view resume */}
      {activeFormIndex ===6 && <Navigate to={`/my-resume/${resumeId}/view`}/>}


    </div>
  )
}

export default FormSection