module.exports = {
    toggleFavoriteSession: (parent, { id }, { dataSources }, info) => {
        return dataSources.sessionAPI.toggleFavoriteSession(id);
    },
    addNewSession(parent, { session }, { dataSources }, ifo) {
        return dataSources.sessionAPI.addSession(session);
    }
}