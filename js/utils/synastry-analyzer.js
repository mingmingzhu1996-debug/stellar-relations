/**
 * 合盘分析器
 * 分析两人星盘配置的兼容性
 */

class SynastryAnalyzer {
  constructor() {
    this.zodiacSigns = [
      '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座',
      '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'
    ];

    this.aspectTemplates = {
      love: {
        icon: '💕',
        title: '恋爱契合度',
        keywords: ['浪漫', '激情', '吸引力', '情感共鸣']
      },
      communication: {
        icon: '💬',
        title: '沟通契合度',
        keywords: ['理解', '交流', '共同语言', '表达方式']
      },
      values: {
        icon: '⭐',
        title: '价值观契合度',
        keywords: ['人生观', '目标', '追求', '理念']
      },
      lifestyle: {
        icon: '🏡',
        title: '生活方式契合度',
        keywords: ['生活节奏', '兴趣爱好', '日常习惯']
      },
      emotional: {
        icon: '❤️',
        title: '情感深度',
        keywords: ['情绪共鸣', '安全感', '亲密度', '信任']
      },
      longterm: {
        icon: '🌟',
        title: '长期发展潜力',
        keywords: ['稳定性', '成长空间', '未来规划']
      }
    };
  }

  /**
   * 分析两人星盘
   */
  analyze(data) {
    const { person1, person2 } = data;

    // 计算星座（简化版）
    const sign1 = this.getZodiacSign(person1.birth);
    const sign2 = this.getZodiacSign(person2.birth);

    // 计算整体契合度
    const score = this.calculateCompatibility(sign1, sign2);

    // 生成各维度分析
    const aspects = this.generateAspects(sign1, sign2, person1.name, person2.name);

    // 生成AI建议
    const advice = this.generateAdvice(sign1, sign2, person1.name, person2.name, score);

    return {
      score,
      aspects,
      advice,
      person1: { ...person1, sign: sign1 },
      person2: { ...person2, sign: sign2 }
    };
  }

  /**
   * 根据出生日期计算星座
   */
  getZodiacSign(birthDate) {
    const date = new Date(birthDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const zodiacDates = [
      { sign: '摩羯座', start: [12, 22], end: [1, 19] },
      { sign: '水瓶座', start: [1, 20], end: [2, 18] },
      { sign: '双鱼座', start: [2, 19], end: [3, 20] },
      { sign: '白羊座', start: [3, 21], end: [4, 19] },
      { sign: '金牛座', start: [4, 20], end: [5, 20] },
      { sign: '双子座', start: [5, 21], end: [6, 21] },
      { sign: '巨蟹座', start: [6, 22], end: [7, 22] },
      { sign: '狮子座', start: [7, 23], end: [8, 22] },
      { sign: '处女座', start: [8, 23], end: [9, 22] },
      { sign: '天秤座', start: [9, 23], end: [10, 23] },
      { sign: '天蝎座', start: [10, 24], end: [11, 22] },
      { sign: '射手座', start: [11, 23], end: [12, 21] }
    ];

    for (let zodiac of zodiacDates) {
      const [startMonth, startDay] = zodiac.start;
      const [endMonth, endDay] = zodiac.end;

      if (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay)
      ) {
        return zodiac.sign;
      }
    }

    return '白羊座'; // 默认
  }

  /**
   * 计算星座契合度
   */
  calculateCompatibility(sign1, sign2) {
    // 星座契合度矩阵（简化版）
    const compatibilityMatrix = {
      '白羊座': { '狮子座': 95, '射手座': 92, '双子座': 88, '水瓶座': 85 },
      '金牛座': { '处女座': 93, '摩羯座': 90, '巨蟹座': 87, '双鱼座': 84 },
      '双子座': { '天秤座': 94, '水瓶座': 91, '白羊座': 88, '狮子座': 85 },
      '巨蟹座': { '双鱼座': 95, '天蝎座': 92, '金牛座': 87, '处女座': 84 },
      '狮子座': { '白羊座': 95, '射手座': 90, '双子座': 85, '天秤座': 83 },
      '处女座': { '金牛座': 93, '摩羯座': 89, '巨蟹座': 84, '天蝎座': 82 },
      '天秤座': { '双子座': 94, '水瓶座': 90, '狮子座': 83, '射手座': 81 },
      '天蝎座': { '巨蟹座': 92, '双鱼座': 89, '处女座': 82, '摩羯座': 80 },
      '射手座': { '白羊座': 92, '狮子座': 90, '天秤座': 81, '水瓶座': 79 },
      '摩羯座': { '金牛座': 90, '处女座': 89, '天蝎座': 80, '双鱼座': 78 },
      '水瓶座': { '双子座': 91, '天秤座': 90, '白羊座': 85, '射手座': 79 },
      '双鱼座': { '巨蟹座': 95, '天蝎座': 89, '金牛座': 84, '摩羯座': 78 }
    };

    // 查找契合度
    let score = 70; // 默认基础分

    if (compatibilityMatrix[sign1] && compatibilityMatrix[sign1][sign2]) {
      score = compatibilityMatrix[sign1][sign2];
    } else if (compatibilityMatrix[sign2] && compatibilityMatrix[sign2][sign1]) {
      score = compatibilityMatrix[sign2][sign1];
    } else if (sign1 === sign2) {
      score = 75; // 同星座
    }

    // 添加随机波动
    score += Math.floor(Math.random() * 5) - 2;

    return Math.min(100, Math.max(60, score));
  }

  /**
   * 生成各维度分析
   */
  generateAspects(sign1, sign2, name1, name2) {
    const aspects = [];

    for (let key in this.aspectTemplates) {
      const template = this.aspectTemplates[key];
      const score = 60 + Math.floor(Math.random() * 35);

      const keyword = template.keywords[Math.floor(Math.random() * template.keywords.length)];

      const contents = [
        `${name1}和${name2}在${template.title.replace('契合度', '')}方面有着${score > 80 ? '很强' : score > 70 ? '较好' : '一定'}的${keyword}基础。`,
        `你们的${sign1}和${sign2}配置显示出${score > 75 ? '积极' : '中等'}的互动能量。`,
        `在这个维度上，你们${score > 80 ? '非常和谐' : score > 70 ? '相对协调' : '需要互相理解'}。`
      ];

      aspects.push({
        icon: template.icon,
        title: template.title,
        score: score,
        content: contents[Math.floor(Math.random() * contents.length)]
      });
    }

    return aspects;
  }

  /**
   * 生成AI建议
   */
  generateAdvice(sign1, sign2, name1, name2, score) {
    let advice = '';

    if (score >= 85) {
      advice = `
        <p><strong>恭喜！${name1}（${sign1}）和${name2}（${sign2}）是非常契合的一对！✨</strong></p>
        <p>你们的星盘配置显示出极高的兼容性。${sign1}和${sign2}的能量互补，能够在关系中创造出美好的化学反应。</p>
        <p><strong>建议：</strong></p>
        <ul style="margin-top: 8px; padding-left: 20px; line-height: 1.8;">
          <li>珍惜这份难得的缘分，保持开放和真诚的沟通</li>
          <li>发挥各自星座的优势，互相支持成长</li>
          <li>定期创造浪漫时刻，保持关系的新鲜感</li>
        </ul>
      `;
    } else if (score >= 75) {
      advice = `
        <p><strong>${name1}（${sign1}）和${name2}（${sign2}）是潜力很大的一对！💫</strong></p>
        <p>你们的星盘配置良好，虽然可能在某些方面需要磨合，但整体非常和谐。</p>
        <p><strong>建议：</strong></p>
        <ul style="margin-top: 8px; padding-left: 20px; line-height: 1.8;">
          <li>多花时间了解彼此的想法和需求</li>
          <li>在遇到分歧时，用理性和包容的态度沟通</li>
          <li>共同培养兴趣爱好，增进情感连接</li>
        </ul>
      `;
    } else {
      advice = `
        <p><strong>${name1}（${sign1}）和${name2}（${sign2}）需要用心经营这段关系。💪</strong></p>
        <p>你们的星盘配置显示需要更多的理解和包容。不同的能量可以带来成长，但也需要双方的努力。</p>
        <p><strong>建议：</strong></p>
        <ul style="margin-top: 8px; padding-left: 20px; line-height: 1.8;">
          <li>学会欣赏彼此的差异，将其视为互补而非冲突</li>
          <li>建立有效的沟通机制，及时表达感受</li>
          <li>给彼此足够的空间和尊重</li>
          <li>寻找共同目标，增强关系的凝聚力</li>
        </ul>
      `;
    }

    advice += `
      <p style="margin-top: 16px; font-style: italic; color: rgba(255, 255, 255, 0.7);">
        记住，星盘只是参考，真正的感情需要双方共同用心经营。💕
      </p>
    `;

    return advice;
  }
}

window.SynastryAnalyzer = SynastryAnalyzer;
