'use strict' //设置为严格模式

const crypto = require('crypto'),//引入加密模块
  xmlParser = require('xml2js'),
    buildXML = new xmlParser.Builder({rootName:'xml',cdata:true,headless:true,renderOpts :{indent:' ',pretty:'true'}}); //用于构建 xml 结构

/**
 * 构建 微信消息加解密对象
 * @param {JSON} config 微信配置文件 
 * @param {Request} req  Request 对象
 */
var CryptoGraphy = function(config,req){
    //设置加解密算法
    this.aesModel = 'aes-256-cbc';
    //设置 CryptoGraphy 对象属性 token
    this.token = config.token;
    //设置 CryptoGraphy 对象属性 appID
    this.appID = config.appID;
    //设置 CryptoGraphy 对象属性 encodingAESKey
    this.encodingAESKey = new Buffer(config.encodingAESKey + '=','base64');
    //设置 CryptoGraphy 对象属性 iv
    this.iv = this.encodingAESKey.slice(0,16);
    //设置 CryptoGraphy 对象属性 msgSignature
    this.msgSignature = req.query.msg_signature;
    //设置 CryptoGraphy 对象属性 timestamp
    this.timestamp = req.query.timestamp;
    //设置 CryptoGraphy 对象属性 timestamp
    this.nonce = req.query.nonce;
}

/**
 * 解析 XML 转为 JSON
 * @param  {String} xml xml格式的字符串
 * @return {JSON} 解析后的JSON对象
 */
CryptoGraphy.prototype.parseXmlToJSON = function(xml){
    if (!xml || typeof xml != 'string') return {};
		var re = {};
		xml = xml.replace(/^<xml>|<\/xml>$/g, '');
		var ms = xml.match(/<([a-z0-9]+)>([\s\S]*?)<\/\1>/ig);
		if (ms && ms.length > 0)
		{
			ms.forEach( t => {
				let ms = t.match(/<([a-z0-9]+)>([\s\S]*?)<\/\1>/i);
				let tagName = ms[1];
				let cdata = ms[2] || '';
				cdata = cdata.replace(/^\s*<\!\[CDATA\[\s*|\s*\]\]>\s*$/g,'');
				re[tagName] = cdata;
			});
		}
	return re;
}


/**
 * 微信消息解密
 * @param {String} encryptMsg 加密字符串
 * @return {JSON} 解密后的JSON对象
 */
CryptoGraphy.prototype.decryptMsg = function (encryptMsg){
    //获取签名认证
    var tempSignature = this.getMsgSignature(encryptMsg);
    //判断消息是否来自微信服务器
    if(this.msgSignature  !== tempSignature){
        throw new Error('msgSignature is not invalid')
    }
     //实例 AES 解密对象
    var deCipheriv = crypto.createDecipheriv(this.aesModel,this.encodingAESKey,this.iv);
    //设置自定填充数据为 false
    deCipheriv.setAutoPadding(false);
    //对密文解密对密文解密 并去除前 16 个随机字符串
    var deEncryptedMsg = Buffer.concat([deCipheriv.update(encryptMsg,'base64'),deCipheriv.final()]).toString('utf8');
    //获取填充字符串的位置
    var pad = deEncryptedMsg.charCodeAt(deEncryptedMsg.length - 1);
    //对微信消息进行处理
    deEncryptedMsg = deEncryptedMsg.slice(20, -pad).replace(/<\/xml>.*/,'</xml>');
    //讲解密后的XML 转为 JSON 对象
    return this.parseXmlToJSON(deEncryptedMsg);
}

/**
 * 微信消息加密
 * @param {String} xmlMsg 明文消息
 */
CryptoGraphy.prototype.encryptMsg = function(xmlMsg){
    //声明 16位的随机字符串
    var random =crypto.randomBytes(8).toString('hex');
    var text = new Buffer(xmlMsg);
    var buf = new Buffer(4);
    buf.writeUInt32BE(text.length);
    //进行PKCS7补位
    var pack = KCS7Encoder(20 + text.length + this.appID.length);
    //拼接要加密的字符串
    var content = random + buf.toString('binary') + text.toString('binary') + this.appID + pack;
    //实例 AES 加密对象
    var cipheriv = crypto.createCipheriv(this.aesModel,this.encodingAESKey,this.iv);
    //设置自定填充数据为 false
    cipheriv.setAutoPadding(false);
    //对明文加密
    var encryptedMsg = Buffer.concat([cipheriv.update(content,'binary'),cipheriv.final()]).toString('base64');
    //获取认证签名
    var msgSignature = this.getMsgSignature(encryptedMsg);
    //返回XML结果
    return buildXML.buildObject({
        Encrypt:encryptedMsg,
        MsgSignature:msgSignature,
        TimeStamp:this.timestamp,
        Nonce :this.nonce
    });  
}

/**
 * 签名认证
 * @param  {String} encryptedMsg 加密字符串
 * @return {String} sha1加密后的签名字符串
 */
CryptoGraphy.prototype.getMsgSignature = function(encryptedMsg){
    //将token、timestamp、nonce、cryptedMsg 四个参数进行字典序排序，并拼接成一个字符串
    var tempStr = [this.token,this.timestamp,this.nonce,encryptedMsg].sort().join('');
    //创建加密类型 
    const hashCode = crypto.createHash('sha1');
    //对传入的字符串进行加密
    var resultCode = hashCode.update(tempStr,'utf8').digest('hex'); 
    //将 sha1 加密的签名字符串返回
    return resultCode;
}


/**
 * PKCS7补位 算法
 * @param {Number} text_length  字符串长度
 */
var KCS7Encoder = function(text_length){
    var block_size = 32
    // 计算需要填充的位数
	var amount_to_pad = block_size - (text_length % block_size);
	if (amount_to_pad === 0) 
	{
		amount_to_pad = block_size;
	}
	// 获得补位所用的字符
	var pad = String.fromCharCode(amount_to_pad), s = [];
	for (var i=0; i<amount_to_pad; i++) s.push(pad);
	return s.join('');
}

module.exports = CryptoGraphy;

