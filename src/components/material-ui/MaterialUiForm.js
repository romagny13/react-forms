import React from 'react';
import { PropTypes } from 'prop-types';
import { MuiThemeProvider, TextField, SelectField, MenuItem, List, Checkbox, RadioButtonGroup, RadioButton, Subheader, FlatButton, RaisedButton } from 'material-ui';

const MaterialUiForm = ({ errors, model, onChange, onCheckChange, onSelectionChange, onBlur, onSubmit }) => (
    <form onSubmit={onSubmit} autoComplete="off">
        <div>
            <Subheader style={{ paddingLeft: 0 }}>Title</Subheader>
            <RadioButtonGroup name="title" label="Title" error={errors['title']} onChange={onCheckChange} asterisk>
                <RadioButton style={{ display: 'inline-block', width: '80px' }} label="Mr" value="Mr" checked={model['title'] === "Mr"} onBlur={onBlur} />
                <RadioButton style={{ display: 'inline-block', width: '80px' }} label="Mrs" value="Mrs" checked={model['title'] === "Mrs"} onBlur={onBlur} />
                <RadioButton style={{ display: 'inline-block', width: '80px' }} label="Ms" value="Ms" checked={model['title'] === "Ms"} onBlur={onBlur} />
            </RadioButtonGroup>
            {errors['title'] && <span className="error-text">{errors['title']}</span>}
        </div>

        <TextField name="firstname" value={model['firstname']} hintText="First Name" errorText={errors['firstname']} onChange={onChange} onBlur={onBlur} fullWidth />
        <TextField name="lastname" value={model['lastname']} hintText="Last Name" errorText={errors['lastname']} onChange={onChange} onBlur={onBlur} fullWidth />
        <TextField type="password" name="password" value={model['password']} hintText="Password" errorText={errors['password']} onChange={onChange} onBlur={onBlur} fullWidth />
        <TextField type="password" name="confirmPassword" value={model['confirmPassword']} hintText="Confirm password" errorText={errors['confirmPassword']} onChange={onChange} onBlur={onBlur} fullWidth />
        <SelectField floatingLabelText="List" name="list" value={model['list']} onChange={onSelectionChange} fullWidth>
            <MenuItem value="a" primaryText="A" />
            <MenuItem value="b" primaryText="B" />
            <MenuItem value="c" primaryText="C" />
        </SelectField>
        <List>
            <Subheader style={{ paddingLeft: 0 }}>Likes</Subheader>
            <Checkbox name="likes" label="Milk" value="Milk" checked={model['likes'].indexOf('Milk') !== -1} onCheck={onCheckChange} onBlur={onBlur} />
            <Checkbox name="likes" label="Cakes" value="Cakes" checked={model['likes'].indexOf('Cakes') !== -1} onCheck={onCheckChange} onBlur={onBlur} />
            <Checkbox name="likes" label="Nutella" value="Nutella" checked={model['likes'].indexOf('Nutella') !== -1} onCheck={onCheckChange} onBlur={onBlur} />
            {errors['likes'] && <span className="error-text">{errors['likes']}</span>}
        </List>

        <div>
            <Checkbox name="agree" label="Agree to conditions" checked={model['agree'] === true} onCheck={onCheckChange} onBlur={onBlur} />
            {errors['agree'] && <span className="error-text">{errors['agree']}</span>}
        </div>
        <div>
            <RaisedButton type="submit" label="Register" primary fullWidth />
        </div>
    </form>
);
MaterialUiForm.PropTypes = {
    model: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onCheckChange: PropTypes.func.isRequired,
    onSelectionChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default MaterialUiForm;