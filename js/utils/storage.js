/**
 * LocalStorage数据持久化工具
 * 用于保存和恢复对话历史、用户数据等
 */

class StorageManager {
  constructor() {
    this.STORAGE_PREFIX = 'stellar_relations_';
    this.KEYS = {
      CHAT_HISTORY: 'chat_history',
      USER_DATA: 'user_data',
      CURRENT_AI: 'current_ai',
      ONBOARDING_DONE: 'onboarding_done'
    };
  }

  /**
   * 保存数据到LocalStorage
   */
  save(key, data) {
    try {
      const fullKey = this.STORAGE_PREFIX + key;
      const jsonData = JSON.stringify(data);
      localStorage.setItem(fullKey, jsonData);
      return true;
    } catch (error) {
      console.error('Storage save error:', error);
      return false;
    }
  }

  /**
   * 从LocalStorage读取数据
   */
  load(key) {
    try {
      const fullKey = this.STORAGE_PREFIX + key;
      const jsonData = localStorage.getItem(fullKey);
      return jsonData ? JSON.parse(jsonData) : null;
    } catch (error) {
      console.error('Storage load error:', error);
      return null;
    }
  }

  /**
   * 删除指定数据
   */
  remove(key) {
    try {
      const fullKey = this.STORAGE_PREFIX + key;
      localStorage.removeItem(fullKey);
      return true;
    } catch (error) {
      console.error('Storage remove error:', error);
      return false;
    }
  }

  /**
   * 清空所有应用数据
   */
  clearAll() {
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(this.STORAGE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  }

  /**
   * 保存对话历史
   */
  saveChatHistory(messages) {
    return this.save(this.KEYS.CHAT_HISTORY, messages);
  }

  /**
   * 加载对话历史
   */
  loadChatHistory() {
    return this.load(this.KEYS.CHAT_HISTORY) || [];
  }

  /**
   * 保存用户数据
   */
  saveUserData(userData) {
    return this.save(this.KEYS.USER_DATA, userData);
  }

  /**
   * 加载用户数据
   */
  loadUserData() {
    return this.load(this.KEYS.USER_DATA) || {};
  }

  /**
   * 保存当前激活的AI
   */
  saveCurrentAI(aiName) {
    return this.save(this.KEYS.CURRENT_AI, aiName);
  }

  /**
   * 加载当前激活的AI
   */
  loadCurrentAI() {
    return this.load(this.KEYS.CURRENT_AI) || 'luna';
  }

  /**
   * 标记引导流程已完成
   */
  setOnboardingDone(done = true) {
    return this.save(this.KEYS.ONBOARDING_DONE, done);
  }

  /**
   * 检查引导流程是否完成
   */
  isOnboardingDone() {
    return this.load(this.KEYS.ONBOARDING_DONE) || false;
  }

  /**
   * 获取存储空间使用情况
   */
  getStorageInfo() {
    let totalSize = 0;
    let itemCount = 0;

    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(this.STORAGE_PREFIX)) {
        totalSize += localStorage.getItem(key).length;
        itemCount++;
      }
    });

    return {
      itemCount,
      totalSize,
      totalSizeKB: (totalSize / 1024).toFixed(2)
    };
  }
}

// 导出全局实例
window.StorageManager = StorageManager;
window.storage = new StorageManager();
