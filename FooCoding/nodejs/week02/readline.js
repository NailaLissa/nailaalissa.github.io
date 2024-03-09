const fs = require('fs');
const readline = require('readline');
const {
  CalculateTotalSalary,
  AverageSalary,
  MinAge,
  MaxAge,
  findMinMaxByProfession,
} = require('./functions');
const stream = fs.createReadStream('./users-data.csv');
const rl = readline.createInterface({ input: stream });
let data = [];
let count = 0;

rl.on('line', (row) => {
  count++;

  // Skip the first line (header)
  if (count === 1) {
    return;
  }

  // Process data for other lines
  const rowData = row
    .match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)
    .map((field) => field.replace(/^\s*["']?|["']?\s*$/g, ''));

  const entry = {
    id: rowData[0].trim(),
    profession: rowData[7].trim(),
    age: parseInt(rowData[3].trim()),
    salary: parseInt(rowData[8].trim()),
  };

  data.push(entry);
});

rl.on('close', () => {
  try {
    const totalSalary = CalculateTotalSalary(data);
    const averageSalary = AverageSalary(data);
    const minAge = MinAge(data);
    const maxAge = MaxAge(data);
    const salaryByProfession = findMinMaxByProfession(data);
    let outputData =
      `Total Salary: ${totalSalary}\n` +
      `Average Salary: ${averageSalary.toFixed(2)}\n` +
      `Minimun age: ${minAge}\n` +
      `Maximum age: ${maxAge}\n\n`;

    for (const profession in salaryByProfession) {
      const { min, max } = salaryByProfession[profession];
      outputData +=
        `${profession} have the Minimun Salary: ${min}\n` +
        `${profession} have the Maximum Salary: ${max}\n\n`;
    }

    fs.writeFileSync('./results.txt', outputData);
    console.log('Results have been written to results.txt');
    // console.log('line:', count);
    // console.log('Data:', data);
    // console.log('line:', count);
    // console.log(totalSalary, averageSalary, minAge, maxAge);
  } catch (error) {
    console.error('Error processing data:', error);
  }
});

rl.on('error', (error) => {
  console.error('Error reading file:', error);
});
