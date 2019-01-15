import { get } from "immutable";

const documentsData = {};

const initDocApi = (docsId) => {
    const eventName = `docs${docsId}`
    console.log(`listerner ${eventName} initialized`);
    
    if (!documentsData[docsId]) {
        documentsData[docsId] = [];
    }

    const dispatchDocuments = () => {
        const docEvents = new CustomEvent(eventName, {detail: get(documentsData, docsId)});
        document.dispatchEvent(docEvents)
    }
    
    const gettingDocs = setInterval(() => {
        console.log(`getting docs: ${docsId}`)

        if(documentsData[docsId].length < 5){
            const newDoc = {
                id: documentsData[docsId].length,
                docsId,
                name: `Document${documentsData[docsId].length}.pdf`,
                url: `check24.de/${docsId}/${documentsData[docsId].length}`
            };
    
            documentsData[docsId].push(newDoc);
            dispatchDocuments()
        }
    }, 5000) 

    return {
        subscribeToDocuments: (handleNewDocuments) => {
            document.addEventListener(eventName, handleNewDocuments)
            dispatchDocuments()
        },
        unsubscribeToDocuments: (handler) => {
            console.log(`listerner ${eventName} terminated`);
            clearInterval(gettingDocs)
            document.removeEventListener(eventName, handler)
        }
    }
}


export default initDocApi