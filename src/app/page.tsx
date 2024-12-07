'use client';
import { Spinner } from '@/components/ui/spinner';
import { Logout02Icon } from 'hugeicons-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  // const [promptHistory, setPromptHistory] = useState([]);
  const [isPromptSubmiting, setIsPromptSubmiting] = useState(false);

  const submitPrompt = async () => {
    try {
      setIsPromptSubmiting(true);
      console.log(isPromptSubmiting);
      setTimeout(function () {
        console.log('hlo');
        //your code to be executed after 1 second
      }, 1000);

      // save prompt message to local storage and also save the result to local storage {prompt: 'message', result: 'response'}
    } catch (error) {
      console.log(error);
    } finally {
      setIsPromptSubmiting(false);
    }
  };

  useEffect(() => {
    const getPromptHistory = async () => {
      try {
        // setPromptHistory([]);
      } catch (error) {
        console.log(error);
      }
    };

    getPromptHistory();
  });

  return (
    <div className='h-screen bg-black text-white flex'>
      {/* Sidebar */}
      <div className='w-1/4 bg-gray-900 flex flex-col justify-between p-6 max-sm:hidden'>
        <div>
          {/* Logo */}
          <div className='flex items-center space-x-2 mb-10'>
            <div className='bg-white text-black rounded-full h-8 w-8 flex items-center justify-center font-bold'>
              ⚡
            </div>
            <h1 className='text-xl font-semibold'>Larc AI</h1>
          </div>

          {/* Navigation */}
          <nav className='space-y-4'>
            <button className='bg-white text-black w-full text-left px-6 py-3 rounded-[50px] hover:bg-gray-300'>
              New Chat
            </button>
            <button className=' w-full text-left px-6 py-3 rounded-[50px] hover:bg-gray-300 hover:text-black'>
              Main Dashboard
            </button>
            <button className=' w-full text-left px-6 py-3 rounded-[50px] hover:bg-gray-300 hover:text-black'>
              Profile Settings
            </button>
          </nav>
        </div>

        {/* Chat History */}

        {/* Profile */}
        <div className='flex items-center space-x-3 justify-between'>
          <div className='flex  space-x-3 items-center'>
            <Image
              src={'/tony-start.jpeg'}
              width={50}
              height={50}
              alt='Profile Pic'
              className='rounded-full'
            />

            <div className='text-sm'>
              <h2 className='font-semibold'>Nihal Sharma</h2>
              <h3>Basic User</h3>
            </div>
          </div>

          <Logout02Icon className='cursor-pointer' />
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex flex-col'>
        {/* Header */}
        <div className='flex justify-end p-6'>
          <div className='bg-gray-800 text-sm flex items-center space-x-4 px-4 py-2 rounded-[50px]'>
            <button className='bg-gray-600 rounded-full items-center  p-3'>
              <Logout02Icon />
            </button>

            <Image
              src={'/tony-start.jpeg'}
              width={50}
              height={50}
              alt='Profile Pic'
              className='rounded-full'
            />
          </div>
        </div>

        {/* Content Area */}
        <div className='relative flex-1 flex items-center justify-center'>
          <div className=' flex flex-col items-center w-full '>
            <Image src={'/bg-image.png'} width={300} height={200} alt='bg image' />
            <div className='absolute  bottom-10 flex flex-row  justify-between space-x-2 w-5/6'>
              <input
                type='text'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder='Type your message here...'
                className=' w-full bg-gray-800 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-gray-600'
              />
              <button
                onClick={() => submitPrompt()}
                className=' bg-gray-700 px-6 py-2 rounded-lg hover:bg-gray-600'
              >
                {isPromptSubmiting ? <Spinner /> : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
