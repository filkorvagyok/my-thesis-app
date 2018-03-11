import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let companies = [
        {
            id: 1,
            logo: 'http://atwork.djw.hu/filkortamas/logos/wallmart-logo.png',
            name: 'Walmart',
            phone: '1-800-925-6278',
            email: 'wallmart@wallmart.com',
            website: 'https://www.walmart.com/',
            facebook: 'https://www.facebook.com/walmart/',
            country_code: 'US',
            hq_country: 'Amerikai Egyesült Államok',
            hq_zipcode: '72716',
            hq_settlement: 'Arkansas',
            hq_address: 'Bentonville St. 8.',
            bi_name: 'Walmart',
            bi_country: 'Amerikai Egyesült Államok',
            bi_zipcode: '72716',
            bi_settlement: 'Arkansas',
            bi_address: 'Bentonville St. 8.',
            taxnumber: '11111111',
            mail_name: 'Walmart',
            mail_country: 'Amerikai Egyesült Államok',
            mail_zipcode: '72716',
            mail_settlement: 'Arkansas',
            mail_address: 'Bentonville St. 8.',
            industry_id: 26,
            employeesnum_id: 4,
            yearlyincome_id: 8,
            founded: 1962,
            selected: false,
            project: [1],
            contact: [],
            task: []
        },
        {
            id: 2,
            logo: '',
            name: 'Alma',
            phone: '32-123-456',
            email: 'alma@alma.hu',
            website: 'http://www.alma.hu/',
            facebook: 'https://www.facebook.com/alma/',
            country_code: 'HU',
            hq_country: 'Magyarország',
            hq_zipcode: '3100',
            hq_settlement: 'Salgótarján',
            hq_address: 'Pécskő utca 4.',
            bi_name: 'Alma',
            bi_country: 'Magyarország',
            bi_zipcode: '3100',
            bi_settlement: 'Salgótarján',
            bi_address: 'Pécskő utca 4.',
            taxnumber: '22222222',
            mail_name: 'Alma',
            mail_country: 'Magyarország',
            mail_zipcode: '3100',
            mail_settlement: 'Salgótarján',
            mail_address: 'Pécskő utca 4.',
            industry_id: 22,
            employeesnum_id: 2,
            yearlyincome_id: 2,
            founded: 2017,
            selected: false,
            project: [1],
            contact: [],
            task: []
        },
        {
            id: 3,
            logo: 'http://atwork.djw.hu/filkortamas/logos/toyota-logo.png',
            name: 'Toyota',
            phone: '800-331-4331',
            email: 'toyota@toyota.com',
            website: 'http://www.toyota-global.com/',
            facebook: 'https://www.facebook.com/toyota',
            country_code: 'JP',
            hq_country: 'Japán',
            hq_zipcode: '4412511',
            hq_settlement: 'Tojota',
            hq_address: 'Aicsi',
            bi_name: 'Toyota',
            bi_country: 'Japán',
            bi_zipcode: '4412511',
            bi_settlement: 'Tojota',
            bi_address: 'Aicsi',
            taxnumber: '33333333',
            mail_name: 'Toyota',
            mail_country: 'Japán',
            mail_zipcode: '4412511',
            mail_settlement: 'Tojota',
            mail_address: 'Aicsi',
            industry_id: 5,
            employeesnum_id: 4,
            yearlyincome_id: 8,
            founded: 1937,
            selected: false,
            project: [],
            contact: [],
            task: []
        },
        {
            id: 4,
            logo: '',
            name: 'Körte',
            phone: '36-234-567',
            email: 'korte@korte.hu',
            website: 'http://www.korte.hu/',
            facebook: 'https://www.facebook.com/korte/',
            country_code: 'HU',
            hq_country: 'Magyarország',
            hq_zipcode: '3300',
            hq_settlement: 'Eger',
            hq_address: 'Leányka utca 2.',
            bi_name: 'Körte',
            bi_country: 'Magyarország',
            bi_zipcode: '3300',
            bi_settlement: 'Eger',
            bi_address: 'Leányka utca 2.',
            taxnumber: '44444444',
            mail_name: 'Körte',
            mail_country: 'Magyarország',
            mail_zipcode: '3300',
            mail_settlement: 'Eger',
            mail_address: 'Leányka utca 2.',
            industry_id: 4,
            employeesnum_id: 1,
            yearlyincome_id: 1,
            founded: 2017,
            selected: false,
            project: [],
            contact: [],
            task: []
        },
        {
            id: 5,
            logo: 'http://atwork.djw.hu/filkortamas/logos/apple-logo.png',
            name: 'Apple',
            phone: '80-983-435',
            email: 'apple@apple.com',
            website: 'https://www.apple.com/',
            facebook: 'https://www.facebook.com/apple/',
            country_code: 'US',
            hq_country: 'Amerikai Egyesült Államok',
            hq_zipcode: '95014',
            hq_settlement: 'Kalifornia',
            hq_address: 'Cupertino',
            bi_name: 'Apple',
            bi_country: 'Amerikai Egyesült Államok',
            bi_zipcode: '95014',
            bi_settlement: 'Kalifornia',
            bi_address: 'Cupertino',
            taxnumber: '55555555',
            mail_name: 'Apple',
            mail_country: 'Amerikai Egyesült Államok',
            mail_zipcode: '95014',
            mail_settlement: 'Kalifornia',
            mail_address: 'Cupertino',
            industry_id: 21,
            employeesnum_id: 4,
            yearlyincome_id: 8,
            founded: 1976,
            selected: false,
            project: [],
            contact: [],
            task: []
        },
        {
            id: 6,
            logo: '',
            name: 'Banán',
            phone: '1-345-678',
            email: 'banan@banan.hu',
            website: 'http://www.banan.hu/',
            facebook: 'https://www.facebook.com/banan/',
            country_code: 'HU',
            hq_country: 'Magyarország',
            hq_zipcode: '1132',
            hq_settlement: 'Budapest',
            hq_address: 'Váci út 36.',
            bi_name: 'Banán',
            bi_country: 'Magyarország',
            bi_zipcode: '1132',
            bi_settlement: 'Budapest',
            bi_address: 'Váci út 36.',
            taxnumber: '66666666',
            mail_name: 'Banán',
            mail_country: 'Magyarország',
            mail_zipcode: '1132',
            mail_settlement: 'Budapest',
            mail_address: 'Váci út 36.',
            industry_id: 8,
            employeesnum_id: 2,
            yearlyincome_id: 2,
            founded: 2017,
            selected: false,
            project: [],
            contact: [],
            task: []
        }
    ];

    let countries = [
        { code:'AF', country:'Afganisztán' },
        { code:'AL', country:'Albánia' },
        { code:'DZ', country:'Algéria' },
        { code:'US', country:'Amerikai Egyesült Államok' },
        { code:'AS', country:'Amerikai Szamoa' },
        { code:'VI', country:'Amerikai Virgin-szigetek' },
        { code:'AD', country:'Andorra' },
        { code:'AO', country:'Angola' },
        { code:'AI', country:'Anguilla' },
        { code:'AQ', country:'Antarktisz' },
        { code:'AG', country:'Antigua' },
        { code:'AR', country:'Argentína' },
        { code:'AW', country:'Aruba' },
        { code:'AU', country:'Ausztrália' },
        { code:'AT', country:'Ausztria' },
        { code:'AZ', country:'Azerbajdzsán' },
        { code:'BS', country:'Bahama-szigetek' },
        { code:'BH', country:'Bahrein' },
        { code:'BD', country:'Banglades' },
        { code:'BB', country:'Barbados' },
        { code:'BE', country:'Belgium' },
        { code:'BZ', country:'Belize' },
        { code:'BJ', country:'Benin' },
        { code:'BM', country:'Bermuda' },
        { code:'BT', country:'Bhután' },
        { code:'GW', country:'Bissau-Guinea' },
        { code:'BO', country:'Bolívia' },
        { code:'BA', country:'Bosznia-Hercegovina' },
        { code:'BW', country:'Botswana' },
        { code:'BV', country:'Bouvet-sziget' },
        { code:'BR', country:'Brazília' },
        { code:'IO', country:'Brit Indiai-Óceániai Terület' },
        { code:'VG', country:'Brit Virgin-szigetek' },
        { code:'BN', country:'Brunei' },
        { code:'BG', country:'Bulgária' },
        { code:'BF', country:'Burkina Faso' },
        { code:'BI', country:'Burundi' },
        { code:'CL', country:'Chile' },
        { code:'CY', country:'Ciprus' },
        { code:'CC', country:'Coco-sziget' },
        { code:'KM', country:'Comore-szigetek' },
        { code:'CK', country:'Cook-szigetek' },
        { code:'CR', country:'Costa Rica' },
        { code:'TD', country:'Csád' },
        { code:'CZ', country:'Csehország' },
        { code:'DK', country:'Dánia' },
        { code:'ZA', country:'Dél-Afrikai Köztársaság' },
        { code:'GS', country:'Déli-Georgia és Déli-Sandwich-szigetek' },
        { code:'DM', country:'Dominikai Közösség' },
        { code:'DO', country:'Dominikai Köztársaság' },
        { code:'DJ', country:'Dzsibuti' },
        { code:'EC', country:'Ecuador' },
        { code:'GQ', country:'Egyenlítői-Guinea' },
        { code:'AE', country:'Egyesült Arab Emírségek' },
        { code:'EG', country:'Egyiptom' },
        { code:'CI', country:'Elefántcsontpart' },
        { code:'ER', country:'Eritrea' },
        { code:'MP', country:'Északi-Mariana-szigetek' },
        { code:'EE', country:'Észtország' },
        { code:'ET', country:'Etiópia' },
        { code:'U2', country:'Euró zóna' },
        { code:'FK', country:'Falkland-szigetek' },
        { code:'FO', country:'Faroe Islands' },
        { code:'BY', country:'Fehéroroszország' },
        { code:'FJ', country:'Fidzsi-szigetek' },
        { code:'FI', country:'Finnország' },
        { code:'TF', country:'Francia Déli Területek' },
        { code:'PF', country:'Francia Polinézia' },
        { code:'FR', country:'Franciaország' },
        { code:'PH', country:'Fülöp-szigetek' },
        { code:'GA', country:'Gabon' },
        { code:'GM', country:'Gambia' },
        { code:'GH', country:'Ghána' },
        { code:'GI', country:'Gibraltár' },
        { code:'GR', country:'Görögország ' },
        { code:'GD', country:'Grenada' },
        { code:'GL', country:'Grönland' },
        { code:'GE', country:'Grúzia' },
        { code:'GU', country:'Guam' },
        { code:'GT', country:'Guatemala' },
        { code:'GG', country:'Guernsey' },
        { code:'GN', country:'Guinea' },
        { code:'GY', country:'Guyana' },
        { code:'HT', country:'Haiti' },
        { code:'HM', country:'Heard-sziget és McDonalds-szigetek' },
        { code:'AN', country:'Holland Antillák' },
        { code:'NL', country:'Hollandia' },
        { code:'HN', country:'Honduras' },
        { code:'HK', country:'Hongkong' },
        { code:'HR', country:'Horvátország' },
        { code:'IN', country:'India' },
        { code:'ID', country:'Indonézia' },
        { code:'IQ', country:'Irak' },
        { code:'IR', country:'Irán' },
        { code:'IE', country:'Írország' },
        { code:'IS', country:'Izland' },
        { code:'IL', country:'Izrael' },
        { code:'JM', country:'Jamaica' },
        { code:'JP', country:'Japán' },
        { code:'YE', country:'Jemen' },
        { code:'JE', country:'Jersey' },
        { code:'JO', country:'Jordánia' },
        { code:'KY', country:'Kajmán-szigetek' },
        { code:'KH', country:'Kambodzsa' },
        { code:'CM', country:'Kamerun' },
        { code:'CA', country:'Kanada' },
        { code:'CX', country:'Karácsony-sziget' },
        { code:'QA', country:'Katar' },
        { code:'KZ', country:'Kazahsztán' },
        { code:'KE', country:'Kenya' },
        { code:'CN', country:'Kína' },
        { code:'KG', country:'Kirgizisztán' },
        { code:'KI', country:'Kiribati Köztársaság Tuvalu' },
        { code:'CO', country:'Kolumbia' },
        { code:'CG', country:'Kongó ' },
        { code:'CD', country:'Kongói Demokratikus Köztársaság' },
        { code:'KR', country:'Korea' },
        { code:'KP', country:'Koreai NDK' },
        { code:'CF', country:'Közép-afrikai Köztársaság' },
        { code:'CU', country:'Kuba' },
        { code:'KW', country:'Kuvait' },
        { code:'LA', country:'Laosz' },
        { code:'PL', country:'Lengyelország' },
        { code:'LS', country:'Lesotho' },
        { code:'LV', country:'Lettország' },
        { code:'LB', country:'Libanon' },
        { code:'LR', country:'Libéria' },
        { code:'LY', country:'Líbia' },
        { code:'LI', country:'Liechtenstein' },
        { code:'LT', country:'Litvánia ' },
        { code:'LU', country:'Luxemburg' },
        { code:'MO', country:'Macao' },
        { code:'MK', country:'Macedónia' },
        { code:'HU', country:'Magyarország' },
        { code:'MY', country:'Malajzia' },
        { code:'MW', country:'Malawi' },
        { code:'MV', country:'Maldív-szigetek' },
        { code:'MG', country:'Malgas Köztársaság' },
        { code:'ML', country:'Mali' },
        { code:'MT', country:'Málta' },
        { code:'IM', country:'Man sziget' },
        { code:'MA', country:'Marokkó' },
        { code:'MH', country:'Marshall-szigetek' },
        { code:'MR', country:'Mauritánia' },
        { code:'MU', country:'Mauritius' },
        { code:'MX', country:'Mexikó' },
        { code:'MM', country:'Mianmar' },
        { code:'FM', country:'Mikronézia' },
        { code:'MD', country:'Moldova' },
        { code:'MN', country:'Mongólia' },
        { code:'MS', country:'Montserrat' },
        { code:'MZ', country:'Mozambik' },
        { code:'GB', country:'Nagy-Britannia' },
        { code:'NA', country:'Namibia' },
        { code:'NR', country:'Nauru' },
        { code:'DE', country:'Németország' },
        { code:'NP', country:'Nepál' },
        { code:'NI', country:'Nicaragua' },
        { code:'NE', country:'Niger' },
        { code:'NG', country:'Nigéria' },
        { code:'NU', country:'Niue' },
        { code:'NF', country:'Norfolk szigetek' },
        { code:'NO', country:'Norvégia' },
        { code:'IT', country:'Olaszország' },
        { code:'OM', country:'Omán' },
        { code:'RU', country:'Oroszország' },
        { code:'AM', country:'Örményország' },
        { code:'PK', country:'Pakisztán' },
        { code:'PW', country:'Palau' },
        { code:'PS', country:'Palesztína ' },
        { code:'PA', country:'Panama' },
        { code:'PG', country:'Pápua Új-Ginea' },
        { code:'PY', country:'Paraguay' },
        { code:'PE', country:'Peru' },
        { code:'PN', country:'Pitcairn-szigetek' },
        { code:'PT', country:'Portugália' },
        { code:'RO', country:'Románia' },
        { code:'RW', country:'Ruanda' },
        { code:'KN', country:'Saint Christopher és Nevis' },
        { code:'LC', country:'Saint Lucia' },
        { code:'VC', country:'Saint Vincent' },
        { code:'SB', country:'Salamon-szigetek' },
        { code:'SV', country:'Salvador' },
        { code:'SM', country:'San Marino' },
        { code:'ST', country:'Sao Tome és Princípe' },
        { code:'SC', country:'Seychelle-szigetek' },
        { code:'SL', country:'Sierra Leone' },
        { code:'ES', country:'Spanyolország' },
        { code:'LK', country:'Sri Lanka' },
        { code:'SR', country:'Suriname' },
        { code:'CH', country:'Svájc' },
        { code:'SE', country:'Svédország' },
        { code:'WS', country:'Szamoa' },
        { code:'SA', country:'Szaúd-Arábia' },
        { code:'SN', country:'Szenegál' },
        { code:'SH', country:'Szent Ilona' },
        { code:'CS', country:'Szerbia és Montenegro' },
        { code:'SG', country:'Szingapúr' },
        { code:'SY', country:'Szíria' },
        { code:'SK', country:'Szlovákia' },
        { code:'SI', country:'Szlovénia' },
        { code:'SO', country:'Szomália' },
        { code:'SD', country:'Szudán' },
        { code:'SZ', country:'Szváziföld' },
        { code:'TJ', country:'Tadzsikisztán' },
        { code:'TW', country:'Taiwan' },
        { code:'TZ', country:'Tanzánia' },
        { code:'TH', country:'Thaiföld' },
        { code:'TG', country:'Togo' },
        { code:'TK', country:'Tokelau-szigetek' },
        { code:'TO', country:'Tonga' },
        { code:'TR', country:'Törökország' },
        { code:'TT', country:'Trinidad és Tobago' },
        { code:'TN', country:'Tunézia' },
        { code:'TC', country:'Turks- és Caicos-szigetek' },
        { code:'TV', country:'Tuvalu' },
        { code:'TM', country:'Türkmenisztán' },
        { code:'UG', country:'Uganda' },
        { code:'NC', country:'Új-Kaledónia' },
        { code:'NZ', country:'Új-Zéland' },
        { code:'UA', country:'Ukrajna' },
        { code:'UM', country:'United States Minor Outlying Islands ' },
        { code:'UY', country:'Uruguay' },
        { code:'UZ', country:'Üzbegisztán' },
        { code:'VU', country:'Vanuatu' },
        { code:'VA', country:'Vatikán' },
        { code:'VE', country:'Venezuela' },
        { code:'VN', country:'Vietnámi Köztársaság' },
        { code:'WF', country:'Wallis és Futuna' },
        { code:'ZM', country:'Zambia' },
        { code:'ZW', country:'Zimbabwe ' },
        { code:'CV', country:'Zöld-foki Köztársaság' }
    ];

    let industries = [
        { id:1, name:'Egészségügy' },
        { id:2, name:'Egyéb' },
        { id:3, name:'Emberek és társadalom' },
        { id:4, name:'Étel-ital' },
        { id:5, name:'Gépjárműipar' },
        { id:6, name:'Házi kedvencek és állatok' },
        { id:7, name:'Hírek' },
        { id:8, name:'Hobbi és szabadidő' },
        { id:9, name:'Ingatlan' },
        { id:10, name:'Internet és telekommunikáció' },
        { id:11, name:'Játékok' },
        { id:12, name:'Jog és kormányzat' },
        { id:13, name:'Könyvek és irodalom' },
        { id:14, name:'Munka és oktatás' },
        { id:15, name:'Művészet és szórakozás' },
        { id:16, name:'Online közösségek' },
        { id:17, name:'Otthon és kert' },
        { id:18, name:'Pénzügy' },
        { id:19, name:'Referencia' },
        { id:20, name:'Sport' },
        { id:21, name:'Számítógépek és elektronika' },
        { id:22, name:'Szépség és fitnesz' },
        { id:23, name:'Tudomány' },
        { id:24, name:'Utazás' },
        { id:25, name:'Üzleti és ipari piacok' },
        { id:26, name:'Vásárlás' },
    ];

    let employeesnums = [
        { id:1, number:'0 - 9' },
        { id:2, number:'10 - 49' },
        { id:3, number:'50 - 249' },
        { id:4, number:'250+' }
    ];

    let yearlyincomes = [
        { id:1, amount:'0 - 8 M Ft' },
        { id:2, amount:'8 - 12 M Ft' },
        { id:3, amount:'12 - 50 M Ft' },
        { id:4, amount:'50 - 100 M Ft' },
        { id:5, amount:'100 - 250 M Ft' },
        { id:6, amount:'250 - 500 M Ft' },
        { id:7, amount:'500 - 1.000 M Ft' },
        { id:8, amount:'1.000+ M Ft' }
    ];

    let projects = [
        {
            id: 1,
            name: 'Projekt1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum fuga tempora iste iusto dolores ipsa temporibus esse dolorum eius ratione?',
            checklist: false,
            company: [1,2],
            file: 'file',
            accountable: [1],
            owner: [1],
            observer: [],
            participant: [],
            deadline: new Date('2017-12-31'),
            status: 'Elindítva',
            priority: 'magas',
            stickers: '',
            currency: 'HUF',
            income: 500000000,
            expenditure: 2000000,
            selected: false,
            task: []
        },
        {
            id: 2,
            name: 'Projekt2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti qui a voluptates ea asperiores amet ullam, non nulla at, nesciunt dolores maiores, est ad quisquam veritatis odio! Possimus, iste, sit!',
            checklist: false,
            company: [3,4],
            file: 'file2',
            accountable: [],
            owner: [],
            observer: [1],
            participant: [1],
            deadline: new Date('2018-08-16'),
            status: 'Valami',
            priority: 'közepes',
            stickers: '',
            currency: 'HUF',
            income: 70000000,
            expenditure: 900000,
            selected: false,
            task: []
        }
    ];

    let contacts = [
        {
            id: 1,
            company: [],
            full_name: 'Filkor Tamás',
            surname: 'Filkor',
            middle_name: '',
            forename: 'Tamás',
            nickname: 'Tomi',
            phone: '06-20/417-6907',
            email: 'filkor.tomi@gmail.com',
            primary_communication_chanel: 'beszéd',
            rank: 'beosztott',
            greeting: 'csá',
            selected: false,
            project: [1,2],
            task: []
        }
    ];

    let tasks = [
        {
            id: 1,
            name: 'File1',
            selected: false,
            company: [],
            contact: [],
            project: []
        }
    ];


    return {companies, countries, industries, employeesnums, yearlyincomes, projects, contacts, tasks};
  }
}