import React from 'react';
import { PropTypes } from 'prop-types';

import Field from './Field';

const SimpleForm = ({ errors, model, onChange, onBlur, onSubmit, isSaving }) => (
    <form onSubmit={onSubmit} autoComplete="off">
        <Field label="Title" error={errors['title']} asterisk>
            <div>
                <label className="radio-inline"><input type="radio" name="title" value="Mr" checked={model['title'] === "Mr"} onChange={onChange} onBlur={onBlur} />Mr</label>
                <label className="radio-inline"><input type="radio" name="title" value="Mrs" checked={model['title'] === "Mrs"} onChange={onChange} onBlur={onBlur} />Mrs</label>
                <label className="radio-inline"><input type="radio" name="title" value="Ms" checked={model['title'] === "Ms"} onChange={onChange} onBlur={onBlur} />Ms</label>
            </div>
        </Field>
        <Field label="First Name" error={errors['firstname']} asterisk>
            <input type="text" name="firstname" value={model['firstname']} className="form-control" onChange={onChange} onBlur={onBlur} />
        </Field>
        <Field label="Last Name" error={errors['lastname']} asterisk>
            <input type="text" name="lastname" value={model['lastname']} className="form-control" onChange={onChange} onBlur={onBlur} />
        </Field>
        <Field label="Password" error={errors['password']} asterisk>
            <input type="password" name="password" value={model['password']} className="form-control" onChange={onChange} onBlur={onBlur} placeholder="Password" />
        </Field>
        <Field label="Confirm password" error={errors['confirmPassword']} asterisk>
            <input type="password" name="confirmPassword" value={model['confirmPassword']} className="form-control" onChange={onChange} onBlur={onBlur} placeholder="Confirm password" />
        </Field>
        <div className="form-group">
            <select name="list" value={model['list']} className="form-control" onChange={onChange} onBlur={onBlur}>
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
            </select>
        </div>
        <Field label="Likes" error={errors['likes']} asterisk>
            <div className="checkbox"><label><input type="checkbox" name="likes" value="Milk" checked={model['likes'].indexOf('Milk') !== -1} onChange={onChange} onBlur={onBlur} />Milk</label></div>
            <div className="checkbox"><label><input type="checkbox" name="likes" value="Cakes" checked={model['likes'].indexOf('Cakes') !== -1} onChange={onChange} onBlur={onBlur} />Cakes</label></div>
            <div className="checkbox"><label><input type="checkbox" name="likes" value="Nutella" checked={model['likes'].indexOf('Nutella') !== -1} onChange={onChange} onBlur={onBlur} />Nutella</label></div>
        </Field>
        <Field error={errors['agree']} asterisk>
            <div className="checkbox"><label><input type="checkbox" name="agree" checked={model['agree']} onChange={onChange} onBlur={onBlur} />Agree to conditions</label></div>
        </Field>
        <div className="form-group">
            <input type="submit" value={isSaving ? "saving..." : "Submit"} className="btn btn-info btn-block text-uppercase" />
        </div>
    </form>
);
SimpleForm.PropTypes = {
    model: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    iSaving: PropTypes.bool
};

export default SimpleForm;