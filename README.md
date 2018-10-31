# デプロイ

```bash
git clone <url>
cd scheduler
npm install
ng build --deploy-url scheduler/
forever start app.js
```