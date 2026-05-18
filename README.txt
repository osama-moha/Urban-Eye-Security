Urban Eye Security responsive navbar multi-page site

Copy all files and folders into your existing urban-eye-vercel project root.

Final structure:
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

Keep your existing urban-eye-assets folder. The website uses /urban-eye-assets/... image paths.

Preview locally:
python -m http.server 8000
Open http://localhost:8000

Deploy:
git add .
git commit -m "Add responsive premium navbar across all pages"
git push
