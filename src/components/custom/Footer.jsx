import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-primary'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-10 px-5 pt-16 pb-10'>
            <div>
                <div className='flex items-center'>
                    <img src='/footer-logo.png' width={50} height={50}/>
                    <h2 className='text-2xl font-black'>CV.ai</h2>
                </div>
                <p className='text-white'>The Best AI powered Resume Builder, Trusted by 5 millions job seekers.</p>
            </div>

            <div>
                <h3 className='text-xl font-bold pb-3'>Quick Links</h3>
                <ul className='flex flex-col space-y-2'>
                    <Link to={'/'} className='text-white text-base hover:text-black'><li>How to Create Resume</li></Link>
                    <Link to={'/'} className='text-white text-base hover:text-black'><li>Resume Guide</li></Link>
                    <Link to={'/'} className='text-white text-base hover:text-black'><li>Help Center</li></Link>
                    <Link to={'/'} className='text-white text-base hover:text-black'><li>Resume Templetes</li></Link>
                </ul>
            </div>

            <div>
                <h3 className='text-xl font-bold pb-3'>Company</h3>
                <ul className='flex flex-col space-y-2'>
                    <Link to={'/'} className='text-white text-base hover:text-black'><li>About Us</li></Link>
                    <Link to={'/'} className='text-white text-base hover:text-black'><li>Contact Us</li></Link>
                    <Link to={'/'} className='text-white text-base hover:text-black'><li>Privacy Policy</li></Link>
                    <Link to={'/'} className='text-white text-base hover:text-black'><li>Our Blog</li></Link>
                </ul>
            </div>
        </div>
        <p className='text-center bg-black text-white px-5 py-2'>&copy; {new Date().getFullYear()} <Link to={'/'} className='text-primary'>CV.ai.</Link> All Rights Reserved.</p>
    </footer>
  )
}

export default Footer