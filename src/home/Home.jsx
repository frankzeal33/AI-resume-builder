import Footer from '@/components/custom/Footer';
import Header from '@/components/custom/Header'
import { Button } from "@/components/ui/button";
import { useUser } from '@clerk/clerk-react';
import { ChevronRight, Video } from "lucide-react";
import { Link } from 'react-router-dom';

const Home = () => {
  const {user, isSignedIn} = useUser()
  return (
    <div>
      <Header/>
      <div className="w-full pt-24 mb-10">
        <div className=" w-full min-h-screen">
          <div className="w-full flex flex-col items-center justify-center py-6 max-w-4xl mx-auto">
            <div className="rounded-full flex items-center font- font-medium gap-1 text-sm h-auto p-2 bg-muted max-w-80">
              <div className="p-2 h-5 shrink-0 flex items-center text-xs justify-center text-white bg-primary rounded-full">
                New
              </div>
              Resume / CV Builder
              <ChevronRight className="w-4 h-4" />
            </div>

            <div className="flex flex-col mt-5 items-center text-center">
              <h1 className="text-6xl font-black">
                <p>Get your dream job with our</p>
                <p>
                  <span className="bg-gradient-to-r from-primary via-purple-300 to-primary bg-clip-text text-transparent animate-sparkle">
                    AI Powered
                  </span>
                  {"  "}
                  resume builder
                </p>
              </h1>
              <p className=" block text-xl mt-3 font-medium">
                Build a professional resume with our free multiple custom templete builder and share the shareable link with people.
              </p>
              <br />
              <div className="flex items-center gap-2">
                {isSignedIn ? (
                  <Link to={'/dashboard'}>
                    <Button className="h-12 text-base font-medium min-w-32">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link to={'/auth/sign-up'}>
                    <Button className="h-12 text-base font-medium min-w-32">
                      Get Started
                    </Button>
                  </Link>
                )}
                <Button
                  variant="outline"
                  className="h-12  border-primary text-primary text-base font-medium min-w-32"
                  asChild
                >
                  <a className="flex items-center gap-1">
                    <Video size="17px" />
                    Watch video
                  </a>
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full relative max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-full h-[400px] bg-gradient-to-r from-primary to-blue-500 rounded-full blur-3xl opacity-40 z-0" />
            <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-xl shadow-lg bg-background">
              <div className="relative w-full h-full rounded-md">
                <img src="/dashboard.png" alt="Resume Dashboard" className="object-contain w-full h-full rounded-md"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Home