$j = jQuery

function $(a) {
    return document.querySelector(a);
}

var bird = $('.bird'),
    menuStart = $('.menuStart'),
    start = $('.start'),
    title = $('.title'),
    land = $('.land'),
    main = $('.main'),
    wrapper = $('.wrapper'),
    pipes = $('.pipes'),
    menuOver = $('.menuOver');

//游戏开始
start.onclick = function() {
    title.style.visibility = 'hidden';
    start.style.visibility = 'hidden';
    main.style.zIndex = "999";
    setInterval(landMove, 30);
    flyTimer = setInterval(fly, 30);
    main.onclick = function() {
        speed = -8;
    }
    creatPipesTimer = setInterval(creatPipes,3500);
}

var land_marginLeft = 0;

//地移动
function landMove() {
    land_marginLeft -= 2;
    land.style.marginLeft = land_marginLeft + 'px';
    if (land_marginLeft < -340) {
        land_marginLeft = 0;
    }
}


//鸟的初速度
var speed = 0;
//鸟下落
function fly() {
    speed += 0.5;
    if (speed > 8) {
        speed = 8;
    }
    var bird_marginTop = parseInt(bird.style.marginTop) + speed;
    bird.style.marginTop = bird_marginTop + 'px';
    //鸟掉在地上
    if (bird_marginTop > 274) {
        bird_marginTop = 274;
        clearInterval(flyTimer);
        gameOver();
    }
    //鸟飞到顶上
    if (bird_marginTop < -160) {
        bird_marginTop = -160;
        clearInterval(flyTimer);
        gameOver();
    }
}

//游戏结束
function gameOver() {
    main.style.display = 'none';
    menuOver.style.display = 'block';
    menuOver.style.zIndex = '1000';
}

//随机生成
function randomNum(m, n) {
    return Math.floor(Math.random() * (n - m + 1) + m)
}

//生成管道
function creatPipes() {
    //创建整根管道
    var pipeId = randomNum(1, 1000)
    var str = "<li class='pipe' id='pipe"+pipeId+"'><div class='pipe_up' id='pipe_up"+pipeId+"' ></div><div class='pipe_down' id='pipe_down"+pipeId+"'></div></li>"
    $j('.pipes').append(str);
    //上下管道的高度
    var topHeight = randomNum(50, 250);
    var downHeight = 460 - topHeight - 120;
    //分别创建上下管道
    $j('#pipe_up' + pipeId).css('height', topHeight + 'px')
    $j('#pipe_down' + pipeId).css('height', downHeight + 'px')
    //移动管道
    var pipeRight = -100;
    var pipeMoveTimer = setInterval(function(){
        pipeRight++;
        $j('#pipe' + pipeId).css('right', pipeRight + 'px')
        if(pipeRight > 340){
            clearInterval(pipeMoveTimer);
            $j('#pipe' + pipeId).remove();
        }
    },15)
}

//改变分数
var num = 0;
// function changeScore{
    
// }