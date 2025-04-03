// JavaScript (modificado)

const sendButton = document.getElementById('sendButton');
const userMessage = document.getElementById('userMessage');
const messagesContainer = document.getElementById('messages');
const chatbotWrapper = document.getElementById('chatbotWrapper'); // Referencia al wrapper
const openChatButton = document.getElementById('openChatButton'); // Referencia al botón

// Al inicio de tu script (ejecutado una vez por carga de página)
const userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
console.log("User ID para esta sesión:", userId);

// --- Inicialización: Ocultar el chatbot al cargar la página ---
chatbotWrapper.style.display = 'none'; // Ocultar al inicio
/* *** IMPORTANTE: Elimina esta línea *** */
// openChatButton.innerText = 'Abrir Chat'; // Texto inicial del botón

sendButton.addEventListener('click', async () => {
    const message = userMessage.value.trim();

    if (message) {
        addMessageToChat('Usuario: ' + message, 'user');
        userMessage.value = '';

        try {
            const response = await fetch('https://saravl8.app.n8n.cloud/webhook/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message, userId }),
            });

            const aiResponseText = await response.text();
            console.log('Respuesta del Webhook (Texto):', aiResponseText);

            if (aiResponseText) {
                addMessageToChat('Chatbot: ' + aiResponseText, 'chatbot');
            } else {
                addMessageToChat('Chatbot: Recibí una respuesta vacía.', 'chatbot');
            }

        } catch (error) {
            console.error("Error al contactar al chatbot:", error);
            addMessageToChat('Chatbot: Hubo un error al intentar conectar. Intenta de nuevo.', 'chatbot');
        }

    } else {
        alert('Por favor, escribe un mensaje antes de enviar.');
    }
});

function addMessageToChat(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender);
    messageElement.innerText = message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// --- Evento para mostrar/ocultar el chatbot ---
openChatButton.addEventListener('click', () => {
    if (chatbotWrapper.style.display === 'none') {
        chatbotWrapper.style.display = 'block'; // Muestra el chatbot
        openChatButton.innerHTML = '<img src="imgChat.png" alt="Cerrar Chat">'; 
    } else {
        chatbotWrapper.style.display = 'none';   // Oculta el chatbot
        openChatButton.innerHTML = '<img src="imgChat.png" alt="Abrir Chat">'; 
    }
});