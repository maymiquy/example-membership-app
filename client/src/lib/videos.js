const videos = [
    ...Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        title: `Video ${i + 1}`,
        description: `This is the description of Video ${i + 1}.`,
        thumbnailUrl: `https://via.placeholder.com/400x200/?text=Video+${i + 1}`,
        uploadDate: new Date(),
    })),
];

export default videos;
