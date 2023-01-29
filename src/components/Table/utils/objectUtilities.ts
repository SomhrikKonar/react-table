interface destructureObjectProps {
  object: object;
  keys: string[];
}
export const destructureObject = ({ object, keys }: destructureObjectProps) => {
  let value: any = object;
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (value[key] !== undefined) value = value[key];
    else return false;
  }
  return value;
};

interface updateObjectProps {
  object: any;
  keys: string[];
  newValue: any;
}
export const updateObject = ({ object, keys, newValue }: updateObjectProps) => {
  let newObject: typeof object = { ...object };
  let newObjectRef = newObject;
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (i === keys.length - 1) {
      newObjectRef[key] = newValue;
    } else if (!newObjectRef[key]) {
      newObjectRef[key] = {};
    }
    newObjectRef = newObjectRef[key];
  }
  return newObject;
};
