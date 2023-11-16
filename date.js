
exports.getDate= function(){
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date(); 
    return today.toLocaleDateString("en-US",options); // Saturday, September 17, 2016
};

exports.getDay= function(){
    var options = { weekday: 'long' };
    var today  = new Date(); 
    return today.toLocaleDateString("en-US",options); // Saturday 
};


