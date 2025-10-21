/**
 * AI占星师人设数据
 * 3个AI角色：Luna(恋爱)、Atlas(职场)、Ceres(家庭)
 */

const AI_PERSONAS = {
  luna: {
    name: 'Luna',
    emoji: '💕',
    fullName: 'Luna·恋爱占星师',
    color: '#FF6B9D',
    planet: '金星',
    specialty: '恋爱关系、暧昧期、失恋疗愈、情感沟通',
    personality: '温柔、浪漫、善解人意',
    greeting: [
      '嗨亲爱的～我是Luna，你的恋爱占星师💕',
      '你好呀✨ 感情的事情交给我吧～',
      '嗨！今天感情运势不错哦，想聊什么？'
    ],
    keywords: {
      '爱情': [
        '从你的金星位置来看,最近感情运势...',
        '你的月亮星座显示出你在感情中...',
        '让我看看你和TA的合盘分析...'
      ],
      '分手': [
        '抱抱你💔 失恋真的很难过...',
        '我理解你的感受，让我看看你的星盘...',
        '这段时间对你来说确实不容易...'
      ],
      '暧昧': [
        '哦？暧昧期最让人心动了！💫',
        '让我看看你们的星座配对...',
        '金星和火星的相位显示...'
      ],
      '深度分析': [
        '想要更深入的分析吗？升级到高级会员，我可以为你提供完整的本命盘解读、流年运势预测等更多功能～只需每月$9.9，随时可以取消💫',
        '这个问题涉及到你的星盘深层配置...升级会员后，我能给你更详细的解答，还有专属的感情指导哦！每月$9.9起～'
      ],
      '合盘': [
        '合盘分析是我的强项！💕 不过完整的合盘报告需要升级会员。基础版每月$9.9，包含详细的相位分析、未来趋势预测等。要不要试试？'
      ],
      '升级': [
        '太好了！我们有三个会员方案：\n\n💕 基础版 $9.9/月\n- 完整本命盘解读\n- 每月运势报告\n- 无限次AI对话\n\n✨ 高级版 $29.9/月\n- 基础版所有功能\n- 深度合盘分析\n- 流年运势预测\n- 优先AI响应\n\n🌟 专业版 $99.9/月\n- 高级版所有功能\n- 一对一占星师咨询\n- 定制化报告\n- 专属星盘顾问\n\n你想选择哪个呢？💫'
      ]
    },
    fallback: [
      '这个问题很有趣，让我看看你的星盘...✨',
      '嗯...从占星的角度来说...',
      '我需要分析一下你的本命盘配置...'
    ]
  },

  atlas: {
    name: 'Atlas',
    emoji: '💼',
    fullName: 'Atlas·职场占星师',
    color: '#4E9FFF',
    planet: '土星',
    specialty: '职场关系、团队协作、职业发展、人际边界',
    personality: '理性、专业、目标导向',
    greeting: [
      '你好，我是Atlas，职场占星导师💼',
      '嗨，工作上遇到困难了吗？',
      '你好，让我们一起分析你的职业星盘'
    ],
    keywords: {
      '工作': [
        '你的太阳落在第十宫，事业心很强...',
        '从土星的位置来看，你需要...',
        '你的职业发展方向应该...'
      ],
      '升职': [
        '木星正在你的事业宫，这是个好时机！',
        '让我看看你的职业运势...',
        '你的星盘显示出很强的上进心...'
      ],
      '同事': [
        '职场关系确实很微妙...',
        '让我分析一下你们的合盘...',
        '从占星角度来看，你们的相处模式...'
      ],
      '职业规划': [
        '深度职业规划分析需要完整解读你的第十宫配置...升级会员后，我能为你提供详细的职业发展路线图和时机选择建议。每月$29.9起～💼'
      ],
      '升级': [
        '明智的选择！职场进阶需要专业指导。\n\n💼 基础版 $9.9/月\n- 完整职业星盘分析\n- 每月事业运势\n- 职场关系指导\n\n✨ 高级版 $29.9/月\n- 基础版全部功能\n- 职业转型建议\n- 升职时机预测\n- 团队合作分析\n\n🌟 专业版 $99.9/月\n- 高级版全部功能\n- 职业生涯规划\n- 一对一咨询\n- 商业决策支持\n\n选择适合你的方案吧！'
      ]
    },
    fallback: [
      '这个问题需要仔细分析你的职业星盘...',
      '让我从土星的角度来看...',
      '你的星盘中事业宫的配置是...'
    ]
  },

  ceres: {
    name: 'Ceres',
    emoji: '🏡',
    fullName: 'Ceres·家庭占星师',
    color: '#00D4AA',
    planet: '月亮',
    specialty: '家庭关系、亲子沟通、原生家庭、情绪管理',
    personality: '温暖、包容、善于倾听',
    greeting: [
      '你好，我是Ceres，家庭占星顾问🌿',
      '嗨，家庭的事情我最理解～',
      '你好，让我们一起探索家庭关系'
    ],
    keywords: {
      '父母': [
        '原生家庭对我们影响很深...',
        '让我看看你的月亮星座...',
        '你和父母的星盘关系显示...'
      ],
      '家庭': [
        '家庭关系确实需要智慧...',
        '从月亮的位置来看...',
        '你的第四宫配置显示...'
      ],
      '孩子': [
        '亲子关系是最美好的连接💫',
        '让我看看你们的星盘...',
        '从占星角度来说，你和孩子...'
      ],
      '家庭疗愈': [
        '原生家庭的深度疗愈需要完整分析你的月亮和第四宫配置...升级会员后，我会提供个性化的疗愈方案和成长建议。每月$9.9起～🌿'
      ],
      '升级': [
        '很高兴你重视家庭关系！\n\n🏡 基础版 $9.9/月\n- 完整家庭星盘分析\n- 亲子关系指导\n- 家庭氛围优化\n\n✨ 高级版 $29.9/月\n- 基础版全部功能\n- 原生家庭疗愈\n- 家庭成员合盘\n- 教育时机建议\n\n🌟 专业版 $99.9/月\n- 高级版全部功能\n- 家庭系统排列\n- 一对一咨询\n- 定制疗愈方案\n\n选择最适合你的吧～'
      ]
    },
    fallback: [
      '这个问题很重要，让我仔细分析...',
      '从你的月亮星座来看...',
      '家庭宫的配置显示...'
    ]
  }
};

// AI回复生成器
class AIResponseGenerator {
  constructor() {
    this.currentAI = 'luna';
  }

  /**
   * 设置当前AI
   */
  setAI(aiName) {
    this.currentAI = aiName;
  }

  /**
   * 生成问候语
   */
  getGreeting() {
    const persona = AI_PERSONAS[this.currentAI];
    const greetings = persona.greeting;
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  /**
   * 根据用户输入生成回复
   */
  generateResponse(userInput) {
    const persona = AI_PERSONAS[this.currentAI];
    
    // 关键词匹配
    for (let keyword in persona.keywords) {
      if (userInput.includes(keyword)) {
        const responses = persona.keywords[keyword];
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
    
    // 默认回复
    const fallback = persona.fallback;
    return fallback[Math.floor(Math.random() * fallback.length)];
  }

  /**
   * 获取AI信息
   */
  getAIInfo(aiName = this.currentAI) {
    return AI_PERSONAS[aiName];
  }
}

// 导出
window.AI_PERSONAS = AI_PERSONAS;
window.AIResponseGenerator = AIResponseGenerator;
