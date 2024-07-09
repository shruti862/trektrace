import { db } from "../../firebase";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

//add
export async function addUser(newUser) {
  const data = await addDoc(collection(db, "users"), newUser);
  return data;
}

//update
export async function updateUser(id, updatedUser) {
  const userDoc = doc(db, "users", id);
  return await updateDoc(userDoc, updatedUser);
}

//delete
export async function deleteUser(id) {
  const userDoc = doc(db, "users", id);
  return deleteDoc(userDoc);
}

export async function getAllUser() {
  return await getDocs(collection(db, "users"));
}
export async function getUser(id) {
  const userDoc = doc(db, "users", id);
  const userSnapshot = await getDoc(userDoc);
  if (userSnapshot.exists()) {
    return userSnapshot.data();
  } else {
    throw new Error("No such user!");
  }
}
export async function getUserByEmail(email) {
  try {
    const userCollection = collection(db, "users");
    const q = query(userCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return { id: userDoc.id, ...userDoc.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting user by email:", error);
    throw error;
  }
}
