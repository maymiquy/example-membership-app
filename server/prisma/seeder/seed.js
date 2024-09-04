const { v4: uuidv4 } = require('uuid');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const articles = [
        ...Array.from({ length: 15 }, (_, i) => ({
            id: uuidv4(),
            title: `Article ${i + 1}`,
            body: `This is the body of Article ${i + 1}, Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eligendi dignissimos cum in sed molestiae aliquid, rem consectetur qui delectus eius? Alias officia temporibus maiores asperiores et reprehenderit nemo illum? Eius sunt fugiat assumenda vitae? Rerum dolore neque quibusdam ipsa unde asperiores fugiat tempore dicta reiciendis hic voluptatum fuga, ipsam minima id vero distinctio, culpa pariatur ullam voluptatibus eos minus.

       Exercitationem nostrum necessitatibus nemo, Facere praesentium beatae modi odio soluta magni saepe, eaque sit ipsam incidunt impedit nam omnis quam! Culpa odit enim autem adipisci sequi voluptatum laudantium, cupiditate eum? Ab dolorum sequi sapiente odit ratione et, sed deleniti, suscipit reprehenderit maiores accusantium, tempore eos cupiditate itaque quisquam enim nihil ea repudiandae laborum rerum facere tenetur. A dolores repellat nemo.
       
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eligendi dignissimos cum in sed molestiae aliquid, rem consectetur qui delectus eius? Alias officia temporibus maiores asperiores et reprehenderit nemo illum? Eius sunt fugiat assumenda vitae? Rerum dolore neque quibusdam ipsa unde asperiores fugiat tempore dicta reiciendis hic voluptatum fuga, ipsam minima id vero distinctio, culpa pariatur ullam voluptatibus eos minus.
       `,
            imgUrl: `https://via.placeholder.com/400x200/?text=Article+${i + 1}`,
            releaseDate: new Date(),
            type: "article",
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
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            uploadDate: new Date(),
            type: "video",
        })),
    ];
    await prisma.video.createMany({
        data: videos,
    });
    const seederVideos = prisma.video.findMany();
    (seederVideos.length > 0) && console.log('Videos seeded successfully');;

    const plans = [
        ...Array.from({ length: 3 }, (_, i) => ({
            id: uuidv4(),
            name: `Plan ${i === 0 ? "Basic" : i === 1 ? "Premium" : "Platinum"}`,
            description: `This is the description of Plan ${i === 0 ? "Basic" : i === 1 ? "Premium" : "Platinum"}.`,
            price: i === 0 ? 9000 : i === 1 ? 19000 : 29000,
        })),
    ];
    await prisma.plan.createMany({
        data: plans,
    })
    const seederPlans = prisma.plan.findMany();
    (seederPlans.length > 0) && console.log('Plans seeded successfully');;
}


main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });