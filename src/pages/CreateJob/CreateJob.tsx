import { InputChangeEventDetail, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import MainMenu from '../../components/MainMenu/MainMenu';
import { useState } from 'react';
import { closeCircleOutline } from 'ionicons/icons';
import './CreateJob.css'
import { createJob, fetchAllJobs } from '../../firebase/controller';
import { Job } from '../../interfaces/interface'

const CreateJob: React.FC = () => {
  const [newJob, setNewJob] = useState<Job>({});
  const myColorInfo = [ 'name', 'pantone','brand','type','finish']
  
  // *********************** PAINTERS ***********************
  const handleNameChanged = (event: CustomEvent<InputChangeEventDetail>) => {
    setNewJob({ ...newJob, name: event.detail.value ?? '' });
  };
  const handleNumberChange = (event: CustomEvent<InputChangeEventDetail>) => {
    const numValue = event.detail.value ? parseFloat(event.detail.value) : undefined;
    setNewJob({ ...newJob, number: numValue });
  };
  const handlePainterNameChange = (event: CustomEvent<InputChangeEventDetail>, myId: number) => {
    if (newJob.painters) {
      const updatedPainters = newJob.painters.map(painter =>
        painter.id === myId ? { ...painter, name: event.detail.value ?? '' } : painter
      );
      setNewJob({ ...newJob, painters: updatedPainters });
    }
  };
  const handleAddPainter = () => {
    const newId = newJob.painters && newJob.painters.length > 0 
                 ? newJob.painters[newJob.painters.length - 1].id + 1
                 : 1;
    const newPainter = { id: newId, name: '' };
    setNewJob({ ...newJob, painters: [...(newJob.painters || []), newPainter] });
  };
  const handleRemovePainter = (myId: number) => {
    const filteredPainters = newJob.painters?.filter(painter => painter.id !== myId) || [];
    setNewJob({ ...newJob, painters: filteredPainters });
  };

  // *********************** NOTES ***********************
  const handleAddNote = () => {
    const newId = newJob.notes && newJob.notes.length > 0 
                  ? newJob.notes[newJob.notes.length - 1].id + 1
                  : 1;
    const newNote = { id: newId, note: '', title:'' };
    setNewJob({ ...newJob, notes: [...(newJob.notes || []), newNote] });
  };
  const handleRemoveNote = (myId: number) => {
    const filteredNotes = newJob.notes?.filter(note => note.id !== myId) || [];
    setNewJob({ ...newJob, notes: filteredNotes });
  };
  const handleNoteChange = (event: CustomEvent<InputChangeEventDetail>, myId: number) => {
    if (newJob.notes) {
      const updatedNotes = newJob.notes.map(note =>
        note.id === myId ? { ...note, note: event.detail.value ?? '' } : note
      );
      setNewJob({ ...newJob, notes: updatedNotes });
    }
  };

  // *********************** PAINT COLORS ***********************
  const handleAddPaintColor = () => {
    const newId = newJob.paintColors && newJob.paintColors.length > 0 
                  ? newJob.paintColors[newJob.paintColors.length - 1].id + 1
                  : 1;
    const newPaintColor = { id: newId, name: '', pantone: '', brand: '', type: '', finish: '' };
    setNewJob({ ...newJob, paintColors: [...(newJob.paintColors || []), newPaintColor] });
  };
  const handleRemovePaintColor = (myId: number) => {
    const filteredPaintColors = newJob.paintColors?.filter(paintColor => paintColor.id !== myId) || [];
    setNewJob({ ...newJob, paintColors: filteredPaintColors });
  };
const handlePaintColorChange = (event: CustomEvent<InputChangeEventDetail>, myId: number, myValue: string) => {
  if (newJob.paintColors) {
    const updatedPaintColors = newJob.paintColors.map(paintColor =>
      paintColor.id === myId ? { ...paintColor, [myValue]: event.detail.value ?? '' } : paintColor
    );
    setNewJob({ ...newJob, paintColors: updatedPaintColors });
  }
};

  // *********************** DISPLAYS ***********************
  const displayPainters = () => {
    return newJob.painters?.map(painter => (
      <IonList key={painter.id}>
        <div className='flex'>
          <IonInput
            placeholder='Enter Painter Name'
            onIonInput={(e) => handlePainterNameChange(e, painter.id)}
          ></IonInput>
          <IonIcon onClick={() => handleRemovePainter(painter.id)} slot="end" icon={closeCircleOutline} size="small"></IonIcon>
        </div>
      </IonList>
    )) || [];
  };

  const displayNotes = () => {
    return newJob.notes?.map(note => (
      <IonList key={note.id}>
        <div className='flex'>
          <IonTextarea
            placeholder='Enter Note Here'
            onIonInput={(e) => handleNoteChange(e, note.id)}
            autoGrow={true}
          ></IonTextarea >
          <IonIcon onClick={() => handleRemoveNote(note.id)} slot="end" icon={closeCircleOutline} size="small"></IonIcon>
        </div>
      </IonList>
    )) || [];
  };

  const displayPaintColors = () => {
    return newJob.paintColors?.map(paintColor => (
      <div className='paintContainer' key={paintColor.id}>
        {myColorInfo.map((colorAttribute) => (
          <IonInput
            class='customBox'
            key={colorAttribute}
            label={`${colorAttribute.charAt(0).toUpperCase() + colorAttribute.slice(1)}:`}
            placeholder={`Enter ${colorAttribute.charAt(0).toUpperCase() + colorAttribute.slice(1)} Here`}
            onIonInput={(e) => handlePaintColorChange(e, paintColor.id, colorAttribute)}
            ></IonInput>
            ))}
          <IonIcon className='removeMe' onClick={() => handleRemovePaintColor(paintColor.id)} slot="end" icon={closeCircleOutline} size="small"></IonIcon>
      </div>
    )) || [];
  };

  const handleAddImage = () => {
    console.log('add an image')
  }

  const handleCreateJob = async (myJob: Job) => {
    try {
      await createJob( myJob );
      console.log('Job updated successfully.');
    } catch (error) {
      console.error('Error updating job:', error);
    }
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
          <div>
            <h3>Job Information</h3>
          </div>
          <IonList>
            <IonInput 
              value={newJob.name}
              label='Job Name:'
              placeholder='Enter Job Name'
              onIonInput={handleNameChanged}
            ></IonInput>
            <IonInput
              value={newJob.number?.toString()}
              type="number"
              label='Job #:'
              placeholder='Enter Job #'
              onIonInput={handleNumberChange}
            ></IonInput>
          </IonList>
          {newJob.paintColors && newJob.paintColors.length > 0 && (
            <div>
              <h3>Paint Colors</h3>
              {displayPaintColors()}
            </div>
          )}
          {newJob.notes && newJob.notes.length > 0 &&
            <div>
              <h3>Notes</h3>
              {displayNotes()}
            </div>
          }
          {newJob.painters && newJob.painters.length > 0 && (
            <div>
              <h3>Painters</h3>
              {displayPainters()}
            </div>
          )}
        </IonContent>
        <IonFooter className='flex'>
          <IonButton onClick={handleAddPainter}>Add Painter</IonButton>
          <IonButton onClick={handleAddNote}>Add Note</IonButton>
          <IonButton onClick={handleAddPaintColor}>Add Color</IonButton>
          <IonButton onClick={handleAddImage}>Add Image</IonButton>
          <IonButton onClick={() => handleCreateJob(newJob)}>Create Job</IonButton>
        </IonFooter>
      </IonPage>
    </>
  );
};

export default CreateJob;
