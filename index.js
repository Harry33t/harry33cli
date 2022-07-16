#!/usr/bin/env node  

const program = require('commander')
const {helpOptions} = require('./lib/core/help')
const createCommands = require('./lib/core/create')
//查看版本号
program.version(require('./package.json').version);
//帮助信息
helpOptions()
//创建信息
createCommands()


program.parse(process.argv)

 

