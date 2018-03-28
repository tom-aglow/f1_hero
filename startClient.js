const args = ['dev'];
const opts = { stdio: 'inherit', cwd: '_client', shell: true };
require('child_process').spawn('yarn', args, opts);
