/**
 * 执行终端命令相关代码
 */
//这个自己下课去试试 spawn更偏向于底层，exec相当于对spawn进一步封装
const { exec, spawn } = require('child_process')  //这是node自带的模块，子进程模块

const commandSpawn = (...args) => { //可变参数，把所有的参数当成一个数组
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args) //把数组所有参数都解构解构 '','',''
    childProcess.stdout.pipe(process.stdout);  //将进程的信息传给用户的进程
    childProcess.stderr.pipe(process.stderr);  
    childProcess.on("close", () => {  //执行完必须让node知道
      resolve()
    })
  })



}


module.exports = {
  commandSpawn,

}