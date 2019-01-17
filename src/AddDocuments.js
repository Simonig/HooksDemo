import React, {useState} from 'react';
import InputWithSubmit from './InputWithSubmit';

const useAddDocuments = (handleSubmit) => {
    const [docId, setDocId] = useState("");
    const [valid, setValid] = useState(true);

    const validateDocId = () => {
        if(isValid(docId)){
            handleSubmit(docId)
            setValid(true)
            setDocId("")
        } else {
            setValid(false)
        }
    }
    return [docId, setDocId, valid, validateDocId]
}

const AddDocuments = ({handleSubmit, text, className}) => {
    const [docId, setDocId, isValid, validateDocId]  = useAddDocuments(handleSubmit)
    
    return (
        <InputWithSubmit 
            className={className}
            handleSubmit={validateDocId}
            value={docId}
            error={!isValid}
            onChange={(e) => setDocId(e.target.value)}
            btnText={text}
        />
    )
}

const isValid = (docId) => {
    if(!docId) return false
    const parsedDocId = parseInt(docId)
    return !!parsedDocId && parsedDocId > 999 && parsedDocId < 10000
}

export default AddDocuments
