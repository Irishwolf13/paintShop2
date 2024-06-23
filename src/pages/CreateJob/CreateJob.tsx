import { InputChangeEventDetail, IonButton, IonButtons, IonContent, IonDatetime, IonDatetimeButton, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonModal, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import MainMenu from '../../components/MainMenu/MainMenu';
import { useState } from 'react';
import { closeCircleOutline } from 'ionicons/icons';
import { createJob } from '../../firebase/controller';
import { Job } from '../../interfaces/interface'
import './CreateJob.css'

const CreateJob: React.FC = () => {
  const [newJob, setNewJob] = useState<Job>({});
  const myColorInfo = [ 'color', 'brand','line','finish','type', 'orderForm']
  
  // *********************** PAINTERS ***********************
  const handleNameChanged = (event: CustomEvent<InputChangeEventDetail>) => {
    setNewJob({ ...newJob, name: event.detail.value ?? '' });
  };
  const handleNumberChange = (event: CustomEvent<InputChangeEventDetail>) => {
    const numValue = event.detail.value ? parseFloat(event.detail.value) : undefined;
    setNewJob({ ...newJob, number: numValue });
  };
  const handleDateChanged = (event: CustomEvent<InputChangeEventDetail>) => {
    setNewJob({ ...newJob, date: event.detail.value ?? '' });
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
  const handleNoteTitleChange = (event: CustomEvent<InputChangeEventDetail>, myId: number) => {
    if (newJob.notes) {
      const updatedNotes = newJob.notes.map(note =>
        note.id === myId ? { ...note, title: event.detail.value ?? '' } : note
      );
      setNewJob({ ...newJob, notes: updatedNotes });
    }
  };

  // *********************** PAINT COLORS ***********************
  const handleAddPaintColor = () => {
    const newId = newJob.paintColors && newJob.paintColors.length > 0 
                  ? newJob.paintColors[newJob.paintColors.length - 1].id + 1
                  : 1;
    const newPaintColor = { id: newId, color: '', brand: '', line: '', finish: '', type: '', orderForm: '' };
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
      <div className='paintContainer' key={note.id}>
      <IonList>
        <div className='flex'>
          <IonInput
            class='frank'
            label='Title:'
            placeholder='Enter Note Title'
            onIonInput={(e) => handleNoteTitleChange(e, note.id)}
          ></IonInput>
          <IonIcon onClick={() => handleRemoveNote(note.id)} slot="end" icon={closeCircleOutline} size="small"></IonIcon>
        </div>
        <IonTextarea
          class='frank'
          placeholder='Enter Note Here'
          onIonInput={(e) => handleNoteChange(e, note.id)}
          autoGrow={true}
        ></IonTextarea >
      </IonList>
      </div>
    )) || [];
  };

  const displayPaintColors = () => {
    // Define a mapping for colorAttribute to custom labels
    const labelMapping: { [key: string]: string } = {
      color: 'Enter Pantone Color',
      brand: 'Sherwin, Behr, etc.',
      line: 'Emerald, Living Well, etc.',
      finish: 'Eggshell, Satin, etc.',
      type: 'Indoor, Outdoor, etc.',
      orderForm: 'www.example.com'
    };
  
    return newJob.paintColors?.map(paintColor => (
      <div className='paintContainer' key={paintColor.id}>
        {myColorInfo.map((colorAttribute) => (
          <IonInput
            class='customBox'
            key={colorAttribute}
            label={`${colorAttribute.charAt(0).toUpperCase() + colorAttribute.slice(1)}:`}
            placeholder={`${labelMapping[colorAttribute] || colorAttribute}`}
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
      if (!myJob.date) myJob.date = new Date().toISOString(); // Checks if date is valid if not, sets to today's date

      await createJob(myJob);
      console.log('Job updated successfully.');
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };
  
  const [isOpen, setIsOpen] = useState(false);
  const onDateSelected = (event:any) => {
    handleDateChanged(event)
    setIsOpen(false); // Close the modal
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
          <IonList lines="none">
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
            <IonItem className='noPadding'>
              <p>Date:</p>
              <IonDatetimeButton datetime="datetime" onClick={() => setIsOpen(true)}></IonDatetimeButton>  
            </IonItem>
          </IonList>
          {newJob.notes && newJob.notes.length > 0 &&
            <div>
              <h3>Notes</h3>
              {displayNotes()}
            </div>
          }
          {newJob.paintColors && newJob.paintColors.length > 0 && (
            <div>
              <h3>Paint Colors</h3>
              {displayPaintColors()}
            </div>
          )}
          {newJob.painters && newJob.painters.length > 0 && (
            <div>
              <h3>Painters</h3>
              {displayPainters()}
            </div>
          )}
          <IonModal keepContentsMounted={true} isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
            <IonDatetime id="datetime" presentation="date" onIonChange={onDateSelected}></IonDatetime>
          </IonModal>
        </IonContent>
        <IonFooter className='flex'>
          <IonButton onClick={handleAddNote}>Add Note</IonButton>
          <IonButton onClick={handleAddPaintColor}>Add Color</IonButton>
          <IonButton onClick={handleAddImage}>Add Image</IonButton>
          <IonButton onClick={handleAddPainter}>Add Painter</IonButton>
          <IonButton onClick={() => handleCreateJob(newJob)}>Create Job</IonButton>
        </IonFooter>
      </IonPage>
    </>
  );
};

export default CreateJob;
