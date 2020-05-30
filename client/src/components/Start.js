import React, {useState} from 'react';
import { navigate } from '@reach/router';
import io from 'socket.io-client';

const Start = props => {
    const [name, setName] = useState("");
    const [socket] = useState(() => io(":8000"));

    const onSubmitHandler = e => {
        e.preventDefault();
        socket.emit("new_user_connecting", name);
        navigate("chat/" + name);
    }

    return(
        <div>
            <form onSubmit={onSubmitHandler}>
                <label>Name: </label>
                <input type="text" onChange={(e) => {setName(e.target.value)}}/>
                <input type="submit"/>
            </form>
        </div>
    );
};

export default Start;