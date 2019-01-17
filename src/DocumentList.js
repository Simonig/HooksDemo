import React from 'react';
import AddDocuments from "./AddDocuments";
import DocumentItem from "./DocumentItem";
import withDocumentListener from "./withDocumentListener"



const DocumentList = ({docId, handleChangeId, handleRemove, documents}) => {
        return(
            <React.Fragment >
                <div className="documentListHeader">
                    <p> Document: {docId}                 
                        <span className="removeBtn" onClick={handleRemove}>
                            Remove
                        </span>
                    </p>
                    <AddDocuments  handleSubmit={handleChangeId} text={`Change Id`}/>
                </div>

                <div className="documentComponent">
                    {documents && documents.map((doc, i) => <DocumentItem key={i} {...doc} />) }
                </div>
            </React.Fragment>
        )
    }





export default withDocumentListener(DocumentList)



