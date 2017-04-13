import React from 'react';
import { PropTypes } from 'prop-types';
import { FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';


const Field = ({ label, error, children, asterisk }) => (
    <FormGroup validationState={error && 'error'}>
        {label && <ControlLabel>{label}{asterisk && <span className="required">*</span>}</ControlLabel>}
        {children}
        {error && <HelpBlock>{error}</HelpBlock>}
    </FormGroup>
);
Field.PropTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    children: PropTypes.node,
    asterisk: PropTypes.bool
};
export default Field;
