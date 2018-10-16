import { Snake } from './snake.js';
import { SnakeEvolution } from './snakeEvolucion.js';
import { Hole } from './hole.js';


window.onload = function () {

    var ejecucion = null;
    var snakesCollection = [];
    var canvas = document.getElementById("mycanvas");
    var ctx = canvas.getContext("2d");
    var mySnake=new SnakeEvolution(20, 20, 1, 1, 5, ctx, canvas);
    var holes = [];
    var points = 0;
    var paused = false;
    var food = new Hole(45, 166, 20, "food", ctx, canvas);
    var mouseX;
    var mouseY;

    // // Initialize Firebase
    // var config = {
    //     apiKey: "AIzaSyDAYPQV5Ppl16nHIm6gPu6kqFp-OSIYbJE",
    //     authDomain: "angularapp-f822b.firebaseapp.com",
    //     databaseURL: "https://angularapp-f822b.firebaseio.com",
    //     projectId: "angularapp-f822b",
    //     storageBucket: "angularapp-f822b.appspot.com",
    //     messagingSenderId: "1050486471339"
    // };

    // //Cargamos firebase
    // firebase.initializeApp(config);
    // var database = firebase.database();

    // //Escuchamos cambios en snakes
    // database.ref("snakes").on("value", (datos) => {
    //     var snakes = datos.val();
    //     console.log(snakes);
    //     // for (const key in snakes) {
    //     //     const s = snakes[key];
    //     //     var sn = snakesCollection.filter((snake) => {
    //     //         return snake.name == key;
    //     //     });
    //     //     if (sn.length > 0) {
    //     //         sn[0].head.x = s.x;
    //     //         sn[0].head.y = s.y;
    //     //         sn[0].dy = s.dy;
    //     //         sn[0].dy = s.dy;
    //     //     } else {

    //     //     }

    //     //     // var snake=new SnakeEvolution(s.x,s.y,s.dx,s.dy,s.long,ctx,canvas);
    //     //     // snake.setBody(s.body);
    //     //     // // console.log(s.body);
    //     //     // snake.name=key;

    //     //     // snakesCollection.push(snake);
    //     // }
    //     // console.log(snakesCollection);
    // })
    // database.ref("food").on("value", (datos) => {
    //     if (food != null) {
    //         food.x = datos.val().food.x;
    //         food.y = datos.val().food.y;
    //     } else {
    //         food = new Hole(datos.val().food.x, datos.val().food.y, 20, "food", ctx, canvas);
    //     }
    // })

    for (let index = 0; index < 5; index++) {
        var hole = new Hole(200, 50, 20, "bad", ctx, canvas);
        holes.push(hole);
    }

    var aleatorio = this.setInterval(() => {
        for (const hole of holes) {
            do {
                var newX = Math.random() * (canvas.width - hole.radio - hole.radio) + hole.radio;
                var newY = Math.random() * (canvas.height - hole.radio - hole.radio) + hole.radio;
            } while (distance([mySnake.head.x, mySnake.head.y], [newX, newY]) < 30 && distance([food.x, food.y], [newX, newY]) < 40)

            hole.x = newX;
            hole.y = newY;
        }
    }, 10000);


    document.getElementById("btnEmpezar").addEventListener('click', () => {
        // ejecucion = setInterval(draw, 10);


        var snakeName = "";
        if (document.getElementById("name").value == "")
            snakeName = "snake" + Math.trunc((Math.random() * (1000 * 1) + 1));
        else snakeName = document.getElementById("name").value;

        mySnake = new SnakeEvolution(20, 20, 1, 1, 5, ctx, canvas);
        mySnake.name = snakeName;

        document.getElementById("intentoformulario").setAttribute("class", "ocultar");
    })

    canvas.addEventListener('mousemove', (evt) => {
        mouseX = evt.clientX - 9;
        mouseY = evt.clientY - 9;
        var pos = mySnake.posicion();
        var dir = mySnake.direccion();
        if (mouseX > pos.x && dir.dx < 0) mySnake.girarX();
        if (mouseX < pos.x && dir.dx > 0) mySnake.girarX();
        if (mouseY > pos.y && dir.dy < 0) mySnake.girarY();
        if (mouseY < pos.y && dir.dy > 0) mySnake.girarY();
    })

    //Para pausar el juego >>>tecla p
    document.addEventListener('keyup', (evt) => {
        console.log(evt);
        if (evt.key == "p") {
            if (paused) {
                paused = false;
                canvas.style.opacity = 1;
                ejecucion = setInterval(draw, 10)
            } else {
                paused = true;
                canvas.style.opacity = 0.5;
                pause();
            }
        }
    })
    function pause() {
        cancelAnimationFrame(ejecucion);
        // ejecucion = clearInterval(ejecucion);
    }

    //Función dibujar
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "bold 20px sans-serif";
        ctx.fillText("Points: " + points, 10, 20);
        //dibujamos los agujeros
        for (const hole of holes) {
            hole.draw()
        }

        mySnake.drawSnake();
        // snakesCollection.forEach(snake => {
        //     snake.drawSnake();
        // });

        food.draw();
        mySnake.moveSnake(mouseX, mouseY);
        collisions();
        // actualizarSnake(mySnake);
    }



    function collisions() {
        var f = food.getCharacteristic();
        var s = mySnake.posicion()
        for (const hole of holes) {
            var h = hole.getCharacteristic();
            var d = distance([h.x, h.y], [s.x, s.y]);
            if (d < h.r) {
                clearInterval(ejecucion);
                clearInterval(aleatorio);
                //Eliminar Serpiente
                // database.ref('snakes/' + mySnake.name).remove();
                // mySnake = null;
                alert("te caiste");
            }
        }
        var df = distance([f.x, f.y], [s.x, s.y]);
        if (df < f.r) {
            points++;
            var newX = Math.random() * (canvas.width - 2 * food.radio) + food.radio;
            var newY = Math.random() * (canvas.height - 2 * food.radio) + food.radio;
            // database.ref('food/food').set({
            //     x: newX,
            //     y: newY,
            // });
            mySnake.crecer();
        }

    }

    function distance([x1, y1], [x2, y2]) {
        return Math.sqrt((Math.pow((x1 - x2), 2)) + (Math.pow((y1 - y2), 2)))
    }

    function actualizarSnake(snake) {
        console.log(snake.balls.length);
        if (snake)
            database.ref('snakes/' + snake.name).set(snake
                //     {
                //     x: snake.head.x,
                //     y: snake.head.y,
                //     dx: snake.head.dx,
                //     dy: snake.head.dy,
                //     body: snake.balls,
                //     long: snake.balls.length
                // }
            );
    }



    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

    var start = Date.now();  // Only supported in FF. Other browsers can use something like Date.now().

    var myReq;

    function step(timestamp) {
        console.log("step")
        console.log(timestamp,start)
        var progress = timestamp - start;
        if (progress < 2000) {
            draw();
            myReq = requestAnimationFrame(step);
        }
    }
    myReq = requestAnimationFrame(step);

    // window.cancelAnimationFrame(myReq);

};







