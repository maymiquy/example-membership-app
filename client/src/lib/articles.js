import { Newspaper } from 'lucide-react';

const articles = [
    ...Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        title: `Article ${i + 1}`,
        body: `This is the description of Article ${i + 1}, description of Article, description of Article, description of Article, description of Article .`,
        imgUrl: `https://via.placeholder.com/400x200/?text=Article+${i + 1}`,
        releaseDate: new Date(),
    })),
];

export default articles;
