#! /usr/bin/env node
let userArgs = process.argv.slice(2);
const git = require('simple-git')('.');
const fn = require('./functions');

let branch = "master"
let remote = "origin"
let commit = "commit message"
let remoteURI = ""

// set current branch
git.branchLocal((err, data) => {
  if (!err) {
    console.log('\x1b[36m%s\x1b[0m',`Working on branch ${data.current}`)
    branch = data.current;
  }
});
git.outputHandler((command, stdout, stderr) => {
  // stdout.pipe(process.stdout);
  stderr.pipe(process.stderr);
})

if(userArgs.length === 3){
  remote = userArgs[0]
  branch = userArgs[1]
  commit = userArgs[2]
}
else if(userArgs.length === 2){
  remote = userArgs[0]
  commit = userArgs[1]
} else if(userArgs.length === 1) {
  commit = userArgs[0]
} else {
  console.log('\x1b[36m%s\x1b[0m',"Usage:")
  console.log('\x1b[36m%s\x1b[0m',"- gitpush \"Commit Message\"")
  console.log('\x1b[36m%s\x1b[0m',"- gitpush [origin] \"Commit Message\"")
  // console.log('\x1b[36m%s\x1b[0m',"- gitpush [origin] [master] \"Mensaje Commit\"")
  console.log('\x1b[0m',"")
  process.exit(0);
}

git.getRemotes(true,(err,data) => {
  for (let item of data){
    if(item.name===remote) {
      remoteURI = item.refs.fetch.toLowerCase()
    }
    fn.doPullandPush(git,remoteURI,remote,branch,commit)
  }
})


