

export const updateObject = (oldObject: Object, updateProperties: Object) => {
  return {
    ...oldObject,
    ...updateProperties
  };
};