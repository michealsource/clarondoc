import React, {useState, useEffect} from 'react'
import {Grid,Box,Dialog,DialogTitle,DialogContent,IconButton} from '@mui/material';
import { FiX } from "react-icons/fi";
import './Blog.css'
import { FaUserAlt,FaCalendarAlt } from "react-icons/fa";
import axios from "axios"



function BlogModal({openModal,setOpenModal,product}) {
    const [blogDetails, setBlogDetails] = useState({})
   
  
    return (
        <div className="details-container">
            <Dialog open={openModal} fullWidth={true}>
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                    <div></div>
                    <IconButton onClick={()=>setOpenModal(false)}>
                        <FiX/>
                    </IconButton>    
                    </Box>
                </DialogTitle>
                <DialogContent>
                        <div>
                            <h2>{product.title}</h2>
                        </div>
                       <div className="name-date-container">
                           <p><FaUserAlt/> <span>Akin Delu </span>  <FaCalendarAlt/>  August 01, 2020 12:59</p>
                       </div>

                       <div class="blog-data-content">
                           {product.content}
                       </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default BlogModal
