import React from 'react'
import './Chat.css'
import { FaTelegramPlane,FaRegArrowAltCircleUp } from "react-icons/fa";
import MainLayout from '../MainLayout';

const img = "https://goo.gl/pB9rpQ";

function Chat() {
    return (
        <MainLayout>
        <div className="chart-cantaner">
            <h4 className="dr-chat-detail">You are Chatting with <span>Dr Fenuku</span></h4>
            <div class="chat-msg-user">
                <p>Hi</p>
                <p>2:40pm</p>
            </div>

            <div class="chat-msg-doc">
                <p>Good day how can i help you please Good day how can i help you pleaseGood day how can i help you pleaseGood day how can i help you please</p>
                <p>2:40pm</p>
            </div>
            <div class="chat-msg-user">
                <p>Am dignose of some health related issues</p>
                <p>3:40pm</p>
            </div>
            <div class="chat-msg-doc">
                <p>was the nature of the proble please</p>
                <p>3:50pm</p>
            </div>

            <div class="input-chat-conatiner">
                <textarea placeholder="type your message" className="chat-text"></textarea>
                 <label for="fileimg"><FaRegArrowAltCircleUp className="upload-icon"/></label>   
                <input type="file" id="fileimg"  className="file-upload-file"/>

                <FaTelegramPlane  className="upload-icon"/>
            </div>
        </div>
        </MainLayout>
    )
}

export default Chat
