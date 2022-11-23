import { urlUtils } from 'jimu-core'
//export default class ShortLink {
//}
export async function fetchShortLink (href: string): Promise<any> {
  const DEBUG = false
  const BITLY_URL = 'https://arcg.is/prod/shorten'

  const promise = new Promise((resolve, reject) => {
    let uri = href// location.href;
    uri = encodeURIComponent(uri) // encode long url
    uri = urlUtils.updateQueryStringParameter(BITLY_URL, 'longUrl', uri) // DO NOT encode BITLY_URL+param
    uri = urlUtils.updateQueryStringParameter(uri, 'f', 'json')

    fetch(uri).then(async response => await response.json())
      .then(json => {
        const shrotLink = json.data.url

        if (DEBUG) {
          console.log('A:long_url==>' + json.data.long_url)
          console.log('B:s_url==>' + shrotLink)
        }

        resolve(shrotLink)
      })
      .catch(error => {
        console.log('Share: short-link, Fetch Error: ', error)

        reject(href)
      })
  })
  return promise
}
