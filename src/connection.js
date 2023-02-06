import $ from 'jquery'
import SimpleWebRTC from 'simplewebrtc'

var videoEl = null;
var signalingServer = location.origin;
var room = location.pathname.split('/')[1];
var targetId = location.pathname.split('/')[2];
var argsList = {};
window.location.search.substr(1).split("&").forEach(function (item) { argsList[item.split("=")[0]] = item.split("=")[1] })


// create webrtc connection
var webrtc = new SimpleWebRTC({
    target: targetId,
    url: signalingServer,
              iceServers:  [{urls: 'stun:stun.l.google.com:19302'},{username: "test_user", credential: "medialooks", urls: ["turn:67.220.183.67:3478"]} ],
    localVideoEl: '',
    remoteVideosEl: '',
    autoRequestMedia: false,
    debug: false,
    detectSpeakingEvents: true,
    autoAdjustMic: false,
});

// when it's ready, join if we got a room from the URL
webrtc.on('readyToCall', function () {
    $('#connecttosigserv').attr('data-state', 'enabled');
    $('#roomname').attr('value', room);
    $('#sigserverurl').attr('value', signalingServer);

    webrtc.setInfo('', webrtc.connection.connection.id, ''); // Store strongId
      
    if (room) {
        webrtc.joinRoom(room);
    }
});

//Handle incoming video from target peer
webrtc.on('videoAdded', function (video, peer) {
    console.log('video added', peer);
    var container = document.getElementById('videoContainer');

    $('#connecttopeer').attr('data-state', 'enabled');
    $('#targetpeer').attr('value', targetId);

video.setAttribute('loop', '');
video.setAttribute('autoplay', 'true');
video.setAttribute('controls', '');
video.setAttribute('width', '100%');
video.setAttribute('height', '100%');

    videoEl = video;
    while (container.hasChildNodes())
        container.removeChild(container.lastChild);

    container.appendChild(video);
    webrtc.stopLocalVideo();
    video.muted = true;
    video.play();
});

//Handle removing video by target peer
webrtc.on('videoRemoved', function (video, peer) {
    console.log('video removed ', peer);
    var container = document.getElementById('videoContainer');
    if (peer.id == targetId || peer.strongId == targetId || peer.nickName == targetId) {

        $('#connecttopeer').attr('data-state', 'disabled');
        $('#targetpeer').attr('value', '');

        videoEl = null;
        while (container.hasChildNodes())
            container.removeChild(container.lastChild);

        var videoStub = document.createElement('video');
        container.appendChild(videoStub);
    }
});

webrtc.on('channelMessage', function (peer, label, data) {
    if (data.type == 'custommessage') {
        $('#received').append(data.payload + '\n');
        $('#received').scrollTop($('#received')[0].scrollHeight);
    }
});

//Control handlers
$(document).ready(function () {
    $('#message').keypress(function (e) {
        if ((e.which || e.keyCode) === 13 && $('#message').val())
            webrtc.sendDataChannelMessageToPeer(targetId, $('#message').val());
    });
    $('#sendmessage').click(function () {
        if ($('#message').val())
            webrtc.sendDataChannelMessageToPeer(targetId, $('#message').val());
    });
});