import React from 'react'
import Container from '@/app/components/Container'
import {colscheme} from  "@/app/utils/module"

const page = ({ params }) => {
  let color=colscheme(params.category)
  return (
    <main className='bg-gray-100 dark:bg-gray-800 min-h-screen'>
    <Container category={params.category} API={process.env.API} color={color} />
    </main>
)
}

export default page