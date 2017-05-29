// @flow

import React from 'react';
import { Component } from 'react';

require('./main.scss');

export default class Clock extends Component {
    constructor() {
        super();
        // set initial time:
        this.state.time = Date.now();
    }

    componentDidMount() {
        // update time every second
        this.timer = setInterval(() => {
            this.setState({ time: Date.now() });
        }, 1000);
    }

    applyOffset(amount: Number) {}

    simple(): string {
        return '';
    }

    componentWillUnmount() {
        // stop when not renderable
        clearInterval(this.timer);
    }

    render(props, state) {
        let time = new Date(state.time).toLocaleTimeString();
        return <span className="timespan">{time}</span>;
    }
}
