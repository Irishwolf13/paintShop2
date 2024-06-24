import { InputChangeEventDetail, IonButton, IonButtons, IonContent, IonDatetime, IonDatetimeButton, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonModal, IonPage, IonTextarea, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import MainMenu from '../../components/MainMenu/MainMenu';
import { useState } from 'react';
import { closeCircleOutline } from 'ionicons/icons';
import { createJob, uploadImage } from '../../firebase/controller';
import { Job } from '../../interfaces/interface'
import './CreateJob.css'

const CreateJob: React.FC = () => {
  const [newJob, setNewJob] = useState<Job>({});
  const myColorInfo = [ 'color', 'brand','line','finish','type', 'orderForm']

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [uploadVisible, setUploadVisible] = useState<boolean>(false);

  const user = {uid: '12'}

  
  //////////////////////////// HANDLE PAINTERS //////////////////////////// 
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

  const handleAddImages = (urls: string[]) => {
    setNewJob(prevNewJob => {
      const currentImages = prevNewJob.images || [];
      const newImages = urls.map((url) => ({
        url
      }));
      return { ...prevNewJob, images: [...currentImages, ...newImages] };
    });
  };

  const handleRemoveImage = (index: number) => {
    console.log('iran')
    console.log(index)
    const filteredImages = newJob.images?.filter((_, imgIndex) => imgIndex !== index) || [];
    setNewJob({ ...newJob, images: filteredImages });
  };

  //////////////////////////// HANDLE NOTES //////////////////////////// 
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

  //////////////////////////// HANDLE PAINT COLORS //////////////////////////// 
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

  //////////////////////////// DISPLAYS //////////////////////////// 
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
            class='paddingLeft'
            label='Title:'
            placeholder='Enter Note Title'
            onIonInput={(e) => handleNoteTitleChange(e, note.id)}
          ></IonInput>
          <IonIcon onClick={() => handleRemoveNote(note.id)} slot="end" icon={closeCircleOutline} size="small"></IonIcon>
        </div>
        <IonTextarea
          class='paddingLeft'
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
      brand: 'Sherwin, Ben Moore, etc.',
      line: 'Emerald, Regal Select, etc.',
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

  //////////////////////////// Creating Stuff //////////////////////////// 
  const handleCreateJob = async (myJob: Job) => {
    try {
      if (!myJob.date) myJob.date = new Date().toISOString(); // Checks if date is valid if not, sets to today's date

      await createJob(myJob);
      console.log('Job updated successfully.');
    } catch (error) {
      console.error('Error updating job:', error);
    }
    setNewJob({});
    resetImageInput();
  };

  //////////////////////////// MODALS //////////////////////////// 
  const [isOpen, setIsOpen] = useState(false);
  const onDateSelected = (event:any) => {
    handleDateChanged(event)
    setIsOpen(false);
  };


  //////////////////////////// Dealing with Image Files ////////////////////////////
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validTypes = ['image/jpeg', 'image/png', 'image/gif, application/pdf'];

      if (!validTypes.includes(file.type)) {
        setError("Invalid file type. Only JPG, PNG, GIF and PDF are allowed.");
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) {
      setError("Only JPG, PNG, GIF and PDF are allowed");
      return;
    }

    try {
      setUploadVisible(true)
      const url = await uploadImage(user.uid, selectedFile);
      if (url) {
        handleAddImages([url]);
        setUploadVisible(false);
        setToastVisible(true);
        resetImageInput();
        setError(``);
      } else {
        throw new Error("Failed to upload image. URL is null.");
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
      setError(`Error uploading image`);
    }
  };

  const renderImages = (images:any) => {
    return images.map((image:any, index:number) => (
      <div key={index} className='imageContainer'>
        <img className='displayThumb' src={image.url} alt={`uploaded-${index}`} />
        <button className='removeButton' onClick={() => handleRemoveImage(index)}>x</button>
      </div>
    ));
  }
  const resetImageInput = () => {
    // Clears out the file input so it's blank again
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
    setSelectedFile(null);
  }

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
          <div>
            <h2>Upload Image or PDF</h2>
            {newJob?.images && (
              <div className='mainImageContainer'>
                {renderImages(newJob.images)}
              </div>
            )}
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              accept="image/jpeg, image/png, image/gif, image/pdf, image/jpg"  
            />
            <IonButton onClick={handleUpload}>Upload</IonButton>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>

          <IonModal keepContentsMounted={true} isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
            <IonDatetime id="datetime" presentation="date" onIonChange={onDateSelected}></IonDatetime>
          </IonModal>
          <IonToast
            className='toastyTrying'
            isOpen={uploadVisible}
            onDidDismiss={() => setUploadVisible(false)}
            message={`Uploading Image...`}
          />
          <IonToast
            className='toastySuccess'
            isOpen={toastVisible}
            onDidDismiss={() => setToastVisible(false)}
            onClick={() => setToastVisible(false)}
            message={`Image uploaded successfully!`}
            duration={3000}
          />
        </IonContent>
        <IonFooter className='flex'>
          <IonButton onClick={handleAddNote}>Add Note</IonButton>
          <IonButton onClick={handleAddPaintColor}>Add Color</IonButton>
          <IonButton onClick={handleAddPainter}>Add Painter</IonButton>
          <IonButton onClick={() => handleCreateJob(newJob)}>Create Job</IonButton>
        </IonFooter>
      </IonPage>
    </>
  );
};

export default CreateJob;
