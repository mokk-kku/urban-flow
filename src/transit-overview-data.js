// Detailed public-transit overview data for Urban Flow.
// Version 6 expands the station dataset using the uploaded BTS SkyTrain Route Map plus Google Maps coordinate seeds.
// The overview layer is independent from Google Directions routing: Google APIs still calculate user-selected routes.
// Coordinates for newly added stations are intended for visual network plotting and can be refined by checking each station in Google Maps.

export const OVERVIEW_LINE_STYLES = {
  "ARL": {
    "color": "#ef5350",
    "weight": 5
  },
  "Blue": {
    "color": "#2f80ed",
    "weight": 5
  },
  "Purple": {
    "color": "#8e44ad",
    "weight": 5
  },
  "Dark green": {
    "color": "#008a45",
    "weight": 5
  },
  "Light green": {
    "color": "#73c92d",
    "weight": 5
  },
  "Gold": {
    "color": "#d4af37",
    "weight": 5
  },
  "Yellow": {
    "color": "#ffd600",
    "weight": 5
  },
  "Pink": {
    "color": "#ec407a",
    "weight": 5
  },
  "Pink branch": {
    "color": "#f48fb1",
    "weight": 4
  },
  "BRT": {
    "color": "#00a389",
    "weight": 4
  },
  "Red north": {
    "color": "#e53935",
    "weight": 5
  },
  "Red west": {
    "color": "#c62828",
    "weight": 5
  },
  "TRANSFER": {
    "color": "#ffffff",
    "weight": 2,
    "dash": [
      0,
      8
    ]
  },
  "bus": {
    "color": "#ffb300",
    "weight": 3
  },
  "boat": {
    "color": "#42a5f5",
    "weight": 4
  }
};

export const RAIL_STATIONS = [
  {
    "id": "1",
    "name_en": "Suvarnabhumi",
    "name_th": "สุวรรณภูมิ",
    "line": "ARL",
    "lat": 13.69790742,
    "lng": 100.7522493
  },
  {
    "id": "3",
    "name_en": "Lat Krabang",
    "name_th": "ลาดกระบัง",
    "line": "ARL",
    "lat": 13.7278904,
    "lng": 100.7486236
  },
  {
    "id": "4",
    "name_en": "Ban Thap Chang",
    "name_th": "บ้านทับช้าง",
    "line": "ARL",
    "lat": 13.73282618,
    "lng": 100.6913061
  },
  {
    "id": "5",
    "name_en": "Hua Mak",
    "name_th": "หัวหมาก",
    "line": "ARL",
    "lat": 13.737863613282752,
    "lng": 100.64516120216082
  },
  {
    "id": "6",
    "name_en": "Ramkhamhaeng",
    "name_th": "รามคำแหง",
    "line": "ARL",
    "lat": 13.74298957,
    "lng": 100.6001476
  },
  {
    "id": "7",
    "name_en": "Makkasan",
    "name_th": "มักกะสัน",
    "line": "ARL",
    "lat": 13.751060660206171,
    "lng": 100.56061877618946
  },
  {
    "id": "8",
    "name_en": "Ratchaprarop",
    "name_th": "ราชปรารภ",
    "line": "ARL",
    "lat": 13.75510533,
    "lng": 100.5421521
  },
  {
    "id": "9",
    "name_en": "Phaya Thai",
    "name_th": "พญาไท",
    "line": "ARL",
    "lat": 13.75677853,
    "lng": 100.5348391
  },
  {
    "id": "11",
    "name_en": "Tha Phra",
    "name_th": "ท่าพระ",
    "line": "Blue",
    "lat": 13.72969778,
    "lng": 100.4741528
  },
  {
    "id": "12",
    "name_en": "Charan 13",
    "name_th": "จรัญฯ 13",
    "line": "Blue",
    "lat": 13.73957625521534,
    "lng": 100.47084590822476
  },
  {
    "id": "13",
    "name_en": "Fai Chai",
    "name_th": "ไฟฉาย",
    "line": "Blue",
    "lat": 13.75513012,
    "lng": 100.469225
  },
  {
    "id": "14",
    "name_en": "Bang Khun Non",
    "name_th": "บางขุนนนท์",
    "line": "Blue",
    "lat": 13.76322858,
    "lng": 100.4732075
  },
  {
    "id": "15",
    "name_en": "Bang Yi Khan",
    "name_th": "บางยี่ขัน",
    "line": "Blue",
    "lat": 13.77753717,
    "lng": 100.485243
  },
  {
    "id": "16",
    "name_en": "Sirindhorn",
    "name_th": "สิรินธร",
    "line": "Blue",
    "lat": 13.78406434,
    "lng": 100.4934785
  },
  {
    "id": "17",
    "name_en": "Bang Phlat",
    "name_th": "บางพลัด",
    "line": "Blue",
    "lat": 13.79255197,
    "lng": 100.5050425
  },
  {
    "id": "18",
    "name_en": "Bang O",
    "name_th": "บางอ้อ",
    "line": "Blue",
    "lat": 13.79901673,
    "lng": 100.5096999
  },
  {
    "id": "19",
    "name_en": "Bang Pho",
    "name_th": "บางโพ",
    "line": "Blue",
    "lat": 13.80646721,
    "lng": 100.5210402
  },
  {
    "id": "20",
    "name_en": "Tao Poon",
    "name_th": "เตาปูน",
    "line": "Blue",
    "lat": 13.80621259,
    "lng": 100.530759
  },
  {
    "id": "21",
    "name_en": "Bang Sue",
    "name_th": "บางซื่อ",
    "line": "Blue",
    "lat": 13.80312385,
    "lng": 100.5391893
  },
  {
    "id": "22",
    "name_en": "Kamphaeng Phet",
    "name_th": "กำแพงเพชร",
    "line": "Blue",
    "lat": 13.79809541,
    "lng": 100.5475954
  },
  {
    "id": "23",
    "name_en": "Chatuchak Park",
    "name_th": "สวนจตุจักร",
    "line": "Blue",
    "lat": 13.802681262544317,
    "lng": 100.55348979071077
  },
  {
    "id": "24",
    "name_en": "Phahon Yothin",
    "name_th": "พหลโยธิน",
    "line": "Blue",
    "lat": 13.814248983693203,
    "lng": 100.56015666307466
  },
  {
    "id": "25",
    "name_en": "Lat Phrao",
    "name_th": "ลาดพร้าว",
    "line": "Blue",
    "lat": 13.80609374944993,
    "lng": 100.57363793334386
  },
  {
    "id": "26",
    "name_en": "Ratchadaphisek",
    "name_th": "รัชดาภิเษก",
    "line": "Blue",
    "lat": 13.79915789,
    "lng": 100.5746119
  },
  {
    "id": "27",
    "name_en": "Sutthisan",
    "name_th": "สุทธิสาร",
    "line": "Blue",
    "lat": 13.78973963,
    "lng": 100.5742003
  },
  {
    "id": "28",
    "name_en": "Huai Khwang",
    "name_th": "ห้วยขวาง",
    "line": "Blue",
    "lat": 13.77852705,
    "lng": 100.5736394
  },
  {
    "id": "29",
    "name_en": "Thailand Cultural Centre",
    "name_th": "ศูนย์วัฒธรรมแห่งประเทศไทย",
    "line": "Blue",
    "lat": 13.76627655,
    "lng": 100.5702328
  },
  {
    "id": "30",
    "name_en": "Phra Ram 9",
    "name_th": "พระราม 9",
    "line": "Blue",
    "lat": 13.75791625,
    "lng": 100.5655452
  },
  {
    "id": "31",
    "name_en": "Phetchaburi",
    "name_th": "เพชรบุรี",
    "line": "Blue",
    "lat": 13.749180579033204,
    "lng": 100.56336828897923
  },
  {
    "id": "32",
    "name_en": "Sukhumvit",
    "name_th": "สุขุมวิท",
    "line": "Blue",
    "lat": 13.73855034,
    "lng": 100.5614557
  },
  {
    "id": "33",
    "name_en": "Queen Sirikit National",
    "name_th": "ศูนย์การประชุมแห่งชาติสิริกิติ์",
    "line": "Blue",
    "lat": 13.72315611,
    "lng": 100.5601051
  },
  {
    "id": "34",
    "name_en": "Khlong Toei",
    "name_th": "คลองเตย",
    "line": "Blue",
    "lat": 13.72233526,
    "lng": 100.5539195
  },
  {
    "id": "35",
    "name_en": "Lumphini",
    "name_th": "ลุมพินี",
    "line": "Blue",
    "lat": 13.72577127,
    "lng": 100.5456769
  },
  {
    "id": "36",
    "name_en": "Si Lom",
    "name_th": "สีลม",
    "line": "Blue",
    "lat": 13.72926025,
    "lng": 100.5365456
  },
  {
    "id": "37",
    "name_en": "Sam Yan",
    "name_th": "สามย่าน",
    "line": "Blue",
    "lat": 13.73234822,
    "lng": 100.5299815
  },
  {
    "id": "38",
    "name_en": "Hua Lamphong",
    "name_th": "หัวลำโพง",
    "line": "Blue",
    "lat": 13.73783973,
    "lng": 100.5171627
  },
  {
    "id": "39",
    "name_en": "Wat Mangkon",
    "name_th": "วัดมังกร",
    "line": "Blue",
    "lat": 13.74201328,
    "lng": 100.5101788
  },
  {
    "id": "40",
    "name_en": "Sam Yot",
    "name_th": "สามยอด",
    "line": "Blue",
    "lat": 13.74715729,
    "lng": 100.5022257
  },
  {
    "id": "41",
    "name_en": "Sanam Chai",
    "name_th": "สนามไชย",
    "line": "Blue",
    "lat": 13.743877396613847,
    "lng": 100.49468906546261
  },
  {
    "id": "42",
    "name_en": "Itsaraphap",
    "name_th": "อิสรภาพ",
    "line": "Blue",
    "lat": 13.73832048,
    "lng": 100.4852921
  },
  {
    "id": "43",
    "name_en": "Bang Phai",
    "name_th": "บางไผ่",
    "line": "Blue",
    "lat": 13.72459435,
    "lng": 100.4651747
  },
  {
    "id": "44",
    "name_en": "Bang Wa",
    "name_th": "บางหว้า",
    "line": "Blue",
    "lat": 13.72039546,
    "lng": 100.4571675
  },
  {
    "id": "45",
    "name_en": "Phetkasem 48",
    "name_th": "เพชรเกษม 48",
    "line": "Blue",
    "lat": 13.71550917,
    "lng": 100.4456044
  },
  {
    "id": "46",
    "name_en": "Phasi Charoen",
    "name_th": "ภาษีเจริญ",
    "line": "Blue",
    "lat": 13.71288542,
    "lng": 100.4341567
  },
  {
    "id": "47",
    "name_en": "Bang Khae",
    "name_th": "บางแค",
    "line": "Blue",
    "lat": 13.71194125,
    "lng": 100.4223819
  },
  {
    "id": "48",
    "name_en": "Lak Song",
    "name_th": "หลักสอง",
    "line": "Blue",
    "lat": 13.7109686,
    "lng": 100.4099721
  },
  {
    "id": "73",
    "name_en": "Siam",
    "name_th": "สยาม",
    "line": "Dark green",
    "lat": 13.74561143,
    "lng": 100.5341474
  },
  {
    "id": "74",
    "name_en": "Siam",
    "name_th": "สยาม",
    "line": "Light green",
    "lat": 13.745698499507208,
    "lng": 100.5341023121638
  },
  {
    "id": "75",
    "name_en": "Chit Lom",
    "name_th": "ชิดลม",
    "line": "Light green",
    "lat": 13.74408069,
    "lng": 100.5430873
  },
  {
    "id": "76",
    "name_en": "Bang Chak",
    "name_th": "บางจาก",
    "line": "Light green",
    "lat": 13.69673557,
    "lng": 100.6052246
  },
  {
    "id": "77",
    "name_en": "Punnawithi",
    "name_th": "ปุณณวิถี",
    "line": "Light green",
    "lat": 13.68924559,
    "lng": 100.6090509
  },
  {
    "id": "78",
    "name_en": "Udom Suk",
    "name_th": "อุดมสุข",
    "line": "Light green",
    "lat": 13.67991899,
    "lng": 100.6095904
  },
  {
    "id": "79",
    "name_en": "Bang Na",
    "name_th": "บางนา",
    "line": "Light green",
    "lat": 13.66814729,
    "lng": 100.6047186
  },
  {
    "id": "80",
    "name_en": "Bearing",
    "name_th": "แบริ่ง",
    "line": "Light green",
    "lat": 13.66133924,
    "lng": 100.6019284
  },
  {
    "id": "81",
    "name_en": "Samrong",
    "name_th": "สำโรง",
    "line": "Light green",
    "lat": 13.64618067,
    "lng": 100.5955061
  },
  {
    "id": "82",
    "name_en": "Pu Chao",
    "name_th": "ปู่เจ้า",
    "line": "Light green",
    "lat": 13.63724629,
    "lng": 100.5920546
  },
  {
    "id": "83",
    "name_en": "Chang Erawan",
    "name_th": "ช้างเอราวัณ",
    "line": "Light green",
    "lat": 13.62153309,
    "lng": 100.5902021
  },
  {
    "id": "84",
    "name_en": "Royal Thai Naval Academy",
    "name_th": "โรงเรียนนายเรือ",
    "line": "Light green",
    "lat": 13.60845311,
    "lng": 100.5949343
  },
  {
    "id": "85",
    "name_en": "Pak Nam",
    "name_th": "ปากน้ำ",
    "line": "Light green",
    "lat": 13.60211662,
    "lng": 100.5971519
  },
  {
    "id": "86",
    "name_en": "Phloen Chit",
    "name_th": "เพลินจิต",
    "line": "Light green",
    "lat": 13.74305844,
    "lng": 100.5490357
  },
  {
    "id": "87",
    "name_en": "Srinagarindra",
    "name_th": "ศรีนครินทร์",
    "line": "Light green",
    "lat": 13.59205817,
    "lng": 100.608983
  },
  {
    "id": "88",
    "name_en": "Phraek Sa",
    "name_th": "แพรกษา",
    "line": "Light green",
    "lat": 13.58432495,
    "lng": 100.607975
  },
  {
    "id": "89",
    "name_en": "Sai Luat",
    "name_th": "สายลวด",
    "line": "Light green",
    "lat": 13.57771156,
    "lng": 100.6054492
  },
  {
    "id": "90",
    "name_en": "Kheha",
    "name_th": "เคหะฯ",
    "line": "Light green",
    "lat": 13.56766421,
    "lng": 100.6077781
  },
  {
    "id": "96",
    "name_en": "Nana",
    "name_th": "นานา",
    "line": "Light green",
    "lat": 13.74053723,
    "lng": 100.5554754
  },
  {
    "id": "97",
    "name_en": "Asok",
    "name_th": "อโศก",
    "line": "Light green",
    "lat": 13.73704787,
    "lng": 100.5603549
  },
  {
    "id": "98",
    "name_en": "Phrom Phong",
    "name_th": "พร้อมพงศ์",
    "line": "Light green",
    "lat": 13.73045553,
    "lng": 100.5696996
  },
  {
    "id": "99",
    "name_en": "Thong Lo",
    "name_th": "ทองหล่อ",
    "line": "Light green",
    "lat": 13.72435715,
    "lng": 100.5784291
  },
  {
    "id": "100",
    "name_en": "Ekkamai",
    "name_th": "เอกมัย",
    "line": "Light green",
    "lat": 13.71955685,
    "lng": 100.5850876
  },
  {
    "id": "101",
    "name_en": "Phra Khanong",
    "name_th": "พระโขนง",
    "line": "Light green",
    "lat": 13.71523481,
    "lng": 100.5912765
  },
  {
    "id": "102",
    "name_en": "On Nut",
    "name_th": "อ่อนนุช",
    "line": "Light green",
    "lat": 13.70563696,
    "lng": 100.6010277
  },
  {
    "id": "103",
    "name_en": "Krung Thon Buri",
    "name_th": "กรุงธนบุรี",
    "line": "Gold",
    "lat": 13.72111862,
    "lng": 100.5036484
  },
  {
    "id": "104",
    "name_en": "Charoen Nakhorn",
    "name_th": "เจริญนคร",
    "line": "Gold",
    "lat": 13.72652947,
    "lng": 100.5089743
  },
  {
    "id": "105",
    "name_en": "Khlong San",
    "name_th": "คลองสาน",
    "line": "Gold",
    "lat": 13.73045608,
    "lng": 100.5076094
  },
  {
    "id": "148",
    "name_en": "Ratchathewi",
    "name_th": "ราชเทวี",
    "line": "Light green",
    "lat": 13.75207562,
    "lng": 100.5315714
  },
  {
    "id": "149",
    "name_en": "Phahon Yothin 24",
    "name_th": "พหลโยธิน 24",
    "line": "Light green",
    "lat": 13.82403179,
    "lng": 100.5663319
  },
  {
    "id": "150",
    "name_en": "Ratchayothin",
    "name_th": "รัชโยธิน",
    "line": "Light green",
    "lat": 13.82976184,
    "lng": 100.569629
  },
  {
    "id": "151",
    "name_en": "Sena Nikhom",
    "name_th": "เสนานิคม",
    "line": "Light green",
    "lat": 13.83635368,
    "lng": 100.573518
  },
  {
    "id": "152",
    "name_en": "Kasetsart University",
    "name_th": "มหาวิทยาลัยเกษตรศาสตร์",
    "line": "Light green",
    "lat": 13.84237073,
    "lng": 100.577111
  },
  {
    "id": "153",
    "name_en": "Royal Forest Department",
    "name_th": "กรมป่าไม้",
    "line": "Light green",
    "lat": 13.85039048,
    "lng": 100.5817693
  },
  {
    "id": "154",
    "name_en": "Bang Bua",
    "name_th": "บางบัว",
    "line": "Light green",
    "lat": 13.85597345,
    "lng": 100.5851115
  },
  {
    "id": "155",
    "name_en": "11th Infantry Regiment",
    "name_th": "กรมทหารราบที่ 11",
    "line": "Light green",
    "lat": 13.86755996,
    "lng": 100.5918953
  },
  {
    "id": "156",
    "name_en": "Wat Phra Sri Mahathat",
    "name_th": "วัดพระศรีมหาธาตุ",
    "line": "Light green",
    "lat": 13.87534903,
    "lng": 100.596748
  },
  {
    "id": "157",
    "name_en": "Phahon Yothin 59",
    "name_th": "พหลโยธิน 59",
    "line": "Light green",
    "lat": 13.88259699,
    "lng": 100.600773
  },
  {
    "id": "158",
    "name_en": "Sai Yud",
    "name_th": "สายหยุด",
    "line": "Light green",
    "lat": 13.88844049,
    "lng": 100.604197
  },
  {
    "id": "159",
    "name_en": "Phaya Thai",
    "name_th": "พญาไท",
    "line": "Light green",
    "lat": 13.756964372636258,
    "lng": 100.53386331429024
  },
  {
    "id": "160",
    "name_en": "Saphan Mai",
    "name_th": "สะพานใหม่",
    "line": "Light green",
    "lat": 13.89660637,
    "lng": 100.6090666
  },
  {
    "id": "161",
    "name_en": "Bhumibol Adulyadej Hospital",
    "name_th": "โรงพยาบาลภูมิพลอดุลยเดช",
    "line": "Light green",
    "lat": 13.91070517,
    "lng": 100.6173433
  },
  {
    "id": "162",
    "name_en": "Royal Thai Air Force Museum",
    "name_th": "พิพิธภัณฑ์กองทัพอากาศ",
    "line": "Light green",
    "lat": 13.91794885,
    "lng": 100.6216541
  },
  {
    "id": "163",
    "name_en": "Yaek Kor Por Aor",
    "name_th": "แยก คปอ.",
    "line": "Light green",
    "lat": 13.92502233,
    "lng": 100.6259235
  },
  {
    "id": "164",
    "name_en": "Khu Khot",
    "name_th": "คูคต",
    "line": "Light green",
    "lat": 13.93235302,
    "lng": 100.6466286
  },
  {
    "id": "169",
    "name_en": "Victory Monument",
    "name_th": "อนุสาวรีย์ชัยสมรภูมิ",
    "line": "Light green",
    "lat": 13.7628712,
    "lng": 100.5370477
  },
  {
    "id": "170",
    "name_en": "Sanam Pao",
    "name_th": "สนามเป้า",
    "line": "Light green",
    "lat": 13.77264449,
    "lng": 100.5421253
  },
  {
    "id": "171",
    "name_en": "Ari",
    "name_th": "อารีย์",
    "line": "Light green",
    "lat": 13.77985028,
    "lng": 100.5446531
  },
  {
    "id": "173",
    "name_en": "Saphan Khwai",
    "name_th": "สะพานควาย",
    "line": "Light green",
    "lat": 13.79380459,
    "lng": 100.5497505
  },
  {
    "id": "174",
    "name_en": "Mo Chit",
    "name_th": "หมอชิต",
    "line": "Light green",
    "lat": 13.802547868058916,
    "lng": 100.55381902075699
  },
  {
    "id": "175",
    "name_en": "Ha Yaek Lat Phrao",
    "name_th": "ห้าแยกลาดพร้าว",
    "line": "Light green",
    "lat": 13.81641185,
    "lng": 100.5619534
  },
  {
    "id": "234",
    "name_en": "Khlong Bang Phai",
    "name_th": "คลองบางไผ่",
    "line": "Purple",
    "lat": 13.892323552939697,
    "lng": 100.40823892871694
  },
  {
    "id": "235",
    "name_en": "Talad Bang Yai",
    "name_th": "ตลาดบางใหญ่",
    "line": "Purple",
    "lat": 13.88112798,
    "lng": 100.4092513
  },
  {
    "id": "236",
    "name_en": "Sam Yaek Bang Yai",
    "name_th": "สามแยกบางใหญ่",
    "line": "Purple",
    "lat": 13.87456616,
    "lng": 100.4194113
  },
  {
    "id": "237",
    "name_en": "Bang Phlu",
    "name_th": "บางพลู",
    "line": "Purple",
    "lat": 13.87572623,
    "lng": 100.4338654
  },
  {
    "id": "238",
    "name_en": "Bang Rak Yai",
    "name_th": "บางรักใหญ่",
    "line": "Purple",
    "lat": 13.87660559,
    "lng": 100.4449095
  },
  {
    "id": "239",
    "name_en": "Bang Rak Noi Tha It",
    "name_th": "บางรักน้อยท่าอิฐ",
    "line": "Purple",
    "lat": 13.874653444616708,
    "lng": 100.45618842852654
  },
  {
    "id": "240",
    "name_en": "Sai Ma",
    "name_th": "ไทรม้า",
    "line": "Purple",
    "lat": 13.87050059,
    "lng": 100.4666311
  },
  {
    "id": "241",
    "name_en": "Phra Nang klao Bridge",
    "name_th": "สะพานพระนั่งเกล้า",
    "line": "Purple",
    "lat": 13.8703241,
    "lng": 100.4803656
  },
  {
    "id": "242",
    "name_en": "Yaek Nonthaburi 1",
    "name_th": "แยกนนทบุรี 1",
    "line": "Purple",
    "lat": 13.865924672830364,
    "lng": 100.49426805453928
  },
  {
    "id": "243",
    "name_en": "Bang Krasor",
    "name_th": "บางกระสอ",
    "line": "Purple",
    "lat": 13.86169155,
    "lng": 100.504486
  },
  {
    "id": "244",
    "name_en": "Nonthaburi Civic Center",
    "name_th": "ศูนย์ราชการนนทบุรี",
    "line": "Purple",
    "lat": 13.8602065,
    "lng": 100.5132428
  },
  {
    "id": "245",
    "name_en": "Ministry of Public Health",
    "name_th": "กระทรวงสาธารณสุข",
    "line": "Purple",
    "lat": 13.84867734,
    "lng": 100.5146738
  },
  {
    "id": "246",
    "name_en": "Yaek Tiwanon",
    "name_th": "แยกติวานนท์",
    "line": "Purple",
    "lat": 13.83957886,
    "lng": 100.5148801
  },
  {
    "id": "247",
    "name_en": "Wong Sawang",
    "name_th": "วงศ์สว่าง",
    "line": "Purple",
    "lat": 13.8299112056131,
    "lng": 100.52650087306807
  },
  {
    "id": "248",
    "name_en": "Bang Son",
    "name_th": "บางซ่อน",
    "line": "Purple",
    "lat": 13.82021251378153,
    "lng": 100.53251989932816
  },
  {
    "id": "249",
    "name_en": "Tao Poon",
    "name_th": "เตาปูน",
    "line": "Purple",
    "lat": 13.80621259,
    "lng": 100.530759
  },
  {
    "id": "274",
    "name_en": "Bang Sue",
    "name_th": "บางซื่อ",
    "line": "Red north",
    "lat": 13.80464389,
    "lng": 100.5420537
  },
  {
    "id": "275",
    "name_en": "Chatuchak",
    "name_th": "จตุจักร",
    "line": "Red north",
    "lat": 13.82652595,
    "lng": 100.5493932
  },
  {
    "id": "276",
    "name_en": "Wat Samian Nari",
    "name_th": "วัดเสมียนนารี",
    "line": "Red north",
    "lat": 13.84168597,
    "lng": 100.5575223
  },
  {
    "id": "277",
    "name_en": "Bang Khen",
    "name_th": "บางเขน",
    "line": "Red north",
    "lat": 13.84696561,
    "lng": 100.5607408
  },
  {
    "id": "278",
    "name_en": "Thung Song Hong",
    "name_th": "ทุ่งสองห้อง",
    "line": "Red north",
    "lat": 13.86020462,
    "lng": 100.5673919
  },
  {
    "id": "279",
    "name_en": "Lak Si",
    "name_th": "หลักสี่",
    "line": "Red north",
    "lat": 13.884546828302467,
    "lng": 100.58123240473782
  },
  {
    "id": "280",
    "name_en": "Kan Kheha",
    "name_th": "การเคหะ",
    "line": "Red north",
    "lat": 13.89861755,
    "lng": 100.5890021
  },
  {
    "id": "281",
    "name_en": "Don Muang",
    "name_th": "ดอนเมือง",
    "line": "Red north",
    "lat": 13.91507215,
    "lng": 100.5979559
  },
  {
    "id": "282",
    "name_en": "Lak Hok",
    "name_th": "หลักหก",
    "line": "Red north",
    "lat": 13.96583148,
    "lng": 100.6053144
  },
  {
    "id": "283",
    "name_en": "Rangsit",
    "name_th": "รังสิต",
    "line": "Red north",
    "lat": 13.991098945372691,
    "lng": 100.60263726722329
  },
  {
    "id": "311",
    "name_en": "Bang Sue",
    "name_th": "บางซื่อ",
    "line": "Red west",
    "lat": 13.80464389,
    "lng": 100.5420537
  },
  {
    "id": "312",
    "name_en": "Bang Son",
    "name_th": "บางซ่อน",
    "line": "Red west",
    "lat": 13.82205892,
    "lng": 100.534189
  },
  {
    "id": "315",
    "name_en": "Bang Bamru",
    "name_th": "บางบำหรุ",
    "line": "Red west",
    "lat": 13.79170674,
    "lng": 100.4776743
  },
  {
    "id": "316",
    "name_en": "Taling Chan",
    "name_th": "ตลิ่งชัน",
    "line": "Red west",
    "lat": 13.78934932,
    "lng": 100.4400187
  },
  {
    "id": "325",
    "name_en": "Ratchadamri",
    "name_th": "ราชดำริ",
    "line": "Dark green",
    "lat": 13.73945684,
    "lng": 100.5394348
  },
  {
    "id": "326",
    "name_en": "Talat Phlu",
    "name_th": "ตลาดพลู",
    "line": "Dark green",
    "lat": 13.71422607,
    "lng": 100.4768081
  },
  {
    "id": "327",
    "name_en": "Wutthakat",
    "name_th": "วุฒากาศ",
    "line": "Dark green",
    "lat": 13.71307476,
    "lng": 100.4689102
  },
  {
    "id": "328",
    "name_en": "Bang Wa",
    "name_th": "บางหว้า",
    "line": "Dark green",
    "lat": 13.720595036591659,
    "lng": 100.45776532073906
  },
  {
    "id": "329",
    "name_en": "Sala Daeng",
    "name_th": "ศาลาแดง",
    "line": "Dark green",
    "lat": 13.72845579,
    "lng": 100.5340886
  },
  {
    "id": "330",
    "name_en": "Chong Nonsi",
    "name_th": "ช่องนนทรี",
    "line": "Dark green",
    "lat": 13.7237111,
    "lng": 100.5294617
  },
  {
    "id": "331",
    "name_en": "Saint Louis",
    "name_th": "เซนต์หลุยส์",
    "line": "Dark green",
    "lat": 13.72092969,
    "lng": 100.5268975
  },
  {
    "id": "332",
    "name_en": "Surasak",
    "name_th": "สุรศักดิ์",
    "line": "Dark green",
    "lat": 13.71921117,
    "lng": 100.5214964
  },
  {
    "id": "333",
    "name_en": "Saphan Taksin",
    "name_th": "สะพานตากสิน",
    "line": "Dark green",
    "lat": 13.71881539,
    "lng": 100.5141108
  },
  {
    "id": "334",
    "name_en": "Krung Thon Buri",
    "name_th": "กรุงธนบุรี",
    "line": "Dark green",
    "lat": 13.72084312,
    "lng": 100.5027149
  },
  {
    "id": "335",
    "name_en": "Wongwian Yai",
    "name_th": "วงเวียนใหญ่",
    "line": "Dark green",
    "lat": 13.72108781,
    "lng": 100.4953148
  },
  {
    "id": "336",
    "name_en": "Pho Nimit",
    "name_th": "โพธิ์นิมิตร",
    "line": "Dark green",
    "lat": 13.71925298,
    "lng": 100.4860682
  },
  {
    "id": "337",
    "name_en": "National Stadium",
    "name_th": "สนามกีฬาแห่งชาติ",
    "line": "Dark green",
    "lat": 13.74648713851406,
    "lng": 100.52909234847361
  },
  {
    "id": "YL01",
    "code": "YL01",
    "name_en": "Lat Phrao",
    "name_th": "ลาดพร้าว",
    "line": "Yellow",
    "lat": 13.806647139467671,
    "lng": 100.57484885819376,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "YL02",
    "code": "YL02",
    "name_en": "Phawana",
    "name_th": "ภาวนา",
    "line": "Yellow",
    "lat": 13.80013059068028,
    "lng": 100.58420242375999,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "YL03",
    "code": "YL03",
    "name_en": "Chok Chai 4",
    "name_th": "โชคชัย 4",
    "line": "Yellow",
    "lat": 13.79445512173381,
    "lng": 100.5943576089815,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "YL04",
    "code": "YL04",
    "name_en": "Lat Phrao 71",
    "name_th": "ลาดพร้าว 71",
    "line": "Yellow",
    "lat": 13.787318546658781,
    "lng": 100.60712008990392,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "YL05",
    "code": "YL05",
    "name_en": "Lat Phrao 83",
    "name_th": "ลาดพร้าว 83",
    "line": "Yellow",
    "lat": 13.78365077291647,
    "lng": 100.61369686585674,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "YL06",
    "code": "YL06",
    "name_en": "Mahat Thai",
    "name_th": "มหาดไทย",
    "line": "Yellow",
    "lat": 13.778066402179244,
    "lng": 100.62369256753556,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "YL07",
    "code": "YL07",
    "name_en": "Lat Phrao 101",
    "name_th": "ลาดพร้าว 101",
    "line": "Yellow",
    "lat": 13.774333610592306,
    "lng": 100.63035331911843,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "YL08",
    "code": "YL08",
    "name_en": "Bang Kapi",
    "name_th": "บางกะปิ",
    "line": "Yellow",
    "lat": 13.768991587749804,
    "lng": 100.63982502317718,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "YL09",
    "code": "YL09",
    "name_en": "Yaek Lam Sali",
    "name_th": "แยกลำสาลี",
    "line": "Yellow",
    "lat": 13.76166797273283,
    "lng": 100.64561387525895,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "YL10",
    "code": "YL10",
    "name_en": "Si Kritha",
    "name_th": "ศรีกรีฑา",
    "line": "Yellow",
    "lat": 13.750752112589963,
    "lng": 100.64498983390874,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "YL11",
    "code": "YL11",
    "name_en": "Hua Mak",
    "name_th": "หัวหมาก",
    "line": "Yellow",
    "lat": 13.73645782114641,
    "lng": 100.64128695573314,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "YL12",
    "code": "YL12",
    "name_en": "Kalantan",
    "name_th": "กลันตัน",
    "line": "Yellow",
    "lat": 13.725622727337111,
    "lng": 100.64181930048646,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "YL13",
    "code": "YL13",
    "name_en": "Si Nut",
    "name_th": "ศรีนุช",
    "line": "Yellow",
    "lat": 13.711090344989987,
    "lng": 100.64416996580788,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "YL14",
    "code": "YL14",
    "name_en": "Srinagarindra 38",
    "name_th": "ศรีนครินทร์ 38",
    "line": "Yellow",
    "lat": 13.700624021281065,
    "lng": 100.64664247659412,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "YL15",
    "code": "YL15",
    "name_en": "Suan Luang Rama IX",
    "name_th": "สวนหลวง ร.9",
    "line": "Yellow",
    "lat": 13.690808899533964,
    "lng": 100.64715171384351,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "YL16",
    "code": "YL16",
    "name_en": "Si Udom",
    "name_th": "ศรีอุดม",
    "line": "Yellow",
    "lat": 13.676499817187368,
    "lng": 100.64612121952129,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "YL17",
    "code": "YL17",
    "name_en": "Si Iam",
    "name_th": "ศรีเอี่ยม",
    "line": "Yellow",
    "lat": 13.667641807887447,
    "lng": 100.64511461045102,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "YL18",
    "code": "YL18",
    "name_en": "Si La Salle",
    "name_th": "ศรีลาซาล",
    "line": "Yellow",
    "lat": 13.655982774943418,
    "lng": 100.64234699789064,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "YL19",
    "code": "YL19",
    "name_en": "Si Bearing",
    "name_th": "ศรีแบริ่ง",
    "line": "Yellow",
    "lat": 13.64351618477221,
    "lng": 100.63633380358367,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "YL20",
    "code": "YL20",
    "name_en": "Si Dan",
    "name_th": "ศรีด่าน",
    "line": "Yellow",
    "lat": 13.633169495764552,
    "lng": 100.63018506759717,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "YL21",
    "code": "YL21",
    "name_en": "Si Thepha",
    "name_th": "ศรีเทพา",
    "line": "Yellow",
    "lat": 13.629940815846357,
    "lng": 100.62264574314217,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "YL22",
    "code": "YL22",
    "name_en": "Thipphawan",
    "name_th": "ทิพวัล",
    "line": "Yellow",
    "lat": 13.63687206371574,
    "lng": 100.60978965820945,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "YL23",
    "code": "YL23",
    "name_en": "Samrong",
    "name_th": "สำโรง",
    "line": "Yellow",
    "lat": 13.645119126053206,
    "lng": 100.59646834895786,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK01",
    "code": "PK01",
    "name_en": "Nonthaburi Civic Center",
    "name_th": "ศูนย์ราชการนนทบุรี",
    "line": "Pink",
    "lat": 13.8604,
    "lng": 100.51315,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK02",
    "code": "PK02",
    "name_en": "Khae Rai",
    "name_th": "แคราย",
    "line": "Pink",
    "lat": 13.862756425516828,
    "lng": 100.52062092759172,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK03",
    "code": "PK03",
    "name_en": "Sanambin Nam",
    "name_th": "สนามบินน้ำ",
    "line": "Pink",
    "lat": 13.874140022497295,
    "lng": 100.51627908368847,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK04",
    "code": "PK04",
    "name_en": "Samakkhi",
    "name_th": "สามัคคี",
    "line": "Pink",
    "lat": 13.889206665811276,
    "lng": 100.5106674219833,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK05",
    "code": "PK05",
    "name_en": "Royal Irrigation Department",
    "name_th": "กรมชลประทาน",
    "line": "Pink",
    "lat": 13.898611352395749,
    "lng": 100.50710544363238,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK06",
    "code": "PK06",
    "name_en": "Yaek Pak Kret",
    "name_th": "แยกปากเกร็ด",
    "line": "Pink",
    "lat": 13.90644308314984,
    "lng": 100.50535665047906,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK07",
    "code": "PK07",
    "name_en": "Pak Kret Bypass",
    "name_th": "เลี่ยงเมืองปากเกร็ด",
    "line": "Pink",
    "lat": 13.906441393399405,
    "lng": 100.51579738824283,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK08",
    "code": "PK08",
    "name_en": "Chaeng Watthana-Pak Kret 28",
    "name_th": "แจ้งวัฒนะ-ปากเกร็ด 28",
    "line": "Pink",
    "lat": 13.904087731300102,
    "lng": 100.5291655173114,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK09",
    "code": "PK09",
    "name_en": "Si Rat",
    "name_th": "ศรีรัช",
    "line": "Pink",
    "lat": 13.900546788469354,
    "lng": 100.5398728986398,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK10",
    "code": "PK10",
    "name_en": "Muang Thong Thani",
    "name_th": "เมืองทองธานี",
    "line": "Pink",
    "lat": 13.898474777271218,
    "lng": 100.54525998514872,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK11",
    "code": "PK11",
    "name_en": "Chaeng Watthana 14",
    "name_th": "แจ้งวัฒนะ 14",
    "line": "Pink",
    "lat": 13.893183522981948,
    "lng": 100.56034351358507,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK12",
    "code": "PK12",
    "name_en": "Government Complex",
    "name_th": "ศูนย์ราชการเฉลิมพระเกียรติ",
    "line": "Pink",
    "lat": 13.89076723453586,
    "lng": 100.56732809083985,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK13",
    "code": "PK13",
    "name_en": "National Telecom",
    "name_th": "โทรคมนาคมแห่งชาติ",
    "line": "Pink",
    "lat": 13.887508933581813,
    "lng": 100.57572412596693,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK14",
    "code": "PK14",
    "name_en": "Lak Si",
    "name_th": "หลักสี่",
    "line": "Pink",
    "lat": 13.884546828302467,
    "lng": 100.58123240473782,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK15",
    "code": "PK15",
    "name_en": "Rajabhat Phranakhon",
    "name_th": "ราชภัฏพระนคร",
    "line": "Pink",
    "lat": 13.879763238464728,
    "lng": 100.5894803720757,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK16",
    "code": "PK16",
    "name_en": "Wat Phra Sri Mahathat",
    "name_th": "วัดพระศรีมหาธาตุ",
    "line": "Pink",
    "lat": 13.87535,
    "lng": 100.59675,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK17",
    "code": "PK17",
    "name_en": "Ram Inthra 3",
    "name_th": "รามอินทรา 3",
    "line": "Pink",
    "lat": 13.870720091777162,
    "lng": 100.60294780894547,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK18",
    "code": "PK18",
    "name_en": "Lat Pla Khao",
    "name_th": "ลาดปลาเค้า",
    "line": "Pink",
    "lat": 13.862720428720557,
    "lng": 100.61805365962842,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK19",
    "code": "PK19",
    "name_en": "Ram Inthra Kor Mor 4",
    "name_th": "รามอินทรา กม.4",
    "line": "Pink",
    "lat": 13.858303965423996,
    "lng": 100.62612208306969,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK20",
    "code": "PK20",
    "name_en": "Maiyalap",
    "name_th": "มัยลาภ",
    "line": "Pink",
    "lat": 13.854928968099513,
    "lng": 100.63277394960335,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK21",
    "code": "PK21",
    "name_en": "Vacharaphol",
    "name_th": "วัชรพล",
    "line": "Pink",
    "lat": 13.850095585839703,
    "lng": 100.6414857898342,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK22",
    "code": "PK22",
    "name_en": "Ram Inthra Kor Mor 6",
    "name_th": "รามอินทรา กม.6",
    "line": "Pink",
    "lat": 13.845220273274421,
    "lng": 100.65032569153023,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK23",
    "code": "PK23",
    "name_en": "Khu Bon",
    "name_th": "คู้บอน",
    "line": "Pink",
    "lat": 13.840386815506655,
    "lng": 100.65908100896338,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK24",
    "code": "PK24",
    "name_en": "Ram Inthra Kor Mor 9",
    "name_th": "รามอินทรา กม.9",
    "line": "Pink",
    "lat": 13.833844601385357,
    "lng": 100.66749194287641,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK25",
    "code": "PK25",
    "name_en": "Outer Ring Road-Ram Inthra",
    "name_th": "วงแหวนรามอินทรา",
    "line": "Pink",
    "lat": 13.824676970700004,
    "lng": 100.67706262674314,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK26",
    "code": "PK26",
    "name_en": "Nopparat",
    "name_th": "นพรัตน์",
    "line": "Pink",
    "lat": 13.81663384954297,
    "lng": 100.6855596311237,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK27",
    "code": "PK27",
    "name_en": "Bang Chan",
    "name_th": "บางชัน",
    "line": "Pink",
    "lat": 13.812765554641347,
    "lng": 100.70341000432488,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK28",
    "code": "PK28",
    "name_en": "Setthabutbamphen",
    "name_th": "เศรษฐบุตรบำเพ็ญ",
    "line": "Pink",
    "lat": 13.812686958631446,
    "lng": 100.71308917928505,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK29",
    "code": "PK29",
    "name_en": "Min Buri Market",
    "name_th": "ตลาดมีนบุรี",
    "line": "Pink",
    "lat": 13.812520774344593,
    "lng": 100.72566379992917,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "PK30",
    "code": "PK30",
    "name_en": "Min Buri",
    "name_th": "มีนบุรี",
    "line": "Pink",
    "lat": 13.808464201168462,
    "lng": 100.73249623415103,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "MT01",
    "code": "MT01",
    "name_en": "Impact Muang Thong Thani",
    "name_th": "อิมแพ็ค เมืองทองธานี",
    "line": "Pink branch",
    "lat": 13.910901209235963,
    "lng": 100.54429549148986,
    "source_note": "BTS route map + Google Maps coordinate seed"
  },
  {
    "id": "MT02",
    "code": "MT02",
    "name_en": "Lake Muang Thong Thani",
    "name_th": "ทะเลสาบเมืองทองธานี",
    "line": "Pink branch",
    "lat": 13.917689401159542,
    "lng": 100.54539252714812,
    "source_note": "BTS route map + Google Maps coordinate seed"
  }
];

export const RAIL_EDGES = [
  {
    "from": "1",
    "to": "3",
    "line": "ARL"
  },
  {
    "from": "3",
    "to": "4",
    "line": "ARL"
  },
  {
    "from": "4",
    "to": "5",
    "line": "ARL"
  },
  {
    "from": "5",
    "to": "6",
    "line": "ARL"
  },
  {
    "from": "6",
    "to": "7",
    "line": "ARL"
  },
  {
    "from": "7",
    "to": "8",
    "line": "ARL"
  },
  {
    "from": "8",
    "to": "9",
    "line": "ARL"
  },
  {
    "from": "11",
    "to": "12",
    "line": "Blue"
  },
  {
    "from": "12",
    "to": "13",
    "line": "Blue"
  },
  {
    "from": "13",
    "to": "14",
    "line": "Blue"
  },
  {
    "from": "14",
    "to": "15",
    "line": "Blue"
  },
  {
    "from": "15",
    "to": "16",
    "line": "Blue"
  },
  {
    "from": "16",
    "to": "17",
    "line": "Blue"
  },
  {
    "from": "17",
    "to": "18",
    "line": "Blue"
  },
  {
    "from": "18",
    "to": "19",
    "line": "Blue"
  },
  {
    "from": "19",
    "to": "20",
    "line": "Blue"
  },
  {
    "from": "20",
    "to": "21",
    "line": "Blue"
  },
  {
    "from": "21",
    "to": "22",
    "line": "Blue"
  },
  {
    "from": "22",
    "to": "23",
    "line": "Blue"
  },
  {
    "from": "23",
    "to": "24",
    "line": "Blue"
  },
  {
    "from": "24",
    "to": "25",
    "line": "Blue"
  },
  {
    "from": "25",
    "to": "26",
    "line": "Blue"
  },
  {
    "from": "26",
    "to": "27",
    "line": "Blue"
  },
  {
    "from": "27",
    "to": "28",
    "line": "Blue"
  },
  {
    "from": "28",
    "to": "29",
    "line": "Blue"
  },
  {
    "from": "29",
    "to": "30",
    "line": "Blue"
  },
  {
    "from": "30",
    "to": "31",
    "line": "Blue"
  },
  {
    "from": "31",
    "to": "32",
    "line": "Blue"
  },
  {
    "from": "31",
    "to": "7",
    "line": "TRANSFER"
  },
  {
    "from": "32",
    "to": "33",
    "line": "Blue"
  },
  {
    "from": "33",
    "to": "34",
    "line": "Blue"
  },
  {
    "from": "34",
    "to": "35",
    "line": "Blue"
  },
  {
    "from": "35",
    "to": "36",
    "line": "Blue"
  },
  {
    "from": "36",
    "to": "37",
    "line": "Blue"
  },
  {
    "from": "36",
    "to": "329",
    "line": "TRANSFER"
  },
  {
    "from": "37",
    "to": "38",
    "line": "Blue"
  },
  {
    "from": "38",
    "to": "39",
    "line": "Blue"
  },
  {
    "from": "39",
    "to": "40",
    "line": "Blue"
  },
  {
    "from": "40",
    "to": "41",
    "line": "Blue"
  },
  {
    "from": "41",
    "to": "42",
    "line": "Blue"
  },
  {
    "from": "42",
    "to": "11",
    "line": "Blue"
  },
  {
    "from": "11",
    "to": "43",
    "line": "Blue"
  },
  {
    "from": "43",
    "to": "44",
    "line": "Blue"
  },
  {
    "from": "44",
    "to": "45",
    "line": "Blue"
  },
  {
    "from": "45",
    "to": "46",
    "line": "Blue"
  },
  {
    "from": "46",
    "to": "47",
    "line": "Blue"
  },
  {
    "from": "47",
    "to": "48",
    "line": "Blue"
  },
  {
    "from": "234",
    "to": "235",
    "line": "Purple"
  },
  {
    "from": "235",
    "to": "236",
    "line": "Purple"
  },
  {
    "from": "236",
    "to": "237",
    "line": "Purple"
  },
  {
    "from": "237",
    "to": "238",
    "line": "Purple"
  },
  {
    "from": "238",
    "to": "239",
    "line": "Purple"
  },
  {
    "from": "239",
    "to": "240",
    "line": "Purple"
  },
  {
    "from": "240",
    "to": "241",
    "line": "Purple"
  },
  {
    "from": "241",
    "to": "242",
    "line": "Purple"
  },
  {
    "from": "242",
    "to": "243",
    "line": "Purple"
  },
  {
    "from": "243",
    "to": "244",
    "line": "Purple"
  },
  {
    "from": "244",
    "to": "245",
    "line": "Purple"
  },
  {
    "from": "245",
    "to": "246",
    "line": "Purple"
  },
  {
    "from": "246",
    "to": "247",
    "line": "Purple"
  },
  {
    "from": "247",
    "to": "248",
    "line": "Purple"
  },
  {
    "from": "248",
    "to": "249",
    "line": "Purple"
  },
  {
    "from": "164",
    "to": "163",
    "line": "Light green"
  },
  {
    "from": "163",
    "to": "162",
    "line": "Light green"
  },
  {
    "from": "162",
    "to": "161",
    "line": "Light green"
  },
  {
    "from": "161",
    "to": "160",
    "line": "Light green"
  },
  {
    "from": "160",
    "to": "158",
    "line": "Light green"
  },
  {
    "from": "158",
    "to": "157",
    "line": "Light green"
  },
  {
    "from": "157",
    "to": "156",
    "line": "Light green"
  },
  {
    "from": "156",
    "to": "155",
    "line": "Light green"
  },
  {
    "from": "155",
    "to": "154",
    "line": "Light green"
  },
  {
    "from": "154",
    "to": "153",
    "line": "Light green"
  },
  {
    "from": "153",
    "to": "152",
    "line": "Light green"
  },
  {
    "from": "152",
    "to": "151",
    "line": "Light green"
  },
  {
    "from": "151",
    "to": "150",
    "line": "Light green"
  },
  {
    "from": "150",
    "to": "149",
    "line": "Light green"
  },
  {
    "from": "149",
    "to": "175",
    "line": "Light green"
  },
  {
    "from": "175",
    "to": "174",
    "line": "Light green"
  },
  {
    "from": "174",
    "to": "173",
    "line": "Light green"
  },
  {
    "from": "173",
    "to": "171",
    "line": "Light green"
  },
  {
    "from": "171",
    "to": "170",
    "line": "Light green"
  },
  {
    "from": "170",
    "to": "169",
    "line": "Light green"
  },
  {
    "from": "169",
    "to": "159",
    "line": "Light green"
  },
  {
    "from": "159",
    "to": "148",
    "line": "Light green"
  },
  {
    "from": "148",
    "to": "74",
    "line": "Light green"
  },
  {
    "from": "74",
    "to": "75",
    "line": "Light green"
  },
  {
    "from": "75",
    "to": "86",
    "line": "Light green"
  },
  {
    "from": "86",
    "to": "96",
    "line": "Light green"
  },
  {
    "from": "96",
    "to": "97",
    "line": "Light green"
  },
  {
    "from": "97",
    "to": "98",
    "line": "Light green"
  },
  {
    "from": "97",
    "to": "32",
    "line": "TRANSFER"
  },
  {
    "from": "98",
    "to": "99",
    "line": "Light green"
  },
  {
    "from": "99",
    "to": "100",
    "line": "Light green"
  },
  {
    "from": "100",
    "to": "101",
    "line": "Light green"
  },
  {
    "from": "101",
    "to": "102",
    "line": "Light green"
  },
  {
    "from": "102",
    "to": "76",
    "line": "Light green"
  },
  {
    "from": "76",
    "to": "77",
    "line": "Light green"
  },
  {
    "from": "77",
    "to": "78",
    "line": "Light green"
  },
  {
    "from": "78",
    "to": "79",
    "line": "Light green"
  },
  {
    "from": "79",
    "to": "80",
    "line": "Light green"
  },
  {
    "from": "80",
    "to": "81",
    "line": "Light green"
  },
  {
    "from": "81",
    "to": "82",
    "line": "Light green"
  },
  {
    "from": "82",
    "to": "83",
    "line": "Light green"
  },
  {
    "from": "83",
    "to": "84",
    "line": "Light green"
  },
  {
    "from": "84",
    "to": "85",
    "line": "Light green"
  },
  {
    "from": "85",
    "to": "87",
    "line": "Light green"
  },
  {
    "from": "87",
    "to": "88",
    "line": "Light green"
  },
  {
    "from": "88",
    "to": "89",
    "line": "Light green"
  },
  {
    "from": "89",
    "to": "90",
    "line": "Light green"
  },
  {
    "from": "337",
    "to": "73",
    "line": "Dark green"
  },
  {
    "from": "73",
    "to": "325",
    "line": "Dark green"
  },
  {
    "from": "325",
    "to": "329",
    "line": "Dark green"
  },
  {
    "from": "329",
    "to": "330",
    "line": "Dark green"
  },
  {
    "from": "330",
    "to": "331",
    "line": "Dark green"
  },
  {
    "from": "331",
    "to": "332",
    "line": "Dark green"
  },
  {
    "from": "332",
    "to": "333",
    "line": "Dark green"
  },
  {
    "from": "333",
    "to": "334",
    "line": "Dark green"
  },
  {
    "from": "334",
    "to": "335",
    "line": "Dark green"
  },
  {
    "from": "335",
    "to": "336",
    "line": "Dark green"
  },
  {
    "from": "336",
    "to": "326",
    "line": "Dark green"
  },
  {
    "from": "326",
    "to": "327",
    "line": "Dark green"
  },
  {
    "from": "327",
    "to": "328",
    "line": "Dark green"
  },
  {
    "from": "103",
    "to": "104",
    "line": "Gold"
  },
  {
    "from": "104",
    "to": "105",
    "line": "Gold"
  },
  {
    "from": "274",
    "to": "275",
    "line": "Red north"
  },
  {
    "from": "275",
    "to": "276",
    "line": "Red north"
  },
  {
    "from": "276",
    "to": "277",
    "line": "Red north"
  },
  {
    "from": "277",
    "to": "278",
    "line": "Red north"
  },
  {
    "from": "278",
    "to": "279",
    "line": "Red north"
  },
  {
    "from": "279",
    "to": "280",
    "line": "Red north"
  },
  {
    "from": "280",
    "to": "281",
    "line": "Red north"
  },
  {
    "from": "281",
    "to": "282",
    "line": "Red north"
  },
  {
    "from": "282",
    "to": "283",
    "line": "Red north"
  },
  {
    "from": "311",
    "to": "312",
    "line": "Red west"
  },
  {
    "from": "312",
    "to": "315",
    "line": "Red west"
  },
  {
    "from": "315",
    "to": "316",
    "line": "Red west"
  },
  {
    "from": "9",
    "to": "159",
    "line": "TRANSFER"
  },
  {
    "from": "20",
    "to": "249",
    "line": "TRANSFER"
  },
  {
    "from": "21",
    "to": "274",
    "line": "TRANSFER"
  },
  {
    "from": "21",
    "to": "311",
    "line": "TRANSFER"
  },
  {
    "from": "23",
    "to": "174",
    "line": "TRANSFER"
  },
  {
    "from": "24",
    "to": "175",
    "line": "TRANSFER"
  },
  {
    "from": "274",
    "to": "311",
    "line": "TRANSFER"
  },
  {
    "from": "44",
    "to": "328",
    "line": "TRANSFER"
  },
  {
    "from": "73",
    "to": "74",
    "line": "TRANSFER"
  },
  {
    "from": "103",
    "to": "334",
    "line": "TRANSFER"
  },
  {
    "from": "248",
    "to": "312",
    "line": "TRANSFER"
  },
  {
    "from": "YL01",
    "to": "YL02",
    "line": "Yellow"
  },
  {
    "from": "YL02",
    "to": "YL03",
    "line": "Yellow"
  },
  {
    "from": "YL03",
    "to": "YL04",
    "line": "Yellow"
  },
  {
    "from": "YL04",
    "to": "YL05",
    "line": "Yellow"
  },
  {
    "from": "YL05",
    "to": "YL06",
    "line": "Yellow"
  },
  {
    "from": "YL06",
    "to": "YL07",
    "line": "Yellow"
  },
  {
    "from": "YL07",
    "to": "YL08",
    "line": "Yellow"
  },
  {
    "from": "YL08",
    "to": "YL09",
    "line": "Yellow"
  },
  {
    "from": "YL09",
    "to": "YL10",
    "line": "Yellow"
  },
  {
    "from": "YL10",
    "to": "YL11",
    "line": "Yellow"
  },
  {
    "from": "YL11",
    "to": "YL12",
    "line": "Yellow"
  },
  {
    "from": "YL12",
    "to": "YL13",
    "line": "Yellow"
  },
  {
    "from": "YL13",
    "to": "YL14",
    "line": "Yellow"
  },
  {
    "from": "YL14",
    "to": "YL15",
    "line": "Yellow"
  },
  {
    "from": "YL15",
    "to": "YL16",
    "line": "Yellow"
  },
  {
    "from": "YL16",
    "to": "YL17",
    "line": "Yellow"
  },
  {
    "from": "YL17",
    "to": "YL18",
    "line": "Yellow"
  },
  {
    "from": "YL18",
    "to": "YL19",
    "line": "Yellow"
  },
  {
    "from": "YL19",
    "to": "YL20",
    "line": "Yellow"
  },
  {
    "from": "YL20",
    "to": "YL21",
    "line": "Yellow"
  },
  {
    "from": "YL21",
    "to": "YL22",
    "line": "Yellow"
  },
  {
    "from": "YL22",
    "to": "YL23",
    "line": "Yellow"
  },
  {
    "from": "PK01",
    "to": "PK02",
    "line": "Pink"
  },
  {
    "from": "PK02",
    "to": "PK03",
    "line": "Pink"
  },
  {
    "from": "PK03",
    "to": "PK04",
    "line": "Pink"
  },
  {
    "from": "PK04",
    "to": "PK05",
    "line": "Pink"
  },
  {
    "from": "PK05",
    "to": "PK06",
    "line": "Pink"
  },
  {
    "from": "PK06",
    "to": "PK07",
    "line": "Pink"
  },
  {
    "from": "PK07",
    "to": "PK08",
    "line": "Pink"
  },
  {
    "from": "PK08",
    "to": "PK09",
    "line": "Pink"
  },
  {
    "from": "PK09",
    "to": "PK10",
    "line": "Pink"
  },
  {
    "from": "PK10",
    "to": "PK11",
    "line": "Pink"
  },
  {
    "from": "PK11",
    "to": "PK12",
    "line": "Pink"
  },
  {
    "from": "PK12",
    "to": "PK13",
    "line": "Pink"
  },
  {
    "from": "PK13",
    "to": "PK14",
    "line": "Pink"
  },
  {
    "from": "PK14",
    "to": "PK15",
    "line": "Pink"
  },
  {
    "from": "PK15",
    "to": "PK16",
    "line": "Pink"
  },
  {
    "from": "PK16",
    "to": "PK17",
    "line": "Pink"
  },
  {
    "from": "PK17",
    "to": "PK18",
    "line": "Pink"
  },
  {
    "from": "PK18",
    "to": "PK19",
    "line": "Pink"
  },
  {
    "from": "PK19",
    "to": "PK20",
    "line": "Pink"
  },
  {
    "from": "PK20",
    "to": "PK21",
    "line": "Pink"
  },
  {
    "from": "PK21",
    "to": "PK22",
    "line": "Pink"
  },
  {
    "from": "PK22",
    "to": "PK23",
    "line": "Pink"
  },
  {
    "from": "PK23",
    "to": "PK24",
    "line": "Pink"
  },
  {
    "from": "PK24",
    "to": "PK25",
    "line": "Pink"
  },
  {
    "from": "PK25",
    "to": "PK26",
    "line": "Pink"
  },
  {
    "from": "PK26",
    "to": "PK27",
    "line": "Pink"
  },
  {
    "from": "PK27",
    "to": "PK28",
    "line": "Pink"
  },
  {
    "from": "PK28",
    "to": "PK29",
    "line": "Pink"
  },
  {
    "from": "PK29",
    "to": "PK30",
    "line": "Pink"
  },
  {
    "from": "PK10",
    "to": "MT01",
    "line": "Pink branch"
  },
  {
    "from": "MT01",
    "to": "MT02",
    "line": "Pink branch"
  },
  {
    "from": "BRT01",
    "to": "BRT02",
    "line": "BRT"
  },
  {
    "from": "BRT02",
    "to": "BRT03",
    "line": "BRT"
  },
  {
    "from": "BRT03",
    "to": "BRT04",
    "line": "BRT"
  },
  {
    "from": "BRT04",
    "to": "BRT05",
    "line": "BRT"
  },
  {
    "from": "BRT05",
    "to": "BRT06",
    "line": "BRT"
  },
  {
    "from": "BRT06",
    "to": "BRT07",
    "line": "BRT"
  },
  {
    "from": "BRT07",
    "to": "BRT08",
    "line": "BRT"
  },
  {
    "from": "BRT08",
    "to": "BRT09",
    "line": "BRT"
  },
  {
    "from": "BRT09",
    "to": "BRT10",
    "line": "BRT"
  },
  {
    "from": "BRT10",
    "to": "BRT11",
    "line": "BRT"
  },
  {
    "from": "BRT11",
    "to": "BRT12",
    "line": "BRT"
  },
  {
    "from": "YL01",
    "to": "25",
    "line": "TRANSFER"
  },
  {
    "from": "YL11",
    "to": "5",
    "line": "TRANSFER"
  },
  {
    "from": "YL23",
    "to": "81",
    "line": "TRANSFER"
  },
  {
    "from": "PK01",
    "to": "244",
    "line": "TRANSFER"
  },
  {
    "from": "PK14",
    "to": "279",
    "line": "TRANSFER"
  },
  {
    "from": "PK16",
    "to": "156",
    "line": "TRANSFER"
  }
];

export const BUS_CORRIDORS = [
  {
    "name": "Sukhumvit bus corridor",
    "name_th": "แนวรถเมล์สุขุมวิท",
    "stops": [
      {
        "name": "National Stadium / Siam",
        "lat": 13.7465,
        "lng": 100.5291
      },
      {
        "name": "Siam",
        "lat": 13.7456,
        "lng": 100.5341
      },
      {
        "name": "Chit Lom",
        "lat": 13.7441,
        "lng": 100.5431
      },
      {
        "name": "Phloen Chit",
        "lat": 13.7431,
        "lng": 100.549
      },
      {
        "name": "Nana",
        "lat": 13.7405,
        "lng": 100.5555
      },
      {
        "name": "Asok",
        "lat": 13.737,
        "lng": 100.5604
      },
      {
        "name": "Phrom Phong",
        "lat": 13.7305,
        "lng": 100.5697
      },
      {
        "name": "Thong Lo",
        "lat": 13.7244,
        "lng": 100.5784
      },
      {
        "name": "Ekkamai",
        "lat": 13.7196,
        "lng": 100.5851
      },
      {
        "name": "Phra Khanong",
        "lat": 13.7152,
        "lng": 100.5913
      },
      {
        "name": "On Nut",
        "lat": 13.7056,
        "lng": 100.601
      },
      {
        "name": "Bang Chak",
        "lat": 13.6967,
        "lng": 100.6052
      },
      {
        "name": "Punnawithi",
        "lat": 13.6892,
        "lng": 100.6091
      },
      {
        "name": "Udom Suk",
        "lat": 13.6799,
        "lng": 100.6096
      },
      {
        "name": "Bang Na",
        "lat": 13.6681,
        "lng": 100.6047
      },
      {
        "name": "Bearing",
        "lat": 13.6613,
        "lng": 100.6019
      }
    ]
  },
  {
    "name": "Phahon Yothin / Vibhavadi bus corridor",
    "name_th": "แนวรถเมล์พหลโยธิน/วิภาวดี",
    "stops": [
      {
        "name": "Victory Monument",
        "lat": 13.7628,
        "lng": 100.537
      },
      {
        "name": "Sanam Pao",
        "lat": 13.7727,
        "lng": 100.5422
      },
      {
        "name": "Ari",
        "lat": 13.7798,
        "lng": 100.5447
      },
      {
        "name": "Saphan Khwai",
        "lat": 13.7938,
        "lng": 100.5497
      },
      {
        "name": "Chatuchak Park",
        "lat": 13.8021,
        "lng": 100.553
      },
      {
        "name": "Mo Chit 2",
        "lat": 13.8099,
        "lng": 100.552
      },
      {
        "name": "Phahon Yothin",
        "lat": 13.8143,
        "lng": 100.5601
      },
      {
        "name": "Ratchayothin",
        "lat": 13.8298,
        "lng": 100.5696
      },
      {
        "name": "Kasetsart University",
        "lat": 13.8424,
        "lng": 100.5771
      },
      {
        "name": "Bang Bua",
        "lat": 13.856,
        "lng": 100.5851
      },
      {
        "name": "Wat Phra Sri Mahathat",
        "lat": 13.8753,
        "lng": 100.5967
      },
      {
        "name": "Saphan Mai",
        "lat": 13.8966,
        "lng": 100.6091
      }
    ]
  },
  {
    "name": "Ratchadaphisek / Rama IX bus corridor",
    "name_th": "แนวรถเมล์รัชดาภิเษก/พระราม 9",
    "stops": [
      {
        "name": "Lat Phrao",
        "lat": 13.8062,
        "lng": 100.574
      },
      {
        "name": "Ratchadaphisek",
        "lat": 13.7992,
        "lng": 100.5746
      },
      {
        "name": "Sutthisan",
        "lat": 13.7897,
        "lng": 100.5742
      },
      {
        "name": "Huai Khwang",
        "lat": 13.7785,
        "lng": 100.5736
      },
      {
        "name": "Thailand Cultural Centre",
        "lat": 13.7663,
        "lng": 100.5702
      },
      {
        "name": "Phra Ram 9",
        "lat": 13.7579,
        "lng": 100.5655
      },
      {
        "name": "Phetchaburi",
        "lat": 13.7487,
        "lng": 100.5632
      },
      {
        "name": "Asok / Sukhumvit",
        "lat": 13.7386,
        "lng": 100.5615
      },
      {
        "name": "Queen Sirikit National Convention Centre",
        "lat": 13.7232,
        "lng": 100.5601
      }
    ]
  },
  {
    "name": "Silom / Rama IV bus corridor",
    "name_th": "แนวรถเมล์สีลม/พระราม 4",
    "stops": [
      {
        "name": "Hua Lamphong",
        "lat": 13.7378,
        "lng": 100.5172
      },
      {
        "name": "Sam Yan",
        "lat": 13.7323,
        "lng": 100.53
      },
      {
        "name": "Si Lom / Sala Daeng",
        "lat": 13.7293,
        "lng": 100.5365
      },
      {
        "name": "Lumphini",
        "lat": 13.7258,
        "lng": 100.5457
      },
      {
        "name": "Khlong Toei",
        "lat": 13.7223,
        "lng": 100.5539
      },
      {
        "name": "Phra Khanong",
        "lat": 13.7152,
        "lng": 100.5913
      }
    ]
  },
  {
    "name": "Phetkasem bus corridor",
    "name_th": "แนวรถเมล์เพชรเกษม",
    "stops": [
      {
        "name": "Tha Phra",
        "lat": 13.7297,
        "lng": 100.4742
      },
      {
        "name": "Bang Phai",
        "lat": 13.7246,
        "lng": 100.4652
      },
      {
        "name": "Bang Wa",
        "lat": 13.7204,
        "lng": 100.4572
      },
      {
        "name": "Phetkasem 48",
        "lat": 13.7155,
        "lng": 100.4456
      },
      {
        "name": "Phasi Charoen",
        "lat": 13.7129,
        "lng": 100.4342
      },
      {
        "name": "Bang Khae",
        "lat": 13.7119,
        "lng": 100.4224
      },
      {
        "name": "Lak Song",
        "lat": 13.711,
        "lng": 100.41
      }
    ]
  },
  {
    "name": "Ramkhamhaeng / Lat Phrao bus corridor",
    "name_th": "แนวรถเมล์รามคำแหง/ลาดพร้าว",
    "stops": [
      {
        "name": "Lat Phrao",
        "lat": 13.8062,
        "lng": 100.574
      },
      {
        "name": "Central Ladprao",
        "lat": 13.8167,
        "lng": 100.5616
      },
      {
        "name": "Ratchadaphisek",
        "lat": 13.7992,
        "lng": 100.5746
      },
      {
        "name": "Ramkhamhaeng",
        "lat": 13.743,
        "lng": 100.6001
      },
      {
        "name": "Hua Mak",
        "lat": 13.738,
        "lng": 100.6452
      },
      {
        "name": "The Mall Bangkapi",
        "lat": 13.765,
        "lng": 100.642
      }
    ]
  },
  {
    "name": "BRT Bus Rapid Transit",
    "name_th": "เส้นรถโดยสารด่วนพิเศษ BRT",
    "stops": [
      {
        "name_en": "Sathorn",
        "name_th": "สาทร",
        "lat": 13.72372,
        "lng": 100.52946,
      },
      {
        "name_en": "Arkan Songkhro",
        "name_th": "อาคารสงเคราะห์",
        "lat": 13.7154,
        "lng": 100.5356,
      },
      {
        "name_en": "Technic Krungthep",
        "name_th": "เทคนิคกรุงเทพ",
        "lat": 13.7077,
        "lng": 100.5376,
      },
      {
        "name_en": "Thanon Chan",
        "name_th": "ถนนจันทน์",
        "lat": 13.7004,
        "lng": 100.5394,
      },
      {
        "name_en": "Nararam 3",
        "name_th": "นราราม 3",
        "lat": 13.695,
        "lng": 100.5376,
      },
      {
        "name_en": "Wat Dan",
        "name_th": "วัดด่าน",
        "lat": 13.6915,
        "lng": 100.5292,
      },
      {
        "name_en": "Wat Pariwat",
        "name_th": "วัดปริวาส",
        "lat": 13.6866,
        "lng": 100.5234,
      },
      {
        "name_en": "Wat Dokmai",
        "name_th": "วัดดอกไม้",
        "lat": 13.6841,
        "lng": 100.5154,
      },
      {
        "name_en": "Rama IX Bridge",
        "name_th": "สะพานพระราม 9",
        "lat": 13.6822,
        "lng": 100.5064,
      },
      {
        "name_en": "Charoenrat",
        "name_th": "เจริญราษฎร์",
        "lat": 13.6855,
        "lng": 100.4965,
      },
      {
        "name_en": "Rama III Bridge",
        "name_th": "สะพานพระราม 3",
        "lat": 13.6932,
        "lng": 100.4885,
      },
      {
        "name_en": "Ratchapruek",
        "name_th": "ราชพฤกษ์",
        "lat": 13.72039,
        "lng": 100.45717,
      }
    ]
  }
];

export const BOAT_ROUTES = [
  {
    "name": "Chao Phraya Express Boat",
    "name_th": "เรือด่วนเจ้าพระยา",
    "piers": [
      {
        "name": "Nonthaburi Pier",
        "lat": 13.842,
        "lng": 100.488
      },
      {
        "name": "Rama 7 Bridge",
        "lat": 13.812,
        "lng": 100.509
      },
      {
        "name": "Bang Po",
        "lat": 13.8064,
        "lng": 100.521
      },
      {
        "name": "Kiak Kai",
        "lat": 13.7898,
        "lng": 100.507
      },
      {
        "name": "Thewet",
        "lat": 13.7752,
        "lng": 100.503
      },
      {
        "name": "Phra Arthit",
        "lat": 13.764,
        "lng": 100.498
      },
      {
        "name": "Tha Chang",
        "lat": 13.7515,
        "lng": 100.491
      },
      {
        "name": "Tha Tien",
        "lat": 13.7452,
        "lng": 100.4891
      },
      {
        "name": "Rajinee",
        "lat": 13.741,
        "lng": 100.494
      },
      {
        "name": "Ratchawong",
        "lat": 13.7393,
        "lng": 100.504
      },
      {
        "name": "Si Phraya",
        "lat": 13.7305,
        "lng": 100.513
      },
      {
        "name": "Sathorn",
        "lat": 13.7188,
        "lng": 100.514
      },
      {
        "name": "Wat Worachanyawas",
        "lat": 13.704,
        "lng": 100.506
      },
      {
        "name": "Rama III",
        "lat": 13.682,
        "lng": 100.498
      }
    ]
  },
  {
    "name": "Khlong Saen Saep Boat",
    "name_th": "เรือคลองแสนแสบ",
    "piers": [
      {
        "name": "Phanfa Leelard",
        "lat": 13.756,
        "lng": 100.501
      },
      {
        "name": "Bo Bae",
        "lat": 13.754,
        "lng": 100.513
      },
      {
        "name": "Saphan Hua Chang",
        "lat": 13.7508,
        "lng": 100.531
      },
      {
        "name": "Pratunam",
        "lat": 13.7501,
        "lng": 100.5401
      },
      {
        "name": "Chit Lom",
        "lat": 13.7479,
        "lng": 100.5458
      },
      {
        "name": "Wireless",
        "lat": 13.747,
        "lng": 100.552
      },
      {
        "name": "Nana Nuea",
        "lat": 13.7453,
        "lng": 100.5593
      },
      {
        "name": "Asok",
        "lat": 13.746,
        "lng": 100.5638
      },
      {
        "name": "Prasan Mit",
        "lat": 13.7451,
        "lng": 100.5697
      },
      {
        "name": "Ital-Thai",
        "lat": 13.7477,
        "lng": 100.582
      },
      {
        "name": "Ramkhamhaeng",
        "lat": 13.743,
        "lng": 100.6001
      },
      {
        "name": "The Mall Ramkhamhaeng",
        "lat": 13.754,
        "lng": 100.613
      },
      {
        "name": "The Mall Bangkapi",
        "lat": 13.765,
        "lng": 100.642
      }
    ]
  },
  {
    "name": "Khlong Phasi Charoen Boat",
    "name_th": "เรือคลองภาษีเจริญ",
    "piers": [
      {
        "name": "Bang Wa",
        "lat": 13.7208,
        "lng": 100.4577
      },
      {
        "name": "Phetkasem 48",
        "lat": 13.7155,
        "lng": 100.4456
      },
      {
        "name": "Phasi Charoen",
        "lat": 13.7129,
        "lng": 100.4342
      },
      {
        "name": "Bang Khae",
        "lat": 13.7119,
        "lng": 100.4224
      },
      {
        "name": "Lak Song",
        "lat": 13.711,
        "lng": 100.41
      },
      {
        "name": "Khlong Bang Waek",
        "lat": 13.7,
        "lng": 100.405
      },
      {
        "name": "Phetkasem 69",
        "lat": 13.684,
        "lng": 100.389
      }
    ]
  }
];
