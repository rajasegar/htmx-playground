export default function updateInspector(state) {
  const { selectedId } = state
  const inspector = document.querySelector('inspector-panel')
  inspector.setAttribute('id', selectedId)
}
