import { store } from './store'
export default function handleDrop (ev) {
  ev.preventDefault()
  ev.stopImmediatePropagation()
  const id = ev.dataTransfer.getData('id')
  const payload = {}
  payload.type = id
  payload.parentName = 'root'
  payload.rootParentType = 'root'

  store.dispatch({ type: 'ADD_COMPONENT', payload })
}
