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
    createdOn: new Date(),
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

export const makeAdminUser = (handle) => {
  const updateAdminStatus = {};

  updateAdminStatus[`/users/${handle}/role`] = "admin";

  return update(ref(db), updateAdminStatus);
};