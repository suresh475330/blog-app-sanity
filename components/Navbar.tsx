import { FC, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';

const Navbar: FC = () => {

  const [active, setActive] = useState(false)

  const showMenu = (active &&
    <>
      <div className='md:hidden p-4 w-200 bg-white rounded-lg fixed top-24 right-7 flex flex-col items-center justify-evenly gap-5'>
       <Link href='/about'><a> <h3 onClick={()=> setActive(false)} className='cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out'>About</h3></a></Link>
       <Link href='/contact'><a> <h3 onClick={()=> setActive(false)} className='cursor-pointer  hover:scale-105 transition-transform duration-200 ease-in-out'>Contact</h3></a></Link>
        <a href='https://www.instagram.com/suresh__sk__07'  rel="noreferrer" target="_blank" >   <h3 onClick={()=> setActive(false)} className='cursor-pointer rounded-full bg-green-600 px-4 py-1 text-white  hover:scale-105 transition-transform duration-200 ease-in-out'>Follow</h3></a>
        <h3 onClick={()=> setActive(false)} className='cursor-pointer  hover:scale-105 transition-transform duration-200 ease-in-out'>Sign IN</h3>
        <h3 onClick={()=> setActive(false)} className='cursor-pointer rounded-full border border-green-600 px-4 py-1  hover:scale-105 transition-transform duration-200 ease-in-out'>Get Started</h3>
      </div>
    </>

  )

  return (
    <>
      <header className='sticky top-0 z-50 md:max-w-7xl bg-white mx-auto flex max-w-full justify-between p-5'>

        <div className='flex items-center space-x-5'>
          <Link href='/'>
            <a>
              <Image className=" cursor-pointer object-contain" width={35} height={35} src='/images/head-logo.png' alt="logo" />
            </a>
          </Link>

          <div className='hidden md:items-center space-x-5 md:inline-flex '>
           <Link href='/about'><a> <h3 className='cursor-pointer'>About</h3></a></Link>
           <Link href='/contact'><a> <h3 className='cursor-pointer'>Contact</h3></a></Link>
          <a href='https://www.instagram.com/suresh__sk__07' rel="noreferrer" target="_blank" > <h3 className='rounded-full bg-green-600 px-4 py-1 text-white cursor-pointer'>Follow</h3></a>
          </div>

        </div>
        <div className='hidden md:flex items-center space-x-5 text-gray-600  md:inline-flex'>
          <h3 className='cursor-pointer'>Sign IN</h3>
          <h3 className='rounded-full border cursor-pointer border-green-600 px-4 py-1'>Get Started</h3>
        </div>


        <div className="md:hidden cursor-pointer block  ml-auto " onClick={() => setActive(!active)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </div>

        {showMenu}
      </header>
    </>
  )
}

export default Navbar;
