import React, {useEffect, useState} from 'react';
import DocumentsApi from "./DocumentsApi"
import AddDocuments from "./AddDocuments";
import DocumentItem from "./DocumentItem";


const useDocuments = (docId, setDocuments) => {
    useEffect(()=> {
        const docListener = DocumentsApi(docId)
        const handleReceiveDocuments = (newDoc) => setDocuments(newDoc.detail)
        
        docListener.subscribeToDocuments(handleReceiveDocuments)

        return () => docListener.unsubscribeToDocuments(handleReceiveDocuments)
    }, [docId])
    }


const DocumentList = ({docId, handleChangeId, handleRemove, documentsHandler, documents}) => {
    useDocuments(docId, documentsHandler);
    
    return(
        <React.Fragment >
            <div className="documentListHeader">
                <p> Document: {docId}                 
                    <span className="removeBtn" onClick={handleRemove}>
                        Remove
                    </span>
                </p>
                <AddDocuments handleSubmit={handleChangeId} text={`Change Id`}/>
            </div>
            <div className="documentComponent">
                {documents && documents.map((doc, i) => <DocumentItem key={i} {...doc} />) }
            </div>
        </React.Fragment>
    )
}



export default DocumentList