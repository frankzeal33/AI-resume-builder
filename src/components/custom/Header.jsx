import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'
import Theme from './Theme'
import { SquareDashedBottomCodeIcon } from 'lucide-react'

const Header = () => {
  const {user, isSignedIn} = useUser()

  return (
    <div className='p-3 px-5 flex justify-between items-center shadow-md fixed w-full h-16 z-10 bg-white dark:bg-background dark:border-b-white border-b'>
      <Link to={'/'}>
        <div className='flex items-center'>
          <img src='/logo.svg' width={50} height={50}/>
          <h2 className='text-2xl font-black'>CV.ai</h2>
        </div>
      </Link>

      {isSignedIn ? 
        <div className='flex gap-2 items-center'>
          <Theme/>
          <Link to={'/dashboard'}>
            <Button variant="outline" className="dark:bg-primary dark:border-none hidden md:block">Dashboard</Button>
            <Button variant="outline" className="dark:bg-primary dark:border-none md:hidden"><SquareDashedBottomCodeIcon/></Button>
          </Link>
          <UserButton/>
        </div> :
        <div className='flex items-center gap-2'>
          <Theme/>
          <Link to={'/auth/sign-in'}>
            <Button variant="outline" className="text-base font-medium">Sign In</Button>
          </Link>
          <Link to={'/auth/sign-up'}>
            <Button className="text-base font-medium">Sign Up</Button>
          </Link>
        </div>
      }

    </div>
  )
}

export default Header