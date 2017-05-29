import _ from 'underscore';
import React from 'react';
import t from 'tcomb';
import classnames from 'classnames';

import Textfield from 'preact-material-components/Textfield';

require('./styles.scss');

export default function create(locals = {}) {
    let attrs = _.omit(locals.attrs, 'placeholder');
    let label = locals.label;
    let type = locals.type

    // console.log('[textbox] B', attrs, locals);

    return (
        <div className='mdc-textbox'>
            <Textfield type={type} label={label} {...attrs} />
            {locals.error && <p className="mdc-textfield-helptext mdc-textfield-helptext--persistent error">
                {locals.error}
            </p>}
        </div>
    );
}
