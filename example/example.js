var sys = require('sys');
var instagram = require('./lib/instagram');

var callback = function(message) {
    return function(data, code) {
        console.log(message);
        console.log("---------------------");
        console.log(sys.inspect(data));
        console.log("---------------------\n");
    };
};

// Set your access token
var access_token = '';
// API Client
var api = new instagram.API(access_token);

// User Endpoints
api.users.id(148920, callback('/users/{user-id}'));
api.users.self(callback('/users/self/feed'));
api.users.media(148920, callback('/users/{user-id}/media/recent'));
api.users.search('summer', callback('/users/search'));

// Relationship Endpoints
api.relationships.follows(148920, callback('/users/{user-id}/follows'));
api.relationships.followed_by(148920, callback('/users/{user-id}/followed-by'));
api.relationships.requested_by(callback('/users/self/requested-by'));
api.relationships.relationship(148920, callback('/users/{user-id}/relationship'));

// Media Endpoints
api.media.id(22914337, callback('/media/{media-id}'));
api.media.search({lat: 48.858844, lng: 2.294351}, callback('/media/search'));
api.media.popular(callback('/media/popular'));

// Comment Endpoints
api.comments.comments(22914337, callback('/media/{media-id}/comments'));

// Like Endpoints
api.likes.likes(22914337, callback('/media/{media-id}/likes/'));

// Location Endpoints
api.locations.id(1, callback('/locations/{location-id}'));
api.locations.media(1, callback('/locations/{location-id}/media/recent'));
api.locations.search({lat: 48.858844, lng: 2.294351}, callback('/locations/search'));
