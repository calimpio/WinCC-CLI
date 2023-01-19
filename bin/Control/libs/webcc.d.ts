interface Properties {
    //define props
}

interface ControlAPI{
    methods: {
        [name: string]: any
    },
    events: {
        [name: string]: any
    }, 
    properties:{
        [name: string]: any
    }
}

interface Events {
    subscribe: (data: any)=>void
}

interface Contract {
    
}

interface IWebCC {
    start(callback: (connected: boolean)=>void, controlApi: ControlAPI, c: string[], timeout: number ): void
    Properties: Properties,
    onPropertyChanged: Events
}

interface ControlInit{
    ControlApi: ControlAPI
}


export declare const WebCC: IWebCC
export declare const controlInit: ControlInit
export declare const setProperty: (data:{key: string, value: any})=>void