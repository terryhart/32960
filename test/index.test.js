import fs from "fs";
import { resolve, basename } from "path";

const FIXTURES_DIR = `${__dirname}/fixtures`;

describe("fixtures", () => {
  // fixtures 下各个子目录
  fs.readdirSync(FIXTURES_DIR).forEach(fixtureDir => {
    const fixturePath = resolve(FIXTURES_DIR, fixtureDir);

    if (!fs.statSync(fixturePath).isDirectory()) {
      return;
    }

    describe(fixtureDir, () => {
      // executor 是一个定义如何执行测试的函数
      const executor = require(resolve(fixturePath, "executor.js")).default;

      // 子目录下各个数据文件
      fs.readdirSync(fixturePath).forEach(fixtureFile => {
        const fixtureFilePath = resolve(fixturePath, fixtureFile);
        const filename = basename(fixtureFilePath);

        if (filename.indexOf("executor") !== -1 || fs.statSync(fixtureFilePath).isDirectory()) {
          return;
        }

        const fixtures = require(fixtureFilePath).default;

        fixtures.forEach(fixture => {
          it(fixture.name, () => {
            executor(fixture);
          });
        });
      });
    });
  });
});
