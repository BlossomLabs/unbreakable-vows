import _ from "underscore";

export const prepareQuesions = questions => {
  const form = questions?.form;
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
