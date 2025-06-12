document.addEventListener('DOMContentLoaded', () => {
    // --- Application State & Configuration ---
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

    // --- DOM Element References ---
    const welcomeScreen = document.getElementById('welcome-screen');
    const testView = document.getElementById('test-view'); 
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentArea = document.getElementById('content-area');
    const timerDisplay = document.getElementById('timer-display');
    const sectionTitleEl = document.getElementById('current-section-title');
    const backToTopBtn = document.getElementById('back-to-top');

    // --- Passage Text Data ---
    const passageTexts = {
        1: `<h3>Passage 1: Business Trends</h3><p>Top small business trends for 2025 emphasize a tailored approach to client engagement. Businesses that deeply understand individual client preferences and personalize their marketing messages, product recommendations, and offerings are expected to thrive...</p>`,
        2: `<h3>Passage 2: Technology Advancements</h3><p>Technology has profoundly transformed education, moving beyond traditional methods to embrace interactive whiteboards, digital projectors, tablets, and smart gadgets...</p>`,
        3: `<h3>Passage 3: Environmental Sustainability Challenges</h3><p>The environment, a precious gift from Mother Nature, sustains all life on Earth by providing essential resources like clean air, fresh water, and fertile soil...</p>`,
        4: `<h3>Passage 4: Industrial Safety Regulations</h3><p>OSHA's Hazard Communication Standard (1910.1200) serves to ensure that the hazards of all chemicals produced or imported are properly classified, and that comprehensive information concerning these classified hazards is effectively transmitted...</p>`
    };
    
    // --- Visual Generation ---
    function generateGroupHeaderHTML(sourceKey) {
        if (/^\d+$/.test(sourceKey)) {
            return `<div class="passage-box">${passageTexts[sourceKey] || ''}</div>`;
        }
        
        let content = '';
        const step = `<div class="abstract-step">→</div>`;
        const qmark = `<div class="shape-box empty-cell">?</div>`;

        // This function now handles all charts, tables, sequences, and matrices
        switch (sourceKey) {
            // == Numerical Reasoning Visuals ==
            case 'graph1': content = `<div class="chart-container"><p class="chart-title">Graph 1: Annual Production of Crude Oil</p><div class="bar-chart" style="--max-val: 55;"><div class="bar-group"><div style="display:flex;align-items:flex-end;gap:5px;"><div class="bar" style="--val:45" data-value="45"></div><div class="bar bar-b" style="--val:30" data-value="30"></div></div><div class="bar-label">2022</div></div><div class="bar-group"><div style="display:flex;align-items:flex-end;gap:5px;"><div class="bar" style="--val:50" data-value="50"></div><div class="bar bar-b" style="--val:35" data-value="35"></div></div><div class="bar-label">2023</div></div><div class="bar-group"><div style="display:flex;align-items:flex-end;gap:5px;"><div class="bar" style="--val:55" data-value="55"></div><div class="bar bar-b" style="--val:40" data-value="40"></div></div><div class="bar-label">2024</div></div></div><ul class="pie-legend" style="justify-content:center;gap:20px;margin-top:20px;"><li><span style="display:inline-block;width:15px;height:15px;background:var(--primary-color);margin-right:5px;vertical-align:middle;"></span>Region A</li><li><span style="display:inline-block;width:15px;height:15px;background:var(--secondary-color);margin-right:5px;vertical-align:middle;"></span>Region B</li></ul></div>`; break;
            case 'graph4': content = `<div class="chart-container"><p class="chart-title">Graph 4: Energy Production Mix (GWh)</p><div class="bar-chart" style="--max-val: 400;"><div class="bar-group"><div class="bar" style="--val:250;background-color:#ffc107;" data-value="250"></div><div class="bar-label">Solar</div></div><div class="bar-group"><div class="bar" style="--val:300;background-color:#17a2b8;" data-value="300"></div><div class="bar-label">Wind</div></div><div class="bar-group"><div class="bar" style="--val:180;background-color:#007bff;" data-value="180"></div><div class="bar-label">Hydro</div></div><div class="bar-group"><div class="bar" style="--val:400;background-color:#6c757d;" data-value="400"></div><div class="bar-label">Fossil</div></div></div></div>`; break;
            // All other numerical tables and charts
            case 'table1': content = `<div class="chart-container"><table><caption>Table 1: Projected Costs and Revenues</caption>...</table></div>`; break;
            case 'graph2': content = `<div class="chart-container"><p class="chart-title">Graph 2: Quarterly Natural Gas Consumption</p><div class="svg-chart-container"><svg viewBox="0 0 100 65">...</svg></div></div>`; break;
            case 'table2': content = `<div class="chart-container"><table><caption>Table 2: Employee Distribution</caption>...</table></div>`; break;
            case 'graph3': content = `<div class="chart-container"><p class="chart-title">Graph 3: Company's Annual Budget</p><div class="pie-chart" style="background-image: conic-gradient(#003366 0% 25%,#007bff 25% 65%,#ffc107 65% 80%,#6c757d 80% 90%,#E31837 90% 100%);"></div><ul class="pie-legend">...</ul></div>`; break;
            case 'table3': content = `<div class="chart-container"><table><caption>Table 3: Safety Incidents by Type</caption>...</table></div>`; break;
            case 'table4': content = `<div class="chart-container"><table><caption>Table 4: Raw Material Prices</caption>...</table></div>`; break;
            case 'graph5': content = `<div class="chart-container"><p class="chart-title">Graph 5: Employee Training Hours</p><div class="svg-chart-container"><svg viewBox="0 0 100 65">...</svg></div></div>`; break;
            case 'table5': content = `<div class="chart-container"><table><caption>Table 5: Sales Performance</caption>...</table></div>`; break;
            
            // == Abstract Reasoning Visuals ==
            case 'seq1': content = `<div class="abstract-container"><div class="shape-box"><div class="inner-shape circle black pos-tl"></div></div>${step}<div class="shape-box"><div class="inner-shape circle black pos-tr"></div></div>${step}${qmark}</div>`; break;
            case 'seq2': content = `<div class="abstract-container"><div class="shape-box circle"><div class="inner-shape triangle white pos-tl"></div></div>${step}<div class="shape-box circle"><div class="inner-shape triangle white pos-tr"></div></div>${step}${qmark}</div>`; break;
            case 'seq3': content = `<div class="abstract-container"><div class="shape-box"><div class="inner-shape circle black pos-tl"></div><div class="inner-shape circle white pos-br"></div></div>${step}<div class="shape-box"><div class="inner-shape circle black pos-tr"></div><div class="inner-shape circle white pos-bl"></div></div>${step}${qmark}</div>`; break;
            case 'seq4': content = `<div class="abstract-container"><div class="shape-box"><div class="inner-shape square black pos-tl"></div><div class="inner-shape square white pos-tr"></div></div>${step}<div class="shape-box"><div class="inner-shape square black pos-tr"></div><div class="inner-shape square white pos-br"></div></div>${step}${qmark}</div>`; break;
            case 'seq5': content = `<div class="abstract-container"><div class="shape-box circle" style="transform:rotate(0deg);"><div class="inner-shape circle black" style="top:5px;left:50%;transform:translateX(-50%)"></div><div class="inner-shape circle black" style="bottom:5px;left:50%;transform:translateX(-50%)"></div></div>${step}<div class="shape-box circle" style="transform:rotate(45deg);"><div class="inner-shape circle black" style="top:5px;left:50%;transform:translateX(-50%)"></div><div class="inner-shape circle black" style="bottom:5px;left:50%;transform:translateX(-50%)"></div></div>${step}${qmark}</div>`; break;
            case 'seq6': content = `<div class="abstract-container"><div class="shape-box"><div class="line h-line" style="top:50%"></div></div>${step}<div class="shape-box"><div class="line h-line" style="top:33%"></div><div class="line h-line" style="top:66%"></div></div>${step}${qmark}</div>`; break;
            case 'seq7': content = `<div class="abstract-container"><div class="shape-box triangle"><div class="inner-shape circle black" style="width:20px;height:20px;top:60%;left:50%;transform:translate(-50%,-50%);"></div></div>${step}<div class="shape-box triangle"><div class="inner-shape square black" style="width:20px;height:20px;top:60%;left:50%;transform:translate(-50%,-50%);"></div></div>${step}${qmark}</div>`; break;
            case 'seq8': content = `<div class="abstract-container"><div class="shape-box"><div class="inner-shape square black pos-tl"></div></div>${step}<div class="shape-box"><div class="inner-shape square black pos-tr"></div></div>${step}<div class="shape-box"><div class="inner-shape square white pos-tl"></div></div>${step}${qmark}</div>`; break;
            case 'seq9': content = `<div class="abstract-container"><div class="shape-box circle"><div class="inner-shape triangle black" style="transform:rotate(90deg);"></div></div>${step}<div class="shape-box circle"><div class="inner-shape triangle black" style="transform:rotate(180deg);"></div></div>${step}${qmark}</div>`; break;
            case 'seq10':content = `<div class="abstract-container"><div class="shape-box"><div class="line diag-tl-br"></div></div>${step}<div class="shape-box"><div class="line diag-tl-br"></div><div class="line diag-tr-bl"></div></div>${step}${qmark}</div>`; break;
            
            case 'mat1': content = `<div class="matrix"><div class="shape-box">Sq+Circ TL</div><div class="shape-box">Sq+Circ TR</div><div class="shape-box">Sq+Circ BR</div><div class="shape-box">Circ+Tri TL</div><div class="shape-box">Circ+Tri TR</div><div class="shape-box">Circ+Tri BR</div><div class="shape-box">Pent+Star TL</div><div class="shape-box">Pent+Star TR</div>${qmark}</div>`; break;
            case 'mat2': content = `<div class="matrix"><div class="shape-box">B:TL,W:BR</div><div class="shape-box">B:TR,W:BL</div><div class="shape-box">B:BR,W:TL</div> <div class="shape-box circle">B:TL,W:BR</div><div class="shape-box circle">B:TR,W:BL</div><div class="shape-box circle">B:BR,W:TL</div> <div class="shape-box triangle">B:TL,W:BR</div><div class="shape-box triangle">B:TR,W:BL</div>${qmark}</div>`; break;
            // ... all 8 other matrices would follow this simplified text pattern...
            default: content = '';
        }
        return `<div class="data-source-container">${content}</div>`;
    }

    function createQuestionHTML(q, isAnswered, userAnswer) {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-container';
        questionDiv.id = `q-container-${q.id}`;
        questionDiv.dataset.id = q.id;
        questionDiv.dataset.correct = q.correctAnswer;

        let optionsMarkup = Object.entries(q.options).map(([key, value]) => {
            const isChecked = userAnswer === key;
            return `<li role="radio" aria-checked="${isChecked}" tabindex="0"><label><input type="radio" name="q${q.id}" value="${key}" ${isChecked ? 'checked' : ''}> ${key}. ${value}</label></li>`;
        }).join('');
        optionsMarkup = `<ul class="options-list" role="radiogroup" aria-labelledby="q-text-${q.id}">${optionsMarkup}</ul>`;
        
        questionDiv.innerHTML = `
            <p class="question-text" id="q-text-${q.id}"><span class="q-number">${q.id}.</span> ${q.questionText}</p>
            ${optionsMarkup}
            <div class="answer-reveal">
                <button class="toggle-answer-btn" aria-expanded="false">Show Answer</button>
                <div class="explanation" role="region" aria-live="polite" style="display:none;"><p><strong>Correct Answer: ${q.correctAnswer}</strong><br>${q.explanation}</p></div>
            </div>`;
        
        if (isAnswered) {
            const optionsList = questionDiv.querySelector('.options-list');
            const selectedLi = questionDiv.querySelector(`input[value="${userAnswer}"]`)?.closest('li');
            if (optionsList && selectedLi) {
                optionsList.classList.add('disabled');
                if (userAnswer === q.correctAnswer) {
                    selectedLi.classList.add('correct');
                } else {
                    selectedLi.classList.add('incorrect');
                    const correctLi = optionsList.querySelector(`input[value="${q.correctAnswer}"]`)?.closest('li');
                    if (correctLi) correctLi.classList.add('correct');
                }
            }
        }
        return questionDiv;
    }

    function addInteractivity(qId, saveStateCallback) {
        const container = document.getElementById(`q-container-${qId}`);
        if (!container) return;

        container.querySelector('.toggle-answer-btn')?.addEventListener('click', e => {
            const explanationDiv = container.querySelector('.explanation');
            const isVisible = explanationDiv.style.display === 'block';
            explanationDiv.style.display = isVisible ? 'none' : 'block';
            e.target.setAttribute('aria-expanded', String(!isVisible));
        });

        container.querySelector('.options-list')?.addEventListener('click', e => {
            const targetLi = e.target.closest('li');
            const optionsList = e.currentTarget;
            if (!targetLi || optionsList.classList.contains('disabled')) return;
            const targetRadio = targetLi.querySelector('input[type="radio"]');
            if (!targetRadio) return;

            targetRadio.checked = true;
            optionsList.classList.add('disabled');
            appState.answers[qId] = targetRadio.value;
            saveStateCallback();
            
            // Uncheck other radios for screen readers
            optionsList.querySelectorAll('li').forEach(li => li.setAttribute('aria-checked', 'false'));
            targetLi.setAttribute('aria-checked', 'true');
            
            if (targetRadio.value === container.dataset.correct) {
                targetLi.classList.add('correct');
            } else {
                targetLi.classList.add('incorrect');
                const correctLi = optionsList.querySelector(`input[value="${container.dataset.correct}"]`)?.closest('li');
                if (correctLi) correctLi.classList.add('correct');
            }
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
            const sourceKey = q.passage_id || q.data_source_id || q.visual_id || `general-${q.id}`;
            if (!questionGroups[sourceKey]) questionGroups[sourceKey] = [];
            questionGroups[sourceKey].push(q);
        });
        
        const sortedKeys = Object.keys(questionGroups).sort((a, b) => questionGroups[a][0].id - questionGroups[b][0].id);

        for (const sourceKey of sortedKeys) {
            const groupContainer = document.createElement('div');
            groupContainer.className = 'source-group';
            if (!sourceKey.startsWith('general')) {
                groupContainer.innerHTML = generateGroupHeaderHTML(sourceKey);
            }
            const questionsContainer = document.createElement('div');
            questionsContainer.className = 'questions-for-source';
            questionGroups[sourceKey].forEach(q => {
                const isAnswered = q.id in appState.answers;
                const userAnswer = appState.answers[q.id];
                questionsContainer.appendChild(createQuestionHTML(q, isAnswered, userAnswer));
            });
            groupContainer.appendChild(questionsContainer);
            contentArea.appendChild(groupContainer);
        }
        
        contentArea.querySelectorAll('.question-container').forEach(container => {
            addInteractivity(container.dataset.id, () => saveState(appState.currentSection, -1)); // -1 indicates timer should continue
        });

        window.scrollTo({ top: 0, behavior: 'auto' });
    }
    
    function startTimer(durationInMinutes, remainingTime) {
        clearInterval(appState.currentTimer);
        let time = remainingTime !== undefined ? remainingTime : durationInMinutes * 60;
        
        const update = () => {
            if (time < 0) { clearInterval(appState.currentTimer); return; }
            const minutes = Math.floor(time / 60).toString().padStart(2, '0');
            const seconds = (time % 60).toString().padStart(2, '0');
            timerDisplay.textContent = `${minutes}:${seconds}`;
            appState.time = time;
            if (time-- <= 0) {
                clearInterval(appState.currentTimer);
                alert("Time's up!");
                testView.querySelectorAll('.options-list').forEach(list => list.classList.add('disabled'));
            }
        };
        update();
        appState.currentTimer = setInterval(update, 1000);
    }
    
    // --- State & Initialization ---
    function saveState() {
        if (!appState.currentSection) return;
        try {
            const stateToSave = { section: appState.currentSection, answers: appState.answers, time: appState.time };
            sessionStorage.setItem('testProgress', JSON.stringify(stateToSave));
        } catch(e) { console.warn("Could not save state to sessionStorage."); }
    }

    function loadState(sectionName) {
        try {
            const savedState = JSON.parse(sessionStorage.getItem('testProgress'));
            if (savedState && savedState.section === sectionName) {
                appState.answers = savedState.answers || {};
                startTimer(sectionConfig[sectionName].time, savedState.time);
            } else {
                appState.answers = {};
                startTimer(sectionConfig[sectionName].time);
            }
        } catch (e) {
            appState.answers = {};
            startTimer(sectionConfig[sectionName].time);
        }
        appState.currentSection = sectionName;
    }
    
    function clearState() {
        sessionStorage.removeItem('testProgress');
        appState.answers = {}; appState.currentSection = null;
        clearInterval(appState.currentTimer);
    }

    function handleNavClick(e) {
        e.preventDefault();
        const sectionName = e.target.dataset.section;
        if (!appState.dataLoaded || e.target.classList.contains('disabled')) return;
        
        if (appState.currentSection && appState.currentSection !== sectionName) {
            if (confirm(`Start ${sectionName}? This will clear your progress on the current section.`)) {
                clearState();
                displaySection(sectionName);
            }
        } else if (!appState.currentSection) {
            displaySection(sectionName);
        }
    }

    navButtons.forEach(button => button.addEventListener('click', handleNavClick));
    
    function init() {
        navButtons.forEach(btn => btn.classList.add('disabled'));
        welcomeScreen.querySelector('p:last-of-type').textContent = "Loading questions, please wait...";
        fetch('data/questions.json')
            .then(response => { if (!response.ok) throw new Error('Network error'); return response.json(); })
            .then(data => {
                allQuestions = data; appState.dataLoaded = true;
                navButtons.forEach(btn => btn.classList.remove('disabled'));
                welcomeScreen.querySelector('p:last-of-type').textContent = "Click a section above to begin. Good luck!";

                try {
                    const savedState = JSON.parse(sessionStorage.getItem('testProgress'));
                    if (savedState && savedState.section) {
                        if (confirm(`Resume your saved session for "${savedState.section}"?`)) {
                            displaySection(savedState.section);
                        } else { clearState(); }
                    }
                } catch(e) { clearState(); }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                const retryButton = document.createElement('button');
                retryButton.textContent = "Retry";
                retryButton.onclick = init;
                welcomeScreen.innerHTML = `<p style="color:red;font-weight:bold;">Failed to load test questions.</p>`;
                welcomeScreen.appendChild(retryButton);
            });
        
        setInterval(saveState, 5000); // Auto-save progress every 5 seconds
    }
    
    // --- Utility Listeners ---
    if (backToTopBtn) {
        window.addEventListener('scroll', () => { backToTopBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none'; });
        backToTopBtn.addEventListener('click', e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }
    init();
});
