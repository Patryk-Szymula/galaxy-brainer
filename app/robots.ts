import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://galaxybrainer.com';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/dashboard/', // Private dashboard
                '/profile/',   // Profile settings
                '/api/',       // API endpoints
            ],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}