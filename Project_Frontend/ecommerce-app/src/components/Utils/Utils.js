export const currencyFormat = (num) => {
    if (num) {
        return ' $ ' + num?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    return ' $ 0';
}

export const getKeysFromString = (str) => {
    return str.split(/[.[\]]+/).filter(key => key !== "").map(key => isNaN(key) ? key : parseInt(key));
}

export const hasIndex = (str) => {
    // check if string contains '[number]'
    const regex = /\[\d+\]/;
    return regex.test(str);
}

export const getErrorsMessageOfFormik = (name, errors, touched) => {
    if (isEmpty(errors) || isEmpty(touched)) return '';
    if (hasIndex(name)) {
        const arrayField = getKeysFromString(name);
        const error = errors[arrayField[0]][arrayField[1]][arrayField[2]];
        const touch = touched[arrayField[0]][arrayField[1]][arrayField[2]];

        return touch && !!error ? error : '';
    } else {
        const error = errors[name];
        const touch = touched[name];

        return touch && !!error ? error : '';
    }
}
export function isEmpty(obj) {
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }

    return true;
}