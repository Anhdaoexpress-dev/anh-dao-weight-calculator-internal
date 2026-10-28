
const assert = require('node:assert/strict');

// BÀI 12 - Automated Testing
// Anh Đào Express Weight Calculator V4 Internal

function test(name, actual, expected) {
  try {
    assert.equal(actual, expected);
    console.log('PASS:', name);
  } catch (error) {
    console.error('FAIL:', name);
    console.error('Mong đợi:', expected);
    console.error('Thực tế:', actual);
    process.exitCode = 1;
  }
}

// Bài kiểm thử đầu tiên:
// 50 x 40 x 33 cm, DIM 5000
const length = 50;
const width = 40;
const height = 33;
const divisor = 5000;

const volumeWeight = (length * width * height) / divisor;

test('DIM 5000 - trọng lượng thể tích', volumeWeight, 13.2);

console.log('Đã chạy bài kiểm thử đầu tiên.');
// Bài kiểm thử thứ hai: DIM 6000
const volumeWeight6000 = (length * width * height) / 6000;

test(
  'DIM 6000 - trọng lượng thể tích',
  volumeWeight6000,
  11
);

// Bài kiểm thử thứ ba: Làm tròn trọng lượng
function roundWeightKg(weight) {
  if (weight <= 20) {
    return Math.ceil(weight * 2) / 2;
  }
  return Math.ceil(weight);
}

test('19.8 kg làm tròn thành 20 kg', roundWeightKg(19.8), 20);
test('20 kg giữ nguyên 20 kg', roundWeightKg(20), 20);
test('20.01 kg làm tròn thành 21 kg', roundWeightKg(20.01), 21);
test('20.5 kg làm tròn thành 21 kg', roundWeightKg(20.5), 21);
test('21.1 kg làm tròn thành 22 kg', roundWeightKg(21.1), 22);