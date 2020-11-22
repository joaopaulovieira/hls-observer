import Transcriptore from 'transcriptore.js/dist/transcriptore.modern.mjs'

export default class HLSObserver {
  constructor() {
    this.parser = new Transcriptore()
    console.log('instance created!') // eslint-disable-line no-console
  }

  fetchAndParse(url, fetchOptions = {}) {
    fetch(url, fetchOptions).then(response => {
      const fetchReader = response.body.getReader()
      fetchReader.read().then(buffer => this.readManifest(buffer))
    })
  }

  readManifest(buffer) {
    const manifest = this.parser.readBuffer(buffer)

    const linesArray = manifest.split('\n')
    const customizedLinesArray = manifest.replace(/.m3u8\n/g, '.m3u8 - ').split('\n')
    const itemsArray = manifest.replace(/\n/g, ',').split(',')

    console.log('>>>>>> manifest:', `\n\n${manifest}\n\n`) // eslint-disable-line no-console
    console.log('>>>>>> array of manifest lines:', linesArray) // eslint-disable-line no-console
    console.log('>>>>>> array of manifest items:', itemsArray) // eslint-disable-line no-console
    customizedLinesArray.forEach((line, iterator) => console.log(`Line ${++iterator}: ${line}`)) // eslint-disable-line
  }
}
