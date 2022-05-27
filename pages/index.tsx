
import Navbar from '../components/Navbar'
import Image from 'next/image'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings.d'
import Link from 'next/link'
import Head from 'next/head'

interface props {
  posts: Post[]
}

const Home = ({ posts }: props) => {


  return (
    <>
     <Head>
      <title>Blog App</title>
       <meta name="description" content="playing with next-js and typescript and tailwind css  creating the blog app" />
        <link rel="shortcut icon" href="/images/head-logo.png" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className='mx-auto max-w-7xl'>
      <Navbar />
      <div className='flex items-center justify-between border-y border-black-600 bg-yellow-400 py-10 lg:py-0'>
        <div className='space-y-5 px-10'>
          <h1 className='max-w-xl font-serif text-4xl'>
            <span className='underline decoration-black  decoration-4'>Bolg</span> Is a place to write, read and connect </h1>
          <h2 className='text-sm'>It's easy and free to post your thinking on any topic and connect with million of readers. </h2>
        </div>
        <Image className='hidden h-32  md:inline-flex  lg:h-full ' width={250} height={180} src='/images/bolg-logo.png' />
      </div>

      <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
          {posts.map((post:Post) => (<Link href={`/post/${post.slug.current.toString()}`} key={post._id}>
            <div className='group cursor-pointer overflow-hidden rounded-lg border'>
              <img src={urlFor(post.mainImage).url()} alt="poster" />
              <div className="flex justify-between bg-white p-5">
                <div>
                  <p className="text-lg font-bold ">{post.title}</p>
                  <p className="text-xs">{post.description} by {post.author.name}</p>
                </div>
                <img src={urlFor(post.author.image).url()} alt="author" className='h-12 w-12 rounded-full' />
              </div>
            </div>          
            </Link>))}

      </div>
      <hr className=" mx-auto border border-yellow-500 my-5  max-w-sm md:max-w-2xl" />
      <div className="flex items-center justify-center mb-3">
        <h1 className="text-sm text-slate-900">Created By <a href='https://www.instagram.com/suresh__sk__07'>Suresh</a></h1>
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
      image
    },
    mainImage,
    description,
    
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
