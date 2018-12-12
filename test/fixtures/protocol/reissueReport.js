const adas = {
  accPedal: 0,
  brake: 0,
  speed: 0,
  totalCurrent: 9000,
  overSpeed: 0,
  lateralDistance: 0, // 前方障碍物横向距离
  verticalDistance: 0, // 前方障碍物纵向距离
  relativeVelocity: 194, // 与前方障碍物的相对速度
  wheelWarning: false, // 方向盘振动器预警
  buzzerWarning: false, // 蜂鸣器预警
  pWarning: false, // 行人碰撞预警
  rWarning: false, // 右车道偏离预警
  lWarning: false, // 左车道偏离预警
  cWarning: false, // 前方碰撞预警
  cmcs: undefined, // 碰撞缓解制动系统状态
  reserved: 0,
  crbs: false, // 碰撞缓解制动系统开关状态
  cmcsLevel: 0, // 碰撞缓解制动系统预警等级
  obstacleType: undefined, // 障碍物类型
};

export default [
  {
    name: "10 Seconds",
    input:
      "232303FE4C5758435332303137313130373030303001006B1206150D312F810100020003000004271001000200030000042710010002000300000427100100020003000004271001000200030000042710010002000300000427100100020003000004271001000200030000042710010002000300000427100100020003000004271054",
    expect: {
      command: "REISSUE_REPORT",
      flag: "COMMAND",
      vin: "LWXCS201711070000",
      encrypt: "NONE",
      length: 107,
      body: {
        at: new Date("2018-06-21T05:49:47.000Z"),
        items: [
          {
            type: "TEN_SECONDS",
            datas: [
              {
                accPedal: 0,
                brake: 0,
                speed: 0,
                totalCurrent: 9000,
              },
              {
                accPedal: 0,
                brake: 0,
                speed: 0,
                totalCurrent: 9000,
              },
              {
                accPedal: 0,
                brake: 0,
                speed: 0,
                totalCurrent: 9000,
              },
              {
                accPedal: 0,
                brake: 0,
                speed: 0,
                totalCurrent: 9000,
              },
              {
                accPedal: 0,
                brake: 0,
                speed: 0,
                totalCurrent: 9000,
              },
              {
                accPedal: 0,
                brake: 0,
                speed: 0,
                totalCurrent: 9000,
              },
              {
                accPedal: 0,
                brake: 0,
                speed: 0,
                totalCurrent: 9000,
              },
              {
                accPedal: 0,
                brake: 0,
                speed: 0,
                totalCurrent: 9000,
              },
              {
                accPedal: 0,
                brake: 0,
                speed: 0,
                totalCurrent: 9000,
              },
              {
                accPedal: 0,
                brake: 0,
                speed: 0,
                totalCurrent: 9000,
              },
            ],
          },
        ],
      },
    },
  },
  {
    name: "ADAS",
    input:
      "232303fe414354494143533230313831303130303101010b120b160b1019820100020003000004271005000678070008f409000a000b000c000100020003000004271005000678070008f409000a000b000c000100020003000004271005000678070008f409000a000b000c000100020003000004271005000678070008f409000a000b000c000100020003000004271005000678070008f409000a000b000c000100020003000004271005000678070008f409000a000b000c000100020003000004271005000678070008f409000a000b000c000100020003000004271005000678070008f409000a000b000c000100020003000004271005000678070008f409000a000b000c000100020003000004271005000678070008f409000a000b000c003d",
    expect: {
      req: {
        command: "REISSUE_REPORT",
        flag: "COMMAND",
        vin: "ACTIACS2018101001",
        encrypt: "NONE",
        length: 267,
        body: {
          at: new Date("2018-11-22T03:16:25.000Z"),
          items: [
            {
              type: "ADAS",
              datas: [adas, adas, adas, adas, adas, adas, adas, adas, adas, adas],
            },
          ],
        },
      },
    },
  },
  {
    name: "Response Reissue",
    input:
      "232303FE4C464E41344C4441394A4B4C30303038310101B6120A1E0F2B0A010204010000000186A018E6271064010FD6D8000002010104414E204E204518E6271005000714600B01E8042806015C100201130FEC01013A0120390700000000000000000008010118E62710009C00019C0FF50FEF0FF50FF10FF30FF30FFD0FF30FFE0FF70FFA0FEF0FF80FF30FF00FF70FFA0FEF0FEC0FEF0FFD0FF00FF30FF00FF50FEF0FF90FF60FF40FEF0FF70FF50FF70FF00FF50FF50FF30FF30FFA0FF50FF80FF60FF50FEF0FF50FF10FFA0FF10FF80FFC0FF10FF20FF40FF40FFD0FF70FFD0FFB0FF80FF40FFA0FEF0FFD0FEF0FF20FF80FFE10000FFE0FFC0FFA0FFC0FFC0FF50FF910000FF70FF30FF30FFD0FFC0FEE0FF80FF30FEF0FF90FFD0FF50FF70FF40FF610020FF90FF90FFA0FF80FFA0FFA0FF50FFB0FFA0FF40FF00FFB0FFB0FF20FF20FF90FF80FF10FF80FF70FF90FF90FF20FFE0FF90FF90FF40FF90FF50FEF0FF40FF10FF30FF60FF80FF10FEC0FEF0FF40FEF0FF70FF10FF80FEF0FF80FFC10000FF70FF50FF30FF70FF50FFA0FF30FF80FF10FF30FF80FF80FEE0FF60FF10FFC0FF509010100213A3A3A3A3A3A3A3A3A3A3A3A3A3A3A3A3A3A3A3A3A3A3A3A3A3A3A3A3A3A3A3939E9",
    expect: {
      shouldRespond: true,
      resBuf: "232303014c464e41344c4441394a4b4c3030303831010006120a1e0f2b0a18",
    },
  },
];
