import { store } from "./store";

// Generic function to render components with children
const render = (name, props) => {
  const component = document.createElement(name);
  Object.keys(props).forEach((k) => {
    if (k !== "children") {
      component.setAttribute(k, props[k]);
    } else {
      component.innerHTML = props[k];
    }
  });

  return component;
};

const renderWithChildren = (name, props, children) => {
  const component = document.createElement(name);

  // setting props
  Object.keys(props).forEach((k) => {
    component.setAttribute(k, props[k]);
  });

  // children

  const { components } = store.getState();
  children.forEach((id) => {
    const { type, props, children } = components[id];

    const preview = document.createElement("preview-container");
    preview.setAttribute("id", id);

    let child;
    switch (type) {
      case "button":
        child = renderButton(props);
        break;

      case "select":
        child = renderSelect(props);
        break;

      case "div":
        child = renderWithChildren(type, props, children);
        break;

      default:
	child = render(type, props);
        // console.error("renderWithChildren: Unknown component");
    }

    preview.appendChild(child);
    component.appendChild(preview);
  });

  return component;
};

const renderButton = (props) => {
  const component = document.createElement("button");
  Object.keys(props).forEach((k) => {
    if (k !== "children") {
      if (k === "size" && props[k] === "icon") {
        component.innerHTML = "";
        const icon = document.createElement("fw-icon");
        icon.setAttribute("name", props["icon"]);
        component.appendChild(icon);
      }
      component.setAttribute(k, props[k]);
    } else {
      component.innerHTML = props[k];
    }
  });

  return component;
};

const renderCheckbox = (props) => {
  const component = document.createElement("fw-checkbox");
  Object.keys(props).forEach((k) => {
    if (k !== "children") {
      component.setAttribute(k, props[k]);
    } else {
      component.innerHTML = props[k];
    }
  });

  return component;
};

const renderDropdownButton = (props) => {
  const component = document.createElement("fw-dropdown-button");
  Object.keys(props)
    .filter((k) => k !== "options")
    .forEach((k) => {
      component.setAttribute(k, props[k]);
    });

  const options = props.options;

  const optionsDiv = document.createElement("div");
  optionsDiv.setAttribute("slot", "dropdown-options");
  const opts = options
    .map((option) => {
      return `<option id="${option.id}" value="${option.value}">${option.label}</option>`;
    })
    .join("\n");
  optionsDiv.innerHTML = opts;
  component.appendChild(optionsDiv);

  return component;
};

const renderSelect = (props) => {
  const component = document.createElement("select");
  Object.keys(props)
    .filter((k) => k !== "options")
    .forEach((k) => {
      component.setAttribute(k, props[k]);
    });

  const options = props.options;

  const opts = options
    .map((option) => {
      return `<option value="${option.value}">${option.label}</option>`;
    })
    .join("\n");
  component.innerHTML = opts;

  return component;
};

export {
  render,
  renderButton,
  renderCheckbox,
  renderDropdownButton,
  renderSelect,
  renderWithChildren,
};
