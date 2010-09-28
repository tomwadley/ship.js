
function Mod(modURI) {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", modURI, false);
    xmlhttp.send();
    
    var xmlDoc = xmlhttp.responseXML;
    
    // TODO: version checks etc
    
    var rootNode = xmlDoc.documentElement;
}

Mod.prototype.parseRootNode = function(rootNode) {
    for (var i = 0; i < rootNode.childNodes.length; i++) {
        switch (rootNode.childNodes[i].nodeName) {
            case "foo":
                break;
            case "bar":
                break;
            default:    
                alert("Bad node");
        }
    }
}

