import {
  ref,
  push,
  get,
  set,
  remove,
  query,
  equalTo,
  orderByChild,
  update,
  orderByKey,
  orderByValue,
} from 'firebase/database';
import { db } from '../config/firebase-config';
import { INITIAL_POST_COUNT } from '@/helpers/consts';

const fromPostsDocument = async (snapshot) => {
  try {
    const postsDocument = snapshot.val();

    return Object.keys(postsDocument).map((key) => {
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

export const updatePost = async (id, content) => {
  try {
    const postRef = ref(db, `posts/${id}`);
    await update(postRef, {
      ...content,
      updatedOn: Date.now(),
    });
    const result = await getPostById(id);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const incrementPostCount = async (id, currentCount) => {
  try {
    const postRef = ref(db, `posts/${id}`);
    const count = currentCount + 1;
    await update(postRef, {
      count: count,
    });
    return count;
  } catch (error) {
    console.error(error);
  }
};

export const addPost = async (content, username) => {
  try {
    const result = await push(ref(db, 'posts'), {
      ...content,
      author: username,
      createdOn: Date.now(),
      count: INITIAL_POST_COUNT,
    });

    return getPostById(result.key);
  } catch (error) {
    console.error(error);
  }
};

export const getPosts = async () => {
  try {
    const result = await get(ref(db, 'posts'));

    if (result.exists()) {
      const postsArray = Object.values(result.val());
      return postsArray;
    }

    return [];
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

export const deletePostById = async (id) => {
  try {
    await remove(ref(db, `posts/${id}`));
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
    const posts = await Promise.all(
      Object.keys(user.likedPosts).map(async (key) => {
        const snapshot = await get(ref(db, `posts/${key}`));
        const post = snapshot.val();

        return {
          ...post,
          createdOn: new Date(post.createdOn),
          id: key,
          likedBy: post.likedBy ? Object.keys(post.likedBy) : [],
        };
      })
    );

    return posts;
  } catch (error) {
    console.error(error);
  }
};

export const getPostsByCategoryId = async (categoryId, sortKey) => {

  const q = query(ref(db, 'posts'), orderByChild('categoryId'), equalTo(categoryId));

  try {
    const snapshot = await get(q);

    if (!snapshot.exists()) {
      return [];
    }

    // Convert snapshot to an array of items
    const items = [];
    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      items.push(item);
    });

    // Sort items by sortKey
    items.sort((a, b) => {
      const titleA = a[sortKey];
      const titleB = b[sortKey];
      if (titleA < titleB) return -1;
      if (titleA > titleB) return 1;
      return 0;
    });

    return items;

    // return fromPostsDocument(snapshot);
  } catch (error) {
    console.error(error);
  }
};

export const getPostsByAuthor = async (handle) => {
  try {
    const snapshot = await get(
      query(ref(db, 'Posts'), orderByChild('author'), equalTo(handle))
    );

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
