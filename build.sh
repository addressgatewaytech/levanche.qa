#!/bin/sh
# Vercel build: copy site to public/ and download product photos from Google Drive
set -e
rm -rf public && mkdir -p public/img
cp index.html terms.html refund.html privacy.html public/
cp info.js public/
cp 506c5812-cbba-4d69-a7ef-1680e94b58dd.jpg public/img/logo.jpg   # Levanche logo
cp 7a21f49a-83b0-423c-b5ef-d871e26fc9e4.jpg public/img/hero.jpg   # launch poster (left side shown)
dl() {
  out="public/img/$1.jpg"
  curl -fsSL --retry 3 -o "$out" "https://drive.google.com/uc?export=download&id=$2" || true
  if [ ! -s "$out" ] || head -c 200 "$out" | grep -qi "<html"; then
    curl -fsSL --retry 3 -o "$out" "https://drive.google.com/thumbnail?id=$2&sz=w1000"
  fi
}
dl p1 1jpkCoLe9s794UX2jgtCoduQurW1a7buZ
dl p2 1EZiKzLl3ZDV1FBe11Uk2g68MEt2JukgD
dl p3 1gJRQM5KSA5sFEGNZmdo4CJPMd8V4lp_9
dl p4 12Gw7ohQbOFE7dm_b6AMmr1F-ISi11ylf
dl p5 1vQYKeYa7BRurCnmJ1XYQDzNOSfXhN4lS
dl p6 1JaI62AhU98RDgyGaPcRWXPr_0VAV1YS2
dl p7 1o0eBCdCww5qpy76GBh_xjHzmyjsvsDSS
dl p8 19Sm2JrRviWkLl1BM54lDZve4XWBsL5LT
dl p9 1Rj3wxeSvGNioTtNcp849C0Byf-knB_LO
ls -la public/img
