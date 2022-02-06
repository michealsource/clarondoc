import React,{useState, useEffect} from 'react'
import './Blog.css'
import BlogModal from './BlogModal';
import MainLayout from "../MainLayout"
import {fetchArticles,mediumPosts} from "../../Api/blog"
import loading from '../../images/loading.gif'


function Blog() {

    const[openModal, setOpenModal] = useState(false)
    const[product, setProduct]= useState({})
    const [blogs, setBlogs] = useState([])


    useEffect(() => {
        const getBlogs = async () => {
            const blog = await mediumPosts()
            console.log(blog, "blogs")
            setBlogs(blog)
        }
        getBlogs()

    }, [])
    return (
        <MainLayout>
        <div className="blog-container">

        {
            blogs.length ? (
                <div className="blog-row">
                {blogs.map((data)=>(
                    <a href={data.link} rel="noopener noreferrer" target="_parent">
                        <div key={data.id} className="blog-column"  >
                        <img className="blog-img" src={data.thumbnail} alt="blog-img"/>
                        <h4 className="blog-title">{data.title}</h4>
                        <div className="categories">
                        {data.categories.map(item => (
                            <button className= "btn-category">{item}</button>
                            ))}
                        </div>
                    </div>
                    </a>
                )
                )}
                
            </div>
            ): (<img src={loading} alt="" className="loader-img"/>)
        }
            

            <BlogModal openModal={openModal} setOpenModal={setOpenModal} product={product}/>

        </div>
        </MainLayout>
    )
}

export default Blog
