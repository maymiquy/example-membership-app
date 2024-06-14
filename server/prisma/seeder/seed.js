const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.membership.createMany({
        data: [
            { type: 'Standard', price: 9000 },
            { type: 'Premium', price: 19000 },
            { type: 'Platinum', price: 29000 },
        ],
    });
    const seederMembership = prisma.membership.findMany();
    (seederMembership.lenth > 0) && console.log('Membership seeded successfully');


    const articles = [
        ...Array.from({ length: 15 }, (_, i) => ({
            title: `Article ${i + 1}`,
            body: `This is the description of Article ${i + 1}.`,
            imgUrl: `https://example.com/article${i + 1}.jpg`,
            releaseDate: new Date(),
        })),
    ];
    await prisma.article.createMany({
        data: articles,
    });
    const seederArticles = prisma.article.findMany();
    (seederArticles.length > 0) && console.log('Articles seeded successfully');;


    const videos = [
        ...Array.from({ length: 15 }, (_, i) => ({
            title: `Video ${i + 1}`,
            desc: `This is the description of Video ${i + 1}.`,
            videoUrl: `https://example.com/video${i + 1}.mp4`,
            releaseDate: new Date(),
        })),
    ];
    await prisma.video.createMany({
        data: videos,
    });
    const seederVideos = prisma.video.findMany();
    (seederVideos.length > 0) && console.log('Videos seeded successfully');;
}


main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });