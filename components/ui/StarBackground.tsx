'use client';

import React, { useEffect, useRef } from "react";

interface Star {
    x: number;
    y: number;
    radius: number;
    vx: number;
    vy: number;
    alpha: number;
}

export const StarBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let stars: Star[] = [];
        const numStars = 150; // Number of stars

        let mouseX = -1000;
        let mouseY = -1000;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }

        const initStars = () => {
            stars = [];
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5 + 0.5,
                    vx: 0,
                    vy: 0,
                    alpha: Math.random() * 0.5 + 0.5,
                });
            }
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Dark background - gradient black-to-dark-blue
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, "#000010");
            gradient.addColorStop(1, "#000020");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            stars.forEach(star => {
                // Move star
                const dx = mouseX - star.x;
                const dy = mouseY - star.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                const maxDistance = 200;

                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    const angle = Math.atan2(dy, dx);

                    const pushForce = 0.5;
                    star.vx -= Math.cos(angle) * force * pushForce;
                    star.vy -= Math.sin(angle) * force * pushForce;
                }

                // Friction
                star.vx *= 0.95;
                star.vy *= 0.95;

                star.x += star.vx + 0.05;
                star.y += star.vy + 0.02;

                // Wrap around edges
                if (star.x < 0) star.x = canvas.width;
                if (star.x > canvas.width) star.x = 0;
                if (star.y < 0) star.y = canvas.height;
                if (star.y > canvas.height) star.y = 0;

                // Draw star
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        // Setup
        handleResize();
        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        render();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
        />
    );
}