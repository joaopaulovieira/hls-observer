import Transcriptore from 'transcriptore.js/dist/transcriptore.modern.mjs'

export default class HLSObserver extends Transcriptore {
  constructor() {
    super()
    console.log('instance created!') // eslint-disable-line no-console
  }

  readManifest(buffer) {
    const manifest = this.readBuffer(buffer)
    const linesArray = manifest.split('\n')
    const customizedLinesArray = manifest.replace(/.m3u8\n/g, '.m3u8 - ').split('\n')
    const itemsArray = manifest.replace(/\n/g, ',').split(',')

    console.log('>>>>>> manifest:', `\n\n${manifest}\n\n`) // eslint-disable-line no-console
    console.log('>>>>>> array of manifest lines:', linesArray) // eslint-disable-line no-console
    console.log('>>>>>> array of manifest items:', itemsArray) // eslint-disable-line no-console
    customizedLinesArray.forEach((line, iterator) => console.log(`Line ${++iterator}: ${line}`)) // eslint-disable-line
  }
}
