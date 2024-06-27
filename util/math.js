const properties = require("./config");

function findPropertyCombinations(targetEarning, time) {
  const combinations = [];
  // Recursive function to find combinations
  function findCombinations(
    remainingTime,
    currentEarning,
    combination,
    spaceCount,
  ) {
    const space = new Array(spaceCount).join("\t");
    console.log(
      space + "in findCombinations, remainingTime is: " + remainingTime,
    );
    console.log(
      space + "in findCombinations, currentEarning is: " + currentEarning,
    );
    console.log(
      space +
        "in findCombinations, combination is: " +
        JSON.stringify(combination),
    );
    // Base case: target earning reached
    if (currentEarning >= targetEarning) {
      console.log(
        space + "you have already hit the desired earning, appending to list",
      );
      combinations.push(combination);
      return;
    }

    // Base case: no time left
    if (remainingTime <= 0) {
      console.log(
        space +
          "there no time remaining, terminating this combination and returning",
      );
      return;
    }
    let foundSuccessfulCombination = false;
    //Let iterate and see what can be built in the remaining time?
    for (const property in properties) {
      const buildTime = properties[property].buildTime;
      const earning = properties[property].earning;
      // Check if enough time to build the property
      if (remainingTime >= buildTime) {
        // Create a new combination with the property
        const potEarning =
          currentEarning +
          buildTime * (combination?.T || 0) * properties.T.earning +
          buildTime * (combination?.P || 0) * properties.P.earning +
          buildTime * (combination?.C || 0) * properties.C.earning;
        const newCombination = {
          ...combination,
        };
        newCombination[property] = (newCombination[property] || 0) + 1;

        // Recursively find combinations with the remaining time and earning
        console.log(
          space +
            "starting to check a new combination: " +
            JSON.stringify(newCombination),
        );
        let lengthBefore = combinations?.length;
        console.log(
          space + "count of combinations before starting is: " + lengthBefore,
        );
        findCombinations(
          remainingTime - buildTime,
          potEarning,
          newCombination,
          spaceCount + 1,
        );
        let lengthAfter = combinations?.length;
        console.log(
          space + "count of combinations after returning is: " + lengthAfter,
        );
        foundSuccessfulCombination = lengthBefore != lengthAfter;
        console.log(
          space +
            "foundSuccessfulCombination is: " +
            foundSuccessfulCombination,
        );
      }
    }
    //What if we didn't build anymore, just earned with the current portfolio, will we hit the target in the remaining time?
    {
      const potEarning =
        currentEarning +
        remainingTime * (combination?.T || 0) * properties.T.earning +
        remainingTime * (combination?.P || 0) * properties.P.earning +
        remainingTime * (combination?.C || 0) * properties.C.earning;

      if (potEarning >= targetEarning) {
        console.log(
          space +
            "desired earning reached from current portfolio, appending to list",
        );
        combinations.push(combination);
        return;
      }
    }
  }

  // Start the recursive search
  console.log("\n\n-------Workings Start-------\n\n");
  findCombinations(time, 0, { T: 0, P: 0, C: 0 }, 2);
  console.log("\n\n------Workings End-----\n\n");

  return combinations;
}

const targetEarning = 4500;
const time = 8;

const combinations = (targetEarning, time);

module.exports = { findPropertyCombinations };
