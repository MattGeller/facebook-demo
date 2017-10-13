import React, {Component} from 'react';
//for the socket chat to work on the client
import io from 'socket.io-client';

class ChatLobby extends Component {
    constructor(props){
        super(props);

        this.state = {
            msg: '',
            allMsgs: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.sendMsg = this.sendMsg.bind(this);
    }

    componentDidMount(){
        this.socket = io('http://localhost:3500');

        this.socket.on('chat message', msg => {
            this.setState({
                allMsgs: [msg, ...this.state.allMsgs]
            })
        });
    }

    handleChange(e){
        this.setState({
            msg: e.target.value
        });
    }

    sendMsg(){
        console.log('Message:', this.state.msg);

        this.socket.emit('chat message', this.state.msg);
    }

    render(){

        const {msg, allMsgs} = this.state;

        const msgList = allMsgs.map((msg, index) => {
            return <li key={index}>{msg}</li>;
        });

        return (
            <div>
                <h1>Chat Lobby</h1>
                Message:<input type="text" value={msg} onChange={this.handleChange}/>
                <button className="btn" onClick={this.sendMsg}>Send</button>
                <ul>
                    {msgList}
                </ul>
            </div>
        )
    }
}

export default ChatLobby;