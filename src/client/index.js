import { _, Preact } from '../lib';
const {h, render, Component} = Preact;

import Clock from './clock';
import {MainContainer, WorkflowDisplay} from './workflow_display';

console.log('created Clocked', _.uniqueId('clock') );

const mainEl = document.getElementById('main');

// render an instance of Clock into <body>:
render(<div id="container">
    <MainContainer />
</div>, mainEl);