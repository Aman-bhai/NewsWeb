import React from 'react'
import Container from '@/app/components/Container'
import {colscheme} from  "@/app/utils/module"

const page = ({ params }) => {
  let color=colscheme(params.category)
  return (
    <>
    <Container category={params.category} API={process.env.API} color={color} />
    </>
)
}

export default page