// script.js
const activateBtn = document.getElementById('activateBtn');
const reactor = document.getElementById('reactor');
const output = document.getElementById('output');
const statusText = document.getElementById('status');

// Web Speech API - Reconhecimento de voz
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    output.innerText = "Seu navegador não suporta reconhecimento de voz. Use o Google Chrome ou Microsoft Edge.";
} else {
    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.continuous = false;
    recognition.interimResults = false;

    // Função para falar
    function falar(texto) {
        window.speechSynthesis.cancel(); // Parar falas anteriores
        const meutexto = new SpeechSynthesisUtterance(texto);
        meutexto.lang = 'pt-BR';
        meutexto.rate = 1.0;
        meutexto.pitch = 0.9;
        window.speechSynthesis.speak(meutexto);
    }

    // Processamento de comandos
    function processarComando(comando) {
        const cmd = comando.toLowerCase();

        if (cmd.includes('horas') || cmd.includes('horário')) {
            const agora = new Date();
            const resposta = `Agora são ${agora.getHours()} horas e ${agora.getMinutes()} minutos, senhor.`;
            output.innerText = resposta;
            falar(resposta);
        } 
        else if (cmd.includes('data') || cmd.includes('dia')) {
            const hoje = new Date();
            const dataExtenso = hoje.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            const resposta = `Hoje é ${dataExtenso}.`;
            output.innerText = resposta;
            falar(resposta);
        }
        else if (cmd.includes('google')) {
            const resposta = "Abrindo o Google, senhor.";
            output.innerText = resposta;
            falar(resposta);
            setTimeout(() => window.open('https://www.google.com', '_blank'), 1000);
        }
        else if (cmd.includes('youtube')) {
            const resposta = "Abrindo o YouTube, senhor.";
            output.innerText = resposta;
            falar(resposta);
            setTimeout(() => window.open('https://www.youtube.com', '_blank'), 1000);
        }
        else if (cmd.includes('quem é você') || cmd.includes('seu nome')) {
            const resposta = "Eu sou o J.A.R.V.I.S., sua inteligência artificial assistente.";
            output.innerText = resposta;
            falar(resposta);
        }
        else if (cmd.includes('status') || cmd.includes('sistemas')) {
            const resposta = "Todos os sistemas estão operando em 100% de capacidade, senhor.";
            output.innerText = resposta;
            falar(resposta);
        }
        else {
            const resposta = `Comando "${comando}" não reconhecido nos meus protocolos atuais, senhor.`;
            output.innerText = resposta;
            falar(resposta);
        }
    }

    // Eventos de escuta
    function iniciarEscuta() {
        try {
            recognition.start();
        } catch (e) {
            console.log("Reconhecimento já ativo.");
        }
    }

    recognition.onstart = () => {
        reactor.classList.add('listening');
        statusText.innerText = "Status: Ouvindo...";
        output.innerText = "Pode falar, estou ouvindo...";
    };

    recognition.onend = () => {
        reactor.classList.remove('listening');
        statusText.innerText = "Status: Aguardando comando...";
    };

    recognition.onresult = (event) => {
        const transcricao = event.results[0][0].transcript;
        statusText.innerText = `Processando: "${transcricao}"`;
        processarComando(transcricao);
    };

    recognition.onerror = (event) => {
        reactor.classList.remove('listening');
        statusText.innerText = "Status: Erro na leitura de voz";
        output.innerText = "Não consegui entender a voz ou o microfone foi negado.";
    };

    activateBtn.addEventListener('click', iniciarEscuta);
    reactor.addEventListener('click', iniciarEscuta);
}