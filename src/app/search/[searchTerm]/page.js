import React from 'react'
import Container from '@/app/components/Container'
import {colscheme} from  "@/app/utils/module"

const page = ({ params }) => {
  let color=colscheme(params.searchTerm)
  return (
    <>
    <Container category={params.searchTerm} API={process.env.API} color={color} />
    </>
)
}

export default page