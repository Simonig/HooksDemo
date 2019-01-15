import React from 'react';
import DocumentsApi from "./DocumentsApi"
import AddDocuments from "./AddDocuments";
import icon from './Icon.svg'


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
                    {this.state.documents && this.state.documents.map((doc, i) => <Document key={i} {...doc} />) }
                </div>
            </React.Fragment>
        )
    }
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




/*

const useDocuments = (docId) => {
    const [documents, setDocuments] = useState([])
    useEffect(()=> {
        const docListener = DocumentsApi(docId)
        const handleReceiveDocuments = (newDoc) => setDocuments(newDoc.detail)
        
        docListener.subscribeToDocuments(handleReceiveDocuments)

        return () => docListener.unsubscribeToDocuments(handleReceiveDocuments)
    }, [docId])
    
    return documents
}


const useDocuments = (docId, setDocuments) => {
    useEffect(()=> {
        const docListener = DocumentsApi(docId)
        const handleReceiveDocuments = (newDoc) => setDocuments(newDoc.detail)
        
        docListener.subscribeToDocuments(handleReceiveDocuments)

        return () => docListener.unsubscribeToDocuments(handleReceiveDocuments)
    }, [docId])
}
*/


export default DocumentList