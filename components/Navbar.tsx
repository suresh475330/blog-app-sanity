import { FC } from 'react'
import Link from 'next/link';
import Image from 'next/image';

const Navbar: FC = () => {

  return (
    <>
      <header className='sticky top-0 z-50 bg-white mx-auto flex max-w-full justify-between p-5'>
        <div className='flex items-center space-x-5'>
          <Link href='/'>
          <Image className=" cursor-pointer object-contain" width={35} height={35} src='/images/head-logo.png' alt="logo" />
            {/* <img src="https://cdn-icons-png.flaticon.com/512/60/60736.png" alt="logo"
              className="w-8 cursor-pointer object-contain" /> */}
          </Link>
          <div className='hidden items-center space-x-5 md:inline-flex'>
            <h3>About</h3>
            <h3>Contact</h3>
            <h3 className='rounded-full bg-green-600 px-4 py-1 text-white'>Follow</h3>
          </div>
        </div>
        <div className='flex items-center space-x-5 text-gray-600'>
          <h3>Sign IN</h3>
          <h3 className='rounded-full border border-green-600 px-4 py-1'>Get Started</h3>
        </div>
      </header>
    </>
  )
}

export default Navbar;