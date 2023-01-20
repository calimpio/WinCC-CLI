interface Properties {
    //define properties
}

interface Events {
    //define events
}

interface ControlAPI {
    methods: {
        [name: string]: any
    },
    events: {
        [Event in keyof Events]: any
    },
    properties: {
        [Prop in keyof Properties]: any
    }
}


interface HMI {
    Properties: Properties
}

interface Extencions {
    HMI: HMI,
    Formatting: {},
    Dialogues: {}
    //define more eviroments extensions from TIA Portal
}

interface IWebCC {
    start(callback: (connected: boolean) => void, controlApi: ControlAPI, c: string[], timeout: number): void
    Extensions: Extencions
}

export declare const WebCC: IWebCC