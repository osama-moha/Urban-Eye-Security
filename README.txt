Urban Eye Security corrected multi-page site

Copy all files and folders into your existing urban-eye-vercel project root.

Required final structure:
urban-eye-vercel/
  index.html
  style.css
  urban-eye-assets/
  cctv-installation/
  ajax-smart-alarms/
  manned-guarding/
  access-control/
  residential-security/
  airbnb-security/
  warehouse-security/
  retail-storefronts/

Keep the existing urban-eye-assets folder. The website uses /urban-eye-assets/... image paths.

To preview locally:
python -m http.server 8000
Then open http://localhost:8000

To deploy:
git add .
git commit -m "Add corrected multi-page SEO website"
git push
