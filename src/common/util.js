export function updateErrors(errors, name, hasError, error) {
    if (hasError) { errors[name] = error; }
    else if (errors.hasOwnProperty(name)) { delete errors[name]; }
    return errors;
}

export function updateModel(model, name, value) {
    if (name === 'likes') {
        let likes = model['likes'];
        let index = likes.indexOf(value);
        if (index === -1) {
            likes.push(value);
        }
        else {
            likes.splice(index, 1);
        }
    }
    else {
        model[name] = value;
    }
    return model;
}

export function touch(touchedFields, name) {
    touchedFields[name] = 'touched';
}

export function touchAll(touchedFields, model) {
    for (let name in model) {
        if (model.hasOwnProperty(name)) {
            touch(touchedFields, name);
        }
    }
}

export function isTouched(touchedFields, name) {
    return touchedFields.hasOwnProperty(name);
}

