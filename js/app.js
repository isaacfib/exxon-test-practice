document.addEventListener('DOMContentLoaded', () => {
    let allData = { questions: [] };
    let currentTimer;

    const welcomeScreen = document.getElementById('welcome-screen');
    const testView = document.getElementById('test-view'); 
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
        1: `<h3>Passage 1: Business Trends</h3><p>Top small business trends for 2025 emphasize a tailored approach to client engagement. Businesses that deeply understand individual client preferences and personalize their marketing messages, product recommendations, and offerings are expected to thrive. This personalization is no longer optional but a key driver for customer loyalty, necessitating the use of email marketing tools and analytics platforms to gain audience insights. The rise of short-form interactive content, such as Instagram reels and YouTube shorts, is another significant trend. These eye-catching videos build brand awareness rapidly, allowing small businesses to showcase products, share behind-the-scenes content, or highlight customer testimonials in an authentic, relatable, and fun manner. Interactive elements like quizzes, polls, and surveys further enhance engagement, boosting conversions while providing valuable feedback. Digital transformation tools are becoming indispensable. Online sales are no longer exclusive to large corporations, making 2025 an opportune year for small businesses to establish an online presence. Adopting digital tools for scheduling and payments ensures smooth operations, and leveraging AI tools can significantly increase productivity. Optimizing SEO strategies for voice search, by incorporating conversational keywords and location-based content, is also crucial given the proliferation of smart speakers. Protecting businesses and clients from cyberattacks is a growing concern. Small businesses are increasingly vulnerable, making robust data and system security vital for reputation and client trust. Implementing multi-factor authentication, securing networks, and regularly updating software are essential practices. Training teams to recognize cybersecurity threats is equally important. Prioritizing the client experience remains paramount. Despite the reliance on digital tools, the personal touch continues to differentiate businesses. Whether through personalized greetings or follow-up emails, exceptional service cultivates loyalty. Meeting customers across online, in-person, or hybrid channels is key. The economy is expected to stabilize further in 2025, presenting growth opportunities, particularly in high-demand sectors like local services, wellness, and technology. Businesses must continuously research trends within and outside their industries to seize these opportunities.</p>`,
        2: `<h3>Passage 2: Technology Advancements</h3><p>Technology has profoundly transformed education, moving beyond traditional methods to embrace interactive whiteboards, digital projectors, tablets, and smart gadgets. This revolutionary era has fostered personalized learning opportunities for students, with online learning methods experiencing an unprecedented surge in educational markets globally. The COVID-19 pandemic significantly accelerated this shift, pushing over 50 percent of the worldwide learning industry to adopt online approaches. These changes have compelled the education sector to explore innovative learning technologies. Novel methods such as gamification, flipped classrooms, and eTextbooks have created healthy and interactive teaching environments, effectively bridging gaps caused by physical restrictions. Furthermore, technology has expanded learning opportunities, enabling access for students in remote areas. This digital revolution has converted conventional classrooms into specialized online classes, promoting a culture of lifelong learning. A significant contribution of technology is enhanced accessibility. Students from distant regions can now access quality education through online platforms, with tools like Zoom, Google Meet, and Microsoft Teams making virtual classrooms a reality, particularly during the pandemic. The internet also serves as an endless repository of knowledge, providing vast resources through websites, e-books, and videos. Platforms like Coursera and edX offer courses from top universities, allowing individuals to acquire new skills or explore diverse subjects. Despite its numerous benefits, technology in education faces challenges. A notable issue is the digital divide, where not all students possess access to necessary devices and internet connectivity. A UNICEF report highlighted that nearly 31% of students globally lacked access to remote learning during the pandemic. Moreover, potential misuse of technology and a lack of awareness regarding available tools pose hurdles, which can be addressed through improved infrastructure and awareness campaigns. Recent advancements promise even greater contributions. Artificial Intelligence (AI) is being deployed to create intelligent tutors offering instant feedback. Augmented Reality (AR) enriches textbook content with 3D visuals and interactive elements. Blockchain technology is being explored for securing and authenticating educational certificates, aiming to reduce fraud. In essence, technology has undeniably made education more accessible, interactive, and personalized, and with equitable access and responsible use, it holds the potential to further shape future learning landscapes.</p>`,
        3: `<h3>Passage 3: Environmental Sustainability Challenges</h3><p>The environment, a precious gift from Mother Nature, sustains all life on Earth by providing essential resources like clean air, fresh water, and fertile soil, and supporting diverse ecosystems. However, human activities have severely threatened this delicate balance, leading to significant environmental degradation and climate change. One of the most critical issues is climate change, primarily driven by the burning of fossil fuels, deforestation, and industrial activities. These actions release greenhouse gases, causing global temperatures to rise, which in turn leads to extreme weather events, rising sea levels, and disruptions to ecosystems. To combat this, a shift towards cleaner, renewable energy sources is essential, along with protecting and restoring forests, as they act as vital carbon sinks. Pollution, affecting air, soil, and water, poses another major challenge. Solutions include reducing reliance on single-use plastics and adopting eco-friendly alternatives. Controlling industrial emissions and vehicle pollution through strict regulations and promoting electric vehicles are also crucial. Additionally, responsible waste disposal and treating wastewater are necessary to prevent contamination of water bodies. Water scarcity is a growing concern, necessitating wise water usage and efforts to reduce water pollution from industrial and agricultural runoff. Biodiversity loss, caused by deforestation, habitat destruction, and overexploitation, requires conservation efforts, protected areas, and sustainable practices in agriculture and fisheries. Environmental degradation often creates a vicious cycle, where challenges like poverty, deforestation, and soil damage are both causes and effects. For instance, poverty can drive over-exploitation of natural resources, leading to deforestation and soil erosion, which in turn exacerbates poverty and climate change. This interconnectedness means that addressing one issue often has ripple effects on others. In conclusion, safeguarding the environment is not merely a choice but a necessity, demanding global cooperation and individual commitment. Addressing climate change, pollution, biodiversity loss, and water scarcity through government policies, technological advancements, and personal actions is vital to ensure a healthier and sustainable planet for current and future generations. Every little effort counts in this collective endeavor.</p>`,
        4: `<h3>Passage 4: Industrial Safety Regulations</h3><p>OSHA's Hazard Communication Standard (1910.1200) serves to ensure that the hazards of all chemicals produced or imported are properly classified, and that comprehensive information concerning these classified hazards is effectively transmitted to both employers and employees. This standard aligns with the United Nations Globally Harmonized System of Classification and Labeling of Chemicals (GHS), primarily Revision 7. The transmission of this vital information is accomplished through comprehensive hazard communication programs, which encompass container labeling, other forms of warning, safety data sheets (SDSs), and thorough employee training. This occupational safety and health standard provides a comprehensive framework for classifying potential chemical hazards and communicating information about these hazards and appropriate protective measures to employees. It also preempts any conflicting state or local legislative or regulatory enactments on this subject. Practical applications of this standard include developing and maintaining a written hazard communication program for the workplace, which must include lists of hazardous chemicals present. It also mandates the labeling of chemical containers within the workplace and those shipped to other locations, as well as the preparation and distribution of safety data sheets to employees and downstream employers. Furthermore, the standard requires the development and implementation of robust employee training programs on chemical hazards and necessary protective measures. Chemical manufacturers or importers are specifically required to classify the hazards of the chemicals they produce or import. All employers must provide information to their employees regarding hazardous chemicals they may be exposed to, utilizing a hazard communication program, clear labels and other warnings, readily accessible safety data sheets, and effective information and training. Distributors also bear the responsibility of transmitting this information to employers. Employers who do not produce or import chemicals primarily focus on establishing a workplace program and communicating hazard information to their workers. This section applies to any chemical known to be present in the workplace where employees could be exposed under normal use conditions or in a foreseeable emergency. Beyond hazard communication, OSHA assigns itself two primary regulatory functions: setting standards and conducting inspections to ensure employers provide safe and healthful workplaces. Employers must comply with all applicable OSHA standards, which may require adopting specific practices, means, methods, or processes to protect workers. This includes implementing engineering controls to limit exposures, administrative controls, and ensuring employees are provided with, trained on, and use personal protective equipment (PPE) when required. Employers are also mandated to report certain work-related incidents, such as fatalities, amputations, loss of an eye, or in-patient hospitalization, and to maintain records of work-related injuries and illnesses using forms like the Form 300 Log.</p>`
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
    
    function generateAbstractVisualHTML(id, questionId) {
        let sequenceHTML = '', optionsHTML = '';
        const emptyCell = `<div class="shape-box empty-cell">?</div>`;
        const step = `<div class="abstract-step">→</div>`;
        const visualTemplates = {
            'seq1': {
                sequence: `<div class="shape-box"><div class="inner-shape circle black pos-tl"></div></div>${step}<div class="shape-box"><div class="inner-shape circle black pos-tr"></div></div>${step}<div class="shape-box"><div class="inner-shape circle black pos-br"></div></div>${step}<div class="shape-box"><div class="inner-shape circle black pos-bl"></div></div>${step}<div class="shape-box"><div class="inner-shape circle black pos-tl"></div></div>${step}${emptyCell}`,
                options: {
                    A: `<div class="shape-box"><div class="inner-shape circle black pos-tr"></div></div>`,
                    B: `<div class="shape-box"><div class="inner-shape circle black pos-br"></div></div>`,
                    C: `<div class="shape-box"><div class="inner-shape circle black pos-bl"></div></div>`,
                    D: `<div class="shape-box"><div class="inner-shape circle black pos-tl"></div></div>`
                }
            },
            'mat1': {
                sequence: `<div class="matrix"><div class="shape-box square"><div class="inner-shape circle black pos-tl"></div></div><div class="shape-box square"><div class="inner-shape circle black pos-tr"></div></div><div class="shape-box square"><div class="inner-shape circle black pos-br"></div></div><div class="shape-box circle"><div class="inner-shape triangle white pos-tl"></div></div><div class="shape-box circle"><div class="inner-shape triangle white pos-tr"></div></div><div class="shape-box circle"><div class="inner-shape triangle white pos-br"></div></div><div class="shape-box pentagon"><div class="pos-tl" style="font-size:2em; place-self:center;">★</div></div><div class="shape-box pentagon"><div class="pos-tr" style="font-size:2em; place-self:center;">★</div></div>${emptyCell}</div>`,
                options: {
                    A: `<div class="shape-box circle"><div class="pos-br" style="font-size:2em; place-self:center;">★</div></div>`,
                    B: `<div class="shape-box pentagon"><div class="pos-bl" style="font-size:2em; place-self:center;">★</div></div>`,
                    C: `<div class="shape-box pentagon"><div class="pos-br" style="font-size:2em; place-self:center;">★</div></div>`,
                    D: `<div class="shape-box square"><div class="pos-br" style="font-size:2em; place-self:center;">★</div></div>`
                }
            }
        };
        
        const template = visualTemplates[id] || { sequence: '', options: {} };
        sequenceHTML = template.sequence;
        optionsHTML = Object.entries(template.options).map(([key, value]) => `<li data-option="${key}"><input type="radio" name="q${questionId}" value="${key}"><label>${value}</label></li>`).join('');

        return {sequenceHTML, optionsHTML};
    }
    
    function createQuestionHTML(q) {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-container';
        questionDiv.dataset.id = q.id;
        questionDiv.dataset.correct = q.correctAnswer;
        
        let visualContainer = '';
        let optionsMarkup = '';

        if (q.section === 'Abstract Reasoning' && q.visual_id) {
            const visuals = generateAbstractVisualHTML(q.visual_id, q.id);
            visualContainer = `<div class="abstract-container">${visuals.sequenceHTML}</div>`;
            optionsMarkup = `<ul class="options-list abstract-options">${visuals.optionsHTML}</ul>`;
        } else {
             optionsMarkup = Object.entries(q.options).map(([key, value]) => `<li><label><input type="radio" name="q${q.id}" value="${key}"> ${key}. ${value}</label></li>`).join('');
             optionsMarkup = `<ul class="options-list">${optionsMarkup}</ul>`;
        }
       
        questionDiv.innerHTML = `
            ${visualContainer}
            <p class="question-text"><span class="q-number">${q.id}.</span> ${q.questionText}</p>
            ${optionsMarkup}
            <div class="answer-reveal">
                <button class="toggle-answer-btn">Show Answer</button>
                <div class="explanation"><p><strong>Correct Answer: ${q.correctAnswer}</strong><br>${q.explanation}</p></div>
            </div>`;
        
        return questionDiv;
    }

    function addInteractivity() {
        testView.querySelectorAll('.question-container').forEach(container => {
            const toggleBtn = container.querySelector('.toggle-answer-btn');
            const explanationDiv = container.querySelector('.explanation');
            toggleBtn.addEventListener('click', () => {
                const isVisible = explanationDiv.style.display === 'block';
                explanationDiv.style.display = isVisible ? 'none' : 'block';
                toggleBtn.textContent = isVisible ? 'Show Answer' : 'Hide Answer';
            });

            const options = container.querySelector('.options-list');
            if (options) {
                options.addEventListener('click', (e) => {
                    const targetLi = e.target.closest('li');
                    if (!targetLi || options.classList.contains('disabled')) return;

                    const targetRadio = targetLi.querySelector('input[type="radio"]');
                    if (!targetRadio) return;

                    targetRadio.checked = true;

                    options.classList.add('disabled');
                    const correctAnsw = container.dataset.correct;

                    if(targetRadio.value === correctAnsw) {
                        targetLi.classList.add('correct');
                    } else {
                        targetLi.classList.add('incorrect');
                        const correctLi = options.querySelector(`li[data-option="${correctAnsw}"], input[value="${correctAnsw}"]`);
                        correctLi?.closest('li').classList.add('correct');
                    }
                    
                    explanationDiv.style.display = 'block';
                    toggleBtn.textContent = 'Hide Answer';
                });
            }
        });
    }
    
    // *** THIS IS THE CORRECTED FUNCTION ***
    function displaySection(sectionName) {
        welcomeScreen.classList.add('hidden');
        testView.classList.remove('hidden');

        navButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.section === sectionName);
        });
        
        contentArea.innerHTML = '';
        questionArea.innerHTML = '';
        
        sectionTitle.textContent = sectionName;
        startTimer(sectionConfig[sectionName].time);
        
        const sectionQuestions = allData.questions.filter(q => q.section === sectionName);
        
        // Group questions by their source (passage or data_source)
        const questionGroups = {};
        sectionQuestions.forEach(q => {
            const sourceKey = q.passage_id || q.data_source_id || q.visual_id || 'general';
            if (!questionGroups[sourceKey]) {
                questionGroups[sourceKey] = [];
            }
            questionGroups[sourceKey].push(q);
        });

        // Render each group sequentially: Source followed by its questions
        for (const sourceKey in questionGroups) {
            if (sourceKey !== 'general') {
                const isPassage = isNaN(parseInt(sourceKey, 10)) === false; // check if it is a number
                if(isPassage) {
                    const passageDiv = document.createElement('div');
                    passageDiv.className = 'passage-box';
                    passageDiv.innerHTML = passageTexts[sourceKey] || '';
                    contentArea.appendChild(passageDiv);
                } else {
                     contentArea.innerHTML += generateDataSourceHTML(sourceKey);
                }
            }

            questionGroups[sourceKey].forEach(q => {
                const questionElement = createQuestionHTML(q);
                // For a more integrated view, append directly to contentArea
                // Or keep separate as is. For now, questionArea is fine.
                questionArea.appendChild(questionElement);
            });
        }

        addInteractivity();
        window.scrollTo({ top: 0, behavior: 'auto' });
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
                testView.querySelectorAll('input').forEach(input => input.disabled = true);
                testView.querySelectorAll('.options-list').forEach(list => list.classList.add('disabled'));
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
            if (testView.classList.contains('hidden')) {
                 displaySection(section);
            } else if (confirm(`Are you sure you want to start a new section? The current section's progress and timer will be reset.`)) {
                displaySection(section);
            }
        });
    });

    window.addEventListener('scroll', () => {
        if(backToTopBtn) backToTopBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
    });

    if(backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    fetch('data/questions.json')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            allData.questions = data;
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
            const mainContent = document.querySelector('.container');
            mainContent.innerHTML = '<p style="color:red; text-align:center; font-size:1.2rem; padding: 2rem;"><strong>Error:</strong> Failed to load questions. Please ensure the `data/questions.json` file exists in the correct directory and is accessible.</p>';
        });
});
