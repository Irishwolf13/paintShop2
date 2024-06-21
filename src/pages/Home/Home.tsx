import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import MainMenu from '../../components/MainMenu/MainMenu';
import DisplayJobs from '../../components/DisplayJobs/DisplayJobs'

const Home: React.FC = () => {

  return (
    <> 
      <MainMenu />
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Home</IonTitle>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
        <DisplayJobs />
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
