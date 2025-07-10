document.addEventListener('DOMContentLoaded', () => {

    // --- 資料源 ---
    // 途徑資料庫 (根據途徑占卜矩陣)
    const pathways = [
        { name: "占卜家", tarot: "0 - 愚者", scores: { order: 1, secrecy: 7, humanity: 3, intellect: 8 }, ethos: "愚弄歷史，操控靈線，創造奇蹟。", description: "你行走在歷史的縫隙中，窺探著命運的絲線。世界於你而言是一場宏大的戲劇，而你既是觀眾，也是導演。奇蹟是你手中的戲法，愚弄是你對抗荒謬的武器。", adjacent: ["學徒", "偷盜者"], image: "https://path-to-your-image/fool.jpg" },
        { name: "學徒", tarot: "I - 魔術師", scores: { order: 3, secrecy: 5, humanity: 2, intellect: 7 }, ethos: "記錄萬物，穿梭虛空，探索未知。", description: "知識的殿堂為你敞開，空間的奧秘在你指尖展開。你是一位永恆的學習者與旅行者，通過記錄與複製非凡，你將整個世界納入你的魔法書頁之中。", adjacent: ["占卜家", "偷盜者"], image: "https://path-to-your-image/magician.jpg" },
        { name: "偷盜者", tarot: "VI - 戀人", scores: { order: -8, secrecy: 6, humanity: -7, intellect: 5 }, ethos: "竊取概念，欺瞞命運，寄生規則。", description: "規則並非用來遵守，而是用來利用的。你是一位行走在陰影中的欺詐師，能夠竊取他人的思想、能力甚至時間。對你而言，整個世界都是一個等待被解密的巨大鎖孔。", adjacent: ["占卜家", "學徒"], image: "https://path-to-your-image/lovers.jpg" },
        { name: "觀眾", tarot: "VIII - 正義", scores: { order: 6, secrecy: 8, humanity: 5, intellect: 9 }, ethos: "觀察人心，編織夢境，空想現實。", description: "你擁有洞悉人心的雙眼，能輕易看穿他人的偽裝。你遊走於現實與夢境的邊界，既是冷靜的旁觀者，也是心靈的操縱師。最終，你所構想的一切，都將成為現實。", adjacent: ["太陽", "倒吊人", "白塔"], image: "https://path-to-your-image/justice.jpg" },
        { name: "歌頌者", tarot: "XIX - 太陽", scores: { order: 8, secrecy: -7, humanity: 6, intellect: -3 }, ethos: "頌揚光明，訂立契約，淨化邪穢。", description: "你是光明的使者，是勇氣與秩序的化身。你的歌聲能驅散恐懼，你的光芒能淨化一切污穢。你通過神聖的契約維護正義，是黑暗中永不熄滅的希望。", adjacent: ["觀眾", "倒吊人", "白塔"], image: "https://path-to-your-image/sun.jpg" },
        { name: "秘祈人", tarot: "XII - 倒吊人", scores: { order: -5, secrecy: 8, humanity: -8, intellect: 4 }, ethos: "侍奉隱秘，放牧靈魂，墮落救贖。", description: "你聆聽來自星界彼端的耳語，以犧牲換取力量。你行走在墮落與救贖的邊緣，通過獻祭自我或他人，來維繫那不可言說的平衡。你的道路充滿痛苦，也充滿力量。", adjacent: ["觀眾", "太陽", "白塔"], image: "https://path-to-your-image/hanged_man.jpg" },
        { name: "閱讀者", tarot: "XVI - 塔", scores: { order: 9, secrecy: 4, humanity: 1, intellect: 10 }, ethos: "解析萬物，洞悉規則，全知全能。", description: "世界是一本待解的巨著，而你是最專注的讀者。你追求對萬事萬物規則的極致理解，相信知識本身就是最高的權柄。通過解析與洞悉，你最終將成為行走的圖書館。", adjacent: ["觀眾", "太陽", "倒吊人"], image: "https://path-to-your-image/tower.jpg" },
        { name: "不眠者", tarot: "XVII - 星星", scores: { order: 7, secrecy: 9, humanity: 4, intellect: 2 }, ethos: "擁抱黑夜，執掌隱秘，安撫瘋狂。", description: "當白日沉寂，你的世界才剛剛開始。你守護著黑夜的秘密，安撫著遊蕩的噩夢與瘋狂。你是永恆的守夜人，在靜謐的黑暗中維繫著脆弱的平衡。", adjacent: ["收屍人", "戰士"], image: "https://path-to-your-image/star.jpg" },
        { name: "收屍人", tarot: "XIII - 死神", scores: { order: 8, secrecy: 6, humanity: -6, intellect: 3 }, ethos: "看守冥界，擺渡靈魂，迎接永眠。", description: "你行走在生與死的邊界，是亡魂的引路人與安撫者。你對死亡有著超然的理解，不畏懼腐朽與終結。你執掌著冥界的鑰匙，確保生命的循環得以延續。", adjacent: ["不眠者", "戰士"], image: "https://path-to-your-image/death.jpg" },
        { name: "戰士", tarot: "VIII - 力量", scores: { order: 5, secrecy: -8, humanity: 2, intellect: -9 }, ethos: "磨練武藝，守護黎明，化身榮耀。", description: "你的身體就是你最值得信賴的武器。通過千錘百鍊的技藝與不屈的意志，你追求力量的極致。你既是勇猛的鬥士，也是堅定的守護者，用榮耀鑄就你的傳奇。", adjacent: ["不眠者", "收屍人"], image: "https://path-to-your-image/strength.jpg" },
        { name: "水手", tarot: "V - 教皇", scores: { order: -4, secrecy: -9, humanity: -5, intellect: -8 }, ethos: "駕馭風暴，統御海洋，施展天災。", description: "風暴是你的號角，海洋是你的疆土。你崇尚最原始、最直接的力量，以絕對的威勢鎮壓一切。你從不隱藏你的憤怒，如同天災般降臨，令萬物敬畏。", adjacent: ["觀眾", "太陽", "倒吊人", "白塔"], image: "https://path-to-your-image/hierophant.jpg" },
        { name: "獵人", tarot: "VII - 戰車", scores: { order: -9, secrecy: -6, humanity: -4, intellect: -7 }, ethos: "挑釁戰爭，收割生命，化身災禍。", description: "混亂是你的階梯，戰爭是你的藝術。你擅長挑釁與煽動，在衝突的烈焰中收割勝利。你享受追獵的快感，將世界視為你的獵場，不斷尋找更強大的對手。", adjacent: ["魔女"], image: "https://path-to-your-image/chariot.jpg" },
        { name: "魔女", tarot: "III - 皇后", scores: { order: -7, secrecy: 2, humanity: -9, intellect: -2 }, ethos: "教唆慾望，傳播痛苦，帶來末日。", description: "你是痛苦與絕望的化身，是激化矛盾的催化劑。你深知慾望的甜美與致命，並以此為武器，將世界拖入歡愉的深淵。你的美麗與你的危險一樣，令人無法抗拒。", adjacent: ["獵人"], image: "https://path-to-your-image/empress.jpg" },
        { name: "藥師", tarot: "XVIII - 月亮", scores: { order: -2, secrecy: 3, humanity: -1, intellect: 6 }, ethos: "調製魔藥，創造生命，擁抱血族。", description: "你探索生命的奧秘，通過調配與融合，創造出奇異的魔藥與生命。你行走在月光下的陰影中，對血液與黑暗有著天生的親和力，追求著另類的永生。", adjacent: ["耕種者"], image: "https://path-to-your-image/moon.jpg" },
        { name: "耕種者", tarot: "XXI - 世界", scores: { order: 4, secrecy: -5, humanity: 7, intellect: -4 }, ethos: "播撒豐饒，孕育萬物，化身大地。", description: "你代表著生命、豐饒與守護。你滋養萬物，從播種到收穫，體驗著生命循環的喜悅。你擁有大地般的耐心與溫柔，是文明與族群最堅實的後盾。", adjacent: ["藥師"], image: "https://path-to-your-image/world.jpg" },
        { name: "律師", tarot: "IV - 皇帝", scores: { order: 9, secrecy: 3, humanity: -8, intellect: 7 }, ethos: "發現漏洞，扭曲規則，死而復生。", description: "秩序並非神聖不可侵犯，而是充滿了可供利用的漏洞。你精通規則的每一個細節，只為將其扭曲，服務於你自身的意志。你建立的帝國，是對既有秩序的嘲弄與篡奪。", adjacent: ["仲裁人"], image: "https://path-to-your-image/emperor.jpg" },
        { name: "仲裁人", tarot: "XX - 審判", scores: { order: 10, secrecy: -4, humanity: 4, intellect: -5 }, ethos: "制定秩序，執行律法，維護平衡。", description: "你是秩序的化身，是規則的守護者。你相信絕對的公正與權威是維繫世界穩定的基石。你用手中的劍與法典，裁決紛爭，懲戒混亂，不容許絲毫偏離。", adjacent: ["律師"], image: "https://path-to-your-image/judgement.jpg" },
        { name: "囚犯", tarot: "XIV - 節制", scores: { order: -6, secrecy: 1, humanity: -10, intellect: -6 }, ethos: "擁抱詛咒，掙脫束縛，化身神孽。", description: "你生來就被詛咒所束縛，痛苦是你唯一的同伴。但你並未屈服，反而將這份痛苦化為力量，擁抱瘋狂，挑戰命運。你渴望掙脫一切枷鎖，哪怕代價是化身為邪物。", adjacent: ["罪犯"], image: "https://path-to-your-image/temperance.jpg" },
        { name: "罪犯", tarot: "XV - 惡魔", scores: { order: -10, secrecy: -2, humanity: -9, intellect: -4 }, ethos: "沉淪慾望，散播墮落，化身深淵。", description: "你徹底擁抱了內心的黑暗，將慾望與墮落視為真理。你從不掩飾自己的邪惡，並樂於將他人一同拉入深淵。對你而言，道德只是弱者的藉口，混亂才是世界的本質。", adjacent: ["囚犯"], image: "https://path-to-your-image/devil.jpg" },
        { name: "窺秘人", tarot: "IX - 隱者", scores: { order: 2, secrecy: 10, humanity: 0, intellect: 9 }, ethos: "窺探奧秘，解析魔法，隱於世外。", description: "世界對你而言是一個巨大的謎題，你畢生致力於窺探其背後的奧秘。你隱居幕後，沉浸在知識的海洋中，對世俗的權力與紛爭毫無興趣。真理是你唯一的追求。", adjacent: ["通識者"], image: "https://path-to-your-image/hermit.jpg" },
        { name: "通識者", tarot: "II - 女祭司", scores: { order: 7, secrecy: -3, humanity: 3, intellect: 8 }, ethos: "相信知識，工於造物，啟蒙文明。", description: "你堅信知識就是力量，並致力於將其轉化為實際的造物。你是一位傑出的工匠與發明家，通過你的智慧與雙手，推動文明的進步，為世界帶來啟蒙之光。", adjacent: ["窺秘人"], image: "https://path-to-your-image/high_priestess.jpg" },
        { name: "怪物", tarot: "X - 命運之輪", scores: { order: 0, secrecy: 0, humanity: 0, intellect: 0 }, ethos: "玩弄概率，重啟命運，身化巨蛇。", description: "你生來便能聽見命運的骰子滾動的聲音。幸運與災禍是你的雙生子，概率是你手中的黏土。你通過精密的計算和對宿命的直覺，最終將成為那銜尾的巨蛇，重啟萬物的輪迴。", adjacent:, image: "https://path-to-your-image/wheel_of_fortune.jpg" }
    ];

    // 問題資料庫 (擴充至30題)
    const questions = [
        {
            text: "面對一個複雜混亂的系統，您更傾向於：",
            answers: [
                { text: "建立一套全新的、嚴格的規則來徹底取代它。", effects: { order: 3, intellect: 1 } },
                { text: "從混亂中尋找規律，並利用這些規律為自己服務。", effects: { chaos: -2, intellect: 2, secrecy: 1 } },
                { text: "徹底摧毀它，相信無序本身就是一種更自然的狀態。", effects: { chaos: -3, instinct: -1 } },
                { text: "保持距離，僅僅觀察和記錄它的運作方式，不加干涉。", effects: { secrecy: 2, intellect: 2 } }
            ]
        },
        {
            text: "您認為「真相」的價值在於：",
            answers: [
                { text: "它是普世的光明，應當被所有人知曉。", effects: { revelation: -3, humanity: 2 } },
                { text: "它是最強大的武器，應當被謹慎地隱藏和使用。", effects: { secrecy: 3, divinity: -1 } },
                { text: "它本身沒有意義，其意義取決於如何詮釋和利用。", effects: { chaos: -2, intellect: 1, divinity: -1 } },
                { text: "深入理解真相的過程，比真相本身更重要。", effects: { intellect: 3, secrecy: 1 } }
            ]
        },
        {
            text: "在一場重要的談判中，您會選擇的策略是：",
            answers: [
                { text: "以絕對的實力或權威進行壓制，迫使對方接受您的條件。", effects: { order: 2, instinct: -3 } },
                { text: "透過精湛的言辭和邏輯，引導對方相信您的方案對他們最有利。", effects: { intellect: 3, revelation: -1 } },
                { text: "找出規則中的漏洞，設計一個讓對方無法拒絕的合法陷阱。", effects: { order: 1, intellect: 2, chaos: -1 } },
                { text: "運用魅力和共情，讓對方在情感上認同您，從而達成共識。", effects: { humanity: 3, revelation: -1 } }
            ]
        },
        {
            text: "當您的長期計劃遭遇了無法預料的徹底失敗，您的第一反應是：",
            answers: [
                { text: "加倍投入，用更強大的力量或資源強行推進原計劃。", effects: { instinct: -3, divinity: -1 } },
                { text: "冷靜地分析失敗的每一個細節，尋找問題的根本原因並修正。", effects: { intellect: 3, order: 1 } },
                { text: "毫不猶豫地放棄，並立刻構思一個全新的、完全不同的方案。", effects: { chaos: -3, intellect: 1 } },
                { text: "尋找一種方法來改變導致失敗的外部規則或環境本身。", effects: { order: 2, divinity: -2, intellect: 1 } }
            ]
        },
        {
            text: "如果可以獲得一種能力，您會選擇：",
            answers: [
                { text: "預知未來，洞悉命運的走向。", effects: { intellect: 2, secrecy: 1 } },
                { text: "操控他人的思想和行為。", effects: { divinity: -3, secrecy: 2 } },
                { text: "穿梭於空間和歷史之中。", effects: { intellect: 2, chaos: -1 } },
                { text: "擁有近乎不死的強大肉體。", effects: { instinct: -2, divinity: -1 } }
            ]
        },
        {
            text: "在團隊合作中，您最看重的是：",
            answers: [
                { text: "清晰的等級制度和絕對的服從。", effects: { order: 3 } },
                { text: "每個成員都能發揮其獨特才能的協同效應。", effects: { chaos: -1, intellect: 2 } },
                { text: "團隊能夠達成目標，過程和手段並不重要。", effects: { divinity: -2, order: 1 } },
                { text: "成員之間深厚的情感聯繫和相互守護。", effects: { humanity: 3 } }
            ]
        },
        {
            text: "您更認同哪種生活哲學？",
            answers: [
                { text: "人生最大的成就是創造出獨一無二的作品。", effects: { intellect: 2, humanity: 1 } },
                { text: "不斷學習和探索是人生的最高追求。", effects: { intellect: 3 } },
                { text: "體驗不同的角色和生活遠比固守一隅有趣。", effects: { chaos: -2, secrecy: 1 } },
                { text: "在競爭中不斷變強並最終勝出是生存的唯一法則。", effects: { instinct: -2, divinity: -1 } }
            ]
        },
        {
            text: "面對一個道德上有爭議但能帶來巨大利益的機會，您會：",
            answers: [
                { text: "堅決拒絕，因為原則不容挑戰。", effects: { order: 2, humanity: 2 } },
                { text: "尋找一種方式，既能獲得利益，又能將其行為在道德或法律上合理化。", effects: { order: 1, intellect: 2, divinity: -1 } },
                { text: "毫不猶豫地抓住機會，利益最大化是首要考量。", effects: { divinity: -3, chaos: -1 } },
                { text: "感到內心掙扎，並試圖尋找一個兩全其美的第三選項。", effects: { humanity: 2, chaos: -1 } }
            ]
        },
        {
            text: "您認為一個理想的社會應該基於：",
            answers: [
                { text: "完美的法律與秩序。", effects: { order: 3 } },
                { text: "個體的自由與創造力。", effects: { chaos: -3 } },
                { text: "傳統、信仰與榮耀。", effects: { order: 2, instinct: -1 } },
                { text: "適者生存的自然法則。", effects: { chaos: -2, instinct: -2 } }
            ]
        },
        {
            text: "當您感到被誤解時，您通常會：",
            answers: [
                { text: "努力解釋，直到對方完全理解您的真實意圖。", effects: { revelation: -2, humanity: 1 } },
                { text: "毫不在意，他人的看法無關緊要。", effects: { divinity: -2, secrecy: 1 } },
                { text: "反過來利用這種誤解，將其變為對自己有利的局面。", effects: { secrecy: 2, intellect: 1, chaos: -1 } },
                { text: "感到憤怒，並用行動證明對方是錯誤的。", effects: { instinct: -3, revelation: -1 } }
            ]
        },
        {
            text: "您更喜歡的工作環境是：",
            answers: [
                { text: "獨自一人的書房或實驗室。", effects: { secrecy: 2, intellect: 2 } },
                { text: "充滿激情與挑戰的戰場或競技場。", effects: { instinct: -3, revelation: -1 } },
                { text: "權力鬥爭的中心，如宮廷或董事會。", effects: { order: 2, divinity: -2 } },
                { text: "隱藏在幕後，觀察和影響著一切的秘密組織。", effects: { secrecy: 3, intellect: 1 } }
            ]
        },
        {
            text: "對於「運氣」，您的看法是：",
            answers: [
                { text: "它是可以被計算和操縱的變數。", effects: { intellect: 3 } },
                { text: "它是宇宙無常的體現，只能順應。", effects: { chaos: -1, humanity: 1 } },
                { text: "它是弱者的藉口，真正的強者創造自己的運氣。", effects: { instinct: -2, divinity: -1 } },
                { text: "它是值得研究的神秘力量。", effects: { secrecy: 1, intellect: 2 } }
            ]
        },
        {
            text: "如果必須捨棄一樣東西，您會選擇：",
            answers: [
                { text: "您的情感。", effects: { divinity: -3 } },
                { text: "您的記憶。", effects: { chaos: -2, instinct: -1 } },
                { text: "您的原則。", effects: { chaos: -2, divinity: -1 } },
                { text: "您的人性。", effects: { divinity: -4 } }
            ]
        },
        {
            text: "在處理危機時，您更依賴：",
            answers: [
                { text: "精心準備的預案和流程。", effects: { order: 2, intellect: 2 } },
                { text: "臨場的直覺和即興發揮。", effects: { instinct: -2, chaos: -1 } },
                { text: "壓倒性的力量。", effects: { instinct: -3 } },
                { text: "難以捉摸的欺騙和誤導。", effects: { secrecy: 2, chaos: -2 } }
            ]
        },
        {
            text: "您認為「美」的本質是：",
            answers: [
                { text: "和諧、秩序與對稱。", effects: { order: 2, humanity: 1 } },
                { text: "生命力、繁衍與生長。", effects: { humanity: 2, instinct: -1 } },
                { text: "痛苦、絕望與矛盾中的張力。", effects: { divinity: -2, chaos: -1 } },
                { text: "知識、智慧與奧秘的光輝。", effects: { intellect: 3, secrecy: 1 } }
            ]
        },
        {
            text: "一個古老的、被封印的存在向您許諾無窮的力量，代價是釋放它，您會：",
            answers: [
                { text: "欺騙它，在獲得力量後重新封印或摧毀它。", effects: { secrecy: 2, intellect: 2, divinity: -1 } },
                { text: "拒絕它，並加固封印，因為有些風險絕不能冒。", effects: { order: 3, humanity: 1 } },
                { text: "接受交易，力量本身沒有善惡，關鍵在於使用者。", effects: { divinity: -3, chaos: -2 } },
                { text: "試圖與它溝通，了解其本質和歷史，再做決定。", effects: { intellect: 3, secrecy: 1 } }
            ]
        },
        {
            text: "您對「傳統」的態度是：",
            answers: [
                { text: "它是智慧的結晶，應當被尊重和守護。", effects: { order: 3, humanity: 1 } },
                { text: "它是束縛思想的枷鎖，應當被打破。", effects: { chaos: -3, revelation: -1 } },
                { text: "它是可以被利用的工具，用以凝聚人心或達成目的。", effects: { order: 1, divinity: -2, intellect: 1 } },
                { text: "它是歷史的一部分，值得研究但不一定需要遵循。", effects: { intellect: 2, chaos: -1 } }
            ]
        },
        {
            text: "您更傾向於通過何種方式獲得安全感？",
            answers: [
                { text: "擁有絕對的控制權。", effects: { order: 2, divinity: -2 } },
                { text: "擁有無人能及的知識。", effects: { intellect: 3, secrecy: 1 } },
                { text: "擁有不被任何人發現的秘密。", effects: { secrecy: 3 } },
                { text: "擁有堅不可摧的盟友。", effects: { humanity: 3, revelation: -1 } }
            ]
        },
        {
            text: "當您看到不公義的事情發生時，您的第一衝動是：",
            answers: [
                { text: "運用規則和程序來尋求公正。", effects: { order: 3, intellect: 1 } },
                { text: "用自己的力量直接介入，懲罰作惡者。", effects: { instinct: -3, revelation: -1 } },
                { text: "煽動群眾的情緒，引發更大的衝突來暴露問題。", effects: { chaos: -3, revelation: -1 } },
                { text: "思考如何從這件事中為自己謀取利益。", effects: { divinity: -2, intellect: 1, secrecy: 1 } }
            ]
        },
        {
            text: "您認為最深刻的痛苦來源於：",
            answers: [
                { text: "失去摯愛。", effects: { humanity: 3 } },
                { text: "理想的破滅。", effects: { humanity: 2, intellect: 1 } },
                { text: "無盡的孤獨。", effects: { divinity: -2, secrecy: 1 } },
                { text: "被人背叛。", effects: { humanity: 2, order: 1 } }
            ]
        },
        {
            text: "在探索一個未知的古代遺蹟時，您的首要目標是：",
            answers: [
                { text: "尋找其中隱藏的寶藏或強大物品。", effects: { instinct: -2, divinity: -1 } },
                { text: "解讀壁畫和文獻，還原此地的歷史真相。", effects: { intellect: 3, secrecy: 1 } },
                { text: "活著出去，並將情報賣個好價錢。", effects: { chaos: -2, divinity: -1 } },
                { text: "測試自己的極限，享受冒險的刺激。", effects: { instinct: -2, chaos: -1 } }
            ]
        },
        {
            text: "您如何看待「瘋狂」？",
            answers: [
                { text: "它是理智的喪失，一種需要被治癒或清除的疾病。", effects: { order: 2, humanity: 1 } },
                { text: "它是另一種形式的理智，蘊含著被常人忽視的洞見。", effects: { intellect: 2, chaos: -1 } },
                { text: "它是可以被利用的力量，是打破常規的催化劑。", effects: { chaos: -2, divinity: -2 } },
                { text: "它是所有智慧生命最終無法避免的歸宿。", effects: { divinity: -3, secrecy: 1 } }
            ]
        },
        {
            text: "您更願意成為：",
            answers: [
                { text: "受人敬仰的聖人。", effects: { humanity: 3, revelation: -2 } },
                { text: "令人畏懼的暴君。", effects: { divinity: -2, order: 2, instinct: -1 } },
                { text: "無人知曉的操縱者。", effects: { secrecy: 3, divinity: -1 } },
                { text: "孤獨的真理探尋者。", effects: { intellect: 2, secrecy: 2, divinity: -1 } }
            ]
        },
        {
            text: "當面對一個比您強大太多的敵人時，您會：",
            answers: [
                { text: "尋找其弱點，策劃一場完美的陰謀。", effects: { intellect: 3, secrecy: 2 } },
                { text: "暫時撤退，積蓄力量，等待復仇的時機。", effects: { order: 1, instinct: -2 } },
                { text: "挑釁並激怒它，使其在憤怒中犯錯。", effects: { chaos: -3, instinct: -1 } },
                { text: "嘗試與其談判，或加入它。", effects: { divinity: -2, chaos: -1 } }
            ]
        },
        {
            text: "您認為最理想的復仇是：",
            answers: [
                { text: "讓對方在眾目睽睽之下身敗名裂。", effects: { revelation: -3, order: 1 } },
                { text: "讓對方在不知不覺中失去一切，至死都不明白為何。", effects: { secrecy: 3, divinity: -1 } },
                { text: "一場酣暢淋漓、充滿破壞與毀滅的正面對決。", effects: { instinct: -3, chaos: -1 } },
                { text: "看到對方被自己建立的規則所反噬。", effects: { order: 2, intellect: 2, divinity: -1 } }
            ]
        },
        {
            text: "關於「變化」，您的看法是：",
            answers: [
                { text: "它是危險的，會破壞穩定和秩序。", effects: { order: 3 } },
                { text: "它是機會，是通往進步的唯一途徑。", effects: { chaos: -3 } },
                { text: "它是宇宙的常態，無所謂好壞。", effects: { intellect: 1, humanity: 1 } },
                { text: "它是可以被引導和設計的。", effects: { intellect: 2, order: 1 } }
            ]
        },
        {
            text: "您對自然的態度更接近於：",
            answers: [
                { text: "它是需要被保護和尊重的生命之母。", effects: { humanity: 3, order: 1 } },
                { text: "它是殘酷的鬥獸場，充滿了生存競爭。", effects: { instinct: -2, chaos: -1 } },
                { text: "它是可以被改造和利用的資源庫。", effects: { intellect: 2, divinity: -1 } },
                { text: "它是充滿了神秘力量和靈性的啟示源泉。", effects: { secrecy: 2, humanity: 1 } }
            ]
        },
        {
            text: "如果您發現世界的根基是一個巨大的謊言，您會：",
            answers: [
                { text: "試圖揭露它，即使會引發全球性的恐慌。", effects: { revelation: -3, chaos: -2 } },
                { text: "守住這個秘密，並利用它來保護自己和身邊的人。", effects: { secrecy: 3, humanity: 1 } },
                { text: "接受這個設定，並思考如何在這個謊言之上建立自己的真實。", effects: { intellect: 2, divinity: -2 } },
                { text: "對此感到興奮，因為這意味著有更多未知的奧秘等待探索。", effects: { intellect: 2, chaos: -1 } }
            ]
        },
        {
            text: "在一段關係中（友情、愛情等），您最無法忍受的是：",
            answers: [
                { text: "對方試圖控制您。", effects: { chaos: -3 } },
                { text: "對方的愚蠢和無知。", effects: { intellect: 2, divinity: -1 } },
                { text: "對方的背叛和欺騙。", effects: { order: 2, humanity: 1 } },
                { text: "對方的軟弱和逃避。", effects: { instinct: -2, divinity: -1 } }
            ]
        },
        {
            text: "站在人生的終點回望，您希望自己留下了什麼？",
            answers: [
                { text: "一個不朽的帝國或傳奇。", effects: { order: 2, divinity: -2, revelation: -1 } },
                { text: "一套影響後世的思想或知識體系。", effects: { intellect: 3, revelation: -1 } },
                { text: "一段充滿了愛、歡笑與淚水，無怨無悔的記憶。", effects: { humanity: 3 } },
                { text: "一個沒有人能解開的謎。", effects: { secrecy: 3, intellect: 1 } }
            ]
        }
    ];

    // --- DOM 元素 ---
    const introScreen = document.getElementById('intro-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const questionTitle = document.getElementById('question-title');
    const answerGrid = document.getElementById('answer-grid');
    const progressBar = document.getElementById('progress-bar');
    const pathwayCard = document.getElementById('pathway-card');
    const adjacentPathsGrid = document.getElementById('adjacent-paths-grid');

    // --- 狀態變數 ---
    let currentQuestionIndex = 0;
    let userScores = { order: 0, chaos: 0, secrecy: 0, revelation: 0, humanity: 0, divinity: 0, intellect: 0, instinct: 0 };

    // --- 核心函數 ---
    function startQuiz() {
        currentQuestionIndex = 0;
        userScores = { order: 0, chaos: 0, secrecy: 0, revelation: 0, humanity: 0, divinity: 0, intellect: 0, instinct: 0 };
        introScreen.classList.remove('active');
        resultScreen.classList.remove('active');
        quizScreen.classList.add('active');
        displayQuestion();
    }

    function displayQuestion() {
        const question = questions[currentQuestionIndex];
        questionTitle.textContent = question.text;
        answerGrid.innerHTML = '';

        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.classList.add('answer-btn');
            button.textContent = answer.text;
            button.dataset.effects = JSON.stringify(answer.effects);
            button.addEventListener('click', selectAnswer);
            answerGrid.appendChild(button);
        });

        // 更新進度條
        const progress = ((currentQuestionIndex) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function selectAnswer(e) {
        const effects = JSON.parse(e.target.dataset.effects);
        for (const key in effects) {
            if (userScores.hasOwnProperty(key)) {
                userScores[key] += effects[key];
            }
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            showResult();
        }
    }

    function calculateResult() {
        let bestMatch = null;
        let minDistance = Infinity;

        const finalScores = {
            orderChaos: userScores.order + userScores.chaos,
            secrecyRevelation: userScores.secrecy + userScores.revelation,
            humanityDivinity: userScores.humanity + userScores.divinity,
            intellectInstinct: userScores.intellect + userScores.instinct
        };

        pathways.forEach(pathway => {
            const p = pathway.scores;
            const u = finalScores;
            // 計算四維歐幾里得距離
            const distance = Math.sqrt(
                Math.pow(p.order - u.orderChaos, 2) +
                Math.pow(p.secrecy - u.secrecyRevelation, 2) +
                Math.pow(p.humanity - u.humanityDivinity, 2) +
                Math.pow(p.intellect - u.intellectInstinct, 2)
            );

            if (distance < minDistance) {
                minDistance = distance;
                bestMatch = pathway;
            }
        });
        return bestMatch;
    }

    function showResult() {
        const result = calculateResult();
        
        // 填充結果卡片
        pathwayCard.innerHTML = `
            <h2 class="pathway-name">${result.name}</h2>
            <p class="tarot-card">${result.tarot}</p>
            <div class="pathway-image" style="background-image: url('${result.image |

| ''}')"></div>
            <p class="pathway-ethos">${result.ethos}</p>
            <p class="pathway-description">${result.description}</p>
        `;

        // 填充相鄰途徑
        adjacentPathsGrid.innerHTML = '';
        if (result.adjacent && result.adjacent.length > 0) {
            result.adjacent.forEach(adj => {
                const adjElement = document.createElement('div');
                adjElement.classList.add('adjacent-path');
                adjElement.textContent = adj;
                adjacentPathsGrid.appendChild(adjElement);
            });
            document.getElementById('adjacent-paths-container').style.display = 'block';
        } else {
            document.getElementById('adjacent-paths-container').style.display = 'none';
        }

        quizScreen.classList.remove('active');
        resultScreen.classList.add('active');
    }

    // --- 事件監聽 ---
    startBtn.addEventListener('click', startQuiz);
    restartBtn.addEventListener('click', startQuiz);

});