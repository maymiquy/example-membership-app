const Article = require('../models/Article');
const Video = require('../models/Video');

const contentService = {
    async getContents() {
        try {
            const articles = await Article.findAll();
            const videos = await Video.findAll();
            return { articles, videos };
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async getArticle(id) {
        try {
            const article = await Article.findOne(id);
            return article;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async getVideo(id) {
        try {
            const video = await Video.findOne(id);
            return video;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = contentService;