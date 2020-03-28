import { of, from } from "rxjs";
import { concatMap, delay, map, flatMap, mergeMap } from "rxjs/operators";

const types=['1','2','3'];

console.log(new Date().getTime());
from(types).pipe(
    concatMap(url => mockHTTPRequest(url))
).subscribe(data => {
    console.log(new Date().getTime());
    console.log(data);
});

function mockHTTPRequest(url: any) {
    return of(`Response from ${url}`).pipe(delay(1000));
}