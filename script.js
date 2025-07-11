document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const quizIntro = document.getElementById('quiz-intro');
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');
    const questionText = document.getElementById('question-text');
    const answerButtons = document.getElementById('answer-buttons');
    const progressBar = document.getElementById('progress-bar');

    // Result display elements
    const resultPathwayName = document.getElementById('result-pathway-name');
    const resultPrevalence = document.getElementById('result-prevalence');
    const resultPersonality = document.getElementById('result-personality');
    const resultAbilities = document.getElementById('result-abilities');

    let currentQuestionIndex = 0;
    let scores = {};

    // Data for the 22 pathways
    const pathways = {
        seer: { 
            name: "占卜家 (Seer)",
            prevalence: "人群佔比：約4%",
            personality: "你天生謹慎，習慣於在行動前進行周密的規劃與預演。你對世界的認知並非非黑即白，而是充滿了變數與可能性。你享受隱藏在幕後，透過精巧的佈局引導事態發展，而非親身涉險。你對神秘事物有著強烈的好奇心，但同時也保持著敬畏。面對困境，你會以幽默和表演來掩飾真實的情緒，如同一個戴著微笑面具的小丑，在命運的舞台上堅韌地演出。你的內心深處，是對人性的深刻洞察和一份不願捨棄的溫情，這是在神性侵蝕下，你賴以維持自我的最後壁壘。",
            abilities: "你的能力圍繞「變化」與「欺騙」。從占卜預測、靈性直覺，到變化容貌的「無面人」，再到操縱他人命運絲線的「秘偶大師」，最終能夠愚弄規則、歷史乃至概念本身。"
        },
        marauder: {
            name: "偷盜者 (Marauder)",
            prevalence: "人群佔比：約2%",
            personality: "你是一個天生的機會主義者，善於發現規則中的漏洞並加以利用。你思維敏捷，行事果斷，對目標有著極強的執著。你不相信絕對的所有權，認為一切事物都在流轉之中，而你有能力加速這個過程。欺騙與詐術是你的第二天性，你享受將他人玩弄於股掌之間的智力快感。然而，你的內心深處可能隱藏著對權威的蔑視和對自由的極度渴望，盜竊不僅是手段，更是對既定秩序的一種反抗。",
            abilities: "你的能力是「盜竊」概念的極致延伸。從偷取實物，到竊取思想的「竊夢家」，再到寄生他人、盜用身份的「寄生者」，最終甚至能盜走時間、竊取權柄、在邏輯層面製造「錯誤」。"
        },
        apprentice: {
            name: "學徒 (Apprentice)",
            prevalence: "人群佔比：約3%",
            personality: "你對世界充滿了探索欲，渴望遊歷四方，見證不同的風景與奇蹟。你討厭被束縛在一個地方，認為自由移動是生命的基本權利。你擁有出色的記憶力和學習能力，善於記錄和複製你所見到的知識與力量。你並非一個好鬥之人，更傾向於利用靈活的機動性來避免衝突。你對空間和星辰有著特殊的親和感，相信在可見的世界之外，還存在著更廣闊的領域等待探索。",
            abilities: "你的能力核心是「空間」與「記錄」。你可以輕易穿梭門窗，進行短距離的「旅行」，記錄並複製他人的非凡能力，最終打開通往任何地方的「門」，在星界中漫遊。"
        },
        spectator: {
            name: "觀眾 (Spectator)",
            prevalence: "人群佔比：約6%",
            personality: "你習慣於保持距離，冷靜地觀察周圍的人和事。你擁有極強的同理心和洞察力，能夠輕易看穿他人的謊言和真實意圖。你對複雜的人際關係和群體心理有著濃厚的興趣，並能巧妙地引導和操縱它們。你內心世界豐富，時常沉浸在自己的思緒和構想中。對你而言，世界就像一場宏大的戲劇，而你既是觀眾，也是能在幕後修改劇本的導演。",
            abilities: "你的能力是心靈層面的。從「讀心」，到「心理醫生」的治療與暗示，再到構建真實夢境的「織夢人」，最終能將想像化為現實，成為「空想家」。"
        },
        sun: {
            name: "歌頌者 (Sun)",
            prevalence: "人群佔比：約7%",
            personality: "你充滿正義感，性格坦蕩，厭惡一切陰暗與邪惡。你天生具有領袖氣質，能夠鼓舞人心，讓周圍的人團結在你身邊。你堅信秩序、公平和榮耀，並願意為此付出一切。你行事光明正大，不屑於使用陰謀詭計。你的存在本身就能給人帶來溫暖和安全感，是天生的團隊核心和精神支柱。",
            abilities: "你的能力與「光明」、「淨化」、「驅邪」息息相關。你能製造光和熱，治癒同伴，對亡靈和墮落生物造成巨大傷害，並能通過演說鼓舞士氣，最終化身為普照萬物的「太陽」。"
        },
        sailor: {
            name: "水手 (Sailor)",
            prevalence: "人群佔比：約7%",
            personality: "你的性格暴烈直接，充滿攻擊性。你崇尚力量，相信絕對的權威來自於壓倒性的實力。你享受征服和破壞帶來的快感，面對挑戰時從不退縮。你的情緒如同風暴一般，來得快去得也快，但爆發時具有毀滅性的力量。在你的世界裡，規則由強者制定，而你立志成為最強者。你對海洋有著特殊的感情，視其為力量的源泉和征服的疆域。",
            abilities: "你的能力是純粹的破壞與征服。駕馭風、雷、雨、電，掀起海嘯，召喚天災，你的力量是自然偉力的直接體現，充滿了壓迫感和毀滅性。"
        },
        reader: {
            name: "閱讀者 (Reader)",
            prevalence: "人群佔比：約6%",
            personality: "你是一個典型的學者，對知識有著無盡的渴求。你善於推理、分析和總結，享受從紛繁複雜的線索中找出真相的過程。你相信知識就是力量，通過學習和研究可以掌握世間萬物的規律。你沉穩、內斂，不喜張揚，更願意在圖書館或實驗室中度過時光。你對神秘學有著極高的天賦，能夠洞悉事物背後的隱秘聯繫。",
            abilities: "你的能力與知識和預言息息相關。從強化學習能力的「閱讀者」，到精通邏輯的「偵探」，再到掌握秘術的「秘術導師」，最終能夠窺視未來，通曉萬物，成為知識的化身「白塔」。"
        },
        secret_suppliant: {
            name: "秘祈人 (Secret Suppliant)",
            prevalence: "人群佔比：約3%",
            personality: "你有著強烈的自我犧牲精神，願意為了某個崇高的目標或守護他人而承受巨大的痛苦。你內斂、隱忍，不善於表達自己的情感，習慣將苦難埋藏在心底。你對人性的墮落和掙扎有著深刻的理解，並試圖從中尋找救贖的可能。你常常被誤解，背負著不屬於自己的惡名，但你依然堅持自己的道路。你的力量源於墮落與獻祭，行走在神聖與污穢的邊緣。",
            abilities: "你的能力充滿了詭異的自我獻祭色彩。通過承受傷害來換取力量，將自身或他人「牧養」成強大的怪物，最終成為一個需要被獻祭才能展現力量的「倒吊人」。"
        },
        sleepless: {
            name: "不眠者 (Sleepless)",
            prevalence: "人群佔比：約7%",
            personality: "你習慣於在黑夜中保持清醒，對黑暗有著天然的親和力。你沉靜、穩重，有著超乎常人的耐心和毅力。你能夠看到並與靈體溝通，對死亡和亡者抱有敬畏之心。你是一個天生的守護者，致力於維護生與死的界限，抵禦來自黑暗的侵蝕。你享受孤獨，在寂靜中能找到內心的平靜與力量。你對夢境和秘密有著特殊的掌控力。",
            abilities: "你的能力與黑夜、靈體和夢境緊密相連。你可以在黑暗中獲得力量，命令亡魂，製造噩夢，安撫死者，最終執掌黑夜與寂靜的權柄。"
        },
        corpse_collector: {
            name: "收屍人 (Corpse Collector)",
            prevalence: "人群佔比：約2%",
            personality: "你對死亡有著深刻而冷靜的理解，將其視為生命循環的必然一環，而非恐懼的對象。你莊重、嚴肅，行事一絲不苟。你尊重逝者，並致力於讓他們得到應有的安息。你看淡生死離別，情緒穩定，很難被外界事物動搖。你相信終結是平等的，無論是帝王還是乞丐，在死亡面前都將歸於塵土。你的使命是引導亡魂，看守冥界之門。",
            abilities: "你的能力圍繞「死亡」權柄。你可以與死者溝通，操縱屍體，宣告死亡，凋零生命，最終化身為「死神」，執掌萬物的終結。"
        },
        warrior: {
            name: "戰士 (Warrior)",
            prevalence: "人群佔比：約7%",
            personality: "你崇尚武力，相信戰鬥是解決問題最直接有效的方式。你勇敢、堅毅，擁有鋼鐵般的意志和永不言敗的精神。你追求純粹的力量和速度，享受在戰鬥中不斷突破自我的感覺。你忠誠、可靠，是戰友最值得信賴的後盾。你或許不善言辭，但會用行動來證明自己的價值和榮耀。你渴望在戰場上證明自己，直至生命最後一刻。",
            abilities: "你的能力是純粹的肉體強化與戰鬥技巧。超凡的力量、速度、防禦力和恢復能力，以及對武器的精通，讓你成為戰場上的絞肉機。高序列時更能化身為頂天立地的巨人。"
        },
        hunter: {
            name: "獵人 (Hunter)",
            prevalence: "人群佔比：約4%",
            personality: "你是一個天生的獵手，但你享受的並非一擊斃命，而是通過不斷的挑釁、佈置陷阱來激怒和削弱獵物的過程。你極富耐心，善於觀察和等待最佳時機。你好鬥、富有侵略性，渴望通過戰爭和征服來證明自己的價值。你善於煽動情緒，製造混亂，並在混亂中攫取利益。你相信勝利高於一切，並會不擇手段地去爭取它。",
            abilities: "你的能力與「火焰」、「戰爭」和「挑釁」相關。你精通陷阱和各種武器，能夠操縱火焰，煽動戰爭，並在戰場上獲得巨大的加成。最終目標是成為點燃戰火的「紅祭司」。"
        },
        demoness: {
            name: "魔女 (Demoness)",
            prevalence: "人群佔比：約1%",
            personality: "你對人性的痛苦和絕望有著異乎尋常的敏感和興趣。你享受製造災難和散播恐懼的過程，並從中汲取力量。你極具魅力，能夠輕易地誘惑和操縱他人，讓他們為你服務，最終走向毀滅。你的情緒冷漠，將他人的痛苦視為悅耳的音樂。你認為美麗與災禍並存，極致的絕望中蘊含著別樣的美感。你的存在本身就是一場災難。",
            abilities: "你的能力圍繞「災禍」、「痛苦」和「魅惑」。你可以散播瘟疫、製造不幸、施加惡毒的詛咒，並通過美貌和媚藥控制人心。高序列時更能引發天災級別的毀滅。"
        },
        hermit: {
            name: "窺秘人 (Hermit)",
            prevalence: "人群佔比：約3%",
            personality: "你對世界充滿敬畏，深信在可見的表象之下隱藏著無數秘密。你是一個謹慎的探索者，渴望窺探神秘，但又深知其危險性，信奉「節制是美德」。你沉迷於魔法、巫術、煉金術等各種神秘學知識，並享受將其系統化、理論化的過程。你喜歡獨處，在安靜的環境中進行研究和實驗。你相信知識本身就是一種力量，也是一種需要小心對待的詛咒。",
            abilities: "你的能力是典型的法師類型。你掌握全面的神秘學知識，能夠施展各種複雜的法術和儀式，製作魔法卷軸和物品，並在高序列時能夠預言未來，成為通曉萬物奧秘的「隱匿賢者」。"
        },
        paragon: {
            name: "通識者 (Paragon)",
            prevalence: "人群佔比：約5%",
            personality: "你對世界的運行規律有著強烈的好奇心，並試圖用自己的雙手去解析和改造它。你是一個天生的發明家和工程師，相信通過技術可以解決一切問題。你動手能力極強，善於製造各種精密的機械和鍊金物品。你追求效率和實用性，對虛無縹緲的哲學不感興趣。你相信文明的進步源於技術的革新，並致力於成為那個推動齒輪轉動的人。",
            abilities: "你的能力是將知識轉化為實物的「鍊金術」和「工程學」。你可以製造出從槍械大砲到鍊金傀儡，乃至於更為神奇的物品。高序列時甚至可以手搓核爆，解析並修改物理規則。"
        },
        assassin: {
            name: "刺客 (Assassin)",
            prevalence: "人群佔比：約1%",
            personality: "你的行為被原始的慾望所驅動——食慾、色慾、權力慾。你冷酷、殘忍，為了滿足自己的慾望可以不擇手段。你善於偽裝和潛伏，在暗中觀察獵物，並在最意想不到的時刻發動致命一擊。你對他人的痛苦缺乏共情，甚至會從中感到愉悅。你認為道德和秩序是虛偽的，只有最原始的慾望才是真實的。你行走在墮落的邊緣，並逐漸沉溺其中。",
            abilities: "你的能力與「慾望」和「墮落」相關。你擁有超凡的隱匿和刺殺技巧，能夠引誘他人墮落，並在高序列時化身為惡魔，操縱慾望，最終成為混亂的「深淵」。"
        },
        prisoner: {
            name: "囚犯 (Prisoner)",
            prevalence: "人群佔比：小於1%",
            personality: "你的世界充滿了束縛和痛苦，無論是來自外界的壓迫，還是內心的枷鎖。你長期處於壓抑和瘋狂的邊緣，精神狀態極不穩定。你渴望掙脫束縛，但這種渴望本身又會給你帶來更大的痛苦。你對痛苦有著極強的承受力，甚至能從中汲取力量。你的行為常常是非理性的，充滿了破壞性和自毀傾向。你感覺自己像一個被無形鎖鏈捆綁的囚徒，在絕望中掙扎。",
            abilities: "你的能力源於「束縛」和「痛苦」。你可以製造無形的枷鎖，讓敵人陷入瘋狂，並在自身承受痛苦時爆發出更強的力量。高序列時，你本身就是一個移動的瘋狂源頭。"
        },
        lawyer: {
            name: "律師 (Lawyer)",
            prevalence: "人群佔比：約3%",
            personality: "你對規則和秩序有著深刻的理解，但你關注的並非其神聖性，而是其中的漏洞和可利用之處。你口才出眾，邏輯嚴密，善於通過辯論和法律條文來達成自己的目的。你表面上維護秩序，但實際上卻是秩序最大的破壞者，因為你總能找到方法扭曲規則，使其為你服務。你冷靜、理智，極少情緒化，一切以利益為導向。",
            abilities: "你的能力是「規則」的具現化。你可以通過語言「宣告」某些規則的生效或失效，利用法律漏洞剝奪他人的能力，並在高序列時制定屬於自己的法律，成為區域內的「仲裁人」。"
        },
        criminal: {
            name: "罪犯 (Criminal)",
            prevalence: "人群佔比：約1%",
            personality: "你天生反感一切現存的秩序和法律，並以踐踏和扭曲它們為樂。你是一個天生的煽動家和陰謀家，善於利用他人的不滿和社會的矛盾來製造混亂。你富有野心，渴望建立一個完全由你掌控的、扭曲的、不合常理的帝國。你蔑視傳統，行事百無禁忌，享受在破壞中建立新秩序的快感。",
            abilities: "你的能力核心是「扭曲」和「混亂」。你可以扭曲規則，煽動暴亂，並通過一系列充滿象徵意義的儀式，竊取一個國家的概念，讓自己成為不死的「黑皇帝」。"
        },
        apothecary: {
            name: "藥師 (Apothecary)",
            prevalence: "人群佔比：約2%",
            personality: "你對生命充滿了好奇，並熱衷於通過各種藥劑來調配和改造它。你追求美麗，並認為美麗本身就是一種強大的力量。你富有魅力，善於利用自己的外表和氣質來影響他人。你對情感和慾望有著深刻的理解，並能巧妙地操縱它們。你享受生命綻放的過程，無論這種綻放是以何種形態呈現。你可能是善良的醫師，也可能是致命的毒藥師。",
            abilities: "你的能力與「生命」、「藥劑」和「魅惑」相關。你精通各種魔藥的調配，能夠治療傷痛，也能製造劇毒。高序列時，你將化身為吸血鬼，擁有不死之身和極致的魅力，最終成為執掌美麗與青春的「美神」。"
        },
        planter: {
            name: "耕種者 (Planter)",
            prevalence: "人群佔比：約5%",
            personality: "你熱愛自然，對一草一木都懷有深厚的感情。你耐心、平和，享受播種、培育、收穫的過程。你相信生命自有其規律，順應自然是最好的選擇。你擁有強大的生命力，與動植物有著天然的親和力。你是一個天生的治癒者和守護者，致力於維護生態的平衡和豐饒。你的內心如同大地一般，沉靜而富有包容力。",
            abilities: "你的能力是「生命」與「自然」的體現。你可以加速植物生長，治癒傷口，與動物溝通，並在高序列時化身德魯伊，掌控自然之力，最終成為象徵豐饒與生命的「母親」。"
        },
        monster: {
            name: "怪物 (Monster)",
            prevalence: "人群佔比：小於1%",
            personality: "你的生活充滿了各種巧合與意外，你是命運的寵兒，也是命運的玩偶。你對未來有著敏銳的直覺，總能趨吉避凶。你可能看起來有些懶散或隨波逐流，因為你知道很多事情強求不來，命運自有安排。你相信概率和運氣是構成世界的基本要素，而你有能力在一定程度上撥動命運的輪盤。你的存在本身就是一個悖論，一個無法用常理解釋的「怪物」。",
            abilities: "你的能力完全圍繞「命運」和「概率」。你可以提升自己的幸運，將不幸轉移給敵人，重啟一天的時間來改變選擇，最終成為執掌命運的「命運之輪」。"
        },
    };

    // Quiz Questions and Scoring Matrix
    const questions = [
        {
            question: "當你第一次進入一個陌生的、充滿未知的古老遺蹟時，你的第一反應是？",
            answers: [
                { text: "仔細觀察入口周圍的環境，尋找可能被忽略的細節和線索。", scores: { reader: 2, spectator: 2, hermit: 1 } },
                { text: "尋找一個隱蔽的制高點，先總覽全局，評估潛在的危險和機遇。", scores: { spectator: 2, hunter: 1, seer: 1 } },
                { text: "毫不猶豫地走進去，相信自己的直覺和應變能力。", scores: { warrior: 2, sailor: 1, hunter: 1 } },
                { text: "嘗試使用某種儀式或工具，預測此行的吉凶。", scores: { seer: 2, hermit: 1, monster: 1 } }
            ]
        },
        {
            question: "面對一個看似無法解決的複雜難題，你傾向於？",
            answers: [
                { text: "將問題分解成最小的單元，逐一分析，相信所有問題都有邏輯解。", scores: { reader: 2, paragon: 2, hermit: 1 } },
                { text: "尋找規則的漏洞或非常規的「捷徑」來繞過問題核心。", scores: { marauder: 2, lawyer: 2, seer: 1 } },
                { text: "靜待時機，相信時間會帶來轉機，或者讓別人先去嘗試。", scores: { spectator: 2, monster: 2, corpse_collector: 1 } },
                { text: "投入巨大的精力，用最直接的方式強行攻克它。", scores: { warrior: 2, sailor: 2, hunter: 1 } }
            ]
        },
        {
            question: "你認為一個理想的社會，其基石應該是？",
            answers: [
                { text: "絕對的、不容挑戰的權威和秩序。", scores: { sailor: 2, lawyer: 1, sun: 1, criminal: -1 } },
                { text: "每個個體都能自由發展、不受束縛的混沌活力。", scores: { criminal: 2, assassin: 1, marauder: 1, lawyer: -1 } },
                { text: "光明、公正、互助的道德準則。", scores: { sun: 2, warrior: 1, planter: 1 } },
                { text: "不斷進步的知識和科技。", scores: { paragon: 2, reader: 2, hermit: 1 } }
            ]
        },
        {
            question: "在一個團隊中，你最喜歡扮演的角色是？",
            answers: [
                { text: "運籌帷幄的領導者，為團隊指明方向。", scores: { sun: 2, hunter: 1, spectator: 1 } },
                { text: "衝鋒在前的執行者，用行動解決問題。", scores: { warrior: 2, sailor: 1 } },
                { text: "隱藏在幕後的顧問，提供關鍵信息和策略。", scores: { seer: 2, spectator: 1, reader: 1 } },
                { text: "獨來獨往的自由人，只在必要時與團隊合作。", scores: { marauder: 2, assassin: 1, apprentice: 1, monster: 1 } }
            ]
        },
        {
            question: "如果可以獲得一種能力，你希望是？",
            answers: [
                { text: "看透人心的能力。", scores: { spectator: 3 } },
                { text: "穿梭於任何地方的能力。", scores: { apprentice: 3 } },
                { text: "讓所有人都喜歡和信任你的能力。", scores: { sun: 2, apothecary: 2 } },
                { text: "預知未來的能力。", scores: { seer: 2, reader: 1, monster: 1 } }
            ]
        },
        {
            question: "你如何看待「謊言」？",
            answers: [
                { text: "是一種必要的生存工具和智慧的體現。", scores: { marauder: 2, seer: 1, lawyer: 1 } },
                { text: "絕對不可接受，誠實是最高的美德。", scores: { sun: 2, warrior: 1 } },
                { text: "是一門藝術，可以用來引導和操縱他人。", scores: { spectator: 2, seer: 1, demoness: 1 } },
                { text: "無所謂好壞，只是達成目的的手段之一。", scores: { assassin: 1, criminal: 1, hunter: 1 } }
            ]
        },
        {
            question: "深夜獨處時，你更多感受到的是？",
            answers: [
                { text: "寧靜與力量，這是屬於我的時間。", scores: { sleepless: 3, corpse_collector: 1 } },
                { text: "孤獨與不安，渴望與人交流。", scores: { sun: 1, apothecary: 1 } },
                { text: "思緒活躍，靈感迸發。", scores: { reader: 1, paragon: 1, seer: 1 } },
                { text: "警惕，對周圍的風吹草動非常敏感。", scores: { hunter: 1, assassin: 1, sleepless: 1 } }
            ]
        },
        {
            question: "面對敵人的挑釁，你的反應是？",
            answers: [
                { text: "冷靜分析對方的意圖和弱點，不為所動。", scores: { spectator: 2, reader: 1, corpse_collector: 1 } },
                { text: "以更激烈的方式反擊，讓對方後悔。", scores: { sailor: 2, warrior: 1 } },
                { text: "表面上順從，暗中設下陷阱。", scores: { seer: 2, demoness: 1, marauder: 1 } },
                { text: "感到興奮，享受這種充滿張力的對抗。", scores: { hunter: 3, criminal: 1 } }
            ]
        },
        {
            question: "你認為「美」的本質是什麼？",
            answers: [
                { text: "和諧與秩序。", scores: { sun: 1, lawyer: 1 } },
                { text: "生命力的極致綻放，哪怕短暫。", scores: { apothecary: 2, planter: 1 } },
                { text: "痛苦與絕望中誕生的極致情感。", scores: { demoness: 2, prisoner: 1, secret_suppliant: 1 } },
                { text: "隱藏在事物背後的神秘規律。", scores: { hermit: 2, reader: 1 } }
            ]
        },
        {
            question: "一件珍貴的物品失竊了，你會？",
            answers: [
                { text: "通過邏輯推理，排查所有可能的嫌疑人。", scores: { reader: 2 } },
                { text: "模仿盜賊的思維，思考他會如何藏匿或銷贓。", scores: { marauder: 3 } },
                { text: "公開懸賞，利用群眾的力量尋找。", scores: { sun: 1, hunter: 1 } },
                { text: "認為這是命運的安排，坦然接受損失。", scores: { monster: 2, corpse_collector: 1 } }
            ]
        },
        {
            question: "你對「死亡」的看法是？",
            answers: [
                { text: "萬物平等的終點，應予以尊重。", scores: { corpse_collector: 3, sleepless: 1 } },
                { text: "需要對抗和戰勝的敵人。", scores: { warrior: 1, apothecary: 1 } },
                { text: "一種神秘的狀態，值得探索和研究。", scores: { hermit: 1, secret_suppliant: 1 } },
                { text: "黑暗與寂靜的永恆歸宿。", scores: { sleepless: 2, corpse_collector: 1 } }
            ]
        },
        {
            question: "當你掌握了一項強大的秘密時，你會？",
            answers: [
                { text: "將其作為籌碼，在關鍵時刻換取最大利益。", scores: { marauder: 1, lawyer: 1, spectator: 1 } },
                { text: "永遠埋藏在心底，這是對秘密最好的保護。", scores: { sleepless: 2, hermit: 2, seer: 1 } },
                { text: "與最信任的人分享，共同承擔。", scores: { sun: 1, warrior: 1 } },
                { text: "忍不住想用它來搞個大新聞，看看會發生什麼。", scores: { criminal: 2, hunter: 1 } }
            ]
        },
        {
            question: "你更願意生活在哪種環境中？",
            answers: [
                { text: "繁華喧鬧、充滿機遇的大都市。", scores: { lawyer: 1, criminal: 1 } },
                { text: "遠離塵囂、寧靜祥和的自然鄉野。", scores: { planter: 2, apothecary: 1 } },
                { text: "紀律嚴明、秩序井然的軍事要塞。", scores: { warrior: 2, sailor: 1 } },
                { text: "充滿未知與神秘的古老圖書館。", scores: { reader: 2, hermit: 2, apprentice: 1 } }
            ]
        },
        {
            question: "你如何看待「痛苦」？",
            answers: [
                { text: "應該盡力避免和消除的東西。", scores: { sun: 1, apothecary: 1 } },
                { text: "磨練意志、使人成長的催化劑。", scores: { warrior: 2, secret_suppliant: 1 } },
                { text: "一種強大的力量來源。", scores: { prisoner: 2, secret_suppliant: 2 } },
                { text: "一種值得玩味和欣賞的藝術。", scores: { demoness: 3, assassin: 1 } }
            ]
        },
        {
            question: "如果必須建立一個組織，你的理念是？",
            answers: [
                { text: "精英制，只有最優秀的人才能加入。", scores: { reader: 1, paragon: 1 } },
                { text: "兄弟會，忠誠和義氣高於一切。", scores: { warrior: 2, sun: 1 } },
                { text: "秘密社團，所有成員都隱藏身份，單線聯繫。", scores: { seer: 2, sleepless: 1, marauder: 1 } },
                { text: "烏托邦，致力於創造一個完美的世界。", scores: { spectator: 2, sun: 1 } }
            ]
        },
        {
            question: "你更相信？",
            answers: [
                { text: "精心計算的概率。", scores: { reader: 1, paragon: 1 } },
                { text: "突如其來的靈感。", scores: { seer: 1, spectator: 1 } },
                { text: "百分之百的努力。", scores: { warrior: 2, sun: 1 } },
                { text: "無法預測的運氣。", scores: { monster: 3 } }
            ]
        },
        {
            question: "一項新技術誕生了，你的態度是？",
            answers: [
                { text: "熱情擁抱，相信它能改善世界。", scores: { paragon: 3, sun: 1 } },
                { text: "保持警惕，研究其潛在的風險和濫用可能。", scores: { hermit: 2, reader: 1, sleepless: 1 } },
                { text: "思考如何將其用於軍事或競爭。", scores: { sailor: 1, hunter: 1 } },
                { text: "不感興趣，更關心人性和哲學。", scores: { spectator: 1, corpse_collector: 1 } }
            ]
        },
        {
            question: "在你看来，最強大的武器是？",
            answers: [
                { text: "堅不可摧的鎧甲與無堅不摧的利劍。", scores: { warrior: 2 } },
                { text: "能夠摧毀一座城市的巨砲。", scores: { sailor: 1, paragon: 1 } },
                { text: "能夠操控人心的言語。", scores: { spectator: 2, lawyer: 1, demoness: 1 } },
                { text: "無人知曉的秘密知識。", scores: { hermit: 2, reader: 2, seer: 1 } }
            ]
        },
        {
            question: "你對「規則」的態度是？",
            answers: [
                { text: "必須被遵守，它們是社會穩定的基石。", scores: { sun: 1, warrior: 1, lawyer: -1 } },
                { text: "存在的意義就是被打破和超越。", scores: { criminal: 2, sailor: 1 } },
                { text: "是一套工具，關鍵看誰以及如何使用它。", scores: { spectator: 1, seer: 1 } },
                { text: "充滿了漏洞，等待聰明人去發現和利用。", scores: { lawyer: 3, marauder: 2 } }
            ]
        },
        {
            question: "當你感到被束縛和壓迫時，你會？",
            answers: [
                { text: "隱忍，積蓄力量，等待時機。", scores: { secret_suppliant: 2, sleepless: 1 } },
                { text: "瘋狂反抗，哪怕玉石俱焚。", scores: { prisoner: 3, criminal: 1 } },
                { text: "尋找系統的弱點，從內部瓦解它。", scores: { lawyer: 2, marauder: 1 } },
                { text: "說服自己接受現狀，從痛苦中尋找意義。", scores: { secret_suppliant: 2, prisoner: 1, corpse_collector: 1 } }
            ]
        },
        {
            question: "你如何處理自己的負面情緒？",
            answers: [
                { text: "用理智壓制它，不讓它影響判斷。", scores: { spectator: 2, reader: 1, corpse_collector: 1 } },
                { text: "找個無人的地方徹底發洩出來。", scores: { sailor: 2, warrior: 1 } },
                { text: "將其轉化為創作或行動的動力。", scores: { hunter: 1, demoness: 1, criminal: 1 } },
                { text: "戴上微笑的面具，假裝一切都很好。", scores: { seer: 3, spectator: 1 } }
            ]
        },
        {
            question: "你認為「歷史」是？",
            answers: [
                { text: "一面鏡子，可以借鑒經驗教訓。", scores: { reader: 2, sun: 1 } },
                { text: "一個可以被改寫和重新詮釋的故事。", scores: { seer: 2, spectator: 1, criminal: 1 } },
                { text: "一堆沉重的包袱，限制了現在的發展。", scores: { criminal: 1, sailor: 1 } },
                { text: "一個巨大的寶庫，埋藏著力量和秘密。", scores: { seer: 1, hermit: 1, apprentice: 1 } }
            ]
        },
        {
            question: "在航海旅行中，你最享受的是？",
            answers: [
                { text: "征服狂風巨浪的快感。", scores: { sailor: 3 } },
                { text: "探索未知島嶼和航線的興奮。", scores: { apprentice: 2, hunter: 1 } },
                { text: "在甲板上觀測星辰，思考宇宙的奧秘。", scores: { apprentice: 1, hermit: 1, reader: 1 } },
                { text: "抵達目的地，完成貿易或任務的成就感。", scores: { paragon: 1 } }
            ]
        },
        {
            question: "你如何看待「犧牲」？",
            answers: [
                { text: "為了崇高的目標，犧牲是光榮的。", scores: { sun: 2, warrior: 2, secret_suppliant: 1 } },
                { text: "愚蠢的行為，保全自身是第一要務。", scores: { marauder: 1, assassin: 1 } },
                { text: "一種可以被利用的工具，用他人的犧牲換取自己的利益。", scores: { criminal: 2, demoness: 1 } },
                { text: "一種無奈的選擇，但有時必須為之。", scores: { sleepless: 1, secret_suppliant: 1 } }
            ]
        },
        {
            question: "你更傾向於通過哪種方式獲取信息？",
            answers: [
                { text: "公開的書籍、報紙和學術報告。", scores: { reader: 2, paragon: 1 } },
                { text: "秘密的情報網絡和線人。", scores: { marauder: 1, sleepless: 1 } },
                { text: "親身潛入、臥底和觀察。", scores: { spectator: 2, assassin: 1 } },
                { text: "占卜、通靈等神秘學手段。", scores: { seer: 2, hermit: 1, monster: 1 } }
            ]
        },
        {
            question: "你認為最理想的復仇方式是？",
            answers: [
                { text: "在大庭廣眾之下，用壓倒性的力量將其擊敗。", scores: { sailor: 2, warrior: 1, sun: 1 } },
                { text: "精心策劃，讓對方身敗名裂，在絕望中死去。", scores: { demoness: 2, criminal: 1 } },
                { text: "讓對方在不知不覺中失去一切，甚至不知道是誰做的。", scores: { seer: 2, spectator: 2, marauder: 1 } },
                { text: "寬恕對方，因為復仇會玷污自己的靈魂。", scores: { sun: 1, planter: 1, secret_suppliant: 1 } }
            ]
        },
        {
            question: "你如何定義「力量」？",
            answers: [
                { text: "能夠保護自己想保護之人的能力。", scores: { warrior: 2, sun: 1, sleepless: 1 } },
                { text: "能夠讓世界按自己意志運轉的權力。", scores: { sailor: 2, lawyer: 1, criminal: 1 } },
                { text: "能夠摧毀一切阻礙的破壞力。", scores: { sailor: 1, demoness: 1 } },
                { text: "能夠洞悉萬物本質的智慧。", scores: { reader: 2, hermit: 2, spectator: 1 } }
            ]
        },
        {
            question: "如果你發現了一個巨大的陰謀，你會？",
            answers: [
                { text: "立即上報給權威機構，相信他們能處理。", scores: { sun: 1, warrior: 1 } },
                { text: "匿名將線索散播出去，引發混亂，坐收漁利。", scores: { criminal: 2, hunter: 1, marauder: 1 } },
                { text: "自己組建團隊，深入調查，試圖親手解決。", scores: { hunter: 2, reader: 1 } },
                { text: "假裝不知道，這太危險了，與我無關。", scores: { monster: 1, spectator: -1 } }
            ]
        },
        {
            question: "你對動植物的態度是？",
            answers: [
                { text: "它們是寶貴的生命，需要被愛護。", scores: { planter: 3 } },
                { text: "它們是資源，可以用來製作食物、藥劑或工具。", scores: { apothecary: 2, paragon: 1 } },
                { text: "它們是研究對象，蘊含著生命的奧秘。", scores: { planter: 1, hermit: 1 } },
                { text: "沒什麼特別的感覺。", scores: { sailor: 1, criminal: 1 } }
            ]
        },
        {
            question: "旅程的終點，你希望看到的是什麼？",
            answers: [
                { text: "一個被自己建立或守護的、和平繁榮的家園。", scores: { sun: 2, warrior: 1, sleepless: 1, planter: 1 } },
                { text: "世界的盡頭，宇宙的終極奧秘。", scores: { apprentice: 2, hermit: 2, reader: 1 } },
                { text: "所有人都在頌揚你的名字，你的雕像矗立在每個城市。", scores: { criminal: 2, hunter: 1, sailor: 1 } },
                { text: "回到旅程的起點，但帶著全新的智慧和心境。", scores: { seer: 2, monster: 1, corpse_collector: 1 } }
            ]
        }
    ];

    // Functions
    function startQuiz() {
        // Initialize scores for all pathways to 0
        for (const key in pathways) {
            scores[key] = 0;
        }
        currentQuestionIndex = 0;
        quizIntro.classList.add('hidden');
        resultContainer.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
            updateProgressBar();
        } else {
            showResults();
        }
    }

    function showQuestion(question) {
        questionText.innerText = `問題 ${currentQuestionIndex + 1} / ${questions.length}：\n${question.question}`;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectAnswer(answer));
            answerButtons.appendChild(button);
        });
    }

    function resetState() {
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }

    function selectAnswer(answer) {
        // Add scores based on the selected answer
        for (const pathway in answer.scores) {
            if (scores.hasOwnProperty(pathway)) {
                scores[pathway] += answer.scores[pathway];
            }
        }
        currentQuestionIndex++;
        setNextQuestion();
    }
    
    function updateProgressBar() {
        const progressPercentage = ((currentQuestionIndex) / questions.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }

    function showResults() {
        // Final progress bar update
        progressBar.style.width = '100%';

        // Determine the highest score
        let maxScore = -Infinity;
        let resultPathwayKey = '';
        for (const pathway in scores) {
            if (scores[pathway] > maxScore) {
                maxScore = scores[pathway];
                resultPathwayKey = pathway;
            }
        }
        
        const result = pathways[resultPathwayKey];
        
        // Display results
        resultPathwayName.innerText = result.name;
        resultPrevalence.innerText = result.prevalence;
        resultPersonality.innerText = result.personality;
        resultAbilities.innerText = result.abilities;

        quizContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
    }

    function restartQuiz() {
        resultContainer.classList.add('hidden');
        quizIntro.classList.remove('hidden');
    }

    // Event Listeners
    startBtn.addEventListener('click', startQuiz);
    restartBtn.addEventListener('click', restartQuiz);
});