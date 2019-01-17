import React from 'react';
import icon from './Icon.svg'

const DocumentItem = ({name, url}) => {
    return (
        <div style={{padding: '10px 0', textAlign: 'left'}}>
            <a href={url} styles={{display: 'flex'}}>
                <img src={icon} alt="pdf logo" style={{width: '20px', height: '20px', color: '#666'}}/>
                <span>{name}</span>
            </a>
        </div>
    )
}


export default DocumentItem