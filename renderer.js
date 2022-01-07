//Kahn mode is for kahn acadmey
var alertMode = 'NORMAL';
var kahnLink = '';

//only run once
var ran;
if (ran===undefined){
    ran = true;

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var buttons = document.getElementById("buttons");

    var page = "main";

    var points = 0;

    var frame = 0;
    var pacX = 16;
    var pacY = 27;
    var pac_offset_y = 0;
    var pac_offset_x = 0;
    var pac_face = null;
    var pellet_counter = 0;
    var lives = 3;

    var level = 0;

    var map = [
        'wwwwwwwwwwwwwwwwwwwwwwwwwwwww',
        'w1111111111111111111111111111',
        'w1            11            1',
        'w1 1111 11111 11 11111 1111 1',
        'w1p1111 11111 11 11111 1111p1',
        'w1                          1',
        'w1 1111 11 11111111 11 1111 1',
        'w1 1111 11 11111111 11 1111 1',
        'w1      11    11    11      1',
        'w111111 11111 11 11111 111111',
        'w111111 11111 11 11111 111111',
        'w111111 11          11 111111',
        'w111111 11 22233222 11 111111',
        'w111111 11 2nnnnnn2 11 111111',
        'w          2nnnnnn2          ',
        'w111111 11 2nnnnnn2 11 111111',
        'w111111 11 22233222 11 111111',
        'w111111 11          11 111111',
        'w111111 11 11111111 11 111111',
        'w111111 11 11111111 11 111111',
        'w1            11            1',
        'w1 1111 11111 11 11111 1111 1',
        'w1p1111 11111 11 11111 1111p1',
        'w1   11                11   1',
        'w111 11 11 11111111 11 11 111',
        'w111 11 11 11111111 11 11 111',
        'w1   11 11 11111111 11 11   1',
        'w1 1111 11          11 1111 1',
        'w1 1111 11 11111111 11 1111 1',
        'w1         11111111         1',
        'w1111111111111111111111111111',
        'wwwwwwwwwwwwwwwwwwwwwwwwwwwww'
    ];

    var keys = [];

    var data;

    var num = 0;
    var num2 = 0;

    var goasts;

    var loseFrame = 0;
    
    var loseDirection = 'neg';

    var timeOutFrame;

    var quit;

    var fruit = null;
    var fruitsAte = [];

    var timer;
    var timer2 = 600;

    var die_frame = 1;
    var subDieFrame = 0;

    var alertrun = false;

    var highScore = 0;
}

//2d primitives
function fill(r, g, b, a) {
    if (g === undefined) {
        g = r;
        b = r;
    }
    if (a === undefined) {
        a = 255;
    }
    ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ", " + a + ")";
}
function stroke(r, g, b) {
    if (g === undefined) {
        g = r;
        b = r;
    }
    ctx.strokeStyle = "rgb(" + r + ", " + g + ", " + b +")";
}
function noStroke() {
    ctx.strokeStyle = "rgb(0, 0, 0, 0)";
}
function textSize(size) {
    ctx.font = size + 'px American Typewriter';
}
function strokeWidth(num) {
    ctx.lineWidth = num;
}
function rect(x, y, w, h){
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}
function text(text, x, y) {
    ctx.textAlign = "center";
    ctx.fillText(text, x, y);
    ctx.strokeText(text, x, y);
}

String.prototype.replaceAt = function(index, char) {
    return this.substr(0, index) + char + this.substr(index+char.length);
}

function lose () {
    noStroke();

    if (loseDirection === 'neg') {
        fill(255, 0, 0, 200);

        loseFrame-=0.03;
    }
    else if (loseDirection === 'pos') {
        fill(0, 0, 0, 0);

        loseFrame+=0.03;
    }

    if (loseFrame <= 0) {
        loseDirection = 'pos';
    }
    if (loseFrame >= 1) {
        loseDirection = 'neg';
    }

    textSize(20);
    text("Game Over", canvas.width/2+10, 300);

    timeOutFrame--;

    if (points>highScore) {
        highScore = points;
    }

    if ((keys[37] === true || keys[38] === true || keys[39] === true || keys[40] === true) && timeOutFrame<=0) {
        points = 0;

        level = 0;

        frame = 0;
        pacX = 16;
        pacY = 27;
        pac_offset_y = 0;
        pac_offset_x = 0;
        pac_face = null;
        pellet_counter = 0;
        lives = 3;

        map = [
        'wwwwwwwwwwwwwwwwwwwwwwwwwwwww',
        'w1111111111111111111111111111',
        'w1            11            1',
        'w1 1111 11111 11 11111 1111 1',
        'w1p1111 11111 11 11111 1111p1',
        'w1                          1',
        'w1 1111 11 11111111 11 1111 1',
        'w1 1111 11 11111111 11 1111 1',
        'w1      11    11    11      1',
        'w111111 11111 11 11111 111111',
        'w111111 11111 11 11111 111111',
        'w111111 11          11 111111',
        'w111111 11 22233222 11 111111',
        'w111111 11 2nnnnnn2 11 111111',
        'w          2nnnnnn2          ',
        'w111111 11 2nnnnnn2 11 111111',
        'w111111 11 22233222 11 111111',
        'w111111 11          11 111111',
        'w111111 11 11111111 11 111111',
        'w111111 11 11111111 11 111111',
        'w1            11            1',
        'w1 1111 11111 11 11111 1111 1',
        'w1p1111 11111 11 11111 1111p1',
        'w1   11                11   1',
        'w111 11 11 11111111 11 11 111',
        'w111 11 11 11111111 11 11 111',
        'w1   11 11 11111111 11 11   1',
        'w1 1111 11          11 1111 1',
        'w1 1111 11 11111111 11 1111 1',
        'w1         11111111         1',
        'w1111111111111111111111111111',
        'wwwwwwwwwwwwwwwwwwwwwwwwwwwww'
    ];

        spawnGoasts();

        timeOutFrame = 100;

        timer = 0;
        timer2 = 600;

        fruitsAte = [];

        die_frame = 1;
    }
}
function background () {
    fill(50);
    rect(0, 0, canvas.width, canvas.height);

    playBackground();

    spawnGoasts();
    drawGoasts();
    drawPacMan();
}
function playBackground () {
    noStroke();

    for (var x=1; x<map[0].length; x++) {
        for (var y=1; y<map.length-1; y++) {
            if (map[y][x]==='1' && (map[y][x-1] != '1' || map[y-1][x] != '1' || map[y][x+1] != '1' || map[y+1][x] != '1' || map[y-1][x-1] != '1' || map[y-1][x+1] != '1' || map[y+1][x-1] != '1' || map[y+1][x+1] != '1')){
                fill(0, 0, 110);

                if ((map[y][x+1]!=='1' && map[y+1][x]!=='1' && map[y][x-1]==='1' && map[y-1][x]==='1') || (map[y-1][x-1]!=='1' && map[y-1][x]==='1' && map[y-1][x+1]==='1' && map[y][x+1]==='1' && map[y+1][x+1]==='1' && map[y+1][x]==='1' && map[y+1][x-1]==='1' && map[y][x-1]==='1')) {
                    rect(x*20+(canvas.width-map[0].length*20)/2+9, y*20+20+0, 2, 4);
                    rect(x*20+(canvas.width-map[0].length*20)/2+0, y*20+20+9, 3, 2);
                    rect(x*20+(canvas.width-map[0].length*20)/2+7, y*20+20+4, 2, 2);
                    rect(x*20+(canvas.width-map[0].length*20)/2+5, y*20+20+6, 2, 2);
                    rect(x*20+(canvas.width-map[0].length*20)/2+3, y*20+20+8, 2, 2);
                }
                else if ((map[y][x+1]==='1' && map[y+1][x]!=='1' && map[y][x-1]!=='1' && map[y-1][x]==='1') || (map[y-1][x-1]==='1' && map[y-1][x]==='1' && map[y-1][x+1]!=='1' && map[y][x+1]==='1' && map[y+1][x+1]==='1' && map[y+1][x]==='1' && map[y+1][x-1]==='1' && map[y][x-1]==='1')) {
                    rect(x*20+(canvas.width-map[0].length*20)/2+9, y*20+20+0, 2, 4);
                    rect(x*20+(canvas.width-map[0].length*20)/2+17, y*20+20+9, 3, 2);
                    rect(x*20+(canvas.width-map[0].length*20)/2+11, y*20+20+4, 2, 2);
                    rect(x*20+(canvas.width-map[0].length*20)/2+13, y*20+20+6, 2, 2);
                    rect(x*20+(canvas.width-map[0].length*20)/2+15, y*20+20+8, 2, 2);
                }
                else if ((map[y][x+1]==='1' && map[y+1][x]==='1' && map[y][x-1]!=='1' && map[y-1][x]!=='1') || (map[y-1][x-1]==='1' && map[y-1][x]==='1' && map[y-1][x+1]==='1' && map[y][x+1]==='1' && map[y+1][x+1]!=='1' && map[y+1][x]==='1' && map[y+1][x-1]==='1' && map[y][x-1]==='1')) {
                    rect(x*20+(canvas.width-map[0].length*20)/2+9, y*20+20+16, 2, 4);
                    rect(x*20+(canvas.width-map[0].length*20)/2+16, y*20+20+9, 4, 2);
                    rect(x*20+(canvas.width-map[0].length*20)/2+11, y*20+20+14, 2, 2);
                    rect(x*20+(canvas.width-map[0].length*20)/2+13, y*20+20+12, 2, 2);
                    rect(x*20+(canvas.width-map[0].length*20)/2+15, y*20+20+10, 2, 2);
                }
                else if ((map[y][x+1]!=='1' && map[y+1][x]==='1' && map[y][x-1]==='1' && map[y-1][x]!=='1') || (map[y-1][x-1]==='1' && map[y-1][x]==='1' && map[y-1][x+1]==='1' && map[y][x+1]==='1' && map[y+1][x+1]==='1' && map[y+1][x]==='1' && map[y+1][x-1]!=='1' && map[y][x-1]==='1')) {
                    rect(x*20+(canvas.width-map[0].length*20)/2+9, y*20+20+16, 2, 4);
                    rect(x*20+(canvas.width-map[0].length*20)/2+0, y*20+20+9, 4, 2);
                    rect(x*20+(canvas.width-map[0].length*20)/2+4, y*20+20+10, 2, 2);
                    rect(x*20+(canvas.width-map[0].length*20)/2+6, y*20+20+12, 2, 2);
                    rect(x*20+(canvas.width-map[0].length*20)/2+8, y*20+20+14, 2, 2);
                }
                else if (map[y][x+1]!=='1' && map[y+1][x]==='1' && map[y][x-1]==='1' && map[y-1][x]==='1' && (map[y+1][x-1]!=='1' || map[y-1][x-1]!=='1')) {
                    rect(x*20+(canvas.width-map[0].length*20)/2, y*20+20+9, 9, 2);
                    rect(x*20+(canvas.width-map[0].length*20)/2+9, y*20+20, 2, 20);
                }
                else if (map[y][x+1]==='1' && map[y+1][x]==='1' && map[y][x-1]!=='1' && map[y-1][x]==='1' && (map[y+1][x+1]!=='1' || map[y-1][x+1]!=='1')) {
                    rect(x*20+(canvas.width-map[0].length*20)/2+9, y*20+20+9, 11, 2);
                    rect(x*20+(canvas.width-map[0].length*20)/2+9, y*20+20, 2, 20);
                }
                else if (map[y][x+1]==='1' && map[y+1][x]!=='1' && map[y][x-1]==='1' && map[y-1][x]==='1' && (map[y-1][x-1]!=='1' || map[y-1][x+1]!=='1')) {
                    rect(x*20+(canvas.width-map[0].length*20)/2, y*20+20+9, 20, 2);
                    rect(x*20+(canvas.width-map[0].length*20)/2+9, y*20+20, 2, 9);
                }
                else if (map[y][x+1]==='1' && map[y+1][x]==='1' && map[y][x-1]==='1' && map[y-1][x]!=='1' && (map[y+1][x-1]!=='1' || map[y+1][x+1]!=='1')) {
                    rect(x*20+(canvas.width-map[0].length*20)/2, y*20+20+9, 20, 2);
                    rect(x*20+(canvas.width-map[0].length*20)/2+9, y*20+29, 2, 12);
                }
                else if (map[y][x-1]==='1' && map[y][x+1]==='1') {
                    rect(x*20+(canvas.width-map[0].length*20)/2, y*20+29, 21, 2);
                }
                else {
                    rect(x*20+(canvas.width-map[0].length*20)/2+9, y*20+20, 2, 20);
                }
            }
            if (map[y][x]==='2') {
                fill(150);
                if (map[y-1][x]!=='2' && map[y+1][x]==='2' && map[y][x-1]==='2' && map[y][x+1]!=='2') {
                    rect(x*20+(canvas.width-map[0].length*20)/2, y*20+28, 10, 4);
                    rect(x*20+(canvas.width-map[0].length*20)/2+8, y*20+28, 4, 12);
                }
                else if (map[y-1][x]!=='2' && map[y+1][x]==='2' && map[y][x-1]!=='2' && map[y][x+1]==='2') {
                    rect(x*20+(canvas.width-map[0].length*20)/2+8, y*20+28, 12, 4);
                    rect(x*20+(canvas.width-map[0].length*20)/2+8, y*20+28, 4, 12);
                }
                else if (map[y-1][x]==='2' && map[y+1][x]!=='2' && map[y][x-1]!=='2' && map[y][x+1]==='2') {
                    rect(x*20+(canvas.width-map[0].length*20)/2+8, y*20+28, 12, 4);
                    rect(x*20+(canvas.width-map[0].length*20)/2+8, y*20+20, 4, 12);
                }
                else if (map[y-1][x]==='2' && map[y+1][x]!=='2' && map[y][x-1]==='2' && map[y][x+1]!=='2') {
                    rect(x*20+(canvas.width-map[0].length*20)/2, y*20+28, 12, 4);
                    rect(x*20+(canvas.width-map[0].length*20)/2+8, y*20+20, 4, 12);
                }
                else if (map[y-1][x]==='2' && map[y+1][x]==='2') {
                    rect(x*20+(canvas.width-map[0].length*20)/2+8, y*20+20, 4, 20);
                }
                else {
                    rect(x*20+(canvas.width-map[0].length*20)/2, y*20+28, 20, 4);
                }
            }
            if (map[y][x]==='3') {
                fill(220, 143, 220);
                rect(x*20+(canvas.width-map[0].length*20)/2, y*20+20+8, 20, 4);
            }
            if (map[y][x]==='p') {
                fill(255, 160, 80);
                rect(x*20+(canvas.width-map[0].length*20)/2+10-4, y*20+30+2-4, 10, 6);
                rect(x*20+(canvas.width-map[0].length*20)/2+10+2-4, y*20+30-4, 6, 10);
            }
            if (map[y][x]===' ') {
                fill(255, 160, 80);
                rect(x*20+(canvas.width-map[0].length*20)/2+10, y*20+30, 3, 3);
            }
        }
    }

    data = [
        '    11111    ',
        '  111111111  ',
        ' 11111111111 ',
        ' 11111111111 ',
        '   1111111111',
        '     11111111',
        '        11111',
        '     11111111',
        '   1111111111',
        ' 11111111111 ',
        ' 11111111111 ',
        '  111111111  ',
        '    11111    '
    ];

    if (lives>=1) {
    for (var y=0; y<13; y++) {
        for (var x=0; x<13; x++) {
            if (data[y][x] === '1') {
                fill(200, 200, 0);
            }
            else {
                fill(0, 0, 0, 0);
            }
            
            rect(27*20+(canvas.width*2/2-map[0].length*20)/2-3+x*2, 31*20+17+y*2, 2, 2);
        }
    }
    }
    if (lives>=2) {
    for (var y=0; y<13; y++) {
        for (var x=0; x<13; x++) {
            if (data[y][x] === '1') {
                fill(200, 200, 0);
            }
            else {
                fill(0, 0, 0, 0);
            }
            
            rect(25*20+(canvas.width*2/2-map[0].length*20)/2-3+x*2, 31*20+17+y*2, 2, 2);
        }
    }
    }
    if (lives>=3) {
    for (var y=0; y<13; y++) {
        for (var x=0; x<13; x++) {
            if (data[y][x] === '1') {
                fill(200, 200, 0);
            }
            else {
                fill(0, 0, 0, 0);
            }
            
            rect(23*20+(canvas.width*2/2-map[0].length*20)/2-3+x*2, 31*20+17+y*2, 2, 2);
        }
    }
    }
}

function bonusFruitGen () {
    timer2--;

    for (var val = 0; val<level+1; val++) {
        if (level === val && timer2 === 0) {
            fruit = level;
            timer = 450; //7.5 secs to grab fruit
        }
    }

    timer--;

    if (timer === 0) {
        fruit = null;
    }
}
function bonusFruitDraw () {
    if (fruit === 0) {
        data = [
            '           11',
            '         1111',
            '       11  1 ',
            '      1    1 ',
            ' 22221    1  ',
            '222212   1   ',
            '222222  2122 ',
            '232222 221222',
            '223222 222222',
            ' 2222  232222',
            '       223222',
            '        2222 '
        ];

        for (var y = 0; y<data.length; y++) {
            for (var x = 0; x<data[0].length; x++) {
                if (data[y][x]===' ') {
                    fill(0, 0, 0, 0);
                }
                if (data[y][x]==='1') {
                    fill(215, 155, 90);
                }
                if (data[y][x]==='2') {
                    fill(255, 30, 30);
                }
                if (data[y][x]==='3') {
                    fill(255, 200, 200);
                }

                rect(2*20+(canvas.width*2/2-map[0].length*20)/2-3+x*2, 2*20+17+y*2, 2, 2);
            }  
        }
    }
    if (fruit === 1) {
        data = [
            '     1     ',
            '  2221222  ',
            ' 332222233 ',
            '33333233313',
            '31333331333',
            '33313133333',
            '33333333133',
            ' 313313333 ',
            ' 333333333 ',
            '  3313313  ',
            '   33333   ',
            '     3     '
        ];

        for (var y = 0; y<data.length; y++) {
            for (var x = 0; x<data[0].length; x++) {
                if (data[y][x]===' ') {
                    fill(0, 0, 0, 0);
                }
                if (data[y][x]==='1') {
                    fill(235, 210, 210);
                }
                if (data[y][x]==='2') {
                    fill(30, 255, 30);
                }
                if (data[y][x]==='3') {
                    fill(255, 50, 50);
                }

                rect(2*20+(canvas.width*2/2-map[0].length*20)/2-3+x*2, 2*20+17+y*2, 2, 2);
            }  
        }
    }
    if (fruit === 2) {
        data = [
            '      22   ',
            '    122222 ',
            '    1 222  ',
            '  3111333  ',
            ' 333133333 ',
            '33333333333',
            '33333333333',
            '33333333333',
            '33333333333',
            ' 333333333 ',
            ' 33333333  ',
            '  33333    '
        ];

        for (var y = 0; y<data.length; y++) {
            for (var x = 0; x<data[0].length; x++) {
                if (data[y][x]===' ') {
                    fill(0, 0, 0, 0);
                }
                if (data[y][x]==='1') {
                    fill(215, 150, 90);
                }
                if (data[y][x]==='2') {
                    fill(30, 255, 30);
                }
                if (data[y][x]==='3') {
                    fill(240, 190, 100);
                }

                rect(2*20+(canvas.width*2/2-map[0].length*20)/2-3+x*2, 2*20+17+y*2, 2, 2);
            }  
        }
    }
    if (fruit === 3) {
        data = [
            '      3     ',
            ' 111 34111  ',
            '11111311111 ',
            '111111111111',
            '111111111111',
            '111111111111',
            '111111111211',
            '111111111211',
            ' 1111111211 ',
            ' 1111111111 ',
            '  11111111  ',
            '   11 111   '
        ];

        for (var y = 0; y<data.length; y++) {
            for (var x = 0; x<data[0].length; x++) {
                if (data[y][x]===' ') {
                    fill(0, 0, 0, 0);
                }
                if (data[y][x]==='1') {
                    fill(255, 30, 30);
                }
                if (data[y][x]==='2') {
                    fill(255, 220, 220);
                }
                if (data[y][x]==='3') {
                    fill(240, 190, 100);
                }
                if (data[y][x]==='4') {
                    fill(0, 0, 0);
                }

                rect(2*20+(canvas.width*2/2-map[0].length*20)/2-3+x*2, 2*20+17+y*2, 2, 2);
            }  
        }
    }
    if (fruit === 4) {
        data = [
            '  1        ',
            '   11111   ',
            '     1     ',
            '    232    ',
            '  2221222  ',
            ' 213122212 ',
            ' 221223122 ',
            '23122212122',
            '21223122312',
            '23122212222',
            ' 221313122 ',
            ' 222122212 ',
            '  2122212  ',
            '    221    '
        ];

        for (var y = 0; y<data.length; y++) {
            for (var x = 0; x<data[0].length; x++) {
                if (data[y][x]===' ') {
                    fill(0, 0, 0, 0);
                }
                if (data[y][x]==='1') {
                    fill(0, 150, 255);
                }
                if (data[y][x]==='2') {
                    fill(40, 255, 40);
                }
                if (data[y][x]==='3') {
                    fill(255, 255, 255);
                }

                rect(2*20+(canvas.width*2/2-map[0].length*20)/2-3+x*2, 2*20+17+y*2, 2, 2);
            }  
        }
    }
    if (fruit === 5) {
        data = [
            '     1     ',
            '2   111   2',
            '2  11111  2',
            '23113131132',
            '23333133332',
            '22333333322',
            ' 223 3 322 ',
            '  22 3 22  ',
            '   2 3 2   ',
            '     3     ',
            '     3     '
        ];

        for (var y = 0; y<data.length; y++) {
            for (var x = 0; x<data[0].length; x++) {
                if (data[y][x]===' ') {
                    fill(0, 0, 0, 0);
                }
                if (data[y][x]==='1') {
                    fill(255, 0, 0);
                }
                if (data[y][x]==='2') {
                    fill(0, 0, 255);
                }
                if (data[y][x]==='3') {
                    fill(255, 255, 0);
                }

                rect(2*20+(canvas.width*2/2-map[0].length*20)/2-3+x*2, 2*20+17+y*2, 2, 2);
            }  
        }
    }
    if (fruit === 6) {
        data = [
            '     11     ',
            '   112211   ',
            '  11111111  ',
            '  11211111  ',
            '  12111111  ',
            ' 1121111111 ',
            ' 1121111111 ',
            ' 1111111111 ',
            '112111111111',
            '112111111111',
            '111111111111',
            '133333443331',
            ' 3333344333 '
        ];

        for (var y = 0; y<data.length; y++) {
            for (var x = 0; x<data[0].length; x++) {
                if (data[y][x]===' ') {
                    fill(0, 0, 0, 0);
                }
                if (data[y][x]==='1') {
                    fill(255, 255, 0);
                }
                if (data[y][x]==='2') {
                    fill(0, 0, 0);
                }
                if (data[y][x]==='3') {
                    fill(50, 150, 255);
                }
                if (data[y][x]==='4') {
                    fill(220, 230, 255);
                }

                rect(2*20+(canvas.width*2/2-map[0].length*20)/2-3+x*2, 2*20+17+y*2, 2, 2);
            }  
        }
    }
    if (fruit >= 7) {
        data = [
            '  111  ',
            '1122211',
            '1111111',
            '1111111',
            '1111111',
            '  323  ',
            '  3233 ',
            '  323  ',
            '  322  ',
            '  323  ',
            '  3233 ',
            '  323  ',
            '   3   '
        ];

        for (var y = 0; y<data.length; y++) {
            for (var x = 0; x<data[0].length; x++) {
                if (data[y][x]===' ') {
                    fill(0, 0, 0, 0);
                }
                if (data[y][x]==='1') {
                    fill(50, 150, 255);
                }
                if (data[y][x]==='2') {
                    fill(0, 0, 0);
                }
                if (data[y][x]==='3') {
                    fill(255, 255, 255);
                }

                rect(2*20+(canvas.width*2/2-map[0].length*20)/2-3+x*2, 2*20+17+y*2, 2, 2);
            }  
        }
    }

    bonusFruitHotbarDraw();
}
function bonusFruitPhysics () {
    if (fruit === 0 && pacX===2 && pacY===2) {
        fruit = null;

        points+=100;

        fruitsAte[level]=0;
    }
    if (fruit === 1 && pacX===2 && pacY===2) {
        fruit = null;

        points+=300;

        fruitsAte[level]=1;
    }
    if (fruit === 2 && pacX===2 && pacY===2) {
        fruit = null;

        points+=500;

        fruitsAte[level]=2;
    }
    if (fruit === 3 && pacX===2 && pacY===2) {
        fruit = null;

        points+=700;

        fruitsAte[level]=3;
    }
    if (fruit === 4 && pacX===2 && pacY===2) {
        fruit = null;

        points+=1000;

        fruitsAte[level]=4;
    }
    if (fruit === 5 && pacX===2 && pacY===2) {
        fruit = null;

        points+=2000;

        fruitsAte[level]=5;
    }
    if (fruit === 6 && pacX===2 && pacY===2) {
        fruit = null;

        points+=3000;

        fruitsAte[level]=6;
    }
    if (fruit === 7 && pacX===2 && pacY===2) {
        fruit = null;

        points+=5000;

        fruitsAte[level]=7;
    }
}
function bonusFruitHotbarDraw () {
    for (var x2 = 0; x2<fruitsAte.length+1; x2++) {
        if (fruitsAte[x2]===0) {
            data = [
            '           11',
            '         1111',
            '       11  1 ',
            '      1    1 ',
            ' 22221    1  ',
            '222212   1   ',
            '222222  2122 ',
            '232222 221222',
            '223222 222222',
            ' 2222  232222',
            '       223222',
            '        2222 '
            ];

            for (var y = 0; y<data.length; y++) {
                for (var x = 0; x<data[0].length; x++) {
                    if (data[y][x]===' ') {
                        fill(0, 0, 0, 0);
                }
                if (data[y][x]==='1') {
                    fill(215, 155, 90);
                }
                if (data[y][x]==='2') {
                    fill(255, 30, 30);
                }
                if (data[y][x]==='3') {
                    fill(255, 200, 200);
                }

                rect((20-x2*2)*20+(canvas.width-map[0].length*20)/2+x*2, 31*20+17+y*2, 2, 2);
            }  
        }
    }
        if (fruitsAte[x2]===1) {
            data = [
            '     1     ',
            '  2221222  ',
            ' 332222233 ',
            '33333233313',
            '31333331333',
            '33313133333',
            '33333333133',
            ' 313313333 ',
            ' 333333333 ',
            '  3313313  ',
            '   33333   ',
            '     3     '
        ];

        for (var y = 0; y<data.length; y++) {
            for (var x = 0; x<data[0].length; x++) {
                if (data[y][x]===' ') {
                    fill(0, 0, 0, 0);
                }
                if (data[y][x]==='1') {
                    fill(235, 210, 210);
                }
                if (data[y][x]==='2') {
                    fill(30, 255, 30);
                }
                if (data[y][x]==='3') {
                    fill(255, 50, 50);
                }

                rect((20-x2*2)*20+(canvas.width-map[0].length*20)/2+x*2, 31*20+17+y*2, 2, 2);
            }  
        }
    }
        if (fruitsAte[x2]===2) {
            data = [
            '      22   ',
            '    122222 ',
            '    1 222  ',
            '  3111333  ',
            ' 333133333 ',
            '33333333333',
            '33333333333',
            '33333333333',
            '33333333333',
            ' 333333333 ',
            ' 33333333  ',
            '  33333    '
        ];

        for (var y = 0; y<data.length; y++) {
            for (var x = 0; x<data[0].length; x++) {
                if (data[y][x]===' ') {
                    fill(0, 0, 0, 0);
                }
                if (data[y][x]==='1') {
                    fill(215, 150, 90);
                }
                if (data[y][x]==='2') {
                    fill(30, 255, 30);
                }
                if (data[y][x]==='3') {
                    fill(240, 190, 100);
                }

                rect((20-x2*2)*20+(canvas.width-map[0].length*20)/2+x*2, 31*20+17+y*2, 2, 2);
            }  
        }
    }
        if (fruitsAte[x2]===3) {
            data = [
            '      3     ',
            ' 111 34111  ',
            '11111311111 ',
            '111111111111',
            '111111111111',
            '111111111111',
            '111111111211',
            '111111111211',
            ' 1111111211 ',
            ' 1111111111 ',
            '  11111111  ',
            '   11 111   '
        ];

        for (var y = 0; y<data.length; y++) {
            for (var x = 0; x<data[0].length; x++) {
                if (data[y][x]===' ') {
                    fill(0, 0, 0, 0);
                }
                if (data[y][x]==='1') {
                    fill(255, 30, 30);
                }
                if (data[y][x]==='2') {
                    fill(255, 220, 220);
                }
                if (data[y][x]==='3') {
                    fill(240, 190, 100);
                }
                if (data[y][x]==='4') {
                    fill(0, 0, 0);
                }

                rect((20-x2*2)*20+(canvas.width-map[0].length*20)/2+x*2, 31*20+17+y*2, 2, 2);
            }  
        }
    }
        if (fruitsAte[x2]===4) {
            data = [
            '  1        ',
            '   11111   ',
            '     1     ',
            '    232    ',
            '  2221222  ',
            ' 213122212 ',
            ' 221223122 ',
            '23122212122',
            '21223122312',
            '23122212222',
            ' 221313122 ',
            ' 222122212 ',
            '  2122212  ',
            '    221    '
        ];

        for (var y = 0; y<data.length; y++) {
            for (var x = 0; x<data[0].length; x++) {
                if (data[y][x]===' ') {
                    fill(0, 0, 0, 0);
                }
                if (data[y][x]==='1') {
                    fill(0, 150, 255);
                }
                if (data[y][x]==='2') {
                    fill(40, 255, 40);
                }
                if (data[y][x]==='3') {
                    fill(255, 255, 255);
                }


                rect((20-x2*2)*20+(canvas.width-map[0].length*20)/2+x*2, 31*20+17+y*2, 2, 2);
            }  
        }
    }
        if (fruitsAte[x2]===5) {
            data = [
            '     1     ',
            '2   111   2',
            '2  11111  2',
            '23113131132',
            '23333133332',
            '22333333322',
            ' 223 3 322 ',
            '  22 3 22  ',
            '   2 3 2   ',
            '     3     ',
            '     3     '
        ];

        for (var y = 0; y<data.length; y++) {
            for (var x = 0; x<data[0].length; x++) {
                if (data[y][x]===' ') {
                    fill(0, 0, 0, 0);
                }
                if (data[y][x]==='1') {
                    fill(255, 0, 0);
                }
                if (data[y][x]==='2') {
                    fill(0, 0, 255);
                }
                if (data[y][x]==='3') {
                    fill(255, 255, 0);
                }

                rect((20-x2*2)*20+(canvas.width-map[0].length*20)/2+x*2, 31*20+17+y*2, 2, 2);
            }  
        }
    }
        if (fruitsAte[x2]===6) {
            data = [
            '     11     ',
            '   112211   ',
            '  11111111  ',
            '  11211111  ',
            '  12111111  ',
            ' 1121111111 ',
            ' 1121111111 ',
            ' 1111111111 ',
            '112111111111',
            '112111111111',
            '111111111111',
            '133333443331',
            ' 3333344333 '
        ];

        for (var y = 0; y<data.length; y++) {
            for (var x = 0; x<data[0].length; x++) {
                if (data[y][x]===' ') {
                    fill(0, 0, 0, 0);
                }
                if (data[y][x]==='1') {
                    fill(255, 255, 0);
                }
                if (data[y][x]==='2') {
                    fill(0, 0, 0);
                }
                if (data[y][x]==='3') {
                    fill(50, 150, 255);
                }
                if (data[y][x]==='4') {
                    fill(220, 230, 255);
                }

                rect((20-x2*2)*20+(canvas.width-map[0].length*20)/2+x*2, 31*20+17+y*2, 2, 2);
            }  
        }
    }
        if (fruitsAte[x2]===7) {
            data = [
            '  111  ',
            '1122211',
            '1111111',
            '1111111',
            '1111111',
            '  323  ',
            '  3233 ',
            '  323  ',
            '  322  ',
            '  323  ',
            '  3233 ',
            '  323  ',
            '   3   '
        ];

        for (var y = 0; y<data.length; y++) {
            for (var x = 0; x<data[0].length; x++) {
                if (data[y][x]===' ') {
                    fill(0, 0, 0, 0);
                }
                if (data[y][x]==='1') {
                    fill(50, 150, 255);
                }
                if (data[y][x]==='2') {
                    fill(0, 0, 0);
                }
                if (data[y][x]==='3') {
                    fill(255, 255, 255);
                }

                rect((20-x2*2)*20+(canvas.width-map[0].length*20)/2+x*2, 31*20+17+y*2, 2, 2);
            }  
        }
    }

        if (x2>=9) {
        x2=fruitsAte.length+1;
    }
    }
}

function drawPacMan() {
    if (pac_face === null) {
        data = [
            '    11111    ',
            '  111111111  ',
            ' 11111111111 ',
            ' 11111111111 ',
            '1111111111111',
            '1111111111111',
            '1111111111111',
            '1111111111111',
            '1111111111111',
            ' 11111111111 ',
            ' 11111111111 ',
            '  111111111  ',
            '    11111    '
        ];
    }
    if (pac_face === 'down') {
        if (Math.round(frame)===0 || Math.round(frame)===6) {
            data = [
                '    11111    ',
                '  111111111  ',
                ' 11111111111 ',
                ' 11111111111 ',
                '1111111111   ',
                '11111111     ',
                '11111        ',
                '11111111     ',
                '1111111111   ',
                ' 11111111111',
                ' 11111111111 ',
                '  111111111  ',
                '    11111    '
            ];

            frame+=0.2;
        }
        if (Math.round(frame)===1 || Math.round(frame)===5) {
            data = [
                '    11111    ',
                '  111111111  ',
                ' 11111111111 ',
                ' 11111111111 ',
                '1111111111111',
                '1111111111   ',
                '111111       ',
                '1111111111   ',
                '1111111111111',
                ' 11111111111 ',
                ' 11111111111 ',
                '  111111111  ',
                '    11111    '
            ];

            frame+=0.2;
        }
        if (Math.round(frame)===2 || Math.round(frame)===4) {
            data = [
                '    11111    ',
                '  111111111  ',
                ' 11111111111 ',
                ' 11111111111 ',
                '1111111111111',
                '1111111111111',
                '11111111    ',
                '1111111111111',
                '1111111111111',
                ' 11111111111 ',
                ' 11111111111 ',
                '  111111111  ',
                '    11111    '
            ];

            frame+=0.2;
        }
        if (Math.round(frame)===3) {
            data = [
                '    11111    ',
                '  111111111  ',
                ' 11111111111 ',
                ' 11111111111 ',
                '1111111111111',
                '1111111111111',
                '1111111111111',
                '1111111111111',
                '1111111111111',
                ' 11111111111 ',
                ' 11111111111 ',
                '  111111111  ',
                '    11111    '
            ];

            frame+=0.2;
        }

        if (frame >= 6) {
            frame = 0;
        }
    }
    if (pac_face === 'right') {
        if (Math.round(frame)===0 || Math.round(frame)===6) {
            data = [
                '    11111    ',
                '  111111111  ',
                ' 11111111111 ',
                ' 11111111111 ',
                '1111111111111',
                '111111 111111',
                '111111 111111',
                '111111 111111',
                '11111   11111',
                ' 1111   1111 ',
                ' 111     111 ',
                '  11     11  ',
                '             '
            ];

            frame+=0.2;
        }
        if (Math.round(frame)===1 || Math.round(frame)===5) {
            data = [
                '    11111    ',
                '  111111111  ',
                ' 11111111111 ',
                ' 11111111111 ',
                '1111111111111',
                '1111111111111',
                '111111 111111',
                '111111 111111',
                '111111 111111',
                ' 11111 11111 ',
                ' 1111   1111 ',
                '  111   111  ',
                '    1   1    '
            ];

            frame+=0.2;
        }
        if (Math.round(frame)===2 || Math.round(frame)===4) {
            data = [
                '    11111    ',
                '  111111111  ',
                ' 11111111111 ',
                ' 11111111111 ',
                '1111111111111',
                '1111111111111',
                '1111111111111',
                '1111111111111',
                '111111 111111',
                ' 11111 11111 ',
                ' 11111 11111 ',
                '  1111 1111  ',
                '    11 11    '
            ];

            frame+=0.2;
        }
        if (Math.round(frame)===3) {
            data = [
                '    11111    ',
                '  111111111  ',
                ' 11111111111 ',
                ' 11111111111 ',
                '1111111111111',
                '1111111111111',
                '1111111111111',
                '1111111111111',
                '1111111111111',
                ' 11111111111 ',
                ' 11111111111 ',
                '  111111111  ',
                '    11111    '
            ];

            frame+=0.2;
        }

        if (frame >= 6) {
            frame = 0;
        }
    }
    if (pac_face === 'left') {
        if (Math.round(frame)===0 || Math.round(frame)===6) {
            data = [
                '             ',
                '  11     11  ',
                ' 111     111 ',
                ' 1111   1111 ',
                '11111   11111',
                '111111 111111',
                '111111 111111',
                '111111 111111',
                '1111111111111',
                ' 11111111111 ',
                ' 11111111111 ',
                '  111111111  ',
                '    11111    '
            ];

            frame+=0.2;
        }
        if (Math.round(frame)===1 || Math.round(frame)===5) {
            data = [
                '    1   1    ',
                '  111   111  ',
                ' 1111   1111 ',
                ' 11111 11111 ',
                '111111 111111',
                '111111 111111',
                '111111 111111',
                '1111111111111',
                '1111111111111',
                ' 11111111111 ',
                ' 11111111111 ',
                '  111111111  ',
                '    11111    '
            ];

            frame+=0.2;
        }
        if (Math.round(frame)===2 || Math.round(frame)===4) {
            data = [
                '    11 11    ',
                '  1111 1111  ',
                ' 11111 11111 ',
                ' 11111 11111 ',
                '111111 111111',
                '1111111111111',
                '1111111111111',
                '1111111111111',
                '1111111111111',
                ' 11111111111 ',
                ' 11111111111 ',
                '  111111111  ',
                '    11111    '
            ];

            frame+=0.2;
        }
        if (Math.round(frame)===3) {
            data = [
                '    11111    ',
                '  111111111  ',
                ' 11111111111 ',
                ' 11111111111 ',
                '1111111111111',
                '1111111111111',
                '1111111111111',
                '1111111111111',
                '1111111111111',
                ' 11111111111 ',
                ' 11111111111 ',
                '  111111111  ',
                '    11111    '
            ];

            frame+=0.2;
        }

        if (frame >= 6) {
            frame = 0;
        }
    }
    if (pac_face === 'up') {
        if (Math.round(frame)===0 || Math.round(frame)===6) {
            data = [
                '    11111    ',
                '  111111111  ',
                ' 11111111111 ',
                ' 11111111111 ',
                '   1111111111',
                '     11111111',
                '        11111',
                '     11111111',
                '   1111111111',
                ' 11111111111 ',
                ' 11111111111 ',
                '  111111111  ',
                '    11111    '
            ];

            frame+=0.2;
        }
        if (Math.round(frame)===1 || Math.round(frame)===5) {
            data = [
                '    11111    ',
                '  111111111  ',
                ' 11111111111 ',
                ' 11111111111 ',
                '1111111111111',
                '   1111111111',
                '       111111',
                '   1111111111',
                '1111111111111',
                ' 11111111111 ',
                ' 11111111111 ',
                '  111111111  ',
                '    11111    '
            ];

            frame+=0.2;
        }
        if (Math.round(frame)===2 || Math.round(frame)===4) {
            data = [
                '    11111    ',
                '  111111111  ',
                ' 11111111111 ',
                ' 11111111111 ',
                '1111111111111',
                '1111111111111',
                '     11111111',
                '1111111111111',
                '1111111111111',
                ' 11111111111 ',
                ' 11111111111 ',
                '  111111111  ',
                '    11111    '
            ];

            frame+=0.2;
        }
        if (Math.round(frame)===3) {
            data = [
                '    11111    ',
                '  111111111  ',
                ' 11111111111 ',
                ' 11111111111 ',
                '1111111111111',
                '1111111111111',
                '1111111111111',
                '1111111111111',
                '1111111111111',
                ' 11111111111 ',
                ' 11111111111 ',
                '  111111111  ',
                '    11111    '
            ];

            frame+=0.2;
        }

        if (frame >= 6) {
            frame = 0;
        }
    }

    for (var y=0; y<13; y++) {
        for (var x=0; x<13; x++) {
            if (data[y][x] === '1') {
                fill(255, 255, 0);
            }
            else {
                fill(0, 0, 0, 0);
            }
            
            rect(pacX*20+(canvas.width*2/2-map[0].length*20)/2-3+x*2+pac_offset_x, pacY*20+17+y*2+pac_offset_y, 2, 2);
        }
    }
}
function pacManPhysics(){
    if (pacX===0) {
        pacX = 28;
        points-=20;
    }
    if (pacX===29) {
        pacX = 1;
        points-=20;
    }

    if (pac_face === 'up' && map[pacY][pacX-1]!=='1' && map[pacY][pacX-1]!=='2' && map[pacY][pacX-1]!=='3') {
        pac_offset_x-=2;

        if (pac_offset_x <= -20) {
            pac_offset_x = 0;
            pacX--;
            pac_face = null;
        }
    }
    if (pac_face === 'down' && map[pacY][pacX+1]!=='1' && map[pacY][pacX+1]!=='2' && map[pacY][pacX+1]!=='3') {                    pac_offset_x+=2;

        if (pac_offset_x >= 20) {
            pac_offset_x = 0;
            pacX++;
            pac_face = null;
        }
    }
    if (pac_face === 'right' && map[pacY+1][pacX]!=='1' && map[pacY+1][pacX]!=='2' && map[pacY+1][pacX]!=='3') {
        pac_offset_y+=2;

        if (pac_offset_y >= 20) {
            pac_offset_y = 0;
            pacY++;
            pac_face = null;
        }
    }
    if (pac_face === 'left' && map[pacY-1][pacX]!=='1' && map[pacY-1][pacX]!=='2' && map[pacY-1][pacX]!=='3') {
        pac_offset_y-=2;

        if (pac_offset_y <= -20) {
            pac_offset_y = 0;
            pacY--;
            pac_face = null;
        }
    }

    if (map[pacY][pacX]==='p') {
        points+=40;
        pellet_counter=600;
    }
    if (map[pacY][pacX]==='p' || map[pacY][pacX]===' ') {
        points+=10;

        map[pacY] = map[pacY].replaceAt(pacX, 'n');
    }
}

function dieFrame () {
    if (subDieFrame<=1.1) {
        data = [
            '    11111    ',
            '  111111111  ',
            ' 11111111111 ',
            ' 11111111111 ',
            '1111111111111',
            '1111111111111',
            '1111111111111',
            '1111111111111',
            '1111111111111',
            ' 11111111111 ',
            ' 11111111111 ',
            '  111111111  ',
            '    11111    '
        ];
    }
    else if (subDieFrame<=2.1) {
        data = [
            '    1   1    ',
            '  111   111  ',
            ' 11111 11111 ',
            ' 11111 11111 ',
            '1111111111111',
            '1111111111111',
            '1111111111111',
            '1111111111111',
            '1111111111111',
            ' 11111111111 ',
            ' 11111111111 ',
            '  111111111  ',
            '    11111    '
        ];
    }
    else if (subDieFrame<=3.1) {
        data = [
            '             ',
            '  1       1  ',
            ' 111     111 ',
            ' 1111   1111 ',
            '111111 111111',
            '111111 111111',
            '1111111111111',
            '1111111111111',
            '1111111111111',
            ' 11111111111 ',
            ' 11111111111 ',
            '  111111111  ',
            '    11111    '
        ];
    }
    else if (subDieFrame<=4.1) {
        data = [
            '             ',
            '             ',
            ' 1         1 ',
            ' 11       11 ',
            '1111     1111',
            '11111   11111',
            '111111 111111',
            '1111111111111',
            '1111111111111',
            ' 11111111111 ',
            ' 11111111111 ',
            '  111111111  ',
            '    11111    '
        ];
    }
    else if (subDieFrame<=5.1) {
        data = [
            '             ',
            '             ',
            '             ',
            '             ',
            '1           1',
            '111       111',
            '11111   11111',
            '1111111111111',
            '1111111111111',
            ' 11111111111 ',
            ' 11111111111 ',
            '  111111111  ',
            '    11111    '
        ];
    }
    else if (subDieFrame<=6.1) {
        data = [
            '             ',
            '             ',
            '             ',
            '             ',
            '             ',
            '             ',
            '             ',
            '1111111111111',
            '1111111111111',
            ' 11111111111 ',
            ' 11111111111 ',
            '  111111111  ',
            '    11111    '
        ];
    }
    else if (subDieFrame<=7.1) {
        data = [
            '             ',
            '             ',
            '             ',
            '             ',
            '             ',
            '             ',
            '             ',
            '     111     ',
            '   1111111   ',
            ' 11111111111 ',
            ' 11111111111 ',
            '  111111111  ',
            '    11111    '
        ];
    }
    else if (subDieFrame<=8.1) {
        data = [
            '             ',
            '             ',
            '             ',
            '             ',
            '             ',
            '             ',
            '             ',
            '      1      ',
            '     111     ',
            '   1111111   ',
            '  111111111  ',
            '  111111111  ',
            '    11111    '
        ];
    }
    else if (subDieFrame<=9.1) {
        data = [
            '             ',
            '             ',
            '             ',
            '             ',
            '             ',
            '             ',
            '             ',
            '      1      ',
            '     111     ',
            '    11111    ',
            '    11111    ',
            '    11111    ',
            '    11111    '
        ];
    }
    else if (subDieFrame<=10.1) {
        data = [
            '             ',
            '             ',
            '             ',
            '             ',
            '             ',
            '             ',
            '             ',
            '      1      ',
            '      1      ',
            '      1      ',
            '     111     ',
            '     111     ',
            '     111     '
        ];
    }
    else if (subDieFrame<=11.1) {
        data = [
            '             ',
            '             ',
            '             ',
            '             ',
            '             ',
            '             ',
            '             ',
            '      1      ',
            '      1      ',
            '      1      ',
            '      1      ',
            '      1      ',
            '      1      '
        ];
    }
    else if (subDieFrame<=12.1) {
        data = [
            '             ',
            '             ',
            '             ',
            '             ',
            '             ',
            '             ',
            '             ',
            '             ',
            '             ',
            '             ',
            '             ',
            '             ',
            '             '
        ];
    }

    for (var y=0; y<13; y++) {
        for (var x=0; x<13; x++) {
            if (data[y][x] === '1') {
                fill(255, 255, 0);
            }
            else {
                fill(0, 0, 0, 0);
            }
            
            rect(pacX*20+(canvas.width*2/2-map[0].length*20)/2-3+x*2+pac_offset_x, pacY*20+17+y*2+pac_offset_y, 2, 2);
        }
    }
}
function die () {
    if (die_frame===0) {
        dieFrame();

        if (subDieFrame>12) {
            die_frame = 1;
            subDieFrame = 0;
        }
        else {
            subDieFrame+=0.15;
        }
    }
    if (die_frame===1) {
        points-=100;

        lives--;

        pacX = 16; 
        pacY = 27;
        pac_offset_x = 0;
        pac_offset_y = 0;

        spawnGoasts();

        if (lives === 0) {
            keys = [];
            timeOutFrame = 100;
        }
    }
}

function spawnGoasts () {
    goasts = [
        [14, 11, 0, 0, 'attack', 'up'],
        [12, 15, 0, 0, 'attack', 'up'],
        [14, 15, 0, 0, 'attack', 'up'],
        [17, 15, 0, 0, 'attack', 'up'],
    ];
}
function drawGoasts () {
    if (goasts[0][4]!=='scared') {
    if (goasts[0][5]==='right') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1111111111  ',
            ' 111221111221 ',
            ' 1122221122221',
            '11122331122331',
            '11122331122331',
            '11112211112211',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }
    if (goasts[0][5]==='left') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1111111111  ',
            ' 122111122111 ',
            ' 222211222211 ',
            ' 332211332211 ',
            '13322113322111',
            '11221111221111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }
    if (goasts[0][5]==='up') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1331111331  ',
            ' 123321123321 ',
            ' 122221122221 ',
            ' 122221122221 ',
            '11122111122111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }
    if (goasts[0][5]==='down') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1111111111  ',
            ' 11111111111 ',
            ' 112211112211 ',
            ' 122221122221 ',
            '11222211222211',
            '11233211233211',
            '11133111133111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }

    for (var y=0; y<14; y++) {
        for (var x=0; x<14; x++) {
            if (data[y][x] === '1' && goasts[0][4]!=='dead') {
                fill(255, 0, 0);
            }
            else if (data[y][x] === '2') {
                fill(255);
            }
            else if (data[y][x] === '3') {
                fill(0, 0, 255);
            }
            else {
                fill(0, 0, 0, 0);
            }
            
            rect(goasts[0][0]*20+(Math.round(canvas.width/2)*2-map[0].length*20)/2-5+x*2+goasts[0][2], goasts[0][1]*20+17+y*2+goasts[0][3], 3, 3);
        }
    }          
    }
    if (goasts[1][4]!=='scared') {
    if (goasts[1][5]==='right') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1111111111  ',
            ' 111221111221 ',
            ' 112222112222 ',
            '11122331222331',
            '11122331122331',
            '11112211112211',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }
    if (goasts[1][5]==='left') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1111111111  ',
            ' 122111122111 ',
            ' 222211222211 ',
            ' 332211332211 ',
            '13322113322111',
            '11221111221111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }
    if (goasts[1][5]==='up') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1331111331  ',
            ' 123321123321 ',
            ' 122221122221 ',
            ' 122221122221 ',
            '11122111122111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }
    if (goasts[1][5]==='down') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1111111111  ',
            ' 11111111111 ',
            ' 112211112211 ',
            ' 122221122221 ',
            '11222211222211',
            '11233211233211',
            '11133111133111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }

    for (var y=0; y<14; y++) {
        for (var x=0; x<14; x++) {
            if (data[y][x] === '1' && goasts[1][4]!=='dead') {
                fill(255, 200, 0);
            }
            else if (data[y][x] === '2') {
                fill(255);
            }
            else if (data[y][x] === '3') {
                fill(0, 0, 255);
            }
            else {
                fill(0, 0, 0, 0);
            }
            
            rect(goasts[1][0]*20+(Math.round(canvas.width/2)*2-map[0].length*20)/2-5+x*2+goasts[1][2], goasts[1][1]*20+17+y*2+goasts[1][3], 3, 3);
        }
    }
    }
    if (goasts[2][4]!=='scared') {
    if (goasts[2][5]==='right') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1111111111  ',
            ' 111221111221 ',
            ' 112222112222 ',
            '11122331222331',
            '11122331122331',
            '11112211112211',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }
    if (goasts[2][5]==='left') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1111111111  ',
            ' 122111122111 ',
            ' 222211222211 ',
            ' 332211332211 ',
            '13322113322111',
            '11221111221111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }
    if (goasts[2][5]==='up') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1331111331  ',
            ' 123321123321 ',
            ' 122221122221 ',
            ' 122221122221 ',
            '11122111122111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }
    if (goasts[2][5]==='down') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1111111111  ',
            ' 11111111111 ',
            ' 112211112211 ',
            ' 122221122221 ',
            '11222211222211',
            '11233211233211',
            '11133111133111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }

    for (var y=0; y<14; y++) {
        for (var x=0; x<14; x++) {
            if (data[y][x] === '1' && goasts[2][4]!=='dead') {
                fill(255, 120, 120);
            }
            else if (data[y][x] === '2') {
                fill(255);
            }
            else if (data[y][x] === '3') {
                fill(0, 0, 255);
            }
            else {
                fill(0, 0, 0, 0);
            }
            
            rect(goasts[2][0]*20+(Math.round(canvas.width/2)*2-map[0].length*20)/2-5+x*2+goasts[2][2], goasts[2][1]*20+17+y*2+goasts[2][3], 3, 3);
        }
    }
    }
    if (goasts[3][4]!=='scared') {
    if (goasts[3][5]==='right') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1111111111  ',
            ' 111221111221 ',
            ' 112222112222 ',
            '11122331222331',
            '11122331122331',
            '11112211112211',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }
    if (goasts[3][5]==='left') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1111111111  ',
            ' 122111122111 ',
            ' 222211222211 ',
            ' 332211332211 ',
            '13322113322111',
            '11221111221111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }
    if (goasts[3][5]==='up') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1331111331  ',
            ' 123321123321 ',
            ' 122221122221 ',
            ' 122221122221 ',
            '11122111122111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }
    if (goasts[3][5]==='down') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1111111111  ',
            ' 11111111111 ',
            ' 112211112211 ',
            ' 122221122221 ',
            '11222211222211',
            '11233211233211',
            '11133111133111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }

    for (var y=0; y<14; y++) {
        for (var x=0; x<14; x++) {
            if (data[y][x] === '1' && goasts[3][4]!=='dead') {
                fill(120, 255, 255);
            }
            else if (data[y][x] === '2') {
                fill(255);
            }
            else if (data[y][x] === '3') {
                fill(0, 0, 255);
            }
            else {
                fill(0, 0, 0, 0);
            }
            
            rect(goasts[3][0]*20+(Math.round(canvas.width/2)*2-map[0].length*20)/2-5+x*2+goasts[3][2], goasts[3][1]*20+17+y*2+goasts[3][3], 3, 3);
        }
    }
    }

    if (pellet_counter>=1 && (pellet_counter > 100) || (pellet_counter < 90 && pellet_counter > 80) || (pellet_counter < 70 && pellet_counter > 60) || (pellet_counter < 50 && pellet_counter > 40) || (pellet_counter < 30 && pellet_counter > 20) || (pellet_counter < 10 && pellet_counter > 0)) {
        if (goasts[0][5]==='right') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1111111111  ',
            ' 111221111221 ',
            ' 112222112222 ',
            '11122331222331',
            '11122331122331',
            '11112211112211',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }
        if (goasts[0][5]==='left') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1111111111  ',
            ' 122111122111 ',
            ' 222211222211 ',
            ' 332211332211 ',
            '13322113322111',
            '11221111221111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }
        if (goasts[0][5]==='up') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1331111331  ',
            ' 123321123321 ',
            ' 122221122221 ',
            ' 122221122221 ',
            '11122111122111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }
        if (goasts[0][5]==='down') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1111111111  ',
            ' 11111111111 ',
            ' 112211112211 ',
            ' 122221122221 ',
            '11222211222211',
            '11233211233211',
            '11133111133111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }

        for (var y=0; y<14; y++) {
        for (var x=0; x<14; x++) {
            if (data[y][x] === '1' && goasts[0][4]!=='dead') {
                fill(0, 0, 100);
            }
            else if (data[y][x] === '2') {
                fill(255);
            }
            else if (data[y][x] === '3') {
                fill(0, 0, 255);
            }
            else {
                fill(0, 0, 0, 0);
            }
            
            rect(goasts[0][0]*20+(Math.round(canvas.width/2)*2-map[0].length*20)/2-5+x*2+goasts[0][2], goasts[0][1]*20+17+y*2+goasts[0][3], 3, 3);
        }
    }          

        if (goasts[1][5]==='right') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1111111111  ',
            ' 111221111221 ',
            ' 112222112222 ',
            '11122331222331',
            '11122331122331',
            '11112211112211',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }
        if (goasts[1][5]==='left') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1111111111  ',
            ' 122111122111 ',
            ' 222211222211 ',
            ' 332211332211 ',
            '13322113322111',
            '11221111221111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }
        if (goasts[1][5]==='up') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1331111331  ',
            ' 123321123321 ',
            ' 122221122221 ',
            ' 122221122221 ',
            '11122111122111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }
        if (goasts[1][5]==='down') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1111111111  ',
            ' 11111111111 ',
            ' 112211112211 ',
            ' 122221122221 ',
            '11222211222211',
            '11233211233211',
            '11133111133111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }

        for (var y=0; y<14; y++) {
        for (var x=0; x<14; x++) {
            if (data[y][x] === '1' && goasts[1][4]!=='dead') {
                fill(0, 0, 100);
            }
            else if (data[y][x] === '2') {
                fill(255);
            }
            else if (data[y][x] === '3') {
                fill(0, 0, 255);
            }
            else {
                fill(0, 0, 0, 0);
            }
            
            rect(goasts[1][0]*20+(Math.round(canvas.width/2)*2-map[0].length*20)/2-5+x*2+goasts[1][2], goasts[1][1]*20+17+y*2+goasts[1][3], 3, 3);
        }
    }

        if (goasts[2][5]==='right') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1111111111  ',
            ' 111221111221 ',
            ' 112222112222 ',
            '11122331222331',
            '11122331122331',
            '11112211112211',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }
        if (goasts[2][5]==='left') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1111111111  ',
            ' 122111122111 ',
            ' 222211222211 ',
            ' 332211332211 ',
            '13322113322111',
            '11221111221111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }
        if (goasts[2][5]==='up') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1331111331  ',
            ' 123321123321 ',
            ' 122221122221 ',
            ' 122221122221 ',
            '11122111122111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }
        if (goasts[2][5]==='down') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1111111111  ',
            ' 11111111111 ',
            ' 112211112211 ',
            ' 122221122221 ',
            '11222211222211',
            '11233211233211',
            '11133111133111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }

        for (var y=0; y<14; y++) {
        for (var x=0; x<14; x++) {
            if (data[y][x] === '1' && goasts[2][4]!=='dead') {
                fill(0, 0, 100);
            }
            else if (data[y][x] === '2') {
                fill(255);
            }
            else if (data[y][x] === '3') {
                fill(0, 0, 255);
            }
            else {
                fill(0, 0, 0, 0);
            }
            
            rect(goasts[2][0]*20+(Math.round(canvas.width/2)*2-map[0].length*20)/2-5+x*2+goasts[2][2], goasts[2][1]*20+17+y*2+goasts[2][3], 3, 3);
        }
    }
      
        if (goasts[3][5]==='right') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1111111111  ',
            ' 111221111221 ',
            ' 112222112222 ',
            '11122331222331',
            '11122331122331',
            '11112211112211',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }
        if (goasts[3][5]==='left') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1111111111  ',
            ' 122111122111 ',
            ' 222211222211 ',
            ' 332211332211 ',
            '13322113322111',
            '11221111221111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }
        if (goasts[3][5]==='up') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1331111331  ',
            ' 123321123321 ',
            ' 122221122221 ',
            ' 122221122221 ',
            '11122111122111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }
        if (goasts[3][5]==='down') {
        data = [
            '     1111     ',
            '   11111111   ',
            '  1111111111  ',
            ' 11111111111 ',
            ' 112211112211 ',
            ' 122221122221 ',
            '11222211222211',
            '11233211233211',
            '11133111133111',
            '11111111111111',
            '11111111111111',
            '11111111111111',
            '11 111  111 11',
            '1   11  11   1'
        ];
    }

        for (var y=0; y<14; y++) {
        for (var x=0; x<14; x++) {
            if (data[y][x] === '1' && goasts[3][4]!=='dead') {
                fill(0, 0, 100);
            }
            else if (data[y][x] === '2') {
                fill(255);
            }
            else if (data[y][x] === '3') {
                fill(0, 0, 255);
            }
            else {
                fill(0, 0, 0, 0);
            }
            
            rect(goasts[3][0]*20+(Math.round(canvas.width/2)*2-map[0].length*20)/2-5+x*2+goasts[3][2], goasts[3][1]*20+17+y*2+goasts[3][3], 3, 3);
        }
    }
    } 
}
function goastPhysics () {
    if(die_frame === 0){
        die();
    }

    pellet_counter--;

    ///////////
    //  RED  //
    ///////////

    if (pellet_counter<0 && goasts[0][4]!=='dead') {
        goasts[0][4]='attack';
    }
    else if (pellet_counter>0 && goasts[0][4]!=='dead') {
        goasts[0][4]='scared';
    }
    
    num = 0;
    if (goasts[0][4]==='attack'){
    num = 0;
    if (goasts[0][2]===0 && goasts[0][3]===0) {
        if (map[goasts[0][1]][goasts[0][0]-1]!=="1" && map[goasts[0][1]][goasts[0][0]-1]!=="2" && map[goasts[0][1]][goasts[0][0]-1]!=="3" && goasts[0][5]!=='right') {
            num2 = Math.sqrt((goasts[0][0]-pacX+1)*(goasts[0][0]-pacX+1)+(goasts[0][1]-pacY)*(goasts[0][1]-pacY));

            if (num2>num) {
                num = num2;
                goasts[0][6] = 'left';
            }
        }
        if (map[goasts[0][1]][goasts[0][0]+1]!=="1" && map[goasts[0][1]][goasts[0][0]+1]!=="2" && map[goasts[0][1]][goasts[0][0]+1]!=="3" && goasts[0][5]!=='left') {
            num2 = Math.sqrt((goasts[0][0]-pacX-1)*(goasts[0][0]-pacX-1)+(goasts[0][1]-pacY)*(goasts[0][1]-pacY));

            if (num2>num) {
                num = num2;
                goasts[0][6] = 'right';
            }
        }
        if (map[goasts[0][1]-1][goasts[0][0]]!=="1" && map[goasts[0][1]-1][goasts[0][0]]!=="2" && map[goasts[0][1]-1][goasts[0][0]]!=="3" && goasts[0][5]!=='down') {
            num2 = Math.sqrt((goasts[0][0]-pacX)*(goasts[0][0]-pacX)+(goasts[0][1]-pacY+1)*(goasts[0][1]-pacY+1));

            if (num2>num) {
                num = num2;
                goasts[0][6] = 'up';
            }
        }
        if (map[goasts[0][1]+1][goasts[0][0]]!=="1" && map[goasts[0][1]+1][goasts[0][0]]!=="2" && map[goasts[0][1]+1][goasts[0][0]]!=="3" && goasts[0][5]!=='up') {
            num2 = Math.sqrt((goasts[0][0]-pacX)*(goasts[0][0]-pacX)+(goasts[0][1]-pacY-1)*(goasts[0][1]-pacY-1));

            if (num2>num) {
                num = num2;
                goasts[0][6] = 'down';
            }
        }
    }
    }
    num = 0;
    if (goasts[0][4]==='scared'){
    
    if (goasts[0][2]===0 && goasts[0][3]===0) {
        if (map[goasts[0][1]][goasts[0][0]-1]!=="1" && map[goasts[0][1]][goasts[0][0]-1]!=="2" && map[goasts[0][1]][goasts[0][0]-1]!=="3" && goasts[0][5]!=='right') {
            num2 = Math.random(0, 100);

            if (num2>num) {
                num = num2;
                goasts[0][6] = 'left';
            }
        }
        if (map[goasts[0][1]][goasts[0][0]+1]!=="1" && map[goasts[0][1]][goasts[0][0]+1]!=="2" && map[goasts[0][1]][goasts[0][0]+1]!=="3" && goasts[0][5]!=='left') {
            num2 = Math.random(0, 100);

            if (num2>num) {
                num = num2;
                goasts[0][6] = 'right';
            }
        }
        if (map[goasts[0][1]-1][goasts[0][0]]!=="1" && map[goasts[0][1]-1][goasts[0][0]]!=="2" && map[goasts[0][1]-1][goasts[0][0]]!=="3" && goasts[0][5]!=='down') {
            num2 = Math.random(0, 100);

            if (num2>num) {
                num = num2;
                goasts[0][6] = 'up';
            }
        }
        if (map[goasts[0][1]+1][goasts[0][0]]!=="1" && map[goasts[0][1]+1][goasts[0][0]]!=="2" && map[goasts[0][1]+1][goasts[0][0]]!=="3" && goasts[0][5]!=='up') {
            num2 = Math.random(0, 100);

            if (num2>num) {
                num = num2;
                goasts[0][6] = 'down';
            }
        }
    }
    if (pacX === goasts[0][0] && pacY === goasts[0][1]) {
        points+=150;
        goasts[0][4] = 'dead';
    }
    }
    num = 0;
    if (goasts[0][4]==='dead'){
    if (goasts[0][2]===0 && goasts[0][3]===0) {
        if (map[goasts[0][1]][goasts[0][0]-1]!=="1" && map[goasts[0][1]][goasts[0][0]-1]!=="2" && map[goasts[0][1]][goasts[0][0]-1]!=="3" && goasts[0][5]!=='right') {
            num2 = Math.sqrt((goasts[0][0]-14+1)*(goasts[0][0]-14+1)+(goasts[0][1]-11)*(goasts[0][1]-11));

            if (num2>num) {
                num = num2;
                goasts[0][6] = 'left';
            }
        }
        if (map[goasts[0][1]][goasts[0][0]+1]!=="1" && map[goasts[0][1]][goasts[0][0]+1]!=="2" && map[goasts[0][1]][goasts[0][0]+1]!=="3" && goasts[0][5]!=='left') {
            num2 = Math.sqrt((goasts[0][0]-14-1)*(goasts[0][0]-14-1)+(goasts[0][1]-11)*(goasts[0][1]-11));

            if (num2>num) {
                num = num2;
                goasts[0][6] = 'right';
            }
        }
        if (map[goasts[0][1]-1][goasts[0][0]]!=="1" && map[goasts[0][1]-1][goasts[0][0]]!=="2" && map[goasts[0][1]-1][goasts[0][0]]!=="3" && goasts[0][5]!=='down') {
            num2 = Math.sqrt((goasts[0][0]-14)*(goasts[0][0]-14)+(goasts[0][1]-11+1)*(goasts[0][1]-11+1));

            if (num2>num) {
                num = num2;
                goasts[0][6] = 'up';
            }
        }
        if (map[goasts[0][1]+1][goasts[0][0]]!=="1" && map[goasts[0][1]+1][goasts[0][0]]!=="2" && map[goasts[0][1]+1][goasts[0][0]]!=="3" && goasts[0][5]!=='up') {
            num2 = Math.sqrt((goasts[0][0]-14)*(goasts[0][0]-14)+(goasts[0][1]-11-1)*(goasts[0][1]-11-1));

            if (num2>num) {
                num = num2;
                goasts[0][6] = 'down';
            }
        }
    
        if (goasts[0][0]===14 && goasts[0][1]===11) {
            goasts[0][4]='attack';
        }
    }
    }

    if (goasts[0][6]==='up') {
        goasts[0][3]-=1.6;
        goasts[0][5]='up';
    }
    else if (goasts[0][6]==='right') {
        goasts[0][2]+=1.6;
        goasts[0][5]='right';
    }
    else if (goasts[0][6]==='left') {
        goasts[0][2]-=1.6;
        goasts[0][5]='left';
    }
    else if (goasts[0][6]==='down') {
        goasts[0][3]+=1.6;
        goasts[0][5]='down';
    }

    if (goasts[0][2]>=20) {
        goasts[0][2]=0;
        goasts[0][0]++;
    }
    if (goasts[0][2]<=-20) {
        goasts[0][2]=0;
        goasts[0][0]--;
    }
    if (goasts[0][3]>=20) {
        goasts[0][3]=0;
        goasts[0][1]++;
    }
    if (goasts[0][3]<=-20) {
        goasts[0][3]=0;
        goasts[0][1]--;
    }

    if (goasts[0][0]===0) {
        goasts[0][0]=28;
    }
    if (goasts[0][0]===29) {
        goasts[0][0]=1;
    }

    if (pacX === goasts[0][0] && pacY === goasts[0][1] && goasts[0][4]==='attack') {
        die_frame = 0;

        die();
    }

    //////////////
    //  ORANGE  //
    //////////////

    if (pellet_counter<0 && goasts[1][4]!=='dead') {
        goasts[1][4]='attack';
    }
    else if (pellet_counter>0 && goasts[1][4]!=='dead') {
        goasts[1][4]='scared';
    }
    
    num = 0;

    if (goasts[1][4]==='attack'){
    num = 0;
    if (goasts[1][2]===0 && goasts[1][3]===0) {
        if (map[goasts[1][1]][goasts[1][0]-1]!=='1' && map[goasts[1][1]][goasts[1][0]-1]!=='2' && goasts[1][5]!=='right') {
            num2 = Math.random(0, 100);
            if (num2>num) {
                num = num2;
                goasts[1][6] = 'left';
            }
        }
        if (map[goasts[1][1]][goasts[1][0]+1]!=="1" && map[goasts[1][1]][goasts[1][0]+1]!=='2' && goasts[1][5]!=='left') {
            num2 = Math.random(0, 100);

            if (num2>num) {
                num = num2;
                goasts[1][6] = 'right';
            }
        }
        if (map[goasts[1][1]-1][goasts[1][0]]!=="1" && map[goasts[1][1]-1][goasts[1][0]]!=='2' && goasts[1][5]!=='down') {
            num2 = Math.random(0, 100);

            if (num2>num) {
                num = num2;
                goasts[1][6] = 'up';
            }
        }
        if (map[goasts[1][1]+1][goasts[1][0]]!=="1" && map[goasts[1][1]+1][goasts[1][0]]!=='2' && goasts[1][5]!=='up') {
            num2 = Math.random(0, 100);

            if (num2>num) {
                num = num2;
                goasts[1][6] = 'down';
            }
        }
    }
    }
    num = 0;

    if (goasts[1][4]==='scared'){
    num = 0;
    if (goasts[1][2]===0 && goasts[1][3]===0) {
        if (map[goasts[1][1]][goasts[1][0]-1]!=='1' && map[goasts[1][1]][goasts[1][0]-1]!=='2' && goasts[1][5]!=='right') {
            num2 = Math.random(0, 100);
            if (num2>num) {
                num = num2;
                goasts[1][6] = 'left';
            }
        }
        if (map[goasts[1][1]][goasts[1][0]+1]!=="1" && map[goasts[1][1]][goasts[1][0]+1]!=="2" && goasts[1][5]!=='left') {
            num2 = Math.random(0, 100);

            if (num2>num) {
                num = num2;
                goasts[1][6] = 'right';
            }
        }
        if (map[goasts[1][1]-1][goasts[1][0]]!=="1" && map[goasts[1][1]-1][goasts[1][0]]!=='2' && goasts[1][5]!=='down') {
            num2 = Math.random(0, 100);

            if (num2>num) {
                num = num2;
                goasts[1][6] = 'up';
            }
        }
        if (map[goasts[1][1]+1][goasts[1][0]]!=="1" && map[goasts[1][1]+1][goasts[1][0]]!=="2" && goasts[1][5]!=='up') {
            num2 = Math.random(0, 100);

            if (num2>num) {
                num = num2;
                goasts[1][6] = 'down';
            }
        }
    }
    if (pacX === goasts[1][0] && pacY === goasts[1][1]) {
        points+=150;
        goasts[1][4] = 'dead';
    }
    }

    num = 0;
    if (goasts[1][4]==='dead'){
    if (goasts[1][2]===0 && goasts[1][3]===0) {
        if (map[goasts[1][1]][goasts[1][0]-1]!=="1" && map[goasts[1][1]][goasts[1][0]-1]!=="2" && goasts[1][5]!=='right') {
            num2 = Math.sqrt((goasts[1][0]-12+1)*(goasts[1][0]-12+1)+(goasts[1][1]-15)*(goasts[1][1]-15));

            if (num2>num) {
                num = num2;
                goasts[1][6] = 'left';
            }
        }
        if (map[goasts[1][1]][goasts[1][0]+1]!=="1" && map[goasts[1][1]][goasts[1][0]+1]!=="2" && goasts[1][5]!=='left') {
            num2 = Math.sqrt((goasts[1][0]-12-1)*(goasts[1][0]-12-1)+(goasts[1][1]-15)*(goasts[1][1]-15));

            if (num2>num) {
                num = num2;
                goasts[1][6] = 'right';
            }
        }
        if (map[goasts[1][1]-1][goasts[1][0]]!=="1" && map[goasts[1][1]-1][goasts[1][0]]!=="2" && goasts[1][5]!=='down') {
            num2 = Math.sqrt((goasts[1][0]-12)*(goasts[1][0]-12)+(goasts[1][1]-15+1)*(goasts[1][1]-15+1));

            if (num2>num) {
                num = num2;
                goasts[1][6] = 'up';
            }
        }
        if (map[goasts[1][1]+1][goasts[1][0]]!=="1" && map[goasts[1][1]+1][goasts[1][0]]!=="2" && goasts[1][5]!=='up') {
            num2 = Math.sqrt((goasts[1][0]-12)*(goasts[1][0]-12)+(goasts[1][1]-15-1)*(goasts[1][1]-15-1));

            if (num2>num) {
                num = num2;
                goasts[1][6] = 'down';
            }
        }
    
        if (goasts[1][0]===12 && goasts[1][1]===15) {
            goasts[1][4]='attack';
        }
    }
    }

    if (goasts[1][6]==='down') {
        goasts[1][3]+=1.6;
        goasts[1][5]='down';
    }
    else if (goasts[1][6]==='up') {
        goasts[1][3]-=1.6;
        goasts[1][5]='up';
    }
    else if (goasts[1][6]==='right') {
        goasts[1][2]+=1.6;
        goasts[1][5]='right';
    }
    else if (goasts[1][6]==='left') {
        goasts[1][2]-=1.6;
        goasts[1][5]='left';
    }

    if (goasts[1][2]>=20) {
        goasts[1][2]=0;
        goasts[1][0]++;
    }
    if (goasts[1][2]<=-20) {
        goasts[1][2]=0;
        goasts[1][0]--;
    }
    if (goasts[1][3]>=20) {
        goasts[1][3]=0;
        goasts[1][1]++;
    }
    if (goasts[1][3]<=-20) {
        goasts[1][3]=0;
        goasts[1][1]--;
    }

    if (goasts[1][0]===0) {
        goasts[1][0]=28;
    }
    if (goasts[1][0]===29) {
        goasts[1][0]=1;
    }

    if (pacX === goasts[1][0] && pacY === goasts[1][1] && goasts[1][4]==='attack') {
        die_frame = 0;

        die();
    }

    ////////////
    //  PINK  //
    ////////////

    if (pellet_counter<0 && goasts[2][4]!=='dead') {
        goasts[2][4]='attack';
    }
    else if (pellet_counter>0 && goasts[2][4]!=='dead') {
        goasts[2][4]='scared';
    }
    
    num = 0;
    if (goasts[2][4]==='attack'){
    num = 0;
    if (goasts[2][2]===0 && goasts[2][3]===0) {
        if (map[goasts[2][1]][goasts[2][0]-1]!=="1" && map[goasts[2][1]][goasts[2][0]-1]!=="2" && goasts[2][5]!=='right') {
            num2 = Math.sqrt((goasts[2][0]-pacX+1)*(goasts[2][0]-pacX+1)+(goasts[2][1]-pacY)*(goasts[2][1]-pacY));

            if (num2>num) {
                num = num2;
                goasts[2][6] = 'left';
            }
        }
        if (map[goasts[2][1]][goasts[2][0]+1]!=="1" && map[goasts[2][1]][goasts[2][0]+1]!=="2" && goasts[2][5]!=='left') {
            num2 = Math.sqrt((goasts[2][0]-pacX-1)*(goasts[2][0]-pacX-1)+(goasts[2][1]-pacY)*(goasts[2][1]-pacY));

            if (num2>num) {
                num = num2;
                goasts[2][6] = 'right';
            }
        }
        if (map[goasts[2][1]-1][goasts[2][0]]!=="1" && map[goasts[2][1]-1][goasts[2][0]]!=="2" && goasts[2][5]!=='down') {
            num2 = Math.sqrt((goasts[2][0]-pacX)*(goasts[2][0]-pacX)+(goasts[2][1]-pacY+1)*(goasts[2][1]-pacY+1));

            if (num2>num) {
                num = num2;
                goasts[2][6] = 'up';
            }
        }
        if (map[goasts[2][1]+1][goasts[2][0]]!=="1" && map[goasts[2][1]+1][goasts[2][0]]!=="2" && goasts[2][5]!=='up') {
            num2 = Math.sqrt((goasts[2][0]-pacX)*(goasts[2][0]-pacX)+(goasts[2][1]-pacY-1)*(goasts[2][1]-pacY-1));

            if (num2>num) {
                num = num2;
                goasts[2][6] = 'down';
            }
        }
    }
    }
    num = 0;
    if (goasts[2][4]==='scared'){
    
    if (goasts[2][2]===0 && goasts[2][3]===0) {
        if (map[goasts[2][1]][goasts[2][0]-1]!=="1" && map[goasts[2][1]][goasts[2][0]-1]!=="2" && goasts[2][5]!=='right') {
            num2 = Math.random(0, 100);

            if (num2>num) {
                num = num2;
                goasts[2][6] = 'left';
            }
        }
        if (map[goasts[2][1]][goasts[2][0]+1]!=="1" && map[goasts[2][1]][goasts[2][0]+1]!=="2" && goasts[2][5]!=='left') {
            num2 = Math.random(0, 100);

            if (num2>num) {
                num = num2;
                goasts[2][6] = 'right';
            }
        }
        if (map[goasts[2][1]-1][goasts[2][0]]!=="1" && map[goasts[2][1]-1][goasts[2][0]]!=="2" && goasts[2][5]!=='down') {
            num2 = Math.random(0, 100);

            if (num2>num) {
                num = num2;
                goasts[2][6] = 'up';
            }
        }
        if (map[goasts[2][1]+1][goasts[2][0]]!=="1" && map[goasts[2][1]+1][goasts[2][0]]!=="2" && goasts[2][5]!=='up') {
            num2 = Math.random(0, 100);

            if (num2>num) {
                num = num2;
                goasts[2][6] = 'down';
            }
        }
    }
    if (pacX === goasts[2][0] && pacY === goasts[2][1]) {
        points+=150;
        goasts[2][4] = 'dead';
    }
    }
    num = 0;
    if (goasts[2][4]==='dead'){
    if (goasts[2][2]===0 && goasts[2][3]===0) {
        if (map[goasts[2][1]][goasts[2][0]-1]!=="1" && map[goasts[2][1]][goasts[2][0]-1]!=="2" && goasts[2][5]!=='right') {
            num2 = Math.sqrt((goasts[2][0]-14+1)*(goasts[2][0]-14+1)+(goasts[2][1]-15)*(goasts[2][1]-15));

            if (num2>num) {
                num = num2;
                goasts[2][6] = 'left';
            }
        }
        if (map[goasts[2][1]][goasts[2][0]+1]!=="1" && map[goasts[2][1]][goasts[2][0]+1]!=="2" && goasts[2][5]!=='left') {
            num2 = Math.sqrt((goasts[2][0]-14-1)*(goasts[2][0]-14-1)+(goasts[2][1]-15)*(goasts[2][1]-15));

            if (num2>num) {
                num = num2;
                goasts[2][6] = 'right';
            }
        }
        if (map[goasts[2][1]-1][goasts[2][0]]!=="1" && map[goasts[2][1]-1][goasts[2][0]]!=="2" && goasts[2][5]!=='down') {
            num2 = Math.sqrt((goasts[2][0]-14)*(goasts[2][0]-14)+(goasts[2][1]-15+1)*(goasts[2][1]-15+1));

            if (num2>num) {
                num = num2;
                goasts[2][6] = 'up';
            }
        }
        if (map[goasts[2][1]+1][goasts[2][0]]!=="1" && map[goasts[2][1]+1][goasts[2][0]]!=="2" && goasts[2][5]!=='up') {
            num2 = Math.sqrt((goasts[2][0]-14)*(goasts[2][0]-14)+(goasts[2][1]-15-1)*(goasts[2][1]-15-1));

            if (num2>num) {
                num = num2;
                goasts[2][6] = 'down';
            }
        }
    
        if (goasts[2][0]===14 && goasts[2][1]===15) {
            goasts[2][4]='attack';
        }
    }
    }

    if (goasts[2][6]==='up') {
        goasts[2][3]-=1.6;
        goasts[2][5]='up';
    }
    else if (goasts[2][6]==='right') {
        goasts[2][2]+=1.6;
        goasts[2][5]='right';
    }
    else if (goasts[2][6]==='left') {
        goasts[2][2]-=1.6;
        goasts[2][5]='left';
    }
    else if (goasts[2][6]==='down') {
        goasts[2][3]+=1.6;
        goasts[2][5]='down';
    }

    if (goasts[2][2]>=20) {
        goasts[2][2]=0;
        goasts[2][0]++;
    }
    if (goasts[2][2]<=-20) {
        goasts[2][2]=0;
        goasts[2][0]--;
    }
    if (goasts[2][3]>=20) {
        goasts[2][3]=0;
        goasts[2][1]++;
    }
    if (goasts[2][3]<=-20) {
        goasts[2][3]=0;
        goasts[2][1]--;
    }

    if (goasts[2][0]===0) {
        goasts[2][0]=28;
    }
    if (goasts[2][0]===29) {
        goasts[2][0]=1;
    }

    if (pacX === goasts[2][0] && pacY === goasts[2][1] && goasts[2][4]==='attack') {
        die_frame = 0;

        die();
    }

    ////////////
    //  BLUE  //
    ////////////

    if (pellet_counter<0 && goasts[3][4]!=='dead') {
        goasts[3][4]='attack';
    }
    else if (pellet_counter>0 && goasts[3][4]!=='dead') {
        goasts[3][4]='scared';
    }
    
    num = 0;
    if (goasts[3][4]==='attack'){
    num = 0;
    if (goasts[3][2]===0 && goasts[3][3]===0) {
        if (map[goasts[3][1]][goasts[3][0]-1]!=="1" && map[goasts[3][1]][goasts[3][0]-1]!=="2" && goasts[3][5]!=='right') {
            num2 = Math.sqrt((goasts[3][0]-pacX+1)*(goasts[3][0]-pacX+1)+(goasts[3][1]-pacY)*(goasts[3][1]-pacY));

            if (num2>num) {
                num = num2;
                goasts[3][6] = 'left';
            }
        }
        if (map[goasts[3][1]][goasts[3][0]+1]!=="1" && map[goasts[3][1]][goasts[3][0]+1]!=="2" && goasts[3][5]!=='left') {
            num2 = Math.sqrt((goasts[3][0]-pacX-1)*(goasts[3][0]-pacX-1)+(goasts[3][1]-pacY)*(goasts[3][1]-pacY));

            if (num2>num) {
                num = num2;
                goasts[3][6] = 'right';
            }
        }
        if (map[goasts[3][1]-1][goasts[3][0]]!=="1" && map[goasts[3][1]-1][goasts[3][0]]!=="2" && goasts[3][5]!=='down') {
            num2 = Math.sqrt((goasts[3][0]-pacX)*(goasts[3][0]-pacX)+(goasts[3][1]-pacY+1)*(goasts[3][1]-pacY+1));

            if (num2>num) {
                num = num2;
                goasts[3][6] = 'up';
            }
        }
        if (map[goasts[3][1]+1][goasts[3][0]]!=="1" && map[goasts[3][1]+1][goasts[3][0]]!=="2" && goasts[3][5]!=='up') {
            num2 = Math.sqrt((goasts[3][0]-pacX)*(goasts[3][0]-pacX)+(goasts[3][1]-pacY-1)*(goasts[3][1]-pacY-1));

            if (num2>num) {
                num = num2;
                goasts[3][6] = 'down';
            }
        }
    }
    }
    num = 0;
    if (goasts[3][4]==='scared'){
    
    if (goasts[3][2]===0 && goasts[3][3]===0) {
        if (map[goasts[3][1]][goasts[3][0]-1]!=="1" && map[goasts[3][1]][goasts[3][0]-1]!=="2" && goasts[3][5]!=='right') {
            num2 = Math.random(0, 100);

            if (num2>num) {
                num = num2;
                goasts[3][6] = 'left';
            }
        }
        if (map[goasts[3][1]][goasts[3][0]+1]!=="1" && map[goasts[3][1]][goasts[3][0]+1]!=="2" && goasts[3][5]!=='left') {
            num2 = Math.random(0, 100);

            if (num2>num) {
                num = num2;
                goasts[3][6] = 'right';
            }
        }
        if (map[goasts[3][1]-1][goasts[3][0]]!=="1" && map[goasts[3][1]-1][goasts[3][0]]!=="2" && goasts[3][5]!=='down') {
            num2 = Math.random(0, 100);

            if (num2>num) {
                num = num2;
                goasts[3][6] = 'up';
            }
        }
        if (map[goasts[3][1]+1][goasts[3][0]]!=="1" && map[goasts[3][1]+1][goasts[3][0]]!=="2" && goasts[3][5]!=='up') {
            num2 = Math.random(0, 100);

            if (num2>num) {
                num = num2;
                goasts[3][6] = 'down';
            }
        }
    }
    if (pacX === goasts[3][0] && pacY === goasts[3][1]) {
        points+=150;
        goasts[3][4] = 'dead';
    }
    }
    num = 0;
    if (goasts[3][4]==='dead'){
    if (goasts[3][2]===0 && goasts[3][3]===0) {
        if (map[goasts[3][1]][goasts[3][0]-1]!=="1" && map[goasts[3][1]][goasts[3][0]-1]!=="2" && goasts[3][5]!=='right') {
            num2 = Math.sqrt((goasts[3][0]-17+1)*(goasts[3][0]-17+1)+(goasts[3][1]-15)*(goasts[3][1]-15));

            if (num2>num) {
                num = num2;
                goasts[3][6] = 'left';
            }
        }
        if (map[goasts[3][1]][goasts[3][0]+1]!=="1" && map[goasts[3][1]][goasts[3][0]+1]!=="2" && goasts[3][5]!=='left') {
            num2 = Math.sqrt((goasts[3][0]-17-1)*(goasts[3][0]-17-1)+(goasts[3][1]-15)*(goasts[3][1]-15));

            if (num2>num) {
                num = num2;
                goasts[3][6] = 'right';
            }
        }
        if (map[goasts[3][1]-1][goasts[3][0]]!=="1" && map[goasts[3][1]-1][goasts[3][0]]!=="2" && goasts[3][5]!=='down') {
            num2 = Math.sqrt((goasts[3][0]-17)*(goasts[3][0]-17)+(goasts[3][1]-15+1)*(goasts[3][1]-15+1));

            if (num2>num) {
                num = num2;
                goasts[3][6] = 'up';
            }
        }
        if (map[goasts[3][1]+1][goasts[3][0]]!=="1" && map[goasts[3][1]+1][goasts[3][0]]!=="2" && goasts[3][5]!=='up') {
            num2 = Math.sqrt((goasts[3][0]-17)*(goasts[3][0]-17)+(goasts[3][1]-15-1)*(goasts[3][1]-15-1));

            if (num2>num) {
                num = num2;
                goasts[3][6] = 'down';
            }
        }
    
        if (goasts[3][0]===17 && goasts[3][1]===15) {
            goasts[3][4]='attack';
        }
    }
    }

    if (goasts[3][6]==='up') {
        goasts[3][3]-=1.6;
        goasts[3][5]='up';
    }
    else if (goasts[3][6]==='right') {
        goasts[3][2]+=1.6;
        goasts[3][5]='right';
    }
    else if (goasts[3][6]==='left') {
        goasts[3][2]-=1.6;
        goasts[3][5]='left';
    }
    else if (goasts[3][6]==='down') {
        goasts[3][3]+=1.6;
        goasts[3][5]='down';
    }

    if (goasts[3][2]>=20) {
        goasts[3][2]=0;
        goasts[3][0]++;
    }
    if (goasts[3][2]<=-20) {
        goasts[3][2]=0;
        goasts[3][0]--;
    }
    if (goasts[3][3]>=20) {
        goasts[3][3]=0;
        goasts[3][1]++;
    }
    if (goasts[3][3]<=-20) {
        goasts[3][3]=0;
        goasts[3][1]--;
    }

    if (goasts[3][0]===0) {
        goasts[3][0]=28;
    }
    if (goasts[3][0]===29) {
        goasts[3][0]=1;
    }

    if (pacX === goasts[3][0] && pacY === goasts[3][1] && goasts[3][4]==='attack') {
        die_frame = 0;
        
        die();
    }
}

function levels () {
    quit = false;

    for (var x = 0; x<map[0].length; x++) {
        for (var y = 0; y<map.length; y++) {
            if (map[y][x]===' ') {
                quit = true;
            }
            if (y === map.length-1 && x === map[0].length-1 && quit === false) {
                points+=1000;
                level++;

                frame = 0;
                pacX = 16;
                pacY = 27;
                pac_offset_y = 0;
                pac_offset_x = 0;
                pac_face = null;
                pellet_counter = 0;

                map = [
                    'wwwwwwwwwwwwwwwwwwwwwwwwwwwww',
                    'w1111111111111111111111111111',
                    'w1            11            1',
                    'w1 1111 11111 11 11111 1111 1',
                    'w1p1111 11111 11 11111 1111p1',
                    'w1                          1',
                    'w1 1111 11 11111111 11 1111 1',
                    'w1 1111 11 11111111 11 1111 1',
                    'w1      11    11    11      1',
                    'w111111 11111 11 11111 111111',
                    'w111111 11111 11 11111 111111',
                    'w111111 11          11 111111',
                    'w111111 11 22233222 11 111111',
                    'w111111 11 2nnnnnn2 11 111111',
                    'w          2nnnnnn2          ',
                    'w111111 11 2nnnnnn2 11 111111',
                    'w111111 11 22233222 11 111111',
                    'w111111 11          11 111111',
                    'w111111 11 11111111 11 111111',
                    'w111111 11 11111111 11 111111',
                    'w1            11            1',
                    'w1 1111 11111 11 11111 1111 1',
                    'w1p1111 11111 11 11111 1111p1',
                    'w1   11                11   1',
                    'w111 11 11 11111111 11 11 111',
                    'w111 11 11 11111111 11 11 111',
                    'w1   11 11 11111111 11 11   1',
                    'w1 1111 11          11 1111 1',
                    'w1 1111 11 11111111 11 1111 1',
                    'w1         11111111         1',
                    'w1111111111111111111111111111',
                    'wwwwwwwwwwwwwwwwwwwwwwwwwwwww'
                ];

                spawnGoasts();

                timer = 0;
                timer2 = 600;


                die_frame = 1;
            }
        }
    }
}

//repeats at ~ 60 fps
draw = function () {

    /////////////////////
    //  resize canvas  //
    /////////////////////

    canvas.width = Math.round(window.innerWidth/2)*2;
    canvas.height = Math.round(window.innerHeight/2)*2;

    if (page === "main") {

        //////////////////
        //  background  //
        //////////////////

        background();
    
        ///////////////
        //  3d text  //
        ///////////////

        fill(150, 150, 150);
        textSize(60);
        
        strokeWidth(1);
        stroke(0);

        i = 0;
    
        while (i<8) {
            text("Scatter", canvas.width/2+i/1.8, canvas.height/4+i*1);
            i++;
        }

        ///////////////
        //  BUTTONS  //
        ///////////////

        var button1 = document.getElementById("playbutton");
        var button2 = document.getElementById("howbutton");

        button1.addEventListener("click", function () {
            page = "play";
            buttons.innerHTML = null;
            spawnGoasts();
        });

        button2.addEventListener("click", function () {
            page = "how";
            buttons.innerHTML = '<button id = "howbackbutton" class="gamebuttons">BACK</button>';
        });
    }
    if (page === "play") {

        //////////////////
        //  BACKGROUND  //
        //////////////////

        if (lives>=1) {
            fill(50);
            rect(0, 0, canvas.width, canvas.height);
            noStroke();
            fill(0);
            textSize(20);

            text("Score: "+points, canvas.width/2, 30);
            text("Level: "+(level+1), 100, 30);
            text("Highscore: "+highScore, canvas.width-100, 30);

            playBackground();

            drawGoasts();
            bonusFruitDraw();
            goastPhysics();

            if (die_frame!==0) {
                bonusFruitGen();
                bonusFruitPhysics();

                pacManPhysics();

                if (pac_offset_y===0 && pac_offset_x===0) {
                        if (keys[39] === true) {
                        pac_face = 'down';
                    }
                    if (keys[37] === true) {
                        pac_face = 'up';
                    }
                    if (keys[38] === true) {
                        pac_face = 'left';
                    }
                    if (keys[40] === true) {
                        pac_face = 'right';
                    }
                }

                drawPacMan();

                levels();
            }
        }
        else {
            fill(50);
            rect(0, 0, canvas.width, canvas.height);
            noStroke();
            fill(0);
            textSize(20);

            text("Score: "+points, canvas.width/2, 30);
            text("Level: "+(level+1), 100, 30);
            text("Highscore: "+highScore, canvas.width-100, 30);

            playBackground();

            drawGoasts();
            drawPacMan();

            lose();
        }

        if (points<0) {
            points = 0;
        }
    }
    if (page === "how") {
        //////////////////
        //  BACKGROUND  //
        //////////////////

        background();

        ////////////////////
        //  INSTRUCTIONS  //
        ////////////////////

        fill(255);
        noStroke();
        textSize(15);

        text("Arrow Keys to move, eat pellets, the big ones charge pac-man up.", canvas.width/2, canvas.height/5);
        text("When in a powered up state, pac-man can eat goasts. Snag the bonus fruit", canvas.width/2, canvas.height/5+30);
        text("To gain extra points. Their are infinite levels, and above all: Aviod", canvas.width/2, canvas.height/5+60);
        text("Inky, Pinky, Blinky, and Clyde!", canvas.width/2, canvas.height/5+90);
        text("Note: All code has been written by me, and this is therefore not", canvas.width/2, canvas.height/5+300);
        text("Plagarizim, I simply took the idea, and the game envirment is slightly", canvas.width/2, canvas.height/5+330);
        text("Different then the origional.", canvas.width/2, canvas.height/5+360);

        ///////////////
        //  BUTTONS  //
        ///////////////

        var button1 = document.getElementById("howbackbutton");

        button1.addEventListener("click", function () {
            page = "main";
            buttons.innerHTML = '<button id="playbutton" class="gamebuttons">PLAY</button> <button id = "howbutton" class="gamebuttons">HOW</button>';
        });
    }

    if ((canvas.width<650 || canvas.height<700) && alertrun===false) {
        alertrun = true;
        if (alertMode === 'NORMAL') {
            alert("Your window is smaller then the reccomended minimal size of 650 by 700 pixels. Please resize your window.");
        }
        if (alertMode === 'Kahn') {
            alert("Your window is smaller then the reccomended minimal size of 650 by 700 pixels. Please go here to resize your window: "+kahnLink);
        }
    }
}

//repeat the draw loop at about 60 fps
setInterval(draw, 16);

window.addEventListener('keydown', key = function () {
    keys = [];
    keys[event.keyCode] = true;
});