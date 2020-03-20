var config = {
	type: Phaser.AUTO,
	width: 1024,
	height: 768,
physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
scene: {
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);
var score = 0;
var platforms;
var player;
var cursors; 
var stars;
var scoreText;
var bomb;


function preload(){
	this.load.image('background','assets/background_pacman.png');	
	this.load.image('etoile','assets/ennemi_space_war.png');
	this.load.image('sol','assets/murs_pacman.png');
	this.load.image('bomb','assets/fantome_pacman.png');
	this.load.spritesheet('perso','assets/pacman_perso.png',{frameWidth: 80, frameHeight: 80});

}

function create(){
	this.add.image(512,384,'background');

	platforms = this.physics.add.staticGroup();
	platforms.create(512,1000,'sol').setScale(3).refreshBody();
	platforms.create(30,380,'sol').setScale(0.5).refreshBody();
	platforms.create(30,200,'sol').setScale(0.5).refreshBody();
	platforms.create(30,570,'sol').setScale(0.5).refreshBody();
	platforms.create(900,380,'sol').setScale(0.5).refreshBody();
	platforms.create(512,-230,'sol').setScale(3).refreshBody();

	//platforms.create(900,600,'sol').setScale(0.5).refreshBody().angle(90);
		
	
	player = this.physics.add.sprite(100,450,'perso');
	player.setCollideWorldBounds(true);
	player.setBounce(0);
	player.body.setGravityY(0);
	this.physics.add.collider(player,platforms);
	
	cursors = this.input.keyboard.createCursorKeys(); 
	
	this.anims.create({
		key:'left',
		frames: this.anims.generateFrameNumbers('perso', {start: 0, end: 4}),
		frameRate: 10,
		repeat: -1
	});
	
	this.anims.create({
		key:'stop',
		frames: [{key: 'perso', frame:1}],
		frameRate: 20
	});
	
	stars = this.physics.add.group({
		key: 'etoile',
		repeat:400,
		setXY: {x:20,y:20,stepX:40,stepY:40}
	});
	
	
	this.physics.add.overlap(player,stars,collectStar,null,this);
	scoreText = this.add.text(16,16, 'score: 0', {fontSize: '32px', fill:'#F8f8ff'});
	bombs = this.physics.add.group();
	
	this.physics.add.collider(bombs,platforms);
	this.physics.add.collider(player,bombs, hitBomb, null, this);


}



function update(){
	if(cursors.left.isDown){
		player.setVelocityX(-350);
		player.anims.play('left', true);	
		player.setFlipX(true);
	}
		else{
		player.anims.play('stop', true);
		player.setVelocityX(0);
	
	}
	 if(cursors.right.isDown){
		player.setVelocityX(350);
		player.anims.play('left', true);
		player.setFlipX(false);
	}
		else{
		player.anims.play('stop', true);
		player.setVelocityX(0);
	
	}
	
	 if(cursors.up.isDown){
		player.anims.play('left', true);
		player.setVelocityY(-350);
		player.setFlipX(true);
	}
		else{
		player.anims.play('stop', true);
		player.setVelocityX(0);
	
	}
	if(cursors.down.isDown){
		player.setVelocityY(350);
		player.anims.play('left', true);
		player.setFlipX(false);
	}else{
		player.anims.play('stop', true);
		player.setVelocityX(0);
	}
	
		
}
function hitBomb(player, bomb){
	this.physics.pause();
	player.setTint(0xff0000);
	player.anims.play('turn');
	gameOver=true;
}

function collectStar(player, star){
	star.disableBody(true,true);
	score += 10;
	scoreText.setText('score: '+score);
	if(stars.countActive(true)===0){
		stars.children.iterate(function(child){
			child.enableBody(true,child.x,0, true, true);
		});
	when(score==500)
		
	}
}
