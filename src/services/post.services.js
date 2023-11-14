import {
  ref,
  push,
  get,
  remove,
  query,
  equalTo,
  orderByChild,
  update,
} from 'firebase/database';
import { db } from '../config/firebase-config';
import { INITIAL_POST_COUNT, INITIAL_LIKES_OBJECT } from '@/helpers/consts';
import { setFileToStorage } from './storage.services.js';

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
    if (content.images) {
      const images = await Promise.all(content.images.map(img => setFileToStorage(img)));
      content.images = images;
    }
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

export const updatePostLike = async (id, username, likedPost) => {
  try {
    const postRef = ref(db, `posts/${id}/likes`);
    const updates = {};
    updates[username] = likedPost;
    await update(postRef, updates);
    const result = await getPostById(id);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getPostLikeByUsername = async (id, username) => {
  try {
    const usernameLikeRef = `posts/${id}/likes/${username}`;
    const result = await get(ref(db, usernameLikeRef));
    return !!result.val();
  } catch (error) {
    console.error(error);
  }
};

export const getLikesCountByPost = async (id) => {
  const post = await getPostById(id);
  const filteredLikes = Object.entries(post.likes)
    .filter(([_username, value]) => value === true)
    .map(([user]) => user);

  return filteredLikes.length;
};

export const getLikes = async (id, username) => {
  try {
    const result = await get(ref(db, `posts/${id}/likes/${username}`));

    if (result.exists()) {
      const postsArray = Object.values(result.val());
      return postsArray;
    }

    return [];
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
    const images = content.images ? await Promise.all(content.images.map(img => setFileToStorage(img))) : null;
    const result = await push(ref(db, 'posts'), {
      ...content,
      author: username,
      createdOn: Date.now(),
      count: INITIAL_POST_COUNT,
      likes: INITIAL_LIKES_OBJECT,
      images,
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
    if (!post.likes) post.likes = {};

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


export const getMostCommentedPosts = async () => {
  try {
    // Reference to the "posts" node in your Firebase Realtime Database
    const postsRef = ref(db, 'posts');

    // Retrieve all posts from the database
    const snapshot = await get(postsRef);

    if (!snapshot.exists()) {
      console.log('No posts found');
      return [];
    }

    const allPosts = snapshot.val();

    // Create an array to hold post objects with comment counts
    const postsWithCommentCounts = [];

    // Calculate comment counts for each post
    for (const postId in allPosts) {
      const post = allPosts[postId];
      const commentCount = post.comments ? Object.keys(post.comments).length : 0;
      postsWithCommentCounts.push({ postId, commentCount, ...post });
    }

    // Sort the posts by comment count in descending order
    postsWithCommentCounts.sort((a, b) => b.commentCount - a.commentCount);

    // Get the top 10 posts with the most comments
    const top10Posts = postsWithCommentCounts.slice(0, 10);

    console.log('Top 10 posts with the most comments:', top10Posts);
    return top10Posts
  } catch (error) {
    console.error('Error fetching top 10 posts:', error);
  }
};

export const getPostsByCategoryId = async (categoryId, sortKey, filters) => {
  const q = query(
    ref(db, 'posts'),
    orderByChild('categoryId'),
    equalTo(categoryId)
  );

  try {
    const snapshot = await get(q);

    if (!snapshot.exists()) {
      return [];
    }

    // Convert snapshot to an array of items
    let items = [];
    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val();
      item.id = childSnapshot.key;
      item.count = childSnapshot.count || 0;
      items.push(item);
    });

    // Filter items based on the given filters
    if (filters && filters.Authors) {

      const authorFilters = filters.Authors.filter((filter) => filter.checked);
      if (authorFilters.length !== 0) {
        items = items.filter((item) => {
          return authorFilters.find(filter => filter.label === item.author);
        });
      }
    }

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

export const getPostsByAuthor = async (username) => {
  try {
    const snapshot = await get(
      query(ref(db, 'posts'), orderByChild('author'), equalTo(username))
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
