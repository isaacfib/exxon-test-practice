document.addEventListener('DOMContentLoaded', () => {
    let allQuestions = [];
    let appState = {
        dataLoaded: false,
        currentSection: null,
        currentTimer: null,
        answers: {}
    };
    const sectionConfig = {
        'Verbal Reasoning': { time: 20 },
        'Numerical Reasoning': { time: 60 },
        'Abstract Reasoning': { time: 30 }
    };

    const welcomeScreen = document.getElementById('welcome-screen');
    const testView = document.getElementById('test-view'); 
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentArea = document.getElementById('content-area');
    const timerDisplay = document.getElementById('timer-display');
    const sectionTitleEl = document.getElementById('current-section-title');
    const backToTopBtn = document.getElementById('back-to-top');

    function buildElement(tag, options = {}) {
        const el = document.createElement(tag);
        if (options.className) el.className = options.className;
        if (options.innerHTML) el.innerHTML = options.innerHTML;
        if (options.textContent) el.textContent = options.textContent;
        if (options.attributes) {
            for (const key in options.attributes) {
                el.setAttribute(key, options.attributes[key]);
            }
        }
        if (options.style) {
            Object.assign(el.style, options.style);
        }
        return el;
    }
    
    function generateDataSourceHTML(sourceKey) {
        let container = buildElement('div', {className: 'chart-container'});
        let chartTitle = buildElement('p', {className: 'chart-title'});
        let content;
    
        switch(sourceKey) {
            case 'graph1':
                chartTitle.textContent = 'Graph 1: Annual Production of Crude Oil (Million Barrels) by Region, 2022-2024';
                content = buildElement('div', {className: 'bar-chart', style: {'--max-val': 55}});
                content.innerHTML = `<div class="bar-group"><div style="display: flex; gap: 5px; align-items: flex-end;"><div class="bar" style="--val: 45;" data-value="45"></div><div class="bar bar-b" style="--val: 30;" data-value="30"></div></div><div class="bar-label">2022</div></div><div class="bar-group"><div style="display: flex; gap: 5px; align-items: flex-end;"><div class="bar" style="--val: 50;" data-value="50"></div><div class="bar bar-b" style="--val: 35;" data-value="35"></div></div><div class="bar-label">2023</div></div><div class="bar-group"><div style="display: flex; gap: 5px; align-items: flex-end;"><div class="bar" style="--val: 55;" data-value="55"></div><div class="bar bar-b" style="--val: 40;" data-value="40"></div></div><div class="bar-label">2024</div></div>`;
                let legend1 = buildElement('ul', {className: 'pie-legend', style: {justifyContent:'center', gap: '20px', marginTop: '20px'}});
                legend1.innerHTML = `<li><span style="display:inline-block; width:15px; height:15px; background:var(--primary-color); margin-right:5px; vertical-align:middle;"></span>Region A</li><li><span style="display:inline-block; width:15px; height:15px; background:var(--secondary-color); margin-right:5px; vertical-align:middle;"></span>Region B</li>`;
                container.append(chartTitle, content, legend1);
                break;
            case 'table1':
                 content = buildElement('table');
                 content.innerHTML = `<caption>Table 1: Projected Costs and Revenues for a New Plant (in Million USD)</caption><thead><tr><th>Category</th><th>Year 1</th><th>Year 2</th><th>Year 3</th></tr></thead><tbody><tr><td>Initial Investment</td><td>120</td><td>-</td><td>-</td></tr><tr><td>Operating Costs</td><td>30</td><td>32</td><td>35</td></tr><tr><td>Revenue</td><td>60</td><td>75</td><td>90</td></tr></tbody>`;
                 container.appendChild(content);
                 break;
            default:
                 return null;
        }
        return container;
    }


    function generateGroupHeader(sourceKey) {
        if (!sourceKey || sourceKey.startsWith('general')) return null;

        const el = buildElement('div', { className: 'source-group' });
        let visualContainer;

        if (typeof sourceKey === 'number') {
            visualContainer = buildElement('div', {className: 'passage-box'});
            const data = visualsData.passages[sourceKey];
            if(data) {
                visualContainer.innerHTML = `<h3>${data.title}</h3><p>${data.content}</p>`;
            }
        } else {
             visualContainer = generateDataSourceHTML(sourceKey) || buildElement('div', {className: 'abstract-visual-container', textContent: `Visual for ${sourceKey}`});
        }
        
        el.appendChild(visualContainer);
        return el;
    }
    
    function createQuestionHTML(q, isAnswered, userAnswer) {
        const questionContainer = buildElement('div', { className: 'question-container', id: `q-container-${q.id}` });
        questionContainer.dataset.id = q.id;
        questionContainer.dataset.correct = q.correctAnswer;
        
        const qText = buildElement('p', { className: 'question-text', id: `q-text-${q.id}` });
        const qNumber = buildElement('span', { className: 'q-number', textContent: `${q.id}. ` });
        qText.appendChild(qNumber);
        qText.append(q.questionText);

        const optionsList = buildElement('ul', { className: 'options-list', attributes: {'role': 'radiogroup'} });
        
        for(const [key, value] of Object.entries(q.options)){
            const li = buildElement('li');
            const label = buildElement('label');
            const radio = buildElement('input', { attributes: { type: 'radio', name: `q${q.id}`, value: key } });
            if (userAnswer === key) radio.checked = true;
            label.append(radio, ` ${key}. ${value}`);
            li.appendChild(label);
            optionsList.appendChild(li);
        }

        const answerReveal = buildElement('div', { className: 'answer-reveal' });
        const toggleBtn = buildElement('button', { className: 'toggle-answer-btn', textContent: 'Show Answer' });
        const explanation = buildElement('div', { className: 'explanation', style: { display: 'none' } });
        explanation.innerHTML = `<p><strong>Correct Answer: ${q.correctAnswer}</strong><br>${q.explanation}</p>`;
        answerReveal.append(toggleBtn, explanation);

        questionContainer.append(qText, optionsList, answerReveal);

        if (isAnswered) {
             optionsList.classList.add('disabled');
             optionsList.querySelectorAll('li').forEach(li => {
                const radio = li.querySelector('input');
                radio.disabled = true;
                if (radio.value === userAnswer) {
                    li.classList.add(userAnswer === q.correctAnswer ? 'correct' : 'incorrect');
                } else if (radio.value === q.correctAnswer) {
                    li.classList.add('correct');
                }
             });
        }
        
        return questionContainer;
    }
    
    function addInteractivity(qId, saveStateCallback) {
        const container = document.getElementById(`q-container-${qId}`);
        if (!container) return;

        container.querySelector('.toggle-answer-btn').addEventListener('click', (e) => {
            const explanationDiv = container.querySelector('.explanation');
            const isVisible = explanationDiv.style.display === 'block';
            explanationDiv.style.display = isVisible ? 'none' : 'block';
            e.target.setAttribute('aria-expanded', !isVisible);
        });
        
        const optionsList = container.querySelector('.options-list');
        optionsList.addEventListener('click', (e) => {
            const li = e.target.closest('li');
            if (!li || optionsList.classList.contains('disabled')) return;
            const radio = li.querySelector('input[type="radio"]');
            if (!radio) return;
            
            radio.checked = true;
            optionsList.classList.add('disabled');
            appState.answers[qId] = radio.value;
            saveStateCallback();

            if (radio.value !== container.dataset.correct) {
                li.classList.add('incorrect');
            }
            const correctLi = optionsList.querySelector(`input[value="${container.dataset.correct}"]`)?.closest('li');
            if(correctLi) correctLi.classList.add('correct');
        });
    }

    function displaySection(sectionName) {
        welcomeScreen.classList.add('hidden');
        testView.classList.remove('hidden');
        navButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.section === sectionName));
        contentArea.innerHTML = '';
        sectionTitleEl.textContent = sectionName;

        loadState(sectionName);

        const sectionQuestions = allQuestions.filter(q => q.section === sectionName);
        const questionGroups = {};
        
        sectionQuestions.forEach(q => {
            const sourceKey = q.passage_id || q.data_source_id || q.visual_id || `general_${q.id}`;
            if (!questionGroups[sourceKey]) {
                questionGroups[sourceKey] = [];
            }
            questionGroups[sourceKey].push(q);
        });

        for (const sourceKey in questionGroups) {
            const groupContainer = buildElement('div', { className: 'source-group' });
            
            const headerElement = generateGroupHeader(sourceKey);
            if(headerElement){
                groupContainer.appendChild(headerElement);
            }
            
            const questions = questionGroups[sourceKey];
            questions.forEach(q => {
                const isAnswered = q.id in appState.answers;
                const userAnswer = appState.answers[q.id];
                const questionElement = createQuestionHTML(q, isAnswered, userAnswer);
                groupContainer.appendChild(questionElement);
            });
            contentArea.appendChild(groupContainer);
        }

        allQuestions.filter(q => q.section === sectionName).forEach(q => addInteractivity(q.id, () => saveState(sectionName)));
        window.scrollTo({ top: 0, behavior: 'auto' });
    }
    
    function startTimer(durationInMinutes, remainingTime) {
        clearInterval(appState.currentTimer);
        let time = remainingTime !== undefined ? remainingTime : durationInMinutes * 60;
        
        function update() {
            if (time < 0) {
                clearInterval(appState.currentTimer);
                return;
            }
            const minutes = String(Math.floor(time / 60)).padStart(2, '0');
            const seconds = String(time % 60).padStart(2, '0');
            timerDisplay.textContent = `${minutes}:${seconds}`;
            
            if (time > 0 && time % 5 === 0) {
                saveState(appState.currentSection);
            }
            
            if (time-- <= 0) {
                clearInterval(appState.currentTimer);
                alert("Time's up for this section!");
                contentArea.querySelectorAll('input[type="radio"]').forEach(radio => radio.disabled = true);
                contentArea.querySelectorAll('.options-list').forEach(list => list.classList.add('disabled'));
            }
        };

        update();
        appState.currentTimer = setInterval(update, 1000);
    }
    
    function saveState(sectionName) {
        let currentTime = 0;
        const timeParts = timerDisplay.textContent.split(':');
        if (timeParts.length === 2) {
            currentTime = parseInt(timeParts[0], 10) * 60 + parseInt(timeParts[1], 10);
        }
        const stateToSave = {
            section: sectionName,
            answers: appState.answers,
            time: currentTime
        };
        sessionStorage.setItem('aptitudeTestProgress', JSON.stringify(stateToSave));
    }

    function loadState(sectionName) {
        let savedState = null;
        try {
            savedState = JSON.parse(sessionStorage.getItem('aptitudeTestProgress'));
        } catch(e) {}

        if (savedState && savedState.section === sectionName) {
            appState.answers = savedState.answers || {};
            startTimer(sectionConfig[sectionName].time, savedState.time);
        } else {
            appState.answers = {};
            startTimer(sectionConfig[sectionName].time);
        }
        appState.currentSection = sectionName;
    }
    
    function handleNavClick(e) {
        e.preventDefault();
        const sectionName = e.target.dataset.section;
        if (!appState.dataLoaded || !sectionName) return;
        
        if (appState.currentSection && appState.currentSection !== sectionName) {
            if (confirm(`Are you sure you want to start the '${sectionName}' section? Your progress in the current section will be cleared.`)) {
                sessionStorage.removeItem('aptitudeTestProgress');
                displaySection(sectionName);
            }
        } else if (!appState.currentSection) {
            displaySection(sectionName);
        }
    }
    
    function init() {
        navButtons.forEach(btn => {
            btn.disabled = true;
            btn.addEventListener('click', handleNavClick)
        });
        
        fetch('data/questions.json')
            .then(response => { 
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); 
            })
            .then(data => {
                allQuestions = data;
                appState.dataLoaded = true;
                navButtons.forEach(btn => btn.disabled = false);
                welcomeScreen.querySelector('p:last-of-type').textContent = "Click a section above to begin. Good luck!";

                let savedState = null;
                try {
                     savedState = JSON.parse(sessionStorage.getItem('aptitudeTestProgress'));
                } catch(e){}

                if (savedState && savedState.section) {
                    if (confirm(`You have a saved session for "${savedState.section}". Would you like to resume?`)) {
                        displaySection(savedState.section);
                    } else {
                        sessionStorage.removeItem('aptitudeTestProgress');
                    }
                }
            })
            .catch(error => {
                console.error('Failed to load or parse question data:', error);
                const errorEl = welcomeScreen.querySelector('p:last-of-type');
                if (errorEl) {
                    errorEl.style.color = 'red';
                    errorEl.innerHTML = `Failed to load test questions. Please check the data file format and your connection, then <a href="#" onclick="location.reload()">retry</a>.`;
                }
            });
    }

    if(backToTopBtn) {
        window.addEventListener('scroll', () => { 
            backToTopBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none'; 
        });
        backToTopBtn.addEventListener('click', (e) => { 
            e.preventDefault(); 
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
        });
    }
    
    init();
});
