'use client';
import { sendPrompt } from '@/actions/notdiamond';
import { Spinner } from '@/components/ui/spinner';
import { Logout02Icon } from 'hugeicons-react';
import { SendHorizonal } from 'lucide-react';
import Image from 'next/image';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  // const [promptHistory, setPromptHistory] = useState([]);,
  const [results, setResults] = useState([] as string[]);
  const [isPromptSubmitting, setIsPromptSubmitting] = useState(false);

  const submitPrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPromptSubmitting(true);
    try {
      console.log('Prompt:', prompt);
      const result = await sendPrompt(prompt);

      setResults([...results, result as string]);
      // setPromptHistory([...promptHistory, { prompt, result }]);

      // save prompt message to local storage and also save the result to local storage {prompt: 'message', result: 'response'}
    } catch (error) {
      console.log(error);
    } finally {
      setIsPromptSubmitting(false);
      setPrompt('');
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
    <div className='h-screen bg-[#1c1d1e] text-white flex'>
      {/* Sidebar */}
      <div className='w-1/4 bg-[#000000] flex flex-col justify-between p-6 max-sm:hidden'>
        <div>
          {/* Logo */}
          <div className='flex items-center space-x-2 mb-10'>
            <Image
              src={'/logo.jpeg'}
              className='rounded-full h-11 -ml-5 mt-4 object-cover'
              width={200}
              height={50}
              alt='Logo'
            />
          </div>

          {/* Navigation */}
          <nav className='space-y-4'>
            <button className='bg-white text-black w-full text-left px-6 py-3 rounded-[50px] hover:bg-gray-300'>
              Ask Larc
            </button>
            <button
              onClick={() => toast.info('To Be Released Soon!')}
              className=' w-full text-left px-6 py-3 rounded-[50px] hover:bg-gray-300 hover:text-black'
            >
              Image Generator
            </button>
            <button
              onClick={() => toast.info('To Be Released Soon!')}
              className=' w-full text-left px-6 py-3 rounded-[50px] hover:bg-gray-300 hover:text-black'
            >
              Video Generator
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
          <div className='bg-[#000000] text-sm flex items-center space-x-4 px-4 py-2 rounded-[50px]'>
            <button className='bg-[#2f2f2f] rounded-full items-center  p-3'>
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
            <span className='absolute flex flex-col items-center top-12'>
              <h1 className='text-3xl font-bold font-mono'>Simplicity In Unity</h1>
              <h3 className='text-l font-mono text-gray-500'>
                Ask Larc anything without bothering going anywhere else
              </h3>
              <h1>{results[results.length - 1]}</h1>
            </span>
            <Image src={'/bg-image.png'} width={300} height={200} alt='bg image' />
            <form
              onSubmit={(e) => submitPrompt(e)}
              className='absolute  bottom-10 flex flex-row  justify-between space-x-2 w-5/6'
            >
              <input
                type='text'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder='Type your message here...'
                className=' w-full bg-[#2f2f2f] px-5 py-5 rounded-full outline-none focus:ring-2 focus:ring-[#252525]'
              />
              <button type='submit' className=' bg-[#000000] px-5 py-5 rounded-full hover:bg-[#101010] '>
                {isPromptSubmitting ? <Spinner className='text-white w-6 h-6' /> : <SendHorizonal />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
