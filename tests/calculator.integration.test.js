
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

// Đọc mã nguồn ứng dụng V4.
const html = fs.readFileSync(
  path.join(__dirname, '..', 'index.html'),
  'utf8'
);

const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
assert.equal(scripts.length, 1, 'Cần kiểm tra lại số thẻ script trong index.html');

const source = scripts[0][1];

// Chỉ lấy phần logic tính toán, không chạy mã giao diện.
const start = source.indexOf('function ceilDiv(');
const end = source.indexOf('function computeBoth(');

assert.ok(start >= 0, 'Không tìm thấy hàm ceilDiv');
assert.ok(end > start, 'Không tìm thấy vị trí kết thúc logic tính toán');

const logic = `
const MAX = BigInt(Number.MAX_SAFE_INTEGER);
const BASE_DEN = 1000000n;
${source.slice(start, end)}
globalThis.calculateShipment = calculateShipment;
`;

const context = vm.createContext({});
vm.runInContext(logic, context, { timeout: 1000 });

function check(name, inputs, divisor, expected) {
  const result = context.calculateShipment(inputs, divisor);

  assert.equal(Number(result.finalHalf) / 2, expected);

  console.log('PASS:', name);
}

// Một kiện: 50 x 40 x 33 cm, cân thực 12 kg.
const oneParcel = [{
  index: 1,
  length: 5000n,
  width: 4000n,
  height: 3300n,
  actual: 1200n,
  quantity: 1n
}];

check('DIM 5000 - một kiện', oneParcel, 5000, 13.5);
check('DIM 6000 - một kiện', oneParcel, 6000, 12);

console.log('Hoàn thành kiểm thử logic V4.');

const threeParcels = [{
  index: 1,
  length: 5000n,
  width: 4000n,
  height: 3300n,
  actual: 1200n,
  quantity: 3n
}];

check('DIM 5000 - 3 kiện giống nhau', threeParcels, 5000, 41);
check('DIM 6000 - 3 kiện giống nhau', threeParcels, 6000, 36);

const mixedParcels = [
  {
    index: 1,
    length: 5000n,
    width: 4000n,
    height: 3300n,
    actual: 1200n,
    quantity: 1n
  },
  {
    index: 2,
    length: 6000n,
    width: 4500n,
    height: 4500n,
    actual: 2300n,
    quantity: 1n
  }
];

check('DIM 5000 - hai kiện khác nhau', mixedParcels, 5000, 39);
check('DIM 6000 - hai kiện khác nhau', mixedParcels, 6000, 35);

function checkInvalidDim(name, divisor) {
  assert.throws(
    () => context.calculateShipment(oneParcel, divisor),
    /Hệ số DIM không hợp lệ/
  );

  console.log('PASS:', name);
}

checkInvalidDim('Từ chối DIM 4000', 4000);
checkInvalidDim('Từ chối DIM 7000', 7000);

function checkRounding(actualKg, expectedKg) {
  const parcel = [{
    index: 1,
    length: 1000n,
    width: 1000n,
    height: 1000n,
    actual: BigInt(Math.round(actualKg * 100)),
    quantity: 1n
  }];

  check(
    `Làm tròn ${actualKg} kg thành ${expectedKg} kg`,
    parcel,
    5000,
    expectedKg
  );
}

checkRounding(19.8, 20);
checkRounding(20, 20);
checkRounding(20.01, 21);
checkRounding(20.5, 21);
checkRounding(21.1, 22);
