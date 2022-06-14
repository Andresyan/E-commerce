function filter(array, cb) {
    let filteredData = [];
    for(let i = 0; i < array.length; i++) {
        let result = cb(array[i]);
        if(result) {
            filteredData.push(array[i]);
        }
    }
    return filteredData;
}

function find(array, cb) {
    for(let i=0; i<array.length; i++) {
        let result = cb(array[i]);
        if(result===true) {
            return array[i];
        }
    }
}

export {filter, find};