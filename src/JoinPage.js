import {Component} from 'react';

const axios = require('axios');

class JoinPage extends Component{
    constructor(props){
        super(props);
    }

    join = () => {
        axios.post('http://localhost/join')
            .then(res => {
                if(res.success){
                    let myCode = res.data.player_code;
                    
                }else{
                    console.log(res.msg);
                }
            });
    }

    render(){
        return(
            <div id="join_page" className="page">
                <div className="centered">
                    <div className="label">Input your room code</div>
                    <input id="code_input" type="text" spellCheck={false}></input>
                    <div className="label">Input your nickname</div>
                    <input id="nickname_input" type="text" spellCheck={false}></input>
                    <button onClick={this.join}>참가</button>
                </div>
            </div>
        );
    }
}

export default JoinPage;