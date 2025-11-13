import axios from "axios";
import { useContext } from "react";
import { UserConext } from "../context/userContext";
import API_URL from "../config";

export const useNotes = () => {
  const { setSavedNotes, setNote, note, setOpenEdit } = useContext(UserConext);

  const handleNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const rs = await axios.post(
        `${API_URL}/api/v1/createnotes`,
        {
          content: note,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNote("");
      handleSavedNotes();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSavedNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const rs = await axios.get(`${API_URL}/api/v1/getsavednotes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedNotes(rs.data.notes || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditNotes = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const rs = await axios.patch(
        `${API_URL}/api/v1/editnotes/${id}`,
        {
          content: note,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNote("");
      handleSavedNotes();
      setOpenEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteNotes = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/api/v1/deletenotes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      handleSavedNotes();
    } catch (err) {
      console.log(err);
    }
  };

  return { handleNotes, handleSavedNotes, handleEditNotes, handleDeleteNotes };
};
