document.addEventListener('DOMContentLoaded', () => {
    // --- Application State & Configuration ---
    let allQuestions = [];
    let appState = {
        dataLoaded: false,
        currentSection: null,
        currentTimer: null,
        answers: {} // { qId: 'A' }
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
    
    // --- Visuals Library for Abstract Reasoning ---
    const visualsLib = {
        grids: {
            matrix_1: () => `
                <div class="matrix-cell"><div class="shape-box"><div class="inner-shape circle black pos-tl"></div></div></div>
                <div class="matrix-cell"><div class="shape-box"><div class="inner-shape circle black pos-tr"></div></div></div>
                <div class="matrix-cell"><div class="shape-box"><div class="inner-shape circle black pos-br"></div></div></div>
                <div class="matrix-cell"><div class="shape-box circle"><div class="inner-shape triangle white pos-tl"></div></div></div>
                <div class="matrix-cell"><div class="shape-box circle"><div class="inner-shape triangle white pos-tr"></div></div></div>
                <div class="matrix-cell"><div class="shape-box circle"><div class="inner-shape triangle white pos-br"></div></div></div>
                <div class="matrix-cell"><div class="shape-box pentagon"><div style="font-size:1.5em; place-self:center;">★</div></div></div>
                <div class="matrix-cell"><div class="shape-box pentagon"><div style="font-size:1.5em; place-self:center;" class="pos-tr">★</div></div></div>
            `,
            matrix_2: () => `
                <div class="matrix-cell"><div class="shape-box"><div class="inner-shape circle black pos-tl"></div><div class="inner-shape circle white pos-br"></div></div></div>
                <div class="matrix-cell"><div class="shape-box"><div class="inner-shape circle black pos-tr"></div><div class="inner-shape circle white pos-bl"></div></div></div>
                <div class="matrix-cell"><div class="shape-box"><div class="inner-shape circle black pos-br"></div><div class="inner-shape circle white pos-tl"></div></div></div>
                <div class="matrix-cell"><div class="shape-box circle"><div class="inner-shape circle black pos-tl"></div><div class="inner-shape circle white pos-br"></div></div></div>
                <div class="matrix-cell"><div class="shape-box circle"><div class="inner-shape circle black pos-tr"></div><div class="inner-shape circle white pos-bl"></div></div></div>
                <div class="matrix-cell"><div class="shape-box circle"><div class="inner-shape circle black pos-br"></div><div class="inner-shape circle white pos-tl"></div></div></div>
                <div class="matrix-cell"><div class="shape-box triangle" style="border:none;"><div class="inner-shape circle black pos-tl"></div><div class="inner-shape circle white pos-br"></div></div></div>
                <div class="matrix-cell"><div class="shape-box triangle" style="border:none;"><div class="inner-shape circle black pos-tr"></div><div class="inner-shape circle white pos-bl"></div></div></div>
            `,
            matrix_3: () => `
                <div class="matrix-cell"><div class="shape-box"><div class="line h-line"></div></div></div>
                <div class="matrix-cell"><div class="shape-box"><div class="line h-line" style="top:33%"></div><div class="line h-line" style="top:66%"></div></div></div>
                <div class="matrix-cell"><div class="shape-box"><div class="line h-line" style="top:25%"></div><div class="line h-line" style="top:50%"></div><div class="line h-line" style="top:75%"></div></div></div>
                <div class="matrix-cell"><div class="shape-box circle"><div class="line v-line"></div></div></div>
                <div class="matrix-cell"><div class="shape-box circle"><div class="line v-line" style="left:33%"></div><div class="line v-line" style="left:66%"></div></div></div>
                <div class="matrix-cell"><div class="shape-box circle"><div class="line v-line" style="left:25%"></div><div class="line v-line" style="left:50%"></div><div class="line v-line" style="left:75%"></div></div></div>
                <div class="matrix-cell"><div class="shape-box triangle" style="border:none; border-bottom:78px solid #333;"><div class="line" style="width:141%; height:2px; background:black; top:50%; left:-21%; transform: rotate(60deg);"></div></div></div>
                <div class="matrix-cell"><div class="shape-box triangle" style="border:none; border-bottom:78px solid #333;"><div class="line" style="width:141%; height:2px; background:black; top:50%; left:-21%; transform: rotate(60deg);"></div><div class="line" style="width:141%; height:2px; background:black; top:50%; left:-21%; transform: rotate(-60deg);"></div></div></div>
            `,
            matrix_4: () => `
                <div class="matrix-cell"><div class="shape-box pentagon"></div></div>
                <div class="matrix-cell"><div class="shape-box pentagon" style="background:white; border:2px solid black"></div></div>
                <div class="matrix-cell"><div class="shape-box pentagon"></div></div>
                <div class="matrix-cell"><div class="shape-box hexagon" style="background:white; border:2px solid black"></div></div>
                <div class="matrix-cell"><div class="shape-box hexagon"></div></div>
                <div class="matrix-cell"><div class="shape-box hexagon" style="background:white; border:2px solid black"></div></div>
                <div class="matrix-cell"><div class="shape-box heptagon"></div></div>
                <div class="matrix-cell"><div class="shape-box heptagon" style="background:white; border:2px solid black"></div></div>
            `,
            matrix_5: () => `
                <div class="matrix-cell"><div class="shape-box" style="display:flex; justify-content:space-around; align-items:center; border:none;"><div class="inner-shape circle black"></div><div class="inner-shape circle black"></div><div class="inner-shape circle black"></div><div class="inner-shape circle black"></div></div></div>
                <div class="matrix-cell"><div class="shape-box" style="display:flex; justify-content:space-around; align-items:center; border:none;"><div class="inner-shape circle black"></div><div class="inner-shape circle black"></div><div class="inner-shape circle black"></div></div></div>
                <div class="matrix-cell"><div class="shape-box" style="display:flex; justify-content:space-around; align-items:center; border:none;"><div class="inner-shape circle black"></div><div class="inner-shape circle black"></div></div></div>
                <div class="matrix-cell"><div class="shape-box circle" style="display:flex; justify-content:space-around; align-items:center; flex-wrap:wrap; padding:5px; border:2px solid #333"><div class="inner-shape circle black"></div><div class="inner-shape circle black"></div><div class="inner-shape circle black"></div><div class="inner-shape circle black"></div><div class="inner-shape circle black"></div></div></div>
                <div class="matrix-cell"><div class="shape-box circle" style="display:flex; justify-content:space-around; align-items:center; border:2px solid #333"><div class="inner-shape circle black"></div><div class="inner-shape circle black"></div><div class="inner-shape circle black"></div><div class="inner-shape circle black"></div></div></div>
                <div class="matrix-cell"><div class="shape-box circle" style="display:flex; justify-content:space-around; align-items:center; border:2px solid #333"><div class="inner-shape circle black"></div><div class="inner-shape circle black"></div><div class="inner-shape circle black"></div></div></div>
                <div class="matrix-cell"><div class="shape-box triangle" style="border:none; border-bottom:78px solid #333; display:flex; justify-content:center; align-items:center; flex-wrap:wrap; padding-bottom:10px;"><div class="inner-shape circle black"></div><div class="inner-shape circle black"></div><div class="inner-shape circle black"></div><div class="inner-shape circle black"></div><div class="inner-shape circle black"></div><div class="inner-shape circle black"></div></div></div>
                <div class="matrix-cell"><div class="shape-box triangle" style="border:none; border-bottom:78px solid #333; display:flex; justify-content:center; align-items:center; flex-wrap:wrap; padding-bottom:10px;"><div class="inner-shape circle black"></div><div class="inner-shape circle black"></div><div class="inner-shape circle black"></div><div class="inner-shape circle black"></div><div class="inner-shape circle black"></div></div></div>
            `
        },
        options: {
            // Options for Q121 (Matrix 1)
            121: {
                "A": `<div class="shape-box pentagon"><div style="font-size:1.5em; place-self:center;" class="pos-br">★</div></div>`, // Correct
                "B": `<div class="shape-box pentagon"><div style="font-size:1.5em; place-self:center;" class="pos-bl">★</div></div>`, // Wrong position
                "C": `<div class="shape-box circle"><div style="font-size:1.5em; place-self:center;" class="pos-br">★</div></div>`,   // Wrong shape
                "D": `<div class="shape-box pentagon"><div class="inner-shape circle black pos-br"></div></div>`,               // Wrong inner element
                "E": `<div class="shape-box pentagon" style="background:white; border:2px solid black"><div style="font-size:1.5em; place-self:center;" class="pos-br">★</div></div>`,// Wrong color
                "F": `<div class="shape-box pentagon"><div style="font-size:1.5em; place-self:center;" class="pos-tr">★</div></div>`, // Previous position
            },
             124: { // Options for Q124 (Matrix 2)
                "A": `<div class="shape-box triangle" style="border:none;"><div class="inner-shape circle black pos-br"></div><div class="inner-shape circle white pos-tl"></div></div>`, // Correct
                "B": `<div class="shape-box triangle" style="border:none;"><div class="inner-shape circle black pos-tl"></div><div class="inner-shape circle white pos-br"></div></div>`, // First position
                "C": `<div class="shape-box square"><div class="inner-shape circle black pos-br"></div><div class="inner-shape circle white pos-tl"></div></div>`, // Wrong shape
                "D": `<div class="shape-box triangle" style="border:none;"><div class="inner-shape circle white pos-br"></div><div class="inner-shape circle black pos-tl"></div></div>`, // Colors inverted
                "E": `<div class="shape-box triangle" style="border:none;"><div class="inner-shape circle black pos-bl"></div><div class="inner-shape circle white pos-tr"></div></div>`, // Wrong movement
                "F": `<div class="shape-box triangle" style="border:none;"><div class="inner-shape square black pos-br"></div><div class="inner-shape square white pos-tl"></div></div>` // Wrong inner shapes
            }
            // Other options sets would be defined here... for brevity I'm stubbing them.
            // When building full app, add all 10 option sets here.
        }
    };
    
    // --- HTML Generation Functions ---
    function generateGroupHeaderHTML(sourceKey) {
        if (/^\d+$/.test(sourceKey)) return `<div class="passage-box"><h3>Passage ${sourceKey}</h3><p>Note: Full passage text would be loaded here from a library.</p></div>`;
        if (sourceKey.startsWith('matrix_')) {
             const gridContent = (visualsLib.grids[sourceKey] && visualsLib.grids[sourceKey]()) || 'Matrix visual not found.';
             return `<div class="abstract-problem-container">
                        <div class="matrix">${gridContent}<div class="matrix-cell empty-cell">?</div></div>
                        <div class="abstract-options-container"></div>
                    </div>`;
        }
        if(sourceKey.startsWith('graph') || sourceKey.startsWith('table')) return `<div class="data-source-container"><p class="chart-title">Data Source ${sourceKey}</p><p>Note: A chart/table would be rendered here.</p></div>`
        
        return ''; // Return nothing for general questions
    }
    
    function createQuestionHTML(q, isAnswered, userAnswer) {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-container';
        questionDiv.id = `q-container-${q.id}`;
        questionDiv.dataset.id = q.id;
        questionDiv.dataset.correct = q.correctAnswer;
        
        let optionsMarkup = '';
        const isVisualAbstract = q.section === 'Abstract Reasoning' && q.options['A'] && q.options['A'].length === 1;

        if (isVisualAbstract) {
            const visualOptions = visualsLib.options[q.id] || {};
            optionsMarkup = Object.entries(q.options).map(([key]) => {
                const isSelected = userAnswer === key;
                return `<li data-option="${key}" class="${isSelected ? 'selected' : ''}">${visualOptions[key] || `Option ${key}`}</li>`;
            }).join('');
            optionsMarkup = `<ul class="options-list abstract-options-grid" role="radiogroup">${optionsMarkup}</ul>`;
        } else {
            optionsMarkup = Object.entries(q.options).map(([key, value]) => {
                const isChecked = userAnswer === key;
                return `<li><label><input type="radio" name="q${q.id}" value="${key}" ${isChecked ? 'checked' : ''} disabled> ${key}. ${value}</label></li>`;
            }).join('');
            optionsMarkup = `<ul class="options-list" role="radiogroup" aria-labelledby="q-text-${q.id}">${optionsMarkup}</ul>`;
        }
        
        questionDiv.innerHTML = `
            <p class="question-text" id="q-text-${q.id}"><span class="q-number">${q.id}.</span> ${q.questionText}</p>
            ${optionsMarkup}
            <div class="answer-reveal">
                <button class="toggle-answer-btn" aria-expanded="false">Show Answer</button>
                <div class="explanation" role="region" style="display:none;"><p><strong>Correct Answer: ${q.correctAnswer}</strong><br>${q.explanation}</p></div>
            </div>`;

        if (isAnswered) {
             const optionsList = questionDiv.querySelector('.options-list');
             optionsList.classList.add('disabled');
             const selectedOption = isVisualAbstract
                ? optionsList.querySelector(`li[data-option="${userAnswer}"]`)
                : questionDiv.querySelector(`input[value="${userAnswer}"]`).closest('li');

             if (userAnswer === q.correctAnswer) {
                 if(selectedOption) selectedOption.classList.add('correct');
             } else {
                 if(selectedOption) selectedOption.classList.add('incorrect');
                 const correctOption = isVisualAbstract 
                    ? optionsList.querySelector(`li[data-option="${q.correctAnswer}"]`)
                    : optionsList.querySelector(`input[value="${q.correctAnswer}"]`)?.closest('li');
                 if (correctOption) correctOption.classList.add('correct');
             }
        }
        
        return questionDiv;
    }

    // --- Interactivity & Event Handling ---
    function addInteractivity(qId, saveStateCallback) {
        const container = document.getElementById(`q-container-${qId}`);
        if (!container) return;

        // For "Show Answer" button
        const toggleBtn = container.querySelector('.toggle-answer-btn');
        const explanationDiv = container.querySelector('.explanation');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const isVisible = explanationDiv.style.display === 'block';
                explanationDiv.style.display = isVisible ? 'none' : 'block';
                toggleBtn.setAttribute('aria-expanded', !isVisible);
                if (!isVisible) {
                    explanationDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            });
        }
        
        const optionsList = container.querySelector('.options-list');
        if (!optionsList) return;

        // Function to handle answer selection
        const handleSelection = (selectedValue) => {
             if (optionsList.classList.contains('disabled')) return;
             optionsList.classList.add('disabled');

             appState.answers[qId] = selectedValue;
             saveStateCallback();

             const correctAnsw = container.dataset.correct;
             const isCorrect = selectedValue === correctAnsw;
             const selectedLi = optionsList.querySelector(`[data-option="${selectedValue}"]`) || container.querySelector(`input[value="${selectedValue}"]`)?.closest('li');

             if(isCorrect) {
                selectedLi.classList.add('correct');
             } else {
                selectedLi.classList.add('incorrect');
                const correctLi = optionsList.querySelector(`[data-option="${correctAnsw}"]`) || container.querySelector(`input[value="${correctAnsw}"]`)?.closest('li');
                if(correctLi) correctLi.classList.add('correct');
             }
        };

        // Add click listener for all types of lists
        optionsList.addEventListener('click', (e) => {
            const targetLi = e.target.closest('li');
            if (!targetLi) return;
            
            let selectedValue = '';
            if (optionsList.classList.contains('abstract-options-grid')) {
                // For visual abstract questions
                selectedValue = targetLi.dataset.option;
                optionsList.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
                targetLi.classList.add('selected');
            } else {
                // For text-based radio questions
                const radio = targetLi.querySelector('input[type="radio"]');
                if (!radio || radio.disabled) return;
                radio.checked = true;
                selectedValue = radio.value;
            }
            
            if (selectedValue) {
                handleSelection(selectedValue);
            }
        });
    }

    // --- Main Application Flow ---
    function displaySection(sectionName) {
        welcomeScreen.classList.add('hidden');
        testView.classList.remove('hidden');
        navButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.section === sectionName));
        contentArea.innerHTML = ''; // Clear previous content
        sectionTitleEl.textContent = sectionName;

        loadState(sectionName); // Load progress for this section

        const sectionQuestions = allQuestions.filter(q => q.section === sectionName);
        const questionGroups = {};
        sectionQuestions.forEach(q => {
            const sourceKey = q.passage_id || q.data_source_id || q.visual_id || `general-${q.id}`;
            if (!questionGroups[sourceKey]) questionGroups[sourceKey] = [];
            questionGroups[sourceKey].push(q);
        });

        const sortedKeys = Object.keys(questionGroups).sort((a, b) => {
            const idA = questionGroups[a][0].id;
            const idB = questionGroups[b][0].id;
            return idA - idB;
        });

        for (const sourceKey of sortedKeys) {
            const group = questionGroups[sourceKey];
            const groupContainer = document.createElement('div');
            groupContainer.className = 'source-group';

            // Generate header (passage, graph, or matrix visual)
            groupContainer.innerHTML += generateGroupHeaderHTML(sourceKey);

            // Create container for the questions
            let questionsTargetContainer;
            if (sourceKey.startsWith('matrix_')) {
                 // For abstract matrices, put questions in the designated panel
                questionsTargetContainer = groupContainer.querySelector('.abstract-options-container');
            } else {
                // For all others, create a new container
                questionsTargetContainer = document.createElement('div');
                questionsTargetContainer.className = 'questions-for-source';
            }
            
            // Add each question to the target container
            group.forEach(q => {
                const isAnswered = q.id in appState.answers;
                const userAnswer = appState.answers[q.id];
                const questionElement = createQuestionHTML(q, isAnswered, userAnswer);
                questionsTargetContainer.appendChild(questionElement);
            });
            
            if (!sourceKey.startsWith('matrix_')) {
                 groupContainer.appendChild(questionsTargetContainer);
            }

            contentArea.appendChild(groupContainer);
        }

        // Add interactivity to all rendered questions
        sectionQuestions.forEach(q => addInteractivity(q.id, () => saveState(sectionName)));
        
        window.scrollTo({ top: 0, behavior: 'auto' });
    }
    
    // --- Timer ---
    function startTimer(durationInMinutes, remainingTime) {
        clearInterval(appState.currentTimer);
        let time = remainingTime !== undefined ? remainingTime : durationInMinutes * 60;
        
        const update = () => {
            if (time < 0) {
                clearInterval(appState.currentTimer);
                return;
            }
            const minutes = Math.floor(time / 60).toString().padStart(2, '0');
            const seconds = (time % 60).toString().padStart(2, '0');
            timerDisplay.textContent = `${minutes}:${seconds}`;
            
            if (time > 0 && time % 5 === 0) {
                saveState(appState.currentSection, time);
            }
            
            if (time-- <= 0) {
                clearInterval(appState.currentTimer);
                alert("Time's up for this section!");
                // Disable all inputs after time up
                document.querySelectorAll('.options-list').forEach(list => list.classList.add('disabled'));
            }
        };

        update();
        appState.currentTimer = setInterval(update, 1000);
    }
    
    // --- State Management ---
    function saveState(sectionName, time) {
        const stateToSave = {
            section: sectionName,
            answers: appState.answers,
            time: time,
        };
        try {
            sessionStorage.setItem('aptitudeTestProgress', JSON.stringify(stateToSave));
        } catch (e) {
            console.error("Could not save progress to sessionStorage.", e);
        }
    }

    function loadState(sectionName) {
        try {
            const savedStateJSON = sessionStorage.getItem('aptitudeTestProgress');
            if (savedStateJSON) {
                const savedState = JSON.parse(savedStateJSON);
                if (savedState && savedState.section === sectionName) {
                    appState.answers = savedState.answers || {};
                    startTimer(sectionConfig[sectionName].time, savedState.time);
                    return;
                }
            }
        } catch(e) {
            console.error("Could not load progress from sessionStorage.", e);
        }
        // If no valid state, start fresh
        appState.answers = {};
        sessionStorage.removeItem('aptitudeTestProgress');
        startTimer(sectionConfig[sectionName].time);
    }
    
    function clearStateAndRestart(sectionName) {
        sessionStorage.removeItem('aptitudeTestProgress');
        appState.answers = {};
        displaySection(sectionName);
    }

    // --- Initialization & Event Listeners ---
    function handleNavClick(e) {
        e.preventDefault();
        const sectionName = e.target.dataset.section;
        if (!appState.dataLoaded || !sectionName) return;
        
        // If a different section is already active, confirm the switch
        if (appState.currentSection && appState.currentSection !== sectionName) {
            if (confirm(`Are you sure you want to start the '${sectionName}' section? Progress in the current section will not be saved if you switch.`)) {
                clearStateAndRestart(sectionName);
            }
        } else if (!appState.currentSection) {
            // No section active, just start
            displaySection(sectionName);
        }
    }
    navButtons.forEach(button => button.addEventListener('click', handleNavClick));
    
    function init() {
        // Initially disable nav until data is loaded
        navButtons.forEach(btn => btn.disabled = true);
        
        // Load question data
        fetch('data/questions.json')
            .then(response => { if (!response.ok) throw new Error('Network response was not ok'); return response.json(); })
            .then(data => {
                allQuestions = data;
                appState.dataLoaded = true;
                navButtons.forEach(btn => { btn.disabled = false; }); // Enable nav
                welcomeScreen.querySelector('p:last-of-type').textContent = "Data loaded successfully. Please select a section above to begin. Good luck!";

                // Check for a saved session on page load
                const savedState = JSON.parse(sessionStorage.getItem('aptitudeTestProgress') || 'null');
                if (savedState && savedState.section && sectionConfig[savedState.section]) {
                    if (confirm(`You have a saved session for "${savedState.section}". Would you like to resume?`)) {
                        displaySection(savedState.section);
                    } else {
                        sessionStorage.removeItem('aptitudeTestProgress');
                    }
                }
            })
            .catch(error => {
                console.error('Failed to load question data:', error);
                const errorEl = welcomeScreen.querySelector('p:last-of-type');
                errorEl.style.color = 'red';
                errorEl.innerHTML = `Failed to load test questions. Please check your connection and <a href="#" onclick="location.reload()">retry</a>.`;
            });
    }

    // --- Utility: Back-to-Top Button ---
    if(backToTopBtn) {
        window.addEventListener('scroll', () => { 
            backToTopBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none'; 
        });
        backToTopBtn.addEventListener('click', (e) => { 
            e.preventDefault(); 
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
        });
    }

    // --- Start the Application ---
    init(); 
});

