#!/usr/bin/env node

const fs = require("fs");
const {cwd} = require('process');
const {zip} = require("zip-a-folder");
const {exec} = require("child_process");


function build_cwc(){
    const root = cwd();
    exec("npx webpack --no-watch",(err, stdout, stderr)=>{
       if(!err){
         fs.readFile(`${root}/dist/manifest.json`,(err, data)=>{
            const manifest = JSON.parse(data);
            const guid = manifest.control.identity.type.split("//")[1];
            zip(`${root}/dist`, `${root}/{${guid}}.zip`)
         });
       }
    })
}

module.exports = {build_cwc}