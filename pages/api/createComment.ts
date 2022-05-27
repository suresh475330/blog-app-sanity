import type { NextApiRequest, NextApiResponse } from 'next'
import  SanityClient  from '@sanity/client'

const config = {
    dataset : process.env.NEXT_PUBLIC_SANITY_PROJECT_DATASET,
    projectId : process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCdn : process.env.NODE_ENV === 'production',
    token : process.env.SANITY_API_TOKEN
}

const client = SanityClient(config)

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
 const {_id,name,email,comment} = JSON.parse(req.body)

 try {
    await client.create({
         _type:'comment',
         post:{
             _type:'reference',
             _ref:_id,
         },
         name,
         email,
         comment
     })
 } catch (error) {
     console.log(error);
     return res.status(500).json({msg: "couldn't submit comment",error})
 }
 console.log('message submited');
 
 return res.status(200).json({msg: 'comment submited'})
}