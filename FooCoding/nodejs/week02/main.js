const fs = require('fs');
const readStream = fs.createReadStream('./users-data.csv', 'utf8');
const {
  CalculateTotalSalary,
  AverageSalary,
  MinAge,
  MaxAge,
  findMinMaxByProfession,
} = require('./functions');
let streamContainer = '';
let lineCount = 0;
let data = [];
readStream.on('data', (chunk) => {
  streamContainer += chunk;

  const lines = streamContainer.split(/\r?\n/);

  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i];
    const fields = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);
    const entry = {
      id: fields[0].trim(),
      profession: fields[7].trim(),
      age: parseInt(fields[3].trim()),
      salary: fields[8].trim(),
    };

    data.push(entry);
  }

  streamContainer = lines[lines.length - 1];

  lineCount += lines.length - 1;
});

readStream.on('end', () => {
  if (streamContainer.trim() !== '') {
    const fields = streamContainer.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);

    if (fields.length >= 9) {
      const entry = {
        id: fields[0].trim(),
        profession: fields[7].trim(),
        age: parseInt(fields[3].trim()),
        salary: fields[8].trim(),
      };

      data.push(entry);
    } else {
      console.error('Invalid line format:', streamContainer);
    }

    lineCount += 1;
  }

  let result = data.slice(1);
  const totalSalary = CalculateTotalSalary(result);
  const averageSalary = AverageSalary(result);
  const minAge = MinAge(result);
  const maxAge = MaxAge(result);
  const salaryByProfession = findMinMaxByProfession(result);

  let outputData =
    `Total Salary: ${totalSalary}\n` +
    `Average Salary: ${averageSalary.toFixed(2)}\n` +
    `Minimum age: ${minAge}\n` +
    `Maximum age: ${maxAge}\n\n`;

  for (const profession in salaryByProfession) {
    const { min, max } = salaryByProfession[profession];
    outputData +=
      `${profession} has the Minimum Salary: ${min}\n` +
      `${profession} has the Maximum Salary: ${max}\n\n`;
  }

  fs.writeFileSync('./resultdata.txt', outputData);
  console.log('Results have been written to resultdata.txt');
});
