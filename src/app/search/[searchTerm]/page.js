import React from 'react'
import Container from '@/app/components/Container'
import {colscheme} from  "@/app/utils/module"

const page = ({ params }) => {
  let color=colscheme(params.searchTerm)
  return (
    <div className='bg-gray-100 dark:bg-gray-800 min-h-screen'>
    <Container category={params.searchTerm} API={process.env.API} color={color} />
    </div>
)
}

export default page