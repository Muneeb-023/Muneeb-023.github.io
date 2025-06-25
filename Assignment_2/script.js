const questionInput = document.getElementById('question');
const addQuestionBtn = document.getElementById('add_question');
const questionsContainer = document.getElementById('questions_container');

addQuestionBtn.addEventListener('click', addQuestion);
questionInput.addEventListener('keydown', keyPress => {
    if (keyPress.key == 'Enter') addQuestion();
});

function addQuestion() {
    const questionText = questionInput.value.trim();
    if (!questionText) return;

    const questionBox = document.createElement('div');
    questionBox.className = 'question_box';

    const questionTitle = document.createElement('h3');
    questionTitle.textContent = `Q: ${questionText}`;

    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'options_container';

    const groupName = `group${Math.random().toString(36).substring(2, 8)}`;

    for (let i = 0; i < 4; i++) {
        const optionArea = document.createElement('div');
        optionArea.className = 'option_area';

        const optionInput = document.createElement('input');
        optionInput.type = 'text';
        optionInput.placeholder = `Option ${i + 1}`;

        const finalizeBtn = document.createElement('button');
        const img = document.createElement('img');
        img.src = 'vector.png';
        img.alt = 'Finalize';
        // img.style.width = '16px';
        // img.style.height = '16px';
        finalizeBtn.appendChild(img);
        finalizeBtn.onclick = () => finalizeOption(optionArea, optionInput.value, groupName);
        finalizeBtn.style.backgroundColor = '#c2d500';

        optionArea.appendChild(optionInput);
        optionArea.appendChild(finalizeBtn);
        optionsContainer.appendChild(optionArea);
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete_btn';
    deleteBtn.textContent = '🗑️ Delete';
    deleteBtn.onclick = () => questionBox.remove();
    deleteBtn.style.alignItems = 'right';

    questionBox.appendChild(questionTitle);
    questionBox.appendChild(optionsContainer);
    questionBox.appendChild(deleteBtn);

    questionsContainer.appendChild(questionBox);
    questionInput.value = '';
}

function finalizeOption(optionArea, text, groupName) {
    if (!text.trim()) return;
    optionArea.innerHTML = '';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = groupName;

    const label = document.createElement('label');
    label.textContent = text;

    optionArea.className = 'final-option';
    optionArea.appendChild(radio);
    optionArea.appendChild(label);
}
