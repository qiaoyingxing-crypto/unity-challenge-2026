// ==================== 3D粒子效果 ====================

class ParticleSystem {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.particles = [];
        this.maxParticles = 100;
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.init();
    }
    
    init() {
        // 创建画布
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
        this.container.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        
        // 创建粒子
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push(this.createParticle());
        }
        
        // 监听鼠标移动
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        // 监听窗口大小变化
        window.addEventListener('resize', () => {
            this.canvas.width = this.container.offsetWidth;
            this.canvas.height = this.container.offsetHeight;
        });
        
        // 开始动画
        this.animate();
    }
    
    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            color: this.getRandomColor(),
            alpha: Math.random() * 0.5 + 0.2
        };
    }
    
    getRandomColor() {
        const colors = [
            'rgba(0, 102, 255, ',
            'rgba(153, 51, 255, ',
            'rgba(0, 255, 255, ',
            'rgba(255, 0, 255, '
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 更新和绘制粒子
        this.particles.forEach((particle, index) => {
            // 更新位置
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // 鼠标交互
            const dx = particle.x - this.mouseX;
            const dy = particle.y - this.mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += (dx / distance) * force * 0.5;
                particle.vy += (dy / distance) * force * 0.5;
            }
            
            // 边界检测
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
            }
            
            // 绘制粒子
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color + particle.alpha + ')';
            this.ctx.fill();
            
            // 绘制连线
            this.particles.slice(index + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(0, 102, 255, ${0.1 * (1 - distance / 150)})`;
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// ==================== Three.js 3D背景 ====================

class ThreeBackground {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.init();
    }
    
    init() {
        // 创建场景
        this.scene = new THREE.Scene();
        
        // 创建相机
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.container.offsetWidth / this.container.offsetHeight,
            0.1,
            1000
        );
        this.camera.position.z = 50;
        
        // 创建渲染器
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.container.appendChild(this.renderer.domElement);
        
        // 创建粒子
        this.createParticles();
        
        // 创建神经网络
        this.createNeuralNetwork();
        
        // 监听窗口大小变化
        window.addEventListener('resize', () => {
            this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        });
        
        // 开始动画
        this.animate();
    }
    
    createParticles() {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const colors = [];
        
        for (let i = 0; i < 1000; i++) {
            vertices.push(
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100
            );
            
            const color = new THREE.Color();
            color.setHSL(Math.random(), 0.7, 0.5);
            colors.push(color.r, color.g, color.b);
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }
    
    createNeuralNetwork() {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        
        // 创建节点
        this.nodes = [];
        for (let i = 0; i < 20; i++) {
            this.nodes.push({
                x: (Math.random() - 0.5) * 60,
                y: (Math.random() - 0.5) * 40,
                z: (Math.random() - 0.5) * 30
            });
        }
        
        // 创建连线
        this.nodes.forEach((node, i) => {
            this.nodes.forEach((otherNode, j) => {
                if (i < j) {
                    const distance = Math.sqrt(
                        Math.pow(node.x - otherNode.x, 2) +
                        Math.pow(node.y - otherNode.y, 2) +
                        Math.pow(node.z - otherNode.z, 2)
                    );
                    
                    if (distance < 30) {
                        vertices.push(node.x, node.y, node.z);
                        vertices.push(otherNode.x, otherNode.y, otherNode.z);
                    }
                }
            });
        });
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        
        const material = new THREE.LineBasicMaterial({
            color: 0x0066ff,
            transparent: true,
            opacity: 0.3
        });
        
        this.network = new THREE.LineSegments(geometry, material);
        this.scene.add(this.network);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // 旋转粒子系统
        this.particles.rotation.x += 0.0005;
        this.particles.rotation.y += 0.001;
        
        // 旋转神经网络
        this.network.rotation.x += 0.0003;
        this.network.rotation.y += 0.0005;
        
        this.renderer.render(this.scene, this.camera);
    }
}

// ==================== 神经网络SVG动画 ====================

class NeuralNetworkSVG {
    constructor(svgSelector) {
        this.svg = document.querySelector(svgSelector);
        if (!this.svg) return;
        
        this.linesGroup = this.svg.querySelector('.network-lines');
        this.nodesGroup = this.svg.querySelector('.network-nodes');
        
        this.nodes = [];
        this.connections = [];
        
        this.init();
    }
    
    init() {
        // 创建节点
        for (let i = 0; i < 15; i++) {
            const node = {
                x: 50 + Math.random() * 300,
                y: 50 + Math.random() * 300,
                r: 3 + Math.random() * 3
            };
            this.nodes.push(node);
            
            // 创建节点元素
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', node.x);
            circle.setAttribute('cy', node.y);
            circle.setAttribute('r', node.r);
            circle.setAttribute('fill', '#00ffff');
            circle.setAttribute('opacity', '0.6');
            circle.style.animation = `neuralPulse ${2 + Math.random() * 2}s ease-in-out infinite`;
            this.nodesGroup.appendChild(circle);
        }
        
        // 创建连线
        this.nodes.forEach((node, i) => {
            this.nodes.forEach((otherNode, j) => {
                if (i < j) {
                    const distance = Math.sqrt(
                        Math.pow(node.x - otherNode.x, 2) +
                        Math.pow(node.y - otherNode.y, 2)
                    );
                    
                    if (distance < 150) {
                        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                        line.setAttribute('x1', node.x);
                        line.setAttribute('y1', node.y);
                        line.setAttribute('x2', otherNode.x);
                        line.setAttribute('y2', otherNode.y);
                        line.setAttribute('stroke', '#0066ff');
                        line.setAttribute('stroke-width', '1');
                        line.setAttribute('opacity', 0.2);
                        this.linesGroup.appendChild(line);
                    }
                }
            });
        });
    }
}

// ==================== 初始化 ====================

document.addEventListener('DOMContentLoaded', () => {
    // 初始化粒子系统
    new ParticleSystem('particlesCanvas');
    
    // 初始化Three.js背景
    new ThreeBackground('particlesCanvas');
    
    // 初始化神经网络SVG
    new NeuralNetworkSVG('.network-svg');
});