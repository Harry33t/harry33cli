const program = require('commander')

const helpOptions = () => {
  //增加自己的options
  program.option('-h', 'a harry cli')
  // <>是可选参数的意思
  program.option('-d --dest <dest>', 'a destination folder', '例如：-d /harry/components')
  program.option('-f --framework <framework>', 'your framework', '例如：-f vue2')
  //增加一些地方
  program.on('--help', function () {
    console.log("");
    console.log("Other:");
    console.log("Other options~");
  })
}

module.exports = {
  helpOptions
}