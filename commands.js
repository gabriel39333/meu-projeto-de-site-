// assets/js/commands.js - Módulo do Banco de Comandos
const CommandModule = {
    // Lista de respostas programadas
    getHelp() {
        return "Comandos disponíveis:\n- 'Que horas são?'\n- 'Data de hoje'\n- 'Pesquisar [termo] no Google'\n- 'Pesquisar [termo] no Youtube'\n- 'Quanto é [expressão matemática]'\n- 'Conte uma piada'\n- 'Lembrete: [seu texto]'";
    },

    process(text) {
        const query = text.toLowerCase().trim();

        // Hora atual
        if (query.includes('horas') || query.includes('hora')) {
            const now = new Date();
            return `Agora são exatamente ${now.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}.`;
        }

        // Data atual
        if (query.includes('data') || query.includes('dia')) {
            const now = new Date();
            return `Hoje é ${now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}.`;
        }

        // Busca no Google
        if (query.startsWith('pesquisar no google') || query.startsWith('busca google')) {
            const term = query.replace('pesquisar no google', '').replace('busca google', '').trim();
            if(term) {
                window.open(`https://www.google.com/search?q=${encodeURIComponent(term)}`, '_blank');
                return `Abrindo pesquisa no Google para: "${term}"...`;
            }
        }

        // Busca no YouTube
        if (query.includes('youtube')) {
            const term = query.replace('pesquisar no youtube', '').replace('youtube', '').trim();
            if(term) {
                window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(term)}`, '_blank');
                return `Buscando no YouTube por: "${term}"...`;
            }
        }

        // Operações Matemáticas
        if (query.startsWith('quanto é') || query.startsWith('calculo')) {
            try {
                const mathExpr = query.replace('quanto é', '').replace('calculo', '').replace('x', '*').trim();
                const result = Function(`'use strict'; return (${mathExpr})`)();
                return `O resultado do cálculo é: ${result}`;
            } catch (e) {
                return "Não consegui calcular essa expressão. Tente algo como 'quanto é 12 + 8'.";
            }
        }

        // Piadas
        if (query.includes('piada') || query.includes('engraçado')) {
            const jokes = [
                "Por que o livro de matemática ficou triste? Porque tinha muitos problemas!",
                "O que o JavaScript disse para o HTML? 'Você me dá estrutura, eu te dou vida!'",
                "Existem 10 tipos de pessoas no mundo: as que entendem binário e as que não entendem."
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        }

        // Comando de Ajuda
        if (query === 'ajuda' || query === 'comandos') {
            return this.getHelp();
        }

        return null; // Caso não encontre comando direto
    }
};