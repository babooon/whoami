var http = require('http');

var server = http.createServer(function (req, res) {
    
    if (req.url !== "/api/whoami/" && req.url !== "/api/whoami"){
        
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end("Try " + req.headers["host"] + "/api/whoami/");
        
    }else{
        
        var ip = req.headers["x-forwarded-for"];
        var lang = req.headers["accept-language"]
            .substring(0,req.headers["accept-language"].indexOf(","));
        var os = req.headers["user-agent"]
            .substring(req.headers["user-agent"].indexOf("(") + 1,
                        req.headers["user-agent"].indexOf(")") );
                        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        
        res.end(JSON.stringify({
            IP: ip,
            LANG: lang,
            OS: os
        }));
        
    }

});

server.listen(process.env.PORT || 8080);