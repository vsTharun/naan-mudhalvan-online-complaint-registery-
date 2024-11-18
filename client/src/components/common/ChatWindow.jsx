import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ChatWindow = (props) => {
   const [messageInput, setMessageInput] = useState('');
   const messageWindowRef = useRef(null);
   const [messageList, setMessageList] = useState([]);

   const fetchMessageList = async () => {
      try {
         const response = await axios.get(`http://localhost:8000/messages/${props.complaintId}`);
         setMessageList(response.data);
      } catch (error) {
         console.error('Error fetching messages:', error);
      }
   };

   useEffect(() => {
      fetchMessageList();
   }, [props.complaintId]);

   useEffect(() => {
      scrollToBottom();
   }, [messageList]);

   const sendMessage = async () => {
      if (!messageInput.trim()) return;
      try {
         let data = {
            name: props.name,
            message: messageInput,
            complaintId: props.complaintId
         };
         const response = await axios.post('http://localhost:8000/messages', data);
         setMessageList([...messageList, response.data]);
         setMessageInput('');
         fetchMessageList();
      } catch (error) {
         console.error('Error sending message:', error);
      }
   };

   const scrollToBottom = () => {
      if (messageWindowRef.current) {
         messageWindowRef.current.scrollTop = messageWindowRef.current.scrollHeight;
      }
   };

   return (
      <div className="chat-container p-4">
         <h1 className="chat-title">Message Box</h1>
         <div className="message-window" ref={messageWindowRef}>
            {messageList.slice().reverse().map((msg) => (
               <div className="message p-3 my-2 rounded" key={msg._id}>
                  <p className="message-content">
                     <strong>{msg.name}</strong>: {msg.message}
                  </p>
                  <p className="message-time">
                     {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, {new Date(msg.createdAt).toLocaleDateString()}
                  </p>
               </div>
            ))}
         </div>
         <div className="input-container d-flex align-items-center mt-3">
            <textarea
               required
               placeholder="Type your message..."
               value={messageInput}
               onChange={(e) => setMessageInput(e.target.value)}
               className="form-control me-2"
            ></textarea>
            <button className="btn btn-success" onClick={sendMessage}>Send</button>
         </div>
      </div>
   );
};

export default ChatWindow;
