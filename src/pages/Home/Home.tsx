import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import MainMenu from '../../components/MainMenu/MainMenu';
// import ActionSheet from '../../components/ActionSheet/ActionSheet';
import './Home.css';

const Home: React.FC = () => {
  // const editMe = () => { console.log('I am Edited') }
  // const saveMe = () => { console.log('I am Saved') }
  // const deleteMe = () => { console.log('I am BaLeted') }

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
        {/* <ActionSheet
          buttonText="Open"
          triggerId="myTrigger"
          popupText='Frank'
          additionalButtons={
            [
              {name: 'Edit', handler: editMe},
              {name:'Save', handler: saveMe},
              {name: 'Delete', handler: deleteMe},
            ]
          }
        /> */}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
