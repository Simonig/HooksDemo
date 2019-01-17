import React from 'react';
import InputWithSubmit from './InputWithSubmit';

class AddDocuments extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            value: props.docId ? props.docId : "",
            error: false,
        }
    }

    handleSubmit = (e) => {
        const {value} = this.state;
        if(isValid(value)){
            this.props.handleSubmit(this.state.value)
            this.setState({value: '', error: false})
        } else {
            this.setState({error: true})
        }
    }

    handleOnChange = (e) => this.setState({value: e.target.value})

    render (){
        return (
            <InputWithSubmit 
                className={this.props.className}
                handleSubmit={this.handleSubmit}
                value={this.state.value}
                error={this.state.error}
                onChange={this.handleOnChange}
                btnText={this.props.text}
            />
        )
    }

}

const isValid = (docId) => {
    if(!docId) return false
    const parsedDocId = parseInt(docId)
    return !!parsedDocId && parsedDocId > 999 && parsedDocId < 10000
}


export default AddDocuments


