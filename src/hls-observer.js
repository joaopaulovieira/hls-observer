import Transcriptore from 'transcriptore.js/dist/transcriptore.modern.mjs'

export default class HLSObserver extends Transcriptore {
  constructor() {
    super()
    console.log('instance created!') // eslint-disable-line no-console
  }

  readManifest(buffer) {
    const manifest = this.readBuffer(buffer)
    const linesArray = manifest.split('\n')
    const itemsArray = manifest.replace(/\n/g, ',').split(',')

    console.log('>>>>>> manifest:', `\n\n${manifest}\n\n`) // eslint-disable-line no-console
    console.log('>>>>>> array of manifest lines:', linesArray) // eslint-disable-line no-console
    console.log('>>>>>> array of manifest items:', itemsArray) // eslint-disable-line no-console

    const customizedLinesArray = [...linesArray]
    customizedLinesArray.forEach((item, iterator) => {
      if (item.match(/.m3u8/g)) {
        customizedLinesArray[iterator - 1] = `${item} - ${customizedLinesArray[iterator - 1]}`
        customizedLinesArray.splice(iterator, 1)
      }
    })
    customizedLinesArray.forEach((line, iterator) => console.log(`Line ${++iterator} - ${line}`)) // eslint-disable-line
  }
}
