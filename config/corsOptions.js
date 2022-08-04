const whitelist=['http://127.0.0.1:5500','http://localhost:3000','https://www.google.com']
 const corsOptionsDelegate = (req, callback) => {
    let corsOptions;

    let isDomainAllowed = whitelist.indexOf(req.header('Origin')) !== -1;
    

    if (isDomainAllowed ) {
        // Enable CORS for this request
        corsOptions = { origin: true }
    } else {
        // Disable CORS for this request
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}

module.exports=corsOptionsDelegate;