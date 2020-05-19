import { pythonShell } from 'python-shell';

const options = {
  mode: 'json',
  pythonPath: '',
  pythonOptions: ['-u'], // get print results in real-time
  scriptPath: '',
  args: ['a', 'b', 'c'],
};

pythonShell.run('my_script.py', options, (err, results) => {
  if (err) throw err;
  // results is an array consisting of messages collected during execution
  console.log('results: %j', results);
});

export default pythonShell;
