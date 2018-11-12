// this file is used to define user-configurable environment variables

// the value of each key gets passed the raw value from the environment (which may be undefined)
// and should return a sansitized value, which can be JSON.stringify()ed. 
module.exports = {
    'MMT_URL': (url) => url || "http://localhost:9000/:mathhub/", 
    'NEWS_URL': (url) => url || "",
    'BROWSER_ROUTER': (br) => br || "",
    'MOCK_MMT': (mock) => mock === "1",
};