import {Switch, Route, HashRouter} from 'react-router-dom';
import JoinPage from './JoinPage';
import RoomPage from './RoomPage';

export default function PageRouter() {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={JoinPage}/>
                <Route exact path="/room" component={RoomPage}/>
            </Switch>
        </HashRouter>
    );
}