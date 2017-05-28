import { h, Component } from 'preact';
// import { Router } from 'preact-router';

import Clock from './clock';
import {MainContainer, WorkflowDisplay} from './workflow_display';

export default class App extends Component {
    render() {
		return (
			<div id="app">
                <Clock />
			</div>
		);
	}
}