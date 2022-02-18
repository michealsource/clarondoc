import React,{useEffect} from 'react';
import MainLayout from '../MainLayout'
const axios = require('axios');
function ClaronTerms() {
    const terms = ()=>{
        axios.get("https://clarondoc.com/terms")
    }
    useEffect(()=>{
        
    },[])
    return (
        <MainLayout>
            <div class="aboutclarondc-container">
                <h2>Terms and Conditions</h2>
                <p></p>
            </div>
        </MainLayout>

    )

}

export default ClaronTerms;
