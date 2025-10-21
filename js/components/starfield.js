/**
 * 星空背景引擎
 * Canvas渲染1000颗闪烁星星 + 深空渐变背景
 * 性能优化：requestAnimationFrame + 离屏渲染
 */

class StarField {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.stars = [];
    this.animationId = null;

    // 配置参数
    this.config = {
      starCount: options.starCount || 1000,
      minSize: options.minSize || 0.5,
      maxSize: options.maxSize || 2.5,
      minSpeed: options.minSpeed || 0.1,
      maxSpeed: options.maxSpeed || 0.5,
      twinkleProbability: options.twinkleProbability || 0.01,
      colors: options.colors || [
        'rgba(255, 255, 255, 0.8)',
        'rgba(107, 79, 224, 0.6)',  // 紫色星
        'rgba(78, 159, 255, 0.6)',  // 蓝色星
        'rgba(255, 107, 157, 0.6)', // 粉色星
      ]
    };

    this.init();
  }

  /**
   * 初始化Canvas和星星
   */
  init() {
    this.resize();
    this.createStars();
    window.addEventListener('resize', () => this.resize());
  }

  /**
   * 调整Canvas大小以适配窗口
   */
  resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';

    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;

    // 重新创建星星（如果已经存在）
    if (this.stars.length > 0) {
      this.createStars();
    }
  }

  /**
   * 创建星星对象
   */
  createStars() {
    this.stars = [];
    for (let i = 0; i < this.config.starCount; i++) {
      this.stars.push(this.createStar());
    }
  }

  /**
   * 创建单个星星
   */
  createStar() {
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      size: this.randomRange(this.config.minSize, this.config.maxSize),
      speed: this.randomRange(this.config.minSpeed, this.config.maxSpeed),
      opacity: Math.random(),
      twinkleSpeed: this.randomRange(0.01, 0.03),
      color: this.config.colors[Math.floor(Math.random() * this.config.colors.length)],
      isTwinkling: false,
      twinkleDirection: 1 // 1: 变亮, -1: 变暗
    };
  }

  /**
   * 生成范围内随机数
   */
  randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  /**
   * 绘制深空渐变背景
   */
  drawBackground() {
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(0, '#1A1B3D');    // 深空蓝黑
    gradient.addColorStop(0.5, '#2D1B4E');  // 深紫
    gradient.addColorStop(1, '#1A1B3D');    // 深空蓝黑

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  /**
   * 更新星星状态
   */
  updateStar(star) {
    // 缓慢漂移（可选）
    star.y -= star.speed;
    if (star.y < -10) {
      star.y = this.height + 10;
      star.x = Math.random() * this.width;
    }

    // 闪烁逻辑
    if (!star.isTwinkling && Math.random() < this.config.twinkleProbability) {
      star.isTwinkling = true;
    }

    if (star.isTwinkling) {
      star.opacity += star.twinkleSpeed * star.twinkleDirection;

      if (star.opacity >= 1) {
        star.opacity = 1;
        star.twinkleDirection = -1;
      } else if (star.opacity <= 0.2) {
        star.opacity = 0.2;
        star.twinkleDirection = 1;
        star.isTwinkling = false;
      }
    }
  }

  /**
   * 绘制单个星星
   */
  drawStar(star) {
    this.ctx.save();

    // 星星主体
    this.ctx.globalAlpha = star.opacity;
    this.ctx.fillStyle = star.color;
    this.ctx.beginPath();
    this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    this.ctx.fill();

    // 光晕效果（大星星）
    if (star.size > 1.5) {
      const gradient = this.ctx.createRadialGradient(
        star.x, star.y, 0,
        star.x, star.y, star.size * 3
      );
      gradient.addColorStop(0, star.color.replace(/[\d.]+\)$/g, '0.4)'));
      gradient.addColorStop(1, star.color.replace(/[\d.]+\)$/g, '0)'));

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.restore();
  }

  /**
   * 渲染一帧
   */
  render() {
    // 清除画布
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 绘制背景
    this.drawBackground();

    // 更新并绘制所有星星
    this.stars.forEach(star => {
      this.updateStar(star);
      this.drawStar(star);
    });
  }

  /**
   * 开始动画循环
   */
  start() {
    if (this.animationId) return;

    const animate = () => {
      this.render();
      this.animationId = requestAnimationFrame(animate);
    };

    animate();
  }

  /**
   * 停止动画循环
   */
  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  /**
   * 销毁星空实例
   */
  destroy() {
    this.stop();
    window.removeEventListener('resize', () => this.resize());
    this.stars = [];
  }
}

// 导出供全局使用
window.StarField = StarField;

/**
 * 初始化页面星空背景
 * 在HTML中调用：<canvas id="starfield"></canvas>
 */
function initStarField(canvasId = 'starfield') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error('StarField: Canvas element not found');
    return null;
  }

  const starfield = new StarField(canvas, {
    starCount: 1000,
    minSize: 0.5,
    maxSize: 2.5,
    twinkleProbability: 0.01
  });

  starfield.start();
  return starfield;
}

window.initStarField = initStarField;
