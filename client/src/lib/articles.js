import { Newspaper } from 'lucide-react';

const articles = [
    ...Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
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

export default articles;
