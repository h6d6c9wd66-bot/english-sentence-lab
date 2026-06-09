window.ESL_DATA = {
  categories: ["全部", "日常聊天", "工作沟通", "旅行", "餐厅", "酒店", "购物", "摄影", "服装穿搭", "社交媒体", "情感表达"],
  levels: ["全部", "L1", "L2", "L3", "L4"],
  reviewSteps: [1, 3, 7, 14, 30, 90],
  sentences: [
    {
      id: "s001",
      text: "How's it going?",
      translation: "最近怎么样？",
      category: "日常聊天",
      level: "L2",
      pattern: "How is it going?",
      grammar: {
        structure: [["How", "疑问方式"], ["is it going", "当前状态/进展"]],
        why: "这是一句非常自然的寒暄。it 指对方最近的生活、工作或整体状态，不需要逐字翻译。",
        compare: "How are you? 更普通；How's it going? 更轻松、更口语。",
        chunks: ["How's it going"],
        natural: ["How are things?", "How have you been?"]
      }
    },
    {
      id: "s002",
      text: "I'm on my way.",
      translation: "我在路上了。",
      category: "日常聊天",
      level: "L2",
      pattern: "I'm on my way ...",
      grammar: {
        structure: [["I", "主语"], ["am", "状态"], ["on my way", "固定表达：在路上"]],
        why: "on my way 是英语里表达“正在去某地”的固定说法。它强调人已经出发。",
        compare: "I go there 表示习惯或事实；I'm on my way 表示现在已经在去的路上。",
        chunks: ["on my way"],
        natural: ["I'm on my way home.", "I'm heading there now."]
      }
    },
    {
      id: "s003",
      text: "That sounds good.",
      translation: "听起来不错。",
      category: "日常聊天",
      level: "L2",
      pattern: "That sounds ...",
      grammar: {
        structure: [["That", "对方的建议/想法"], ["sounds", "听起来"], ["good", "评价"]],
        why: "sound 在这里不是“声音”，而是“听起来给人的感觉”。",
        compare: "That is good 是直接判断；That sounds good 是听到建议后的自然回应。",
        chunks: ["sounds good"],
        natural: ["Sounds great.", "That works for me."]
      }
    },
    {
      id: "s004",
      text: "I'll think about it.",
      translation: "我会考虑一下。",
      category: "工作沟通",
      level: "L3",
      pattern: "I'll think about ...",
      grammar: {
        structure: [["I", "主语"], ["will think about", "将会考虑"], ["it", "这件事"]],
        why: "will 表示接下来会做。think about 是固定搭配，意思是认真考虑。",
        compare: "I think it 常常不自然；think about it 才是“考虑这件事”。",
        chunks: ["think about"],
        natural: ["Let me think about it.", "I'll get back to you."]
      }
    },
    {
      id: "s005",
      text: "I'm looking for a coffee shop nearby.",
      translation: "我在找附近的咖啡店。",
      category: "旅行",
      level: "L3",
      pattern: "I'm looking for ... nearby.",
      grammar: {
        structure: [["I", "主语"], ["am looking for", "谓语：正在寻找"], ["a coffee shop", "宾语"], ["nearby", "地点补充"]],
        why: "I'm looking for 表示此刻正在找，比 I look for 更符合当前场景。a coffee shop 表示任意一家咖啡店，不是特定那一家。",
        compare: "I look for 表示经常找或一般事实；I'm looking for 表示现在正在找。",
        chunks: ["look for", "a coffee shop", "nearby"],
        natural: ["I'm searching for a coffee shop.", "I'm trying to find a coffee shop nearby."]
      }
    },
    {
      id: "s006",
      text: "Could you help me with this?",
      translation: "你能帮我处理一下这个吗？",
      category: "工作沟通",
      level: "L3",
      pattern: "Could you help me with ...?",
      grammar: {
        structure: [["Could you", "礼貌请求"], ["help me", "帮助我"], ["with this", "在这件事上"]],
        why: "Could you 比 Can you 更委婉。help me with 是固定搭配，表示帮我处理某事。",
        compare: "Help me this 不自然；要说 help me with this。",
        chunks: ["Could you", "help me with"],
        natural: ["Could you give me a hand?", "Can you help me with this?"]
      }
    },
    {
      id: "s007",
      text: "I'd like to check in.",
      translation: "我想办理入住。",
      category: "酒店",
      level: "L3",
      pattern: "I'd like to ...",
      grammar: {
        structure: [["I would like to", "我想要，礼貌表达"], ["check in", "办理入住"]],
        why: "I'd like to 是服务场景里很自然的礼貌表达，比 I want 更柔和。",
        compare: "I want to check in 可以懂，但语气比较直接。",
        chunks: ["I'd like to", "check in"],
        natural: ["I have a reservation.", "I'd like to check out."]
      }
    },
    {
      id: "s008",
      text: "Can I get the bill, please?",
      translation: "可以给我账单吗？",
      category: "餐厅",
      level: "L2",
      pattern: "Can I get ..., please?",
      grammar: {
        structure: [["Can I get", "我可以要"], ["the bill", "账单"], ["please", "礼貌补充"]],
        why: "在餐厅，get the bill 是很常见的自然表达。please 让语气更礼貌。",
        compare: "Give me the bill 太直接；Can I get the bill, please? 更自然。",
        chunks: ["Can I get", "the bill"],
        natural: ["Could we get the check, please?", "Can I pay now?"]
      }
    },
    {
      id: "s009",
      text: "Does this come in a smaller size?",
      translation: "这个有小一点的尺码吗？",
      category: "购物",
      level: "L3",
      pattern: "Does this come in ...?",
      grammar: {
        structure: [["Does this", "这个是否"], ["come in", "有某种版本/尺码"], ["a smaller size", "小一点的尺码"]],
        why: "come in 在购物场景里常表示“有某种颜色、尺码或款式”。",
        compare: "Is there smaller size 少了冠词，不够自然；a smaller size 更完整。",
        chunks: ["come in", "a smaller size"],
        natural: ["Does this come in black?", "Do you have this in medium?"]
      }
    },
    {
      id: "s010",
      text: "Could you take a photo of me?",
      translation: "你能帮我拍张照吗？",
      category: "摄影",
      level: "L3",
      pattern: "Could you take a photo of ...?",
      grammar: {
        structure: [["Could you", "礼貌请求"], ["take a photo", "拍照"], ["of me", "给我/以我为对象"]],
        why: "take a photo of me 是固定而自然的拍照请求，of me 表示照片里的人是我。",
        compare: "take me a photo 不自然；take a photo of me 才是拍我。",
        chunks: ["take a photo", "of me"],
        natural: ["Could you take a picture of us?", "Can you take one more?"]
      }
    },
    {
      id: "s011",
      text: "This outfit looks great on you.",
      translation: "这套穿搭很适合你。",
      category: "服装穿搭",
      level: "L3",
      pattern: "... looks great on you.",
      grammar: {
        structure: [["This outfit", "这套穿搭"], ["looks great", "看起来很好"], ["on you", "穿在你身上"]],
        why: "on you 表示衣服穿在某人身上的效果。英语夸衣服时经常这样说。",
        compare: "looks great to you 是“你觉得好看”；looks great on you 是“你穿着好看”。",
        chunks: ["looks great", "on you"],
        natural: ["That color suits you.", "It looks really nice on you."]
      }
    },
    {
      id: "s012",
      text: "I wish I had known earlier.",
      translation: "我真希望我早点知道。",
      category: "情感表达",
      level: "L4",
      pattern: "I wish I had ... earlier.",
      grammar: {
        structure: [["I wish", "我希望/可惜"], ["I had known", "过去已经知道"], ["earlier", "更早"]],
        why: "这里表达对过去的遗憾，所以用 had known。不是现在想知道，而是后悔当时没早知道。",
        compare: "I wish I knew 是希望现在知道；I wish I had known 是后悔过去不知道。",
        chunks: ["I wish", "had known earlier"],
        natural: ["If only I had known earlier.", "I should have known sooner."]
      }
    }
  ],
  dictionary: {
    "how": { ipa: "/haʊ/", pos: "Adverb", meaning: "怎样，如何", inSentence: "用来询问状态或方式", collocations: ["how are you", "how much", "how long"], example: "How are you today?" },
    "going": { ipa: "/ˈɡoʊɪŋ/", pos: "Verb", meaning: "进展，进行", inSentence: "表示事情或状态正在发展", collocations: ["going well", "keep going", "going on"], example: "Everything is going well." },
    "on": { ipa: "/ɑːn/", pos: "Preposition", meaning: "在某种状态中", inSentence: "on my way 表示在去的路上", collocations: ["on time", "on my way", "on sale"], example: "I'm on my way home." },
    "way": { ipa: "/weɪ/", pos: "Noun", meaning: "路，方式", inSentence: "my way 表示我的路程", collocations: ["on my way", "by the way", "find a way"], example: "This is the best way." },
    "sounds": { ipa: "/saʊndz/", pos: "Verb", meaning: "听起来", inSentence: "用来表达听到建议后的感觉", collocations: ["sounds good", "sounds like", "sounds great"], example: "That sounds interesting." },
    "think": { ipa: "/θɪŋk/", pos: "Verb", meaning: "想，考虑", inSentence: "think about it 表示考虑这件事", collocations: ["think about", "think of", "think twice"], example: "I'll think about your idea." },
    "looking": { ipa: "/ˈlʊkɪŋ/", pos: "Verb", meaning: "寻找，看", inSentence: "正在寻找", collocations: ["look for", "look at", "look after"], example: "I'm looking for my keys." },
    "for": { ipa: "/fɔːr/", pos: "Preposition", meaning: "为了，寻找的对象", inSentence: "look for 中表示寻找的目标", collocations: ["look for", "wait for", "ask for"], example: "I'm waiting for you." },
    "coffee": { ipa: "/ˈkɔːfi/", pos: "Noun", meaning: "咖啡", inSentence: "coffee shop 是咖啡店", collocations: ["coffee shop", "black coffee", "iced coffee"], example: "I need a cup of coffee." },
    "nearby": { ipa: "/ˌnɪrˈbaɪ/", pos: "Adverb", meaning: "在附近", inSentence: "补充说明咖啡店的位置", collocations: ["nearby restaurant", "somewhere nearby", "live nearby"], example: "There is a park nearby." },
    "could": { ipa: "/kʊd/", pos: "Modal verb", meaning: "能否，可以", inSentence: "礼貌地提出请求", collocations: ["could you", "could I", "could be"], example: "Could you help me?" },
    "help": { ipa: "/help/", pos: "Verb", meaning: "帮助", inSentence: "请求别人帮忙", collocations: ["help me with", "need help", "help out"], example: "Can you help me with this?" },
    "check": { ipa: "/tʃek/", pos: "Verb", meaning: "检查，办理", inSentence: "check in 表示办理入住", collocations: ["check in", "check out", "check the time"], example: "I'd like to check in." },
    "bill": { ipa: "/bɪl/", pos: "Noun", meaning: "账单", inSentence: "餐厅付款前索要账单", collocations: ["get the bill", "pay the bill", "split the bill"], example: "Can I get the bill?" },
    "smaller": { ipa: "/ˈsmɔːlər/", pos: "Adjective", meaning: "更小的", inSentence: "询问小一点的尺码", collocations: ["smaller size", "smaller room", "smaller one"], example: "Do you have a smaller one?" },
    "photo": { ipa: "/ˈfoʊtoʊ/", pos: "Noun", meaning: "照片", inSentence: "take a photo 表示拍照", collocations: ["take a photo", "photo of me", "photo album"], example: "Could you take a photo of me?" },
    "outfit": { ipa: "/ˈaʊtfɪt/", pos: "Noun", meaning: "穿搭，套装", inSentence: "指整体衣服搭配", collocations: ["nice outfit", "summer outfit", "outfit idea"], example: "Your outfit looks great." },
    "wish": { ipa: "/wɪʃ/", pos: "Verb", meaning: "希望，真希望", inSentence: "表达遗憾或愿望", collocations: ["I wish", "wish for", "best wishes"], example: "I wish I had more time." },
    "known": { ipa: "/noʊn/", pos: "Verb", meaning: "知道", inSentence: "had known 表示过去已经知道", collocations: ["had known", "well known", "known for"], example: "I wish I had known earlier." }
  }
};

(() => {
  const makeSentence = (id, text, translation, category, level, chunks, natural = []) => ({
    id,
    text,
    translation,
    category,
    level,
    pattern: chunks[0] || text,
    grammar: {
      structure: [
        [text.split(" ")[0], "句子开头：先抛出主语、请求或核心信息"],
        [chunks[0] || text, "核心表达块"],
        [text, "完整自然句"]
      ],
      why: `这句话常用于${category}场景。学习时先把核心表达“${chunks[0] || text}”当成一个整体记住，不要逐字翻译。`,
      compare: "中文常先想意思，英语更重视固定搭配和语序。先掌握整句，再替换里面的对象、地点或时间。",
      chunks,
      natural: natural.length ? natural : [text]
    }
  });

  window.ESL_DATA.sentences.push(
    makeSentence("s013", "I'm just browsing.", "我只是随便看看。", "购物", "L2", ["I'm just browsing"], ["I'm just looking around.", "I'm not buying anything yet."]),
    makeSentence("s014", "Do you have this in another color?", "这个有别的颜色吗？", "购物", "L3", ["Do you have this in ..."], ["Does this come in another color?", "Do you have it in black?"]),
    makeSentence("s015", "Can I try this on?", "我可以试穿一下吗？", "购物", "L2", ["try this on"], ["Where is the fitting room?", "Can I try on a smaller size?"]),
    makeSentence("s016", "I'll take this one.", "我要这个。", "购物", "L2", ["I'll take this one"], ["I'll take it.", "This one works for me."]),
    makeSentence("s017", "Is this on sale?", "这个打折吗？", "购物", "L2", ["on sale"], ["Is there a discount?", "Is this the final price?"]),

    makeSentence("s018", "I have a reservation under Li.", "我用李这个名字订了位/房。", "酒店", "L3", ["reservation under ..."], ["The reservation is under Li.", "I booked a room under Li."]),
    makeSentence("s019", "Could I check out a little later?", "我可以晚一点退房吗？", "酒店", "L3", ["check out", "a little later"], ["Is late checkout available?", "Could I extend my checkout time?"]),
    makeSentence("s020", "The air conditioner isn't working.", "空调坏了。", "酒店", "L3", ["isn't working"], ["The Wi-Fi isn't working.", "The shower isn't working."]),
    makeSentence("s021", "Could you send someone to take a look?", "能派人来看一下吗？", "酒店", "L3", ["send someone", "take a look"], ["Could someone check it?", "Can you send maintenance?"]),
    makeSentence("s022", "Is breakfast included?", "包含早餐吗？", "酒店", "L2", ["breakfast included"], ["Does the room include breakfast?", "What time is breakfast?"]),

    makeSentence("s023", "A table for two, please.", "两位，谢谢。", "餐厅", "L1", ["a table for two"], ["A table for three, please.", "Do you have a table by the window?"]),
    makeSentence("s024", "What do you recommend?", "你推荐什么？", "餐厅", "L2", ["What do you recommend"], ["What is popular here?", "What is your signature dish?"]),
    makeSentence("s025", "Can I have this without onions?", "这个可以不要洋葱吗？", "餐厅", "L3", ["without onions"], ["Can I have it without ice?", "Can I have the sauce on the side?"]),
    makeSentence("s026", "Could we get some water?", "可以给我们一些水吗？", "餐厅", "L2", ["Could we get ..."], ["Can we get some water?", "Could I get another fork?"]),
    makeSentence("s027", "Everything was delicious.", "都很好吃。", "餐厅", "L2", ["Everything was delicious"], ["That was really good.", "We enjoyed the meal."]),

    makeSentence("s028", "Where is the nearest subway station?", "最近的地铁站在哪里？", "旅行", "L2", ["nearest subway station"], ["Where is the nearest bus stop?", "How do I get to the station?"]),
    makeSentence("s029", "How long does it take to get there?", "到那里要多久？", "旅行", "L3", ["How long does it take"], ["How long does it take by taxi?", "How long does it take to walk there?"]),
    makeSentence("s030", "I think I'm lost.", "我好像迷路了。", "旅行", "L2", ["I think I'm lost"], ["I'm not sure where I am.", "Could you show me on the map?"]),
    makeSentence("s031", "Could you point me in the right direction?", "你能给我指一下方向吗？", "旅行", "L4", ["point me in the right direction"], ["Could you help me find this place?", "Am I going the right way?"]),
    makeSentence("s032", "Is it within walking distance?", "走路能到吗？", "旅行", "L3", ["within walking distance"], ["Can I walk there?", "Is it far from here?"]),

    makeSentence("s033", "I'll send you the file later today.", "我今天晚些时候把文件发给你。", "工作沟通", "L3", ["send you the file", "later today"], ["I'll share the file with you.", "I'll send it over later today."]),
    makeSentence("s034", "Could we move the meeting to tomorrow?", "我们能把会议改到明天吗？", "工作沟通", "L3", ["move the meeting to ..."], ["Can we reschedule the meeting?", "Could we push it to tomorrow?"]),
    makeSentence("s035", "I'm still working on it.", "我还在处理。", "工作沟通", "L2", ["working on it"], ["I'm looking into it.", "I'm not done yet."]),
    makeSentence("s036", "Let me double-check and get back to you.", "我再确认一下再回复你。", "工作沟通", "L4", ["double-check", "get back to you"], ["Let me check and reply later.", "I'll confirm and let you know."]),
    makeSentence("s037", "That deadline is a bit tight.", "这个截止时间有点紧。", "工作沟通", "L3", ["deadline", "a bit tight"], ["The timeline is a little tight.", "We may need more time."]),

    makeSentence("s038", "Long time no see.", "好久不见。", "日常聊天", "L1", ["Long time no see"], ["It's been a while.", "I haven't seen you in ages."]),
    makeSentence("s039", "What have you been up to?", "你最近在忙什么？", "日常聊天", "L3", ["What have you been up to"], ["What are you up to these days?", "How have you been?"]),
    makeSentence("s040", "I'm running a bit late.", "我会稍微迟到一点。", "日常聊天", "L2", ["running a bit late"], ["I'll be there soon.", "I'm about ten minutes late."]),
    makeSentence("s041", "No worries at all.", "完全没关系。", "日常聊天", "L2", ["No worries"], ["Don't worry about it.", "It's totally fine."]),
    makeSentence("s042", "Let's catch up soon.", "我们改天聚聚。", "日常聊天", "L3", ["catch up soon"], ["Let's meet up soon.", "Let's grab coffee sometime."]),

    makeSentence("s043", "The lighting is perfect here.", "这里光线很好。", "摄影", "L3", ["lighting is perfect"], ["The light is really nice here.", "This spot has great light."]),
    makeSentence("s044", "Could you stand a little closer?", "你能站近一点吗？", "摄影", "L3", ["stand a little closer"], ["Move a bit closer.", "Could you step closer?"]),
    makeSentence("s045", "Let's take one more shot.", "我们再拍一张。", "摄影", "L2", ["one more shot"], ["Let's take another one.", "One more photo, please."]),
    makeSentence("s046", "Can you make the background blurry?", "你能把背景拍虚一点吗？", "摄影", "L4", ["make the background blurry"], ["Can you blur the background?", "I want the background out of focus."]),
    makeSentence("s047", "This angle looks better.", "这个角度更好看。", "摄影", "L2", ["This angle looks better"], ["Try this angle.", "This side looks better."]),

    makeSentence("s048", "This color goes well with your jacket.", "这个颜色和你的外套很搭。", "服装穿搭", "L3", ["goes well with"], ["This color matches your jacket.", "It goes well with your shoes."]),
    makeSentence("s049", "It feels a little too formal.", "感觉有点太正式了。", "服装穿搭", "L3", ["too formal"], ["It looks a bit too casual.", "It feels a little too bright."]),
    makeSentence("s050", "You can dress it up or down.", "它可以穿得正式也可以穿得休闲。", "服装穿搭", "L4", ["dress it up or down"], ["You can style it in different ways.", "It's easy to style."]),
    makeSentence("s051", "This fits me really well.", "这件很合身。", "服装穿搭", "L2", ["fits me well"], ["This is a good fit.", "It fits perfectly."]),
    makeSentence("s052", "I want something more casual.", "我想要更休闲一点的。", "服装穿搭", "L2", ["something more casual"], ["I'm looking for something simple.", "I want a more relaxed look."]),

    makeSentence("s053", "I just posted a new photo.", "我刚发了一张新照片。", "社交媒体", "L2", ["posted a new photo"], ["I uploaded a new photo.", "I shared a new post."]),
    makeSentence("s054", "Can you tag me in the post?", "你能在帖子里标记我吗？", "社交媒体", "L3", ["tag me in the post"], ["Can you mention me?", "Don't forget to tag me."]),
    makeSentence("s055", "This caption sounds natural.", "这个文案听起来很自然。", "社交媒体", "L3", ["caption sounds natural"], ["This caption works well.", "The caption feels more natural."]),
    makeSentence("s056", "I don't want to post it yet.", "我还不想发。", "社交媒体", "L2", ["don't want to post it yet"], ["I'm not ready to post it.", "I'll post it later."]),
    makeSentence("s057", "This video is getting a lot of views.", "这个视频浏览量很高。", "社交媒体", "L3", ["getting a lot of views"], ["This video is doing well.", "It got a lot of likes."]),

    makeSentence("s058", "I really appreciate your help.", "我真的很感谢你的帮助。", "情感表达", "L3", ["appreciate your help"], ["Thanks a lot for your help.", "I really appreciate it."]),
    makeSentence("s059", "I'm proud of you.", "我为你感到骄傲。", "情感表达", "L2", ["proud of you"], ["You did a great job.", "I'm really happy for you."]),
    makeSentence("s060", "I didn't mean to hurt you.", "我不是故意伤害你的。", "情感表达", "L3", ["didn't mean to"], ["I didn't mean it that way.", "That came out wrong."]),
    makeSentence("s061", "I need some time to think.", "我需要一点时间想想。", "情感表达", "L2", ["need some time to think"], ["Give me some time.", "I need to process this."]),
    makeSentence("s062", "That means a lot to me.", "这对我意义很大。", "情感表达", "L3", ["means a lot to me"], ["I really appreciate that.", "That matters a lot to me."])
  );

  Object.assign(window.ESL_DATA.dictionary, {
    "browsing": { ipa: "/ˈbraʊzɪŋ/", pos: "Verb", meaning: "浏览，随便看看", inSentence: "购物时表示暂时不需要帮助", collocations: ["just browsing", "browse online"], example: "I'm just browsing." },
    "reservation": { ipa: "/ˌrezərˈveɪʃn/", pos: "Noun", meaning: "预订", inSentence: "酒店或餐厅的预订", collocations: ["have a reservation", "make a reservation"], example: "I have a reservation under Li." },
    "included": { ipa: "/ɪnˈkluːdɪd/", pos: "Adjective", meaning: "包含的", inSentence: "询问价格或服务是否包含某项", collocations: ["breakfast included", "tax included"], example: "Is breakfast included?" },
    "recommend": { ipa: "/ˌrekəˈmend/", pos: "Verb", meaning: "推荐", inSentence: "询问别人建议", collocations: ["recommend a place", "highly recommend"], example: "What do you recommend?" },
    "nearest": { ipa: "/ˈnɪrəst/", pos: "Adjective", meaning: "最近的", inSentence: "询问距离最近的位置", collocations: ["nearest station", "nearest exit"], example: "Where is the nearest subway station?" },
    "deadline": { ipa: "/ˈdedlaɪn/", pos: "Noun", meaning: "截止时间", inSentence: "工作沟通里表示交付期限", collocations: ["tight deadline", "meet a deadline"], example: "That deadline is a bit tight." },
    "lighting": { ipa: "/ˈlaɪtɪŋ/", pos: "Noun", meaning: "光线", inSentence: "摄影中描述环境光", collocations: ["good lighting", "natural lighting"], example: "The lighting is perfect here." },
    "angle": { ipa: "/ˈæŋɡl/", pos: "Noun", meaning: "角度", inSentence: "拍照时指拍摄角度", collocations: ["best angle", "from this angle"], example: "This angle looks better." },
    "caption": { ipa: "/ˈkæpʃn/", pos: "Noun", meaning: "配文，文案", inSentence: "社交媒体帖子的文字", collocations: ["write a caption", "caption sounds natural"], example: "This caption sounds natural." },
    "appreciate": { ipa: "/əˈpriːʃieɪt/", pos: "Verb", meaning: "感激", inSentence: "比 thank you 更正式、更真诚", collocations: ["appreciate your help", "really appreciate it"], example: "I really appreciate your help." }
  });

  window.ESL_DATA.expressionLab = {
    fallbackTranslation: {
      english: "I want to say this in a natural way.",
      note: "本地离线版暂时没有完全命中这句中文。可以先用这个万能表达占位：我想自然地表达这件事。",
      alternatives: ["How can I say this naturally?", "I'm trying to express this in English."]
    },
    translations: [
      { triggers: ["附近", "咖啡店", "找咖啡"], english: "I'm looking for a coffee shop nearby.", note: "用 I'm looking for 表示现在正在找；nearby 放句尾很自然。", alternatives: ["I'm trying to find a coffee shop nearby.", "Is there a coffee shop nearby?"] },
      { triggers: ["在路上", "快到了"], english: "I'm on my way.", note: "on my way 是固定表达，表示已经出发。", alternatives: ["I'm heading there now.", "I'll be there soon."] },
      { triggers: ["拍张照", "帮我拍照"], english: "Could you take a photo of me?", note: "Could you 开头更礼貌；of me 表示照片里的人是我。", alternatives: ["Could you take a picture of me?", "Can you take a photo of us?"] },
      { triggers: ["账单", "买单"], english: "Can I get the bill, please?", note: "餐厅里 get the bill 是自然表达，加 please 更礼貌。", alternatives: ["Could we get the check, please?", "Can I pay now?"] },
      { triggers: ["晚点退房", "延迟退房"], english: "Could I check out a little later?", note: "Could I 用来礼貌请求；a little later 表示晚一点。", alternatives: ["Is late checkout available?", "Could I extend my checkout time?"] },
      { triggers: ["推荐", "有什么好吃"], english: "What do you recommend?", note: "这是餐厅、购物、旅行都能用的高频句。", alternatives: ["What is popular here?", "Do you have any recommendations?"] },
      { triggers: ["迟到", "晚到"], english: "I'm running a bit late.", note: "running late 是固定表达，表示会迟到。", alternatives: ["I'll be about ten minutes late.", "I'm a little late."] },
      { triggers: ["发文件", "文件发给你"], english: "I'll send you the file later today.", note: "send you the file 是“把文件发给你”；later today 是今天晚些时候。", alternatives: ["I'll share the file with you later today.", "I'll send it over later."] },
      { triggers: ["合身", "很适合我"], english: "This fits me really well.", note: "衣服尺寸合适用 fit，不用 suitable。", alternatives: ["This is a good fit.", "It fits perfectly."] },
      { triggers: ["感谢", "谢谢帮忙"], english: "I really appreciate your help.", note: "appreciate 比 thank you 更正式、更有分量。", alternatives: ["Thanks a lot for your help.", "I really appreciate it."] }
    ],
    corrections: [
      { pattern: /\bI very like\b/gi, replace: "I really like", note: "英语里通常不说 I very like，要说 I really like 或 I like ... very much。" },
      { pattern: /\bShe go\b/gi, replace: "She goes", note: "主语 she/he/it 后面一般现在时动词要加 s：goes。" },
      { pattern: /\bHe go\b/gi, replace: "He goes", note: "主语 he 后面一般现在时动词要用 goes。" },
      { pattern: /\bIt look\b/gi, replace: "It looks", note: "主语 it 后面一般现在时动词要加 s：looks。" },
      { pattern: /\bI am agree\b/gi, replace: "I agree", note: "agree 本身是动词，不需要 am。" },
      { pattern: /\bI have (\d+) years old\b/gi, replace: "I am $1 years old", note: "表达年龄用 I am ... years old，不说 I have ... years old。" },
      { pattern: /\bdiscuss about\b/gi, replace: "discuss", note: "discuss 是及物动词，后面直接接事情，不需要 about。" },
      { pattern: /\bmore better\b/gi, replace: "better", note: "better 已经是比较级，不需要 more。" },
      { pattern: /\bdepend of\b/gi, replace: "depend on", note: "固定搭配是 depend on。" },
      { pattern: /\binformations\b/gi, replace: "information", note: "information 是不可数名词，通常不加 s。" },
      { pattern: /\ba advice\b/gi, replace: "some advice", note: "advice 是不可数名词，不说 a advice，可以说 some advice 或 a piece of advice。" },
      { pattern: /\bI need to go to home\b/gi, replace: "I need to go home", note: "home 作副词时前面不用 to：go home。" }
    ]
  };

  const drillPacks = {
    "日常聊天": [
      ["s100", "I'm not feeling very well.", "我感觉不太舒服。", "L2", ["not feeling very well"], ["I feel a little sick.", "I'm not feeling my best."]],
      ["s101", "I'm free this afternoon.", "我今天下午有空。", "L2", ["I'm free ..."], ["I'm available this afternoon.", "I have time this afternoon."]],
      ["s102", "Can we talk for a minute?", "我们能聊一分钟吗？", "L2", ["Can we talk"], ["Do you have a minute?", "Can I talk to you for a second?"]],
      ["s103", "I didn't sleep well last night.", "我昨晚没睡好。", "L2", ["didn't sleep well"], ["I slept badly last night.", "I didn't get much sleep."]],
      ["s104", "I'm not sure yet.", "我还不确定。", "L2", ["not sure yet"], ["I haven't decided yet.", "I'm still thinking about it."]],
      ["s105", "Let me know when you're ready.", "你准备好了告诉我。", "L3", ["Let me know when ..."], ["Tell me when you're ready.", "Let me know when you get there."]],
      ["s106", "I totally forgot about it.", "我完全忘了这件事。", "L3", ["forgot about it"], ["It slipped my mind.", "I completely forgot."]],
      ["s107", "That's exactly what I mean.", "这正是我的意思。", "L3", ["exactly what I mean"], ["That's what I'm saying.", "You got my point."]],
      ["s108", "I didn't catch that.", "我没听清。", "L2", ["didn't catch that"], ["Could you say that again?", "I missed that."]],
      ["s109", "Let's keep in touch.", "我们保持联系。", "L2", ["keep in touch"], ["Stay in touch.", "Let's talk again soon."]],
      ["s110", "I'm trying to save money.", "我在努力省钱。", "L3", ["trying to save money"], ["I'm cutting back on spending.", "I'm trying to spend less."]],
      ["s111", "It depends on the weather.", "这取决于天气。", "L3", ["depends on"], ["It depends on your schedule.", "It depends on the situation."]],
      ["s112", "I don't feel like going out.", "我不太想出门。", "L3", ["don't feel like ..."], ["I don't feel like eating.", "I don't feel like talking."]],
      ["s113", "That makes sense.", "这说得通。", "L2", ["makes sense"], ["That sounds reasonable.", "I see what you mean."]],
      ["s114", "I have no idea.", "我完全不知道。", "L1", ["no idea"], ["I don't know at all.", "I'm not sure."]],
      ["s115", "It's not a big deal.", "这不是什么大事。", "L2", ["not a big deal"], ["No worries.", "It's totally fine."]],
      ["s116", "I'm almost done.", "我快做完了。", "L2", ["almost done"], ["I'm nearly finished.", "I'm almost finished."]],
      ["s117", "I'll call you back later.", "我晚点给你回电话。", "L2", ["call you back"], ["I'll text you later.", "I'll get back to you later."]],
      ["s118", "Can you wait a second?", "你能等一下吗？", "L2", ["wait a second"], ["Give me a second.", "Wait a minute."]],
      ["s119", "I was just about to leave.", "我正准备离开。", "L3", ["just about to"], ["I was about to call you.", "I was about to text you."]],
      ["s120", "I'm glad you made it.", "很高兴你来了。", "L3", ["glad you made it"], ["I'm happy you came.", "Good to see you here."]],
      ["s121", "Let's not talk about that now.", "我们现在别谈这个。", "L3", ["not talk about that"], ["Let's talk about it later.", "Can we drop it for now?"]],
      ["s122", "I need to get some rest.", "我需要休息一下。", "L2", ["get some rest"], ["I need to rest.", "I should get some sleep."]],
      ["s123", "What are you doing this weekend?", "你这周末打算做什么？", "L3", ["What are you doing ..."], ["Any plans this weekend?", "What are your plans for this weekend?"]]
    ],
    "工作沟通": [
      ["s124", "Could you send me the latest version?", "你能把最新版发给我吗？", "L3", ["latest version"], ["Could you share the latest version?", "Please send me the updated file."]],
      ["s125", "Let's follow up on this tomorrow.", "我们明天跟进这件事。", "L3", ["follow up on"], ["Let's revisit this tomorrow.", "Let's check this again tomorrow."]],
      ["s126", "I need more context.", "我需要更多背景信息。", "L3", ["need more context"], ["Could you give me more details?", "I need a little more information."]],
      ["s127", "That works for me.", "我这边可以。", "L2", ["works for me"], ["That sounds good to me.", "I'm okay with that."]],
      ["s128", "Can we make it shorter?", "我们能把它缩短一点吗？", "L3", ["make it shorter"], ["Can we simplify it?", "Can we make it more concise?"]],
      ["s129", "I'll handle this part.", "这部分我来处理。", "L2", ["handle this part"], ["I'll take care of this part.", "I'll be responsible for this."]],
      ["s130", "We need to prioritize this.", "我们需要优先处理这个。", "L3", ["prioritize this"], ["This should be a priority.", "We should focus on this first."]],
      ["s131", "Can you walk me through it?", "你能带我过一遍吗？", "L3", ["walk me through"], ["Can you explain it step by step?", "Could you show me how it works?"]],
      ["s132", "I'm waiting for approval.", "我在等审批。", "L3", ["waiting for approval"], ["It still needs approval.", "I'm waiting for confirmation."]],
      ["s133", "Let's keep the message simple.", "我们把信息保持简单。", "L3", ["keep ... simple"], ["Let's make it easy to understand.", "Let's keep it clear."]],
      ["s134", "I'll update you by the end of the day.", "我今天下班前给你更新。", "L4", ["by the end of the day"], ["I'll give you an update later today.", "I'll update you before I leave."]],
      ["s135", "Can we clarify the next steps?", "我们能明确下一步吗？", "L4", ["clarify the next steps"], ["What are the next steps?", "Let's define the next steps."]],
      ["s136", "I don't have bandwidth this week.", "我这周没有精力/时间处理。", "L4", ["don't have bandwidth"], ["I'm fully booked this week.", "I don't have time this week."]],
      ["s137", "The timeline looks realistic.", "这个时间安排看起来可行。", "L3", ["timeline looks realistic"], ["The schedule seems doable.", "The timeline works."]],
      ["s138", "Let's align on the goal first.", "我们先对齐目标。", "L4", ["align on the goal"], ["Let's agree on the goal first.", "Let's make sure we have the same goal."]],
      ["s139", "This is outside the current scope.", "这超出了当前范围。", "L4", ["outside the scope"], ["This isn't part of the current scope.", "This is beyond the scope."]],
      ["s140", "I'll take a look and reply later.", "我看一下晚点回复。", "L3", ["take a look", "reply later"], ["I'll check and get back to you.", "Let me review it and reply."]],
      ["s141", "Could you summarize the main points?", "你能总结一下重点吗？", "L3", ["summarize the main points"], ["Can you give me a quick summary?", "Could you summarize it briefly?"]],
      ["s142", "I agree with the overall direction.", "我同意整体方向。", "L3", ["overall direction"], ["I agree with the general direction.", "The direction makes sense to me."]],
      ["s143", "Let's not overcomplicate it.", "我们别把它复杂化。", "L3", ["overcomplicate it"], ["Let's keep it simple.", "Let's not make it too complicated."]],
      ["s144", "Can you confirm the details?", "你能确认一下细节吗？", "L3", ["confirm the details"], ["Please confirm the details.", "Could you double-check the details?"]],
      ["s145", "I need to jump to another call.", "我得去参加另一个电话会议。", "L3", ["jump to another call"], ["I have another call now.", "I need to join another meeting."]],
      ["s146", "Let's park this for now.", "这个我们先搁置一下。", "L4", ["park this for now"], ["Let's pause this for now.", "Let's come back to this later."]],
      ["s147", "What's blocking this?", "这件事卡在哪里？", "L3", ["what's blocking"], ["What's the blocker?", "What's holding this up?"]]
    ],
    "旅行": [
      ["s148", "How much is a ticket to downtown?", "去市中心的票多少钱？", "L3", ["ticket to downtown"], ["How much is it to downtown?", "How much does a ticket cost?"]],
      ["s149", "Does this bus go to the airport?", "这辆公交去机场吗？", "L3", ["go to the airport"], ["Is this bus going to the airport?", "Does this train stop at the airport?"]],
      ["s150", "I'd like a one-way ticket.", "我想要一张单程票。", "L2", ["one-way ticket"], ["I'd like a round-trip ticket.", "One ticket to Boston, please."]],
      ["s151", "Where can I exchange money?", "哪里可以换钱？", "L3", ["exchange money"], ["Where is the currency exchange?", "Can I exchange money here?"]],
      ["s152", "Can you show me on the map?", "你能在地图上给我看吗？", "L2", ["show me on the map"], ["Could you point it out on the map?", "Can you show me where it is?"]],
      ["s153", "Is this seat taken?", "这个座位有人坐吗？", "L2", ["seat taken"], ["Is anyone sitting here?", "Can I sit here?"]],
      ["s154", "I missed my train.", "我错过火车了。", "L2", ["missed my train"], ["I missed my flight.", "I missed the bus."]],
      ["s155", "When is the next train?", "下一班火车什么时候？", "L2", ["next train"], ["When is the next bus?", "What time is the next train?"]],
      ["s156", "I need to change my ticket.", "我需要改票。", "L3", ["change my ticket"], ["Can I change my ticket?", "I'd like to change my flight."]],
      ["s157", "Is there a restroom nearby?", "附近有洗手间吗？", "L2", ["restroom nearby"], ["Where is the restroom?", "Is there a bathroom around here?"]],
      ["s158", "I'm looking for this address.", "我在找这个地址。", "L2", ["looking for this address"], ["I'm trying to find this address.", "Do you know where this address is?"]],
      ["s159", "Could you call a taxi for me?", "你能帮我叫辆出租车吗？", "L3", ["call a taxi"], ["Can you get me a taxi?", "Could you call me a cab?"]],
      ["s160", "How far is it from here?", "离这里多远？", "L2", ["How far is it"], ["Is it far from here?", "How far is the station?"]],
      ["s161", "I need directions to the hotel.", "我需要去酒店的路线。", "L3", ["directions to"], ["Can you give me directions?", "How do I get to the hotel?"]],
      ["s162", "Is this the right platform?", "这是正确的站台吗？", "L3", ["right platform"], ["Am I on the right platform?", "Which platform should I go to?"]],
      ["s163", "My luggage hasn't arrived.", "我的行李还没到。", "L3", ["luggage hasn't arrived"], ["My bag is missing.", "I can't find my luggage."]],
      ["s164", "I need help with my luggage.", "我需要帮忙拿行李。", "L2", ["help with my luggage"], ["Could you help me with my bag?", "Can someone help with my luggage?"]],
      ["s165", "Can I pay by card?", "我可以刷卡吗？", "L2", ["pay by card"], ["Do you accept cards?", "Can I use a credit card?"]],
      ["s166", "Do I need to transfer?", "我需要换乘吗？", "L3", ["need to transfer"], ["Do I have to change trains?", "Is there a transfer?"]],
      ["s167", "I'm here for vacation.", "我是来度假的。", "L2", ["here for vacation"], ["I'm here for work.", "I'm traveling for vacation."]],
      ["s168", "Could you speak more slowly?", "你能说慢一点吗？", "L2", ["speak more slowly"], ["Could you say that slowly?", "Please speak a little slower."]],
      ["s169", "I don't understand the announcement.", "我听不懂广播。", "L3", ["understand the announcement"], ["I missed the announcement.", "What did the announcement say?"]],
      ["s170", "Where do I pick up my bags?", "我在哪里取行李？", "L3", ["pick up my bags"], ["Where is baggage claim?", "Where can I get my luggage?"]],
      ["s171", "Can I get a window seat?", "我能要靠窗座位吗？", "L2", ["window seat"], ["Can I get an aisle seat?", "I'd like a window seat."]]
    ],
    "餐厅": [
      ["s172", "Do you have a menu in English?", "你们有英文菜单吗？", "L2", ["menu in English"], ["Can I see an English menu?", "Do you have an English menu?"]],
      ["s173", "I'm allergic to peanuts.", "我对花生过敏。", "L3", ["allergic to"], ["I'm allergic to seafood.", "I can't eat peanuts."]],
      ["s174", "Can I get this to go?", "这个可以打包带走吗？", "L2", ["to go"], ["Can I take this to go?", "I'd like this to go."]],
      ["s175", "Could we split the bill?", "我们可以分开付吗？", "L3", ["split the bill"], ["Can we pay separately?", "Could we split it?"]],
      ["s176", "The food hasn't arrived yet.", "菜还没上。", "L3", ["hasn't arrived yet"], ["Our food hasn't come yet.", "We're still waiting for our food."]],
      ["s177", "This isn't what I ordered.", "这不是我点的。", "L3", ["what I ordered"], ["I didn't order this.", "This is not my order."]],
      ["s178", "Could I have another napkin?", "能再给我一张餐巾纸吗？", "L2", ["another napkin"], ["Could I get another fork?", "Can I have another glass?"]],
      ["s179", "Is this dish spicy?", "这道菜辣吗？", "L2", ["dish spicy"], ["How spicy is this?", "Is it very spicy?"]],
      ["s180", "Can you make it less spicy?", "能做得不那么辣吗？", "L3", ["less spicy"], ["Can you make it mild?", "I'd like it less spicy."]],
      ["s181", "We'd like to order now.", "我们现在想点餐。", "L2", ["order now"], ["We're ready to order.", "Can we order now?"]],
      ["s182", "Could I get the sauce on the side?", "酱可以单独放旁边吗？", "L4", ["on the side"], ["Can I have the dressing on the side?", "Sauce on the side, please."]],
      ["s183", "This table is a little dirty.", "这张桌子有点脏。", "L3", ["a little dirty"], ["Could you clean the table?", "The table needs cleaning."]],
      ["s184", "Do you have any vegetarian options?", "你们有素食选择吗？", "L3", ["vegetarian options"], ["Do you have vegan options?", "Is there anything vegetarian?"]],
      ["s185", "Can I have the same thing?", "我可以要一样的吗？", "L2", ["same thing"], ["I'll have the same.", "Can I get the same one?"]],
      ["s186", "This is too salty for me.", "这个对我来说太咸了。", "L3", ["too salty for me"], ["It's a little too salty.", "This is too sweet for me."]],
      ["s187", "Could we sit outside?", "我们可以坐外面吗？", "L2", ["sit outside"], ["Can we sit by the window?", "Do you have outdoor seating?"]],
      ["s188", "Do we need a reservation?", "我们需要预约吗？", "L2", ["need a reservation"], ["Should we make a reservation?", "Can we walk in?"]],
      ["s189", "How long is the wait?", "要等多久？", "L2", ["How long is the wait"], ["What's the wait time?", "How long do we have to wait?"]],
      ["s190", "Could you pack this up?", "能帮我把这个打包吗？", "L3", ["pack this up"], ["Can I get a box?", "Could you box this up?"]],
      ["s191", "I'll have what she's having.", "我要和她一样的。", "L3", ["what she's having"], ["I'll have the same as her.", "I want the same thing."]],
      ["s192", "Can I get a refill?", "可以续杯吗？", "L2", ["get a refill"], ["Could I have a refill?", "Can you refill this?"]],
      ["s193", "The service was great.", "服务很好。", "L2", ["service was great"], ["The staff was very friendly.", "We had great service."]],
      ["s194", "Do you accept cash?", "你们收现金吗？", "L2", ["accept cash"], ["Do you take cash?", "Can I pay in cash?"]],
      ["s195", "Could you recommend a dessert?", "你能推荐一个甜点吗？", "L3", ["recommend a dessert"], ["What's a good dessert?", "Which dessert do you recommend?"]]
    ]
  };

  Object.entries(drillPacks).forEach(([category, items]) => {
    items.forEach(([id, text, translation, level, chunks, natural]) => {
      window.ESL_DATA.sentences.push(makeSentence(id, text, translation, category, level, chunks, natural));
    });
  });
})();
