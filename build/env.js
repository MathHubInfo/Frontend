// this file is used to define user-configurable environment variables

module.exports = (function(user){
    const _env = {
        'MATHHUB_VERSION': JSON.stringify(require("../package.json").version),
        'MATHHUB_BUILD_TIME': JSON.stringify((new Date()).getTime()),
    }
    
    for (var key in user){
        if (user.hasOwnProperty(key)) {
            _env[key] = JSON.stringify(
                user[key](process.env[key]).toString()
            );
        }
    }

    return _env;
})(
    // the value of each key gets passed the raw value from the environment (which may be undefined)
    // and should return a sansitized value, which can be JSON.stringify()ed. 
    {
        'MMT_URL': (url) => url || "", 
        'NEWS_URL': (url) => url || "",
        'GLOSSARY_URL': (url) => url || "",
        'BROWSER_ROUTER': (br) => br || "",
    }
);