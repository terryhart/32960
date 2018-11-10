# 补发信息上报

## 用例1

### 原始报文
```sh
232303FE4C5346443133323039474330303136383001002512061610151301010301000000094BBAFFFEFFFE3B00FE023837000500073D5A9801DD6ED34C
```
### 解析结果 
```json
{
    "clientId": 58,
    "commandIDHex": "03",
    "platform": "shenwo",
    "requestId": "4cxl6nde381",
    "vin": "LSFD13209GC001680",
    "reportedAt": "2018-06-22T16:21:19+08:00",
    "vehicle": {
        "status": "ON",
        "chargStatus": "UNCHARGED",
        "mode": "ELECTRIC",
        "speed": 0,
        "mileage": 60921,
        "voltage": "ABNORMAL",
        "current": "ABNORMAL",
        "soc": 0.59,
        "shift": 14,
        "resistance": 568,
        "aptv": 0.55,
        "brake": 0
    },
    "location": {
        "state": 0,
        "lng": 121.4614,
        "lat": 31.289043
    }
}
```
### 发送
```
232303014C534644313332303947433030313638300100061206161015133E
```

## 用例2

### 原始报文
```sh
232303FE4C53464431333230344743303031383030010025120616100A19010103010000000DD70CFFFEFFFE4200FE023200000500073C1C2701DACDDF68
```
### 解析结果 
```json
{
    "clientId": 51,
    "commandIDHex": "03",
    "platform": "shenwo",
    "requestId": "6fdlfoqzh54",
    "vin": "LSFD13204GC001800",
    "reportedAt": "2018-05-22T16:10:25+08:00",
    "vehicle": {
        "status": "ON",
        "chargStatus": "UNCHARGED",
        "mode": "ELECTRIC",
        "speed": 0,
        "mileage": 90702,
        "voltage": "ABNORMAL",
        "current": "ABNORMAL",
        "soc": 0.66,
        "shift": 14,
        "resistance": 562,
        "aptv": 0,
        "brake": 0
    },
    "location": {
        "state": 0,
        "lng": 121.379879,
        "lat": 31.116767
    }
}
```
### 发送
```
232303014C53464431333230344743303031383030010006120616100A1920
```
## 用例3

### 原始报文
```sh
232303FE4C53464431333230304743303031373933010025120616100A1A010103010000000E0C36FFFEFFFE3900FE021222000500073BFBDB01DAB292DF
```
### 解析结果 
```json
{
    "clientId": 51,
    "commandIDHex": "03",
    "platform": "shenwo",
    "requestId": "b904u6e2vs6",
    "vin": "LSFD13200GC001793",
    "reportedAt": "2018-05-22T16:10:26+08:00",
    "vehicle": {
        "status": "ON",
        "chargStatus": "UNCHARGED",
        "mode": "ELECTRIC",
        "speed": 0,
        "mileage": 92063,
        "voltage": "ABNORMAL",
        "current": "ABNORMAL",
        "soc": 0.5700000000000001,
        "shift": 14,
        "resistance": 530,
        "aptv": 0.34,
        "brake": 0
    },
    "location": {
        "state": 0,
        "lng": 121.371611,
        "lat": 31.109778
    }
}
```
### 发送
```
232303014C53464431333230304743303031373933010006120616100A1A22
```
## 用例4

### 原始报文
```sh
232303FE4C53464431333230374743303031383130010025120616100A25010203010000000CB21EFFFEFFFE4A00FE023300000500073C54A301D9D9C4EA
```
### 解析结果 
```json
{
    "clientId": 51,
    "commandIDHex": "03",
    "platform": "shenwo",
    "requestId": "0oj6z4u4z29h",
    "vin": "LSFD13207GC001810",
    "reportedAt": "2018-05-22T16:10:37+08:00",
    "vehicle": {
        "status": "OFF",
        "chargStatus": "UNCHARGED",
        "mode": "ELECTRIC",
        "speed": 0,
        "mileage": 83203,
        "voltage": "ABNORMAL",
        "current": "ABNORMAL",
        "soc": 0.74,
        "shift": 14,
        "resistance": 563,
        "aptv": 0,
        "brake": 0
    },
    "location": {
        "state": 0,
        "lng": 121.394339,
        "lat": 31.054276
    }
}
```
### 发送
```
232303014C53464431333230374743303031383130010006120616100A251E
```
## 用例5

### 原始报文
```sh
232303FE4C53464431333230344843303031323530010249120616100A2501010301008E00061ECB1897275F41012E1964110002020201505649507864186027330101505649507864186027330500073D0A5F01DC6C940601A90CE401020CBC0119480142420700000000000000000008010118A2275F00C00001C00CD00CBC0CBC0CBC0CBC0CBC0CBC0CBC0CBC0CBC0CBC0CBC0CBC0CBC0CBC0CBC0CBC0CBC0CBC0CBC0CBC0CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CE40CD00CD00CD00CE40CD00CE40CD00CE40CD00CE40CD00CE40CD00CD00CD00CE40CD00CD00CD00CE40CD00CE40CD0090101006044444444444444444443444444444444464546464647474648484847484748474444444444444444444344444444444443434443444444444343434343434444434243434343434443434443444444444443444444434444444343444444444477
```
### 解析结果 
```json
{
    "clientId": 51,
    "commandIDHex": "03",
    "platform": "shenwo",
    "requestId": "xx8m6l14e4j",
    "vin": "LSFD13204HC001250",
    "reportedAt": "2018-05-22T16:10:37+08:00",
    "vehicle": {
        "status": "ON",
        "chargStatus": "UNCHARGED",
        "mode": "ELECTRIC",
        "speed": 14.200000000000001,
        "mileage": 40109.9,
        "voltage": 629.5,
        "current": 7.900000000000091,
        "soc": 0.65,
        "dcStatus": "ON",
        "shift": 14,
        "resistance": 6500,
        "aptv": 0.17,
        "brake": 0
    },
    "motor": {
        "count": 2,
        "motors": [{
            "no": 2,
            "status": "CONSUMPTION",
            "controlTemp": 40,
            "speed": 2089,
            "torque": -17940,
            "temp": 60,
            "voltage": 624,
            "current": 3.5
        }, {
            "no": 1,
            "status": "CONSUMPTION",
            "controlTemp": 40,
            "speed": 2089,
            "torque": -17940,
            "temp": 60,
            "voltage": 624,
            "current": 3.5
        }]
    },
    "location": {
        "state": 0,
        "lng": 121.440863,
        "lat": 31.222932
    },
    "extreme": {
        "maxVoltageSubSysNo": 1,
        "maxVoltageSingNo": 169,
        "maxVoltage": 3.3,
        "minVoltageSubSysNo": 1,
        "minVoltageSingNo": 2,
        "minVoltage": 3.26,
        "maxNtcSubSysNo": 1,
        "maxNtcNo": 25,
        "maxNtc": 32,
        "minNtcSubSysNo": 1,
        "minNtcNo": 66,
        "minNtc": 26
    },
    "alarm": {
        "maxAlarmLevel": 0,
        "uas": [{
            "tag0": 0,
            "tag1": 0,
            "tag2": 0,
            "tag3": 0,
            "tag4": 0,
            "tag5": 0,
            "tag6": 0,
            "tag7": 0,
            "tag8": 0,
            "tag9": 0,
            "tag10": 0,
            "tag11": 0,
            "tag12": 0,
            "tag13": 0,
            "tag14": 0,
            "tag15": 0,
            "tag16": 0,
            "tag17": 0,
            "tag18": 0,
            "tag19": 0,
            "tag20": 0,
            "tag21": 0,
            "tag22": 0,
            "tag23": 0,
            "tag24": 0,
            "tag25": 0,
            "tag26": 0,
            "tag27": 0,
            "tag28": 0,
            "tag29": 0,
            "tag30": 0,
            "tag31": 0
        }],
        "ressLen": 0,
        "ressList": [],
        "mortorLen": 0,
        "mortorList": [],
        "engineLen": 0,
        "engineList": [],
        "otherLen": 0,
        "otherList": []
    },
    "ressVoltage": {
        "subSysCount": 1,
        "subSysNos": [1],
        "voltage": 6306,
        "current": 10079,
        "batteryCount": 192,
        "frameBatteryNo": 192,
        "voltage1": 3280,
        "voltage2": 3260,
        "voltage3": 3260,
        "voltage4": 3260,
        "voltage5": 3260,
        "voltage6": 3260,
        "voltage7": 3260,
        "voltage8": 3260,
        "voltage9": 3260,
        "voltage10": 3260,
        "voltage11": 3260,
        "voltage12": 3260,
        "voltage13": 3260,
        "voltage14": 3260,
        "voltage15": 3260,
        "voltage16": 3260,
        "voltage17": 3260,
        "voltage18": 3260,
        "voltage19": 3260,
        "voltage20": 3260
    }
}
```
### 发送
```
232303014C53464431333230344843303031323530010006120616100A251C
```
