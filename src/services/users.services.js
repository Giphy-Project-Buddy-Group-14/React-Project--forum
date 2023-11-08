import { get, set, ref, query, equalTo, orderByChild, update } from 'firebase/database';
import { db } from '../config/firebase-config';

export const fromUsersDocument = (snapshot) => {
  const usersDocument = snapshot.val();

  return Object.keys(usersDocument).map((key) => {
    const post = usersDocument[key];

    return {
      ...post,
      username: key,
      createdOn: new Date(post.createdOn),
    };
  });
};

export const getUserByUsername = (username) => {

  return get(ref(db, `users/${username}`));
};

export const getUserByEmail = (email) => {

  return get(query(ref(db, 'users'), orderByChild('email'), equalTo(email)));
};

export const createUserUsername = (username, uid, email, firstName, lastName) => {

  return set(ref(db, `users/${username}`), {
    firstName,
    lastName,
    username,
    uid,
    email,
    createdOn: Date.now(),
    role: 'user',
    likedPosts: {}
  })
};

export const getUserData = (uid) => {

  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};

export const getAllUsers = () => {
  return get(ref(db, "users")).then((snapshot) => {
    if (!snapshot.exists()) {
      return [];
    }

    return fromUsersDocument(snapshot);
  });
};

export const updateProfileEmail = async (email, currentUser) => {
  const updateEmail = {};
  updateEmail[`/users/${currentUser}/email`] = email;

  return update(ref(db), updateEmail);
};

export const makeAdminUser = (username) => {
  const updateAdminStatus = {};

  updateAdminStatus[`/users/${username}/role`] = "admin";

  return update(ref(db), updateAdminStatus);
};

export const removeAdminUser = (username) => {
  const updateAdminStatus = {};

  updateAdminStatus[`/users/${username}/role`] = "user";

  return update(ref(db), updateAdminStatus);
};

export const blockUser = (username) => {
  const updateBlockedStatus = {};

  updateBlockedStatus[`/users/${username}/isBlocked`] = true;

  return update(ref(db), updateBlockedStatus);
};

export const unblockUser = (username) => {
  const updateBlockedStatus = {};

  updateBlockedStatus[`/users/${username}/isBlocked`] = false;

  return update(ref(db), updateBlockedStatus);
};