const { v4: uuidv4 } = require('uuid');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const articles = [
        ...Array.from({ length: 15 }, (_, i) => ({
            id: uuidv4(),
            title: `Article ${i + 1}`,
            body: `This is the description of Article ${i + 1}, description of Article, description of Article, description of Article, description of Article .`,
            imgUrl: `https://via.placeholder.com/400x200/?text=Article+${i + 1}`,
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
            id: uuidv4(),
            title: `Video ${i + 1}`,
            description: `This is the description of Video ${i + 1}.`,
            thumbnailUrl: `https://via.placeholder.com/400x200/?text=Video+${i + 1}`,
            videoUrl: null,
            uploadDate: new Date(),
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