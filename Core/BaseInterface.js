
class EmptyClass {}
const creator = (allParts, part) => part(allParts);
const extender = (baseClass, ...parts) => parts.reduce(creator, baseClass || EmptyClass);


module.exports = extender;
