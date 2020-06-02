import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styles from '../styles/chat.css';
import MessageBubble from './MessageBubble';

const Chat = props => {
    const [userName, setUserName] = useState("");
    const [hasSetName, setHasSetName] = useState(false);
    const [messages, setMessages] = useState([]);
    const [currMessage, setCurrMessage] = useState("");
    const [socket] = useState( () => io(":8000") );

    const onSubmitHandler = e => {
        e.preventDefault();
        socket.emit("new_message_from_client", {user: userName, msg: currMessage});
        setMessages([...messages, {user: userName, msg: currMessage}]);
        setCurrMessage("");
    };

    const onNameSubmitHandler = e => {
        e.preventDefault();
        socket.emit("new_user_connecting", userName);
        setHasSetName(true);
    };

    const renderContent = () => {
        if (hasSetName === false) {
            return(
                <div>
                    <form onSubmit={onNameSubmitHandler}>
                        <label>Name: </label>
                        <input type="text" onChange={(e) => {
                            setUserName(e.target.value);
                            }}/>
                        <input type="submit"/>
                    </form>
                </div>
            );
        } else {
            return(
                <div>
                    <h3>{userName}</h3>
                    <div className="messageWindow">
                    {messages.map( (message, idx) => {
                        return(
                                <MessageBubble key={idx} message={message} user={userName}/>
                        );
                    } )}
                    </div>
                    <form onSubmit={onSubmitHandler} className="clearFix">
                        <input type="text"  className="textWindow" onChange={ (e) => setCurrMessage(e.target.value) } value={currMessage}/>
                        <input type="submit" className="chatButton" value="Send"/>
                    </form>
                 </div>
            );
        }
    };

    useEffect( () => {
        socket.on("send_message_to_all_other_clients", msg => 
            setMessages(prevMessages => {
                return [...prevMessages, msg];
            })
        );
        socket.on("new_user_announcement", msg => 
            setMessages(prevMessages => {
                return [...prevMessages, {user: "", msg: msg}];
            })
        )
    }, []);


    return(
        <div>
                    {renderContent()}
        </div>

    );
};

export default Chat;