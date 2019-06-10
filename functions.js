exports.
  doPullandPush = function(git,remoteURI,remote,branch,commit){
  if(remoteURI.indexOf('http') >= 0) {
    console.log('\x1b[31m',"This script only works with SSH")
    console.log('\x1b[0m',"")
    process.exit(0);
  }
  
  try {
    git.pull(remote,branch ,(err, data) => {
      if(err) {
        console.log('\x1b[36m%s\x1b[0m',`Error while git pull`)
//         git.push([remote, branch], () => console.log('\x1b[36m%s\x1b[0m',`Done`));
      }
    })
  } catch (e) {
    console.log('\x1b[36m%s\x1b[0m',`Error while git pull`)
    //console.log('\x1b[36m%s\x1b[0m',`New branch`)
  }
  git.add('.')
  git.commit(commit)
  git.push([remote, branch], () => console.log('\x1b[36m%s\x1b[0m',`Done`));
}
