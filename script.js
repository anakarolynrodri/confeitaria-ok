// Array com perguntas, opções de resposta, respostas associadas e imagens
const questions = [
    {
        question: "Qual sabor você prefere?", // Texto da pergunta
        options: ["Doce", "Azedo", "Amargo", "Salgado"], // Opções de resposta
        answers: ["Brownie", "Torta de Limão", "Café Gelado", "Pretzel"], // Respostas associadas às opções
        image: "sabor.png" // Caminho da imagem para a pergunta
    },
    {
        question: "Qual é seu ingrediente favorito?",
        options: ["Chocolate", "Frutas", "Nozes", "Caramelo"],
        answers: ["Brownie", "Sorvete de Frutas", "Torta de Nozes", "Caramelo Salgado"],
        image: "ingrediente.png"
    },
    {
        question: "Como você descreveria sua personalidade?",
        options: ["Aventureira", "Tradicional", "Divertida", "Elegante"],
        answers: ["Sorvete", "Cheesecake", "Cupcake", "Tiramisu"],
        image: "personalidade.png"
    },
    {
        question: "Escolha uma bebida para acompanhar a sobremesa:",
        options: ["Café", "Chá", "Refrigerante", "Suco"],
        answers: ["Tiramisu", "Cheesecake", "Cupcake", "Torta de Limão"],
        image: "bebida.png"
    }
];

let currentQuestion = 0; // Índice da pergunta atual
let scores = { Brownie: 0, "Torta de Limão": 0, "Cheesecake": 0, Sorvete: 0, Tiramisu: 0, "Cupcake": 0 }; // Objeto para armazenar pontuações das respostas

// Função que carrega a pergunta atual e exibe no HTML
function loadQuestion() {
    const questionEl = document.getElementById('question'); // Elemento do HTML que exibe a pergunta
    const optionsEl = document.getElementById('options'); // Container para os botões de opções de resposta
    const imageEl = document.getElementById('question-image'); // Elemento de imagem da pergunta

    questionEl.textContent = questions[currentQuestion].question; // Define o texto da pergunta
    optionsEl.innerHTML = ''; // Limpa as opções anteriores
    imageEl.src = questions[currentQuestion].image; // Define a imagem da pergunta atual
    imageEl.alt = questions[currentQuestion].question; // Define o texto alternativo da imagem

    // Cria botões de resposta para cada opção
    questions[currentQuestion].options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option; // Texto do botão
        button.onclick = () => selectOption(index); // Define função para tratar o clique na opção
        optionsEl.appendChild(button); // Adiciona o botão ao container de opções
    });
}

// Função chamada ao selecionar uma opção
function selectOption(index) {
    const chosenAnswer = questions[currentQuestion].answers[index]; // Resposta associada à opção selecionada
    scores[chosenAnswer]++; // Incrementa a pontuação da resposta escolhida
    
    currentQuestion++; // Avança para a próxima pergunta
    if (currentQuestion < questions.length) {
        loadQuestion(); // Carrega a próxima pergunta se houver
    } else {
        showResult(); // Mostra o resultado final se todas as perguntas foram respondidas
    }
}

// Função que exibe o resultado com base na pontuação
function showResult() {
    // Encontra a sobremesa com maior pontuação
    let bestMatch = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    document.getElementById('quiz').innerHTML = `
        <h2>Sua sobremesa ideal é: ${bestMatch}!</h2>
        <button id="next-question" onclick="location.reload()">Novo Quizz</button>
    `; // Exibe a sobremesa ideal e um botão para reiniciar o quiz
}

loadQuestion(); // Inicia o quiz carregando a primeira pergunta
