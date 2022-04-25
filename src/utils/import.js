import { fileOpen, fileSave } from 'browser-nativefs'

export async function loadFromJSON() {
  const blob = await fileOpen({
    extensions: ['.json'],
    mimeTypes: ['application/json'],
  })

  const contents = await new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsText(blob, 'utf8')
    reader.onloadend = () => {
      if (reader.readyState === FileReader.DONE) {
        resolve(reader.result)
      }
    }
  })

  try {
    return JSON.parse(contents)
  } catch (error) {
    console.error(error)
  }
}

export async function saveAsJSON(components) {
  const serialized = JSON.stringify(components)
  const name = `components.json`

  await fileSave(
    new Blob([serialized], { type: 'application/json' }),
    {
      fileName: name,
      description: 'Crayons Playground file',
    },
    window.handle
  )
}
