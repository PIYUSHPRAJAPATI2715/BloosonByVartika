import React, { useEffect, useRef } from 'react';

export default function PetalCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Petal & Sparkle Particles
    const petalCount = 35;
    const petals = [];

    const colors = [
      'rgba(232, 183, 201, 0.65)', // Blush Pink
      'rgba(248, 227, 236, 0.75)', // Soft Rose
      'rgba(200, 164, 93, 0.55)',  // Gold Dust
      'rgba(255, 249, 246, 0.8)'   // Cream Petal
    ];

    class Petal {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20 - Math.random() * 50;
        this.size = 6 + Math.random() * 10;
        this.speedY = 0.6 + Math.random() * 1.2;
        this.speedX = Math.sin(Math.random() * Math.PI) * 0.8 - 0.4;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 1.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = 0.4 + Math.random() * 0.5;
        this.isSparkle = Math.random() > 0.65;
      }

      update() {
        this.y += this.speedY;
        this.x += Math.sin(this.y * 0.01) * 0.6 + this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;

        if (this.isSparkle) {
          // Golden Sparkle Star
          ctx.fillStyle = '#C8A45D';
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.3, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = 'rgba(200, 164, 93, 0.8)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(-this.size, 0); ctx.lineTo(this.size, 0);
          ctx.moveTo(0, -this.size); ctx.lineTo(0, this.size);
          ctx.stroke();
        } else {
          // Flower Petal Shape
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-this.size, -this.size * 1.5, -this.size * 1.5, this.size * 0.5, 0, this.size * 1.8);
          ctx.bezierCurveTo(this.size * 1.5, this.size * 0.5, this.size, -this.size * 1.5, 0, 0);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    for (let i = 0; i < petalCount; i++) {
      petals.push(new Petal());
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((petal) => {
        petal.update();
        petal.draw();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10
      }}
    />
  );
}
