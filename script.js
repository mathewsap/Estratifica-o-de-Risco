document.addEventListener('DOMContentLoaded', () => {
    const riskAssessmentForm = document.getElementById('risk-assessment-form');
    const calculateRiskBtn = document.getElementById('calculate-risk-btn');
    const riskResultDiv = document.getElementById('risk-result');
    const totalScoreSpan = document.getElementById('total-score');
    const riskLevelSpan = document.getElementById('risk-level');
    const gaugePointer = document.getElementById('gauge-pointer');

    const questions = [
        { name: 'q1_1', weight: 4 }, { name: 'q1_2', weight: 2 }, { name: 'q1_3', weight: 2 },
        { name: 'q1_4', weight: 2 }, { name: 'q1_5', weight: 2 }, { name: 'q1_6', weight: 2 },
        { name: 'q1_7', weight: 2 }, { name: 'q1_8', weight: 2 }, { name: 'q1_9', weight: 4 },
        { name: 'q1_10', weight: 4 }, { name: 'q1_11', weight: 2 }, { name: 'q1_12', weight: 2 },

        { name: 'q2_1', weight: 4 }, { name: 'q2_2', weight: 10 }, { name: 'q2_3', weight: 4 },
        { name: 'q2_4', weight: 6 }, { name: 'q2_5', weight: 8 }, { name: 'q2_6', weight: 4 },
        { name: 'q2_7', weight: 4 }, { name: 'q2_8', weight: 4 }, { name: 'q2_9', weight: 8 },
        { name: 'q2_10', weight: 8 }, { name: 'q2_11', weight: 6 }, { name: 'q2_12', weight: 8 },
        { name: 'q2_13', weight: 2 },

        { name: 'q3_1', weight: 10 }, { name: 'q3_2', weight: 8 }, { name: 'q3_3', weight: 8 },
        { name: 'q3_4', weight: 8 }, { name: 'q3_5', weight: 6 }, { name: 'q3_6', weight: 8 },

        { name: 'q4_1', weight: 4 }, { name: 'q4_2', weight: 4 }, { name: 'q4_3', weight: 4 },
        { name: 'q4_4', weight: 4 }, { name: 'q4_5', weight: 8 }, { name: 'q4_6', weight: 2 },
        { name: 'q4_7', weight: 6 }, { name: 'q4_8', weight: 4 },

        { name: 'q5_1', weight: 4 }, { name: 'q5_2', weight: 4 }, { name: 'q5_3', weight: 4 },
        { name: 'q5_4', weight: 4 }, { name: 'q5_5', weight: 2 }, { name: 'q5_6', weight: 6 },
        { name: 'q5_7', weight: 6 }, { name: 'q5_8', weight: 4 }, { name: 'q5_9', weight: 2 },
        { name: 'q5_10', weight: 2 }, { name: 'q5_11', weight: 4 }, { name: 'q5_12', weight: 6 },
        { name: 'q5_13', weight: 2 }
    ];

    calculateRiskBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        let totalScore = 0;
        let allQuestionsAnswered = true;

        questions.forEach(q => {
            const selectedOption = document.querySelector(`input[name="${q.name}"]:checked`);
            if (selectedOption) {
                totalScore += parseInt(selectedOption.value);
            } else {
                allQuestionsAnswered = false;
                // Opcional: Adicionar um aviso visual para as perguntas não respondidas
                // Por exemplo, adicionar uma classe a uma linha da tabela
                const questionRow = document.querySelector(`input[name="${q.name}"]`).closest('tr');
                if (questionRow) {
                    questionRow.style.backgroundColor = '#ffe6e6'; // Cor de fundo para indicar erro
                }
            }
        });

        if (!allQuestionsAnswered) {
            alert('Por favor, responda todas as perguntas antes de calcular o risco.');
            riskResultDiv.style.display = 'none';
            return;
        }

        // Resetar cores de fundo se todas as perguntas foram respondidas
        document.querySelectorAll('#risk-assessment-form tr').forEach(row => {
            row.style.backgroundColor = '';
        });

        totalScoreSpan.textContent = totalScore;
        let riskLevelText = '';
        let riskColor = '';
        let rotationDegrees = 0; // 0 to 180 degrees for a semi-circle

        const maxScore = 240;
        rotationDegrees = (totalScore / maxScore) * 180;

        if (totalScore >= 0 && totalScore <= 40) {
            riskLevelText = 'BAIXO RISCO';
            riskColor = 'yellow';
            rotationDegrees = (totalScore / 40) * 60; // 0 to 60 degrees for yellow (0-40 points)
        } else if (totalScore >= 41 && totalScore <= 70) {
            riskLevelText = 'MÉDIO RISCO';
            riskColor = 'orange';
            // Scale 41-70 to 60-120 degrees
            rotationDegrees = 60 + ((totalScore - 40) / 30) * 60;
        } else if (totalScore >= 71 && totalScore <= 240) {
            riskLevelText = 'ALTO RISCO';
            riskColor = 'red';
            // Scale 71-240 to 120-180 degrees
            rotationDegrees = 120 + ((totalScore - 70) / 170) * 60;
        } else {
            riskLevelText = 'Pontuação Inválida';
            riskColor = 'gray';
            rotationDegrees = 0; // Default to 0 if out of expected range
        }

        riskLevelSpan.textContent = riskLevelText;
        riskLevelSpan.style.backgroundColor = riskColor; // Para a cor de fundo do texto do risco

        // Ajusta a cor do texto para melhor contraste
        if (riskColor === 'yellow' || riskColor === 'orange') {
            riskLevelSpan.style.color = '#333';
        } else {
            riskLevelSpan.style.color = 'white';
        }

       /* gaugePointer.style.transform = `translateX(-50%) rotate(${rotationDegrees - 90}deg)`; */ // -90deg para alinhar a 0 com a esquerda do semicírculo
        /*const invertedRotationDegrees = (180 - rotationDegrees); // Inverte a faixa 0-180 para 180-0
        const pointerRotation = invertedRotationDegrees - 90;*/

        const pointerRotation = rotationDegrees - 90;
        gaugePointer.style.transform = `translateX(-50%) rotate(${pointerRotation}deg)`;

       

        riskResultDiv.style.display = 'block';
        riskResultDiv.scrollIntoView({ behavior: 'smooth' }); // Rola para a seção de resultados
    });
});