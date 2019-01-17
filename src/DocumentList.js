import React from 'react';
import DocumentsApi from "./DocumentsApi"
import AddDocuments from "./AddDocuments";
import DocumentItem from "./DocumentItem";

class DocumentList extends React.Component {
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
        const {docId, handleChangeId, handleRemove} = this.props;
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
                    {this.state.documents && this.state.documents.map((doc, i) => <DocumentItem key={i} {...doc} />) }
                </div>
            </React.Fragment>
        )
    }
}



export default DocumentList