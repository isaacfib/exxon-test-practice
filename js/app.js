document.addEventListener('DOMContentLoaded', () => {
    let allData = { questions: [], passages: {}, visuals: {} };
    let currentTimer;

    const welcomeScreen = document.getElementById('welcome-screen');
    const testInterface = document.getElementById('test-interface');
    const navButtons = document.querySelectorAll('.nav-btn');
    const questionArea = document.getElementById('question-area');
    const contentArea = document.getElementById('content-area');
    const timerDisplay = document.getElementById('timer-display');
    const sectionTitle = document.getElementById('current-section-title');
    const backToTopBtn = document.getElementById('back-to-top');

    const sectionConfig = {
        'Verbal Reasoning': { time: 20 },
        'Numerical Reasoning': { time: 60 },
        'Abstract Reasoning': { time: 30 }
    };
    
    const passageTexts = {
        1: `<h3>Passage 1: Business Trends</h3><p>Top small business trends for 2025 emphasize a tailored approach to client engagement. Businesses that deeply understand individual client preferences and personalize their marketing messages, product recommendations, and offerings are expected to thrive. This personalization is no longer optional but a key driver for customer loyalty, necessitating the use of email marketing tools and analytics platforms to gain audience insights... [Passage content continues as in the original text]</p>`,
        2: `<h3>Passage 2: Technology Advancements</h3><p>Technology has profoundly transformed education, moving beyond traditional methods to embrace interactive whiteboards, digital projectors, tablets, and smart gadgets. This revolutionary era has fostered personalized learning opportunities for students... [Passage content continues]</p>`,
        3: `<h3>Passage 3: Environmental Sustainability</h3><p>The environment, a precious gift from Mother Nature, sustains all life on Earth by providing essential resources like clean air, fresh water, and fertile soil... [Passage content continues]</p>`,
        4: `<h3>Passage 4: Industrial Safety Regulations</h3><p>OSHA's Hazard Communication Standard (1910.1200) serves to ensure that the hazards of all chemicals produced or imported are properly classified, and that comprehensive information concerning these classified hazards is effectively transmitted... [Passage content continues]</p>`
    };

    function generateDataSourceHTML(id) {
        switch(id) {
            case 'graph1': return `<div class="chart-container"><p class="chart-title">Annual Production of Crude Oil (Million Barrels) by Region, 2022-2024</p><div class="bar-chart"><div class="bar-group"><div style="display: flex; gap: 5px; align-items: flex-end;"><div class="bar" style="height: calc(45/60 * 100%);" data-value="45"></div><div class="bar bar-b" style="height: calc(30/60 * 100%);" data-value="30"></div></div><div class="bar-label">2022</div></div><div class="bar-group"><div style="display: flex; gap: 5px; align-items: flex-end;"><div class="bar" style="height: calc(50/60 * 100%);" data-value="50"></div><div class="bar bar-b" style="height: calc(35/60 * 100%);" data-value="35"></div></div><div class="bar-label">2023</div></div><div class="bar-group"><div style="display: flex; gap: 5px; align-items: flex-end;"><div class="bar" style="height: calc(55/60 * 100%);" data-value="55"></div><div class="bar bar-b" style="height: calc(40/60 * 100%);" data-value="40"></div></div><div class="bar-label">2024</div></div></div></div>`;
            case 'table1': return `<table><caption>Projected Costs and Revenues for a New Plant (in Million USD)</caption><thead><tr><th>Category</th><th>Year 1</th><th>Year 2</th><th>Year 3</th></tr></thead><tbody><tr><td>Initial Investment</td><td>120</td><td>-</td><td>-</td></tr><tr><td>Operating Costs</td><td>30</td><td>32</td><td>35</td></tr><tr><td>Revenue</td><td>60</td><td>75</td><td>90</td></tr></tbody></table>`;
            case 'graph2': return `<div class="chart-container"><p class="chart-title">Quarterly Natural Gas Consumption (Billion Cubic Feet)</p><div class="svg-chart-container"><svg viewBox="0 0 100 60" style="border-left: 1px solid #aaa; border-bottom: 1px solid #aaa; padding-left: 5px;"><text x="-3" y="10.5" font-size="3" text-anchor="end">20</text><text x="-3" y="30.5" font-size="3" text-anchor="end">10</text><text x="-3" y="50.5" font-size="3" text-anchor="end">0</text><polyline points="10,25 35,40 60,20 85,10" fill="none" stroke="#E31837" stroke-width="0.7"/><circle cx="10" cy="25" r="1" fill="#003366"/><text x="10" y="23" font-size="3" text-anchor="middle">15</text><circle cx="35" cy="40" r="1" fill="#003366"/><text x="35" y="44" font-size="3" text-anchor="middle">12</text><circle cx="60" cy="20" r="1" fill="#003366"/><text x="60" y="18" font-size="3" text-anchor="middle">18</text><circle cx="85" cy="10" r="1" fill="#003366"/><text x="85" y="8" font-size="3" text-anchor="middle">20</text><text x="10" y="55" font-size="4" text-anchor="middle">Q1</text><text x="35" y="55" font-size="4" text-anchor="middle">Q2</text><text x="60" y="55" font-size="4" text-anchor="middle">Q3</text><text x="85" y="55" font-size="4" text-anchor="middle">Q4</text></svg></div></div>`;
            case 'table2': return `<table><caption>Employee Distribution by Department and Gender</caption><thead><tr><th>Department</th><th>Male</th><th>Female</th><th>Total</th></tr></thead><tbody><tr><td>Engineering</td><td>150</td><td>70</td><td>220</td></tr><tr><td>Operations</td><td>200</td><td>50</td><td>250</td></tr><tr><td>HR</td><td>20</td><td>30</td><td>50</td></tr><tr><td>Total</td><td>370</td><td>150</td><td>520</td></tr></tbody></table>`;
            case 'graph3': return `<div class="chart-container"><p class="chart-title">Distribution of Company's Annual Budget (Total $500 Million)</p><div class="pie-chart" style="background-image: conic-gradient(#003366 0% 25%, #007bff 25% 65%, #ffc107 65% 80%, #6c757d 80% 90%, #E31837 90% 100%);"></div><ul class="pie-legend"><li><span style="background-color: #003366;" class="legend-color"></span>R&D: 25%</li><li><span style="background-color: #007bff;" class="legend-color"></span>Ops: 40%</li><li><span style="background-color: #ffc107;" class="legend-color"></span>Mkt: 15%</li><li><span style="background-color: #6c757d;" class="legend-color"></span>Adm: 10%</li><li><span style="background-color: #E31837;" class="legend-color"></span>Cont: 10%</li></ul></div>`;
            case 'table3': return `<table><caption>Safety Incidents by Type and Severity</caption><thead><tr><th>Incident Type</th><th>Minor</th><th>Moderate</th><th>Major</th><th>Total</th></tr></thead><tbody><tr><td>Slips/Trips/Falls</td><td>15</td><td>5</td><td>1</td><td>21</td></tr><tr><td>Equipment Malfunction</td><td>8</td><td>3</td><td>2</td><td>13</td></tr><tr><td>Chemical Exposure</td><td>3</td><td>2</td><td>1</td><td>6</td></tr><tr><td>Other</td><td>10</td><td>4</td><td>0</td><td>14</td></tr><tr><td>Total</td><td>36</td><td>14</td><td>4</td><td>54</td></tr></tbody></table>`;
            case 'graph4': return `<div class="chart-container"><p class="chart-title">Energy Production Mix (GWh) by Source, 2024</p><div class="bar-chart"><div class="bar-group"><div class="bar" style="height: calc(250/400 * 100%); background-color: #ffc107;" data-value="250"></div><div class="bar-label">Solar</div></div><div class="bar-group"><div class="bar" style="height: calc(300/400 * 100%); background-color: #17a2b8;" data-value="300"></div><div class="bar-label">Wind</div></div><div class="bar-group"><div class="bar" style="height: calc(180/400 * 100%); background-color: #007bff;" data-value="180"></div><div class="bar-label">Hydro</div></div><div class="bar-group"><div class="bar" style="height: 100%; background-color: #6c757d;" data-value="400"></div><div class="bar-label">Fossil</div></div></div></div>`;
            case 'table4': return `<table><caption>Raw Material Prices and Usage for Product X</caption><thead><tr><th>Material</th><th>Price per unit ($)</th><th>Units Used</th></tr></thead><tbody><tr><td>Steel</td><td>2.50</td><td>10</td></tr><tr><td>Plastic</td><td>1.20</td><td>15</td></tr><tr><td>Copper</td><td>4.00</td><td>5</td></tr></tbody></table>`;
            case 'graph5': return `<div class="chart-container"><p class="chart-title">Employee Training Hours per Quarter, 2023</p><div class="svg-chart-container"><svg viewBox="0 0 100 60"><polyline points="10,40 35,10 60,25 85,0" fill="none" stroke="#003366" stroke-width="0.7"/><circle cx="10" cy="40" r="1" fill="#E31837"/><text x="10" y="38">1200</text><circle cx="35" cy="10" r="1" fill="#E31837"/><text x="35" y="8">1500</text><circle cx="60" cy="25" r="1" fill="#E31837"/><text x="60" y="23">1350</text><circle cx="85" cy="0" r="1" fill="#E31837"/><text x="85" y="5">1600</text></svg></div></div>`;
            case 'table5': return `<table><caption>Sales Performance by Product Category (in Thousands USD)</caption><thead><tr><th>Category</th><th>Sales Revenue</th><th>COGS</th></tr></thead><tbody><tr><td>Lubricants</td><td>800</td><td>450</td></tr><tr><td>Fuels</td><td>1200</td><td>900</td></tr><tr><td>Chemicals</td><td>600</td><td>300</td></tr></tbody></table>`;
            default: return '';
        }
    }
    
    function generateAbstractVisualHTML(id) {
        let sequenceHTML = '', optionsHTML = '';
        const emptyCell = `<div class="shape-box empty-cell">?</div>`;
        const step = `<div class="abstract-step">→</div>`;
        switch(id) {
            case 'seq1':
                sequenceHTML = `<div class="shape-box"><div class="inner-shape circle black pos-tl"></div></div>${step}<div class="shape-box"><div class="inner-shape circle black pos-tr"></div></div>${step}<div class="shape-box"><div class="inner-shape circle black pos-br"></div></div>${step}${emptyCell}`;
                optionsHTML = `<li data-option="A"><span class="option-label">A</span><div class="shape-box"><div class="inner-shape circle black pos-bl"></div></div></li><li data-option="B"><span class="option-label">B</span><div class="shape-box"><div class="inner-shape circle white pos-tr"></div></div></li>`; // simplified
                break;
            case 'seq7':
                 sequenceHTML = `<div class="shape-box triangle"><div class="inner-shape circle black" style="position: absolute; top: 60%; left: 50%; transform: translate(-50%, -50%);"></div></div>${step}<div class="shape-box triangle"><div class="inner-shape square black" style="position: absolute; top: 60%; left: 50%; transform: translate(-50%, -50%);"></div></div>${step}${emptyCell}`;
                optionsHTML = `<li data-option="A"><span class="option-label">A</span><div class="shape-box triangle"><div class="shape-box pentagon" style="width:20px; height:20px; position:absolute; top: 60%; left: 50%; transform:translate(-50%,-50%); border:none;"></div></div></li><li data-option="B">...</li>`;
                break;
            case 'mat1':
                sequenceHTML = `<div class="matrix"><div class="shape-box"><div class="inner-shape circle black pos-tl"></div></div><div class="shape-box"><div class="inner-shape circle black pos-tr"></div></div><div class="shape-box"><div class="inner-shape circle black pos-br"></div></div><div class="shape-box circle"><div class="inner-shape triangle white pos-tl"></div></div><div class="shape-box circle"><div class="inner-shape triangle white pos-tr"></div></div><div class="shape-box circle"><div class="inner-shape triangle white pos-br"></div></div><div class="shape-box pentagon"><div class="inner-shape star black pos-tl">★</div></div><div class="shape-box pentagon"><div class="inner-shape star black pos-tr">★</div></div>${emptyCell}</div>`;
                optionsHTML = `<li data-option="C"><span class="option-label">C</span><div class="shape-box pentagon"><div class="inner-shape star black pos-br">★</div></div></li><li data-option="D">...</li>`;
                break;
             // Add all other abstract visual cases here...
        }
        return {sequenceHTML, optionsHTML};
    }
    
    function createQuestionHTML(q) {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-container';
        questionDiv.dataset.id = q.id;
        questionDiv.dataset.correct = q.correctAnswer;

        let optionsMarkup = '';
        if (q.section === 'Abstract Reasoning') {
            const visuals = generateAbstractVisualHTML(q.visual_id);
             questionDiv.innerHTML += `<div class="abstract-container">${visuals.sequenceHTML}</div>`;
            optionsMarkup = `<ul class="options-list abstract-options">${visuals.optionsHTML}</ul>`;
        } else {
             optionsMarkup = Object.entries(q.options).map(([key, value]) => `<li><label><input type="radio" name="q${q.id}" value="${key}"> ${key}. ${value}</label></li>`).join('');
             optionsMarkup = `<ul class="options-list">${optionsMarkup}</ul>`;
        }
       
        questionDiv.innerHTML += `
            <p class="question-text"><span class="q-number">${q.id}.</span> ${q.questionText}</p>
            ${optionsMarkup}
            <div class="answer-reveal">
                <button class="toggle-answer-btn">Show Answer</button>
                <div class="explanation"><p><strong>Correct Answer: ${q.correctAnswer}</strong><br>${q.explanation}</p></div>
            </div>`;
        
        return questionDiv;
    }

    function addInteractivity() {
        questionArea.querySelectorAll('.question-container').forEach(container => {
            const toggleBtn = container.querySelector('.toggle-answer-btn');
            const explanationDiv = container.querySelector('.explanation');
            toggleBtn.addEventListener('click', () => {
                const isVisible = explanationDiv.style.display === 'block';
                explanationDiv.style.display = isVisible ? 'none' : 'block';
                toggleBtn.textContent = isVisible ? 'Show Answer' : 'Hide Answer';
            });

            const options = container.querySelector('.options-list');
            options.addEventListener('click', (e) => {
                const targetRadio = e.target.closest('li')?.querySelector('input[type="radio"]');
                if(!targetRadio || options.classList.contains('disabled')) return;
                
                options.classList.add('disabled');
                const selectedOptionLi = targetRadio.closest('li');
                const correctAnsw = container.dataset.correct;

                if(targetRadio.value === correctAnsw) {
                    selectedOptionLi.classList.add('correct');
                } else {
                    selectedOptionLi.classList.add('incorrect');
                    const correctLi = options.querySelector(`input[value="${correctAnsw}"]`).closest('li');
                    if(correctLi) correctLi.classList.add('correct');
                }
                
                explanationDiv.style.display = 'block';
                toggleBtn.textContent = 'Hide Answer';
            });
        });
    }

    function displaySection(sectionName) {
        welcomeScreen.classList.add('hidden');
        testInterface.classList.remove('hidden');

        navButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.section === sectionName);
        });
        
        contentArea.innerHTML = '';
        questionArea.innerHTML = '';
        
        sectionTitle.textContent = sectionName;
        startTimer(sectionConfig[sectionName].time);
        
        const sectionQuestions = allData.questions.filter(q => q.section === sectionName);
        
        let lastPassageId = null;
        let lastDataSourceId = null;

        sectionQuestions.forEach(q => {
            if (q.passage_id && q.passage_id !== lastPassageId) {
                const passageDiv = document.createElement('div');
                passageDiv.className = 'passage-box';
                passageDiv.innerHTML = passageTexts[q.passage_id];
                contentArea.appendChild(passageDiv);
                lastPassageId = q.passage_id;
            }

            if (q.data_source_id && q.data_source_id !== lastDataSourceId) {
                contentArea.innerHTML += generateDataSourceHTML(q.data_source_id);
                lastDataSourceId = q.data_source_id;
            }
            
            const questionElement = createQuestionHTML(q);
            questionArea.appendChild(questionElement);
        });

        addInteractivity();
    }
    
    function startTimer(durationInMinutes) {
        clearInterval(currentTimer);
        let time = durationInMinutes * 60;
        
        const update = () => {
            const minutes = Math.floor(time / 60).toString().padStart(2, '0');
            const seconds = (time % 60).toString().padStart(2, '0');
            timerDisplay.textContent = `${minutes}:${seconds}`;

            if (time <= 0) {
                clearInterval(currentTimer);
                alert("Time's up for this section!");
                questionArea.querySelectorAll('input').forEach(input => input.disabled = true);
                questionArea.querySelectorAll('.options-list').forEach(list => list.classList.add('disabled'));
            } else {
                time--;
            }
        };

        update();
        currentTimer = setInterval(update, 1000);
    }

    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.dataset.section;
            if (confirm(`Are you sure you want to start the ${section} section? The timer will begin.`)) {
                displaySection(section);
            }
        });
    });

    window.addEventListener('scroll', () => {
        backToTopBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
    });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    fetch('data/questions.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            allData.questions = data;
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
            questionArea.innerHTML = '<p style="color:red; text-align:center;">Failed to load questions. Please check the `data/questions.json` file and make sure the server is running correctly.</p>';
        });
});
