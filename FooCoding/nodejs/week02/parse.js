const {
  CalculateTotalSalary,
  AverageSalary,
  MinAge,
  MaxAge,
  findMinMaxByProfession,
} = require('./functions');
const fs = require('fs');
const csv = require('csv-parser');
const result = [];
const readableStream = fs
  .createReadStream('./users-data.csv')
  .pipe(csv())
  .on('data', (data) => {
    result.push(data);
  })
  .on('error', (err) => {
    console.error(err);
  })
  .on('end', () => {
    const totalSalary = CalculateTotalSalary(result);
    const averageSalary = AverageSalary(result);
    const minAge = MinAge(result);
    const maxAge = MaxAge(result);
    const salaryByProfession = findMinMaxByProfession(result);

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
    const professions = result
      .map((item) => item.profession)
      .filter((value, index, self) => self.indexOf(value) === index);

    console.log(professions);

    for (i = 0; i < professions.length; i++) {
      const minSalary = findMinSalaryByProfession(result, professions[i]);
      console.log(`${professions[i]} have the Minimum Salary: ${minSalary}\n`);
    }
  });

function findMinSalaryByProfession(array, targetProfession) {
  const salaries = array
    .filter((item) => item.profession === targetProfession)
    .map((item) => parseInt(item.salary));
  return salaries.reduce((min, salary) => (salary < min ? salary : min), Infinity);
}

function findMaxSalaryByProfession(array, targetProfession) {
  const salaries = array
    .filter((item) => item.profession === targetProfession)
    .map((item) => parseInt(item.salary));

  if (salaries.length === 0) {
    return null; // or any default value to indicate no salary found
  }

  return Math.max(...salaries);
}
