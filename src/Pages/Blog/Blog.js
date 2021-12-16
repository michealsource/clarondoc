import React,{useState} from 'react'
import './Blog.css'
import BlogModal from './BlogModal';


const blogData =[
    {
        id: 1,
        title:"Hypertension",
        content:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum sed nostrum excepturi soluta minus nam id commodi eius exercitationem ex?",
        date:"August 01, 2020 12:57"
    },
    {
        id: 2,
        title:"Eating Rght!",
        content:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum sed nostrum excepturi soluta minus nam id commodi eius exercitationem ex?",
        date:"August 01, 2020 12:57"
    },
    {
        id: 3,
        title:"Clarn Health Walk",
        content:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum sed nostrum excepturi soluta minus nam id commodi eius exercitationem ex?",
        date:"August 01, 2020 12:57"
    }, {
        id: 4,
        title:"A few tips to help you manage period Pain",
        content:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum sed nostrum excepturi soluta minus nam id commodi eius exercitationem ex?",
        date:"August 01, 2020 12:57"
    },
    {
        id: 5,
        title:"Hypertension",
        content:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum sed nostrum excepturi soluta minus nam id commodi eius exercitationem ex?",
        date:"August 01, 2020 12:57"
    },
    {
        id: 6,
        title:"Hypertension",
        content:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum sed nostrum excepturi soluta minus nam id commodi eius exercitationem ex?",
        date:"August 01, 2020 12:57"
    }

]

function Blog() {

    const[openModal, setOpenModal] = useState(false)
    const[product, setProduct]= useState({})
    return (
        <div className="blog-container">

            <div className="blog-row">
                {blogData.map((data)=>(
                        <div key={data.id} className="blog-column"  onClick={()=>{setOpenModal(true); setProduct(data)}}>
                        <h2 className="blog-title">{data.title}</h2>
                        <p className="blog-content">{data.content}</p>
                        <p className="blog-date">{data.date}</p>
                    </div>
                )
                )}
                
            </div>

            <BlogModal openModal={openModal} setOpenModal={setOpenModal} product={product}/>

        </div>
    )
}

export default Blog
