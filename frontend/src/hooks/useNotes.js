import axios from "axios";
import { useContext } from "react"
import { UserConext } from "../context/userContext"

export const useNotes = () => {
    const {setSavedNotes, setNote, note, setOpenEdit} = useContext(UserConext);

        const handleNotes = async () => {
        try {
            const token = localStorage.getItem("token");
            const rs = await axios.post(`http://localhost:5000/api/v1/createnotes`, {
                content : note
            } ,
                {
                    headers : {Authorization : `Bearer ${token}`}
                }
            );
            console.log(rs);
            setNote("");
            handleSavedNotes();
        }
        catch(err){
            console.log(err);
            return err;
        }
    }

    const handleSavedNotes = async () => {
        try {
            const token = localStorage.getItem("token");
            const rs = await axios.get("http://localhost:5000/api/v1/getsavednotes", 
                {
                    headers : {Authorization : `Bearer ${token}`}
                }
            );
            console.log(rs.data.notes);
            setSavedNotes(rs.data.notes || []);
        }
        catch(err) {
            console.log(err);
            return err;
        }
    }



    const handleEditNotes = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const rs = await axios.patch(`http://localhost:5000/api/v1/editnotes/${id}`, {
                content : note,
            }, {
                headers : {Authorization : `Bearer ${token}`}
            })
            console.log(rs);
            setNote("");
            handleSavedNotes();
            setOpenEdit(false);
        }
        catch(err) {
            console.log(err);
            return err;
        }
    }

    const handleDeleteNotes = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/api/v1/deletenotes/${id}`, {
                headers : {Authorization : `Bearer ${token}`}
            })

            handleSavedNotes();
        }
        catch(err) {
            console.log(err);
            return err;
        }
    }

    return {handleNotes, handleSavedNotes, handleEditNotes, handleDeleteNotes}
}