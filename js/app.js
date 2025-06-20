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

    const passageTexts = {
        1: `<h3>Passage 1: Business Trends</h3><p>Top small business trends for 2025 emphasize a tailored approach to client engagement. Businesses that deeply understand individual client preferences and personalize their marketing messages, product recommendations, and offerings are expected to thrive. This personalization is no longer optional but a key driver for customer loyalty, necessitating the use of email marketing tools and analytics platforms to gain audience insights. The rise of short-form interactive content, such as Instagram reels and YouTube shorts, is another significant trend. These eye-catching videos build brand awareness rapidly, allowing small businesses to showcase products, share behind-the-scenes content, or highlight customer testimonials in an authentic, relatable, and fun manner. Interactive elements like quizzes, polls, and surveys further enhance engagement, boosting conversions while providing valuable feedback. Digital transformation tools are becoming indispensable. Online sales are no longer exclusive to large corporations, making 2025 an opportune year for small businesses to establish an online presence. Adopting digital tools for scheduling and payments ensures smooth operations, and leveraging AI tools can significantly increase productivity. Optimizing SEO strategies for voice search, by incorporating conversational keywords and location-based content, is also crucial given the proliferation of smart speakers. Protecting businesses and clients from cyberattacks is a growing concern. Small businesses are increasingly vulnerable, making robust data and system security vital for reputation and client trust. Implementing multi-factor authentication, securing networks, and regularly updating software are essential practices. Training teams to recognize cybersecurity threats is equally important. Prioritizing the client experience remains paramount. Despite the reliance on digital tools, the personal touch continues to differentiate businesses. Whether through personalized greetings or follow-up emails, exceptional service cultivates loyalty. Meeting customers across online, in-person, or hybrid channels is key. The economy is expected to stabilize further in 2025, presenting growth opportunities, particularly in high-demand sectors like local services, wellness, and technology. Businesses must continuously research trends within and outside their industries to seize these opportunities.</p>`,
        2: `<h3>Passage 2: Technology Advancements</h3><p>Technology has profoundly transformed education, moving beyond traditional methods to embrace interactive whiteboards, digital projectors, tablets, and smart gadgets. This revolutionary era has fostered personalized learning opportunities for students, with online learning methods experiencing an unprecedented surge in educational markets globally. The COVID-19 pandemic significantly accelerated this shift, pushing over 50 percent of the worldwide learning industry to adopt online approaches. These changes have compelled the education sector to explore innovative learning technologies. Novel methods such as gamification, flipped classrooms, and eTextbooks have created healthy and interactive teaching environments, effectively bridging gaps caused by physical restrictions. Furthermore, technology has expanded learning opportunities, enabling access for students in remote areas. This digital revolution has converted conventional classrooms into specialized online classes, promoting a culture of lifelong learning. A significant contribution of technology is enhanced accessibility. Students from distant regions can now access quality education through online platforms, with tools like Zoom, Google Meet, and Microsoft Teams making virtual classrooms a reality, particularly during the pandemic. The internet also serves as an endless repository of knowledge, providing vast resources through websites, e-books, and videos. Platforms like Coursera and edX offer courses from top universities, allowing individuals to acquire new skills or explore diverse subjects. Despite its numerous benefits, technology in education faces challenges. A notable issue is the digital divide, where not all students possess access to necessary devices and internet connectivity. A UNICEF report highlighted that nearly 31% of students globally lacked access to remote learning during the pandemic. Moreover, potential misuse of technology and a lack of awareness regarding available tools pose hurdles, which can be addressed through improved infrastructure and awareness campaigns. Recent advancements promise even greater contributions. Artificial Intelligence (AI) is being deployed to create intelligent tutors offering instant feedback. Augmented Reality (AR) enriches textbook content with 3D visuals and interactive elements. Blockchain technology is being explored for securing and authenticating educational certificates, aiming to reduce fraud. In essence, technology has undeniably made education more accessible, interactive, and personalized, and with equitable access and responsible use, it holds the potential to further shape future learning landscapes.</p>`,
        3: `<h3>Passage 3: Environmental Sustainability Challenges</h3><p>The environment, a precious gift from Mother Nature, sustains all life on Earth by providing essential resources like clean air, fresh water, and fertile soil, and supporting diverse ecosystems. However, human activities have severely threatened this delicate balance, leading to significant environmental degradation and climate change. One of the most critical issues is climate change, primarily driven by the burning of fossil fuels, deforestation, and industrial activities. These actions release greenhouse gases, causing global temperatures to rise, which in turn leads to extreme weather events, rising sea levels, and disruptions to ecosystems. To combat this, a shift towards cleaner, renewable energy sources is essential, along with protecting and restoring forests, as they act as vital carbon sinks. Pollution, affecting air, soil, and water, poses another major challenge. Solutions include reducing reliance on single-use plastics and adopting eco-friendly alternatives. Controlling industrial emissions and vehicle pollution through strict regulations and promoting electric vehicles are also crucial. Additionally, responsible waste disposal and treating wastewater are necessary to prevent contamination of our water bodies. Water scarcity is a growing concern, necessitating wise water usage and efforts to reduce water pollution from industrial and agricultural runoff. Biodiversity loss, caused by deforestation, habitat destruction, and overexploitation, requires conservation efforts, protected areas, and sustainable practices in agriculture and fisheries. Environmental degradation often creates a vicious cycle, where challenges like poverty, deforestation, and soil damage are both causes and effects. For instance, poverty can drive over-exploitation of natural resources, leading to deforestation and soil erosion, which in turn exacerbates poverty and climate change. This interconnectedness means that addressing one issue often has ripple effects on others. In conclusion, safeguarding the environment is not merely a choice but a necessity, demanding global cooperation and individual commitment. Addressing climate change, pollution, biodiversity loss, and water scarcity through government policies, technological advancements, and personal actions is vital to ensure a healthier and sustainable planet for current and future generations. Every little effort counts in this collective endeavor.</p>`,
        4: `<h3>Passage 4: Industrial Safety Regulations</h3><p>OSHA's Hazard Communication Standard (1910.1200) serves to ensure that the hazards of all chemicals produced or imported are properly classified, and that comprehensive information concerning these classified hazards is effectively transmitted to both employers and employees. This standard aligns with the United Nations Globally Harmonized System of Classification and Labeling of Chemicals (GHS), primarily Revision 7. The transmission of this vital information is accomplished through comprehensive hazard communication programs, which encompass container labeling, other forms of warning, safety data sheets (SDSs), and thorough employee training. This occupational safety and health standard provides a comprehensive framework for classifying potential chemical hazards and communicating information about these hazards and appropriate protective measures to employees. It also preempts any conflicting state or local legislative or regulatory enactments on this subject. Practical applications of this standard include developing and maintaining a written hazard communication program for the workplace, which must include lists of hazardous chemicals present. It also mandates the labeling of chemical containers within the workplace and those shipped to other locations, as well as the preparation and distribution of safety data sheets to employees and downstream employers. Furthermore, the standard requires the development and implementation of robust employee training programs on chemical hazards and necessary protective measures. Chemical manufacturers or importers are specifically required to classify the hazards of the chemicals they produce or import. All employers must provide information to their employees regarding hazardous chemicals they may be exposed to, utilizing a hazard communication program, clear labels and other warnings, readily accessible safety data sheets, and effective information and training. Distributors also bear the responsibility of transmitting this information to employers. Employers who do not produce or import chemicals primarily focus on establishing a workplace program and communicating hazard information to their workers. This section applies to any chemical known to be present in the workplace where employees could be exposed under normal use conditions or in a foreseeable emergency. Beyond hazard communication, OSHA assigns itself two primary regulatory functions: setting standards and conducting inspections to ensure employers provide safe and healthful workplaces. Employers must comply with all applicable OSHA standards, which may require adopting specific practices, means,methods, or processes to protect workers. This includes implementing engineering controls to limit exposures, administrative controls, and ensuring employees are provided with, trained on, and use personal protective equipment (PPE) when required. Employers are also mandated to report certain work-related incidents, such as fatalities, amputations, loss of an eye, or in-patient hospitalization, and to maintain records of work-related injuries and illnesses using forms like the Form 300 Log.</p>`
    };
    
    function generateShapeBoxHTML(config = {}) {
        const {
            containerShape = 'square',
            containerSize = 'large',
            containerFill = 'white-fill',
            elements = [],
            lines = [],
            textContent = '',
            textClass = '',
            isQuestionMark = false
        } = config;

        if (isQuestionMark) {
            return `<div class="shape-box empty-cell">?</div>`;
        }
        
        const containerClasses = `shape-box ${containerShape} ${containerSize} ${containerFill}`;
        let elementsHTML = elements.map(el => {
            const elClasses = `inner-shape ${el.type} ${el.color} ${el.position}`;
            const style = el.rotation ? `style="transform: rotate(${el.rotation}deg);"` : '';
            if (el.type === 'star') {
                return `<div class="${elClasses}" ${style}>★</div>`;
            }
            return `<div class="${elClasses}" ${style}></div>`;
        }).join('');

        let linesHTML = lines.map(line => {
            const style = line.style || '';
            return `<div class="line ${line.type}" style="${style}"></div>`;
        }).join('');
        
        let contentHTML = textContent ? `<span class="${textClass}">${textContent}</span>` : '';

        return `<div class="${containerClasses}">${elementsHTML}${linesHTML}${contentHTML}</div>`;
    }

    function renderSequence(configs) {
        const sequenceHTML = configs.map(config => generateShapeBoxHTML(config)).join('<div class="abstract-step">→</div>');
        return `<div class="abstract-container">${sequenceHTML}</div>`;
    }

    function renderMatrix(configs) {
        const matrixHTML = configs.map(config => generateShapeBoxHTML(config)).join('');
        return `<div class="chart-container"><div class="matrix">${matrixHTML}</div></div>`;
    }
    
    const visualsLib = {
        'seq1': { sequence: [ {elements: [{type:'circle', color:'black', position:'pos-tl'}]}, {elements: [{type:'circle', color:'black', position:'pos-tr'}]}, {elements: [{type:'circle', color:'black', position:'pos-br'}]}, {elements: [{type:'circle', color:'black', position:'pos-bl'}]}, {elements: [{type:'circle', color:'black', position:'pos-tl'}]}, {isQuestionMark:true} ], options: [ {elements:[{type:'circle', color:'black', position:'pos-tr'}]}, {elements:[{type:'circle', color:'black', position:'pos-br'}]}, {elements:[{type:'circle', color:'black', position:'pos-bl'}]}, {elements:[{type:'circle', color:'black', position:'pos-tl'}]} ] },
        'seq2': { sequence: [ {containerShape:'circle', elements: [{type:'triangle', color:'white', position:'pos-tl'}]}, {containerShape:'circle', elements: [{type:'triangle', color:'white', position:'pos-tr'}]}, {containerShape:'circle', elements: [{type:'triangle', color:'white', position:'pos-br'}]}, {containerShape:'circle', elements: [{type:'triangle', color:'white', position:'pos-bl'}]}, {containerShape:'circle', elements: [{type:'triangle', color:'white', position:'pos-tl'}]}, {isQuestionMark:true} ], options: [ {containerShape:'circle', elements: [{type:'triangle', color:'white', position:'pos-tr'}]}, {containerShape:'circle', elements: [{type:'triangle', color:'white', position:'pos-br'}]}, {containerShape:'circle', elements: [{type:'triangle', color:'white', position:'pos-bl'}]}, {containerShape:'circle', elements: [{type:'triangle', color:'white', position:'pos-tl'}]} ] },
        'seq3': { sequence: [ {elements:[{type:'circle', color:'black', position:'pos-tl'},{type:'circle', color:'white', position:'pos-br'}]}, {elements:[{type:'circle', color:'black', position:'pos-tr'},{type:'circle', color:'white', position:'pos-bl'}]}, {elements:[{type:'circle', color:'black', position:'pos-br'},{type:'circle', color:'white', position:'pos-tl'}]}, {isQuestionMark:true} ], options: [ {elements:[{type:'circle', color:'black', position:'pos-bl'},{type:'circle', color:'white', position:'pos-tr'}]}, {elements:[{type:'circle', color:'black', position:'pos-br'},{type:'circle', color:'white', position:'pos-tl'}]}, {elements:[{type:'circle', color:'black', position:'pos-tl'},{type:'circle', color:'white', position:'pos-br'}]}, {elements:[{type:'circle', color:'black', position:'pos-tr'},{type:'circle', color:'white', position:'pos-bl'}]} ] },
        'seq4': { sequence: [ {elements:[{type:'square', color:'black', position:'pos-tl'},{type:'square', color:'white', position:'pos-tr'}]}, {elements:[{type:'square', color:'black', position:'pos-tr'},{type:'square', color:'white', position:'pos-br'}]}, {elements:[{type:'square', color:'black', position:'pos-br'},{type:'square', color:'white', position:'pos-bl'}]}, {isQuestionMark:true} ], options: [ {elements:[{type:'square', color:'black', position:'pos-bl'},{type:'square', color:'white', position:'pos-tl'}]}, {elements:[{type:'square', color:'black', position:'pos-br'},{type:'square', color:'white', position:'pos-bl'}]}, {elements:[{type:'square', color:'black', position:'pos-tr'},{type:'square', color:'white', position:'pos-br'}]}, {elements:[{type:'square', color:'black', position:'pos-tl'},{type:'square', color:'white', position:'pos-tr'}]} ] },
        'seq5': { sequence: [ {containerShape:'circle', elements:[{type:'circle', color:'black', position:'pos-center', styleOverride:'top:5px;bottom:auto;'},{type:'circle', color:'black', position:'pos-center', styleOverride:'top:auto;bottom:5px;'}]}, {containerShape:'circle', elements:[{type:'circle', color:'black', position:'pos-center', styleOverride:'top:5px;bottom:auto;transform:rotate(45deg)'},{type:'circle', color:'black', position:'pos-center', styleOverride:'top:auto;bottom:5px;transform:rotate(45deg)'}], styleOverride:'transform: rotate(45deg);'}, {containerShape:'circle', elements:[{type:'circle', color:'black', position:'pos-center', styleOverride:'top:5px;bottom:auto;transform:rotate(90deg)'},{type:'circle', color:'black', position:'pos-center', styleOverride:'top:auto;bottom:5px;transform:rotate(90deg)'}], styleOverride:'transform: rotate(90deg);'}, {isQuestionMark:true} ], options: [ {containerShape:'circle', styleOverride:'transform:rotate(135deg)'}, {containerShape:'circle', styleOverride:'transform:rotate(180deg)'}, {containerShape:'circle', styleOverride:'transform:rotate(90deg)'}, {containerShape:'circle'} ]},
        'seq6': { sequence: [ {lines:[{type:'h-line'}]}, {lines:[{type:'h-line', style:'top:33%'}, {type:'h-line', style:'top:67%'}]}, {lines:[{type:'h-line', style:'top:25%'},{type:'h-line'},{type:'h-line', style:'top:75%'}]}, {lines:[{type:'h-line', style:'top:20%'},{type:'h-line', style:'top:40%'},{type:'h-line', style:'top:60%'},{type:'h-line', style:'top:80%'}]}, {isQuestionMark:true} ], options: [ {lines:[{type:'h-line', style:'top:16.6%'},{type:'h-line', style:'top:33.2%'},{type:'h-line', style:'top:50%'},{type:'h-line', style:'top:66.8%'},{type:'h-line', style:'top:83.4%'}]}, {lines:[{type:'v-line', style:'left:16.6%'},{type:'v-line', style:'left:33.2%'},{type:'v-line', style:'left:50%'},{type:'v-line', style:'left:66.8%'},{type:'v-line', style:'left:83.4%'}]}, {lines:[{type:'h-line', style:'top:20%'},{type:'h-line', style:'top:40%'},{type:'h-line', style:'top:60%'},{type:'h-line', style:'top:80%'}]}, {lines:[]} ] },
        'seq7': { sequence: [ {containerShape:'triangle', elements:[{type:'circle', color:'black', position:'pos-center'}]}, {containerShape:'triangle', elements:[{type:'square', color:'black', position:'pos-center'}]}, {containerShape:'triangle', elements:[{type:'pentagon', color:'black', position:'pos-center'}]}, {isQuestionMark:true} ], options: [ {containerShape:'triangle', elements:[{type:'hexagon', color:'black', position:'pos-center'}]}, {containerShape:'triangle', elements:[{type:'heptagon', color:'black', position:'pos-center'}]}, {containerShape:'triangle', elements:[{type:'octagon', color:'black', position:'pos-center'}]}, {containerShape:'triangle', elements:[{type:'circle', color:'black', position:'pos-center'}]} ] },
        'seq8': { sequence: [ {elements:[{type:'square', color:'black', position:'pos-tl'}]}, {elements:[{type:'square', color:'black', position:'pos-tr'}]}, {elements:[{type:'square', color:'black', position:'pos-br'}]}, {elements:[{type:'square', color:'black', position:'pos-bl'}]}, {elements:[{type:'square', color:'white', position:'pos-tl'}]}, {isQuestionMark:true} ], options: [ {elements:[{type:'square', color:'white', position:'pos-tr'}]}, {elements:[{type:'square', color:'white', position:'pos-br'}]}, {elements:[{type:'square', color:'white', position:'pos-bl'}]}, {elements:[{type:'square', color:'black', position:'pos-tr'}]} ] },
        'seq9': { sequence: [ {containerShape:'circle', elements:[{type:'triangle', color:'black', position:'pos-center', rotation:90}]}, {containerShape:'circle', elements:[{type:'triangle', color:'black', position:'pos-center', rotation:180}]}, {containerShape:'circle', elements:[{type:'triangle', color:'black', position:'pos-center', rotation:270}]}, {containerShape:'circle', elements:[{type:'triangle', color:'black', position:'pos-center', rotation:360}]}, {isQuestionMark:true} ], options: [ {containerShape:'circle', elements:[{type:'triangle', color:'black', position:'pos-center', rotation:90}]}, {containerShape:'circle', elements:[{type:'triangle', color:'black', position:'pos-center', rotation:180}]}, {containerShape:'circle', elements:[{type:'triangle', color:'black', position:'pos-center', rotation:270}]}, {containerShape:'circle', elements:[{type:'triangle', color:'black', position:'pos-center', rotation:360}]} ] },
        'seq10':{ sequence: [ {lines:[{type:'diag-tl-br'}]}, {lines:[{type:'diag-tl-br'},{type:'diag-tr-bl'}]}, {lines:[{type:'diag-tl-br'},{type:'diag-tr-bl'},{type:'h-line'}]}, {lines:[{type:'diag-tl-br'},{type:'diag-tr-bl'},{type:'h-line'},{type:'v-line'}]}, {isQuestionMark:true} ], options: [ {lines:[{type:'diag-tl-br'},{type:'diag-tr-bl'},{type:'h-line'},{type:'v-line'},{type:'h-line', style:'top:25%'}]}, {lines:[{type:'diag-tl-br'},{type:'diag-tr-bl'},{type:'h-line'},{type:'v-line'},{type:'v-line', style:'left:25%'}]}, {lines:[{type:'diag-tl-br'}]}, {lines:[{type:'diag-tl-br'},{type:'diag-tr-bl'}]} ] },
        'mat1': { matrix: [ {containerShape:'square',elements:[{type:'circle',color:'black',position:'pos-tl'}]}, {containerShape:'square',elements:[{type:'circle',color:'black',position:'pos-tr'}]}, {containerShape:'square',elements:[{type:'circle',color:'black',position:'pos-br'}]}, {containerShape:'circle',elements:[{type:'triangle',color:'white',position:'pos-tl'}]}, {containerShape:'circle',elements:[{type:'triangle',color:'white',position:'pos-tr'}]}, {containerShape:'circle',elements:[{type:'triangle',color:'white',position:'pos-br'}]}, {containerShape:'pentagon',elements:[{type:'star',color:'black',position:'pos-tl'}]}, {containerShape:'pentagon',elements:[{type:'star',color:'black',position:'pos-tr'}]}, {isQuestionMark:true} ], options: [ {containerShape:'pentagon',elements:[{type:'star',color:'black',position:'pos-br'}]}, {containerShape:'pentagon',elements:[{type:'star',color:'black',position:'pos-bl'}]}, {containerShape:'pentagon',elements:[{type:'star',color:'white',position:'pos-br'}]}, {containerShape:'square',elements:[{type:'star',color:'black',position:'pos-br'}]} ] },
        'mat2': { matrix: [ {elements:[{type:'circle',color:'black',position:'pos-tl'},{type:'circle',color:'white',position:'pos-br'}]}, {elements:[{type:'circle',color:'black',position:'pos-tr'},{type:'circle',color:'white',position:'pos-bl'}]}, {elements:[{type:'circle',color:'black',position:'pos-br'},{type:'circle',color:'white',position:'pos-tl'}]}, {containerShape:'circle',elements:[{type:'circle',color:'black',position:'pos-tl'},{type:'circle',color:'white',position:'pos-br'}]}, {containerShape:'circle',elements:[{type:'circle',color:'black',position:'pos-tr'},{type:'circle',color:'white',position:'pos-bl'}]}, {containerShape:'circle',elements:[{type:'circle',color:'black',position:'pos-br'},{type:'circle',color:'white',position:'pos-tl'}]}, {containerShape:'triangle',elements:[{type:'circle',color:'black',position:'pos-tl'},{type:'circle',color:'white',position:'pos-br'}]}, {containerShape:'triangle',elements:[{type:'circle',color:'black',position:'pos-tr'},{type:'circle',color:'white',position:'pos-bl'}]}, {isQuestionMark:true} ], options: [ {containerShape:'triangle',elements:[{type:'circle',color:'black',position:'pos-br'},{type:'circle',color:'white',position:'pos-tl'}]}, {containerShape:'triangle',elements:[{type:'circle',color:'black',position:'pos-tl'},{type:'circle',color:'white',position:'pos-br'}]}, {containerShape:'triangle',elements:[{type:'circle',color:'white',position:'pos-br'},{type:'circle',color:'black',position:'pos-tl'}]}, {containerShape:'circle',elements:[{type:'circle',color:'black',position:'pos-br'},{type:'circle',color:'white',position:'pos-tl'}]} ] },
        'mat3': { matrix: [ {lines:[{type:'h-line'}]}, {lines:[{type:'h-line', style:'top:33%'}, {type:'h-line', style:'top:67%'}]}, {lines:[{type:'h-line', style:'top:25%'},{type:'h-line', style:'top:50%'},{type:'h-line', style:'top:75%'}]}, {containerShape:'circle', lines:[{type:'v-line'}]}, {containerShape:'circle', lines:[{type:'v-line', style:'left:33%'}, {type:'v-line', style:'left:67%'}]}, {containerShape:'circle', lines:[{type:'v-line', style:'left:25%'},{type:'v-line', style:'left:50%'},{type:'v-line', style:'left:75%'}]}, {containerShape:'triangle', lines:[{type:'diag-tl-br'}]}, {containerShape:'triangle', lines:[{type:'diag-tl-br'}, {type:'diag-tr-bl'}]}, {isQuestionMark:true} ], options: [ {containerShape:'triangle', lines:[{type:'diag-tl-br'}, {type:'diag-tr-bl'}, {type:'h-line'}]}, {containerShape:'triangle', lines:[{type:'h-line'}, {type:'v-line'}]}, {containerShape:'triangle', lines:[{type:'h-line', style:'top:25%'},{type:'h-line', style:'top:50%'},{type:'h-line', style:'top:75%'}]}, {containerShape:'square', lines:[{type:'diag-tl-br'}]} ] },
        'mat4': { matrix: [ {containerShape:'pentagon',containerFill:'black-fill'}, {containerShape:'pentagon',containerFill:'white-fill'}, {containerShape:'pentagon',containerFill:'black-fill'}, {containerShape:'hexagon',containerFill:'white-fill'}, {containerShape:'hexagon',containerFill:'black-fill'}, {containerShape:'hexagon',containerFill:'white-fill'}, {containerShape:'heptagon',containerFill:'black-fill'}, {containerShape:'heptagon',containerFill:'white-fill'}, {isQuestionMark:true} ], options: [ {containerShape:'heptagon',containerFill:'black-fill'}, {containerShape:'heptagon',containerFill:'white-fill'}, {containerShape:'octagon',containerFill:'black-fill'}, {containerShape:'octagon',containerFill:'white-fill'} ] },
        'mat5': { matrix: [ {textContent:'4',textClass:'dot-count'}, {textContent:'3',textClass:'dot-count'}, {textContent:'2',textClass:'dot-count'}, {containerShape:'circle', textContent:'5',textClass:'dot-count'}, {containerShape:'circle',textContent:'4',textClass:'dot-count'}, {containerShape:'circle',textContent:'3',textClass:'dot-count'}, {containerShape:'triangle',textContent:'6',textClass:'dot-count'}, {containerShape:'triangle',textContent:'5',textClass:'dot-count'}, {isQuestionMark:true} ], options: [ {containerShape:'triangle',textContent:'4',textClass:'dot-count'}, {containerShape:'triangle',textContent:'3',textClass:'dot-count'}, {containerShape:'triangle',textContent:'2',textClass:'dot-count'}, {containerShape:'circle',textContent:'4',textClass:'dot-count'} ] },
        'mat6': { matrix: [ {containerSize:'large', containerFill:'black-fill'}, {containerSize:'medium', containerFill:'black-fill'}, {containerSize:'small', containerFill:'black-fill'}, {containerShape:'circle', containerSize:'large'}, {containerShape:'circle', containerSize:'medium'}, {containerShape:'circle', containerSize:'small'}, {containerShape:'triangle', containerSize:'large', containerFill:'black-fill'}, {containerShape:'triangle', containerSize:'medium', containerFill:'black-fill'}, {isQuestionMark:true} ], options: [ {containerShape:'triangle', containerSize:'small', containerFill:'black-fill'}, {containerShape:'triangle', containerSize:'small', containerFill:'white-fill'}, {containerShape:'circle', containerSize:'small', containerFill:'black-fill'}, {containerShape:'triangle', containerSize:'medium', containerFill:'black-fill'} ] },
        'mat7': { matrix: [ {lines:[{type:'diag-tl-br'}]}, {lines:[{type:'diag-tr-bl'}]}, {}, {containerShape:'circle',lines:[{type:'diag-tl-br'}]}, {containerShape:'circle',lines:[{type:'diag-tr-bl'}]}, {containerShape:'circle'}, {containerShape:'triangle',lines:[{type:'diag-tl-br'}]}, {containerShape:'triangle',lines:[{type:'diag-tr-bl'}]}, {isQuestionMark:true} ], options: [ {containerShape:'triangle'}, {containerShape:'triangle',lines:[{type:'diag-tl-br'}]}, {containerShape:'triangle',lines:[{type:'diag-tr-bl'}]}, {containerShape:'triangle',lines:[{type:'diag-tl-br'}, {type:'diag-tr-bl'}]} ] },
        'mat8': { matrix: [ {lines:[{type:'v-line'}]}, {lines:[{type:'h-line'}]}, {lines:[{type:'v-line'},{type:'h-line'}]}, {containerShape:'circle', lines:[{type:'diag-tl-br'}]}, {containerShape:'circle', lines:[{type:'h-line'}]}, {containerShape:'circle', lines:[{type:'diag-tl-br'},{type:'h-line'}]}, {containerShape:'triangle'}, {containerShape:'triangle', lines:[{type:'v-line'}]}, {isQuestionMark:true} ], options: [ {containerShape:'triangle', lines:[{type:'v-line'}]}, {containerShape:'triangle', lines:[{type:'h-line'}]}, {containerShape:'triangle', lines:[{type:'diag-tl-br'}]}, {containerShape:'triangle'} ] },
    };

    function generateGroupHeaderHTML(sourceKey) {
        if (/^\d+$/.test(sourceKey)) return `<div class="passage-box">${passageTexts[sourceKey] || ''}</div>`;

        if(sourceKey.startsWith('seq') || sourceKey.startsWith('mat')){
            const visual = visualsLib[sourceKey];
            if(!visual) return '';
            if(visual.sequence) return renderSequence(visual.sequence);
            if(visual.matrix) {
                let html = renderMatrix(visual.matrix);
                if (sourceKey === 'mat8') {
                     html += `<p style="text-align:center; margin-top:1rem; font-style:italic;">This is a superposition matrix. Column 1 + Column 2 = Column 3.</p>`;
                }
                return html;
            }
            return '';
        }
        
        switch (sourceKey) {
            case 'graph1': return `<div class="chart-container"><p class="chart-title">Graph 1: Annual Production of Crude Oil (Million Barrels) by Region, 2022-2024</p><div class="bar-chart" style="--max-val: 60;"><div class="bar-group"><div style="display: flex; gap: 5px; align-items: flex-end;"><div class="bar" style="--val: 45;" data-value="45"></div><div class="bar bar-b" style="--val: 30;" data-value="30"></div></div><div class="bar-label">2022</div></div><div class="bar-group"><div style="display: flex; gap: 5px; align-items: flex-end;"><div class="bar" style="--val: 50;" data-value="50"></div><div class="bar bar-b" style="--val: 35;" data-value="35"></div></div><div class="bar-label">2023</div></div><div class="bar-group"><div style="display: flex; gap: 5px; align-items: flex-end;"><div class="bar" style="--val: 55;" data-value="55"></div><div class="bar bar-b" style="--val: 40;" data-value="40"></div></div><div class="bar-label">2024</div></div></div><ul class="pie-legend" style="justify-content:center; gap: 20px; margin-top: 20px;"><li><span style="display:inline-block; width:15px; height:15px; background:var(--primary-color); margin-right:5px; vertical-align:middle;"></span>Region A</li><li><span style="display:inline-block; width:15px; height:15px; background:var(--secondary-color); margin-right:5px; vertical-align:middle;"></span>Region B</li></ul></div>`;
            case 'table1': return `<div class="chart-container"><table><caption>Table 1: Projected Costs and Revenues for a New Plant (in Million USD)</caption><thead><tr><th>Category</th><th>Year 1</th><th>Year 2</th><th>Year 3</th></tr></thead><tbody><tr><td>Initial Investment</td><td>120</td><td>-</td><td>-</td></tr><tr><td>Operating Costs</td><td>30</td><td>32</td><td>35</td></tr><tr><td>Revenue</td><td>60</td><td>75</td><td>90</td></tr></tbody></table></div>`;
            case 'graph2': return `<div class="chart-container"><p class="chart-title">Graph 2: Quarterly Natural Gas Consumption (Billion Cubic Feet)</p><div class="svg-chart-container"><svg viewBox="0 0 100 65" style="border-left: 1px solid #aaa; border-bottom: 1px solid #aaa; padding-left: 5px; overflow:visible;"><text x="-3" y="10.5" font-size="3" text-anchor="end">20</text><text x="-3" y="35.5" font-size="3" text-anchor="end">10</text><text x="-3" y="60.5" font-size="3" text-anchor="end">0</text><polyline points="10,23 35,48 60,10.5 85,3" fill="none" stroke="#E31837" stroke-width="0.7"/><g><circle cx="10" cy="23" r="1.5" fill="#003366"/><text x="10" y="20" font-size="3" text-anchor="middle">15</text></g><g><circle cx="35" cy="48" r="1.5" fill="#003366"/><text x="35" y="54" font-size="3" text-anchor="middle">12</text></g><g><circle cx="60" cy="10.5" r="1.5" fill="#003366"/><text x="60" y="8" font-size="3" text-anchor="middle">18</text></g><g><circle cx="85" cy="3" r="1.5" fill="#003366"/><text x="85" y="0" font-size="3" text-anchor="middle">20</text></g><text x="10" y="64" font-size="4" text-anchor="middle">Q1</text><text x="35" y="64" font-size="4" text-anchor="middle">Q2</text><text x="60" y="64" font-size="4" text-anchor="middle">Q3</text><text x="85" y="64" font-size="4" text-anchor="middle">Q4</text></svg></div></div>`;
            case 'table2': return `<div class="chart-container"><table><caption>Table 2: Employee Distribution by Department and Gender</caption><thead><tr><th>Department</th><th>Male</th><th>Female</th><th>Total</th></tr></thead><tbody><tr><td>Engineering</td><td>150</td><td>70</td><td>220</td></tr><tr><td>Operations</td><td>200</td><td>50</td><td>250</td></tr><tr><td>HR</td><td>20</td><td>30</td><td>50</td></tr><tr><td>Total</td><td>370</td><td>150</td><td>520</td></tr></tbody></table></div>`;
            case 'graph3': return `<div class="chart-container"><p class="chart-title">Graph 3: Distribution of Company's Annual Budget (Total $500 Million)</p><div class="pie-chart" style="background-image: conic-gradient(#003366 0% 25%, #007bff 25% 65%, #ffc107 65% 80%, #6c757d 80% 90%, #E31837 90% 100%);"></div><ul class="pie-legend"><style>.legend-rd::before{background:#003366}.legend-ops::before{background:#007bff}.legend-mkt::before{background:#ffc107}.legend-adm::before{background:#6c757d}.legend-con::before{background:#E31837}</style><li class="legend-rd">R&D: 25%</li><li class="legend-ops">Operations: 40%</li><li class="legend-mkt">Marketing: 15%</li><li class="legend-adm">Admin: 10%</li><li class="legend-con">Contingency: 10%</li></ul></div>`;
            case 'table3': return `<div class="chart-container"><table><caption>Table 3: Safety Incidents by Type and Severity (Last Quarter)</caption><thead><tr><th>Incident Type</th><th>Minor</th><th>Moderate</th><th>Major</th><th>Total</th></tr></thead><tbody><tr><td>Slips/Trips/Falls</td><td>15</td><td>5</td><td>1</td><td>21</td></tr><tr><td>Equipment Malfunction</td><td>8</td><td>3</td><td>2</td><td>13</td></tr><tr><td>Chemical Exposure</td><td>3</td><td>2</td><td>1</td><td>6</td></tr><tr><td>Other</td><td>10</td><td>4</td><td>0</td><td>14</td></tr><tr><td>Total</td><td>36</td><td>14</td><td>4</td><td>54</td></tr></tbody></table></div>`;
            case 'graph4': return `<div class="chart-container"><p class="chart-title">Graph 4: Energy Production Mix (GWh) by Source, 2024</p><div class="bar-chart" style="--max-val: 400;"><div class="bar-group"><div class="bar" style="--val: 250; background-color: #ffc107;" data-value="250"></div><div class="bar-label">Solar</div></div><div class="bar-group"><div class="bar" style="--val: 300; background-color: #17a2b8;" data-value="300"></div><div class="bar-label">Wind</div></div><div class="bar-group"><div class="bar" style="--val: 180; background-color: #007bff;" data-value="180"></div><div class="bar-label">Hydro</div></div><div class="bar-group"><div class="bar" style="--val: 400; background-color: #6c757d;" data-value="400"></div><div class="bar-label">Fossil</div></div></div></div>`;
            case 'graph5': return `<div class="chart-container"><p class="chart-title">Graph 5: Employee Training Hours per Quarter, 2023</p><div class="svg-chart-container"><svg viewBox="0 0 100 65" style="overflow:visible;"><text x="-4" y="5.5" font-size="3" text-anchor="end">1600</text><text x="-4" y="33" font-size="3" text-anchor="end">1300</text><text x="-4" y="60.5" font-size="3" text-anchor="end">1000</text><polyline points="10,48.5 35,16.5 60,32 85,5.5" fill="none" stroke="#003366" stroke-width="0.7"/><g><circle cx="10" cy="48.5" r="1.5" fill="#E31837"/><text x="10" y="45.5" font-size="3" text-anchor="middle">1200</text></g><g><circle cx="35" cy="16.5" r="1.5" fill="#E31837"/><text x="35" y="13.5" font-size="3" text-anchor="middle">1500</text></g><g><circle cx="60" cy="32" r="1.5" fill="#E31837"/><text x="60" y="29" font-size="3" text-anchor="middle">1350</text></g><g><circle cx="85" cy="5.5" r="1.5" fill="#E31837"/><text x="85" y="3.5" font-size="3" text-anchor="middle">1600</text></g><text x="10" y="64" font-size="4" text-anchor="middle">Q1</text><text x="35" y="64" font-size="4" text-anchor="middle">Q2</text><text x="60" y="64" font-size="4" text-anchor="middle">Q3</text><text x="85" y="64" font-size="4" text-anchor="middle">Q4</text></svg></div></div>`;
            case 'table5': return `<div class="chart-container"><table><caption>Table 5: Sales Performance by Product Category (in Thousands USD), Q4 2024</caption><thead><tr><th>Product Category</th><th>Sales Revenue</th><th>Cost of Goods Sold (COGS)</th></tr></thead><tbody><tr><td>Lubricants</td><td>800</td><td>450</td></tr><tr><td>Fuels</td><td>1200</td><td>900</td></tr><tr><td>Chemicals</td><td>600</td><td>300</td></tr></tbody></table></div>`;
            default: return '';
        }
    }
    
    function renderAbstractOptions(question) {
        const visualId = question.visual_id;
        const optionsData = visualsLib[visualId]?.options;

        if (!optionsData) return '';
        
        return Object.entries(question.options).map(([key, value], index) => {
             const visualConfig = optionsData[index];
             if (!visualConfig) return '';
             const visualHTML = generateShapeBoxHTML(visualConfig);
             return `<li><label><input type="radio" name="q${question.id}" value="${key}"><span class="option-letter">${key}.</span>${visualHTML}</label></li>`;
        }).join('');
    }

    function createQuestionHTML(q, isAnswered, userAnswer) {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-container';
        questionDiv.id = `q-container-${q.id}`;
        questionDiv.dataset.id = q.id;
        questionDiv.dataset.correct = q.correctAnswer;
        
        let optionsMarkup = '';
        let listClasses = 'options-list';
        const hasVisualOptions = q.section === 'Abstract Reasoning' && visualsLib[q.visual_id]?.options;

        if(hasVisualOptions){
            optionsMarkup = renderAbstractOptions(q);
            listClasses += ' abstract-options';
        } else {
            optionsMarkup = Object.entries(q.options).map(([key, value]) => {
                const isChecked = userAnswer === key;
                return `<li><label><input type="radio" name="q${q.id}" value="${key}" ${isChecked ? 'checked' : ''}> ${key}. ${value}</label></li>`;
            }).join('');
        }

        const optionsListHTML = `<ul class="${listClasses}" role="radiogroup" aria-labelledby="q-text-${q.id}">${optionsMarkup}</ul>`;
        
        questionDiv.innerHTML = `
            <p class="question-text" id="q-text-${q.id}"><span class="q-number">${q.id}.</span> ${q.questionText}</p>
            ${optionsListHTML}
            <div class="answer-reveal">
                <button class="toggle-answer-btn" aria-expanded="false">Show Answer</button>
                <div class="explanation" role="region" style="display:none;"><p><strong>Correct Answer: ${q.correctAnswer}</strong><br>${q.explanation}</p></div>
            </div>`;
        
        if (isAnswered) {
            const optionsList = questionDiv.querySelector('.options-list');
            const inputToCheck = questionDiv.querySelector(`input[value="${userAnswer}"]`);
            if (inputToCheck) {
                 inputToCheck.checked = true;
                 const selectedLi = inputToCheck.closest('li');
                 if(selectedLi) {
                    optionsList.classList.add('disabled');
                    if (userAnswer === q.correctAnswer) {
                        selectedLi.classList.add('correct');
                    } else {
                        selectedLi.classList.add('incorrect');
                    }
                 }
            }
             const correctLi = optionsList.querySelector(`input[value="${q.correctAnswer}"]`)?.closest('li');
             if (correctLi) correctLi.classList.add('correct');
        }
        return questionDiv;
    }

    function addInteractivity(qId, saveStateCallback) {
        const container = document.getElementById(`q-container-${qId}`);
        if (!container) return;

        const toggleBtn = container.querySelector('.toggle-answer-btn');
        const explanationDiv = container.querySelector('.explanation');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const isVisible = explanationDiv.style.display === 'block';
                explanationDiv.style.display = isVisible ? 'none' : 'block';
                toggleBtn.setAttribute('aria-expanded', !isVisible);
            });
        }

        const options = container.querySelector('.options-list');
        if (options) {
            options.addEventListener('click', (e) => {
                const targetLi = e.target.closest('li');
                if (!targetLi || options.classList.contains('disabled')) return;
                const targetRadio = targetLi.querySelector('input[type="radio"]');
                if (!targetRadio) return;
                
                targetRadio.checked = true;
                options.classList.add('disabled');
                
                appState.answers[qId] = targetRadio.value;
                saveStateCallback();

                const correctAnsw = container.dataset.correct;
                if (targetRadio.value === correctAnsw) {
                    targetLi.classList.add('correct');
                } else {
                    targetLi.classList.add('incorrect');
                }
                const correctLi = options.querySelector(`input[value="${correctAnsw}"]`)?.closest('li');
                if (correctLi) correctLi.classList.add('correct');
            });
        }
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
            const sourceKey = q.passage_id || q.data_source_id || q.visual_id || `q-${q.id}`;
            if (!questionGroups[sourceKey]) questionGroups[sourceKey] = [];
            questionGroups[sourceKey].push(q);
        });

        const sortedKeys = Object.keys(questionGroups).sort((a, b) => {
            const firstIdA = questionGroups[a][0].id;
            const firstIdB = questionGroups[b][0].id;
            return firstIdA - firstIdB;
        });

        for (const sourceKey of sortedKeys) {
            const groupContainer = document.createElement('div');
            groupContainer.className = 'source-group';
            
            const headerHTML = generateGroupHeaderHTML(sourceKey);
            if (headerHTML) {
                 groupContainer.innerHTML += headerHTML;
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

        sectionQuestions.forEach(q => addInteractivity(q.id, () => saveState(sectionName)));
        window.scrollTo({ top: 0, behavior: 'auto' });
    }
    
    function startTimer(durationInMinutes, remainingTime) {
        clearInterval(appState.currentTimer);
        let time = remainingTime !== undefined ? remainingTime : durationInMinutes * 60;
        
        const update = () => {
            const minutes = Math.floor(time / 60).toString().padStart(2, '0');
            const seconds = (time % 60).toString().padStart(2, '0');
            timerDisplay.textContent = `${minutes}:${seconds}`;

            if (time % 5 === 0) {
                saveState(appState.currentSection, time);
            }
            
            time--;

            if (time < 0) {
                clearInterval(appState.currentTimer);
                timerDisplay.textContent = "00:00";
                alert("Time's up for this section!");
                contentArea.querySelectorAll('.options-list').forEach(list => list.classList.add('disabled'));
                contentArea.querySelectorAll('.toggle-answer-btn').forEach(btn => btn.disabled = true);
            }
        };

        if (time >= 0) {
            update();
            appState.currentTimer = setInterval(update, 1000);
        } else {
             timerDisplay.textContent = "00:00";
             contentArea.querySelectorAll('.options-list').forEach(list => list.classList.add('disabled'));
             contentArea.querySelectorAll('.toggle-answer-btn').forEach(btn => btn.disabled = true);
        }
    }

    function saveState(sectionName, time) {
        if (!sectionName) return;
        const stateToSave = {
            section: sectionName,
            answers: appState.answers,
            time: time,
        };
        sessionStorage.setItem('testProgress', JSON.stringify(stateToSave));
    }

    function loadState(sectionName) {
        const savedState = JSON.parse(sessionStorage.getItem('testProgress'));
        if (savedState && savedState.section === sectionName) {
            appState.answers = savedState.answers || {};
            startTimer(sectionConfig[sectionName].time, savedState.time);
        } else {
            appState.answers = {};
            sessionStorage.removeItem('testProgress');
            startTimer(sectionConfig[sectionName].time);
        }
        appState.currentSection = sectionName;
    }
    
    function clearState() {
        sessionStorage.removeItem('testProgress');
        appState.answers = {};
        appState.currentSection = null;
        clearInterval(appState.currentTimer);
        timerDisplay.textContent = '00:00';
    }

    function handleNavClick(e) {
        e.preventDefault();
        const sectionName = e.target.dataset.section;
        if (!appState.dataLoaded || sectionName === appState.currentSection) return;
        
        if (appState.currentSection && appState.currentSection !== sectionName) {
            if (confirm(`Are you sure you want to start the '${sectionName}' section?\n\nThe timer and answers for your current section will be cleared.`)) {
                clearState();
                displaySection(sectionName);
            }
        } else {
            clearState();
            displaySection(sectionName);
        }
    }

    function init() {
        fetch('data/questions.json')
            .then(response => { if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`); return response.json(); })
            .then(data => {
                allQuestions = data;
                appState.dataLoaded = true;
                navButtons.forEach(btn => { btn.disabled = false; });
                const welcomeText = welcomeScreen.querySelector('p:last-of-type');
                if(welcomeText) welcomeText.textContent = "Click a section above to begin. Good luck!";

                const savedState = JSON.parse(sessionStorage.getItem('testProgress'));
                if (savedState && savedState.section && sectionConfig[savedState.section]) {
                    if (confirm(`You have a saved session for "${savedState.section}". Would you like to resume?`)) {
                        displaySection(savedState.section);
                    } else {
                        clearState();
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
                const retryButton = document.createElement('button');
                retryButton.textContent = "Retry";
                retryButton.onclick = init;
                welcomeScreen.innerHTML = `<p style="color:red;">Failed to load test questions. Please check your connection and try again.</p>`;
                welcomeScreen.appendChild(retryButton);
            });
    }

    if(backToTopBtn) {
        window.addEventListener('scroll', () => { backToTopBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none'; });
        backToTopBtn.addEventListener('click', (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }

    navButtons.forEach(button => {
        button.addEventListener('click', handleNavClick);
        button.disabled = true;
    });

    init();
});
