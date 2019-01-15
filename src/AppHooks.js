import React, {useReducer} from 'react';
import { set, remove, fromJS} from 'immutable';
import AddDocuments from './AddDocuments';
import DocumentList from './DocumentList';
import DocumentsOverview from './DocumentsOverview';

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
        return state.setIn(['documentIds', payload.i], payload.newDocId)
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


const HooksApp = () => {
    const [{documentIds, documents}, actions] = useDocuments();
  
    return (
      <div className="App">
        <AddDocuments handleSubmit={actions.addId} text="Search Documents" className="searchDocs"/>

        <DocumentsOverview documents={documents} activeIds={documentIds}/>

        <div className="documentListWrapper">
          {documentIds && documentIds.map((docId, i) => (  
            <div key={docId} className="documentList">
                <DocumentList 
                    docId={docId}
                    handleChangeId={(newDocId) => actions.editId({i, newDocId})}
                    handleRemove={()=> actions.removeId(i)}
                    addDocuments={(documents) => actions.addDocuments({documents, docId})}
                    documents={documents[docId]}
                />
            </div>
          ))}
        </div>
      </div>
    );
}

export default HooksApp