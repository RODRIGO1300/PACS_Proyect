const getParams = function (req){
    
    var params = {};
    if(req.body && Object.keys(req.body).length){
        params = Object.assign(params, req.body)
    }

    if(Object.keys(req, params).length != 0){
        params = Object.assign(params, req.params);
    }

    if(Object.keys(req.query).length){
        params = Object.assign(params, req.query); 
    }

    if(req.file){
        params.file = req.file;
    }
    return params;
}

module.exports = {
    getParams
}