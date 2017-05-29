import _ from 'underscore';
import React from 'react';
import ReactDOM from 'react-dom';

// register ServiceWorker via OfflinePlugin, for prod only:
if (process.env.NODE_ENV==='production') {
	require('./pwa');
}

let root;
function init() {
	let App = require('./app').default;
    const mainEl = document.getElementById('main');
	root = ReactDOM.render(<App />, mainEl, root);
}


init();