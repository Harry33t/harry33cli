const program = require('commander')

const {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction
} = require('./actions')

const createCommands = () =>{
  
  program.command('create <project> [others...]') //不用harry create 默认就是harry
                                                  //[others...]  这里...是可变长的
         .description('a clone respository into a folder')
         .action(createProjectAction)  //这里可以返回promise

  program.command('addcpn <name>') 
         .description('add vue component,例如:harry addcpn HelloWorld -d src/components')
         .action((name) => {
            addComponentAction(name,program.dest || 'src/components')
         })
  program.command('addpage <page>')
         .description('add vue page and router config,例如 harry addpage Home [-d src/pages]')
         .action((page) => {
          addPageAndRouteAction(page,program.dest || 'src/pages')
         })
  program.command('addstore <store>')
         .description('add vue page and router config,例如 harry addpage Home [-d src/pages]')
         .action((store) => {
          addStoreAction(store,program.dest || 'src/store/modules')
         })        
         
}

module.exports = createCommands