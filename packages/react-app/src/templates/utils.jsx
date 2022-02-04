import _ from "underscore";

const uVowsFinalStep = {
  "Final Step": {
    uVowsParties: {
      text: "Set the addresses of all parties involved",
      type: "endlessArray",
    },
    uVowsCollateral: {
      text: "Set the collateral",
      type: "tokenAmount",
    },
    uVowSuperfluid: {
      text: "Will this agreement have a SuperFluid Flow",
      type: ["Yes", "No"],
    },
    uVowSuperfluidAmount: {
      text: "How much will you pay on superfluid?",
      type: "tokenAmount",
      condition: "uVowSuperfluid==1",
    },
    uVowSuperfluidRecepient: {
      text: "What's the recepient address?",
      type: "text",
      condition: "uVowSuperfluid==1",
    },
  },
};

export const prepareQuesions = questions => {
  const form = { ...questions?.form, ...uVowsFinalStep };
  let variables = {};
  let sections = [];
  let sectionIterator = 0;

  _.each(form, (section, key) => {
    sections[sectionIterator] = { title: key, ...section };
    sectionIterator++;

    _.each(section, (variable, varKey) => {
      variables[varKey] = null;
    });
  });

  return { variables, sections };
};
