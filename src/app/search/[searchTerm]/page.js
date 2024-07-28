import React from 'react'
import Container from '@/app/components/Container'
import {colscheme} from  "@/app/utils/module"
import Navbar from '@/app/components/Navbar'

const page = ({ params }) => {
  let color=colscheme(params.searchTerm)
  return (
    <>
    <Navbar/>
    <Container category={params.searchTerm} API={process.env.API} color={color} />
    </>
)
}

export default page