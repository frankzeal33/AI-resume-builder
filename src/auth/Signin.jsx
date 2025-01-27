import Header from '@/components/custom/Header'
import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const Signin = () => {
  return (
    <div>
      <Header/>
      <div className='flex items-center justify-center p-4 min-h-[60vh] pt-24'>
        <SignIn/>
      </div>
    </div>
  )
}

export default Signin