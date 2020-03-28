import { from, concat, zip, combineLatest, of, interval } from 'rxjs';
import { map, tap, mergeAll, combineAll, mergeMap, flatMap } from 'rxjs/operators';
import { RxHR } from '@akanass/rx-http-request';
import admin from 'firebase-admin';

let serviceAccount = require('../darkedges-auth-firebase-adminsdk-co689-f9dbf84017.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore();
let collectionRef = db.collection('officeworks');

const stores = ["W331",
    "W355",
    "W316",
    "W356",
    "W325",
    "W346",
    "W353",
    "W315",
    "W361",
    "W327",
    "W345",
    "W360",
    "W306",
    "W351",
    "W342",
    "W334",
    "W359",
    "W312",
    "W311",
    "W319",
    "W340",
    "W363",
    "W313",
    "W304",
    "W309",
    "W310",
    "W329",
    "W308",
    "W341",
    "W348",
    "W305",
    "W343",
    "W337",
    "W332",
    "W323",
    "W347",
    "W307",
    "W301",
    "W336",
    "W320",
    "W318",
    "W302",
    "W333",
    "W366",
    "W354",
    "W358",
    "W349",
    "W350",
    "W321",
    "W352",
    "W326","W214",
    "W202",
    "W272",
    "W245",
    "W254",
    "W216",
    "W215",
    "W229",
    "W208",
    "W234",
    "W243",
    "W271",
    "W242",
    "W204",
    "W218",
    "W205",
    "W201",
    "W209",
    "W259",
    "W235",
    "W210",
    "W224",
    "W246",
    "W253",
    "W233",
    "W221",
    "W219",
    "W212",
    "W236",
    "W257",
    "W222",
    "W225",
    "W270",
    "W206",
    "W220",
    "W256",
    "W232",
    "W239",
    "W250",
    "W251",
    "W252",
    "W240",
    "W248",
    "W258",
    "W249",
    "W226",
    "W255",
    "W238",
    "W247",
    "W241",
    "W211",
    "W230",
    "W244"];
const products = ['JBPROFMBBK'];
let results: any = {};

updateData();

interval(60000).pipe().subscribe(data => {
    updateData()
});


function updateData() {
    console.log('updating data');
    from(stores).pipe(
        mergeMap(storeid =>
            from(products).pipe(
                map(productid => `https://www.officeworks.com.au/catalogue-app/api/availabilities/store/${storeid}/postcode/3101?partNumbers=${productid}`),
                flatMap(url =>
                    RxHR.get(url)
                ),
            )
        )
    ).subscribe(response => {
        try {
            const result = JSON.parse(response.body)[0];
            const key = result.sku;
            if (!results[key]) {
                results[key] = [];
            }
            results[key].push(result);
        } catch (Error) {
            console.log(Error)
        }
    }, null, () => {
        for (var i in results) {
            const sortedResults = results[i].sort((n1: any, n2: any) => {
                if (n1.storeName > n2.storeName) {
                    return 1;
                }

                if (n1.storeName < n2.storeName) {
                    return -1;
                }

                return 0;
            });
            collectionRef.doc(i).set({ ...sortedResults });
        }
        results = {};
    });
}