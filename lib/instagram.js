var sys = require('sys');
var http = require('http');
var https = require('https');
var querystring = require('querystring');
var Instagram = {};


// ==============================================
// API Class
// ==============================================
Instagram.API = function(access_token) {
    this.access_token = access_token;
    this.host = 'api.instagram.com';
    this.path = '/v1';
    
    this.users = new Instagram.API.Users(this);
    this.relationships = new Instagram.API.Relationships(this);
    this.media = new Instagram.API.Media(this);
    this.comments = new Instagram.API.Comments(this);
    this.likes = new Instagram.API.Likes(this);
    this.tags = new Instagram.API.Tags(this);
    this.locations = new Instagram.API.Locations(this);
};

Instagram.API.prototype.fetch = function(path, params, callback) {
    if(arguments.length == 2) {
        callback = params;
        params = {};
    }
    params.access_token = this.access_token;
    
    var options = {
        host: this.host,
        path: this.path + path + '?' + querystring.stringify(params),
    };
    
    https.get(options, function(res) {
        var content = '';
        res.on('data', function(chunk) {
            content += chunk;
        });
        res.on('end', function() {
            var result = JSON.parse(content);
            //console.log(result);
            
            if(result.meta.code == 200) {
                callback(result.data, result.meta.code);
            } else {
                callback(result.meta, result.meta.code);
            }
        });
    });
};


// ==============================================
// User Endpoints　Class
// ==============================================
Instagram.API.Users = function(api) {
    this.api = api;
}

Instagram.API.Users.prototype.id = function(user_id, callback) {
    this.api.fetch('/users/' + user_id, callback);
};

Instagram.API.Users.prototype.self = function(params, callback) {
    if(arguments.length == 1) {
        callback = params;
        params = {};
    }
    this.api.fetch('/users/self/feed', params, callback);
};

Instagram.API.Users.prototype.media = function(user_id, params, callback) {
    if(arguments.length == 2) {
        callback = params;
        params = {};
    }
    this.api.fetch('/users/' + user_id + '/media/recent', params, callback);
};

Instagram.API.Users.prototype.search = function(query, callback) {
    this.api.fetch('/users/search', {q: query}, callback);
};


// ==============================================
// Relationship Endpoints Class
// ==============================================
Instagram.API.Relationships = function(api) {
    this.api = api;
};

Instagram.API.Relationships.prototype.follows = function(user_id, callback) {
    this.api.fetch('/users/' + user_id + '/follows', callback);
};

Instagram.API.Relationships.prototype.followed_by = function(user_id, callback) {
    this.api.fetch('/users/' + user_id + '/followed-by', callback);
};

Instagram.API.Relationships.prototype.requested_by = function(callback) {
    this.api.fetch('/users/self/requested-by', callback);
};

Instagram.API.Relationships.prototype.relationship = function(user_id, callback) {
    this.api.fetch('/users/' + user_id + '/relationship', callback);
};


// ==============================================
// Media Endpoints Class
// ==============================================
Instagram.API.Media = function(api) {
    this.api = api;
};

Instagram.API.Media.prototype.id = function(media_id, callback) {
    this.api.fetch('/media/' + media_id, callback);
};

Instagram.API.Media.prototype.search = function(params, callback) {
    this.api.fetch('/media/search', params, callback);
};

Instagram.API.Media.prototype.popular = function(callback) {
    this.api.fetch('/media/popular', callback);
};


// ==============================================
// Comment Endpoints Class
// ==============================================
Instagram.API.Comments = function(api) {
    this.api = api;
};

Instagram.API.Comments.prototype.comments = function(media_id, callback) {
    this.api.fetch('/media/' + media_id + '/comments', callback);
};


// ==============================================
// Like Endpoints Class
// ==============================================
Instagram.API.Likes = function(api) {
    this.api = api;
};

Instagram.API.Likes.prototype.likes = function(media_id, callback) {
    this.api.fetch('/media/' + media_id + '/likes', callback);
};


// ==============================================
// Tag Endpoints Class
// ==============================================
Instagram.API.Tags = function(api) {
    this.api = api;
};

Instagram.API.Tags.prototype.name = function(tag_name, callback) {
    this.api.fetch('/tags/' + tag_name, callback);
};

Instagram.API.Tags.prototype.media = function(tag_name, params, callback) {
    this.api.fetch('/tags/' + tag_name + '/media/recent', params, callback);
};

Instagram.API.Tags.prototype.search = function(query, callback) {
    this.api.fetch('/tags/search', {q: query}, callback);
};


// ==============================================
// Location Endpoints Class
// ==============================================
Instagram.API.Locations = function(api) {
    this.api = api;
};

Instagram.API.Locations.prototype.id = function(location_id, callback) {
    this.api.fetch('/locations/' + location_id, callback);
};

Instagram.API.Locations.prototype.media = function(location_id, params, callback) {
    if(arguments.length == 2) {
        callback = params;
        params = {};
    }
    this.api.fetch('/locations/' + location_id + '/media/recent', params, callback);
};

Instagram.API.Locations.prototype.search = function(params, callback) {
    this.api.fetch('/locations/search', params, callback);
};


exports.API = Instagram.API;