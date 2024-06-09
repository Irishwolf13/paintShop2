import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonTitle, IonToolbar } from "@ionic/react";

interface ContainerProps { }

const MainMenu: React.FC<ContainerProps> = () => {
    return (
      <IonMenu side="start" contentId="main-content" swipeGesture={false}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Main Menu</IonTitle>
            <IonButtons slot="start">
              <IonMenuButton>
            </IonMenuButton>
          </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          This is the menu content.
        </IonContent>
      </IonMenu>
    );
  };

export default MainMenu;
