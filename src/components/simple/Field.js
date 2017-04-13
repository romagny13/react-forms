import React from 'react';
import { PropTypes } from 'prop-types';

const Field = ({ label, error, children, asterisk }) => {
    let groupClassName = error && error !== '' ? 'form-group has-error' : 'form-group';
    return (
        <div className={groupClassName}>
            {label && <label className="control-label">{label}{asterisk && <span className="required">*</span>}</label>}
            {children}
            {error && <span className="help-block">{error}</span>}
        </div>
    );
};
Field.PropTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    children: PropTypes.node,
    asterisk: PropTypes.bool
};
export default Field;
