const IOS_WALLET_URL = 'https://apps.apple.com/ca/app/quotient-wallet/id6473549219';
const ANDROID_WALLET_URL = 'https://play.google.com/store/apps/details?id=labs.dock.quotient';

export default function handler(req, res) {
  const userAgent = req.headers['user-agent'];
  const isIOS = /(iPhone|iPad|iOS)/i.test(userAgent) || false;

  let redirectUrl = ANDROID_WALLET_URL;
  if (isIOS) {
    redirectUrl = IOS_WALLET_URL;
  }
  res.redirect(301, redirectUrl);
}
