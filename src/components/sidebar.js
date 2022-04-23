const elements = [
    'div',
    'button',
    'form',
    'label',
    'input'
];

const template = document.createElement("template");
const elementLi = elements.map(e => {
    return `<li class="p-1 m-1 rounded cursor-move hover:bg-indigo-600 before:content-['::'] before:pr-2" id="${e}" draggable="true">${e}</li>`; 
    
}).join('\n');
template.innerHTML = `
<ul>
${elementLi}
</ul>
`;

class SidebarMenu extends HTMLElement {
    constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
   
}

window.customElements.define("sidebar-menu", SidebarMenu);
