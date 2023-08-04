function random(data){
    return data;
}

module.exports.fuzz = function (data) {
    const fuzzerData = data.toString();
    random(fuzzerData);
}
