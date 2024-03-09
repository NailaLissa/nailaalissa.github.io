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
let dataarray = [];

readStream.on('data', (chunk) => {
  streamContainer += chunk;

  // Check if the chunk ends with a newline character
  const endsWithNewline = chunk.endsWith('\n');

  // Split by lines
  const lines = streamContainer.split(/\r?\n/);

  // If the chunk doesn't end with a newline, process the last line separately
  if (!endsWithNewline) {
    const lastLine = lines.pop();

    if (lastLine) {
      const fields = lastLine.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);

      if (fields.length >= 9) {
        const entry = {
          age: parseInt(fields[3]),
          profession: fields[7].trim(),
          salary: parseInt(fields[8]),
        };

        dataarray.push(entry);
      }
    }
  }

  // Save the last incomplete line for the next chunk
  streamContainer = lines.pop() || '';

  // Process complete lines
  lines.forEach((line) => {
    const fields = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);

    if (fields.length >= 9) {
      const entry = {
        age: parseInt(fields[3]),
        profession: fields[7].trim(),
        salary: parseInt(fields[8]),
      };

      dataarray.push(entry);
    }
  });
});

readStream.on('end', () => {
  console.log(dataarray.length);

  // Process the data and calculate results
  let result = dataarray.slice(1);
  const totalSalary = result.reduce((sum, entry) => sum + entry.salary, 0);

  //const totalSalary = CalculateTotalSalary(result);
  const averageSalary = AverageSalary(result);
  const minAge = MinAge(result);
  const maxAge = MaxAge(result);
  const salaryByProfession = findMinMaxByProfession(result);

  // Prepare and print the output
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

  console.log(outputData);

  // Uncomment the following lines if you want to write the results to a file
  // fs.writeFileSync('./resultdata.txt', outputData);
  // console.log('Results have been written to resultdata.txt');
});

readStream.on('error', (err) => {
  console.error('Error reading the file:', err);
});
