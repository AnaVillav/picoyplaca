
// --------------Responsive------------

//mobile Check
window.mobileCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

var mobile = window.mobileCheck() == 1;

//scale HTML div
var appScaler = document.getElementById("appPixi");

var appWidth = window.innerWidth - 16;
var appHeight = window.innerHeight * .6 - 16;
if (appHeight <300) appHeight = 300;
appScaler.style.width = appWidth + "px";
appScaler.style.height = appHeight + "px";


// --------------Application------------
//create
let app = new PIXI.Application({
    width: appWidth,
    height: appHeight,
    transparent: false,
    backgroundColor: 0xa0ccef
});

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;
PIXI.settings.ROUND_PIXELS = true;

//add to window
appScaler.appendChild(app.view);

//--------------Loader---------------------
const loading = PIXI.Sprite.from('assets/loading.png');

loading.anchor.set(0.5);
loading.x = appWidth / 2;
loading.scale.set(0.5);
loading.y = appHeight / 2;
app.stage.addChild(loading);
app.ticker.add((delta) => {
    loading.rotation += 0.01 * delta;
});

const loader = PIXI.Loader.shared;
loader.baseUrl = 'assets';

//sprites
var car, wheelb, wheelf, trafficLight;
var trafficl_textures = [];
const piso = new PIXI.Graphics();
loader.add('car', 'car.png');
loader.add('wheel', 'wheel.png');
loader.add('yellow', 'yellow.png');
loader.add('red', 'red.png');
loader.add('green', 'green.png');


const c_car = new PIXI.Container();
const c_sprites = new PIXI.Container();

WebFont.load({
    google: {
        families: ['Titillium Web']
    },
    active: e => {

        loader.load((loader, resources) => {
            car = new PIXI.Sprite(resources.car.texture);
            wheelb = new PIXI.Sprite(resources.wheel.texture);
            wheelf = new PIXI.Sprite(resources.wheel.texture);

            trafficl_textures[0] = new PIXI.Texture(resources.yellow.texture);
            trafficl_textures[1] = new PIXI.Texture(resources.green.texture);
            trafficl_textures[2] = new PIXI.Texture(resources.red.texture);
        });

        loader.onComplete.add((loader) => {
            gsap.to(loading, {
                alpha: 0, duration: .5, ease: "power2.in", onComplete:
                    function () {
                        app.stage.removeChild(loading);
                        loading.visble = false;
                    }
            }
            );
            trafficLight = new PIXI.Sprite(trafficl_textures[0]);
            app.ticker.stop();
            init();
            gsap.ticker.add(update);
        });
    }
});


//---------------------------Text-Title--------------- 
const styleTitle = new PIXI.TextStyle({
    fontFamily: 'Titillium Web',
    fontSize: 36,
    fontStyle: 'bold',
    fill: '#01016f',
});

const styleSubtitle = new PIXI.TextStyle({
    fontFamily: 'Titillium Web',
    fontSize: 20,
    fontStyle: 'normal',
    fill: '#01016f',
});

const title = new PIXI.Text('PICO Y PLACA', styleTitle);
const subtitle = new PIXI.Text('consulta tu movilidad', styleSubtitle);


var state = 0;
var pic_position = [];

//***********************FUNCTIONS**************************

//window Resize event
window.addEventListener('resize', resizeScale);
var scaleContainer = appHeight /540;
function resizeScale() {
    appWidth = window.innerWidth - 16;
    appHeight = window.innerHeight * .6 - 16;
    if (appHeight <300) appHeight = 300;
    appScaler.style.width = appWidth + "px";
    appScaler.style.height = appHeight + "px";
    app.renderer.resize(appWidth, appHeight);
    scaleContainer = appHeight /540;

    placeRelativeSprites();
}

//init
function init() {
    addSprites();
    wheelAnim();
}

function addSprites() {

    title.anchor.set(0.5);
    subtitle.anchor.set(0.5);
    title.position.y = 50;
    subtitle.position.y = 75;

    wheelb.anchor = wheelf.anchor.set(0.5);
    wheelb.position.x = 75;
    wheelf.position.x = 360;
    wheelb.position.y = wheelf.position.y = 110;

    trafficLight.position.x = 200;
    c_car.scale.set(0.9);
    trafficLight.scale.set(0.9);
    c_car.position.x = -400;
    c_car.position.y = 350;
    trafficLight.position.y = 120;
    c_car.addChild(car, wheelb, wheelf);

    piso.beginFill(0x5a5a5a);
    piso.drawRect(-960, 430, 1910, 120);
    piso.endFill();

    placeRelativeSprites();
    
    c_sprites.position.x = appWidth/2;
    c_sprites.addChild(piso,trafficLight, c_car );
    app.stage.addChild(title, subtitle, c_sprites);
}

function placeRelativeSprites() {

    title.position.x = subtitle.position.x = appWidth * .5;
    c_sprites.position.x = appWidth/2;
    c_sprites.scale.set (scaleContainer); 
    piso.scale.set (3.2*scaleContainer, 1);

}


//animations update
var wheelfA, wheelbA;
function wheelAnim() {

    wheelbA = gsap.to(wheelb, { rotation: 6.28, duration: 3, repeat: -1, ease: "none" });
    wheelfA = gsap.to(wheelf, { rotation: 6.28, duration: 3, repeat: -1, ease: "none" });
}

function modalAnim(_move) {
    if (_move) {
        
        trafficLight.texture= trafficl_textures [1];
        setTimeout(() => {
            
        gsap.to (c_car.position, {x: 1500, duration: 3, ease: "back.in(0.5)"});
        }, 1000);
    }else {
        
        trafficLight.texture= trafficl_textures [2];
        setTimeout(() => {
            gsap.to (c_car.position, {x:-200, duration: 1, ease: "back.in(0.5)", onComplete:
            function () {
                wheelbA.kill();
                wheelfA.kill();
            }
            });
            }, 1000);
            

    }
}

function resetAnim () {

    gsap.to (c_car.position, {x: -400, duration: 1});
    trafficLight.texture= trafficl_textures [0];
 
    wheelbA.restart();
    wheelfA.restart();
}

function update() {

    if (loading.visible == true) {
        app.ticker.update();
    }



};



//--------------------Interaction------------------------


var info = {}

var modal = document.getElementById("modalResolution");
var bt_consult = document.getElementById("consult");
var bt_close = document.getElementById("close");


var licenseplate = document.getElementById("licenseplate");
var time = document.getElementById("time");
var date = document.getElementById("date");


var missingInfo = document.getElementById("missingInfo");

var feedback = document.getElementById("feedback");
var feedbackIcon = document.getElementById("feedbackIcon");

var licenseplate_value, time_value, date_value;

consult.onclick = function () {


    
    if (licenseplate.value!= "" && time.value!= "" && date.value != "") {
        collectData ();
        missingInfo.style.display = "none";
    } else {
        
        missingInfo.style.display = "block";
    }
 



}

bt_close.onclick = function () {
    closeModal();
}

window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
}
function collectData() {

    licenseplate_value = licenseplate.value;
    time_value = time.value;
    date_value = new Date(date.value);
    var lastcharacter = licenseplate_value.charAt(licenseplate_value.length - 1);
    var day = date_value.getDay();

    var move = checkMobility(lastcharacter, day, time_value);
    feedbackModal(move);

}
function checkMobility(_lastcharacter, _day, _time) {

    if (_day < 5) {
        if (_time > "07:00:00" && _time < "09:30:00" || _time > "16:00:00" && _time < "19:30:00" ) {

            switch (_day) {
                case 0:

                    if (_lastcharacter > 0 && _lastcharacter < 3) {
                        return false;
                    } else {
                        return true;
                    }

                case 1:

                    if (_lastcharacter > 2 && _lastcharacter < 5) {
                        return false;
                    } else {
                        return true;
                    }
                case 2:

                    if (_lastcharacter > 4 && _lastcharacter < 7) {
                        return false;
                    } else {
                        return true;
                    }

                case 3:
                    if (_lastcharacter > 6 && _lastcharacter < 9) {
                        return false;
                    } else {
                        return true;
                    }

                case 4:
                    if (_lastcharacter > 8 || _lastcharacter == 0) {
                        return false;
                    } else {
                        return true;
                    }
            }

        } else {
            return true;
        }


    } else {

        return true;
    }

}

function feedbackModal(_move) {
    modalAnim(_move);
    if (_move) {
        feedback.innerHTML = "Puedes movilizarte el día " + date.value + " a las " + time_value;
        feedbackIcon.src = "assets/yes.png"
    } else {
        feedback.innerHTML = "No puedes movilizarte el día " + date.value + " a las " + time_value;
        feedbackIcon.src = "assets/no.png"
    }


    modal.style.display = "block";


}

function closeModal() {


    licenseplate.value = "";
    date.value = "";
    time.value = "";
    modal.style.display = "none";
    setTimeout(() => {
    resetAnim ();
    }, 1500);

}

