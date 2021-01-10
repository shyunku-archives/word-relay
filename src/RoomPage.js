import {Component} from 'react';

const socketio = require('socket.io-client');

class RoomPage extends Component{
    constructor(props){
        super(props);

        let params = this.props.match.params;

        this.state = {
            roomName: "unknown_room_name",
            playing: {},
            watching: {},
            myCode: params.my_code,
            chatInput: "",
            messages: [],
        };


        this.socket = socketio(`http://18.223.100.182:24991/${params.room_code}`, {transports: ["websocket"]});
        
        this.socket.on("connect", () => {
            console.log("connected!");
            this.socket.emit("auth", {playerCode: params.my_code});
        });

        this.socket.on("auth", data => {
            if(!data){
                alert("오류가 발생했습니다: can't find on player queue!");
                this.props.history.goBack();
            }else{
                this.socket.emit("initialFetch");
            }
        });

        this.socket.on("message", data => {
            let messages = this.state.messages;
            messages.push(data);

            this.setState({
                messages: messages
            });

            console.log(messages);
        });

        this.socket.on("initialFetch", data => {
            this.setState({
                roomName: data.roomFullName,
                playing: data.playingMap,
                watching: data.watchingMap
            });
        });

        this.socket.on("leave", playerCode => {
            let {playing, watching} = this.state;
            if(playing.hasOwnProperty(playerCode)){
                delete playing[playerCode];
            }
            if(watching.hasOwnProperty(playerCode)){
                delete watching[playerCode];
            }

            this.setState({
                playing: playing,
                watching: watching
            });
        });

        this.socket.on("creatorLeft", data => {
            alert('방장이 나갔습니다.');
            this.props.history.goBack();
        });

        this.socket.on("disconnect", () => {
            alert('방이 폭파되었습니다!');
            this.props.history.goBack();
        });
    }

    componentWillUnmount = () => {
        if(this.socket){
            this.socket.close();
        }
    }

    chatInputListener = (e) => {
        this.setState({
            chatInput: e.target.value
        });
    }

    chatInputKeyDownListener = (e) => {
        if(e.which === 13){
            let message = this.state.chatInput;

            this.socket.emit("message", message);

            this.setState({
                chatInput: "",
            });
        }
    }

    render(){
        return(
            <div id="room_page" className="page">
                <div className="top-head">
                    <div className="room-name">{this.state.roomName}</div>
                </div>
                <div className="main-content">
                    <div className="participant-list">
                        <div className="playing-list-wrapper">
                            <div className="stat">
                                <div>{Object.keys(this.state.playing).length}명 참여중</div>
                            </div>
                            <div className="playing-list">
                                {
                                    Object.keys(this.state.playing).map(playerCode =>{
                                        let player = this.state.playing[playerCode];
                                        return(
                                            <div className="player-item">
                                                <div className="nickname">{player.player.nickname}</div>
                                                <div className="score">{player.score}</div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <div className="watching-list-wrapper">
                            <div className="stat">
                                <div>{Object.keys(this.state.watching).length}명 관전중</div>
                            </div>
                            <div className="watching-list">
                                {
                                    Object.keys(this.state.watching).map(playerCode =>{
                                        let player = this.state.watching[playerCode];
                                        return(
                                            <div className="player-item">
                                                <div className="nickname">{player.player.nickname}</div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="game-content">
                        <div className="announce">
                            <div className="target-letter">g</div>
                            <div>로 시작하는 단어를 입력해주세요.</div>
                        </div>
                        <div className="main">
                            <div className="type-log-wrapper">
                                <div className="type-log">
                                    <div className="word-item">
                                        <div className="word">generate</div>
                                        <div className="meaning">meaning...</div>
                                    </div>
                                    <div className="word-item">
                                        <div className="word">generate</div>
                                        <div className="meaning">meaning...</div>
                                    </div>
                                    <div className="word-item">
                                        <div className="word">generate</div>
                                        <div className="meaning">meaning...</div>
                                    </div>
                                    <div className="word-item">
                                        <div className="word">generate</div>
                                        <div className="meaning">meaning...</div>
                                    </div>
                                    <div className="word-item">
                                        <div className="word">enumerate</div>
                                        <div className="meaning">meaning...</div>
                                    </div>
                                    <div className="word-item">
                                        <div className="word">egg</div>
                                        <div className="meaning">meaning...</div>
                                    </div>
                                    <div className="word-item">
                                        <div className="word">generate</div>
                                        <div className="meaning">meaning...</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="chat">
                            <div className="chat-log">
                                {
                                    this.state.messages.map(item => {
                                        let isMine = item.sender.playerCode === this.state.myCode;
                                        return(
                                            <div className={"chat-log-item" + (isMine ? " mine" : "")} key={item.sendTime}>
                                                <div className="sender">{item.sender.nickname}</div>
                                                <div className="lower">
                                                    <div className="content">{item.content}</div>
                                                    <div className="time">{item.time}</div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <div className="chat-inputter">
                                <input type="text" placeholder="채팅을 입력하세요." spellCheck={false}
                                    value={this.state.chatInput} 
                                    onChange={this.chatInputListener}
                                    onKeyDown={this.chatInputKeyDownListener}></input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RoomPage;