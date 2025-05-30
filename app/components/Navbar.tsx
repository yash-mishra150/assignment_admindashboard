import * as React from 'react';
import Image from 'next/image';
import logo from '@/public/logoplace.svg'

const Navbar = () => {
    return (
        <div className="flex h-[10vh] justify-between px-[3vw] bg-[#083434] p-4 ">
            <Image src={logo} alt="Logo" className="w-28" />
            <div className='flex items-center gap-2'>
                <Image src="/profile.png" alt="Profile" width={30} height={30} className="rounded-full" />
                <h1 className='text-white text-base'>Luis Fernando</h1>
            </div>
        </div>
    );
};

export default Navbar;