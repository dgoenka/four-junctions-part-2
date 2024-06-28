const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).alias("t", "time").parse();
const time = Number(argv.time);
const { findPropertyCombinations } = require("./util/math");

console.log("The time entered is " + time);

let allProfitCombinations = findPropertyCombinations(time);

if (allProfitCombinations?.Earnings > 0) {
  console.log(
    "The maximum possible earnings and all the possible combinations to achieve the same are: " +
      JSON.stringify(allProfitCombinations, null, 2),
  );
} else {
  console.log("No combination found.");
}
