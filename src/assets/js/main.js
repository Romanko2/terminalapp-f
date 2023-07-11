function isNumber(e){
    let key = e;
    let maxlength = key.maxLength?key.maxLength:1;
    
    let max = Number(key.max?key.max:key.value);
    if (Number(key.value) > max) key.value = max;

    // let min = key.min;
    // if (min && Number(key.value)<Number(min)) key.value = min;

    if (key.value.length > maxlength) key.value = key.value.slice(0, maxlength);
    key.value = key.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
}

function isNumber2(e){
    let key = e;
    let min = key.min;
    if (min && Number(key.value)<Number(min)) key.value = min;
}