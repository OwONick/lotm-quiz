document.addEventListener('DOMContentLoaded', () => {
    // DOM 元素獲取
    const startScreen = document.getElementById('start-screen');
    const questionScreen = document.getElementById('question-screen');
    const resultScreen = document.getElementById('result-screen');
    const startBtn = document.getElementById('start-btn');
    const questionText = document.getElementById('question-text');
    const questionNumber = document.getElementById('question-number');
    const answerButtons = document.getElementById('answer-buttons');
    const progressBar = document.getElementById('progress-bar');
    const restartBtn = document.getElementById('restart-btn');

    // 結果顯示元素
    const resultSymbolContainer = document.getElementById('result-symbol-container');
    const resultTitle = document.getElementById('result-title');
    const resultPersonality = document.getElementById('result-personality');
    const resultPowers = document.getElementById('result-powers');

    // 測驗狀態變數
    let currentQuestionIndex = 0;
    let scores = {};

    // 途徑數據
    const pathways = {
        fool: { name: "愚者途徑：命運的欺詐師", personality: "你是一位矛盾的大師，行走在強大力量與深刻謙卑的鋼絲上。你看得見命運的絲線，並且忍不住想去俏皮地撥弄一下，但你從未忘記，自己也只是更宏大舞台上的一名演員。你善於利用信息差和誤導來達成目的，常以玩笑或故作神秘的姿態示人，但內心深處，你對宇宙的浩瀚與不可知懷有最深的敬畏。你享受操縱的樂趣，卻也明白每一次操縱都可能帶來無法預料的後果。", powers: "你的能力圍繞著「欺騙」與現實敘事的操縱。你能夠占卜未來，從歷史的塵埃中召喚虛影，最終甚至能「愚弄」時間與命運本身，創造出凡人眼中的奇蹟。你的秘偶將成為你意志的延伸，而你的每一次「嫁接」，都是對現實規則的一次大膽改寫。", symbol: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="var(--color-primary)" stroke-width="3" d="M50 20 A30 30 0 0 1 50 80 A30 30 0 0 1 50 20 M30 50 Q50 30 70 50 M30 50 Q50 70 70 50"/></svg>` },
        door: { name: "門途徑：空間的漫遊者", personality: "你是一個天生的探索者，對你而言，任何形式的束縛都是不可忍受的。牆壁、距離、規則、秘密，這些在他人眼中的障礙，在你眼中都只是一扇扇等待被打開的「門」。你充滿好奇心，熱愛旅行，享受學習新知識和體驗不同文化的過程。你極度自信，相信無論陷入何種困境，總有辦法可以「離開」。你不屬於任何地方，因為所有地方都是你的驛站。", powers: "你的權柄在於空間的絕對自由。你可以輕易地穿過物理阻礙，透過「漫遊」瞬間抵達千里之外。更重要的是，你能「記錄」並複製他人的非凡能力，使你成為一個能力多樣、難以預測的對手。在高處，你甚至能扭曲和封印空間本身，成為真正意義上的空間之王。", symbol: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="25" y="15" width="50" height="70" rx="5" stroke="var(--color-primary)" stroke-width="3" fill="none"/><circle cx="65" cy="50" r="3" fill="var(--color-primary)"/></svg>` },
        error: { name: "錯誤途徑：規則的寄生者", personality: "你是系統中的「Bug」，是秩序的解構者。你堅信世上沒有完美無缺的事物，任何規則都存在可供利用的漏洞。你享受欺詐、惡作劇和利用他人弱點所帶來的智力上的優越感。你的道德觀念非常靈活，對你而言，規則不是用來遵守的，而是用來打破和利用的。你像一個寄生蟲，在龐大系統的縫隙中汲取養分，活得瀟灑而危險。", powers: "你的核心能力是「偷盜」。你偷的不是財物，而是概念——他人的思想、壽命、非凡能力，甚至是空間中的「距離」。你能「寄生」於他人身上，完美地隱藏自己。最終，你能製造「錯誤」，讓現實按照你的意願出現故障，並能操縱「時之蟲」來竊取和扭曲時間。", symbol: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" stroke="var(--color-primary)" stroke-width="3" fill="none"/><path d="M35 65 L65 35" stroke="var(--color-primary)" stroke-width="3"/><path d="M30 30 L40 40" stroke="var(--color-primary)" stroke-width="3" stroke-dasharray="4 4"/></svg>` },
        visionary: { name: "空想家途徑：現實的織夢師", personality: "你是個天生的觀察家和心理學家。你習慣於站在人群之外，冷靜地分析每個人的言行舉止、情緒波動和內心動機。你擁有極強的共情能力，卻又能輕易地將自己抽離，不被情感所左右。你相信思想擁有力量，現實不過是集體心靈的投射。你的內心世界極其豐富，充滿了各種奇思妙想，並渴望有一天能將這些「空想」變為現實。", powers: "你的力量源於心靈。你能輕易看穿他人的謊言，進入並編織夢境。你可以透過催眠和暗示來影響他人。隨著力量的增長，你將成為「作家」，編寫童話影響現實。最終，作為「空想家」，你的思想將擁有直接創造物質和生命的力量，成為現實的定義者。", symbol: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M10 50 C 30 20, 70 20, 90 50 C 70 80, 30 80, 10 50 Z" stroke="var(--color-primary)" stroke-width="3" fill="none"/><circle cx="50" cy="50" r="10" fill="var(--color-primary)"/></svg>` },
        sun: { name: "太陽途徑：光明的頌揚者", personality: "你是個充滿正能量和理想主義的人。你堅信光明與正義，並願意為此奉獻一切。你性格開朗、熱情，像太陽一樣能給周圍的人帶來溫暖和勇氣。你厭惡邪惡與墮落，並將其視為自己的責任去淨化。你的內心充滿了堅定的信仰，無論是對於神明，還是對於某種崇高的理念，這份信仰是你所有力量的源泉。", powers: "你的能力是光與火的純粹體現。你能召喚神聖的光芒和火焰，驅散黑暗，淨化邪惡。你能透過「公證」讓言出法隨，也能用歌聲鼓舞士氣。在高處，你能創造「無暗領域」，讓一切陰影無所遁形，成為行走的太陽，是所有黑暗與亡靈天生的克星。", symbol: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="25" fill="var(--color-primary)"/><g stroke="var(--color-primary)" stroke-width="3"><line x1="50" y1="10" x2="50" y2="20"/><line x1="50" y1="80" x2="50" y2="90"/><line x1="10" y1="50" x2="20" y2="50"/><line x1="80" y1="50" x2="90" y2="50"/><line x1="22" y1="22" x2="29" y2="29"/><line x1="71" y1="71" x2="78" y2="78"/><line x1="22" y1="78" x2="29" y2="71"/><line x1="71" y1="29" x2="78" y2="22"/></g></svg>` },
        tyrant: { name: "暴君途徑：風暴的化身", personality: "你崇尚絕對的力量與權威。你性格果斷、強勢，甚至有些霸道。你不喜歡陰謀詭計，更傾向於用壓倒性的力量正面碾壓一切敵人。你就像一場無法被馴服的風暴，喜怒無常，威力無窮。你尊重強者，蔑視弱者，堅信在絕對的力量面前，一切技巧都蒼白無力。", powers: "你掌控著自然界最狂暴的力量——風暴、雷電與海洋。你能掀起颶風，召喚閃電，引發海嘯。你的速度如雷光一閃，你的怒火能讓天地變色。在高處，你就是行走的天災，是神話中執掌雷霆的憤怒神明。", symbol: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,10 30,50 70,50" fill="var(--color-primary)"/><path d="M40 50 Q50 70 60 50 T40 90" stroke="var(--color-primary)" stroke-width="3" fill="none"/></svg>` },
        white_tower: { name: "白塔途徑：知識的求索者", personality: "你是個終身的學習者和研究者。你對世界抱有無限的好奇心，並堅信所有問題都能透過知識和邏輯來解答。你享受泡在圖書館或實驗室裡的時光，對你而言，一個新的理論或發現遠比世俗的財富和權力更有吸引力。你理性、嚴謹、有耐心，相信知識就是力量，而你，正走在通往全知的道路上。", powers: "你的大腦就是你最強大的武器。你擁有過目不忘的記憶力和超凡的分析能力。你能透過理解來「模仿」他人的非凡能力，並能基於自己的知識體系「創造」出全新的法術。在高處，你能「認知」世界的底層規律，成為一個無所不知的智者。", symbol: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M30 90 V 10 L 70 20 V 90 L 50 80 Z" stroke="var(--color-primary)" stroke-width="3" fill="none"/><path d="M30 10 H 70" stroke="var(--color-primary)" stroke-width="3"/></svg>` },
        hanged_man: { name: "倒吊人途徑：犧牲的奉獻者", personality: "你的世界觀深刻而殘酷。你明白「等價交換」是宇宙的根本法則之一，要得到，必先付出。你願意為了目標承受巨大的痛苦，甚至進行自我犧牲。這種哲學也讓你對他人抱持著一種冷酷的視角，將他們視為可以被「奉獻」或「牧養」的資源。你行走在墮落與神聖的邊緣，對痛苦有著超乎常人的理解和忍耐力。", powers: "你的力量源於犧牲與墮落。你能操控陰影，更能「牧養」被你擊敗的敵人的靈魂，使用他們的能力。你對腐化和衰敗有著天然的親和力。在高處，你將成為「瀆神長老」，透過理解更深層次的墮落來換取力量，是一個極度危險和詭異的存在。", symbol: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 20 V 80 M20 20 H 80 M50 80 L30 60 M50 80 L70 60" stroke="var(--color-primary)" stroke-width="3" fill="none"/><circle cx="50" cy="35" r="10" stroke="var(--color-primary)" stroke-width="3" fill="none"/></svg>` },
        darkness: { name: "永暗途徑：寂靜的守護者", personality: "你是一個尋求寧靜與秩序的人。你並不懼怕黑暗，反而能在其中找到安寧。你性格沉穩、內斂，不喜歡喧囂和混亂。你像一個守夜人，默默守護著世界的秘密和沉睡者的夢境。你相信黑暗並非邪惡，而是宇宙平衡不可或缺的一部分，是光明的終點，也是新生的起點。", powers: "你是黑暗與隱匿的大師。你能輕易地融入陰影，讓敵人無法察覺。你能將對手拖入可怕的夢魘，用恐懼摧毀他們的意志。在高處，你能創造「永寂之河」，剝奪一切光與聲音，最終更能執掌「終結」的權柄，讓萬物歸於寂靜。", symbol: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 10 C 20 40, 20 60, 50 90 C 80 60, 80 40, 50 10 Z" fill="var(--color-secondary)" stroke="var(--color-primary)" stroke-width="3"/><path d="M50 10 C 40 40, 40 60, 50 90" fill="var(--color-background)"/></svg>` },
        death: { name: "死神途徑：終焉的引路人", personality: "你對生命和死亡有著深刻而超然的理解。你尊重死亡的秩序，將其視為所有生命平等的終點。你富有同情心，能夠安撫亡魂，引導他們走向安息。但同時，你又擁有不可動搖的決斷力，在必要時執行死亡的判決。你行走於生死之間，是亡者的君王，也是靈魂的引導者。", powers: "你與靈界有著天然的聯繫。你能與亡魂溝通，也能奴役和指揮亡靈為你作戰。你能直接攻擊敵人的靈魂，也能宣告一個生命的「死亡」。在高處，你將成為冥界的統治者，你所在之處，就是亡者的國度。", symbol: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M30 90 Q 50 50, 70 90 M50 10 V 90" stroke="var(--color-primary)" stroke-width="3" fill="none"/><circle cx="50" cy="30" r="15" stroke="var(--color-primary)" stroke-width="3" fill="none"/></svg>` },
        twilight_giant: { name: "黃昏巨人途徑：堅毅的守望者", personality: "你是個沉默而可靠的守護者。你性格堅毅、不屈不撓，信奉用行動而非言語來證明自己。你就像一座山，永遠鎮守在需要你的地方，為身後的人撐起一片天。你身上有一種宿命般的悲壯感，既有迎接黎明的希望，也明白黃昏的必然到來。你是秩序的捍衛者，是戰場上最堅實的壁壘。", powers: "你的身體就是你最強大的武器。你擁有巨人的力量和體魄，以及對各種武器的精通。你能釋放「黎明之光」，驅散邪惡。你最核心的能力是「守護」，能創造出幾乎無法被打破的防禦。在高處，你將獲得「衰敗」的權柄，成為執掌終結與榮光的巨人。", symbol: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="35" y="20" width="30" height="60" stroke="var(--color-primary)" stroke-width="3" fill="none"/><circle cx="50" cy="50" r="8" fill="var(--color-primary)"/></svg>` },
        demoness: { name: "魔女途徑：災禍的藝術家", personality: "你是一個危險而迷人的存在。你對人性的陰暗面有著深刻的洞察，並享受挑動他人的痛苦、恐懼和絕望。你像一個藝術家，而災禍就是你的作品。你充滿魅力，擅長誘惑和操縱，但內心深處卻是絕對的冷酷。你的人生是一場追求極致刺激和愉悅的盛宴，而他人的不幸，正是你最好的調味品。", powers: "你的能力旨在散播災禍。你能製造各種可怕的「瘟疫」，也能直接攻擊精神，造成劇烈的「痛苦」。你擁有鏡界能力，極難被殺死，可以透過任何鏡面復活。你的凝視能將敵人「石化」，你的存在本身就是一場移動的災難。", symbol: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,20 C 70,20 80,40 80,50 C 80,60 70,80 50,80 C 30,80 20,60 20,50 C 20,40 30,20 50,20" stroke="var(--color-primary)" stroke-width="3" fill="none"/><path d="M40 40 L60 60 M60 40 L40 60" stroke="var(--color-accent)" stroke-width="3"/></svg>` },
        red_priest: { name: "紅祭司途徑：戰爭的點燃者", personality: "你是天生的領袖和征服者。你熱愛競爭，享受勝利，並堅信戰爭是推動歷史前進的車輪。你極富魅力，擅長演說，能輕易地點燃他人心中的火焰，讓他們為你赴湯蹈火。你是一個野心家、陰謀家和戰略家，你的人生目標就是不斷地征服，建立一個又一個屬於你的功業。", powers: "你是戰爭之神。你掌控著毀滅性的「火焰」，能用戰吼強化友軍、削弱敵人。你擅長策劃「陰謀」，挑起紛爭。你的核心力量在於「統領」，你建立的軍隊越強大，你的力量就越強。在你征服的土地上，你就是唯一的王。", symbol: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 10 L 90 90 L 10 90 Z" stroke="var(--color-primary)" stroke-width="3" fill="none"/><path d="M50 10 L 50 50" stroke="var(--color-primary)" stroke-width="3"/><path d="M30 50 L 70 50" stroke="var(--color-primary)" stroke-width="3"/></svg>` },
        hermit: { name: "窺秘人途徑：奧秘的隱士", personality: "你是個純粹的學者，對世界的奧秘有著無盡的渴求。相比於人際交往，你更喜歡沉浸在古老的典籍和神秘的符號中。你享受解開謎題的過程，知識本身對你來說就是最高的回報。你可能有些不善言辭，甚至有些孤僻，但你的大腦中裝著一個無比宏大而深邃的世界。", powers: "你的力量與知識深度直接掛鉤。你精通各種「神秘學」知識，能施展複雜的魔法和巫術。你擅長「星象占卜」，能窺見未來的軌跡。在高處，你能「重現」甚至創造魔法，並能直接與宇宙的信息之海相連，成為一個活著的圖書館。", symbol: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="35" stroke="var(--color-primary)" stroke-width="3" fill="none"/><circle cx="50" cy="50" r="5" fill="var(--color-primary)"/><path d="M50 15 V 85 M15 50 H 85 M25.7 25.7 L 74.3 74.3 M25.7 74.3 L 74.3 25.7" stroke="var(--color-primary)" stroke-width="2" fill="none"/></svg>` },
        paragon: { name: "通識者途徑：現實的創造者", personality: "你是個務實的理想主義者，一個天生的工匠和發明家。你相信知識的價值在於應用，你熱衷於親手將理論和藍圖變為現實。你享受創造的過程，無論是精密的機械，還是神奇的煉金藥劑。你動手能力極強，富有創造力，並堅信技術能夠改變世界。", powers: "你的雙手能創造奇蹟。你精通各種「機械製造」和「物品製作」。你是「鍊金術」的大師，能點石成金。你的發明創造能夠推動文明的進步。在高處，你將執掌「科技」與「創造」的權柄，成為一個能用雙手塑造未來的神。", symbol: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="20" stroke="var(--color-primary)" stroke-width="3" fill="none"/><path d="M50 30 V 10 M50 70 V 90 M30 50 H 10 M70 50 H 90" stroke="var(--color-primary)" stroke-width="3" fill="none"/></svg>` },
        wheel_of_fortune: { name: "命運之輪途徑：概率的賭徒", personality: "你的人生是一場巨大的賭博。你對命運和概率有著天生的敏感，並敢於在關鍵時刻押上一切。你可能時而極度幸運，時而又倒楣透頂。你的人生充滿了起伏和不確定性，但你卻樂在其中。你相信，只要活得夠久，總有機會翻盤。你是一個在命運的輪盤上跳舞的賭徒，既瘋狂又清醒。", powers: "你掌控著虛無縹緲的「命運」。你能讓自己變得極度「幸運」，也能給敵人帶去「災禍」。你能直接操縱「概率」，讓小概率事件必然發生。在高處，你甚至能「重啟」命運，讓時間倒流，回到某個關鍵的抉擇點，成為真正的命運之主。", symbol: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" stroke="var(--color-primary)" stroke-width="3" fill="none"/><path d="M50 10 V 90 M10 50 H 90 M22 22 L 78 78 M22 78 L 78 22" stroke="var(--color-primary)" stroke-width="2" fill="none"/></svg>` },
        mother: { name: "母親途徑：生命的孕育者", personality: "你充滿了母性的光輝，對生命懷有深沉的愛與關懷。你溫柔、善良、富有同情心，是天生的滋養者和保護者。你與自然有著緊密的聯繫，熱愛土地和生命。你相信生命的頑強與美好，並願意為守護這份美好而付出一切。你的存在本身，就是豐饒與希望的象徵。", powers: "你是生命與自然的化身。你能促進植物的瘋狂生長，能治療最嚴重的傷勢。你擁有無比旺盛的「生命力」，極難被殺死。你的領域之內，萬物復甦，生機盎然。在高處，你就是大地本身，是所有生命的源頭。", symbol: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 90 C 20 60, 20 40, 50 10 C 80 40, 80 60, 50 90 Z" stroke="var(--color-primary)" stroke-width="3" fill="none"/><path d="M50 50 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0" fill="var(--color-primary)"/></svg>` },
        moon: { name: "月亮途徑：變幻的誘惑者", personality: "你是一個充滿神秘魅力和雙重性的個體。你像月亮一樣，既有皎潔美麗的一面，也有引人瘋狂的陰暗面。你擅長利用自己的魅力來「蠱惑」人心，達到自己的目的。你性格多變，令人難以捉摸。你享受在不同身份和姿態之間切換的樂趣，對血液和黑夜有著特殊的偏好。", powers: "你駕馭著月亮的力量。你能在月光下獲得極大的增幅，並能化身為月光躲避攻擊。你能製造強大的幻術，也能「召喚」來自靈界的強大生物。你擁有「吸血鬼」的特質，能透過血液轉化僕從，並擁有強大的恢復能力。", symbol: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M 50 10 A 40 40 0 1 0 50 90" stroke="var(--color-primary)" stroke-width="3" fill="none"/><path d="M 50 20 A 30 30 0 1 0 50 80" stroke="var(--color-primary)" stroke-width="3" fill="none"/></svg>` },
        abyss: { name: "深淵途徑：欲望的沉淪者", personality: "你選擇了直面內心最黑暗的欲望。你不再壓抑，而是選擇徹底地釋放和沉淪。你從罪惡、恐懼和墮落中汲取力量和快感。你可能是個殘忍的暴徒，也可能是個優雅的惡魔，但本質都是一樣的——你是欲望的奴隸。你蔑視道德和秩序，只追隨自己內心的衝動。", powers: "你是行走的「深淵」。你的話語能引發他人內心的「欲望」，你的存在能「腐化」周圍的環境。你能散播「恐懼」，召喚來自深淵的「惡魔」。你越是墮落，力量就越是強大，最終，你自身將成為一個污染世界的腐蝕之源。", symbol: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M20 80 L50 20 L80 80 Z" stroke="var(--color-primary)" stroke-width="3" fill="none" transform="rotate(180 50 50)"/><circle cx="50" cy="50" r="5" fill="var(--color-accent)"/></svg>` },
        chained: { name: "被縛者途徑：苦痛的修行者", personality: "你選擇了一條與欲望完全相反的道路——束縛與忍耐。你的人生充滿了各種各樣的痛苦和詛咒，但你並未被其擊垮，反而學會了在束縛中磨練自己的意志。你像一個苦行僧，用痛苦來淨化靈魂。你沉默寡言，意志力極其堅定，對痛苦有著超乎常人的忍耐力。你相信，真正的力量來自於對自我的絕對控制。", powers: "你的力量源於你所承受的「詛咒」和「痛苦」。你能將施加在自己身上的傷害轉移或反彈給敵人。你能製造沒有生命的「傀儡」為你戰鬥。在高處，你能將敵人「變形」為無害的動物，並將自己化為詛咒的源頭，成為一個觸碰不得的禁忌存在。", symbol: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="20" stroke="var(--color-primary)" stroke-width="3" fill="none"/><path d="M30 50 H 70 M50 30 V 70" stroke="var(--color-primary)" stroke-width="3" fill="none"/></svg>` },
        black_emperor: { name: "黑皇帝途徑：秩序的扭曲者", personality: "你是個天生的權謀家。你看透了秩序的本質——它只是強者用來統治弱者的工具。你熱衷於制定複雜、繁瑣的「規則」，不是為了維護公平，而是為了在其中留下後門和漏洞，供自己利用。你擅長鑽營、賄賂和利用法律，最終目標是建立一個完全服務於你個人意志的、扭曲的帝國。", powers: "你是規則的漏洞。你能「扭曲」現實中的規則，也能利用「賄賂」來影響非凡能力的效果。你最核心的能力是「復活」。只要你預先建造的陵墓和制定的規則還在，你就幾乎是不死的。想徹底殺死一個黑皇帝，最好的辦法就是扶持一個新的黑皇帝來取代他。", symbol: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M20 80 L 50 20 L 80 80 Z" stroke="var(--color-primary)" stroke-width="3" fill="none"/><path d="M35 60 H 65" stroke="var(--color-primary)" stroke-width="3"/></svg>` },
        justiciar: { name: "審判者途徑：戒律的化身", personality: "你是秩序和戒律的絕對化身。你堅信規則神聖不可侵犯，並致力於維護一個公平、公正、有序的世界。你鐵面無私，不容許任何形式的混亂和違規。你就是行走的法律，你的話語就是判決。你可能顯得有些刻板和缺乏變通，但你代表著絕對的穩定和可靠。", powers: "你的權柄是「禁止」。你能用言語設定「戒律」，在你的權威範圍內，可以禁止飛行、禁止使用非凡能力、禁止說謊。你能「削弱」神秘的力量，強化物理的規則。在你的「法庭」領域內，你就是至高無上的法官，任何違背你戒律的行為都將受到「懲戒」。", symbol: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M20 50 H 80 M50 20 V 80" stroke="var(--color-primary)" stroke-width="3" fill="none"/><path d="M10 90 L 90 90" stroke="var(--color-primary)" stroke-width="3"/></svg>` },
    };
    
    // 問題數據
    const questions = [
        { question: "面對一個複雜的難題，你傾向於：", answers: [
            { text: "將其分解為最小的單元，逐一分析，尋找邏輯規律。", pathways: ["white_tower", "paragon"] },
            { text: "相信直覺和靈感，等待答案在不經意間浮現。", pathways: ["fool", "hermit"] },
            { text: "尋找規則中的漏洞或不尋常的捷徑來解決。", pathways: ["error", "black_emperor"] },
            { text: "召集一群人，集思廣益，共同領導解決方案。", pathways: ["red_priest"] }
        ]},
        { question: "你認為「力量」的本質是：", answers: [
            { text: "壓倒性的物理存在，能摧毀一切障礙。", pathways: ["tyrant", "twilight_giant"] },
            { text: "影響他人思想和信念的能力。", pathways: ["visionary", "sun"] },
            { text: "對知識和信息無與倫比的掌握。", pathways: ["white_tower", "hermit"] },
            { text: "逃避所有束縛，來去自如的自由。", pathways: ["door", "fool"] }
        ]},
        { question: "在一場辯論中，你最有可能成為：", answers: [
            { text: "引用法律和規則，構建嚴密論證的律師。", pathways: ["justiciar", "black_emperor"] },
            { text: "洞察對方情緒和動機，從心理上瓦解其論點的分析者。", pathways: ["visionary"] },
            { text: "提出全新視角，顛覆整個辯論前提的思考者。", pathways: ["error", "fool"] },
            { text: "保持沉默，直到最後一刻才揭示真相的觀察者。", pathways: ["darkness", "hermit"] }
        ]},
        { question: "當你感到悲傷或痛苦時，你會：", answers: [
            { text: "將其視為成長的養料，坦然接受並从中汲取力量。", pathways: ["hanged_man", "chained"] },
            { text: "戴上快樂的面具，不讓任何人看到你的脆弱。", pathways: ["fool"] },
            { text: "尋找一個絕對安靜的地方，讓黑暗將自己包裹。", pathways: ["darkness"] },
            { text: "將這種痛苦轉化為行動力，去改變造成痛苦的源頭。", pathways: ["demoness", "red_priest"] }
        ]},
        { question: "你理想中的生活是：", answers: [
            { text: "在一個寧靜的港灣，享受陽光與平和。", pathways: ["sun", "mother"] },
            { text: "不斷旅行，探索世界的每一個角落和秘密。", pathways: ["door"] },
            { text: "建立一個屬於自己的帝國或組織，並制定規則。", pathways: ["black_emperor", "red_priest"] },
            { text: "隱居在圖書館或實驗室，與知識為伴。", pathways: ["white_tower", "hermit", "paragon"] }
        ]},
        { question: "「命運」對你來說是：", answers: [
            { text: "一個可以被預測、甚至被巧妙欺騙的劇本。", pathways: ["fool", "error"] },
            { text: "一股不可抗拒的洪流，只能順應其流動。", pathways: ["wheel_of_fortune"] },
            { text: "一系列隨機事件的組合，充滿了概率和運氣。", pathways: ["wheel_of_fortune"] },
            { text: "一種需要用犧牲和奉獻去交換的恩賜。", pathways: ["hanged_man"] }
        ]},
        { question: "如果可以擁有一種超能力，你會選擇：", answers: [
            { text: "隨意穿梭於任何地方。", pathways: ["door"] },
            { text: "讀懂他人的心思。", pathways: ["visionary"] },
            { text: "讓自己變得極度幸運。", pathways: ["wheel_of_fortune"] },
            { text: "竊取他人的時間或能力。", pathways: ["error"] }
        ]},
        { question: "面對不公義的規則，你會：", answers: [
            { text: "公開挑戰它，並試圖建立新的、更公正的規則。", pathways: ["red_priest", "sun"] },
            { text: "找到規則的漏洞並加以利用，為自己或他人謀利。", pathways: ["black_emperor", "error"] },
            { text: "以絕對的權威宣布此規則無效。", pathways: ["justiciar"] },
            { text: "默默忍受，並在束縛中尋找力量。", pathways: ["chained"] }
        ]},
        { question: "你如何看待「死亡」？", answers: [
            { text: "一切生命的終極安息，是自然秩序的一部分。", pathways: ["death", "darkness"] },
            { text: "一種可以被研究、甚至被利用的資源。", pathways: ["hanged_man", "chained"] },
            { text: "令人恐懼的深淵，是所有欲望的終結。", pathways: ["abyss"] },
            { text: "一個需要被守護的黃昏，是生命循環的必然階段。", pathways: ["twilight_giant"] }
        ]},
        { question: "你更傾向於哪種戰鬥方式？", answers: [
            { text: "召喚雷電與風暴，用純粹的自然之力摧毀敵人。", pathways: ["tyrant"] },
            { text: "設下陷阱和陰謀，讓敵人在不知不覺中走向滅亡。", pathways: ["demoness", "red_priest"] },
            { text: "複製敵人的能力，用其人之道還治其人之身。", pathways: ["door", "white_tower"] },
            { text: "組建一支忠誠的軍隊，用集體的力量淹沒對手。", pathways: ["red_priest", "death"] }
        ]},
        { question: "你認為「美」的最高形式是：", answers: [
            { text: "生命的孕育與自然的和諧。", pathways: ["mother"] },
            { text: "知識的結構與規律的優雅。", pathways: ["white_tower", "hermit"] },
            { text: "變化莫測、充滿神秘感的誘惑。", pathways: ["moon", "demoness"] },
            { text: "絕望與痛苦中所綻放的淒美。", pathways: ["demoness", "hanged_man"] }
        ]},
        { question: "當你獲得一項新技能時，你會：", answers: [
            { text: "馬上將它應用到實踐中，創造出新的東西。", pathways: ["paragon"] },
            { text: "深入研究其背後的原理，直到完全理解為止。", pathways: ["white_tower", "hermit"] },
            { text: "尋找如何將其與其他技能結合，產生意想不到的效果。", pathways: ["fool", "error"] },
            { text: "保持低調，將其作為隱藏的底牌。", pathways: ["darkness", "visionary"] }
        ]},
        { question: "在團隊中，你通常扮演的角色是：", answers: [
            { text: "制定計劃、發號施令的領導者。", pathways: ["red_priest", "black_emperor"] },
            { text: "提供後勤與治療，確保團隊穩定的支援者。", pathways: ["mother", "sun"] },
            { text: "默默守護在最前線，承受最多傷害的保護者。", pathways: ["twilight_giant"] },
            { text: "獨來獨往，在關鍵時刻提供致命一擊的刺客。", pathways: ["demoness", "moon"] }
        ]},
        { question: "你對「黑暗」的感覺是：", answers: [
            { text: "恐懼與未知的來源。", pathways: ["abyss", "demoness"] },
            { text: "寧靜與安眠的港灣。", pathways: ["darkness"] },
            { text: "隱藏秘密與發動突襲的最佳掩護。", pathways: ["hanged_man", "fool"] },
            { text: "需要被光明淨化的邪惡。", pathways: ["sun"] }
        ]},
        { question: "你如何處理自己的欲望？", answers: [
            { text: "將其視為洪水猛獸，用強大的意志力將其束縛。", pathways: ["chained", "justiciar"] },
            { text: "盡情地釋放它，享受欲望帶來的快感。", pathways: ["abyss"] },
            { text: "將其轉化為藝術或創造的動力。", pathways: ["demoness", "moon"] },
            { text: "透過儀式或祈禱來淨化它。", pathways: ["sun", "hanged_man"] }
        ]},
        { question: "你相信「奇蹟」嗎？", answers: [
            { text: "相信，奇蹟是信仰虔誠的回報。", pathways: ["sun"] },
            { text: "不信，一切皆有其因果和規律。", pathways: ["white_tower", "justiciar"] },
            { text: "相信，但奇蹟是可以透過操縱概率或歷史來「製造」的。", pathways: ["fool", "wheel_of_fortune"] },
            { text: "相信，奇蹟源於生命的頑強與自然的偉大。", pathways: ["mother"] }
        ]},
        { question: "你更願意被稱為：", answers: [
            { text: "智者。", pathways: ["white_tower", "hermit"] },
            { text: "英雄。", pathways: ["red_priest", "twilight_giant"] },
            { text: "藝術家。", pathways: ["visionary", "demoness"] },
            { text: "倖存者。", pathways: ["wheel_of_fortune", "chained"] }
        ]},
        { question: "當看到一個精密的機械時，你的第一想法是：", answers: [
            { text: "欣賞它的設計之美。", pathways: ["visionary"] },
            { text: "思考如何改進它，讓它更有效率。", pathways: ["paragon"] },
            { text: "嘗試理解它的運作原理。", pathways: ["white_tower"] },
            { text: "尋找它的弱點或可以利用的故障。", pathways: ["error"] }
        ]},
        { question: "你認為最可怕的事情是：", answers: [
            { text: "失去自由，被永遠囚禁。", pathways: ["door", "chained"] },
            { text: "失去理智，變得瘋狂。", pathways: ["visionary", "moon"] },
            { text: "失去希望，陷入永恆的絕望。", pathways: ["demoness", "abyss"] },
            { text: "失去自我，成為他人的傀儡。", pathways: ["fool", "hanged_man"] }
        ]},
        { question: "你如何看待「犧牲」？", answers: [
            { text: "為了更偉大的目標，必要的付出。", pathways: ["red_priest", "twilight_giant"] },
            { text: "一種可以換取力量的交易。", pathways: ["hanged_man"] },
            { text: "愚蠢的行為，應不惜一切代價保護自己。", pathways: ["error", "abyss"] },
            { text: "崇高的美德，是愛的最高體現。", pathways: ["sun", "mother"] }
        ]},
        { question: "一個完美的社會應該基於：