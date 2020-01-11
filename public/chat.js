//Make connection
var socket = io.connect(window.location.href);//change to server's location

//query dom

var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback'),
    file=document.getElementById("fileUpload"),
    serverInfo = document.getElementById("serverinfo");

//emmit events
btn.addEventListener("click",function(){
    socket.emit("chat",{
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener("keypress",function(){
    socket.emit("typing",handle.value);
});

//listen for server events
socket.on("chat",function(data){
    output.innerHTML+= "<p><strong>"+data.handle+": </strong>"+data.message+"</p>";
    feedback.innerHTML="";
    message.innerHTML.value=""
    console.log(data.message);
});
socket.on("typing",function(data){
    feedback.innerHTML="<p><em>"+data+" is typing...</em></p>";
});
socket.on("serverPrivate",function(data){
    serverInfo.innerHTML="<p><em>[server]: "+data+"</em></p>";
    output.innerHTML+= "<p><server>"+"Server (only you can read this)"+": </server>"+data+"</p>";
});
socket.on("serverPublic",function(data){
    output.innerHTML+= "<p><server>"+"Server"+": </server>"+data+"</p>";
    serverInfo.innerHTML="<p><server>"+"Server"+": </server>"+data+"</p>"
})