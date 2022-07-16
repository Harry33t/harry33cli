const {promisify} = require('util') //内置函数
const path = require('path')
const download = promisify(require('download-git-repo'))
const open = require('open')  //打开浏览器的插件
const {vueRepo} = require('../config/repo-config')
//callback -> promisify(函数) -> Promise -> async await
const {commandSpawn} = require('../utils/terminal')
const {compile,writeToFile,createDirSync} = require('../utils/utils')

const createProjectAction = async(project) => { //async返回的值是promise
  // 这里project相当于用户传给我们的文件夹名
  console.log('harry helps you create your project~');
  //1.clone项目
  await download(vueRepo,project,{clone:true});  //第二个参数是放到哪个文件夹下

  //2.执行npm install (封装命令)
  const command = process.platform === 'win32' ? 'npm.cmd': 'npm'
  await commandSpawn(command,['install'],{cwd:`./${project}`}) //cwd是当前进程


  //3. 运行npm run serve
  commandSpawn(command,['run','serve'],{cwd:`./${project}`}) //这个进程不会结束，得ctrl+c才会结束，所以不能用await阻塞


  //4. 打开浏览器 (通过open库)
  open("http://localhost:8080/")  //去掉await这个就变成同步了，不阻塞了。
}
//添加组件的action
const  addComponentAction =  async (name,dest) => { //dest目标文件夹
  //增加组件要先有组件的模板 
  const result = await compile("vue-components.ejs",{name,lowerName:name.toLowerCase()})

  //写入文件的操作 router.js / home.js /type.js也要写入文件


  //写入文件的操作
  const targetPath = path.resolve(dest,`${name}.vue`)
  console.log(targetPath);
  writeToFile(path,result) 
}
//添加组件和路由
const addPageAndRouteAction = async (name,dest) => {
  //1.编译ejs模板
  const data = {name,lowerName:name.toLowerCase()}
  const pageResult = await compile('vue-components.ejs',data);
  const routeResult = await compile('vue-router.ejs',data);

  //3.写入文件
  const targetDest = path.resolve(dest,name.toLowerCase())
  if(createDirSync(targetDest)){
    const targetPagePath = path.resolve(targetDest,`${name}.vue`);
    const targetRoutePath = path.resolve(targetDest,'router.js');
    writeToFile(targetPagePath,pageResult)
    writeToFile(targetRoutePath,routeResult)
  }

}
const addStoreAction = async (name,dest) => {
  const storeResult = await compile('vuex-store.ejs',{})
  const typesResult = await compile('vuex-types.ejs',{})

  //2.创建文件
  const targetDest = path.resolve(dest, name.toLowerCase());
  if(createDirSync(targetDest)){
    const targetPagePath = path.resolve(targetDest,`${name}.js`);
    const targetRoutePath = path.resolve(targetDest,'types.js');
    writeToFile(targetPagePath,storeResult)
    writeToFile(targetRoutePath,typesResult)
  }
}

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction
}