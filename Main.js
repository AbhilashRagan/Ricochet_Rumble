var positions = 
{
    "red" : {
                "tank_01" : [1, 1], 
                "semiricochet_01" : [1, 2],
                "ricochet_01" : [1, 3],
                "titan" : [1, 4],
                "canon" : [1, 5],
                "ricochet_02" : [1, 6],
                "semiricochet_02" : [1, 7],
                "tank_02" : [1, 8]
            },
    "blue" : {
                "tank_01" : [8, 1], 
                "semiricochet_01" : [8, 2],
                "ricochet_01" : [8, 3],
                "titan" : [8, 4],
                "canon" : [8, 5],
                "ricochet_02" : [8, 6],
                "semiricochet_02" : [8, 7],
                "tank_02" : [8, 8]
    }
}

var moves = [];

var selection = [];

var hovers = [];
var selected = false;
var turn = "red";

var trash = [];
var pressedUndo = false;

var time = 15;
var caller = window.setInterval(decrementTimer, 1000);
var isPaused = false;
var displayTimer = document.getElementsByClassName("timer");

function undo()
{
    swapturns();
    let result = moves[moves.length - 1].split(":");
    if(result[2] == "position")
    {
        let initial = result[3];
        initial = initial.replace("[","");
        initial = initial.replace("]","");
        let move = initial.split(";");
        let peice = document.getElementById(result[0] + result[1]);
        var imgs = document.getElementsByTagName("img");
        var img = null;
        for(let i in imgs)
        {
            if(imgs[i].getAttribute("colour") == result[0] && imgs[i].getAttribute("name") == result[1])
            {
                img = imgs[i];
                break;
            }
        }
        peice.style.gridRow = parseInt(move[0]);
        peice.style.gridColumn = parseInt(move[1]);
        img.removeAttribute("row");
        img.removeAttribute("column");
        img.setAttribute("row",move[0]);
        img.setAttribute("column",move[1]);
        positions[result[0]][result[1]] = [parseInt(move[0]), parseInt(move[1])];
    }
    if(result[2] == "rotation")
    {
        var imgs = document.getElementsByTagName("img");
        var img = null;
        for(let i in imgs)
        {
            if(imgs[i].getAttribute("colour") == result[0] && imgs[i].getAttribute("name") == result[1])
            {
                img = imgs[i];
                break;
            }
        }
        if(result[1] == "ricochet_01" || result[1] == "ricochet_02")
        {
            if(img.getAttribute("direction") == "clock")
            {
                img.src = "Resources/Ricochet_rotated.png";
                img.setAttribute("direction", "anticlock");
            }
            else if(img.getAttribute("direction") == "anticlock")
            {
                img.src = "Resources/Ricochet.png";
                img.setAttribute("direction", "clock");   
            }
        }
        if(result[1] == "semiricochet_01" || result[1] == "semiricochet_02")
        {
            let initial = result[3];
            initial = initial.replace("[","");
            initial = initial.replace("]","");
            let move = initial.split(";");
            img.setAttribute("direction",move[0]);
            if(move[0] == 0)
            {
                img.src = "Resources/Semi Ricochet01.png";
            }
            else if(move[0] == 1)
            {
                img.src = "Resources/Semi Ricochet02.png";
            }
            else if(move[0] == 2)
            {
                img.src = "Resources/Semi Ricochet03.png";
            }
            else if(move[0] == 3)
            {
                img.src = "Resources/Semi Ricochet04.png";
            }
        }
    }
    if(result[2] == "destroy")
    {
        var imgs = document.getElementsByTagName("img");
        var img = null;
        for(let i in imgs)
        {
            if(imgs[i].getAttribute("colour") == result[0] && imgs[i].getAttribute("name") == result[1])
            {
                img = imgs[i];
                break;
            }
        }
    }
    trash.push(moves[moves.length - 1]);
    moves.pop();
    pressedUndo = true;
}

function redo()
{
    swapturns();
    let result = trash[trash.length - 1].split(":");
    if(result[2] == "position")
    {
        let final = result[4];
        final = final.replace("[","");
        final = final.replace("]","");
        let move = final.split(";");
        let peice = document.getElementById(result[0] + result[1]);
        var imgs = document.getElementsByTagName("img");
        var img = null;
        for(let i in imgs)
        {
            if(imgs[i].getAttribute("colour") == result[0] && imgs[i].getAttribute("name") == result[1])
            {
                img = imgs[i];
                break;
            }
        }
        peice.style.gridRow = parseInt(move[0]);
        peice.style.gridColumn = parseInt(move[1]);
        img.removeAttribute("row");
        img.removeAttribute("column");
        img.setAttribute("row",move[0]);
        img.setAttribute("column",move[1]);
        positions[result[0]][result[1]] = [parseInt(move[0]), parseInt(move[1])];
    }
    if(result[2] == "rotation")
    {
        var imgs = document.getElementsByTagName("img");
        var img = null;
        for(let i in imgs)
        {
            if(imgs[i].getAttribute("colour") == result[0] && imgs[i].getAttribute("name") == result[1])
            {
                img = imgs[i];
                break;
            }
        }
        if(result[1] == "ricochet_01" || result[1] == "ricochet_02")
        {
            if(img.getAttribute("direction") == "clock")
            {
                img.src = "Resources/Ricochet_rotated.png";
                img.setAttribute("direction", "anticlock");
            }
            else if(img.getAttribute("direction") == "anticlock")
            {
                img.src = "Resources/Ricochet.png";
                img.setAttribute("direction", "clock");   
            }
        } 
        if(result[1] == "semiricochet_01" || result[1] == "semiricochet_02")
        {
            let initial = result[3];
            initial = initial.replace("[","");
            initial = initial.replace("]","");
            let move = initial.split(";");
            img.setAttribute("direction",move[1]);
            if(move[1] == 0)
            {
                img.src = "Resources/Semi Ricochet01.png";
            }
            else if(move[1] == 1)
            {
                img.src = "Resources/Semi Ricochet02.png";
            }
            else if(move[1] == 2)
            {
                img.src = "Resources/Semi Ricochet03.png";
            }
            else if(move[1] == 3)
            {
                img.src = "Resources/Semi Ricochet04.png";
            }
        }
    }
    moves.push(trash[trash.length - 1]);
    trash.pop();
}

function pause()
{
    if(!isPaused)
    {
        clearInterval(caller);
        isPaused = true;
    }
}

function play()
{
    if(isPaused)
    {
        caller = setInterval(decrementTimer, 1000);
        isPaused = false;
    }
}

function reset()
{
    window.location.reload();
}

function decrementTimer()
{
    time = time - 1;
    console.log(time);
    if(time == 0)
    {
        clearInterval(caller);
        gameover();
    }
    displayTimer[0].innerHTML = String(time);
}

function resetTimer()
{
    time = 15;
}

function checkgreens(colour, name, row, column)
{
    var greens = [];
    selection = [colour, name];
    const grid = document.querySelector(".grid");
    for(let i = -1;i < 2;i++)
    {
        for(let j = -1;j < 2;j++)
        {
            let pose = [row + i, column + j];
            let flag = 1;
            for(let a in positions)
            {
                for(let b in positions[a])
                {
                    if((pose[0] >= 1 && pose[1] >= 1) && (pose[0] <= 8 && pose[1] <= 8))
                    {
                        if((pose[0] == positions[a][b][0] && pose[1] == positions[a][b][1]) || (pose[0] == row && pose[1] == column))
                        {
                            flag = 0;
                            break;
                        }
                    }
                    else
                    {
                        flag = 0;
                        break;
                    }
                }
                if(flag == 0)
                {
                    break;
                }
            }
            if(flag == 1)
            {
                greens.push(pose);
            }
        }
    }
    let temp = [];
    console.log(greens);
    for(let i in greens)
    {
        let hover = document.createElement("div");
        hover.setAttribute("class", "hover");
        hover.style.gridRow = greens[i][0];
        hover.style.gridColumn = greens[i][1];
        hover.style.backgroundColor = "green";
        temp.push(hover);
        grid.appendChild(hover);
    }
    if(name == "ricochet_01" || name == "ricochet_02")
    {
        var myhover = document.createElement("div");
        myhover.style.backgroundColor = "green";
        myhover.setAttribute("class", "myhover");
        myhover.style.opacity = 0.5;
        myhover.style.zIndex = 3;
        myhover.style.gridRow = row;
        myhover.style.gridColumn = column;
        grid.appendChild(myhover);
    }
    if(name == "semiricochet_01" || name == "semiricochet_02")
    {
        var img1 = document.createElement("div");
        var img2 = document.createElement("div");
        img1.setAttribute("class", "turnclock");
        img2.setAttribute("class", "turnanticlock");
        img1.style.gridRow = 1;
        img1.style.gridColoumn = 1;
        img2.style.gridRow = 2;
        img2.style.gridColumn = 1;
        var myhover = document.createElement("div");
        myhover.style.backgroundColor = "green";
        myhover.setAttribute("class", "rotatehover");
        myhover.style.zIndex = 3;
        myhover.style.gridRow = row;
        myhover.style.gridColumn = column;
        myhover.appendChild(img1);
        myhover.appendChild(img2);
        grid.appendChild(myhover);
    }
    temp.push(myhover);
    hovers = temp;
    selected = true;
}

function removegreens()
{
    try
    {
        let grid = document.querySelector(".grid");
        for(let i = 0;i < hovers.length;i++)
        {
            grid.removeChild(hovers[i]);
        }
        selected = false;
        selection = [];
    }
    catch
    {

    };
    hovers = [];
}

function move(final)
{
    if(pressedUndo)
    {
        console.log("Trash cleared");
        trash = [];
        pressedUndo = false;
        console.log(trash);
    }
    var record = selection[0] + ":" + selection[1] + ":" + "position:" + "[" + String(positions[selection[0]][selection[1]][0]) + ";" + String(positions[selection[0]][selection[1]][1]) + "]:[" + String(final[0]) + ";" + String(final[1]) + "]";
    var imgs = document.getElementsByTagName("img");
    var img = null;
    for(let i in imgs)
    {
        if(imgs[i].getAttribute("colour") == selection[0] && imgs[i].getAttribute("name") == selection[1])
        {
            img = imgs[i];
            break;
        }
    }
    img.removeAttribute("row");
    img.removeAttribute("column");
    img.setAttribute("row", final[0]);
    img.setAttribute("column", final[1]);
    var grid = document.getElementsByClassName("grid");
    var peice = document.getElementById(selection[0] + selection[1]);
    var classname = peice.getAttribute("class");
    var id = peice.getAttribute("id");
    grid[0].removeChild(peice);
    var newpeice = document.createElement("div");
    newpeice.setAttribute("class", classname);
    newpeice.setAttribute("id",id);
    newpeice.style.gridRow = parseInt(final[0]);
    newpeice.style.gridColumn = parseInt(final[1]);
    newpeice.appendChild(img);
    grid[0].appendChild(newpeice);
    positions[selection[0]][selection[1]] = [final[0], final[1]];
    moves.push(record);
    bullet();
    removegreens();
}

function rotate()
{
    if(pressedUndo)
    {
        console.log("Trash cleared");
        trash = [];
        pressedUndo = false;
        console.log(trash);
    }
    var imgs = document.getElementsByTagName("img");
    var img = null;
    for(let i in imgs)
    {
        if(imgs[i].getAttribute("colour") == selection[0] && imgs[i].getAttribute("name") == selection[1])
        {
            img = imgs[i];
            break;
        }
    }
    var rot = img.getAttribute("direction");
    img.removeAttribute("direction");
    if(rot == "clock")
    {
        img.src = "Resources/Ricochet_rotated.png";
        img.setAttribute("direction", "anticlock");
        var record = selection[0] + ":" + selection[1] + ":" + "rotation:";
    }
    else if(rot == "anticlock")
    {
        img.src = "Resources/Ricochet.png";
        img.setAttribute("direction", "clock");
        var record = selection[0] + ":" + selection[1] + ":" + "rotation";
    }
    moves.push(record);
    bullet();
    removegreens();
}

function semiricochetrotate(direction)
{
    if(pressedUndo)
    {
        console.log("Trash cleared");
        trash = [];
        pressedUndo = false;
        console.log(trash);
    }
    var imgs = document.getElementsByTagName("img");
    var img = null;
    for(let i in imgs)
    {
        if(imgs[i].getAttribute("colour") == selection[0] && imgs[i].getAttribute("name") == selection[1])
        {
            img = imgs[i];
            break;
        }
    }
    var initial = parseInt(img.getAttribute("direction"));
    var orig = initial;
    img.removeAttribute("direction");
    if(direction == "turnclock")
    {
        initial = initial + 1;
    }
    else if(direction == "turnanticlock")
    {
        initial = initial - 1;
    }
    if(initial > 3)
    {
        initial = 0;
    }
    if(initial < 0)
    {
        initial = 3;
    }
    if(initial == 0)
    {
        img.src = "Resources/Semi Ricochet01.png";
    }
    else if(initial == 1)
    {
        img.src = "Resources/Semi Ricochet02.png";
    }
    else if(initial == 2)
    {
        img.src = "Resources/Semi Ricochet03.png";
    }
    else if(initial == 3)
    {
        img.src = "Resources/Semi Ricochet04.png";
    }
    img.setAttribute("direction", initial); 
    var record = selection[0] + ":" + selection[1] + ":" + "rotation:" + "[" + String(orig) + ";" + String(initial) + "]";
    moves.push(record);
    bullet();
    removegreens();
}

function swapturns()
{
    if(turn == "red")
    {
        turn = "blue";
    }
    else
    {
        turn = "red";
    }
    resetTimer();
}

function bullet()
{
    var grid = document.getElementsByClassName("grid");
    var proj = document.createElement("div");
    proj.setAttribute("id", "projectile");
    proj.style.borderRadius = "80px";
    proj.style.scale = 0.4;
    proj.style.backgroundColor = "black";
    proj.style.zIndex = 3;
    proj.style.gridRow = positions[turn]["canon"][0];
    proj.style.gridColumn = positions[turn]["canon"][1];
    grid[0].appendChild(proj);
    projmotion();
}

function decidedirectionricochet(initial, dir)
{
    if(dir == "clock")
    {
        if(initial == "top")
        {
            return "right";
        }
        else if(initial == "down")
        {
            return "left";
        }
        else if(initial == "right")
        {
            return "top";
        }
        else if(initial == "left")
        {
            return "down";
        }
    }
    else if(dir == "anticlock")
    {
        if(initial == "top")
        {
            return "left";
        }
        else if(initial == "down")
        {
            return "right";
        }
        else if(initial == "right")
        {
            return "down";
        }
        else if(initial == "left")
        {
            return "top";
        }
    }
}

function decidedirectionsemiricochet(initial, direction)
{
    if(direction == "0")
    {
        if(initial == "top")
        {
            return "right";
        }
        else if(initial == "left")
        {
            return "down";
        }
        else
        {
            return initial;
        }
    }
    else if(direction == "1")
    {
        if(initial == "top")
        {
            return "left";
        }
        else if(initial == "right")
        {
            return "down";
        }
        else
        {
            return initial;
        }
    }
    else if(direction == "2")
    {
        if(initial == "down")
        {
            return "left";
        }
        else if(initial == "right")
        {
            return "top";
        }
        else
        {
            return initial;
        }
    }
    else if(direction == "3")
    {
        if(initial == "down")
        {
            return "right";
        }
        else if(initial == "left")
        {
            return "top";
        }
        else
        {
            return initial;
        }
    }
}

function destroysemiricochet(a, b, img)
{
    var peice = document.getElementById(a + b);
    var grid = document.getElementsByClassName("grid");
    console.log(peice);
    grid[0].removeChild(peice);
    let record = a + ":" + b + ":destroy:" + "[" + img.getAttribute("row") + ";" + img.getAttribute("column") + "]:" +  img.getAttribute("direction");
    moves.push(record);
}

function checkfortitan()
{
    var proj = document.getElementById("projectile");
    if((positions["red"]["titan"][0] == proj.style.gridRow && positions["red"]["titan"][1] == proj.style.gridColumn) || (positions["blue"]["titan"][0] == proj.style.gridRow && positions["blue"]["titan"][1] == proj.style.gridColumn))
    {
        return false;
    }
    return true;
}

function gameover()
{
    const over = document.createElement("div");
    const text = document.createElement("h1");
    text.innerHTML = "GAME OVER";
    over.setAttribute("class", "gameover");
    over.appendChild(text);
    document.body.appendChild(over);
    if(localStorage.length == 8)
    {
        localStorage.clear();
    }
    localStorage.setItem(localStorage.length, moves)
}

function projmotion()
{
    var direction = "";
    if(turn == "red")
    {
        direction = "down";
    }
    if(turn == "blue")
    {
        direction = "top";
    }
    const timer = setInterval(function()
    {
        var proj = document.getElementById("projectile");
        if(direction == "down")
        {
            proj.style.gridRow = parseInt(proj.style.gridRow) + 1;
        }
        else if(direction == "top")
        {
            proj.style.gridRow = parseInt(proj.style.gridRow) - 1;
        }
        else if(direction == "left")
        {
            proj.style.gridColumn = parseInt(proj.style.gridColumn) - 1;
        }
        else if(direction == "right")
        {
            proj.style.gridColumn = parseInt(proj.style.gridColumn) + 1;
        }
        for(let a in positions)
        {
            for(let b in positions[a])
            {
                if(positions[a][b][0] == proj.style.gridRow && positions[a][b][1] == proj.style.gridColumn)
                {
                    if(b == "ricochet_01" || b == "ricochet_02")
                    {
                        var imgs = document.getElementsByTagName("img");
                        var img = null;
                        for(let i = 0;i < imgs.length;i++)
                        {
                            if(imgs[i].getAttribute("name") == b && imgs[i].getAttribute("colour") == a)
                            {
                                img = imgs[i];
                                break;
                            }
                        }
                        direction = decidedirectionricochet(direction, img.getAttribute("direction"));
                    }
                    else if(b == "tank_01" || b == "tank_02")
                    {
                        destroyprojectile();
                        clearInterval(timer);
                    }
                    else if(b == "titan")
                    {
                        if(a == "red")
                        {
                            console.log("Blue wins");
                        }
                        else
                        {
                            console.log("Red wins");
                        }
                        clearInterval(timer);
                        destroyprojectile();
                        turn = "";
                        gameover();
                    }
                    else if(b == "semiricochet_01" || b == "semiricochet_02")
                    {
                        var imgs = document.getElementsByTagName("img");
                        var img = null;
                        for(let i in imgs)
                        {
                            if(imgs[i].getAttribute("colour") == a && imgs[i].getAttribute("name") == b)
                            {
                                img = imgs[i];
                                break;
                            }
                        }
                        if(direction == decidedirectionsemiricochet(direction, img.getAttribute("direction")))
                        {
                            clearInterval(timer);
                            destroyprojectile();
                            destroysemiricochet(a, b, img);
                        }
                        else
                        {
                            direction = decidedirectionsemiricochet(direction, img.getAttribute("direction"));
                        }
                    }
                    break;
                }
            }
        }
        if(((parseInt(proj.style.gridRow) >= 8 && direction == "down") || (parseInt(proj.style.gridRow) <= 1 && direction == "top") || (parseInt(proj.style.gridColumn) <= 1 && direction == "left") || (parseInt(proj.style.gridColumn) >= 8 && direction == "right")) && checkfortitan())
        {
            clearInterval(timer);
            destroyprojectile();  
        }
    },100);

}

function destroyprojectile()
{
    var grid = document.querySelector(".grid");
    var proj = document.getElementById("projectile");
    console.log(proj);
    grid.removeChild(proj);
    swapturns();
}

document.addEventListener("click",function(e){
    if(e.target.getAttribute("class") != "grid" && e.target.getAttribute("class") != "hover" && !selected && e.target.getAttribute("colour") == turn && !isPaused)
    {
        checkgreens(e.target.getAttribute("colour"), e.target.getAttribute("name"), parseInt(e.target.getAttribute("row")), parseInt(e.target.getAttribute("column")));
    }
    else if(selected && e.target.getAttribute("class") == "hover" && !isPaused)
    {
        move([e.target.style.gridRow, e.target.style.gridColumn]);
    }
    else if(selected && e.target.getAttribute("class") == "myhover" && !isPaused)
    {
        rotate();
    }
    else if(selected && (e.target.getAttribute("class") == "turnclock" || e.target.getAttribute("class") == "turnanticlock") && !isPaused)
    {
        semiricochetrotate(e.target.getAttribute("class"));
    }
    else
    {
        removegreens();
    }
});