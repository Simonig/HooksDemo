import React, {Component} from 'react';
import { set, remove } from 'immutable';



const withDocumentIds = (WrappedComponent) => {
    class WithDocumentIdsComponent extends Component {
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
            const {documentIds} = this.state;
            if(!documentIds.includes(newDocId)){
                this.setState({documentIds: set(this.state.documentIds, i, newDocId)})
            }
        }
      
        onRemoveDocument = (i) => {
          const {documentIds} = this.state; 
          if(documentIds) this.setState({documentIds: remove(this.state.documentIds, i)})
        }
      
        render() {
          return (
            <WrappedComponent 
                documentIds={this.state.documentIds}
                removeDocumentId={this.onRemoveDocument}
                editDocumentId={(i, newDocId) => this.onEditDocument(i, newDocId)}
                addDocumentId={(docId) => this.onAddDocument(docId)}
            /> 
          );
        }
      }

      return WithDocumentIdsComponent
}

export default withDocumentIds;