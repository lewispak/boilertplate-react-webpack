const { Profiler } = require('react')

const env = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[env]
const connection = require('knex')(config)

module.exports = {
    capitalizeFirstLetter,
    getArtworks,
    getArtworkById,
    getCharityById,
    addNewArtwork,
    artIsSold,
    getAllUsers,
    getAllCharities
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function getArtworks(db = connection) {
    return db('artworks')
        .join('users as artist', 'artist.id', 'artworks.artist_id')
        .join('users as cause', 'cause.id', 'artworks.cause_id')
        .select(
            'artworks.id as id',
            'artworks.name as artworkName',
            'price',
            'image',
            'artist.id as artistId',
            'artist.name as artistName',
            'artist.profile_picture as artistProfile',
            'artist.about as artistAbout',
            'cause.id as causeId',
            'cause.name as causeName',
            'is_available'
        )
        .then((result) => {
            return result.map((artwork) => {
                return {
                    id: artwork.id,
                    name: artwork.artworkName,
                    image: artwork.image,
                    price: artwork.price,
                    artistId: artwork.artistId,
                    artistName: capitalizeFirstLetter(artwork.artistName),
                    artistProfile: artwork.artistProfile,
                    artistAbout: artwork.artistAbout,
                    causeId: artwork.causeId,
                    causeName: capitalizeFirstLetter(artwork.causeName),
                    isAvailable: artwork.is_available
                }
            })
        })
}

function getArtworkById(id, db = connection) {
    return db('artworks')
        .join('users as artist', 'artist.id', 'artworks.artist_id')
        .join('users as cause', 'cause.id', 'artworks.cause_id')
        .select(
            'artworks.id as id',
            'artworks.name as artworkName',
            'price',
            'description',
            'image',
            'artist.id as artistId',
            'artist.name as artistName',
            'cause.id as causeId',
            'cause.name as causeName',
            'is_available'
        )
        .where('artworks.id', id)
        .first()
        .then((artwork) => {
            return {
                id: artwork.id,
                name: artwork.artworkName,
                image: artwork.image,
                price: artwork.price,
                description: artwork.description,
                artistId: artwork.artistId,
                artistName: artwork.artistName,
                causeId: artwork.causeId,
                causeName: artwork.causeName,
                isAvailable: artwork.is_available
            }
        })
}

function getCharityById(id, db = connection) {
    return db('users')
        .leftJoin('artworks', 'users.id', 'artworks.cause_id')
        .leftJoin('users as artists', 'artists.id', 'artworks.artist_id')
        .select(
            'users.id as charityId',
            'users.username',
            'users.name as charityName',
            'users.email',
            'users.profile_picture as profilePicture',
            'users.about',
            'users.is_Charity',
            'artworks.id as artworkId',
            'artworks.name as artworkName',
            'artworks.cause_id as causeId',
            'artworks.artist_id as artistId',
            'artworks.description',
            'artworks.image as artImage',
            'artworks.price',
            'artworks.is_available as isAvailable',
            'artists.name as artistName'
        )
        .where('users.id', id)
        .then((result) => {
            return {
                id: result[0].charityId,
                charityName: result[0].charityName,
                username: result[0].username,
                email: result[0].email,
                profilePicture: result[0].profilePicture,
                about: result[0].about,
                isCharity: result[0].is_Charity,
                artworks: !result[0] ? [] : result.map(art => {
                    return {
                        id: art.artworkId,
                        name: art.artworkName,
                        image: art.artImage,
                        price: art.price,
                        artistId: art.artistId,
                        causeId: art.causeId,
                        artistName: art.artistName,
                        isAvailable: art.isAvailable
                    }
                })
            }
        })
}

function addNewArtwork(formData, db = connection) {
    return db('artworks')
        .join('users as artist', 'artist.id', 'artworks.artist_id')
        .join('users as cause', 'cause.id', 'artworks.cause_id')
        .insert({
            image: formData.image,
            name: formData.name,
            description: formData.description,
            price: formData.price,
            artist_id: formData.artistId,
            cause_id: formData.causeId,
            is_available: true
        })
        .then((id) => {
            return getArtworkById(id[0])
        })
        .catch((err) => console.log(err.message))
}

function artIsSold(id, db = connection) {
    return db('artworks')
        .whereIn('id', id)
        .update({ is_available: false })
}

function getAllUsers(db = connection) {
    return db('users')
        .select()
        .where('is_Charity', false)
}

function getAllCharities(db = connection) {
    return db('users')
        .select()
        .where('is_Charity', true)
}
