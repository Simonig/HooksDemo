import React from 'react';
import AddDocuments from "./AddDocuments";
import icon from './Icon.svg'
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
                    {documents && documents.map((doc, i) => <Document key={i} {...doc} />) }
                </div>
            </React.Fragment>
        )
    }


const Document = ({name, url}) => {
    return (
        <div style={{padding: '10px 0', textAlign: 'left'}}>
            <a href={url} styles={{display: 'flex'}}>
                <img src={icon} alt="pdf logo" style={{width: '20px', height: '20px', color: '#666'}}/>
                <span>{name}</span>
            </a>
        </div>
    )
}


export default withDocumentListener(DocumentList)



