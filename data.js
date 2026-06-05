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
