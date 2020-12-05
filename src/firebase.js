import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCDl63kh_MfjpMfb4WkBIBBJE_Ca92A6Zw",
  authDomain: "mikee-randomizer.firebaseapp.com",
  databaseURL: "https://mikee-randomizer-default-rtdb.firebaseio.com",
  projectId: "mikee-randomizer",
  storageBucket: "mikee-randomizer.appspot.com",
  messagingSenderId: "795362943856",
  appId: "1:795362943856:web:19a80a8e4da3ba3e8ce5b5",
  measurementId: "G-Y9P20CR8CR",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const join = (roomId, { id, name, secretCode }) => {
  firebase.database().ref(`room/${roomId}/${id}`).set({
    id: id,
    name: name,
    secretCode: secretCode,
    hasPicked: false,
    isTaken: false,
    picked: "",
  });
};

const remove = (roomId, id) => {
  firebase.database().ref(`room/${roomId}/${id}`).remove();
};

const update = (roomId, member, pickedMember) => {
  const updates = {};
  updates[`/room/${roomId}/${member.id}`] = member;
  updates[`/room/${roomId}/${pickedMember.id}`] = pickedMember;

  return firebase.database().ref().update(updates);
};

export default database;
export { join, remove, update };
