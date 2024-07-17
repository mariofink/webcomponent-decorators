const byAttrVal = function (attributeName: string) {
  return function (target: any, key: any) {
    target[key] = function (element) {
      return element.getAttribute(attributeName);
    };
  };
};

class CustomElement extends HTMLElement {
  @byAttrVal("label") label: (element: HTMLElement) => string;

  connectedCallback() {
    const { label } = this.getProps();
    this.innerHTML = `<h1>${label}</h1>`;
  }

  getProps() {
    return {
      label: this.label(this),
    };
  }
}
window.customElements.define("custom-element", CustomElement);
