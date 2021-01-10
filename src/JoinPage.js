import {Component} from 'react';

const axios = require('axios');

class JoinPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            nicknameInput: "",
            roomCodeInput: "",
            roomNameInput: ""
        }
    }

    join = () => {
        if(this.state.nicknameInput.length < 3){
            alert('닉네임을 3자 이상 입력해주세요!');
            return;
        }

        axios.post('http://localhost/join')
            .then(response => {
                let res = response.data;
                if(res.success){
                    let myCode = res.data.player_code;
                    
                }else{
                    console.log(res.msg);
                }
            })
            .catch(err => {
                console.error(err);
                alert('서버 점검중입니다.');
            });
    }
    
    create = () => {
        if(this.state.nicknameInput.length < 3){
            alert('닉네임을 3자 이상 입력해주세요!');
            return;
        }

        if(this.state.roomNameInput.length < 3){
            alert('방 이름은 3자 이상 입력해주세요!');
            return;
        }

        axios.post('http://localhost/createRoom', {room_name: this.state.roomNameInput, creator: this.state.nicknameInput})
            .then(response => {
                let res = response.data;
                if(res.success){
                    let roomCode = res.data.room_code;
                    let playerCode = res.data.player_code;
                    this.props.history.push(`/room/${playerCode}/${roomCode}`);
                }else{
                    console.log(res.msg);
                }
            })
            .catch(err => {
                console.error(err);
                alert('서버 점검중입니다.');
            });
    }

    roomCodeInputListener = (e) => {
        this.setState({
            roomCodeInput: e.target.value
        });
    }

    roomNameInputListener = (e) => {
        this.setState({
            roomNameInput: e.target.value
        });
    }

    nicknameInputListener = (e) => {
        this.setState({
            nicknameInput: e.target.value
        });
    }

    render(){
        return(
            <div id="join_page" className="page">
                <div className="header">
                    <input id="nickname_input" 
                        value={this.state.nicknameInput}
                        onChange={this.nicknameInputListener}
                        placeholder="사용할 닉네임을 입력해주세요. (최대 15자)" type="text" maxLength={15} spellCheck={false}></input>
                </div>
                <div className="centered">
                    <div className="label">방 코드를 입력해주세요.</div>
                    <input id="code_input" spellCheck={false} 
                        value={this.state.roomCodeInput}
                        onChange={this.roomCodeInputListener}></input>                    
                    <button onClick={this.join}>참가</button>
                </div>
                <div className="centered">
                    <div className="label">방 이름을 입력해주세요.</div>
                    <input id="name_input" spellCheck={false} 
                        value={this.state.roomNameInput}
                        onChange={this.roomNameInputListener}></input>
                    <button onClick={this.create}>생성</button>
                </div>
            </div>
        );
    }
}

export default JoinPage;