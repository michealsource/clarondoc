import React,{useEffect} from 'react'
import homeImage from '../../images/home-img.svg'
import doc2 from '../../images/claron-2.jpeg'
import playstore from '../../images/playstore.png'
import call from '../../images/help-call.jpg'
import './LandingPage.css'
import 'aos/dist/aos.css'
import Aos from 'aos'
import Navbar from '../../Component/Navbar/Navbar'

function LandingPage() {
    useEffect(() => {
        Aos.init()
    }, [])
    return (
        <>
        <Navbar/>
        <div className="landing-container">
            <section className="landing-page-home">
                <div className="landingpage-image">
                    <img src={homeImage} alt="home" className='home-img'/>
                </div>
                <div className="landing-page-content">
                    <h3>Skip the travel! Take Online Doctor Consultation</h3>
                    <p>ClaronDoc is a leading digital health organization which connect patients with top healthcare professionals.</p>
                </div>
            </section>

            <div className="section-1-container">
                <div className="col-1" data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine" data-aos-duration="600">
                <h2 className='visit-heade'>Visit a doctor from the comfort of your home with ClaronDoc</h2>
                    <p>The fastest killer in developing countries are usually the treatable illnesses and diseases. Too many people are dying unnecessarily because of mis-diagnosis and lack of instant access to qualify health professionals.

                        Would it not be great if you can easily get a second opinion about your diagnosis or prescribed medication from the comfort of your home?

                        Welcome to the world of ClaronDoc, a simple, fast and uncomplicated medical platform, that provides you affordable access to medical practitioners within Ghana!

                        ClaronDoc allows you to have either video, voice or chat consultations via your mobile phones/tablets over the Internet with our  medical practitioners.</p>
                </div>

                <div className="col-2" data-aos="fade-left" data-aos-offset="300" data-aos-easing="ease-in-sine" data-aos-duration="600">
                <img src={doc2} alt="" />
                    
                </div>
            </div>

            <div className="sec-container-claron">
            <h2>WHAT YOU GET WITH ClaronDoc?</h2>
                <div className="section-2-container">
                <div className="sec-col" data-aos="flip-right" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
                    <h3>Flexibility and Accessibility</h3>
                    <p>You don't need to go to hospital / clinic because of minor health problems. ClaronDoc lets patients call from the comfort of your home to quickly consult with a medical practitioners anytime of the day. Our platform allows you the flexibility to choose your prefered method of consulation from either online video, voice or chat.</p>

                    
                </div>
                <div className="sec-col">
                    <h3>Privacy and Confidentiality</h3>
                    <p>Every consultation on myDokita platform is completely private and confidential.</p>
                </div>

                <div className="sec-col" data-aos="flip-left" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
                    <h3>Second Opinion</h3>
                    <p>Research has shown that most of the deaths in developing countries are preventable. With ClaronDoc, you can now quickly get a second opinion on your diagnosis and medical prescriptions thereby reducing the risk of mis-diagnosis or taking the wrong the medications.</p>
                </div>
            </div>
            </div>

            <div className="play-store-conatiner">
                <img className='play-store-container-img' src={playstore} alt="" data-aos="fade-right" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600"/>
                <div>
                    <p data-aos="fade-left" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem, quis vitae, voluptas esse suscipit atque fuga necessitatibus sunt, facere distinctio iste quas officiis reiciendis voluptatum? Minima autem suscipit in? Id voluptas quia voluptatem explicabo sed, deserunt obcaecati. Eveniet similique dolores suscipit labore porro, ullam odit, ipsam vero magnam quos ex expedita repudiandae excepturi voluptatum voluptates iste quia dolor voluptas facilis laborum consectetur esse id deserunt. Ut culpa amet odio est ex ipsum deleniti sed accusamus. Provident, sint temporibus. Saepe at sequi unde totam deserunt, cum vitae hic quaerat distinctio alias pariatur neque doloribus odio accusamus id, minima incidunt atque quod quam esse ab modi, vel reprehenderit! Modi tempora, aut eligendi debitis voluptatum natus perferendis ad aspernatur reiciendis suscipit itaque eius! Ut provident repellendus beatae sint quos distinctio hic pariatur,</p>
                </div>
            </div>

            <div className="online-pharmacy-container">
            <img className='play-store-container-img' src={call} alt=""  data-aos="fade-right" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600"/>
                <div>
                    <h3>Call or chat verified doctors</h3>
                    <p data-aos="fade-left" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600" >With ClaronDoc, you can now talk to a licensed doctor online, through chat, audio call, or video conference and get instant feedback and prescriptions on the go with your mobile phone.</p>
                </div>
            </div>
            <footer>
                <p>© 2020 ClaronDoc. All rights reserved.</p>
            </footer>
        </div>
        </>
    )
}

export default LandingPage
