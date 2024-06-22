import { IonButton, IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonMenuToggle, IonTitle, IonToolbar } from "@ionic/react";
import { useHistory } from 'react-router-dom';

interface ContainerProps { }

const MainMenu: React.FC<ContainerProps> = () => {
  const history = useHistory();

  return (
    <IonMenu side="start" contentId="main-content" swipeGesture={false}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Main Menu</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Call 'closeMenu' when the button is clicked */}
        <IonMenuToggle>
          <IonButton onClick={() => {history.push('/');}}>Home</IonButton>
          <IonButton onClick={() => {history.push('/createJob')}}>Create Job</IonButton>
        </IonMenuToggle>
      </IonContent>
    </IonMenu>
  );
};

export default MainMenu;
