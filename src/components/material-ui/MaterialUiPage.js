import React, { Component } from 'react';
import { isTouched, touch, touchAll, updateErrors, updateModel } from '../../common/util';
import { required, custom, isRequired, maxLength, minLength, pattern } from '../../common/validators';
import { canValidateOnBlur, canValidateOnChange, validateAll, validateValue, getElementValue } from '../../common/fwk';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { deepOrange100, deepOrange300 } from 'material-ui/styles/colors';
import { MuiThemeProvider, TextField, SelectField, MenuItem, List, Checkbox, RadioButtonGroup, RadioButton, Subheader, FlatButton, RaisedButton } from 'material-ui';


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
                <form onSubmit={this.onSubmit} autoComplete="off">
                    <div>
                        <Subheader style={{ paddingLeft: 0 }}>Title</Subheader>
                        <RadioButtonGroup name="title" label="Title" error={errors['title']} onChange={this.onCheckChange} asterisk>
                            <RadioButton style={{ display: 'inline-block', width: '80px' }} label="Mr" value="Mr" checked={model['title'] === "Mr"} onBlur={this.onBlur} />
                            <RadioButton style={{ display: 'inline-block', width: '80px' }} label="Mrs" value="Mrs" checked={model['title'] === "Mrs"} onBlur={this.onBlur} />
                            <RadioButton style={{ display: 'inline-block', width: '80px' }} label="Ms" value="Ms" checked={model['title'] === "Ms"} onBlur={this.onBlur} />
                        </RadioButtonGroup>
                        {errors['title'] && <span className="error-text">{errors['title']}</span>}
                    </div>

                    <TextField name="firstname" value={model['firstname']} hintText="First Name" errorText={errors['firstname']} onChange={this.onChange} onBlur={this.onBlur} fullWidth />
                    <TextField name="lastname" value={model['lastname']} hintText="Last Name" errorText={errors['lastname']} onChange={this.onChange} onBlur={this.onBlur} fullWidth />
                    <TextField type="password" name="password" value={model['password']} hintText="Password" errorText={errors['password']} onChange={this.onChange} onBlur={this.onBlur} fullWidth />
                    <TextField type="password" name="confirmPassword" value={model['confirmPassword']} hintText="Confirm password" errorText={errors['confirmPassword']} onChange={this.onChange} onBlur={this.onBlur} fullWidth />
                    <SelectField floatingLabelText="List" name="list" value={model['list']} onChange={this.onSelectionChange} fullWidth>
                        <MenuItem value="a" primaryText="A" />
                        <MenuItem value="b" primaryText="B" />
                        <MenuItem value="c" primaryText="C" />
                    </SelectField>
                    <List>
                        <Subheader style={{ paddingLeft: 0 }}>Likes</Subheader>
                        <Checkbox name="likes" label="Milk" value="Milk" checked={model['likes'].indexOf('Milk') !== -1} onCheck={this.onCheckChange} onBlur={this.onBlur} />
                        <Checkbox name="likes" label="Cakes" value="Cakes" checked={model['likes'].indexOf('Cakes') !== -1} onCheck={this.onCheckChange} onBlur={this.onBlur} />
                        <Checkbox name="likes" label="Nutella" value="Nutella" checked={model['likes'].indexOf('Nutella') !== -1} onCheck={this.onCheckChange} onBlur={this.onBlur} />
                        {errors['likes'] && <span className="error-text">{errors['likes']}</span>}
                    </List>

                    <div>
                        <Checkbox name="agree" label="Agree to conditions" checked={model['agree'] === true} onCheck={this.onCheckChange} onBlur={this.onBlur} />
                        {errors['agree'] && <span className="error-text">{errors['agree']}</span>}
                    </div>
                    <div>
                        <RaisedButton type="submit" label="Register" primary fullWidth />
                    </div>
                </form>
            </div>
        );
    }
}

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: deepOrange300,
        primary2Color: deepOrange300
    }
});

class MaterialUiWrapperPage extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <MaterialUiPage />
            </MuiThemeProvider>
        );
    }
}
export default MaterialUiWrapperPage;
