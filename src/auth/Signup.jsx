import Header from '@/components/custom/Header'
import { SignUp } from '@clerk/clerk-react'
import React from 'react'

const Signup = () => {
  return (
    <div>
      <Header/>
      <div className='flex items-center justify-center p-4 min-h-[60vh] pt-24'>
        <SignUp/>
      </div>
    </div>
  )
}

export default Signup