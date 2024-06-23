import React, { useEffect, useState } from "react";
import { IonList, IonItem, IonLabel, IonSearchbar } from "@ionic/react";
import { subscribeToJobs } from "../../firebase/controller";
import { Job } from "../../interfaces/interface";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setCurrentJob, clearCurrentJob } from '../../jobSlice';
import { useHistory } from 'react-router-dom';

const DisplayJobs: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const currentJob = useSelector((state: RootState) => state.currentJob.currentJob);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = subscribeToJobs(
      (jobsList) => {
        setJobs(jobsList);
        setLoading(false);
      },
      (errMessage) => {
        setError(errMessage);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const myFilteredJobs = jobs.filter((job) => {
      if (!job.name) return false;
      if (!job.number) return false;
      
      // Check name and number
      const nameMatched = job.name.toLowerCase().includes(searchTerm.toLowerCase());
      const numberMatched = job.number.toString().toLowerCase().includes(searchTerm.toLowerCase());

      // Check paint colors
      const paintColorsMatched = job.paintColors?.some(paintColor => 
        paintColor.color.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return nameMatched || numberMatched || paintColorsMatched;
    });
    setFilteredJobs(myFilteredJobs);
  }, [searchTerm, jobs]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleClicked = (myJob:Job) => {
    console.log(myJob)
    dispatch(setCurrentJob(myJob))
    history.push('/viewJob');
  }

  const renderJobCard = (job: Job) => (
    <IonItem key={job.id} onClick={(e) => handleClicked(job)}>
      <IonLabel>
        <h3>{`${job.name}`}</h3>
        <p>{`Job # ${job.number}`}</p>
      </IonLabel>
    </IonItem>
  );

  const handleUserInput = (e: CustomEvent) => {
    setSearchTerm(e.detail.value);
  };

  return (
    <>
      <IonSearchbar
        show-clear-button="always"
        value={searchTerm}
        placeholder="Search by Name, Number, or Color"
        onIonInput={(e) => handleUserInput(e)}
      ></IonSearchbar>
      <IonList>
        {filteredJobs.length > 0 ? (
          filteredJobs.map(renderJobCard)
        ) : (
          <div>No jobs available</div>
        )}
      </IonList>
    </>
  );
};

export default DisplayJobs;
