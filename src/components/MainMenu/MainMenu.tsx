// src/components/MainMenu.tsx
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Since ContainerProps is empty, it can be omitted
const MainMenu: React.FC = () => {
  const history = useHistory();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      history.push('/login'); // Redirect to login after successful logout
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

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
        <IonMenuToggle>
          {currentUser ? (
            <>
              <IonButton onClick={() => history.push('/')}>Home</IonButton>
              <IonButton onClick={() => history.push('/createJob')}>Create Job</IonButton>
              <IonButton color="danger" onClick={handleLogout}>Logout</IonButton> 
            </>
          ) : (
            // Ensure no inline comment breaks the code
            <IonButton onClick={() => history.push('/login')}>Login</IonButton>
          )}
        </IonMenuToggle>
      </IonContent>
    </IonMenu>
  );
};

export default MainMenu;
