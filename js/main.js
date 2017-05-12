$j = jQuery

function $(a) {
    return document.querySelector(a);
}

var bird = $('.bird'),
    menuStart = $('.menuStart'),
    start = $('.start'),
    start1 = $('.start1'),
    title = $('.title'),
    land = $('.land'),
    main = $('.main'),
    wrapper = $('.wrapper'),
    pipes = $('.pipes'),
    menuOver = $('.menuOver'),
    score = $('.score'),
    pipe = $('.pipe'),
    die = $('.die'),
    hit = $('.hit'),
    point = $('.point'),
    swooshing = $('.swooshing'),
    wing = $('.wing'),
    now = $('.now'),
    best = $('.best');

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
        wing.play();
    }
    creatPipesTimer = setInterval(creatPipes, 3500);
    setInterval(function() {
        var lis = pipes.getElementsByClassName('pipe');
        for (var i = 0; i < lis.length; i++) {
            if (110 <= lis[i].offsetLeft + 350 && 185 >= lis[i].offsetLeft + 350) {
                console.log('碰撞判断')
                if (crash(lis[i])) {
                    console.log('撞墙了');
                    hit.play();
                    gameOver();
                }
            }
        }
    }, 20)
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
        hit.play();
        gameOver();
    }
    //鸟飞到顶上
    if (bird_marginTop < -160) {
        bird_marginTop = -160;
        clearInterval(flyTimer);
        hit.play();
        gameOver();
    }
}

//游戏结束
function gameOver() {
    die.play();
    main.style.display = 'none';
    menuOver.style.display = 'block';
    menuOver.style.zIndex = '1000';
    swooshing.play();
    //清除所有定时器
    var end = setInterval(function() {}, 1);
    for (var i = 1; i <= end; i++) {
        clearInterval(i);
    }
    //显示分数
    now.innerHTML = num;
    //获取最好的成绩
    if (localStorage.best) {
        var a = localStorage.best> num ? localStorage.best : num;
        best.innerHTML = a;
        localStorage.best = a;
    } else {
        best.innerHTML = num;
        localStorage.best = num;
    }
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
        if (pipeRight == 200) {
            changeScore();
        }
    }, 15)
}

//改变分数
var num = 0;

function changeScore() {
    num++;
    point.play();
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
function crash(pipe) {
    topPipe = pipe.firstElementChild;
    bottomPipe = pipe.lastElementChild;
    // 上管道判断height是否大于bird.offsetTop 如果大于就说明撞上了
    if (topPipe.offsetHeight >= bird.offsetTop) {
        return 1
    }
    // 下管道判断height是否大于屏幕高度480 - bird.offsetTop - 鸟高度, 如果大于就说明撞上了
    if (bottomPipe.offsetHeight >= 480 - bird.offsetTop - 50) {
        return 1
    }
    return 0;
}