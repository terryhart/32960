# 实时信息上报

## 用例1

### 原始报文
```sh
232302FE4C53464430333230354843303031313830010231120616100A2C01010301017700069D08187C22853C011E1964000D020202014B639C3A346D187C271001014B639C3A346D187C27100500073CD80601DB5A620601120CE401650CA80133490114420700000000000000000008010118B0228500C00001C00CBC0CBC0CBC0CBC0CBC0CBC0CBC0CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CE40CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CE40CD00CD00CE40CD00CD00CD00CE40CD00CD00CD00CE40CD00CD00CD00CE40CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CE40CE40CD00CD00CE40CD00CD00CE40CD00CBC0CBC0CA80CBC0CBC0CBC0CA80CA80CA80CA80CA80CA80CA80CA80CA80CA80CA80CA80CA80CA80CA80CA80CBC0CA80CA80CA80CA80CA80CA80CA80CA80CA80CA80CA80CA80CA80CA80CA80CA80CA80CA80CA80CA80CA80CA80CA80CBC0CBC0CBC0CBC0CA80CA80CBC0CBC0CA80CA80CA80CBC0CA80CBC0CBC0CA80CA80CBC0CA80CBC0CA80CBC0CA80CBC0CBC0CBC0CBC0CBC0CBC0CBC0CBC0CBC0CA80CBC0CA80CBC0CBC0CBC0CBC0CBC0CBC0CBC0CBC0CBC0CA80CBC0CBC0CBC090101004844434444444443434343434343434343434343424243424348484748484848474747484743424243434343434343434348484949494947464848484845454646464647464546464691
```
### 解析结果
```json
{
    "clientId": 51,
    "commandIDHex": "02",
    "platform": "shenwo",
    "requestId": "ii4yqdsom3k",
    "vin": "LSFD03205HC001180",
    "reportedAt": "2018-05-22T16:10:44+08:00",
    "vehicle": {
        "status": "ON",
        "chargStatus": "UNCHARGED",
        "mode": "ELECTRIC",
        "speed": 37.5,
        "mileage": 43341.600000000006,
        "voltage": 626.8000000000001,
        "current": -116.29999999999995,
        "soc": 0.6,
        "dcStatus": "ON",
        "shift": 14,
        "resistance": 6500,
        "aptv": 0,
        "brake": 0.13
    },
    "motor": {
        "count": 2,
        "motors": [{
            "no": 2,
            "status": "CONSUMPTION",
            "controlTemp": 35,
            "speed": 5500,
            "torque": -18510,
            "temp": 69,
            "voltage": 626.8000000000001,
            "current": 0
        }, {
            "no": 1,
            "status": "CONSUMPTION",
            "controlTemp": 35,
            "speed": 5500,
            "torque": -18510,
            "temp": 69,
            "voltage": 626.8000000000001,
            "current": 0
        }]
    },
    "location": {
        "state": 0,
        "lng": 121.427974,
        "lat": 31.152738
    },
    "extreme": {
        "maxVoltageSubSysNo": 1,
        "maxVoltageSingNo": 18,
        "maxVoltage": 3.3,
        "minVoltageSubSysNo": 1,
        "minVoltageSingNo": 101,
        "minVoltage": 3.24,
        "maxNtcSubSysNo": 1,
        "maxNtcNo": 51,
        "maxNtc": 33,
        "minNtcSubSysNo": 1,
        "minNtcNo": 20,
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
        "voltage": 6320,
        "current": 8837,
        "batteryCount": 192,
        "frameBatteryNo": 192,
        "voltage1": 3260,
        "voltage2": 3260,
        "voltage3": 3260,
        "voltage4": 3260,
        "voltage5": 3260,
        "voltage6": 3260,
        "voltage7": 3260,
        "voltage8": 3280,
        "voltage9": 3280,
        "voltage10": 3280,
        "voltage11": 3280,
        "voltage12": 3280,
        "voltage13": 3280,
        "voltage14": 3280,
        "voltage15": 3280,
        "voltage16": 3280,
        "voltage17": 3280,
        "voltage18": 3300,
        "voltage19": 3280,
        "voltage20": 3280
    }
}
```
### 发送
```
232302014C53464430333230354843303031313830010006120616100A2C1A
```

## 用例2
```sh
232302FE4C53464431333230354843303031323536010249120616100A2D0101030100000004374418E6272C4F011E1964000D02020201504E204F4C5D18E627100101504E204F4C5D18E627100500073CFE9301DBC7FF0601010CF801010CF80118480142420700000000000000000008010118EE272C00C00001C00CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF8090101006044444444454446464444444445454646464545464646474847474746474648484444444444444444444444444444444444434444444444434343434344434443434243434343434343434344444344434443444444444444444444444443444371
```
### 解析结果
```json
{
    "clientId": 51,
    "commandIDHex": "02",
    "platform": "shenwo",
    "requestId": "r1f3ma8kq2",
    "vin": "LSFD13205HC001256",
    "reportedAt": "2018-05-22T16:10:45+08:00",
    "vehicle": {
        "status": "ON",
        "chargStatus": "UNCHARGED",
        "mode": "ELECTRIC",
        "speed": 0,
        "mileage": 27629.2,
        "voltage": 637.4000000000001,
        "current": 2.800000000000068,
        "soc": 0.79,
        "dcStatus": "ON",
        "shift": 14,
        "resistance": 6500,
        "aptv": 0,
        "brake": 0.13
    },
    "motor": {
        "count": 2,
        "motors": [{
            "no": 2,
            "status": "CONSUMPTION",
            "controlTemp": 40,
            "speed": 0,
            "torque": -17970,
            "temp": 53,
            "voltage": 637.4000000000001,
            "current": 0
        }, {
            "no": 1,
            "status": "CONSUMPTION",
            "controlTemp": 40,
            "speed": 0,
            "torque": -17970,
            "temp": 53,
            "voltage": 637.4000000000001,
            "current": 0
        }]
    },
    "location": {
        "state": 0,
        "lng": 121.437843,
        "lat": 31.180799
    },
    "extreme": {
        "maxVoltageSubSysNo": 1,
        "maxVoltageSingNo": 1,
        "maxVoltage": 3.32,
        "minVoltageSubSysNo": 1,
        "minVoltageSingNo": 1,
        "minVoltage": 3.32,
        "maxNtcSubSysNo": 1,
        "maxNtcNo": 24,
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
        "voltage": 6382,
        "current": 10028,
        "batteryCount": 192,
        "frameBatteryNo": 192,
        "voltage1": 3320,
        "voltage2": 3320,
        "voltage3": 3320,
        "voltage4": 3320,
        "voltage5": 3320,
        "voltage6": 3320,
        "voltage7": 3320,
        "voltage8": 3320,
        "voltage9": 3320,
        "voltage10": 3320,
        "voltage11": 3320,
        "voltage12": 3320,
        "voltage13": 3320,
        "voltage14": 3320,
        "voltage15": 3320,
        "voltage16": 3320,
        "voltage17": 3320,
        "voltage18": 3320,
        "voltage19": 3320,
        "voltage20": 3320
    }
}
```
### 发送
```
232302014C53464431333230354843303031323536010006120616100A2D12
```
## 用例3
```sh
232302FE4C53464431333230324843303031323239010249120616100A2E01010301000000061F4218F4271C63011E183E0032020202014D4E204F4C5118F4271001014D4E204F4C5118F427100500073DA79701DDBB720601010D0C015B0CE4011D48013A430700000000000000000008010118FB271C00C00001C00D0C0CF80CF80D0C0CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80D0C0CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80D0C0CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80D0C0CF80D0C0CF80CF80CF80D0C0CF80D0C0CF80CF80CF80D0C0CF80D0C0CF80CF80CF80CF80CF80D0C0CF80CF80D0C0D0C0CF80CF80D0C0CF80CF80D0C0D0C0CF80D0C0CF80CF80D0C0CF80CF80D0C0D0C0CF80CE40D0C0D0C0D0C0CF80D0C0D0C0CF80D0C0CF80CF80CF80CF80CF80CF80CF80CF80D0C0D0C0CF80CF80CF80CF80CF80CF80D0C0D0C0CF80D0C0D0C0D0C0D0C0CF80D0C0CF80CF80CF80CF80D0C0CF80CF80D0C0D0C0D0C0CF80D0C0D0C0D0C0CF80D0C0CF80D0C0D0C0D0C0D0C0CF80CF80D0C0D0C0CF80CF80D0C0D0C0D0C0D0C0D0C0CF80CF80CF80CF80CF80CF80D0C0CF80D0C0CF80CF80D0C0CF80D0C0D0C0CF80D0C0CF80D0C0D0C0D0C0D0C0D0C0D0C0D0C0CF80CF80CF80CF80D0C0CF80CF80D0C0CF80D0C0CF809010100604544444445454545454445454545454546454646474647464746474648474847444444444544444444444444444444444444444444444444444343434443444344434444444444444444444445444444444444444544444444444444444444446B
```
### 解析结果
```json
{
    "clientId": 51,
    "commandIDHex": "02",
    "platform": "shenwo",
    "requestId": "2z5rnq2anu",
    "vin": "LSFD13202HC001229",
    "reportedAt": "2018-05-22T16:10:46+08:00",
    "vehicle": {
        "status": "ON",
        "chargStatus": "UNCHARGED",
        "mode": "ELECTRIC",
        "speed": 0,
        "mileage": 40121.8,
        "voltage": 638.8000000000001,
        "current": 1.2000000000000455,
        "soc": 0.99,
        "dcStatus": "ON",
        "shift": 14,
        "resistance": 6206,
        "aptv": 0,
        "brake": 0.5
    },
    "motor": {
        "count": 2,
        "motors": [{
            "no": 2,
            "status": "CONSUMPTION",
            "controlTemp": 37,
            "speed": 0,
            "torque": -17970,
            "temp": 41,
            "voltage": 638.8000000000001,
            "current": 0
        }, {
            "no": 1,
            "status": "CONSUMPTION",
            "controlTemp": 37,
            "speed": 0,
            "torque": -17970,
            "temp": 41,
            "voltage": 638.8000000000001,
            "current": 0
        }]
    },
    "location": {
        "state": 0,
        "lng": 121.481111,
        "lat": 31.308658
    },
    "extreme": {
        "maxVoltageSubSysNo": 1,
        "maxVoltageSingNo": 1,
        "maxVoltage": 3.34,
        "minVoltageSubSysNo": 1,
        "minVoltageSingNo": 91,
        "minVoltage": 3.3,
        "maxNtcSubSysNo": 1,
        "maxNtcNo": 29,
        "maxNtc": 32,
        "minNtcSubSysNo": 1,
        "minNtcNo": 58,
        "minNtc": 27
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
        "voltage": 6395,
        "current": 10012,
        "batteryCount": 192,
        "frameBatteryNo": 192,
        "voltage1": 3340,
        "voltage2": 3320,
        "voltage3": 3320,
        "voltage4": 3340,
        "voltage5": 3320,
        "voltage6": 3320,
        "voltage7": 3320,
        "voltage8": 3320,
        "voltage9": 3320,
        "voltage10": 3320,
        "voltage11": 3320,
        "voltage12": 3320,
        "voltage13": 3320,
        "voltage14": 3320,
        "voltage15": 3320,
        "voltage16": 3340,
        "voltage17": 3320,
        "voltage18": 3320,
        "voltage19": 3320,
        "voltage20": 3320
    }
}
```
### 发送
```
232302014C53464431333230324843303031323239010006120616100A2E1E
```
## 用例4
```sh
232302FE4C53464430333230394843303031323031010231120616100A2E01010301013C0006C6F218982DB73E012E19644900020202014F60476A406F18202A0E01014F60476A406F18202A0E0500073DE14101DBAE9D0601010CE4017A0CBC01334B01264307000000000000000000080101185D2DB700C00001C00CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CD00CD00CE40CE40CE40CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CE40CD00CD00CD00CD00CD00CD00CD00CD00CE40CD00CD00CE40CE40CE40CE40CE40CE40CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CBC0CBC0CD00CD00CBC0CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CD00CBC0CBC0CBC0CBC0CD00CBC0CBC0CBC0CBC0CBC0CD00CBC0CBC0CBC0CBC0CBC0CBC0CBC0CD00CBC0CBC0CBC0CBC0CBC0CBC0CBC0CBC0CBC0CD00CBC0CBC0CBC0CBC0CBC0CBC0CBC0CBC0CBC0CBC0CD00CBC0CBC0CD00CBC0CBC0CD00CBC0CD00CBC0CBC0CBC0CBC09010100484544454545464545454545464544454545454444444444444A4A494A4A4A4A4A49494A494443444444444544444545454A494B4B4B4B49484A4A4A4A47474848484848484748474967
```
### 解析结果
```json
{
    "clientId": 51,
    "commandIDHex": "02",
    "platform": "shenwo",
    "requestId": "ya941nw136",
    "vin": "LSFD03209HC001201",
    "reportedAt": "2018-05-22T16:10:46+08:00",
    "vehicle": {
        "status": "ON",
        "chargStatus": "UNCHARGED",
        "mode": "ELECTRIC",
        "speed": 31.6,
        "mileage": 44414.600000000006,
        "voltage": 629.6,
        "current": 170.29999999999995,
        "soc": 0.62,
        "dcStatus": "ON",
        "shift": 14,
        "resistance": 6500,
        "aptv": 0.73,
        "brake": 0
    },
    "motor": {
        "count": 2,
        "motors": [{
            "no": 2,
            "status": "CONSUMPTION",
            "controlTemp": 39,
            "speed": 4647,
            "torque": -17280,
            "temp": 71,
            "voltage": 617.6,
            "current": 76.60000000000014
        }, {
            "no": 1,
            "status": "CONSUMPTION",
            "controlTemp": 39,
            "speed": 4647,
            "torque": -17280,
            "temp": 71,
            "voltage": 617.6,
            "current": 76.60000000000014
        }]
    },
    "location": {
        "state": 0,
        "lng": 121.495873,
        "lat": 31.174301
    },
    "extreme": {
        "maxVoltageSubSysNo": 1,
        "maxVoltageSingNo": 1,
        "maxVoltage": 3.3,
        "minVoltageSubSysNo": 1,
        "minVoltageSingNo": 122,
        "minVoltage": 3.26,
        "maxNtcSubSysNo": 1,
        "maxNtcNo": 51,
        "maxNtc": 35,
        "minNtcSubSysNo": 1,
        "minNtcNo": 38,
        "minNtc": 27
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
        "voltage": 6237,
        "current": 11703,
        "batteryCount": 192,
        "frameBatteryNo": 192,
        "voltage1": 3300,
        "voltage2": 3300,
        "voltage3": 3300,
        "voltage4": 3300,
        "voltage5": 3300,
        "voltage6": 3300,
        "voltage7": 3300,
        "voltage8": 3300,
        "voltage9": 3300,
        "voltage10": 3300,
        "voltage11": 3300,
        "voltage12": 3300,
        "voltage13": 3300,
        "voltage14": 3300,
        "voltage15": 3300,
        "voltage16": 3300,
        "voltage17": 3300,
        "voltage18": 3300,
        "voltage19": 3300,
        "voltage20": 3300
    }
}
```
### 发送
```
232302014C53464430333230394843303031323031010006120616100A2E1E
```
## 用例5
```sh
232302FE4C53464430333230394A43303031343633010231120616100A2E0101030100000001B83F18BC27283B011E1964001B02020201504E1F4F4C6118BC27100101504E1F4F4C6118BC27100500073CEDF401DBC8CA0601010CE401020CD001194B0117420700000000000000000008010118B1272800C00001C00CE40CD00CE40CE40CE40CE40CE40CE40CE40CE40CD00CD00CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CD00CD00CD00CE40CD00CD00CE40CE40CE40CE40CD00CD00CD00CE40CD00CE40CE40CE40CE40CE40CE40CE40CE40CE40CD00CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CD00CD00CE40CE40CE40CE40CE40CE40CE40CD00CE40CD00CD00CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CD00CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CD00CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE40CE409010100484344444443444344444443444344444443434343444342434B4B4A4B4A4A4B4B4B4A4A4A42434343424343434343434349494A4A4A4A48484949494945474747464749494848484898
```
### 解析结果
```json
{
    "clientId": 51,
    "commandIDHex": "02",
    "platform": "shenwo",
    "requestId": "konn5x46d5",
    "vin": "LSFD03209JC001463",
    "reportedAt": "2018-05-22T16:10:46+08:00",
    "vehicle": {
        "status": "ON",
        "chargStatus": "UNCHARGED",
        "mode": "ELECTRIC",
        "speed": 0,
        "mileage": 11270.300000000001,
        "voltage": 633.2,
        "current": 2.400000000000091,
        "soc": 0.59,
        "dcStatus": "ON",
        "shift": 14,
        "resistance": 6500,
        "aptv": 0,
        "brake": 0.27
    },
    "motor": {
        "count": 2,
        "motors": [{
            "no": 2,
            "status": "CONSUMPTION",
            "controlTemp": 40,
            "speed": -1,
            "torque": -17970,
            "temp": 57,
            "voltage": 633.2,
            "current": 0
        }, {
            "no": 1,
            "status": "CONSUMPTION",
            "controlTemp": 40,
            "speed": -1,
            "torque": -17970,
            "temp": 57,
            "voltage": 633.2,
            "current": 0
        }]
    },
    "location": {
        "state": 0,
        "lng": 121.433588,
        "lat": 31.181002
    },
    "extreme": {
        "maxVoltageSubSysNo": 1,
        "maxVoltageSingNo": 1,
        "maxVoltage": 3.3,
        "minVoltageSubSysNo": 1,
        "minVoltageSingNo": 2,
        "minVoltage": 3.28,
        "maxNtcSubSysNo": 1,
        "maxNtcNo": 25,
        "maxNtc": 35,
        "minNtcSubSysNo": 1,
        "minNtcNo": 23,
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
        "voltage": 6321,
        "current": 10024,
        "batteryCount": 192,
        "frameBatteryNo": 192,
        "voltage1": 3300,
        "voltage2": 3280,
        "voltage3": 3300,
        "voltage4": 3300,
        "voltage5": 3300,
        "voltage6": 3300,
        "voltage7": 3300,
        "voltage8": 3300,
        "voltage9": 3300,
        "voltage10": 3300,
        "voltage11": 3280,
        "voltage12": 3280,
        "voltage13": 3300,
        "voltage14": 3300,
        "voltage15": 3300,
        "voltage16": 3300,
        "voltage17": 3300,
        "voltage18": 3300,
        "voltage19": 3300,
        "voltage20": 3300
    }
}
```
### 发送
```
232302014C53464430333230394A43303031343633010006120616100A2E1E
```
## 用例6
```sh
232302FE4C53464431333230374843303031323630010249120616100A2D0101030100A400043DE518E3268F4A010E196400000202020150578F48446018A026D5010150578F48446018A026D50500073CF1A801DBC6BD0601010CF801110CE4011A480139420700000000000000000008010118D9268F00C00001C00CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CE40CF80CF80CF80CF80CF80CF80CF80CF80CF80CE40CF80CF80CF80CE40CF80CE40CF80CE40CF80CF80CF80CF80CF80CF80CF80CE40CF80CF80CF80CE40CF80CF80CF80CF80CE40CE40CF80CF80CF80CF80CF80CF80CE40CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CE40CF80CE40CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CE40CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CE40CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF80CF8090101006043434343434343434343434343434343454445454546454647484746464646464343434343434343434343434343434343434343434343434242424243424242424242424242434243424343434343434343434343434343434343434343434350
```
### 解析结果
```json
{
    "clientId": 51,
    "commandIDHex": "02",
    "platform": "shenwo",
    "requestId": "fqxtqshvjm",
    "vin": "LSFD13207HC001260",
    "reportedAt": "2018-05-22T16:10:45+08:00",
    "vehicle": {
        "status": "ON",
        "chargStatus": "UNCHARGED",
        "mode": "ELECTRIC",
        "speed": 16.400000000000002,
        "mileage": 27798.9,
        "voltage": 637.1,
        "current": -12.899999999999977,
        "soc": 0.74,
        "dcStatus": "ON",
        "shift": 14,
        "resistance": 6500,
        "aptv": 0,
        "brake": 0
    },
    "motor": {
        "count": 2,
        "motors": [{
            "no": 2,
            "status": "CONSUMPTION",
            "controlTemp": 40,
            "speed": 2415,
            "torque": -18150,
            "temp": 56,
            "voltage": 630.4000000000001,
            "current": -5.899999999999977
        }, {
            "no": 1,
            "status": "CONSUMPTION",
            "controlTemp": 40,
            "speed": 2415,
            "torque": -18150,
            "temp": 56,
            "voltage": 630.4000000000001,
            "current": -5.899999999999977
        }]
    },
    "location": {
        "state": 0,
        "lng": 121.434536,
        "lat": 31.180477
    },
    "extreme": {
        "maxVoltageSubSysNo": 1,
        "maxVoltageSingNo": 1,
        "maxVoltage": 3.32,
        "minVoltageSubSysNo": 1,
        "minVoltageSingNo": 17,
        "minVoltage": 3.3,
        "maxNtcSubSysNo": 1,
        "maxNtcNo": 26,
        "maxNtc": 32,
        "minNtcSubSysNo": 1,
        "minNtcNo": 57,
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
        "voltage": 6361,
        "current": 9871,
        "batteryCount": 192,
        "frameBatteryNo": 192,
        "voltage1": 3320,
        "voltage2": 3320,
        "voltage3": 3320,
        "voltage4": 3320,
        "voltage5": 3320,
        "voltage6": 3320,
        "voltage7": 3320,
        "voltage8": 3320,
        "voltage9": 3320,
        "voltage10": 3320,
        "voltage11": 3320,
        "voltage12": 3320,
        "voltage13": 3320,
        "voltage14": 3320,
        "voltage15": 3320,
        "voltage16": 3320,
        "voltage17": 3300,
        "voltage18": 3320,
        "voltage19": 3320,
        "voltage20": 3320
    }
}
```
### 发送
```
232302014C53464431333230374843303031323630010006120616100A2D15
```




