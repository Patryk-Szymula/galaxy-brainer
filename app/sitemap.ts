import { MetadataRoute } from 'next';

const games = [
    'reflex',
    'code',
    'sequence',
    'counting',
];

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://galaxybrainer.com';

    // State pages
    const routes = [
        '',
        '/about',
        '/games',
        //'/login',
        //'/register',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic games pages
    const gameRoutes = games.map((slug) => ({
        url: `${baseUrl}/games/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9, // Important for games!
    }));

    return [...routes, ...gameRoutes];
}