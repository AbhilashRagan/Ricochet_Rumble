var count = localStorage.length;
var buttons = document.getElementsByClassName("buttons");
for(let i = 0;i < count;i++)
{
    let button = document.createElement("button");
    button.setAttribute("number", String(i));
    button.onclick = function(){
        display(button);
    };
    button.innerHTML = "Match_0" + String(i + 1);
    buttons[0].appendChild(button);
    buttons[0].appendChild(document.createElement("br"));
    buttons[0].appendChild(document.createElement("br"));
}

function display(e)
{
    var displaylog = document.getElementsByClassName("logs");
    var log = localStorage.getItem(parseInt(e.getAttribute("number")));
    var moves = log.split(",");
    console.log(moves);
    buttons[0].style.display = "none";
    displaylog[0].style.display = "block";
    for(let i in moves)
    {
        let displaymove = document.createElement("p");
        displaymove.innerHTML = moves[i];
        displaylog[0].appendChild(displaymove);
    }
    let button = document.createElement("button");
    button.innerHTML = "Go Back";
    button.onclick = function(){
        window.location.reload();
    };
    let replay = document.createElement("button");
    replay.innerHTML = "Replay";
    replay.onclick = function(){
        sessionStorage.setItem(0, e.getAttribute("number"));
        window.location.href = "Replay.html";
    }
    displaylog[0].appendChild(replay);
    displaylog[0].appendChild(document.createElement("br"));
    displaylog[0].appendChild(document.createElement("br"));
    displaylog[0].appendChild(button);
}