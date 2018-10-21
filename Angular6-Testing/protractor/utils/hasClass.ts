export const hasClass = function (element, className) {
  return element.getAttribute("class").then(function (classes) {
    return classes.split(" ").indexOf(className) !== -1;
  });
};
