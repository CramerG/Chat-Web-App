import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = props => {
    const userName = props.name;
    const [messages, setMessages] = useState([]);
    const [currMessage, setCurrMessage] = useState("");
    const [socket] = useState( () => io(":8000") );

    const onSubmitHandler = e => {
        e.preventDefault();
        socket.emit("new_message_from_client", {user: userName, msg: currMessage});
        setCurrMessage("");
    }

    useEffect( () => {
        socket.on("send_message_to_all_other_clients", msg => 
            setMessages(prevMessages => {
                return [msg, ...prevMessages];
            })
        );
    })

    return(
        <div>
            <h3>{props.name}</h3>
            {messages.map( (message, idx) => {
                return(
                    <div key={idx}>
                        <h6>{message.user}</h6>
                        <p>{message.msg}</p>
                    </div>
                
                );
            } )}
            <form onSubmit={onSubmitHandler}>
                <input type="text" onChange={ (e) => setCurrMessage(e.target.value) } value={currMessage}/>
                <input type="submit" value="Send"/>
            </form>
        </div>
    );
};

export default Chat;