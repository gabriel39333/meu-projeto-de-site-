// assets/js/main.js - Inicialização e Manipulação do DOM
document.addEventListener('DOMContentLoaded', () => {
    const assistant = new PersonalAssistant();
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const btnMic = document.getElementById('btn-mic');

    // Manipulador do formulário de envio
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = userInput.value.trim();
        if (!text) return;

        appendMessage('você', text, 'user');
        userInput.value = '';

        const response = await assistant.reply(text);
        appendMessage('Nexus AI', response, 'assistant');
    });

    // Função para adicionar balões de mensagens
    function appendMessage(sender, text, type) {
        const msgDiv = document.createElement('div');
        msgDiv.className = type === 'user' ? 'message-user' : 'message-assistant';
        msgDiv.innerHTML = `<strong>${sender}:</strong> <p>${text}</p>`;
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Reconhecimento de Voz (Web Speech API)
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'pt-BR';

        btnMic.addEventListener('click', () => {
            recognition.start();
            btnMic.classList.add('mic-listening');
        });

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            userInput.value = transcript;
            btnMic.classList.remove('mic-listening');
            chatForm.dispatchEvent(new Event('submit'));
        };

        recognition.onerror = () => {
            btnMic.classList.remove('mic-listening');
        };
    } else {
        btnMic.style.display = 'none'; // Esconde botão se não suportado
    }
});