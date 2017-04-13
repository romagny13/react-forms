import React, { Component } from 'react';
import { isTouched, touch, touchAll, updateErrors, updateModel } from '../../common/util';
import { required, custom, isRequired, maxLength, minLength, pattern } from '../../common/validators';
import { canValidateOnBlur, canValidateOnChange, validateAll, validateValue, getElementValue } from '../../common/fwk';

import MaterialUiForm from './MaterialUiForm';

class MaterialUiPage extends Component {
    constructor(props) {
        super(props);
        // inital state for rendering
        this.state = {
            model: {
                firstname: 'Marie',
                lastname: 'Bellin',
                password: 'Secret',
                confirmPassword: '',
                agree: false,
                likes: ['Milk', 'Cakes'],
                list: 'b',
                title: ''
            },
            errors: {}
        };
        // config
        this.validators = {
            firstname: [required(), minLength(2)],
            lastname: [required()],
            password: [
                required('Please enter a password.'),
                pattern(/^(?=.*[A-Z]).{6}/, '6 characters minimum and one uppercase letter.')
            ],
            confirmPassword: [
                required('Please confirm the password.'),
                custom((value, model) => {
                    return model.password === value;
                }, 'Password and confirm password do not match.')
            ],
            agree: [required()],
            likes: [custom((value, model) => {
                return model.likes.length > 0;
            }, 'Please select one or more items.')],
            title: [required()]
        };
        // mode 'submit' or 'touched'
        this.mode = 'touched';
        this.touchedFields = {};
        this.submitted = false;
        // bind
        this.onChange = this.onChange.bind(this);
        this.onCheckChange = this.onCheckChange.bind(this);
        this.onSelectionChange = this.onSelectionChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(event) {
        // name and value
        let name = event.target.name;
        let value = getElementValue(event.target);
        // update model
        let validators = this.validators;
        let model = updateModel(this.state.model, name, value);
        if (validators.hasOwnProperty(name) && canValidateOnChange(validators[name], this.submitted, this.touchedFields[name])) {
            // value + validation
            const { hasError, error } = validateValue(value, validators[name], model);
            let errors = updateErrors(this.state.errors, name, hasError, error);
            this.setState({
                model,
                errors
            });
        }
        else {
            // value
            this.setState({
                model
            });
        }
    }
    onCheckChange(event, index, key) {
        this.onChange(event.nativeEvent);
    }
    onSelectionChange(event, index, key) {
        let model = this.state.model;
        model['list'] = key;
        this.setState({
            model
        });
    }
    onBlur(event) {
        let name = event.target.name;
        if (isTouched(this.touchedFields, name)) return;
        // get value
        let model = this.state.model;
        let value = getElementValue(event.target);
        let validators = this.validators;
        let touchedFields = this.touchedFields;

        if (validators.hasOwnProperty(name) && canValidateOnBlur(validators[name], this.mode, touchedFields[name])) {
            const { hasError, error } = validateValue(value, validators[name], model);
            let errors = updateErrors(this.state.errors, name, hasError, error);
            this.setState({
                errors
            });
        }
        touch(touchedFields, name);
    }
    onSubmit(event) {
        event.preventDefault();
        // validate all
        let model = this.state.model;
        const { hasError, errors } = validateAll(model, this.validators);
        if (hasError) {
            console.log('Check the errors', errors);
            this.setState({
                errors
            });
        }
        else {
            console.log('Ok', model);
        }
        touchAll(this.touchedFields, model);
        this.submitted = true;
    }
    render() {
        const { model, errors } = this.state;
        return (
            <div className="form-container">
                <h2>Register</h2>
                <MaterialUiForm
                    model={this.state.model}
                    errors={this.state.errors}
                    onChange={this.onChange}
                    onCheckChange={this.onCheckChange}
                    onSelectionChange={this.onSelectionChange}
                    onBlur={this.onBlur}
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}

export default MaterialUiPage;
