module.exports = {
content: (name, displayName, guid, author)=>
`{
    "mver": "1.2.0",
    "control": {
        "identity": {
        "name": "${name}",
        "version": "1.0",
        "displayname": "${displayName}",
        "icon": "./assets/logo.png",
        "type": "guid://${guid}",
        "start": "./index.html"
        },    
        "metadata": {
        "author": "${author}",
        "keywords": [
        ]
        },
        "contracts": {
        "api": {
            "methods": {
            },
            "events": {
            },
            "properties": {
            }
        }
        },
        "types": {
        }
    }
}`    
}