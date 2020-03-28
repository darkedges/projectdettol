# projectdettol

```bash
cd angular
npm install
ng run projectdettol:deploy
cd ../node
docker build . -t darkedges/officeworks:1.0.0
kubectl apply -f k8s.yaml
```
