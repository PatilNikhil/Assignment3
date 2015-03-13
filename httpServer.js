/* Node module to creates http web server and listen to port 8000 for request.
@author Nikhil */

var http = require("http");
var fs = require("fs");

var Server = function() {
	console.log("Server is running....");
}

Server.prototype.start = function() {
	//function to create server
	 http.createServer(function(request, response) {
		console.log("Received request for " + request.url);
		//checking for only Get requests
		if(request.method == "GET") {
			//checking requested image is present or not
			fs.exists("./Images" + request.url, function(exists) {
				if(exists){
					console.log
					//reading file from perticular directory of disk
					fs.readFile("./Images" + request.url, function(error, data) {
						if(error){
							//sending response to user if any internal error
							response.writeHead(500,{"content-type": "text/html"});
							response.end("<h1>Error while reading file</h1>");
						}
						else{
							//sending valid response and data
							response.writeHead(200,{"Content-Type": "image/jpg"}); 
							response.end(data);
						}
					});
				}
				else{
					//sending response to user if file not fond
					response.writeHead(404,{"content-type": "text/html"});
					response.end("<h1>Sorry that page was not found</h1>");
				}
			});
		}
		else {
			//sends response to request other than Get
			response.writeHead(401,{"content-type": "text/html"});
			response.end("Bad request");
		}
		//listens on port for the request
	}).listen(8000,function(){
		console.log("Listening to port : " + 8000);
	});
}

var myServer = new Server();
myServer.start();