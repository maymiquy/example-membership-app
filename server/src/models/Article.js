const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Article {
    static async update(id, title, body, releaseDate, imgUrl) {
        try {
            const article = await prisma.article.update({
                where: {
                    id
                },
                data: {
                    title,
                    body,
                    releaseDate,
                    imgUrl
                },
            });
            return article;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async findAll() {
        try {
            const articles = await prisma.article.findMany();
            return articles;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async findOne(id) {
        try {
            const article = await prisma.article.findUnique({
                where: {
                    id
                }
            });
            return article;
        } catch (error) {
            throw new Error(error.message);
        }
    }

}

module.exports = Article;