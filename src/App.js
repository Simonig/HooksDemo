import React, { Component} from 'react';
import './App.css';
import AddDocuments from './AddDocuments';
import DocumentList from './DocumentList';
import { set, remove } from 'immutable';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      documentIds: [],
    }
  }

  onAddDocument = (newDocId) => {
    const {documentIds} = this.state;
    if(!documentIds.includes(newDocId)){
      this.setState({documentIds: [...documentIds, newDocId]})
    }
  }
  
  onEditDocument = (i, newDocId) => {
    this.setState({documentIds: set(this.state.documentIds, i, newDocId)})
  }

  onRemoveDocument = (i) => {
    const {documentIds} = this.state; 
    if(documentIds) this.setState({documentIds: remove(this.state.documentIds, i)})
  }

  render() {
    return (
      <div className="App">
        
        <AddDocuments handleSubmit={this.onAddDocument} text="Search Documents" className="searchDocs"/>

        <div className="documentListWrapper">
          {this.state.documentIds && this.state.documentIds.map((docId, i) => (  
            <div key={docId} className="documentList">
              
              <DocumentList  
                docId={docId} 
                handleChangeId={(newDocId) => this.onEditDocument(i, newDocId)}
                handleRemove={()=> this.onRemoveDocument(i)}
              />
            
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
