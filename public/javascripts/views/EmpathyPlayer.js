define(['text!templates/empathy-player.html','SC'], function (playerView) {
    var link; 
    function initializePlayer (songName) {
        SC.initialize({
            client_id: "8a6c50414b47a87c68c90c6c8e3abedf",
            redirect_uri: "http://example.com/callback.html",
        });
        SC.get('/tracks', { q: songName }, function (tracks) {
            console.log(tracks);
            SC.oEmbed(tracks  [0].permalink_url, {auto_play:true}, function(oembed){
                console.log("oEmbed response: ", oembed);
                $('#player').html(oembed.html);
            });
        });
    }

    var EmpathyPlayerView = Backbone.View.extend({
        id: '#dashboard-space',
        render: function () {
            this.$el = $(this.id);
            this.$el.html(_.template(playerView));
            $.get( "/empathy", function( data ) {
                $('#last-status').html(data.status);
                $('#emotion').html(data.emotion);
                initializePlayer(data.song);
            }, "json" );
        }
    });

    return new EmpathyPlayerView();
});
