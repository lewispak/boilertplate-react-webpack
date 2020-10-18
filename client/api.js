// import request from 'superagent'

// const rootUrl = '/api/v1/donart'

// export function getArt () {
//   return request.get(rootUrl).then((res) => {
//     return res.body
//   })
// }
// export function editProfile (id, updatedInfo) {
//   return request
//     .post(rootUrl + '/editProfile/' + id)
//     .send(updatedInfo)
//     .then((res) => {
//       return res.body
//     })
// }
// export function removeArtwork (id) {
//   return request
//     .patch(rootUrl + '/removeArtwork')
//     .send(id)
//     .then((res) => {
//       return res.body
//     })
// }