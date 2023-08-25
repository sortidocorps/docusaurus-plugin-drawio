import fs from 'fs'

/**
 * Download Drawio File
 *
 * @param url of the drawio schema
 * @returns the content of the file downloaded
 */
function downloadDrawioFile(url: string): Promise<string> {
  const request = new Request(url, {
    method: 'GET',
  })

  const fileName = 'drawio.drawio'

  return fetch(request)
    .then((response) => {
      if (response.status === 200) {
        // Delete if the file already exist.
        if (fs.existsSync(fileName)) {
          fs.unlinkSync(fileName)
        }

        // File is downloaded.
        return response.blob()
      } else {
        throw new Error('Error when download draw.io file :' + response.status)
      }
    })
    .then((blob) => {
      // Make the file
      const file = new File([blob], fileName, {
        type: 'application/octet-stream',
      })

      // Return the content of the file
      return file.text()
    })
}

export { downloadDrawioFile }
