const ipfsApi = require('ipfs-api')

const ipfs = ipfsApi({
  host: 'localhost',
  port: '5001',
  protocol: 'http'
})

async function uploadFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const buffer = Buffer.from(reader.result)
      ipfs.add(buffer)
      .then(files => {
        resolve(files)
      })
      .catch(error => reject(error))
    }
    reader.readAsArrayBuffer(file)
  })
}

async function onImageChange(event) {
  const file = event.target.files[0]
  const files = await uploadFile(file)
  const multihash = files[0].hash
  console.log(multihash)
}

const file = document.querySelector('#file')

file.addEventListener('change', onImageChange)
