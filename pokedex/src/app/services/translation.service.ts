import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  /*
  id	iso639	iso3166	identifier	official	order
  1	ja	jp	ja-Hrkt	1	1
  2	ja	jp	roomaji	1	3
  3	ko	kr	ko	1	4
  4	zh	cn	zh-Hant	1	5
  5	fr	fr	fr	1	8
  6	de	de	de	1	9
  7	es	es	es	1	10
  8	it	it	it	1	11
  9	en	us	en	1	7
  10	cs	cz	cs	0	12
  11	ja	jp	ja	1	2
  12	zh	cn	zh-Hans	1	6
  13	pt-BR	br	pt-BR	0	13
  */
  countryCodeMap: Map<string,number> = new Map([
                                      ["ja",1],
                                      //["ja",2],
                                      ["ko",3],
                                      ["zh",4],
                                      ["fr",5],
                                      ["de",6],
                                      ["es",7],
                                      ["it",8],
                                      ["en",9],
                                      ["cs",10],
                                      //["ja",11],
                                      //["zh",12],
                                      ["pt-BR",13]
                                    ]);

  countryId: number = 9;//en;

  constructor() { }

  setLanguageByCode(countryCode: string): void{
    var countryId = this.countryCodeMap.get(countryCode);
    if(countryId){
      this.countryId = countryId
    }
  }

  getLanguageCode(): string{
    var result = "-";
    this.countryCodeMap.forEach((value, key) => {
        result = value === this.countryId ? key : result;
    });
    return result;
  }
}
