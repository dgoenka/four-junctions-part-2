const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv))
  .alias("t", "time")
  .alias("e", "earnings")
  .parse();
const time = Number(argv.time);
const d = Number(argv.earnings);
const { findPropertyCombinations } = require("./util/math");

console.log("The time entered is " + time);
console.log("The target earnings entered is $" + d + "\n\n");

let allProfitCombinations = findPropertyCombinations(d, time);

if (allProfitCombinations?.length > 0) {
  console.log(
    "The valid combinations are: " +
      JSON.stringify(allProfitCombinations, null, 2),
  );
} else {
  console.log("No combination found.");
}
