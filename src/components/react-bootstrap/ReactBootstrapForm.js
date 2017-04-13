import React from 'react';
import { PropTypes } from 'prop-types';

import { FormGroup, ControlLabel, FormControl, Checkbox, Radio, HelpBlock } from 'react-bootstrap';

import Field from './Field';

const ReactBootstrapForm = ({ errors, model, onChange, onBlur, onSubmit }) => (
    <form onSubmit={onSubmit} autoComplete="off">
        <Field label="Title" error={errors['title']} asterisk>
            <div>
                <Radio name="title" inline value="Mr" checked={model['title'] === "Mr"} onChange={onChange} onBlur={onBlur}>Mr</Radio>
                <Radio name="title" inline value="Mrs" checked={model['title'] === "Mrs"} onChange={onChange} onBlur={onBlur}>Mrs</Radio>
                <Radio name="title" inline value="Ms" checked={model['title'] === "Ms"} onChange={onChange} onBlur={onBlur}>Ms</Radio>
            </div>
        </Field>
        <Field label="First Name" error={errors['firstname']} asterisk>
            <FormControl type="text" name="firstname" value={model['firstname']} onChange={onChange} onBlur={onBlur} />
        </Field>
        <Field label="Last Name" error={errors['lastname']} asterisk>
            <FormControl type="text" name="lastname" value={model['lastname']} onChange={onChange} onBlur={onBlur} />
        </Field>
        <Field label="Password" error={errors['password']} asterisk>
            <FormControl type="password" name="password" value={model['password']} onChange={onChange} onBlur={onBlur} placeholder="Password" />
        </Field>
        <Field label="Confirm password" error={errors['confirmPassword']} asterisk>
            <FormControl type="password" name="confirmPassword" value={model['confirmPassword']} onChange={onChange} onBlur={onBlur} placeholder="Confirm password" />
        </Field>
        <FormGroup>
            <FormControl name="list" componentClass="select" value={model['list']} onChange={onChange} onBlur={onBlur}>
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
            </FormControl>
        </FormGroup>
        <Field label="Likes" error={errors['likes']} asterisk>
            <Checkbox name="likes" value="Milk" checked={model['likes'].indexOf('Milk') !== -1} onChange={onChange} onBlur={onBlur}>Milk</Checkbox>
            <Checkbox name="likes" value="Cakes" checked={model['likes'].indexOf('Cakes') !== -1} onChange={onChange} onBlur={onBlur}>Cakes</Checkbox>
            <Checkbox name="likes" value="Nutella" checked={model['likes'].indexOf('Nutella') !== -1} onChange={onChange} onBlur={onBlur}>Nutella</Checkbox>
        </Field>
        <Field error={errors['agree']} asterisk>
            <Checkbox name="agree" checked={model['agree']} onChange={onChange} onBlur={onBlur}>Agree to conditions</Checkbox>
        </Field>
        <FormGroup>
            <input type="submit" value="Register" className="btn btn-info btn-block text-uppercase" />
        </FormGroup>
    </form>
);
ReactBootstrapForm.PropTypes = {
    model: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default ReactBootstrapForm;