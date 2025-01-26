import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../service/GlobalApi'
import ResumeCardItem from './components/ResumeCardItem'

const Dashboard = () => {

  const [resumeList, setResumeList] = useState([])
  const {user} = useUser();

  useEffect(() => {
    user && GetResumesList()
  },[user])

  const GetResumesList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(res => {
      setResumeList(res.data.data)
    })
  }

  return (
    <div className='p-10 pt-24 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating AI resume for your next job role</p>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'>
        <AddResume/>
        {
          resumeList.length > 0 && resumeList.map((resume, index) => (
            <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList}/>
          ))
        }
      </div>
    </div>
  )
}

export default Dashboard