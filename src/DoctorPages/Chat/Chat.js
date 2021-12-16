import React from 'react'
import './Chat.css'

import arrow from '../../chatimages/arrow.png'
import pp from '../../chatimages/pp.png'
import video from '../../chatimages/video.png'
import phone from '../../chatimages/phone.png'
import attachfile from '../../chatimages/attachfile.png'
import check2 from '../../chatimages/check-2.png'

import send from '../../chatimages/send.png'
function Chat() {
    return (
        <div>
        <div class="container-chat-doc">
		<div class="chat">
			<div class="chat-header">
				<div class="profile">
					<div class="left">
						
						<img src={pp} className="pp" alt=""/>
						<h2>Vincent</h2>
						<span>online</span>
					</div>
					<div class="right">
						
					</div>
				</div>
			</div>
			<div className="chat-box">
				<div className="chat-r">
					<div className="sp"></div>
					<div className="mess mess-r">
						<p>
                            Hi, Elias
						</p>
						<div className="check">
							<span>4:00 PM</span>
							<img src={check2} alt=""/>
						</div>
					</div>
				</div>
				<div class="chat-l">
					<div class="mess">
						<p>
                            Oh! hi 
						</p>
						<div class="check">
							<span>4:00 PM</span>
						</div>
					</div>
					<div class="sp"></div>
				</div>

				<div class="chat-r">
					<div class="sp"></div>
					<div class="mess mess-r">
						<p>
                           How are you doing?
						</p>
						<div class="check">
							<span>4:00 PM</span>
							<img src={check2} alt=""/>
						</div>
					</div>
				</div>
				<div class="chat-l">
					<div class="mess">
					    <p>I'm doing alright. How about you?</p>
						<div class="check">
							<span>4:00 PM</span>
						</div>
					</div>
					<div class="sp"></div>
				</div>

				<div class="chat-r">
					<div class="sp"></div>
					<div class="mess mess-r">
						<p>
                           Not too bad. The weather is great isn't it?
						</p>
						<div class="check">
							<span>4:00 PM</span>
							<img src={check2} alt=""/>
						</div>
					</div>
				</div>
				<div class="chat-l">
					<div class="mess">
						<p>
                            Yes. It's absolutely beautiful today.
						</p>
						<div class="check">
							<span>4:00 PM</span>
						</div>
					</div>
					<div class="sp"></div>
				</div>

				<div class="chat-r">
					<div class="sp"></div>
					<div class="mess mess-r">
						
						<div class="check">
							<span>4:00 PM</span>
							<img src={check2} alt=""/>
						</div>
					</div>
				</div>
				<div class="chat-r">
					<div class="sp"></div>
					<div class="mess mess-r">
						<p>I wish it was like this more frequently.</p>
						<div class="check">
							<span>4:00 PM</span>
							<img src={check2} alt=""/>
						</div>
					</div>
				</div>
				<div class="chat-l">
					<div class="mess">
						
						<div class="check">
							<span>4:00 PM</span>
						</div>
					</div>
					<div class="sp"></div>
				</div>
				<div class="chat-r">
					<div class="sp"></div>
					<div class="mess mess-r">
						<p>
                           So where are you going now?
						</p>
						<div class="check">
							<span>4:00 PM</span>
							<img src={check2} alt=""/>
						</div>
					</div>
				</div>
			</div>

			<div class="chat-footer">
				
				<textarea placeholder="Type a message"></textarea>
				<div class="icons">
					<label className="upload-img" for="file-1" ><img src={attachfile} alt=""/></label>
                    <input type="file" id="file-1" className="upload-doc"/>
				</div>
				<img src={send} class="mic" alt=""/>
			</div>
		</div>
	</div>
	
        </div>
    )
}

export default Chat
