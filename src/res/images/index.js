/* eslint-disable global-require */
const images = {
    buttons: {
        add: require('./Buttons/AddButton/add_button.png'),
    },
    defaults: {
        albumCover: require('./Defaults/AlbumArtwork/default_album_cover_bg_image.png'),
        playlistBackground: require('./Defaults/PlaylistImage/default_item_bg_image.png'),
    },
    icons: {
        plus: require('./Icons/Plus/plus_icon.png'),
        social: {
            spotify: require('./Icons/Social/spotify_icon.png'),
            youtube: require('./Icons/Social/youtube_icon.png'),
        },
        trash: require('./Icons/Trash/trash_icon.png'),
    },
}

export default images
