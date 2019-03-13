import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage'

import firebaseConfig from './firebaseConfig';

class Api {
  base = null;
  postsRef = null;
  usersRef = null;
  storageRef = null;
  categoriessRef = null;

  constructor(config) {
    this.initFireBase(config);
  };

  initFireBase(config) {
    this.base = firebase.initializeApp(config);
    this.dataBaseRef = this.base.database().ref();
    this.storageRef = this.base.storage().ref();
    this.usersRef = this.dataBaseRef.child('users');
    this.categoriesRef = this.dataBaseRef.child('categories');
    this.postsRef = this.dataBaseRef.child('posts');
    this.storage = firebase.storage();
  };

  /* methods to create && get user */

  signUp({ email, password, userName, birthDate }) {
    return new Promise((resolve, reject) => {
      this.base.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
          this.pushItem(this.postsRef)
            .then(key => {
              return {
                user: res.user,
                userKey: key.key,
              };
            })
            .then(res => {
              const dataObj = {
                userKey: res.userKey,
                uid: res.user.uid,
                userName: userName,
                birthDate: birthDate,
                email: email,
              };
              this.dataBaseRef.child(`users/${res.userKey}`).set(dataObj);
              return dataObj;
            })
            .then(dataObj => {
              resolve(dataObj)
            })
            .catch(err => {
              reject(err)
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  signIn({ email, password }) {
    return new Promise((resolve, reject) => {
      this.base.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
          return this.getUser(res.user.uid);
        })
        .then(res => {
          const userData = res.val()[Object.keys(res.val())[0]];
          resolve(userData);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  getUser(uid) {
    const query = this.usersRef.orderByChild('uid').equalTo(uid);
    return query.once('value');
  };

  pushItem(ref) {
    return ref.push();
  };

  /* methods create && updae post */
  createPost(data) {
    const { category, title, file, content, id, creator } = data;
    return new Promise((resolve, reject) => {
      this.storageRef.child(`images/${id}`).put(file)
        .then(() => {
          return this.storageRef.child(`images/${id}`).getDownloadURL();
        })
        .then((url) => {
          return {
            key: this.pushItem(this.postsRef).key,
            url: url,
          };
        })
        .then(({ key, url }) => {
          const dataObj = {
            postKey: key,
            category: category,
            title: title,
            content: content,
            id: id,
            imagePath: url,
            creator: creator,
          };
          this.dataBaseRef.child(`posts/${key}`).set(dataObj);
          return dataObj;
        })
        .then((res) => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  updatePost(data) {
    const { category, title, content, postKey } = data;
    return this.dataBaseRef.child(`posts/${postKey}`).update({
      category: category,
      title: title,
      content: content,
    })
      .then(() => {
        return Promise.resolve(data)
      })
      .catch((err) => {
        return Promise.reject(err)
      });
  };

  /* methods for get && create categories */

  getCategories() {
    const query = this.categoriesRef;
    return query.once('value')
      .then(res => {
        return Promise.resolve(res.val());
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };

  createCategory(category) {
    return this.pushItem(this.categoriesRef)
      .then(res => {
        this.dataBaseRef.child(`categories/${res.key}`).set(category);
      })
      .then(() => {
        return Promise.resolve();
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }

  /* method for fetch posts*/

  getPosts() {
    const query = this.postsRef;
    return query.once('value')
      .then(res => {
        return Promise.resolve(res.val());
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
};

const API = new Api(firebaseConfig);

export default API;
