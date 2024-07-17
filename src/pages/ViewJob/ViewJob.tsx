import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import './ViewJob.css'

const View: React.FC = () => {
  const currentJob = useSelector((state: RootState) => state.currentJob.currentJob);

  // Function to get the month name and year from a date string
  const getMonthAndYear = (dateString?: string): string => {
    if (!dateString) {
      return "Invalid Date";
    }

    const date = new Date(dateString);
    const monthIndex = date.getMonth(); // Get the month index (0-11)
    const year = date.getFullYear(); // Get the full year (e.g., 2024)

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    return `${monthNames[monthIndex]} ${year}`;
  };

  const renderImages = () => {
    return (currentJob && currentJob.images && currentJob.images.length > 0) ? (
      <div>
        <h3>Images</h3>
        <div className="image-gallery">
          {currentJob.images.map((image: { url: string }, index: number) => (
            <a key={index} href={image.url} target="_blank" rel="noopener noreferrer">
              <img src={image.url} alt={`Job Image ${index}`} className="thumbImage" />
            </a>
          ))}
        </div>
      </div>
    ) : null;
  };

  const renderPaintColors = () => {
    return (currentJob && currentJob.paintColors && currentJob.paintColors.length > 0) ? (
      <div>
        <h3>Paint Colors</h3>
        {currentJob.paintColors.map((color, index: number) => (
          <IonItem className="marginBottom" key={index} >

          <IonList className="paint-color-item">
            <div className="paint-color-detail">
              <span className="paint-color-label">Color:</span> 
              <span className="marginLeft">{color.color}</span>
            </div>
            <div className="paint-color-detail">
              <span className="paint-color-label">Brand:</span> 
              <span className="marginLeft">{color.brand}</span>
            </div>
            <div className="paint-color-detail">
              <span className="paint-color-label">Line:</span> 
              <span className="marginLeft">{color.line}</span>
            </div>
            <div className="paint-color-detail">
              <span className="paint-color-label">Finish:</span> 
              <span className="marginLeft">{color.finish}</span>
            </div>
            <div className="paint-color-detail">
              <span className="paint-color-label">Type:</span> 
              <span className="marginLeft">{color.type}</span>
            </div>
            <div className="paint-color-detail">
              <span className="paint-color-label">Order From:</span> 
              <span className="marginLeft">{color.orderForm}</span>
            </div>
          </IonList>
          </IonItem>
        ))}
      </div>
    ) : null;
  };

  const renderNotes = () => {
    return (currentJob && currentJob.notes && currentJob.notes.length > 0) ? (
      <div>
        <h3>Notes</h3>
        {currentJob.notes.map((note, index) => (
          <IonItem key={index}>
            <div>
              {note.title && <p className="noteTitle">{`${note.title}:`}</p>}
              <p className="noteBody">
                {note.note.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </div>
          </IonItem>
        ))}
      </div>
    ) : null;
  }

  return (
    <>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle>{currentJob ? currentJob.name : "No Job Selected"}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {currentJob ? (
            <>
              <div>{`Job # ${currentJob.number}`}</div>
              {`Date: ${getMonthAndYear(currentJob.date)}`}
              {renderPaintColors()}
              {renderNotes()}
              {renderImages()}
            </>
          ) : (
            <p>None</p>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default View;
