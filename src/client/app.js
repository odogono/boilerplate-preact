import React from 'react';
import {Component} from 'react';

import Clock from 'TheClock';
// import Login from './login';
import LoginRT from './login.rt';
import LoginMTC from './login.mdc';


export default class App extends Component {
    render() {
		return (
			<div id="app">
                <div className='title'>The Clock</div>
                <Clock />
				<LoginRT/>
			</div>
		);
	}
}