
import Navbar from '../components/Navbar'
import Image from 'next/image'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings.d'
import Link from 'next/link'
import Head from 'next/head'
import { useState } from 'react'

interface props {
  posts: Post[]
}


const Home = ({ posts }: props) => {
  
  // console.log(posts);
  const [blogs,setBlogs] = useState(posts)

  const blogFilter = (cat : string) =>{
   const filterList =  posts.filter((x)=> x.categories === cat)
    setBlogs(filterList)
  }
  
 

  return (
    <>
        <div className='mx-auto max-w-7xl'>
     <Head>
      <title>Blog App</title>
       <meta name="description" content="playing with next-js and typescript and tailwind css  creating the blog app" />
        <link rel="shortcut icon" href="/images/head-logo.png" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
      <Navbar />

      <div className='flex items-center justify-between border-y border-black bg-yellow-400 py-10 lg:py-0'>
        <div className='space-y-5 px-10'>
          <h1 className='max-w-xl font-serif text-6xl'>
            <span className='underline decoration-black  decoration-4'>Bolg</span> Is a place to write, read and connect </h1>
          <h2 className='text-sm'>It easy and free to post your thinking on any topic and connect with million of readers. </h2>
        </div>
        <Image className='hidden h-32  md:inline-flex  lg:h-full ' width={250} height={180} src='/images/bolg-logo.png' />
      </div>

      <div className="flex items-center justify-center my-5">
         <h1 className="max-w-xl text-3xl text-slate-700  ">Category</h1>
      </div>

      <hr className="border border-black my-2 mx-auto max-w-sm md:max-w-2xl" />

      <div className="flex items-center justify-center space-x-3 md:space-x-10 max-w-7xl mx-auto my-5  ">
        <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow' onClick={()=> setBlogs(posts)}>All</button>
        <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'onClick={()=> blogFilter('Sports')}>Sports</button>
        <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'onClick={()=> blogFilter('Education')}>Education</button>
        <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'onClick={()=> blogFilter('News')}>News</button>
      </div>

      <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
          {blogs.map((post:Post) => (
            <div key={post._id} className='group cursor-pointer overflow-hidden rounded-lg border'>
               <Link href={`/post/${post.slug.current.toString()}`} key={post._id}>
             <a>
              <img className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={post.mainImage ? urlFor(post.mainImage).url() : "https://cdn.pixabay.com/photo/2012/05/07/18/57/blog-49006_960_720.png"} alt="poster" />
             </a>
              </Link>
              <div className="flex justify-between bg-white p-5">
                <div>
                  <p className="text-lg font-bold ">{post.title}</p>
                  <p className="text-xs">{post.description} by {post.author.name}</p>
                </div>
                <Link href={`/author/${post.author.slug.current.toString()}`}>
                <a>
                <img src={urlFor(post.author.image).url()} alt="author" className='h-12 w-12 rounded-full' />
                </a>
                </Link>
              </div>
            </div>          
            ))}

      </div>
      <hr className=" mx-auto border border-yellow-500 my-5  max-w-sm md:max-w-2xl" />
      <div className="flex items-center justify-center mb-3">
        <h1 className="text-sm text-slate-900">Created By <a href='https://www.instagram.com/suresh__sk__07' rel='noreferrer' target="_blank"> Suresh kumar</a></h1>
      </div>
    </div>
    </>
  )
}

export default Home



export const getServerSideProps = async () => {
  try {
    const query = `*[_type=="post"]{
      _id,
      title,
      slug,
      author->{
      name,
      image,
      slug
    },
    mainImage,
    description,
    categories,
    }`
    
    const posts = await sanityClient.fetch(query);
    
    return {
      props: {
        posts,
      }
    }
  } catch (error) {
    console.log(error);

  }
} 



// *[_type=="post" && slug.current== $slug][0]{
//   _id,
// "manuscriptURL": manuscript.asset->url,
//   _createdAt,
//   title,
//   slug,
//   author->{
//   name,
//   image
// },
// "comments" : *[
//  _type == "comment" &&
//  post._ref == ^._id &&
//  approved == true
// ],
// mainImage,
// description,
// body
// }

// {
//   "slug": "my-secod-post"
// }