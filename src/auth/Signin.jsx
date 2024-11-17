import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const Signin = () => {
  return (
    <div className='flex items-center justify-center p-4 min-h-[100vh]'>
      <SignIn/>
    </div>
  )
}

export default Signin