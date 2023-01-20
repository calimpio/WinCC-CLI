import * as React from "react";
import { WebCC } from "../libs/webcc";
import {createRoot} from "react-dom/client"
import { Control } from "./control";

WebCC.start(
    (connected) => {
        if (connected) {            

        }
    },
    {
        events:{

        },
        methods:{

        },
        properties:{

        }
    },
    ['HMI, Formatting, Dialogues'],
    10000
)

const root = createRoot(document.getElementById("control"));
root.render(<Control/>)
