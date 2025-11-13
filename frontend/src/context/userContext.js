import { createContext, useState } from "react";

export const UserConext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);
  const [note, setNote] = useState("");
  const [editNoteID, setEditNoteID] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <UserConext.Provider
      value={{
        user,
        setUser,
        savedNotes,
        setSavedNotes,
        note,
        setNote,
        editNoteID,
        setEditNoteID,
        openEdit,
        setOpenEdit,
      }}
    >
      {children}
    </UserConext.Provider>
  );
};
