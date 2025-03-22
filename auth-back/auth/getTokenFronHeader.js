function getTokenFromHeader(headers){
    if(headers && headers.autorization){
        const parted = headers.autorization.split(' ');
        if(parted.length === 2){
            return parted[1];
        }else{
            return null;
        }
    }else{
        return null;
    }
}

module.exports = {getTokenFromHeader};