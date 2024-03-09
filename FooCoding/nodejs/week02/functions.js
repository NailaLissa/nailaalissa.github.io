function CalculateTotalSalary(data) {
  const salaries = data.map((item) => parseFloat(item.salary) || 0);
  const totalSalary = salaries.reduce((sum, salary) => sum + salary, 0);
  return totalSalary;
}

function AverageSalary(data) {
  return CalculateTotalSalary(data) / data.length;
}

function findMinMaxByProfession(array) {
  return array.reduce((result, item) => {
    const profession = item.profession;
    const value = parseInt(item.salary);

    if (!result[profession]) {
      result[profession] = { min: Infinity, max: -Infinity };
    }

    result[profession].min = Math.min(result[profession].min, value);
    result[profession].max = Math.max(result[profession].max, value);

    return result;
  }, {});
}
function MinAge(array) {
  const minAge = array.reduce((min, item) => {
    const age = parseInt(item.age) || 0;
    return age < min ? age : min;
  }, Infinity);

  return minAge;
}

function MaxAge(array) {
  const maxAge = array.reduce((max, item) => {
    const age = parseInt(item.age) || 0;
    return age > max ? age : max;
  }, 0);

  return maxAge;
}
module.exports = {
  CalculateTotalSalary,
  AverageSalary,
  MinAge,
  MaxAge,
  findMinMaxByProfession,
};
