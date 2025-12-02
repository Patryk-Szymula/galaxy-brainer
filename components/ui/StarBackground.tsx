'use client';

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface Star {
    x: number;
    y: number;
    radius: number;
    baseVx: number;
    baseVy: number;
    alpha: number;
}

export const StarBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const pathname = usePathname();

    // Check if we are on the home page
    const isInteractiveRef = useRef(pathname === '/');

    // Store the mouse position and the "smoothed" position (for smooth animation)
    const mousePosition = useRef({ x: 0, y: 0 });
    const smoothMousePosition = useRef({ x: 0, y: 0 });

    useEffect(() => {
        isInteractiveRef.current = pathname === '/';
    }, [pathname]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let stars: Star[] = [];
        const numStars = 200; // Number of stars

        // Set the starting position of the mouse to the center of the screen
        mousePosition.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        smoothMousePosition.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isInteractiveRef.current) return;
            mousePosition.current = { x: e.clientX, y: e.clientY };
        };

        const initStars = () => {
            stars = [];
            for (let i = 0; i < numStars; i++) {
                const radius = Math.random() * 1.5 + 0.5;

                const speedMultiplier = Math.random() * 0.1 + 0.05;

                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: radius,


                    baseVx: speedMultiplier,

                    baseVy: (Math.random() - 0.5) * 0.05,

                    alpha: Math.random() * 0.5 + 0.5,
                });
            }
        };

        // Funkcja liniowej interpolacji (LERP) do wygładzania ruchu
        const lerp = (start: number, end: number, factor: number) => {
            return start + (end - start) * factor;
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Tło
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, "#000010");
            gradient.addColorStop(1, "#000020");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Aktualizacja wygładzonej pozycji myszy (płynne podążanie)
            if (isInteractiveRef.current) {
                smoothMousePosition.current.x = lerp(smoothMousePosition.current.x, mousePosition.current.x, 0.05);
                smoothMousePosition.current.y = lerp(smoothMousePosition.current.y, mousePosition.current.y, 0.05);
            }

            // Obliczamy przesunięcie względem środka ekranu
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Wartości przesunięcia (offset)
            const offsetX = (smoothMousePosition.current.x - centerX);
            const offsetY = (smoothMousePosition.current.y - centerY);

            const currentTime = Date.now() / 1000;

            stars.forEach(star => {
                // 1. Stały dryf (gwiazdy zawsze się ruszają)
                star.x += star.baseVx;
                star.y += star.baseVy;

                // 2. Obsługa zawijania krawędzi (Wrap around)
                if (star.x < 0) star.x = canvas.width;
                if (star.x > canvas.width) star.x = 0;
                if (star.y < 0) star.y = canvas.height;
                if (star.y > canvas.height) star.y = 0;

                // 3. Obliczanie pozycji rysowania z uwzględnieniem efektu 3D (Parallax)
                // Im większa gwiazda (radius), tym jest "bliżej", więc przesuwa się mocniej
                let drawX = star.x;
                let drawY = star.y;

                if (isInteractiveRef.current) {
                    // Siła efektu (0.02 to czułość) * "głębia" (radius)
                    const parallaxFactor = 0.04 * star.radius;

                    // Przesuwamy gwiazdę w stronę kursora (dodajemy offset)
                    // Jeśli chcesz efekt przeciwny (tło ucieka jak przy obrocie kamery), zmień "+" na "-"
                    drawX += offsetX * parallaxFactor;
                    drawY += offsetY * parallaxFactor;
                }

                const flickerSpeed = 1.5;
                const flickerIntensity = 0.25;

                const pulsingAlpha = star.alpha + Math.sin(currentTime * flickerSpeed + star.x * 0.01) * flickerIntensity;

                const finalAlpha = Math.max(0, Math.min(1, pulsingAlpha));

                // Drawing
                ctx.beginPath();
                ctx.arc(drawX, drawY, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${finalAlpha})`;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

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
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        />
    );
}