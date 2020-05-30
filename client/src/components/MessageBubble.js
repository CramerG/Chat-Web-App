import React from 'react';
import {css, csx} from 'emotion';

const MessageBubble = props => {
    const msg = props.message.msg;
    const msgSender = props.message.name;
    const userName = props.user;

    return(
        <div className={css`
            height: 25px;
            width: 100px;
            background-color: blue;
        `}>
            <p>{msg}</p>
        </div>
    );
}

export default MessageBubble;