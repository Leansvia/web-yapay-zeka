document.getElementById('userInput').addEventListener('keydown', function(event) {
 if (event.key === 'Enter') {
     sendMessage();
 }
});

function sendMessage() {
 var userInput = document.getElementById('userInput').value;
 if (userInput.trim() === '') return;

 displayMessage(userInput, 'user');
 document.getElementById('userInput').value = '';

 setTimeout(function() {
     getBotResponse(userInput);
 }, 600); 
}

function displayMessage(message, sender) {
 var chatbox = document.getElementById('chatbox');
 var messageDiv = document.createElement('div');
 messageDiv.className = 'message ' + sender;
 messageDiv.textContent = message;
 chatbox.appendChild(messageDiv);
 chatbox.scrollTop = chatbox.scrollHeight;
}

function getBotResponse(userInput) {
 var xhr = new XMLHttpRequest();
 xhr.open('GET', 'cvp.txt', true);
 xhr.onreadystatechange = function() {
     if (xhr.readyState === 4 && xhr.status === 200) {
         var lines = xhr.responseText.split('\n');
         var botResponse = findBotResponse(lines, userInput);
         if (!botResponse) {
             botResponse = 'Üzgünüm, bu konuda size yardımcı olamıyorum. Sistemimde kayıtlı değil.';
         }
         displayBotMessage(botResponse);
     }
 };
 xhr.send();
}

function findBotResponse(lines, userInput) {
 for (var i = 0; i < lines.length; i++) {
     var line = lines[i].trim();
     if (line !== '') {
         var parts = line.split(':');
         var question = parts[0].trim();
         var answer = parts.slice(1).join(':').trim();
         
         if (userInput.toLowerCase().includes(question.toLowerCase())) {
             return answer;
         }
     }
 }
 return null;
}

function displayBotMessage(botResponse) {
 setTimeout(function() {
     var chatbox = document.getElementById('chatbox');
     var messageDiv = document.createElement('div');
     messageDiv.className = 'message bot';
     messageDiv.textContent = botResponse;
     chatbox.appendChild(messageDiv);
     chatbox.scrollTop = chatbox.scrollHeight;

     playNotificationSound();
 }, 600); 
}

function playNotificationSound() {
 var audio = new Audio('complete.mp3');
 audio.play();
}
