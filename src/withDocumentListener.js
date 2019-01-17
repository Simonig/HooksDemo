import React from 'react';
import DocumentsApi from "./DocumentsApi"

export default (WrappedComponent) => (
    class WithDocumentListenerComponent extends React.Component {
        constructor(props){
            super(props)
            this.docApi = DocumentsApi(props.docId)
            this.state = {
                documents: []
            }
        }

        componentDidMount(){
            this.docApi.subscribeToDocuments(this.handleNewDocs)
        }

        componentWillUnmount(){
            this.docApi.unsubscribeToDocuments(this.handleNewDocs)
        }

        componentDidUpdate(prevProps){
            const {docId} = this.props;
            if(docId !== prevProps.docId){
                this.docApi.unsubscribeToDocuments(this.handleNewDocs)
                this.docApi = DocumentsApi(docId)
                this.docApi.subscribeToDocuments(this.handleNewDocs)
            }
        }

        handleNewDocs = (newDoc) => {
            this.setState({documents: newDoc.detail})
        }

        render(){       
            return (
                <WrappedComponent 
                    documents={this.state.documents}
                    {...this.props}
                />
        )}
    }
)