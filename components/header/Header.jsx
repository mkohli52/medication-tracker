import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <div className='w-full flex items-center gap-5 border border-b-slate-800 sticky top-0 bg-white'>
            <Image src="/capsule.svg"
                width={50}
                height={50}
            />
            <div className='flex gap-5'>
                <Link href="/">
                    Home
                </Link>
                <Link href="/medicines">
                    Medication
                </Link>
            </div>
        </div>
    )
}

export default Header