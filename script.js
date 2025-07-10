// DOM 元素獲取
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const progressText = document.getElementById('progress-text');

// 結果顯示元素
const pathwayName = document.getElementById('pathway-name');
const pathwayHonorific = document.getElementById('pathway-honorific');
const pathwayPhilosophy = document.getElementById('pathway-philosophy');
const pathwayProfile = document.getElementById('pathway-profile');
const pathwayAbilities = document.getElementById('pathway-abilities');

let currentQuestionIndex = 0;
let pathwayScores = {};

// 測驗問題數據庫 (完整10題版)
const questions = [
    {
        question: "在深夜的貝克蘭德街頭，你目睹了一場非凡者之間的短暫衝突。一方逃離後，在原地留下了一本神秘的筆記。你會？",
        answers: [
            { text: "立即拾起筆記並迅速離開，找個安全的地方研究其中的秘密。", scores: { '隱者': 3, '學徒': 2, '愚者': 1 } },
            { text: "保持距離，暗中觀察，等待官方非凡者前來處理，並記錄下他們的行為模式。", scores: { '觀眾': 3, '審訊官': 1 } },
            { text: "認為這是個陷阱，或是與己無關的麻煩，選擇直接忽略並繞道而行。", scores: { '審訊官': -1, '愚者': -1 } },
            { text: "走上前去，用腳尖輕輕翻開筆記，只想滿足瞬間的好奇心，看看裡面寫了什麼。", scores: { '偷盜者': 2, '魔女': 1 } }
        ]
    },
    {
        question: "你所在的團隊接到一項任務，需要從一個戒備森嚴的貴族莊園中獲取一份機密文件。你的首選策略是？",
        answers: [
            { text: "策劃一場完美的潛入，利用莊園的防禦漏洞，像幽靈一樣進出，不留下一絲痕跡。", scores: { '學徒': 3, '偷盜者': 2 } },
            { text: "創造混亂。在城市另一端引發一場不大不小的騷動，調開大部分守衛力量，然後趁虛而入。", scores: { '暴君': 2, '愚者': 2, '魔女': 1 } },
            { text: "利用社交手腕和偽裝，製造一個合理的身份混入莊園的晚宴，在眾目睽睽之下巧妙地竊取文件。", scores: { '愚者': 3, '觀眾': 2 } },
            { text: "進行詳盡的外部勘察與情報收集，制定多套應變計畫，確保無論發生何種意外，團隊都能全身而退。", scores: { '觀眾': 3, '審訊官': 2, '隱者': 1 } }
        ]
    },
    {
        question: "你發現了一種可以穩定帶來財富，但會讓使用者逐漸喪失情感的非凡儀式。你會？",
        answers: [
            { text: "堅決抵制並想辦法銷毀所有相關知識，認為這種力量違反了人性的基本法則。", scores: { '審訊官': 3, '暴君': -1 } },
            { text: "自己謹慎地使用，嚴格控制劑量和頻率，將其視為達成更高目標的必要工具。", scores: { '偷盜者': 3, '隱者': 2 } },
            { text: "將這個儀式「改良」後，匿名傳播出去，觀察它對社會造成的影響，以此作為一項有趣的實驗。", scores: { '愚者': 3, '魔女': 2, '觀眾': 1 } },
            { text: "利用這個秘密，去控制那些已經使用過儀式並身居高位的人，讓他們為你服務。", scores: { '偷盜者': 2, '暴君': 2, '觀眾': 1 } }
        ]
    },
    {
        question: "面對一個看似無解的古老謎團，你的研究方法更傾向於？",
        answers: [
            { text: "泡在圖書館和檔案館裡，從浩如煙海的歷史文獻和被人遺忘的記錄中尋找蛛絲馬跡。", scores: { '隱者': 3, '觀眾': 1 } },
            { text: "透過占卜、靈視等神秘學手段，直接向未知的存在或命運本身尋求啟示。", scores: { '愚者': 3, '學徒': 1 } },
            { text: "建立一個邏輯模型，將所有已知碎片放入其中，透過嚴密的推理和假設來填補空白。", scores: { '觀眾': 2, '審訊官': 2 } },
            { text: "親自前往與謎團相關的古老遺蹟探險，相信直覺和現場的感受會引導你找到答案。", scores: { '學徒': 2, '暴君': 1 } }
        ]
    },
    {
        question: "當你獲得強大的力量後，你認為最理想的狀態是？",
        answers: [
            { text: "成為秩序的化身，制定並執行絕對公正的規則，讓世界在你的掌控下穩定運行。", scores: { '審訊官': 3, '暴君': 2 } },
            { text: "隱於幕後，像操縱木偶一樣影響世界的走向，享受那種不為人知的全能感。", scores: { '愚者': 3, '觀眾': 3, '偷盜者': 1 } },
            { text: "隨心所欲，不受任何束縛，體驗生命中的一切可能性，無論是好是壞。", scores: { '魔女': 3, '偷盜者': 2, '學徒': 1 } },
            { text: "保護自己關心的人和社區，建立一個能讓他們安居樂業的庇護所。", scores: { '暴君': 1, '審訊官': 1 } }
        ]
    },
    {
        question: "在一次公開演講或辯論中，你最有可能扮演的角色是？",
        answers: [
            { text: "冷靜的分析者，用數據和邏輯指出對方言論中的每一個漏洞。", scores: { '觀眾': 3, '審訊官': 2, '隱者': 1 } },
            { text: "富有魅力的煽動者，用激情和極具感染力的語言引導聽眾的情緒。", scores: { '暴君': 2, '魔女': 2 } },
            { text: "沉默的觀察者，在人群中洞悉每個人的真實想法和派系關係。", scores: { '觀眾': 3, '愚者': 1 } },
            { text: "意外的攪局者，在關鍵時刻提出一個離題但卻能顛覆整個討論前提的問題。", scores: { '愚者': 3, '偷盜者': 2 } }
        ]
    },
    {
        question: "如果可以，你希望獲得以下哪種知識？",
        answers: [
            { text: "理解宇宙終極真理的物理學和數學定律。", scores: { '隱者': 3 } },
            { text: "看穿任何人謊言、洞悉其內心深處動機的心理學知識。", scores: { '觀眾': 3, '審訊官': 1 } },
            { text: "所有失落文明的歷史和其魔法系統的完整記錄。", scores: { '隱者': 2, '愚者': 2 } },
            { text: "預知未來股市波動和所有賭局結果的概率學方法。", scores: { '偷盜者': 3, '學徒': 1 } }
        ]
    },
    {
        question: "你偶然獲得了一件強大的封印物，但它會持續對周圍環境造成輕微的負面影響。你會？",
        answers: [
            { text: "將其上交給教會或官方組織，相信他們有更專業的方法來處理。", scores: { '審訊官': 3 } },
            { text: "嘗試自己研究和控制它，希望能將其轉化為自己的力量。", scores: { '隱者': 3, '學徒': 2 } },
            { text: "將其藏在一個無人知曉的地方，確保它既不會傷害別人，也不會被他人奪走。", scores: { '愚者': 1, '觀眾': 1 } },
            { text: "把它當作一個燙手山芋，用巧妙的手段讓它「意外」地轉移到你的敵人手中。", scores: { '偷盜者': 3, '愚者': 2, '魔女': 1 } }
        ]
    },
    {
        question: "你對「美」的定義更接近於？",
        answers: [
            { text: "宏偉的建築、精密的機械和對稱的幾何圖形所展現的秩序之美。", scores: { '審訊官': 3, '暴君': 1 } },
            { text: "稍縱即逝的巧合、命運的奇妙邂逅和不可預測的變化之美。", scores: { '愚者': 3, '偷盜者': 1 } },
            { text: "隱藏在悲劇、痛苦和毀滅中所展現出的那種深刻而強烈的情感之美。", scores: { '魔女': 3 } },
            { text: "大自然中生命的循環、萬物的生長與繁衍所體現的原始之美。", scores: { '學徒': 1 } }
        ]
    },
    {
        question: "一位你信任的朋友向你坦白，他為了復仇，準備策劃一場會傷及無辜的襲擊。你會？",
        answers: [
            { text: "試圖用言語和邏輯說服他放棄，向他分析此舉的利弊和道德後果。", scores: { '觀眾': 3, '審訊官': 1 } },
            { text: "暗中破壞他的計畫，同時不讓他發現是你在干預，以保護無辜者和你朋友的安全。", scores: { '愚者': 3, '偷盜者': 1 } },
            { text: "尊重他的選擇，但會在他行動時，盡自己所能將無辜者的傷亡降到最低。", scores: { '魔女': 1, '暴君': 1 } },
            { text: "直接將他制服並移交給官方，認為這是阻止更大悲劇發生的最有效方法。", scores: { '審訊官': 3, '暴君': 2 } }
        ]
    }
];

// 途徑結果數據庫 (完整8種途徑檔案)
const pathwayData = {
    '愚者': {
        name: "愚者 (The Fool)",
        honorific: "「不屬於這個時代的愚者；灰霧之上的神秘主宰；執掌好運的黃黑之王。」",
        philosophy: "世界是一個巨大的舞台，歷史是可以被任意編排的劇本，而變化與欺騙是撬動現實的槓桿。愚者途徑的精髓在於「扮演」，他們是天生的演員、導演和騙子，相信一切皆可被「嫁接」，一切現實皆可被「愚弄」。他們在幕後操縱著命運的絲線，享受著將不可能變為可能的智力快感。",
        profile: "你是一個極富想像力和創造力的人，善於從混亂中看到機會。你可能不喜歡循規蹈矩，更偏愛用非傳統的、甚至是狡詐的手段來解決問題。你享受掌控資訊的感覺，並能巧妙地引導他人，讓他們在不知不覺中按照你的意願行事。你對歷史、神秘學和象徵符號有著濃厚的興趣，並相信表象之下必有更深層的真實。",
        abilities: "靈體線的操控、火焰跳躍、空氣彈、占卜、召喚歷史孔隙中的影像、製造幻覺。"
    },
    '觀眾': {
        name: "觀眾 (Spectator)",
        honorific: "（暫無廣為流傳的尊名）",
        philosophy: "旁觀者清。真正的力量來自於深刻的理解，而非粗暴的干涉。觀眾途徑的非凡者是天生的心理學家、觀察者和分析師。他們能在紛繁複雜的人際關係和社會現象中，精準地洞察到最核心的驅動力和最隱秘的動機。他們追求的是精神層面的全知，透過觀察和引導來達成目的。",
        profile: "你是一個內斂、冷靜且極具洞察力的人。你習慣於在人群中保持沉默，默默觀察周遭的一切。你對他人的情緒和心理狀態非常敏感，能夠輕易看穿謊言和偽裝。你做決定前總會進行周密的分析，不喜歡衝動行事。你可能不善於成為焦點，但你享受那種作為「幕後智者」的感覺。",
        abilities: "心理學催眠、安抚情緒、威懾心靈、讀心、心理暗示、構建虛擬人格。"
    },
    '偷盜者': {
        name: "偷盜者 (Marauder)",
        honorific: "（暫無廣為流傳的尊名）",
        philosophy: "規則就是用來打破的，漏洞就是用來利用的。世界充滿了可以被「竊取」的概念，包括思想、命運、甚至是非凡能力。偷盜者是機會主義者和混亂的信徒，他們在規則的邊緣跳舞，享受著利用系統漏洞為自己牟利的刺激感。他們相信，只要手段足夠高明，一切皆可為我所用。",
        profile: "你是一個聰明、靈活且極具反叛精神的人。你討厭被規則束縛，並總能找到繞過規則的方法。你思維敏捷，善於發現他人忽略的機會和漏洞。你可能有些玩世不恭，喜歡惡作劇和挑戰權威。對你而言，過程中的智力博弈和成功後的成就感，遠比行為本身的道德評判更重要。",
        abilities: "竊取思想、竊取非凡能力（短時間）、製造巧合、尋找漏洞、欺詐、誤導。"
    },
    '審訊官': {
        name: "審訊官 (Justiciar)",
        honorific: "（暫無廣為流傳的尊名）",
        philosophy: "秩序是文明的基石，規則是維護秩序的唯一工具。審訊官途徑的非凡者是法律和秩序的堅定捍衛者。他們相信，一個穩定、可預測的社會，需要一套嚴格且不容挑戰的規則體系。他們的力量來自於「宣告」和「禁止」，將抽象的規則具現化為不可違逆的現實。",
        profile: "你是一個有條理、有原則且追求公平正義的人。你相信凡事都應有規矩，並對破壞規則的行為深惡痛絕。你做事嚴謹，注重細節和流程，有著強烈的責任感。你可能顯得有些刻板或不近人情，但你的內心深處懷揣著建立一個更美好、更有序世界的理想。",
        abilities: "發現弱點、賄賂、宣告（某項規則在小範圍內生效）、禁止（某項行為在小範圍內被阻止）、秩序之手。"
    },
    '學徒': {
        name: "學徒 (Apprentice)",
        honorific: "（暫無廣為流傳的尊名）",
        philosophy: "空間是自由的疆域，知識是探索的鑰匙。學徒途徑的核心是對空間的理解和應用。他們是天生的旅行者、探險家和魔術師。他們能夠穿梭於常人無法企及的領域，打開任何封鎖的門扉。對他們而言，物理的障礙和距離的限制都是可以被超越的幻象。",
        profile: "你是一個充滿好奇心、熱愛自由且不喜歡被束縛的人。你對未知的事物和神秘的現象有著強烈的探索慾。你可能不喜歡長時間待在同一個地方，享受旅行和冒險帶來的樂趣。你足智多謀，總能找到意想不到的方法來解決困難，尤其擅長「逃脫」困境。",
        abilities: "開門、穿牆、記錄（複製他人非凡能力）、星象占卜、製造霧氣、閃現（短距離傳送）。"
    },
    '暴君': {
        name: "暴君 (Tyrant)",
        honorific: "（暫無廣為流傳的尊名）",
        philosophy: "力量即真理。在狂暴的風暴和雷霆面前，一切計謀和規則都顯得蒼白無力。暴君途徑的非凡者崇尚最純粹、最直接的力量。他們是海洋的霸主，風暴的化身，用無可匹敵的威勢來征服一切。他們堅信，絕對的力量能帶來絕對的權威。",
        profile: "你是一個果斷、強勢且充滿自信的人。你喜歡用直接的方式解決問題，不屑於使用陰謀詭計。你有著強烈的領導慾和控制慾，希望他人能夠服從你的意志。在壓力之下，你不但不會退縮，反而會變得更加堅韌和富有攻擊性。你享受站在權力頂峰、俯瞰眾生的感覺。",
        abilities: "駕馭風浪、雷電打擊、水下呼吸、水箭、製造風暴、超強的體魄。"
    },
    '魔女': {
        name: "魔女 (Demoness)",
        honorific: "（暫無廣為流傳的尊名）",
        philosophy: "痛苦、恐懼和絕望是世界上最深刻、最真實的情感，也是最強大的力量源泉。魔女途徑的非凡者是災難和痛苦的散播者。她們擅長利用人性的弱點，製造恐慌和瘟疫，從中汲取力量。對她們而言，美麗與致命往往是一體兩面，誘惑是通往毀滅的捷徑。",
        profile: "你可能是一個情感強烈、敢愛敢恨的人，對事物的感受比常人更為深刻。你懂得如何利用自身的魅力來達成目的，並且不畏懼使用一些會引起他人不適的手段。你可能對傳統的道德觀念持懷疑態度，認為在極端的環境下，生存和勝利才是最重要的。",
        abilities: "散播疾病、製造恐慌、鏡子替身、冰霜或火焰法術、魅惑、詛咒。"
    },
    '隱者': {
        name: "隱者 (Hermit)",
        honorific: "（暫無廣為流傳的尊名）",
        philosophy: "知識本身就是力量，宇宙的奧秘隱藏在符號、星辰和魔法的深處。隱者途徑的非凡者是純粹的學者和神秘學家。他們畢生追求對世界本質的理解，沉浸在知識的海洋中。他們的力量來自於對魔法和自然法則的深刻洞悉，能夠編織出複雜而強大的法術。",
        profile: "你是一個求知慾極強、熱愛思考和研究的人。你享受獨處，認為社交活動會浪費你寶貴的時間。你對哲學、科學或神秘學等高深領域有著濃厚的興趣。你可能不善言辭，但你的內心世界極為豐富。你相信，只要掌握了足夠的知識，就能解決任何問題。",
        abilities: "魔法書、法術解析、元素召喚、知識竊取、符文魔法、構建神秘學環境。"
    }
};

// 初始化所有可能的途徑分數
function initializeScores() {
    pathwayScores = {};
    for (const key in pathwayData) {
        pathwayScores[key] = 0;
    }
}

// 開始測驗
function startQuiz() {
    currentQuestionIndex = 0;
    initializeScores();
    welcomeScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    showQuestion();
}

// 顯示問題
function showQuestion() {
    resetState();
    const question = questions[currentQuestionIndex];
    questionText.innerText = question.question;
    progressText.innerText = `問題 ${currentQuestionIndex + 1} / ${questions.length}`;

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
}

// 清理上一題的按鈕
function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// 選擇答案並計分
function selectAnswer(answer) {
    for (const pathway in answer.scores) {
        if (pathwayScores.hasOwnProperty(pathway)) {
            pathwayScores[pathway] += answer.scores[pathway];
        }
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// 顯示最終結果
function showResult() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    // 找出得分最高的途徑
    let maxScore = -Infinity;
    let resultPathway = '';
    for (const pathway in pathwayScores) {
        if (pathwayScores[pathway] > maxScore) {
            maxScore = pathwayScores[pathway];
            resultPathway = pathway;
        }
    }
    
    // 如果沒有任何分數（理論上不可能），則給一個預設結果
    if (!resultPathway ||!pathwayData[resultPathway]) {
        resultPathway = '愚者'; 
    }

    const data = pathwayData[resultPathway];
    pathwayName.innerText = data.name;
    pathwayHonorific.innerText = data.honorific;
    pathwayPhilosophy.innerText = data.philosophy;
    pathwayProfile.innerText = data.profile;
    pathwayAbilities.innerText = data.abilities;
}

// 事件監聽
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', startQuiz);