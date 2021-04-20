class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state  
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    cars = [car1, car2, car3, car4];
    for(let i = 0;i<cars.length;i++){
      cars[i].addImage("fat car"+i,carimg[i]);

    }
  }
  end(){
    let message;
    if(player.rank === 1){
      message = 'congrats bro u did it! this is ur rank => '
      fill('yellow');
    }else{
      message = "you are sh*****t at this game go DIE!!!! ur rank => "
      fill('red')
    }
    textSize(50)
    
    text(message+player.rank,10,(camera.position.y-height/2)+40)
  }

  play(){
    form.hide();
    
    // background(ground)
    Player.getPlayerInfo();
    player.getcae();
    if(allPlayers !== undefined){
      //var display_position = 100;
      
      //index of the array
      var index = 0;
      image(ground, 0,-height*4+camera.position.y/10,width,height*2);
      image(track, 0,-height*4,width,height*5);
      
      //x and y position of the cars
      var x = 200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        // console.log(cars[index-1].x)
        if(cars[index-1] !== undefined){
          cars[index-1].x = x;
          cars[index-1].y = y;
        }
        
        
        
        let c = cars[index - 1];
        // image(shadow[index],c.x-35, c.y-30, c.width, c.height)
        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
          let c = cars[index - 1];
          push()
          fill(color('yellow'))
          noStroke()
          translate(0, 70)
          triangle(0+c.x, 0+c.y, 30+c.x, 30+c.y, -30+c.x, 30+c.y);
          pop()
        }
        
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance += 10
      player.update();
    }
    if(player.distance > 4200){
      gameState = 2;
      player.rank += 1;
      Player.updatecae(player.rank);
    }
    drawSprites();
  }
}
