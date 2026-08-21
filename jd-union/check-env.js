const fs = require('fs');
const path = require('path');

console.log('========================================');
console.log('  京东联盟选品助手 - 环境检测');
console.log('========================================\n');

const nodeVersion = process.version;
console.log(`✅ Node.js 版本: ${nodeVersion}`);

const majorVersion = parseInt(nodeVersion.slice(1));
if (majorVersion < 12) {
  console.log('❌ Node.js 版本过低，请升级到 12.x 或更高版本');
  process.exit(1);
}

const configPath = path.join(__dirname, 'config.json');
try {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  if (config.appKey && config.appKey !== 'YOUR_APP_KEY_HERE') {
    console.log('✅ config.json 已配置 AppKey');
  } else {
    console.log('⚠️  config.json 未配置 AppKey，将使用示例数据');
  }
} catch (e) {
  console.log('❌ config.json 读取失败:', e.message);
}

const outputPath = path.join(__dirname, '..', 'data.js');
console.log(`\n📁 输出文件路径: ${outputPath}`);
console.log('✅ 环境检测通过！');
console.log('\n📖 下一步: 请参考 README.md 完成配置和运行');