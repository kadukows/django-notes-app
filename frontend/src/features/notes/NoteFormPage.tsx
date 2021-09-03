import * as React from 'react'
import { useSelector, useDispatch } from "react-redux"

import { RootState } from '../../store'

import NoteForm from "./NoteForm"
import Loader from "../loader/Loader"

interface Props {

}

function NoteFormPage({}: Props): React.ReactElement {
    const useSlice = () => useSelector((state: RootState) => state.notesReducer);
    const notesLoaded = (state: RootState["notesReducer"]) => state.loaded;



    return (

    )
}

export default NoteFormPage;
