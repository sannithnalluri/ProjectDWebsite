'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoicon from '../Assests/logoicon.png';
import Dashboard from '../Assests/dashboard.png';
import document from '../Assests/document.png';
import idea from '../Assests/idea.png';
import savemoney from '../Assests/save-money.png';
import selfservice from '../Assests/self-service.png';

export default function SideNavbar() {
  const [active, setActive] = useState('');

  const handleClick = (item) => {
    setActive(item);
  };

  return (
    <div>
      <div className='flex justify-center m-2'>
        <Image src={logoicon} alt='logoicon' width={40} />
        <h1 className='text-3xl font-semibold ml-2'>Startiy360</h1>
      </div>
      <ul className='flex flex-col justify-center p-2'>
        <li
          className={`flex text-xl rounded p-2 m-2 ${
            active === 'dashboard' ? 'bg-primary-dark text-white' : 'bg-gray-100 hover:bg-gray-200'
          }`}
          onClick={() => handleClick('dashboard')}
        >
          <Image src={Dashboard} width={25} alt='Dashboard Icon' />
          <Link className='ml-2' href='/'>
            Dashboard
          </Link>
        </li>
        <li
          className={`flex text-xl rounded p-2 m-2 ${
            active === 'personal' ? 'bg-primary-dark text-white' : 'bg-gray-100 hover:bg-gray-200'
          }`}
          onClick={() => handleClick('personal')}
        >
          <Image src={selfservice} width={30} alt='Self Service Icon' />
          <Link className='ml-2' href='/personal'>
            Personal
          </Link>
        </li>
        <li
          className={`flex text-xl rounded p-2 m-2 ${
            active === 'money' ? 'bg-primary-dark text-white' : 'bg-gray-100 hover:bg-gray-200'
          }`}
          onClick={() => handleClick('money')}
        >
          <Image src={savemoney} width={30} alt='Money/Budget Icon' />
          <Link className='ml-2' href='/money'>
            Money/Budget
          </Link>
        </li>
        <li
          className={`flex text-xl rounded p-2 m-2 ${
            active === 'future' ? 'bg-primary-dark text-white' : 'bg-gray-100 hover:bg-gray-200'
          }`}
          onClick={() => handleClick('future')}
        >
          <Image src={idea} width={30} alt='Future Icon' />
          <Link className='ml-2' href='/future'>
            Future
          </Link>
        </li>
        <li
          className={`flex text-xl rounded p-2 m-2 ${
            active === 'keys' ? 'bg-primary-dark text-white' : 'bg-gray-100 hover:bg-gray-200'
          }`}
          onClick={() => handleClick('keys')}
        >
          <Image src={document} width={30} alt='Keys Icon' />
          <Link className='ml-2' href='/keys'>
            Keys
          </Link>
        </li>
      </ul>
    </div>
  );
}
