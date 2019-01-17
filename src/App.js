import React, { useReducer} from 'react';
import {fromJS} from 'immutable';

import './App.css';
import AddDocuments from './AddDocuments';
import DocumentList from './DocumentList';
import DocumentsOverview from './DocumentsOverview';

const documentsInitialState = fromJS({
  documentIds: [],
  documents: {},
})

export const documentsReducer = (state, {type, payload}) => {
  switch(type){
    case('REMOVE_ID'): {
      return state.removeIn(['documentIds', payload])
    }
    case('ADD_ID'): {
      return state.get('documentIds').includes(payload) ? state : state.update('documentIds', documentIds => documentIds.push(payload))
    }
    case('EDIT_ID'): {
      return state.get('documentIds').includes(payload.newDocId) ? state : state.setIn(['documentIds', payload.i], payload.newDocId)
    }
    case('SET_DOCUMENT'): {
      return state.setIn(['documents', payload.docId], payload.documents)
    }
    default: return state
}
}



export const useDocuments = () => {
  const [state, dispatch] = useReducer(documentsReducer, documentsInitialState)
  const actions = {
    addId: (payload) => dispatch({type: 'ADD_ID', payload}),
    removeId: (payload) => dispatch({type: 'REMOVE_ID', payload}),
    editId: (payload) => dispatch({type: 'EDIT_ID', payload}), 
    addDocuments : (payload) => dispatch({type: 'SET_DOCUMENT', payload})
  }

  return [state.toJS(), actions];
}

function App (){
  const [state, actions] = useDocuments();

  return (
    <div className="App"> 
        <AddDocuments handleSubmit={actions.addId} text="Search Documents" className="searchDocs"/>
        <DocumentsOverview documents={state.documents} activeIds={state.documentIds}/>

        <div className="documentListWrapper">
          {state.documentIds.map((docId, i) => (  
            <div key={docId} className="documentList">    
              <DocumentList
                docId={docId} 
                handleChangeId={(newDocId) => actions.editId({i, newDocId})}
                handleRemove={()=> actions.removeId(i)}

                documents={state.documents[docId]}
                documentsHandler={(documents) => actions.addDocuments({docId, documents})}
              />
            </div>
          ))}
        </div>
    </div>
  )
}



export default App
