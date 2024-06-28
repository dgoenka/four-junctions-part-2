const properties = require("./config");

function findPropertyCombinations(time) {
  const combinations = [];
  // Recursive function to find combinations
  function findCombinations(remainingTime, combination, spaceCount) {
    const space = new Array(spaceCount).join("\t");
    console.log(
      space + "in findCombinations, remainingTime is: " + remainingTime,
    );
    console.log(
      space +
        "in findCombinations, combination is: " +
        JSON.stringify(combination),
    );

    // Base case: no time left
    if (remainingTime <= 0) {
      console.log(
        space +
          "there no time remaining, terminating this combination and returning",
      );
      return;
    }
    //Let iterate and see what can be built in the remaining time?
    for (const property in properties) {
      const buildTime = properties[property].buildTime;
      // Check if time is left after building the property
      if (remainingTime > buildTime) {
        // Create a new combination with the property
        const Earning =
          combination.Earning +
          buildTime * (combination?.T || 0) * properties.T.earning +
          buildTime * (combination?.P || 0) * properties.P.earning +
          buildTime * (combination?.C || 0) * properties.C.earning;
        const newCombination = {
          ...combination,
          Earning,
        };
        newCombination[property] = (newCombination[property] || 0) + 1;

        // Recursively find combinations with the remaining time and earning
        console.log(
          space +
            "Starting to check a new combination:\n" +
            space +
            JSON.stringify(newCombination) +
            " with remaining time: " +
            (remainingTime - buildTime),
        );

        findCombinations(
          remainingTime - buildTime,
          newCombination,
          spaceCount + 1,
        );
      }
    }
    //What if we didn't build anymore, just earned with the current portfolio, will we hit the target in the remaining time?
    {
      const Earning =
        combination.Earning +
        remainingTime * (combination?.T || 0) * properties.T.earning +
        remainingTime * (combination?.P || 0) * properties.P.earning +
        remainingTime * (combination?.C || 0) * properties.C.earning;
      const toPush = { ...combination, Earning };
      console.log(
        space +
          "Appending the combination with the potential earnings by using remaining time to only earn:\n" +
          space +
          JSON.stringify(toPush),
      );
      combinations.push(toPush);
    }
  }

  // Start the recursive search
  console.log("\n\n-------Workings Start-------\n\n");
  findCombinations(time, { T: 0, P: 0, C: 0, Earning: 0 }, 2);
  const maxEarning = combinations.reduce((max, { Earning }) => {
    return Earning > max ? Earning : max;
  }, -Infinity);
  const toKeep = combinations
    .filter((item) => item.Earning === maxEarning)
    .map((item) => {
      const clone = { ...item };
      delete clone.Earning;
      return clone;
    });
  console.log("\n\n------Workings End-----\n\n");

  return { Earnings: maxEarning, Solutions: toKeep };
}

const targetEarning = 4500;
const time = 8;

const combinations = (targetEarning, time);

module.exports = { findPropertyCombinations };
