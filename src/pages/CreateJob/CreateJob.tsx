import { InputChangeEventDetail, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import MainMenu from '../../components/MainMenu/MainMenu';
import { useState } from 'react';
import { closeCircleOutline } from 'ionicons/icons';

interface Painter { id: number; name: string }
interface Job { name?: string, number?: number, painters?: Painter }

const CreateJob: React.FC = () => {
  const [newJob, setNewJob] = useState<Job>({});
  const [painters, setPainters] = useState<Painter[]>([]);

  const handleNameChanged = (event: CustomEvent<InputChangeEventDetail>) => {
    setNewJob({ ...newJob, name: event.detail.value ?? '' });
  };

  const handleNumberChange = (event: CustomEvent<InputChangeEventDetail>) => {
    const numValue = event.detail.value ? parseFloat(event.detail.value) : undefined;
    setNewJob({ ...newJob, number: numValue });
  };

  const handlePainterNameChange = (event: CustomEvent<InputChangeEventDetail>, myId: number) => {
    setPainters(painters.map(painter => 
      painter.id === myId ? { ...painter, name: event.detail.value ?? '' } : painter
    ));
  };

  const handleAddPainter = () => {
    // Dummy implementation for adding a painter item
    const newId = painters.length > 0 ? painters[painters.length - 1].id + 1 : 1;
    const newPainter = { id: newId, name: '' };
    setPainters([...painters, newPainter]);
  };

  const handleRemovePainter = (myId: any) => {
    const filteredPainters = painters.filter(painter => painter.id !== myId);
    setPainters(filteredPainters);
  };

  const displayPainters = () => {
    return painters.map(painter => (
      <IonItem key={painter.id}>
        <IonInput
          labelPlacement="floating"
          label='Painter'
          onIonChange={(e) => handlePainterNameChange(e, painter.id)}
        ></IonInput>
        <IonIcon onClick={(e) => handleRemovePainter(painter.id)} slot="end" icon={closeCircleOutline} size="small"></IonIcon>
      </IonItem>
    ));
  };

  return (
    <>
      <MainMenu />
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>CreateJob</IonTitle>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonInput 
              value={newJob.name} 
              placeholder="New Job Name" 
              onIonChange={handleNameChanged}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              value={newJob.number?.toString()}
              type="number"
              placeholder="00000"
              onIonChange={handleNumberChange}
            ></IonInput>
          </IonItem>
            <IonList>
              {displayPainters()}
            </IonList>
          <IonButton onClick={handleAddPainter}>Add Painter</IonButton>
        </IonContent>
      </IonPage>
    </>
  );
};

export default CreateJob;
