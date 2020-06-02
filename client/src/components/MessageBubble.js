import React from 'react';
import {css, csx} from 'emotion';

const MessageBubble = props => {
    const msg = props.message.msg;
    const msgSender = props.message.user;
    const userName = props.user;

    var bgColor ="";
    var align = "";
    var clear = "";

    if(msgSender === userName) {
        bgColor = "DarkGrey";
        align = "right";
    } else {
        bgColor = "LightBlue"
        align = "left";
    }

    return(
        <div className={css`
            height: auto;
            width: 300px;
            padding: 5px;
            background-color: ${bgColor};
            float: ${align};
            clear: both;
        `}>
            <p>{msgSender}</p>
            <p>{msg}</p>
        </div>
    );
}

export default MessageBubble;