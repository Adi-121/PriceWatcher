import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const navIcons = [
    {src : "/assets/icons/search.svg", alt : "search" , href : "/#searchBar"},
    {src : "/assets/icons/black-heart.svg", alt : "heart", href :"/#trending"},
    {src : "/assets/icons/user.svg", alt : "user"}
]


const Navbar = () => {
  return (
    <header className='w-full'>
        <nav className='nav'>
            <Link href="/" className='flex items-center gap-1'>
                <Image alt = "logo" src="/assets/icons/logo.svg" width={27} height={27}></Image>
                <p className='nav-logo'> 
                    Price<span className='text-primary'>Watcher</span>
                </p>
            </Link>

            <div className='flex items-center gap-5'>

                {
                    navIcons.map((icon,index) =>(
                        <Link key={index} href={icon.href || "/"}>
                            
                            <Image src={icon.src} alt={icon.alt} width={24} height={24} />
                            
                        </Link>
                    ))
                    
                }
            </div>
        </nav>
    </header>
  )
}

export default Navbar