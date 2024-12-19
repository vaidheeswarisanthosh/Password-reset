import React from 'react'
import ForgotPassword from '../components/ForgotPassword'

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100' >
        <h1 className='mb-4 text-3xl italic font-bold text-gray-800 font-poppins'>Password Reset Flow</h1>
        <ForgotPassword/>
    </div>

    
  )
}

export default Home