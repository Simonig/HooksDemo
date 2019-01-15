import React from 'react';


const DocumentsOverview = ({documents, activeIds}) => {
    return (
    <div>
        {Object.keys(documents).map((docId) => {
          const isActive = activeIds.includes(docId);
          const quantity = documents[docId].length

          return (
            <p key={docId}>{docId} -- Docs: {quantity} <span style={{color: isActive ? 'green' : 'red'}}>{ isActive ? 'active' : 'disabled'}</span></p>
          )}
        )}
      </div>
    )
}

export default DocumentsOverview