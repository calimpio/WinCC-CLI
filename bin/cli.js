#!/usr/bin/env node

const {create_cwc} = require("./create-cwc")
const { argv } = require("process");
const { build_cwc } = require("./build-cwc");


switch(argv[2]){
    case 'create-cwc':
        return create_cwc()
    case 'build-cwc':
        return build_cwc()
}