import React, { Component } from 'react';
import { isTouched, touch, touchAll, updateErrors, updateModel } from '../../common/util';
import { required, custom, isRequired, maxLength, minLength, pattern } from '../../common/validators';
import { canValidateOnBlur, canValidateOnChange, validateAll, validateValue, getElementValue } from '../../common/fwk';

import '../../../node_modules/bootstrap/dist/css/bootstrap.css';

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

class SimpleFormPage extends Component {
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
          <Field label="Title" error={errors['title']} asterisk>
            <div>
              <label className="radio-inline"><input type="radio" name="title" value="Mr" checked={model['title'] === "Mr"} onChange={this.onChange} onBlur={this.onBlur} />Mr</label>
              <label className="radio-inline"><input type="radio" name="title" value="Mrs" checked={model['title'] === "Mrs"} onChange={this.onChange} onBlur={this.onBlur} />Mrs</label>
              <label className="radio-inline"><input type="radio" name="title" value="Ms" checked={model['title'] === "Ms"} onChange={this.onChange} onBlur={this.onBlur} />Ms</label>
            </div>
          </Field>
          <Field label="First Name" error={errors['firstname']} asterisk>
            <input type="text" name="firstname" value={model['firstname']} className="form-control" onChange={this.onChange} onBlur={this.onBlur} />
          </Field>
          <Field label="Last Name" error={errors['lastname']} asterisk>
            <input type="text" name="lastname" value={model['lastname']} className="form-control" onChange={this.onChange} onBlur={this.onBlur} />
          </Field>
          <Field label="Password" error={errors['password']} asterisk>
            <input type="password" name="password" value={model['password']} className="form-control" onChange={this.onChange} onBlur={this.onBlur} placeholder="Password" />
          </Field>
          <Field label="Confirm password" error={errors['confirmPassword']} asterisk>
            <input type="password" name="confirmPassword" value={model['confirmPassword']} className="form-control" onChange={this.onChange} onBlur={this.onBlur} placeholder="Confirm password" />
          </Field>
          <div className="form-group">
            <select name="list" value={model['list']} className="form-control" onChange={this.onChange} onBlur={this.onBlur}>
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="c">C</option>
            </select>
          </div>
          <Field label="Likes" error={errors['likes']} asterisk>
            <div className="checkbox"><label><input type="checkbox" name="likes" value="Milk" checked={model['likes'].indexOf('Milk') !== -1} onChange={this.onChange} onBlur={this.onBlur} />Milk</label></div>
            <div className="checkbox"><label><input type="checkbox" name="likes" value="Cakes" checked={model['likes'].indexOf('Cakes') !== -1} onChange={this.onChange} onBlur={this.onBlur} />Cakes</label></div>
            <div className="checkbox"><label><input type="checkbox" name="likes" value="Nutella" checked={model['likes'].indexOf('Nutella') !== -1} onChange={this.onChange} onBlur={this.onBlur} />Nutella</label></div>
          </Field>
          <Field error={errors['agree']} asterisk>
            <div className="checkbox"><label><input type="checkbox" name="agree" checked={model['agree']} onChange={this.onChange} onBlur={this.onBlur} />Agree to conditions</label></div>
          </Field>
          <div className="form-group">
            <input type="submit" value="Register" className="btn btn-info btn-block text-uppercase" />
          </div>
        </form>
      </div>
    );
  }
}
export default SimpleFormPage;