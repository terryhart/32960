import Protocol from "../../../src/protocol";

const protocol = new Protocol();

export default function(fixture) {
  if (!fixture.input) {
    throw new Error("fixture should have input");
  }
  if (!fixture.expect) {
    throw new Error("fixture should have expect");
  }
  const buf = Buffer.from(fixture.input, "hex");
  const req = protocol.parse(buf);
  const resBuf = protocol.respond(req, buf);

  fixture.expect.hasOwnProperty("req") && expect(req).toMatchObject(fixture.expect.req);
  fixture.expect.hasOwnProperty("shouldRespond") &&
    expect(protocol.shouldRespond(req)).toBe(fixture.expect.shouldRespond);
  fixture.expect.hasOwnProperty("resBuf") &&
    expect(resBuf.toString("hex")).toMatch(fixture.expect.resBuf);
}
