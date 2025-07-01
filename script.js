document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos do formulário de avaliação
    const riskAssessmentForm = document.getElementById('risk-assessment-form');
    const calculateRiskBtn = document.getElementById('calculate-risk-btn');
    const riskResultDiv = document.getElementById('risk-result');
    const totalScoreSpan = document.getElementById('total-score');
    const riskLevelSpan = document.getElementById('risk-level');
    const gaugePointer = document.getElementById('gauge-pointer');

    // Referências aos elementos do formulário de dados do paciente/profissional
    const patientNameInput = document.getElementById('patient-name');
    const patientDobInput = document.getElementById('patient-dob');
    const currentDateInput = document.getElementById('current-date');
    const professionalNameInput = document.getElementById('professional-name');

    // Referência ao novo botão de impressão
    const printButton = document.getElementById('print-button');

    // Referências aos elementos da área de impressão
    const printPatientName = document.getElementById('print-patient-name');
    const printPatientDob = document.getElementById('print-patient-dob');
    const printCurrentDate = document.getElementById('print-current-date');
    const printProfessionalName = document.getElementById('print-professional-name');
    const printAssessmentBody = document.getElementById('print-assessment-body');
    
    const questions = [
        { group: 'GRUPO 1', question: 'Sente uma ansiedade frequente, com ou sem sensação de pânico?', name: 'q1_1', weight: 4 },
        { group: 'GRUPO 1', question: 'Tem apresentado dificuldade para dormir ou dormido em excesso?', name: 'q1_2', weight: 2 },
        { group: 'GRUPO 1', question: 'Sente medo exagerado de situações ou objetos que não representam risco real?', name: 'q1_3', weight: 2 },
        { group: 'GRUPO 1', question: 'Teve crises conversivas e/ou dissociativas?', name: 'q1_4', weight: 2 },
        { group: 'GRUPO 1', question: 'Teve mudanças no apetite ou na forma como se alimenta?', name: 'q1_5', weight: 2 },
        { group: 'GRUPO 1', question: 'Está excessivamente preocupado(a) com sua aparência ou peso corporal?', name: 'q1_6', weight: 2 },
        { group: 'GRUPO 1', question: 'Costuma apresentar muitas queixas físicas sem causa médica identificável?', name: 'q1_7', weight: 2 },
        { group: 'GRUPO 1', question: 'Tem pensamento/comportamento obsessivo-compulsivo?', name: 'q1_8', weight: 2 },
        { group: 'GRUPO 1', question: 'Tem pensamento de inutilidade e/ou sentimento de culpa?', name: 'q1_9', weight: 4 },
        { group: 'GRUPO 1', question: 'Está em um estado constante de tristeza, com falta de interesse ou prazer nas atividades?', name: 'q1_10', weight: 4 },
        { group: 'GRUPO 1', question: 'Percebe redução ou ausência de interesse em atividades sexuais?', name: 'q1_11', weight: 2 },
        { group: 'GRUPO 1', question: 'Teve desorientação temporal e/ou espacial?', name: 'q1_12', weight: 2 },

        { group: 'GRUPO 2', question: 'Já pensou em tirar a própria vida, mesmo sem planejar como?', name: 'q2_1', weight: 4 },
        { group: 'GRUPO 2', question: 'Já fez um plano ou tentou se suicidar recentemente?', name: 'q2_2', weight: 10 },
        { group: 'GRUPO 2', question: 'Tem apatia com ou sem isolamento social?', name: 'q2_3', weight: 4 },
        { group: 'GRUPO 2', question: 'Tem mudanças frequentes de humor acompanhadas de impulsividade ou comportamentos agressivos?', name: 'q2_4', weight: 6 },
        { group: 'GRUPO 2', question: 'Praticou heteroagressividade e/ou autoagressividade?', name: 'q2_5', weight: 8 },
        { group: 'GRUPO 2', question: 'Teve momentos de desinibição social, sexual ou perda de pudor?', name: 'q2_6', weight: 4 },
        { group: 'GRUPO 2', question: 'Sente excessivamente agitado(a) ou com muita energia sem motivo claro?', name: 'q2_7', weight: 4 },
        { group: 'GRUPO 2', question: 'Tem humor elevado, expansivo, irritável ou eufórico?', name: 'q2_8', weight: 4 },
        { group: 'GRUPO 2', question: 'Teve delírio (pensamento)?', name: 'q2_9', weight: 8 },
        { group: 'GRUPO 2', question: 'Teve alucinação (sensopercepção)?', name: 'q2_10', weight: 8 },
        { group: 'GRUPO 2', question: 'Teve alteração do curso e/ou da forma do pensamento?', name: 'q2_11', weight: 6 },
        { group: 'GRUPO 2', question: 'Teve perda da capacidade crítica da realidade?', name: 'q2_12', weight: 8 },
        { group: 'GRUPO 2', question: 'Tem notado esquecimentos ou dificuldades com a memória?', name: 'q2_13', weight: 2 },

        { group: 'GRUPO 3', question: 'Teve delirium tremens?', name: 'q3_1', weight: 10 },
        { group: 'GRUPO 3', question: 'Teve sintomas físicos ou emocionais ao tentar interromper o uso contínuo de álcool ou drogas?', name: 'q3_2', weight: 8 },
        { group: 'GRUPO 3', question: 'Tenta, mas não consegue reduzir ou controlar o uso de álcool ou outras drogas?', name: 'q3_3', weight: 8 },
        { group: 'GRUPO 3', question: 'Já colocou sua vida ou a de outros em risco sob efeito de álcool ou drogas?', name: 'q3_4', weight: 8 },
        { group: 'GRUPO 3', question: 'Tem percebido que precisa usar quantidades cada vez maiores de álcool ou drogas para sentir o mesmo efeito?', name: 'q3_5', weight: 6 },
        { group: 'GRUPO 3', question: 'Faz uso excessivo de álcool ou drogas, mesmo em situações inadequadas?', name: 'q3_6', weight: 8 },

        { group: 'GRUPO 4', question: 'Teve dificuldade de compreender e/ou transmitir informação verbal manifesta no desenvolvimento infantil?', name: 'q4_1', weight: 4 },
        { group: 'GRUPO 4', question: 'Movimentos corporais ou comportamentais repetitivos, bizarros ou paralisados?', name: 'q4_2', weight: 4 },
        { group: 'GRUPO 4', question: 'Dificuldade para adquirir e desenvolver as habilidades escolares?', name: 'q4_3', weight: 4 },
        { group: 'GRUPO 4', question: 'Dificuldade para adquirir e desenvolver as habilidades motoras?', name: 'q4_4', weight: 4 },
        { group: 'GRUPO 4', question: 'Severa dificuldade na interação social e às mudanças na rotina?', name: 'q4_5', weight: 8 },
        { group: 'GRUPO 4', question: 'Costuma iniciar tarefas e abandoná-las sem concluir, com frequência?', name: 'q4_6', weight: 2 },
        { group: 'GRUPO 4', question: 'Tem comportamento provocativo, desafiador e/ou opositor persistente?', name: 'q4_7', weight: 6 },
        { group: 'GRUPO 4', question: 'Tem comportamentos ou reações emocionais que não correspondem ao esperado para a idade biológica?', name: 'q4_8', weight: 4 },

        { group: 'GRUPO 5', question: 'Tem resistência, refratariedade, não adesão ao tratamento?', name: 'q5_1', weight: 4 },
        { group: 'GRUPO 5', question: 'Teve recorrência ou recaída (após 2 meses de remissão dos sintomas)?', name: 'q5_2', weight: 4 },
        { group: 'GRUPO 5', question: 'Teve exposição continuada ao estresse ou evento traumático?', name: 'q5_3', weight: 4 },
        { group: 'GRUPO 5', question: 'Tem precariedade de suporte familiar e/ou social?', name: 'q5_4', weight: 4 },
        { group: 'GRUPO 5', question: 'Já presenciou algum tipo de violência grave?', name: 'q5_5', weight: 2 },
        { group: 'GRUPO 5', question: 'Já sofreu ou praticou algum tipo de violência física, sexual ou psicológica?', name: 'q5_6', weight: 6 },
        { group: 'GRUPO 5', question: 'Perda da autonomia?', name: 'q5_7', weight: 6 },
        { group: 'GRUPO 5', question: 'Perda da capacidade funcional/ocupacional devido agravo de saúde?', name: 'q5_8', weight: 4 },
        { group: 'GRUPO 5', question: 'Tem vulnerabilidade social?', name: 'q5_9', weight: 2 },
        { group: 'GRUPO 5', question: 'Algum parente próximo teve transtorno mental, dependência química ou se suicidou?', name: 'q5_10', weight: 2 },
        { group: 'GRUPO 5', question: 'Tem comorbidade ou outra condição crônica de saúde?', name: 'q5_11', weight: 4 },
        { group: 'GRUPO 5', question: 'Tem menos de 18 anos ou mais de 60 anos de idade?', name: 'q5_12', weight: 6 },
        { group: 'GRUPO 5', question: 'Abandonou a escola ou teve atraso na escolarização?', name: 'q5_13', weight: 2 }
    ];

    calculateRiskBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        let totalScore = 0;
        let allQuestionsAnswered = true;
        const answeredQuestionsData = []; // Para armazenar as respostas para impressão

        // Remove a cor de fundo de erro de todas as linhas antes de reavaliar
        document.querySelectorAll('#risk-assessment-form tr').forEach(row => {
            row.style.backgroundColor = '';
        });

        questions.forEach(q => {
            const selectedOption = document.querySelector(`input[name="${q.name}"]:checked`);
            // Usar q.question diretamente, pois a lista 'questions' já tem o texto completo
            const questionText = q.question; 

            let answer = 'NÃO';
            let score = 0;

            if (selectedOption) {
                score = parseInt(selectedOption.value);
                if (score > 0) {
                    answer = 'SIM';
                }
                totalScore += score;
            } else {
                allQuestionsAnswered = false;
                const questionRow = document.querySelector(`input[name="${q.name}"]`).closest('tr');
                if (questionRow) {
                    questionRow.style.backgroundColor = '#ffe6e6'; // Cor de fundo para indicar erro
                }
            }
            // Armazena os dados para a impressão
            answeredQuestionsData.push({
                group: q.group,
                question: questionText, // Usamos o texto completo da pergunta
                answer: answer,
                score: score
            });
        });

        if (!allQuestionsAnswered) {
            alert('Por favor, responda todas as perguntas antes de calcular o risco.');
            riskResultDiv.style.display = 'none';
            return;
        }

        totalScoreSpan.textContent = totalScore;
        let riskLevelText = '';
        let riskColor = '';
        let rotationDegrees = 0; // 0 to 180 degrees for a semi-circle

        const maxScore = 240;
        rotationDegrees = (totalScore / maxScore) * 180;
        const pointerRotation = rotationDegrees - 90; // Ajusta para o centro do semicírculo
        gaugePointer.style.transform = `translateX(-50%) rotate(${pointerRotation}deg)`;

        if (totalScore >= 0 && totalScore <= 40) {
            riskLevelText = 'BAIXO RISCO';
            riskColor = '#ffeb3b'; // Cor amarela
        } else if (totalScore >= 41 && totalScore <= 70) {
            riskLevelText = 'MÉDIO RISCO';
            riskColor = '#ff9800'; // Cor laranja
        } else if (totalScore >= 71 && totalScore <= 240) {
            riskLevelText = 'ALTO RISCO';
            riskColor = '#f44336'; // Cor vermelha
        } else {
            riskLevelText = 'Pontuação Inválida';
            riskColor = 'gray';
        }

        riskLevelSpan.textContent = riskLevelText;
        riskLevelSpan.style.backgroundColor = riskColor; // Para a cor de fundo do texto do risco
        riskLevelSpan.style.color = '#000';

        riskResultDiv.style.display = 'block';
        riskResultDiv.scrollIntoView({ behavior: 'smooth' }); // Rola para a seção de resultados

        // --- Lógica para popular e imprimir a avaliação ---
        function populateAndPrintAssessment() {
            // Preencher dados do paciente/profissional na área de impressão
            printPatientName.textContent = patientNameInput.value;
            /*printPatientDob.textContent = patientDobInput.value;
            printCurrentDate.textContent = currentDateInput.value;*/
            const patientDobValue = patientDobInput.value;
            if (patientDobValue) {
                const [yearDob, monthDob, dayDob] = patientDobValue.split('-');
                printPatientDob.textContent = `${dayDob}/${monthDob}/${yearDob}`;
            } else {
                printPatientDob.textContent = ''; 
            }
            const currentDateValue = currentDateInput.value;
            if (currentDateValue) {
                const [yearCurrent, monthCurrent, dayCurrent] = currentDateValue.split('-');
                printCurrentDate.textContent = `${dayCurrent}/${monthCurrent}/${yearCurrent}`;
            } else {
                printCurrentDate.textContent = ''; 
            }
            printProfessionalName.textContent = professionalNameInput.value;

            // Preencher tabela de perguntas e respostas na área de impressão
            printAssessmentBody.innerHTML = ''; // Limpa o conteúdo anterior
            let currentGroup = ''; // Para agrupar as perguntas por grupo na impressão

            answeredQuestionsData.forEach(item => {
                let row = `<tr>`;
                if (item.group !== currentGroup) {
                    // Adiciona o nome do grupo apenas na primeira pergunta do grupo
                    // Conta quantas perguntas existem no grupo atual para rowspan
                    const groupCount = answeredQuestionsData.filter(q => q.group === item.group).length;
                    row += `<td rowspan="${groupCount}" class="group-name">${item.group}</td>`;
                    currentGroup = item.group;
                }
                row += `
                    <td>${item.question}</td>
                    <td>${item.answer}</td>
                    <td>${item.score}</td>
                </tr>`;
                printAssessmentBody.innerHTML += row;
            });

            // Acionar a impressão
            window.print();
        }

        // Adiciona o event listener para o botão de impressão
        printButton.onclick = populateAndPrintAssessment;
    });
});