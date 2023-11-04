import { get, set, ref, query, equalTo, orderByChild } from 'firebase/database';
import { db } from '../config/firebase-config';

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
    likedPosts: {}
  })
};

export const getUserData = (uid) => {

  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};