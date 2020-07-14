
interface empty {

}


export const updateObject = (oldObject: empty, updateProperties: any) => {
  return {
    ...oldObject,
    ...updateProperties
  };
};