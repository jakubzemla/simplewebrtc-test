import './VideoWrapper.css'

const VideoWrapper = () => {
    return ( 
        <div cz-shortcut-listen="true">
            <h1>Receiver test page</h1>
            <figure>
                <div id="videoContainer">
                    <video autoPlay={true} id="cXfdLGLU2dsaFqHVCTC9_video_incoming" loop="" controls="" width="100%" height="100%"></video>
                </div>
                <div id="additional-controls" className="additcontrols">
                    <table id="tableconnection">
                        <tbody><tr>
                            <td className="namecolumn1">Signaling server:</td>
                            <td className="textcolumn"><input type="text" id="sigserverurl" value="https://rtc.medialooks.com:8889" readOnly /></td>
                            <td className="namecolumn2">Room name:</td>
                            <td><input type="text" id="roomname" readOnly value="Room_aws_dev" /></td>
                            <td className="buttoncolumn"><button id="connecttosigserv" type="button" data-state="enabled">Connect</button></td>
                        </tr>
                        <tr>
                            <td>Streaming from:</td>
                            <td colSpan="3"><input type="text" id="targetpeer" defaultValue="PgmsPreview" /></td>
                            <td><button id="connecttopeer" type="button" data-state="enabled">Connect</button></td>
                        </tr>
                        <tr>
                            <td>Received messages:</td>
                            <td colSpan="3"><textarea id="received"></textarea></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Send message:</td>
                            <td colSpan="3"><input type="text" id="message" defaultValue="A message to send" /></td>
                            <td><button id="sendmessage" type="button" data-state="message" title="Send message to peer">Send</button></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <figcaption>
                    Medialooks | <a href="http://www.medialooks.com/">medialooks.com</a>
                </figcaption>
            </figure>
        </div>
    )
}

export default VideoWrapper