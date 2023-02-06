const fs = require('fs');
const readline = require('readline');
const sqlite3 = require('sqlite3');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const filename = 'quiklink.sqlite3';
const path = `./${filename}`;

rl.on('close', () => {
  process.exit(0);
});

if (fs.existsSync(path)) {
  console.log(`Database named, ${filename}, already exists.`);
  rl.question('Do you want to overwrite it? (Y/N) ', (response) => {
    if (response.toUpperCase() === 'Y') {
      fs.unlinkSync(path);
      createDb(rl);
    } else {
      console.log('Database remains unchanged.');
      rl.close();
    }
  });
} else {
  createDb(rl);
}

function createDb(rl) {
  new sqlite3.Database(filename, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`New database: ${filename} was created.`);
    }
    rl.close();
  });
}
