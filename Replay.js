const timer = window.setInterval(move,2000);
var logid = sessionStorage.getItem(0);
var moves = localStorage.getItem(logid).split(",");
console.log(moves);
var movecount = moves.length;
var x = 0;
function move()
{
    let details = moves[x].split(":");
    if(details[2] == "position")
    {
        let final = details[4].replace("[",'');
        final = final.replace("]",'');
        let move = final.split(";");
        let peice = document.getElementById(details[0] + details[1]);
        var imgs = document.getElementsByTagName("img");
        var img = null;
        for(let i in imgs)
        {
            if(imgs[i].getAttribute("colour") == details[0] && imgs[i].getAttribute("name") == details[1])
            {
                img = imgs[i];
                break;
            }
        }
        peice.style.gridRow = parseInt(move[0]);
        peice.style.gridColumn = parseInt(move[1]);
        img.removeAttribute("row");
        img.removeAttribute("column");
        img.setAttribute("row", move[0]);
        img.setAttribute("column", move[1]);
        console.log(img);
    }
    if(details[2] == "rotation" && (details[1] == "ricochet_01" || details[1] == "ricochet_02"))
    {
        let peice = document.getElementById(details[0] + details[1]);
        var imgs = document.getElementsByTagName("img");
        var img = null;
        for(let i in imgs)
        {
            if(imgs[i].getAttribute("colour") == details[0] && imgs[i].getAttribute("name") == details[1])
            {
                img = imgs[i];
                break;
            }
        }
        if(img.getAttribute("direction") == "clock")
        {
            img.removeAttribute("direction");
            img.setAttribute("direction", "anticlock");
            img.src = "Resources/Ricochet_rotated.png";
        }
        else if(img.getAttribute("direction") == "anticlock")
        {
            img.removeAttribute("direction");
            img.setAttribute("direction", "clock");
            img.src = "Resources/Ricochet.png";
        }
    }
    if(details[2] == "rotation" && (details[1] == "semiricochet_01" || details[1] == "semiricochet_02"))
    {
        let final = details[3];
        final = final.replace('[','');
        final = final.replace(']','');
        let move = final.split(";");
        let peice = document.getElementById(details[0] + details[1]);
        var imgs = document.getElementsByTagName("img");
        var img = null;
        for(let i in imgs)
        {
            if(imgs[i].getAttribute("colour") == details[0] && imgs[i].getAttribute("name") == details[1])
            {
                img = imgs[i];
                break;
            }
        }
        img.removeAttribute("direction");
        img.setAttribute("direction", move[1]);
        if(move[1] == "0")
        {
            img.src = "Resources/Semi Ricochet01.png";
        }
        else if(move[1] == "1")
        {
            img.src = "Resources/Semi Ricochet02.png";
        }
        else if(move[1] == "2")
        {
            img.src = "Resources/Semi Ricochet03.png";
        }
        else if(move[1] == "3")
        {
            img.src = "Resources/Semi Ricochet04.png";
        }
    }
    if(details[2] == "destroy")
    {
        let peice = document.getElementById(details[0] + details[1]);
        var grid = document.getElementsByClassName("grid");
        grid[0].removeChild(peice);
    }
    x = x + 1;
    if(x == movecount)
    {
        clearInterval(timer);
        gameover();
    }
}

function gameover()
{
    var over = document.createElement("div");
    over.setAttribute("class","gameover");
    var text = document.createElement("h1");
    text.innerHTML = "Game Over";
    over.appendChild(text);
    document.body.appendChild(over);
}