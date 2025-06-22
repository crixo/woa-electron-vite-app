import { expect } from 'chai'
import { getConfig } from '../../src/main/config.js'
import os from 'os'

//NODE_OPTIONS=--import=./test/setup.js npx electron-mocha tests/main --renderer=false


describe('Load Config', function  () {

  it('should have a mainWindow configuration', async function () {
    // const filename = ''//fileURLToPath(import.meta.url);
    // const __dirname = dirname(filename);
    const homeDir = os.homedir();
    const config = await getConfig()
    expect(config).to.be.an('object')
    expect(config.mainWindow).to.exist
  })
})