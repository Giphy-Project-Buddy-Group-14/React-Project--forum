import { ref, push, get, set, query, equalTo, orderByChild, update } from 'firebase/database';
import { db } from '../config/firebase-config';

const fromPostsDocument = async snapshot => {
    try {
        const postsDocument = snapshot.val();

        return Object.keys(postsDocument).map(key => {
            const post = postsDocument[key];

            return {
                ...post,
                id: key,
                createdOn: new Date(post.createdOn),
                likedBy: post.likedBy ? Object.keys(post.likedBy) : [],
            };
        });
    } catch (error) {
        console.error(error);
    }
};

export const updatePost = async (id, content, handle) => {
    try {
        const postRef = ref(db, `posts/${id}`);
        await set(postRef, {
            ...content,
            author: handle,
            createdOn: Date.now(),
        });
        const result = await getPostById(id);
        return result;
    } catch (error) {
        console.error(error);
    }
};


export const addPost = async (content, handle) => {
    try {

        const result = await push(
            ref(db, 'posts'),
            {
                ...content,
                author: handle,
                createdOn: Date.now(),
            },
        );

        return getPostById(result.key);
    } catch (error) {
        console.error(error);
    }
};

export const getPostById = async (id) => {
    try {
        const result = await get(ref(db, `posts/${id}`));

        if (!result.exists()) {
            throw new Error(`Post with id ${id} does not exist!`);
        }

        const post = result.val();
        post.id = id;
        post.createdOn = new Date(post.createdOn);
        if (!post.likedBy) post.likedBy = [];

        return post;
    } catch (error) {
        console.error(error);
    }
};

export const getLikedPosts = async (handle) => {
    try {
        const snapshot = await get(ref(db, `users/${handle}`));

        if (!snapshot.val()) {
            throw new Error(`User with handle @${handle} does not exist!`);
        }

        const user = snapshot.val();
        if (!user.likedPosts) return [];
        const posts = await Promise.all(Object.keys(user.likedPosts).map(async key => {
            const snapshot = await get(ref(db, `posts/${key}`));
            const post = snapshot.val();

            return {
                ...post,
                createdOn: new Date(post.createdOn),
                id: key,
                likedBy: post.likedBy ? Object.keys(post.likedBy) : [],
            };
        }));

        return posts;
    } catch (error) {
        console.error(error);
    }
};

export const getPostsByCategoryId = async (categoryId) => {
    try {
        const snapshot = await get(query(ref(db, 'posts'), orderByChild('categoryId'), equalTo(categoryId)));

        if (!snapshot.exists()) {
            return [];
        }

        return fromPostsDocument(snapshot);
    } catch (error) {
        console.error(error);
    }
};

export const getPostsByAuthor = async (handle) => {
    try {
        const snapshot = await get(query(ref(db, 'Posts'), orderByChild('author'), equalTo(handle)));

        if (!snapshot.exists()) {
            return [];
        }

        return fromPostsDocument(snapshot);
    } catch (error) {
        console.error(error);
    }
};

export const getAllPosts = async () => {
    try {
        const snapshot = await get(ref(db, 'posts'));

        if (!snapshot.exists()) {
            return [];
        }

        return fromPostsDocument(snapshot);
    } catch (error) {
        console.error(error);
    }
};

export const likePost = async (handle, postId) => {
    try {
        const updateLikes = {};
        updateLikes[`/posts/${postId}/likedBy/${handle}`] = true;
        updateLikes[`/users/${handle}/likedPosts/${postId}`] = true;

        return await update(ref(db), updateLikes);
    } catch (error) {
        console.error(error);
    }
};

export const dislikePost = async (handle, postId) => {
    try {
        const updateLikes = {};
        updateLikes[`/posts/${postId}/likedBy/${handle}`] = null;
        updateLikes[`/users/${handle}/likedPosts/${postId}`] = null;

        return await update(ref(db), updateLikes);
    } catch (error) {
        console.error(error);
    }
};