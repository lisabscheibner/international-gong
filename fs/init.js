load('api_config.js');
load('api_rpc.js');
load('api_dht.js');
load('api_timer.js');
load('api_mqtt.js');

let gong = Cfg.get('app.gong');

let ringGong = function() {
  print(gong);
};

MQTT.sub('gongring/1', function(conn, topic, msg) {
  print('Topic:', topic, 'message:', msg);
  let curMessage = JSON.parse(msg);
  if (curMessage.action === 'gong') {
    ringGong();
  }
}, null);

Timer.set(1000, Timer.REPEAT, function() {
  ringGong();
}, null);