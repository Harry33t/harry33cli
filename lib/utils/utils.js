const ejs = require('ejs')
const fs = require('fs')
const path = require('path')


const compile = (templateName,data) => {
  const templatePosition = `../templates/${templateName}`
  const templatePath = path.resolve(__dirname,templatePosition) //模板的路径

  return new Promise((resolve,reject) => {
    ejs.renderFile(templatePath,{data} , {},(err,result) => { //ejs的功能
      if(err){
        console.log(err);
        reject(err)
        return; 
      }
      resolve(result);
    })
  })
  
 
}

//source/components/category
const createDirSync = (pathName) => {
  if(fs.existsSync(pathName)){
    return true;  //存在了直接return就行了
  }else{
    if(createDirSync(path.dirname(pathName))){ //取到根了，根就是返回值
      fs.mkdirSync(pathName)
      return true;
    }
  }
}


const writeToFile = (path,content) =>{ //文件写入的路径path和文件的信息content

  //判断path是否存在，如果不存在，创建对应的文件夹 文件夹是需要递归创建的
  return fs.promises.writeFile(path,content) //这个返回的就是一个promise
  

   
}

module.exports = {
  compile,
  writeToFile,
  createDirSync
}