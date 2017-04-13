export function canValidateOnChange(validators, submitted, touched) {
    return validators.length > 0 && (touched || submitted);
}

export function canValidateOnBlur(validators, mode, touched) {
    return validators.length > 0 && !touched && mode === 'touched';
}

export function validateValue(value, validators, model) {
    for (let i = 0; i < validators.length; i++) {
        let validator = validators[i];
        let result = validator(value, model);
        if (result) {
            return {
                hasError: true,
                error: result.error
            };
        }
    }
    return {
        hasError: false,
        error: ''
    };
}

/*export function validateAll(model, validators) {
    let errors = {},
        hasOneOrMoreErrors = false;

    for (let name in model) {
        if (model.hasOwnProperty(name)) {
            let fieldValidators = validators[name];
            if (Array.isArray(fieldValidators)) {
                let value = model[name];
                const { hasError, error } = validateValue(value, fieldValidators, model);
                if (hasError) {
                    errors[name] = error;
                    hasOneOrMoreErrors = true;
                }
            }
        }
    }

    return {
        hasError: hasOneOrMoreErrors,
        errors
    };
}*/

export function validateAll(model, validators) {
    let errors = {},
        states = {},
        hasOneOrMoreErrors = false;

    for (let name in model) {
        if (model.hasOwnProperty(name)) {
            let fieldValidators = validators[name];
            if (Array.isArray(fieldValidators)) {
                let value = model[name];
                const { hasError, error } = validateValue(value, fieldValidators, model);
                states[name] = { hasError, hasSuccess: !hasError, error };
                if (hasError) {
                    errors[name] = error;
                    hasOneOrMoreErrors = true;
                }
            }
        }
    }

    return {
        hasError: hasOneOrMoreErrors,
        states,
        errors
    };
}


export function getElementValue(element) {
    let tagName = element.tagName;
    if (tagName === 'INPUT') {
        if (element.type === 'checkbox') {
            // checkbox group => value, single checkbox => checked
            return element.value !== 'on' ? element.value : element.checked;
        } else {
            return element.value;
        }
    } else if (tagName === 'TEXTAREA') {
        return element.value;
    } else if (tagName === 'SELECT') {
        return element.options[element.selectedIndex].value;
    }
}
