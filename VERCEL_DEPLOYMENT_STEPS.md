# Vercel 手工部署操作步骤

## 项目概述
VaultLend - 基于FHE技术的去中心化借贷平台

## 部署前准备

### 1. 环境要求
- Node.js 18+ 
- npm 或 yarn
- GitHub 账号
- Vercel 账号

### 2. 项目配置
项目已配置以下环境变量：
```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

## 详细部署步骤

### 步骤 1: 访问 Vercel 控制台
1. 打开浏览器，访问 [https://vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录 Vercel
3. 点击 "New Project" 按钮

### 步骤 2: 导入项目
1. 在 "Import Git Repository" 页面
2. 搜索并选择 `solanaking369/vault-lend`
3. 点击 "Import" 按钮

### 步骤 3: 配置项目设置
1. **项目名称**: `vault-lend` (或自定义名称)
2. **框架预设**: 选择 "Vite"
3. **根目录**: `./` (默认)
4. **构建命令**: `npm run build`
5. **输出目录**: `dist`
6. **安装命令**: `npm install`

### 步骤 4: 设置环境变量
在 "Environment Variables" 部分添加：

| 变量名 | 值 | 环境 |
|--------|-----|------|
| `NEXT_PUBLIC_CHAIN_ID` | `11155111` | Production, Preview, Development |
| `NEXT_PUBLIC_RPC_URL` | `https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990` | Production, Preview, Development |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | `2ec9743d0d0cd7fb94dee1a7e6d33475` | Production, Preview, Development |
| `NEXT_PUBLIC_INFURA_API_KEY` | `b18fb7e6ca7045ac83c41157ab93f990` | Production, Preview, Development |

### 步骤 5: 高级配置
1. 点击 "Advanced" 展开高级选项
2. **Node.js 版本**: 选择 18.x
3. **构建超时**: 600 秒
4. **函数区域**: 选择最近的区域

### 步骤 6: 部署项目
1. 检查所有配置无误
2. 点击 "Deploy" 按钮
3. 等待构建过程完成 (通常 2-5 分钟)

### 步骤 7: 验证部署
1. 构建完成后，Vercel 会提供部署 URL
2. 点击 URL 访问应用
3. 测试钱包连接功能
4. 验证页面加载正常

## 部署后配置

### 1. 自定义域名 (可选)
1. 在 Vercel 项目控制台
2. 进入 "Domains" 标签
3. 添加自定义域名
4. 配置 DNS 记录

### 2. 性能优化
1. 启用 Vercel Analytics
2. 配置缓存策略
3. 优化图片和资源

### 3. 监控设置
1. 设置错误追踪
2. 配置性能监控
3. 设置告警通知

## 故障排除

### 常见问题及解决方案

#### 1. 构建失败
**问题**: Build failed
**解决方案**:
- 检查 Node.js 版本是否为 18+
- 验证所有依赖是否正确安装
- 查看构建日志中的具体错误信息

#### 2. 环境变量未生效
**问题**: 环境变量在应用中未显示
**解决方案**:
- 确认变量名拼写正确
- 检查变量是否添加到所有环境
- 重新部署应用

#### 3. 钱包连接失败
**问题**: 无法连接钱包
**解决方案**:
- 验证 RPC URL 是否正确
- 检查 WalletConnect 项目 ID
- 确认网络配置

#### 4. 页面加载缓慢
**问题**: 应用加载速度慢
**解决方案**:
- 启用 Vercel 的自动优化
- 使用动态导入
- 优化图片和资源

## 回滚操作

### 快速回滚
1. 在 Vercel 控制台进入项目
2. 点击 "Deployments" 标签
3. 选择要回滚的版本
4. 点击 "Promote to Production"

### 紧急回滚
1. 禁用自动部署
2. 回滚到稳定版本
3. 调查问题原因
4. 修复后重新启用

## 维护建议

### 定期检查
- 监控应用性能
- 检查错误日志
- 更新依赖包
- 验证安全配置

### 更新部署
- 代码更新后自动部署
- 手动触发部署
- 预览部署测试

## 技术支持

如遇到问题，请检查：
1. Vercel 官方文档
2. 项目 GitHub Issues
3. 浏览器控制台错误
4. 网络连接状态

## 项目特色功能

### 1. FHE 加密技术
- 全同态加密保护敏感数据
- 隐私保护的借贷计算
- 零知识证明验证

### 2. 多钱包支持
- MetaMask 集成
- WalletConnect 支持
- 自动网络切换

### 3. 智能合约
- VaultLend.sol: 主借贷合约
- FHEOperations.sol: FHE 工具合约
- 完整的借贷生命周期管理

### 4. 安全特性
- 银行级安全标准
- 多重签名验证
- 透明但隐私保护的交易记录

## 部署完成检查清单

- [ ] 项目成功部署到 Vercel
- [ ] 环境变量正确配置
- [ ] 钱包连接功能正常
- [ ] 页面加载无错误
- [ ] 响应式设计正常
- [ ] 性能指标良好
- [ ] 安全配置正确
- [ ] 监控系统就绪

部署完成后，您的 VaultLend 应用将在 Vercel 上运行，提供安全、隐私的去中心化借贷服务。
