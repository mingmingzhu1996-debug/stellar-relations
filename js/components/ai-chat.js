/**
 * AI打字机动画组件
 * 逐字显示文本，模拟AI实时回复效果
 */

class TypingAnimation {
  constructor(element, options = {}) {
    this.element = element;
    this.config = {
      speed: options.speed || 50,           // 打字速度（毫秒/字符）
      cursor: options.cursor !== false,     // 是否显示光标
      cursorChar: options.cursorChar || '▋', // 光标字符
      onComplete: options.onComplete || null, // 完成回调
      onChar: options.onChar || null         // 每个字符回调
    };

    this.isTyping = false;
    this.currentText = '';
    this.currentIndex = 0;
    this.timeoutId = null;
  }

  /**
   * 开始打字动画
   * @param {string} text - 要显示的文本
   */
  type(text) {
    return new Promise((resolve) => {
      this.stop(); // 停止之前的动画
      this.currentText = text;
      this.currentIndex = 0;
      this.isTyping = true;

      const typeNextChar = () => {
        if (this.currentIndex < this.currentText.length) {
          const char = this.currentText[this.currentIndex];
          this.element.textContent += char;
          this.currentIndex++;

          // 触发字符回调
          if (this.config.onChar) {
            this.config.onChar(char, this.currentIndex);
          }

          // 标点符号后稍微停顿
          let delay = this.config.speed;
          if (['。', '！', '？', '.', '!', '?'].includes(char)) {
            delay *= 3;
          } else if (['，', '、', ',', ';'].includes(char)) {
            delay *= 2;
          }

          this.timeoutId = setTimeout(typeNextChar, delay);
        } else {
          this.isTyping = false;
          if (this.config.onComplete) {
            this.config.onComplete();
          }
          resolve();
        }
      };

      this.element.textContent = '';
      if (this.config.cursor) {
        this.showCursor();
      }

      typeNextChar();
    });
  }

  /**
   * 停止打字动画
   */
  stop() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.isTyping = false;
    this.hideCursor();
  }

  /**
   * 立即显示全部文本（跳过动画）
   */
  skipAnimation(text) {
    this.stop();
    this.element.textContent = text || this.currentText;
  }

  /**
   * 显示打字光标
   */
  showCursor() {
    this.cursorElement = document.createElement('span');
    this.cursorElement.className = 'typing-cursor';
    this.cursorElement.textContent = this.config.cursorChar;
    this.element.appendChild(this.cursorElement);
  }

  /**
   * 隐藏打字光标
   */
  hideCursor() {
    if (this.cursorElement) {
      this.cursorElement.remove();
      this.cursorElement = null;
    }
  }

  /**
   * 清空文本
   */
  clear() {
    this.stop();
    this.element.textContent = '';
  }
}

window.TypingAnimation = TypingAnimation;

/**
 * AI对话管理器
 * 管理多个AI角色的对话显示
 */
class AIChat {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error('AIChat: Container not found');
      return;
    }

    this.config = {
      typingSpeed: options.typingSpeed || 50,
      showAvatar: options.showAvatar !== false,
      autoScroll: options.autoScroll !== false,
      enableStorage: options.enableStorage !== false // 默认启用存储
    };

    this.messages = [];
    this.storage = window.storage; // StorageManager实例

    // 加载历史对话
    if (this.config.enableStorage && this.storage) {
      this.loadHistory();
    }
  }

  /**
   * 加载对话历史
   */
  loadHistory() {
    const history = this.storage.loadChatHistory();
    if (history && history.length > 0) {
      this.messages = history;
      // 重新渲染历史消息（不使用打字动画）
      history.forEach(msg => {
        if (msg.type === 'ai') {
          this.addAIMessage(msg.aiName, msg.text, false);
        } else {
          this.addUserMessage(msg.text, false);
        }
      });
    }
  }

  /**
   * 保存对话历史
   */
  saveHistory() {
    if (this.config.enableStorage && this.storage) {
      this.storage.saveChatHistory(this.messages);
    }
  }

  /**
   * 添加AI消息
   * @param {string} aiName - AI名称 (luna/atlas/ceres)
   * @param {string} text - 消息文本
   * @param {boolean} animate - 是否使用打字动画
   */
  async addAIMessage(aiName, text, animate = true) {
    const messageEl = this.createMessageElement('ai', aiName);
    this.container.appendChild(messageEl);

    const contentEl = messageEl.querySelector('.ai-message-content');
    const textEl = document.createElement('div');
    contentEl.appendChild(textEl);

    if (animate) {
      const typing = new TypingAnimation(textEl, {
        speed: this.config.typingSpeed,
        cursor: true
      });
      await typing.type(text);
    } else {
      textEl.textContent = text;
    }

    this.messages.push({ type: 'ai', aiName, text });
    this.saveHistory(); // 自动保存
    this.scrollToBottom();

    return messageEl;
  }

  /**
   * 添加用户消息
   * @param {string} text - 消息文本
   * @param {boolean} save - 是否保存到历史
   */
  addUserMessage(text, save = true) {
    const messageEl = this.createMessageElement('user');
    this.container.appendChild(messageEl);

    const contentEl = messageEl.querySelector('.user-message-content');
    contentEl.textContent = text;

    if (save) {
      this.messages.push({ type: 'user', text });
      this.saveHistory(); // 自动保存
    }
    this.scrollToBottom();

    return messageEl;
  }

  /**
   * 显示AI正在输入...
   * @param {string} aiName - AI名称
   */
  showTypingIndicator(aiName) {
    const messageEl = this.createMessageElement('ai', aiName);
    messageEl.id = 'typing-indicator';

    const contentEl = messageEl.querySelector('.ai-message-content');
    contentEl.innerHTML = `
      <div class="loading-dots">
        <span class="loading-dot"></span>
        <span class="loading-dot"></span>
        <span class="loading-dot"></span>
      </div>
    `;

    this.container.appendChild(messageEl);
    this.scrollToBottom();

    return messageEl;
  }

  /**
   * 移除"正在输入"指示器
   */
  hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  /**
   * 创建消息元素
   */
  createMessageElement(type, aiName = null) {
    const messageEl = document.createElement('div');

    if (type === 'ai') {
      messageEl.className = 'ai-message fade-in-up';
      messageEl.innerHTML = `
        ${this.config.showAvatar ? this.createAvatar(aiName) : ''}
        <div class="ai-message-content"></div>
      `;
    } else {
      messageEl.className = 'user-message fade-in-up';
      messageEl.innerHTML = `
        <div class="user-message-content"></div>
      `;
    }

    return messageEl;
  }

  /**
   * 创建AI头像
   */
  createAvatar(aiName) {
    const avatarMap = {
      luna: { emoji: '🌙', class: 'ai-avatar-luna' },
      atlas: { emoji: '📊', class: 'ai-avatar-atlas' },
      ceres: { emoji: '🌿', class: 'ai-avatar-ceres' }
    };

    const avatar = avatarMap[aiName] || avatarMap.luna;

    return `
      <div class="ai-avatar ${avatar.class}">
        ${avatar.emoji}
      </div>
    `;
  }

  /**
   * 滚动到底部
   */
  scrollToBottom() {
    if (this.config.autoScroll) {
      this.container.scrollTop = this.container.scrollHeight;
    }
  }

  /**
   * 清空所有消息
   */
  clear() {
    this.container.innerHTML = '';
    this.messages = [];
  }

  /**
   * 获取对话历史
   */
  getHistory() {
    return this.messages;
  }
}

window.AIChat = AIChat;

/**
 * 便捷初始化函数
 */
function initAIChat(containerId, options = {}) {
  return new AIChat(containerId, options);
}

window.initAIChat = initAIChat;
