const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Video {
    static async update(id, title, desc, videoUrl, releaseDate) {
        try {
            const video = await prisma.video.update({
                where: {
                    id
                },
                data: {
                    title,
                    desc,
                    videoUrl,
                    releaseDate
                },
            });
            return video;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async findAll() {
        try {
            const videos = await prisma.video.findMany();
            return videos;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async findOne(id) {
        try {
            const video = await prisma.video.findUnique({
                where: {
                    id
                }
            });
            return video;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = Video;