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
    menuOver = $('.menuOver'),
    score = $('.score'),
    pipe = $('.pipe');

//游戏开始
start.onclick = function() {
    title.style.visibility = 'hidden';
    start.style.visibility = 'hidden';
    main.style.zIndex = "999";
    score.style.display = 'block';
    setInterval(landMove, 30);
    flyTimer = setInterval(fly, 30);
    main.onclick = function() {
        speed = -8;
    }
    creatPipesTimer = setInterval(creatPipes, 3500);
    setInterval(function() {
        //获取 li
        var lis = pipes.getElementsByClassName('pipe');
        for (var i = 0; i < lis.length; i++) {
            console.log(i);
            console.log(lis[i].offsetLeft);
                //只有当小鸟的左边距不大于管道的右边距时,判断是否碰撞
            if (bird.offsetWidth + bird.offsetLeft  > lis[i].offsetLeft) {
                //判断上管道时候与小鸟碰撞
                if (crash(bird, lis[i].firstElementChild)) {
                    console.log('撞墙了');
                    gameOver();
                }
                //判断下管道与小鸟碰撞
                if (crash(bird, lis[i].lastElementChild)) {
                    console.log('撞墙了')
                    gameOver();
                }
            }
        }
    }, 3000)
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
    var str = "<li class='pipe' id='pipe" + pipeId + "'><div class='pipe_up' id='pipe_up" + pipeId + "' ></div><div class='pipe_down' id='pipe_down" + pipeId + "'></div></li>"
    $j('.pipes').append(str);
    //上下管道的高度
    var topHeight = randomNum(50, 250);
    var downHeight = 460 - topHeight - 120;
    //分别创建上下管道
    $j('#pipe_up' + pipeId).css('height', topHeight + 'px')
    $j('#pipe_down' + pipeId).css('height', downHeight + 'px')
        //移动管道
    var pipeRight = -100;
    var pipeMoveTimer = setInterval(function() {
        pipeRight++;
        $j('#pipe' + pipeId).css('right', pipeRight + 'px')
        if (pipeRight > 340) {
            clearInterval(pipeMoveTimer);
            $j('#pipe' + pipeId).remove();
        }
    }, 15)
}

//改变分数
var num = 0;

function changeScore() {
    num++;
    score.innerHTML = "";
    if (num < 10) {
        var string = "<img src='img/font_" + num + ".png'>"
        score.innerHTML = string;
    } else {
        score.style.left = '140px';
        string_f = "<img src='img/font_" + Math.floor(num / 10) + ".png'>";
        string_s = "<img src='img/font_" + num % 10 + ".png'>";
        score.innerHTML = string_f + string_s;
    }
}

//判断小鸟是否撞到管道
function crash(obj1, obj2) {
    var flag = 1;
    //获取 obj1 的左.右.上.下边距
    var left1 = obj1.offsetLeft;
    var right1 = obj1.offsetLeft + obj1.offsetWidth;
    var top1 = obj1.offsetTop;
    var bottom1 = obj1.offsetTop + obj1.offsetHeight;
    //获取 obj2 的左.右.上.下边距
    var left2 = obj2.parentElement.offsetLeft;
    var right2 = obj2.parentElement.offsetLeft + obj2.offsetWidth;
    var top2 = obj2.offsetTop;  
    var bottom2 = obj2.offsetTop + obj2.offsetHeight;
    //判断碰撞的条件
    if ((bottom1 < top2 || left1 > right2 || top1 > bottom2 || right1 < left2)) {
        flag = 1; //碰撞
    } else {
        flag = 0; //不碰撞
    }
    console.log(flag);
    return flag;
}