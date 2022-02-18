import React,{useEffect} from 'react';
import MainLayout from '../MainLayout'
const axios = require('axios');
function ClaronTerms() {
   
    useEffect(()=>{
        (async()=>{
         const data =   axios.get("https://clarondoc.com/terms")
         console.log(data)
          })()
    },[])
    return (
        <MainLayout>p
            <div class="aboutclarondc-container">
                <h2>Terms and Conditions</h2>
                
                <p></p>
            </div>
        </MainLayout>

    )

}

export default ClaronTerms;
