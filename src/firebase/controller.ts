import { getFirestore, collection, doc, getDoc, setDoc, deleteDoc, addDoc, QuerySnapshot, onSnapshot, getDocs, where, updateDoc, deleteField, arrayUnion, arrayRemove } from "firebase/firestore";
import { app, db, imageDB } from "./config";
import { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { Job } from '../interfaces/interface'

export const auth = getAuth(app);
export const firestore = getFirestore(app);

//////////////////////////////////////////////////////////////// FIREBASE FUNCTIONS //////////////////////////////////////////
export const createJob = async (myJob: Job) => {
  try {
    const jobsCollectionRef = collection(firestore, "jobs");
    const docRef = await addDoc(jobsCollectionRef, myJob);
    console.log("Document successfully created");
    // return docRef.id; // return the id of the newly created document
  } catch (error) {
    console.error("Error adding document: ", error);
    throw new Error("Could not create job");
  }
};
 // Fetch a job by ID
export const fetchJob = async (jobId: string): Promise<Job | null> => {
  try {
    const jobDocRef = doc(firestore, "jobs", jobId);
    const jobDoc = await getDoc(jobDocRef);

    if (jobDoc.exists()) {
      return jobDoc.data() as Job;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document: ", error);
    throw new Error("Could not fetch job");
  }
};

// Fetch all jobs
export const fetchAllJobs = async (): Promise<Job[]> => {
  try {
    const jobsCollectionRef = collection(firestore, "jobs");
    const jobsSnapshot = await getDocs(jobsCollectionRef);
    const jobsList = jobsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Job[];
    
    console.log("All jobs fetched successfully");
    return jobsList;
  } catch (error) {
    console.error("Error fetching documents: ", error);
    throw new Error("Could not fetch jobs");
  }
};

// Update a job by ID
export const updateJob = async (jobId: string, updatedData: Partial<Job>) => {
  try {
    const jobDocRef = doc(firestore, "jobs", jobId);
    await updateDoc(jobDocRef, updatedData);
    console.log("Document successfully updated");
  } catch (error) {
    console.error("Error updating document: ", error);
    throw new Error("Could not update job");
  }
};

// Delete a job by ID
export const deleteJob = async (jobId: string) => {
  try {
    const jobDocRef = doc(firestore, "jobs", jobId);
    await deleteDoc(jobDocRef);
    console.log("Document successfully deleted");
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw new Error("Could not delete job");
  }
};





export const subscribeToJobs = (callback: (jobs: Job[]) => void, onError: (error: string) => void) => {
  try {
    const jobsCollectionRef = collection(firestore, "jobs");
    return onSnapshot(
      jobsCollectionRef,
      (snapshot: QuerySnapshot) => {
        const jobsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Job[];
        callback(jobsList);
      },
      (error) => {
        console.error("Error with real-time listener: ", error);
        onError("Could not fetch jobs in real-time");
      }
    );
  } catch (error) {
    console.error("Error setting up real-time listener: ", error);
    throw new Error("Could not set up real-time listener");
  }
};