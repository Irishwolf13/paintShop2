import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import MainMenu from '../../components/MainMenu/MainMenu';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const View: React.FC = () => {
  const currentJob = useSelector((state: RootState) => state.currentJob.currentJob);

  return (
    <>
      <MainMenu />
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>{currentJob ? (currentJob.name): ('No Job Selected')}</IonTitle>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
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
