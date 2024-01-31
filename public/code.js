(function(){
    const app = document.querySelector(".app");
    const socket = io();

    let uname;

    app.querySelector(".join-screen #join-user").addEventListener("click", function(){
        let username = app.querySelector(".join-screen #username").value;
        if (username.length == 0){
            return;
        }
        socket.emit("newuser", username);
        uname = username;
        app.querySelector(".join-screen").classList.remove("active");
        app.querySelector(".chat-screen").classList.add("active");
    });

    app.querySelector(".chat-screen #send-messages").addEventListener("click", function(){
        let message = app.querySelector(".chat-screen #message-input").value;
        console.log(message);
        if(message.length == 0){
            return;
        }
        // Render the message in the browser
        renderMessage("my", {
            username: uname,
            text: message,
        });
        socket.emit("chat", {
            username: uname,
            text: message,
        });
        app.querySelector(".chat-screen #message-input").value = "";
    });

    app.querySelector(".chat-screen #exit-chat").addEventListener("click",function(){
        socket.emit("exituser",uname);
        window.location.href = window.location.href;
    });

    socket.on("update", function(update){
        renderMessage("update" ,update);
    });
    socket.on("chat", function(message){
        renderMessage("other" , message);
    });

    // Function to render messages in the browser
    function renderMessage(type, message) {
        const messageContainer = document.querySelector('.messages-container');
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', type + '-message');
        const messageContent = `
            <div>
                <div class="name">${message.username}</div>
                <div class="text">${message.text}</div>
            </div>
        `;
        messageElement.innerHTML = messageContent;
        messageContainer.appendChild(messageElement);
    }

  

    // Rest of your code...
})();

