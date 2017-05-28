import _ from 'underscore';
import {h, render, Component} from 'preact';

// register ServiceWorker via OfflinePlugin, for prod only:
if (process.env.NODE_ENV==='production') {
	require('./pwa');
}

let root;
function init() {
	let App = require('./app').default;
    const mainEl = document.getElementById('main');
	root = render(<App />, mainEl, root);
}


init();