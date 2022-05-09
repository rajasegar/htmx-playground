import { editor } from "./stores.js";

let components;

editor.subscribe((value) => {
  components = value.components;
});

const noEndTags = ["input", "img"];

export const formatCode = async (code) => {
  let formattedCode = `// 🚨 Your props contains invalid code`;

  const prettier = await import("prettier/standalone");
  const htmlParser = await import("prettier/parser-html");

  try {
    formattedCode = prettier.format(code, {
      parser: "html",
      plugins: [htmlParser],
    });
  } catch (e) {
    console.log(e);
  }

  return formattedCode;
};

export default async function generateCode() {
  const code = generateCodeForChildren(components.root.children);
  const formattedCode = await formatCode(code);
  return formattedCode;
}

export function generateEJSCode() {
  const body = generateCode();

  const code = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>My HTMX Playground app</title>
</head>
<body>
${body}
<script src="https://unpkg.com/htmx.org@1.7.0"></script>
</body>
</html>
`;

  return code;
}

function generateCodeForChildren(offspring) {
  let code = "";
  offspring.forEach((id) => {
    const { type, props, children } = components[id];

    switch (type) {
      case "fw-button":
        code += generateButtonCode(props);
        break;

      default:
        code += generateDefaultCode(type, props, children);
    }
  });
  return code;
}

function generateDefaultCode(type, props, children) {
  let code = "";

  const properties = Object.keys(props)
    .filter((p) => !["children", "options"].includes(p))
    .filter((p) => props[p] !== "") // Don't render empty props
    .map((p) => `${p}="${props[p]}"`)
    .join("\n");

  if (props.children) {
    code += `<${type} ${properties}>${props.children}</${type}>\n`;
  } else if (children.length > 0) {
    const _children = generateCodeForChildren(children);
    code += `<${type} ${properties}>\r\n${_children}</${type}>\n`;
  } else if (props.options) {
    const _children = generateChildrenFromOptions(type, props.options);
    code += `<${type} ${properties}>\r\n${_children}</${type}>\n`;
  } else {
    if (!noEndTags.includes(type)) {
      code += `<${type} ${properties}></${type}>\n`;
    } else {
      code += `<${type} ${properties} />\n`;
    }
  }

  return code;
}

function generateChildrenFromOptions() {}
