let video;
let poseNet;
let pose;

function setup() {
	createCanvas(windowWidth, windowHeight);
	video = createCapture(VIDEO);
	video.hide();
	poseNet = ml5.poseNet(video, () => console.log("poseNet ready"));
	poseNet.on("pose", gotPoses);
}

function gotPoses(poses){
	if(poses.length > 0){
		pose = poses[0].pose;
	}
}

let start = 0;
let duration = 0; 
let inside = false;
counter = 0;

function draw() {
	let img = image(video, 0, 0);
	
	if(pose){
		fill(255,0,0);
		let faceCenter = {
			x: (pose.nose.x + pose.leftEye.x + pose.rightEye.x) / 3,
			y: (pose.nose.y + pose.leftEye.y + pose.rightEye.y) / 3
		}
		let eyeDist = dist(pose.leftEye.x, pose.leftEye.y, pose.rightEye.x, pose.rightEye.y);
		let leftWristDist = dist(pose.leftWrist.x, pose.leftWrist.y, faceCenter.x, faceCenter.y);
		let rightWristDist = dist(pose.rightWrist.x, pose.rightWrist.y, faceCenter.x, faceCenter.y);
		ellipse(pose.leftWrist.x, pose.leftWrist.y, 15);
		ellipse(pose.rightWrist.x, pose.rightWrist.y, 15);
		ellipse(faceCenter.x, faceCenter.y, eyeDist * 6);


		if(leftWristDist < eyeDist * 3 || rightWristDist < eyeDist * 3){
			counter++;
		}
		else {
			if(counter > 1){
				counter -= 2;
			}
		}
		
		if(counter >= 15){
			let ranX = Math.floor(Math.random() * 80) - 40;
			let ranY = Math.floor(Math.random() * 80) - 40;
			var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
								'#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
								'#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
								'#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
								'#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
								'#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
								'#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
								'#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
								'#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
								'#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
			var randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];

			let imgLink = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5UPepueGSK7TbHwk-6Vomk1jpsL0WLeFZWmghyyrVdA&s";
			var troll = window.open("", "MsgWindow", "width=800,height=800");
			troll.focus();
			troll.document.body.style.backgroundColor = randomColor;
			troll.document.write("<center><p style:'font-size:200px;'>NO NO NO NO NO NO NO NO NO NO NO NO NO NO NO NO NO NO</p></center>");
			troll.document.write("<center><img src="+ imgLink +" alt='itchy' width='500' height='600'></center>");
			troll.scrollBy(0, 40);
			troll.moveBy(ranX,ranY);
		}
	}
}