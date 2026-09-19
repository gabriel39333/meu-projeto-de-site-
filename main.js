// Relógio Digital em Tempo Real
function updateClock() {
    const clockElement = document.getElementById('hud-clock');
    const now = new Date();
    clockElement.textContent = now.toLocaleTimeString('pt-BR');
}
setInterval(updateClock, 1000);
updateClock();

// Seleção de Elementos DOM
const micBtn = document.getElementById('mic-btn');
const statusText = document.getElementById('status-text');
const arcReactor = document.getElementById('arc-reactor');
const chatDisplay = document.getElementById('chat-display');

const btnTime = document.getElementById('btn-time');
const btnDate = document.getElementById('btn-date');
const btnGoogle = document.getElementById('btn-google');
const btnClear = document.getElementById('btn-clear');

// Configuração de Reconhecimento de Voz (Web Speech API)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let isListening = false;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
        isListening = true;
        micBtn.classList.add('listening');
        statusText.textContent = "Ouvindo comando...";
        arcReactor.classList.add('active');
    };

    recognition.onend = () => {
        isListening = false;
        micBtn.classList.remove('listening');
        statusText.textContent = "Aguardando comando...";
        arcReactor.classList.remove('active');
    };

    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript;
        addMessage(command, 'user');
        processCommand(command);
    };

    recognition.onerror = () => {
        speak("Desculpe, não consegui entender o comando.");
    };
} else {
    alert("Reconhecimento de voz não suportado neste navegador.");
}

// Síntese de Voz de I.A (JARVIS Falando)
function speak(text) {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;
    utterance.pitch = 0.9;

    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find(v => v.lang.includes('pt') && v.name.toLowerCase().includes('male')) 
                 || voices.find(v => v.lang.includes('pt'));
    
    if (ptVoice) utterance.voice = ptVoice;

    utterance.onstart = () => {
        arcReactor.classList.add('active');
        statusText.textContent = "JARVIS respondendo...";
    };

    utterance.onend = () => {
        arcReactor.classList.remove('active');
        statusText.textContent = "Aguardando comando...";
    };

    addMessage(text, 'jarvis');
    window.speechSynthesis.speak(utterance);
}

// Adicionar mensagem no chat da interface
function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender === 'jarvis' ? 'jarvis-msg' : 'user-msg');
    
    const icon = document.createElement('i');
    icon.className = sender === 'jarvis' ? 'fa-solid fa-robot' : 'fa-solid fa-user';

    const span = document.createElement('span');
    span.textContent = text;

    msgDiv.appendChild(icon);
    msgDiv.appendChild(span);
    chatDisplay.appendChild(msgDiv);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

// Interpretação de Comandos Úteis do Dia a Dia
function processCommand(command) {
    const cmd = command.toLowerCase();

    if (cmd.includes('hora') || cmd.includes('horas')) {
        const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        speak(`Agora são exatamente ${time}.`);
    } 
    else if (cmd.includes('data') || cmd.includes('dia')) {
        const date = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
        speak(`Hoje é ${date}.`);
    } 
    else if (cmd.includes('pesquise por') || cmd.includes('pesquisar')) {
        const query = cmd.replace('pesquise por', '').replace('pesquisar', '').trim();
        if (query) {
            speak(`Pesquisando ${query} no Google.`);
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
        } else {
            speak("O que você gostaria de pesquisar?");
        }
    } 
    else if (cmd.includes('youtube')) {
        speak("Abrindo o YouTube.");
        window.open('https://www.youtube.com', '_blank');
    } 
    else if (cmd.includes('olá') || cmd.includes('oi') || cmd.includes('jarvis')) {
        speak("Olá! Como posso ajudar você no seu dia a dia?");
    } 
    else {
        speak("Comando não reconhecido. Tente perguntar as horas, a data ou fazer uma pesquisa.");
    }
}

// Ouvintes de Eventos dos Botões
micBtn.addEventListener('click', () => {
    if (!recognition) return;
    isListening ? recognition.stop() : recognition.start();
});

btnTime.addEventListener('click', () => {
    const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    speak(`Agora são ${time}.`);
});

btnDate.addEventListener('click', () => {
    const date = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
    speak(`Hoje é ${date}.`);
});

btnGoogle.addEventListener('click', () => {
    speak("Abrindo o buscador do Google.");
    window.open('https://www.google.com', '_blank');
});

btnClear.addEventListener('click', () => {
    chatDisplay.innerHTML = '';
});