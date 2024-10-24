import "./App.css";
import { useState } from "react";

//this is a typescript command
type Note ={
  id: number;
  title: string;
  content: string;
}

//in react whenever you are working with forms, we need to add a state value for each of the form inputs. 

const App = () =>{
  const [notes, setNotes] = useState<Note[]>([
    {
      id:1,
      title: "note title 1",
      content: "content 1",
    },
    {
      id:2,
      title: "note title 2",
      content: "content 2",
    },
    {
      id:3,
      title: "note title 3",
      content: "content 3",
    },
    {
      id:4,
      title: "note title 4",
      content: "content 4",
    },
    {
      id:5,
      title: "note title 5",
      content: "content 5",
    },

  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
 
 //going to accept a note after the user clicks 
  const handleNoteClick = (note:Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  }

  const handleAddNote = (
    event: React.FormEvent
  ) =>{
    event.preventDefault();
    // console.log("Title: ", title);
    // console.log("Content: ", content);

    //will allow us to add a new note to the UI
    const newNote: Note = {
      id: notes.length + 1,
      title: title, 
      content: content
    }
    
    //this will store the note, it acts via using useState
    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };

  const handleUpdateNote = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if(!selectedNote){
      return;
    }

    const updatedNote: Note = {
      id: selectedNote.id, 
      title: title,
      content: content,
    }

    const updatedNotesList= notes.map((note) => note.id === selectedNote.id ? updatedNote : note)

    setNotes(updatedNotesList)
    setTitle("")
    setContent("")
    setSelectedNote(null);
  };


  const handleCancel = () => {
    setTitle("")
    setContent("")
    setSelectedNote(null);
  }

  const deleteNote = (event: React.MouseEvent, noteId: Number) => {
      event.stopPropagation();

      const updatedNotes = notes.filter((note)=> note.id!== noteId )

      setNotes(updatedNotes);
  }

  return(
  <div className="app-container">
    <form className="note-form" onSubmit={(event) => selectedNote ? handleUpdateNote(event) : handleAddNote(event)}>
      <input value={title} onChange={(event)=>setTitle(event.target.value)} placeholder="title" required></input>
      <textarea value={content} onChange={(event)=>setContent(event.target.value)} placeholder="Content" rows={10} required></textarea>
      
      {selectedNote ? (
        <div className="edit-buttons">
          <button type="submit">Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <button type="submit">Add Note</button>
      )}
      </form>

      <div className="notes-grid">
        {notes.map((notes)=>(
          <div className="note-item" onClick={()=>handleNoteClick(notes)}>
          <div className="notes-header">
            <button onClick={(event)=>deleteNote(event, notes.id)}>x</button>
          </div>
          <h2>{notes.title}</h2>
          <p>{notes.content}</p>
        </div>
        ))}
        
      </div>
    
  </div>
  )
} ;

export default App