import { getFirestore, collection, doc, getDoc, setDoc, deleteDoc, addDoc, query, onSnapshot, getDocs, where, updateDoc, deleteField, arrayUnion, arrayRemove } from "firebase/firestore";
import { app, db, imageDB } from "./config";
import { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { Job } from '../interfaces/interface'

export const auth = getAuth(app);
export const firestore = getFirestore(app);

//////////////////////////////////////////////////////////////// FIREBASE FUNCTIONS //////////////////////////////////////////
export const createFireBaseJob = async (myJob: Job) => {
  try {
    const jobsCollectionRef = collection(firestore, "jobs");
    const docRef = await addDoc(jobsCollectionRef, myJob);
    console.log("Document successfully created");
    return docRef.id; // Return the newly created document ID
  } catch (error) {
    console.error("Error adding document: ", error);
    throw new Error("Could not create job");
  }
};
