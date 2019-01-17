import React from 'react';
import './App.css';
import AddDocuments from './AddDocuments';
import DocumentList from './DocumentList';
import withDocumentIds from './withDocumentIds';


const App = ({addDocumentId, documentIds, editDocumentId, removeDocumentId}) => {
  return (
      <div className="App">
          
      <AddDocuments handleSubmit={addDocumentId} text="Search Documents" className="searchDocs"/>

      <div className="documentListWrapper">
        {documentIds && documentIds.map((docId, i) => (  
          <div key={docId} className="documentList">
            
            <DocumentList  
              docId={docId} 
              handleChangeId={(newDocId) => editDocumentId(i, newDocId)}
              handleRemove={()=> removeDocumentId(i)}
            />
          
          </div>
        ))}
      </div>
    </div>
  )
}


export default withDocumentIds(App);
