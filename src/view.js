import React from 'react';
import Explorations from './exploration/exploration.js'
import Main from './main/main.js'
import Header from './header/header.js'
import * as Style from './stylesheet.css'
import { Route, BrowserRouter as Router ,Switch } from 'react-router-dom'
import { Affix } from 'antd'

var passages = JSON.parse(localStorage.getItem('table'))
class View extends React.Component {
    render() {
        return (
            <div className='View'>
                <Router>
                    <Affix offsetTop={0}>
                        <Header />
                        </Affix>
                    <Switch>
                        <Route path="/explorations" component={Explorations} />
                        <Route path="/" component={Main} />
                    </Switch>
                </Router>
            </div>

        )
    }

}
export default View