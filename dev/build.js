let projectName = process.argv[2];
// console.log(projectName);
let fs = require('fs');

fs.writeFileSync('./common/project.js', `exports.name = '${projectName}'`);

let exec = require('child_process').execSync;
exec('npm run build-run', {stdio: 'inherit'});