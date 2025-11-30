import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About | Galaxy Brainer",
    description: "Learn more about Galaxy Brainer, the platform that offers a variety of brain-training games to enhance your cognitive skills."
};

export default function AboutPage() {
    return (
        <div className=" min-h-screen text-white selection:bg-purple-500 selection:text-white">
            {/* Container */}
            <div className="max-w-4xl mx-auto px-6 py-20 space-y-24">
                {/* Header Section */}
                <header className="text-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                        About Galaxy Brainer
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Know more about Galaxy Brainer, project goals, and the team behind it.
                    </p>
                </header>

                {/* Section 1: Project Overview */}
                <section className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 backdrop-blur-sm shadow-xl">
                    <h2 className="text-2xl font-bold mb-4 text-purple-400">Why this project was created?</h2>
                    <div className="space-y-4 text-slate-300 leading-relaxed">
                        <p>
                            The goal of Galaxy Brainer is to provide a tool that helps train your brain by forcing you to focus on the here and now.
                        </p>
                        <p>
                            In a world full of distractions, we've created a space for the average user who enjoys mind games and strives to build better intelligence. It's not just a game — it's a gym for your mind.
                        </p>
                    </div>
                </section>

                {/* Section 2: Technologies Used */}
                <section className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">Technologies Used</h2>
                        <p className="text-slate-300 mb-6">
                            The project was built using modern, efficient, and scalable solutions to ensure smooth gameplay and data security.
                        </p>
                    </div>

                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-3">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span className="text-slate-200">Front-end: <strong>Next.js + TypeScript + TailwindCSS</strong> </span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                <span className="text-slate-200">Back-end: <strong>Supabase (PostgreSQL + Auth)</strong></span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                                <span className="text-slate-200">Silnik Gier: <strong>Canvas API + React</strong></span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                <span className="text-slate-200">Hosting: <strong>Vercel</strong></span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Section 3: About the Team */}
                <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-900 p-8 md:p-12 text-center md:text-left">
                    {/* Ozdobny element tła */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        {/* Miejsce na awatar autora */}
                        <div className="w-32 h-32 rounded-full bg-slate-700 border-4 border-slate-600 flex-shrink-0 flex items-center justify-center text-4xl">
                            👨‍🚀
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-white">About the Creator</h2>
                            <p className="text-indigo-200 max-w-xl">
                                Hi! I'm the creator of Galaxy Brainer. This project was born from my passion for programming and the desire to create something that combines fun with self-improvement.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}