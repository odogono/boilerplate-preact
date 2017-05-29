import _ from 'underscore';
import React from 'react';
import t from 'tcomb';
import classnames from 'classnames';

import Input from 'react-toolbox/lib/input';

require('./styles.scss');

export default function create(locals = {}) {
    let attrs = _.omit(locals.attrs, 'placeholder');
    let label = locals.label;
    let type = locals.type;

    // console.log('[textbox] B', attrs, locals);

    if (locals.error) {
        attrs = {
            ...attrs,
            error: <span>{locals.error}</span>
        };
    }

    // <Input type='text' label='error' error={<span>Error!! <a href="#!" onClick={e => { e.preventDefault(); console.log('some help'); }}>?</a></span>} />

    return (
        <div className="textbox">
            <Input type={type} label={label} {...attrs} />
        </div>
    );
}
