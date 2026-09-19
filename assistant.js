// assets/js/assistant.js - Lógica Principal do Assistente
class PersonalAssistant {
    constructor() {
        this.synth = window.speechSynthesis;
    }

    // Processa a mensagem do usuário e devolve a resposta
    async reply(userText) {
        // Tenta encontrar um comando registrado
        const commandResponse = CommandModule.process(userText);
        
        if (commandResponse) {
            this.speak(commandResponse);
            return commandResponse;
        }

        // Resposta genérica de inteligência artificial
        const defaultResponse = `Entendi sua mensagem: "${userText}". Digite 'ajuda' para ver comandos específicos!`;
        this.speak(defaultResponse);
        return defaultResponse;
    }

    // Síntese de Voz (Falar resposta)
    speak(text) {
        if (!this.synth) return;
        this.synth.cancel(); // Parar fala anterior

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.0;
        this.synth.speak(utterance);
    }
}