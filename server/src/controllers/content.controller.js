const contentService = require('../services/content.service');

const contentController = {
    async getAllContents(req, res) {
        try {
            const { articles, videos } = await contentService.getContents();
            res.status(200).json({
                data: {
                    articles: articles,
                    videos: videos
                }
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async getArticleById(req, res) {
        try {
            const id = req.params.id;
            const article = await contentService.getArticle(id);
            res.status(200).json({ data: article });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async getVideoById(req, res) {
        try {
            const id = req.params.id;
            const video = await contentService.getVideo(id);
            res.status(200).json({ data: video });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

module.exports = contentController;