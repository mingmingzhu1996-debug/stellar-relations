/**
 * 星空关系图谱可视化组件
 * Canvas绘制人际关系网络图
 */

class RelationshipGraph {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.animationId = null;

    this.config = {
      nodeRadius: options.nodeRadius || 40,
      connectionWidth: options.connectionWidth || 2,
      particleCount: options.particleCount || 20,
      animationSpeed: options.animationSpeed || 0.5
    };

    this.data = {
      nodes: [],
      connections: []
    };

    this.particles = [];
    this.selectedNode = null;
    this.hoveredNode = null;
    this.eventListeners = {};

    this.init();
  }

  /**
   * 初始化
   */
  init() {
    this.resize();
    this.canvas.addEventListener('click', (e) => this.handleClick(e));
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
  }

  /**
   * 调整Canvas大小
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

    // 更新节点绝对坐标
    this.updateNodePositions();
  }

  /**
   * 设置数据
   */
  setData(data) {
    this.data = data;
    this.updateNodePositions();
    this.createParticles();
  }

  /**
   * 更新节点绝对坐标
   */
  updateNodePositions() {
    this.data.nodes.forEach(node => {
      node.absX = node.x * this.width;
      node.absY = node.y * this.height;
    });
  }

  /**
   * 创建粒子
   */
  createParticles() {
    this.particles = [];
    this.data.connections.forEach(conn => {
      const fromNode = this.data.nodes.find(n => n.id === conn.from);
      const toNode = this.data.nodes.find(n => n.id === conn.to);

      if (fromNode && toNode) {
        for (let i = 0; i < this.config.particleCount; i++) {
          this.particles.push({
            connection: conn,
            fromNode,
            toNode,
            progress: Math.random(),
            speed: 0.002 + Math.random() * 0.003,
            size: 1 + Math.random() * 2
          });
        }
      }
    });
  }

  /**
   * 绘制连接线
   */
  drawConnection(conn) {
    const fromNode = this.data.nodes.find(n => n.id === conn.from);
    const toNode = this.data.nodes.find(n => n.id === conn.to);

    if (!fromNode || !toNode) return;

    this.ctx.save();

    // 连接线
    const gradient = this.ctx.createLinearGradient(
      fromNode.absX, fromNode.absY,
      toNode.absX, toNode.absY
    );

    const colors = {
      'love': 'rgba(255, 107, 157, ',
      'work': 'rgba(78, 159, 255, ',
      'family': 'rgba(0, 212, 170, ',
      'friend': 'rgba(200, 200, 220, '
    };

    const baseColor = colors[conn.type] || colors['friend'];

    gradient.addColorStop(0, baseColor + '0.3)');
    gradient.addColorStop(0.5, baseColor + conn.strength + ')');
    gradient.addColorStop(1, baseColor + '0.3)');

    this.ctx.strokeStyle = gradient;
    this.ctx.lineWidth = this.config.connectionWidth * conn.strength;
    this.ctx.beginPath();
    this.ctx.moveTo(fromNode.absX, fromNode.absY);
    this.ctx.lineTo(toNode.absX, toNode.absY);
    this.ctx.stroke();

    this.ctx.restore();
  }

  /**
   * 绘制粒子
   */
  drawParticles() {
    this.particles.forEach(particle => {
      // 更新粒子位置
      particle.progress += particle.speed;
      if (particle.progress > 1) {
        particle.progress = 0;
      }

      // 计算粒子当前位置
      const x = particle.fromNode.absX +
                (particle.toNode.absX - particle.fromNode.absX) * particle.progress;
      const y = particle.fromNode.absY +
                (particle.toNode.absY - particle.fromNode.absY) * particle.progress;

      // 绘制粒子
      this.ctx.save();

      const colors = {
        'love': '#FF6B9D',
        'work': '#4E9FFF',
        'family': '#00D4AA',
        'friend': '#C8C8DC'
      };

      this.ctx.fillStyle = colors[particle.connection.type] || colors['friend'];
      this.ctx.globalAlpha = 0.6;
      this.ctx.beginPath();
      this.ctx.arc(x, y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.restore();
    });
  }

  /**
   * 绘制节点
   */
  drawNode(node) {
    this.ctx.save();

    const isSelected = this.selectedNode === node;
    const isHovered = this.hoveredNode === node;
    const radius = this.config.nodeRadius * (isSelected || isHovered ? 1.2 : 1);

    // 节点背景
    const colors = {
      'self': '#6B4FE0',
      'love': '#FF6B9D',
      'work': '#4E9FFF',
      'family': '#00D4AA',
      'friend': '#C8C8DC'
    };

    const gradient = this.ctx.createRadialGradient(
      node.absX, node.absY, 0,
      node.absX, node.absY, radius
    );

    const nodeColor = colors[node.type] || colors['friend'];
    gradient.addColorStop(0, nodeColor);
    gradient.addColorStop(1, nodeColor + '80');

    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(node.absX, node.absY, radius, 0, Math.PI * 2);
    this.ctx.fill();

    // 光晕效果
    if (isSelected || isHovered) {
      this.ctx.strokeStyle = nodeColor;
      this.ctx.lineWidth = 3;
      this.ctx.globalAlpha = 0.5;
      this.ctx.beginPath();
      this.ctx.arc(node.absX, node.absY, radius + 10, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.globalAlpha = 1;
    }

    // 边框
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(node.absX, node.absY, radius, 0, Math.PI * 2);
    this.ctx.stroke();

    // 文字
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = `${node.type === 'self' ? 'bold ' : ''}14px PingFang SC, sans-serif`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(node.name, node.absX, node.absY);

    this.ctx.restore();
  }

  /**
   * 渲染一帧
   */
  render() {
    // 清除画布
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 绘制连接线
    this.data.connections.forEach(conn => this.drawConnection(conn));

    // 绘制粒子
    this.drawParticles();

    // 绘制节点
    this.data.nodes.forEach(node => this.drawNode(node));
  }

  /**
   * 开始动画
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
   * 停止动画
   */
  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  /**
   * 处理点击事件
   */
  handleClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedNode = this.findNodeAt(x, y);

    if (clickedNode) {
      this.selectedNode = clickedNode;
      this.emit('nodeClick', clickedNode);
    } else {
      this.selectedNode = null;
    }
  }

  /**
   * 处理鼠标移动事件
   */
  handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const hoveredNode = this.findNodeAt(x, y);

    if (hoveredNode) {
      this.canvas.style.cursor = 'pointer';
      this.hoveredNode = hoveredNode;
    } else {
      this.canvas.style.cursor = 'default';
      this.hoveredNode = null;
    }
  }

  /**
   * 查找指定坐标的节点
   */
  findNodeAt(x, y) {
    return this.data.nodes.find(node => {
      const dx = node.absX - x;
      const dy = node.absY - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < this.config.nodeRadius;
    });
  }

  /**
   * 事件监听
   */
  on(event, callback) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(callback);
  }

  /**
   * 触发事件
   */
  emit(event, data) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].forEach(callback => callback(data));
    }
  }

  /**
   * 销毁
   */
  destroy() {
    this.stop();
    this.canvas.removeEventListener('click', this.handleClick);
    this.canvas.removeEventListener('mousemove', this.handleMouseMove);
  }
}

window.RelationshipGraph = RelationshipGraph;
