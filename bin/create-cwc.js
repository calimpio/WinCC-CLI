#!/usr/bin/env node

const { stdin, stdout, execPath, cwd, argv } = require("process");
const fs = require("fs");
const { v4: uiid } = require("uuid");

const { content: manifest } = require("./Control/manifest.json.js");


function create_cwc() {

    const readline = require("readline").createInterface({
        input: stdin,
        output: stdout
    });

    const guid = uiid();
    const data = {};
    readline.question("Control Name: ", (value) => {
        data.name = value;
        readline.question(`Display Name (${data.name}): `, (value) => {
            data.displayName = value || data.name;
            readline.question("Author: ", (value) => {
                data.author = value
                const manifestJson = manifest(data.name, data.displayName, guid, data.author);
                const pwd = cwd();
                const base = __dirname;
                const root = `${pwd}/${data.name}`;
                fs.opendir(root, (err, dir) => {
                    if (err) {
                        fs.mkdir(`${root}`, (err) => {
                            fs.copyFile(`${base}/Control/package.json`, `${root}/package.json`, () => { })
                            fs.copyFile(`${base}/Control/webpack.config.js`, `${root}/webpack.config.js`, () => { })
                            fs.copyFile(`${base}/Control/tsconfig.json`, `${root}/tsconfig.json`, () => { })
                            fs.mkdir(`${root}/dist`, (err) => {
                                fs.writeFile(`${root}/dist/manifest.json`, manifestJson, { encoding: "utf-8" }, () => { });
                                fs.copyFile(`${base}/Control/dist/index.html`, `${root}/dist/index.html`, () => { });
                                fs.mkdir(`${root}/dist/assets`, (err) => {
                                    fs.copyFile(`${base}/Control/dist/assets/logo.png`, `${root}/dist/assets/logo.png`, () => { });
                                });
                            });
                            fs.mkdir(`${root}/libs`, (err) => {
                                fs.copyFile(`${base}/Control/libs/webcc.js`, `${root}/libs/webcc.js`, () => { });
                                fs.copyFile(`${base}/Control/libs/webcc.d.ts`, `${root}/libs/webcc.d.ts`, () => { });
                            });
                            fs.mkdir(`${root}/src`, (err) => {
                                fs.copyFile(`${base}/Control/src/index.tsx`, `${root}/src/index.tsx`, () => { });
                                fs.copyFile(`${base}/Control/src/control.tsx`, `${root}/src/control.tsx`, () => { });
                            });
                            readline.close();
                        });
                    } else {
                        console.log(`${data.name} cwc already exists.`);
                        readline.close()
                    }
                })
            })
        })
    });
}


module.exports = {create_cwc}