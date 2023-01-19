import * as React from "react";
import { WebCC, controlInit, setProperty } from "../libs/webcc";
import {createRoot} from "react-dom/client"
import { Control } from "./control";

WebCC.start(
    (connected) => {
        if (connected) {            
            WebCC.onPropertyChanged.subscribe(setProperty);
        }
    },
    controlInit.ControlApi,
    [],
    10000
)

const root = createRoot(document.getElementById("control"));
root.render(<Control/>)
