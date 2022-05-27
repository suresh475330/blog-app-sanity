
import { GetServerSideProps } from 'next'
import React, { useState } from 'react';
import PortableText from 'react-portable-text';
import Navbar from '../../components/Navbar';
import { sanityClient, urlFor } from '../../sanity';
import { Post ,Comment} from '../../typings'
import {useForm,SubmitHandler,UseFormProps} from 'react-hook-form'

interface Ipost {
    post : Post
}

interface IformInput extends UseFormProps{
  _id:string,
  name:string,
  email:string,
  comment:string
}

const Post = ({post} : Ipost)=>{  
    console.log(post);

    const [submited,setSubmited] = useState<boolean>(false)

    const onSubmit:SubmitHandler<IformInput> = async (data)=>{
     try {
        const resopnse = await fetch('/api/createComment',{
          method:"POST",
          body:JSON.stringify(data)
      })
      const some = await resopnse.json()
      setSubmited(true)
      } catch (error) {
        console.log(error); 
      setSubmited(false)

      }
    }

  const { register,
    handleSubmit,
    formState: { errors}} = useForm<IformInput>()
       

    return(
       <main>
          
           <Navbar />
           <img className='h-40 w-full object-cover' src={urlFor(post.mainImage).url()} alt="img" />
          <article className='mx-auto max-w-3xl p-5'>
              <h1 className="mt-10 mb-3 text-3xl  ">{post.title}</h1>
              <h2 className="mb-2 text-xl font-light text-gray-500">{post.description}</h2>
              
              <div className="flex items-center justify-between space-x-2">
             <div className='flex items-center space-x-2'>
              <img className='w-10 h-10 rounded-full' src={urlFor(post.author.image).url()} alt="img" />
              <p className="text-sm font-extralight">Blog post by{' '}
              <span className='text-green-600'>{post.author.name} - published at {new Date(post._createdAt).toLocaleString()}</span></p>
             </div>
             
              {post.manuscriptURL && <a className= ' mr-10 text-sm  text-red-600 font-bold border rounded p-2' href={`${post.manuscriptURL}?dl=`}>Download pdf</a>}
              </div>
             
              <div className="mt-10">
              <PortableText 
              dataset={process.env.NEXT_PUBLIC_SANITY_PROJECT_DATASET}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
              content={post.body}
              serializers={{
                  h1 : (props:any)=>{
                    <h1 className='my-5 text-2xl font-blod'>{props}</h1>
                  },
                  h2 : (props:any)=>{
                    <h1 className='my-5 text-xl font-blod'>{props}</h1>
                  },
                  p : (props : any)=>{
                   <li className='ml-4 list-disc'>{props}</li>
                  },
                  li : ({children} : any)=>{
                    <li className='my-5 text-xl font-blod'>{children}</li>
                  },
                  link : ({children,href} : any)=>{
                    <a href={href} className='my-5 text-xl font-blod'>{children}</a>
                  },

              }}
              />
              
              </div>
          </article>

       <hr className="my-5 mx-auto max-w-md border border-yellow-500 md:max-w-lg" />
        
        {
          submited ? (
            <div className='my-5 mx-auto flex max-w-md md:max-w-2xl flex-col bg-yellow-500 p-10 text-white'>
              <h3 className='text-3xl font-bold'>Thank you for submiting your comment!</h3>
            <p>Done it has been approved, it will below!</p>
            </div>
          ) : (
            
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mb-10 flex max-w-2xl flex-col p-5">
        <h3 className="text-sm text-yellow-500">Enjoyed this article ? </h3>
        <h4 className="text-3xl font-bold">Leave a comment below!</h4>
      <hr className="mt-2 py-3" />

      <input type="hidden" {...register('_id')} value={post._id} name='_id' className="" />

      <label className="mb-5 block">
        <span className="text-gray-700">Name</span>
        <input 
           {...register('name',{required:true})}
        type="text" 
        className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
         placeholder='your name'
         />
      </label>

      <label className="mb-5 block">
        <span className="text-gray-700">Email</span>
        <input 
           {...register('email',{required:true})}
        type="email" 
        className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
         placeholder='example@gamil.com'
         />
      </label>

      <label className="mb-5 block">
        <span className="text-gray-700">Comment</span>
        <textarea
           {...register('comment',{required:true})}
        rows={8 }
        className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
         placeholder='some message' 
         />
      </label>

      <div className="flex col p-5">
        {errors.name && (<span className='text-red-500'>Name is required</span>)}
        {errors.email && (<span className='text-red-500'>Email is required</span>)}
        {errors.comment && (<span className='text-red-500'>Comment is required</span>)}
      </div>

      <input type="submit"
       className="focus:shadow-outline cursor-poniter rounded-sm bg-yellow-500 py-2 px-4 font-bold text-white shadow hover:bg-yellow-400 focus:outline-none" />
       </form>
          )
        }

  <div className='my-10 mx-auto flex max-w-2xl flex-col space-y-2 p-10 shadow shadow-yellow-500'>
  <h3 className="text-4xl">Commnets</h3>
  <hr className="pb-2" />

  {post.comments.map((comment: Comment)=>{
    return(
      <div key={comment._id}>
       <p><span className='text-yellow-500 font-bold'>{comment.name}</span> : {comment.comment}</p>
      </div>
    )
  })}
  </div>


        </main>
    )
}

export default Post;

export const getServerSideProps: GetServerSideProps = async (context) => {

const queryDb = `*[_type=="post" && slug.current== $slug][0]{
    _id,
    _createdAt,
    "manuscriptURL": manuscript.asset->url,
    title,
    slug,
    author->{
    name,
    image
  },
  "comments" : *[
    _type == "comment" &&
    post._ref == ^._id &&
    approved == true
  ],
  mainImage,
  description,
  body
  }`;

  const post = await sanityClient.fetch(queryDb,{
      slug : context.query.slug
  })

  if(!post){
      return{
          notFound:true
      }
  }
    return {
    props : {
        post,
    }
}
 
}


