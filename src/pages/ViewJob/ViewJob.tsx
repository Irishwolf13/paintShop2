import { IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const View: React.FC = () => {
  const currentJob = useSelector((state: RootState) => state.currentJob.currentJob);

  return (
    <>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle>{currentJob ? currentJob.name : 'No Job Selected'}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {currentJob ? (
            <div>{`Job # ${currentJob.number}`}</div>
          ) : (
            <p>None</p>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default View;