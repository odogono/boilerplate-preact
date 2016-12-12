import { _, Preact } from '../lib';
const {h, render, Component} = Preact;
// import { h, render, Component } from 'preact';

import Clock from './clock';


console.log('created Clocked', _.uniqueId('clock') );

const mainEl = document.getElementById('main');
// render an instance of Clock into <body>:
render(<Clock />, mainEl);