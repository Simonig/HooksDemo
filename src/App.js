import React, { useReducer} from 'react';
import { set, remove} from 'immutable';

import './App.css';
import AddDocuments from './AddDocuments';
import DocumentList from './DocumentList';

export const documentIdsReducer = (state, {type, payload}) => {
    switch(type){
      case('REMOVE'): {
        return remove(state, payload)
      }
      case('ADD'): {
        return state.includes(payload) ? state : [...state, payload]
      }
      case('EDIT'): {
        return set(state, payload.i, payload.newDocId)
      }
      default: return state
  }
}


export const useDocumentIds = () => {
  const [state, dispatch] = useReducer(documentIdsReducer, [])
  const actions = {
    addId: (payload) => dispatch({type: 'ADD', payload}),
    removeId: (payload) => dispatch({type: 'REMOVE', payload}),
    editId: (payload) => dispatch({type: 'EDIT', payload}) 
  }

  return [state, actions];
}


function App (){
  const [documentIds, actions] = useDocumentIds();

  return (
    <div className="App"> 
        <AddDocuments handleSubmit={actions.addId} text="Search Documents" className="searchDocs"/>

        <div className="documentListWrapper">
          {documentIds.map((docId, i) => (  
            <div key={docId} className="documentList">    
              <DocumentList  
                docId={docId} 
                handleChangeId={(newDocId) => actions.editId({i, newDocId})}
                handleRemove={()=> actions.removeId(i)}
              />
            </div>
          ))}
        </div>
    </div>
  )
}



export default App
