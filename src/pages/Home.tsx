import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import MainMenu from '../components/MainMenu/MainMenu';
import './Home.css';

const Home: React.FC = () => {
  return (
    <>
      <MainMenu />
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Home</IonTitle> {/* Added "Home" title */}
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          Main Page Info
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
