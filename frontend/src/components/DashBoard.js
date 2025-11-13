import Nav from "./Nav";
import { useContext, useEffect, useState } from "react";
import { UserConext } from "../context/userContext";
import { useNotes } from "../hooks/useNotes";

export default function DashBoard() {
  const {
    user,
    savedNotes,
    note,
    setNote,
    openEdit,
    setOpenEdit,
    editNoteID,
    setEditNoteID,
  } = useContext(UserConext);
  const [openTextArea, setOpenTextArea] = useState(false);
  const { handleNotes, handleSavedNotes, handleEditNotes, handleDeleteNotes } =
    useNotes();

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  const hanldeEdit = (note) => {
    setOpenTextArea(true);
    setOpenEdit(true);
    setNote(note.content);
    setEditNoteID(note._id);
  };

  useEffect(() => {
    handleSavedNotes();
  }, []);

  return (
    <div className="dash">
      <Nav />
      <div className="notes">
        <div className="twosec">
          <div className="create">
            {!openTextArea ? (
              <>
                {" "}
                <nav>Create Notes Here</nav>
                <nav onClick={() => setOpenTextArea(true)}>+</nav>
              </>
            ) : (
              <>
                <textarea
                  className="textarea"
                  type="message"
                  placeholder="create your notes"
                  name="note"
                  value={note}
                  onChange={handleChange}
                />
                <button
                  onClick={() => {
                    openEdit ? handleEditNotes(editNoteID) : handleNotes();
                  }}
                >
                  {openEdit ? "Save" : "Submit"}
                </button>
              </>
            )}
          </div>
          <div className="saved">
            <h1>Saved Notes</h1>
            <div>
              {savedNotes?.length === 0 ? (
                <nav className="savNotes">No Notes yet created</nav>
              ) : (
                savedNotes?.map((note, idx) => {
                  return (
                    <div key={idx} className="sav">
                      <div className="time">
                        <nav>{user?.userName}</nav>
                        <div className="icons">
                          <img
                            onClick={() => hanldeEdit(note)}
                            width="25"
                            height="25"
                            src="https://img.icons8.com/ios/50/create-new.png"
                            alt="create-new"
                          />
                          <img
                            onClick={() => handleDeleteNotes(note._id)}
                            width="25"
                            height="25"
                            src="https://img.icons8.com/ios-glyphs/30/filled-trash.png"
                            alt="filled-trash"
                          />
                        </div>
                      </div>
                      <div className="writenotes">
                        <nav>{note.content}</nav>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
