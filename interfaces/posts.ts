export interface Posts {
    posts: Post[]
}

export interface Post {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: Reactions;
    views: number;
}
export interface Reactions {
    likes: number;
    dislikes: number;
}