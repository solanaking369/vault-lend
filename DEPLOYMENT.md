# Vercel Deployment Guide for VaultLend

This guide provides step-by-step instructions for deploying VaultLend to Vercel.

## Prerequisites

- GitHub account
- Vercel account
- Node.js installed locally (for testing)

## Step 1: Prepare the Repository

1. Ensure all code is committed and pushed to GitHub:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

## Step 2: Connect to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository: `solanaking369/vault-lend`
4. Click "Import"

## Step 3: Configure Build Settings

### Framework Preset
- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Environment Variables
Add the following environment variables in Vercel dashboard:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLETCONNECT_PROJECT_ID
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_KEY
```

### Build Configuration
Create `vercel.json` in the project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

## Step 4: Deploy

1. Click "Deploy" in Vercel dashboard
2. Wait for the build process to complete
3. Your application will be available at the provided Vercel URL

## Step 5: Custom Domain (Optional)

1. In Vercel dashboard, go to your project settings
2. Navigate to "Domains" tab
3. Add your custom domain
4. Configure DNS records as instructed by Vercel

## Step 6: Environment Configuration

### Production Environment Variables
Ensure these are set in Vercel:

- `NEXT_PUBLIC_CHAIN_ID`: `11155111` (Sepolia Testnet)
- `NEXT_PUBLIC_RPC_URL`: Your preferred RPC endpoint
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`: Your WalletConnect project ID
- `NEXT_PUBLIC_INFURA_API_KEY`: Your Infura API key

### Smart Contract Deployment
1. Deploy contracts to Sepolia testnet
2. Update contract addresses in the frontend configuration
3. Redeploy the application

## Step 7: Monitoring and Updates

### Automatic Deployments
- Vercel automatically deploys on every push to main branch
- Preview deployments are created for pull requests

### Manual Deployments
- Use Vercel CLI: `vercel --prod`
- Or trigger from Vercel dashboard

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (should be 18+)
   - Verify all dependencies are in package.json
   - Check build logs in Vercel dashboard

2. **Environment Variables**
   - Ensure all required env vars are set
   - Check variable names match exactly
   - Redeploy after adding new variables

3. **Wallet Connection Issues**
   - Verify RPC URLs are correct
   - Check WalletConnect project ID
   - Ensure network configuration matches

### Performance Optimization

1. **Build Optimization**
   - Enable Vercel's automatic optimizations
   - Use dynamic imports for large components
   - Optimize images and assets

2. **Caching**
   - Configure appropriate cache headers
   - Use Vercel's edge caching
   - Optimize API responses

## Security Considerations

1. **Environment Variables**
   - Never commit sensitive keys to repository
   - Use Vercel's environment variable system
   - Rotate keys regularly

2. **Smart Contract Security**
   - Audit contracts before mainnet deployment
   - Use multi-signature wallets for admin functions
   - Implement proper access controls

## Monitoring

1. **Vercel Analytics**
   - Enable Vercel Analytics for performance monitoring
   - Monitor Core Web Vitals
   - Track user interactions

2. **Error Tracking**
   - Set up error tracking (Sentry, LogRocket)
   - Monitor smart contract events
   - Track wallet connection issues

## Rollback Procedures

1. **Quick Rollback**
   - Use Vercel dashboard to rollback to previous deployment
   - Or use CLI: `vercel rollback`

2. **Emergency Procedures**
   - Disable automatic deployments
   - Revert to stable version
   - Investigate issues before re-enabling

## Support

For issues related to:
- **Vercel**: Check Vercel documentation and support
- **Smart Contracts**: Review contract deployment logs
- **Frontend**: Check browser console and network tab
- **Wallet Integration**: Verify wallet provider documentation

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [WalletConnect Documentation](https://docs.walletconnect.com/)
- [FHE Documentation](https://docs.zama.ai/fhevm)