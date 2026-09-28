import React, { useState, useRef, useEffect } from "react";
import { Trophy, Swords, Users, Star, ChevronRight, RotateCcw, Shield } from "lucide-react";

const LOGO_DATA_URI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAPHklEQVR42s2ae5RU1ZXGf+eee6uqq7urH9VAv+gACspDGkGJRAUEwkMFEQeIGieZTMw4iS6dTJ4zMdBxRTOJSciY1zIPY0ZNaGM0KMYERAF1jIiCgA9eTWheSjd0V1fX4957zp4/qhtBUZuemOSuVX/cqlvn7u/svc8++/sO/AUvEdQTS6a4x+73Txsv7ReN7r1/YskUVwTF3+GlpHmhfhPI7Po/3Xfuss9cdWb2xn8cmdr8wAdvFbl84LHfj3v2b36daPhl5a8+POnmr3561JFxo4YIulrwqmVi41D5+k1jDrY8NunfRT4V7wXd/LcE0vNyp2D4EvfQmvP/5fbPn9Vy4TnDREVqhGh1MKCyViorai2R6sCN1cj0SafJ978y9pXOZy+4RkR6Q8kRKYzz15nxJTgLF6IBPBeCjZMX/KSp8YWLp5wu0Xit4FUH8Ypae+mAOrmnrl7uqq2XDw+ok2h5rcWtDopLa2X+jOHyy9vGPSPbJs9RPTAWLlyolyx5H4GInOhy2T11SvN3xq9efPEIKSuvE9xBoVdWa6ZW1cmPa+vl6YZ6ebymXtbU1stTDfXyvZp6+VBVnThltQY9KEwm6+Way0bI7+4Yv0IOTpvYO+6SU0x01RfDly6dopua1oYA0jXjrD/ed/Q/m1elFz+6PsPBw76lRHNuRDmLPcVED2wIGSu4FRoEwg5DsaMQDU8HQnMIm/PW0m1pqIk4l1wYt4tnldw95eMVtym1ekfvijV16VqjFNJfAEqaFzpq0f2mAGTm4GfvPfqF5j+mr314XXd05968EHfsqKijF3kwxVNoA2kr6DKNV6kRX0AplAdBm8F2GUq0Iu/A44HwmwB25KwhJ3rk0CjzpsbTV84u/UHjFXXfUerBN3oXiV4b+gzg+D+JXFb+2opDN9z3h/RNK57srtz0Wg6iygwtcvQVLsyMKOIWuozglGq8pAYDYVuIzdpClhY7uFWF8uC3G0gbSrWi04FHfeGhAPZljSFATxxdxPypxQevvDhx+5CZY36s1J2ZnhXLWXQSIOqtCaqaEEBEPuW9vm7bJ+5bmfrig2u6h65/KQtKwupirS/zUJdGFJU9hlPiEKlywULYHmK7LUorjqWkAbGCLtHoZCGN/LYQ1W0pcRVvAA/5wspQpC1tjXaUO3V8nMunFb96zZzErYkPrb9HKSWAs2QJNDVhTwZAAeK5kPnT5AW/eCT1lQfXpM9evSGDH9iwvMTRczylFkQUtUB3KJhih2jPzIbtITZtUY4CDW+LXHUckNICELHgHw5xs5ZiV7FH4DeB8EdfJJ22Jh5z3FnnFXP59OL/vWZe4hZnzLrfi5zEA0uW4CxdirSunnTOc1vztzWvSk9/7JluUunQFJVoNcNTzsKI4jQF2VAI4oUZVw6YdoPpMu9sOO8CpEzjVrrYUPAPh0RylpireFVguS886Yv100Yqyz095/w4i2eWPnLuyNiXqqc9/fLSpaimJmyPk6c4SiGvtfg3NP2kY3rzox1+TsROrXD1d+OO88Woot4IKU+hBkeIDnKxHQZ/j18IF68nXN5ivKjC58QvC+VPeQqTMuT35LFdhliNh9RHSGnFMCPcHFXcXuw4kypcnQqMvXdFR/CNuzsv3XUg/09KIVOZ4gC4x4/dlTWZjnRoYqXa+UKR48z2IG+gSyu8apeY5xAeCTGdBlTBiELGvH2iHQVuIKAgcBVvdT1CIU8UmE6D6TS45S6xOg+Tt+QOh4y1MCGu+K2rnWVG7JHOwGSz5I4f5gQA2lGO4yiNJRzlQtYIQblLrFITtoXkO4NCFLyL4b3GZ31hd5WLssLpRwxe5CQg3gIk7AgJOwxuhSbWECF7OIQuyygNxoLWSjv6RJ+67xSqeUAJeKUOwYGgECqRdze8N2xUXtg5NML4zw3Azwsvf/MNznojJPAU6p3+K6Dcgm1hW4gEglfmQMqQV+9crpz3KhASFm6Uq947QQGlwBjBlmmqq1wGDXQJSzVi+lD3eyZHeQWPiHnvauv2ebMhfdl4gLXgxjW12/I8dscRVAgNLQFS5CC2j5sc6etGpy8A+jJpSuEohesoXBHEDxiUzxP9fZrA90mWRdGxKBHPI1SK0ApWBPUXaM/c/hqtHOeYwfgB2Vyew0FAm+uRHjiQYNww9kdjNJ51Jrs3bMLZsYNEWztJE1Ae8YjHotADKLCCsvavA0AAVymkO8MbuTxHvAipAQNgwnAS48YyeMI4xkwcTyqVorVlL3PnzONopo0DBw6x86VttG54kV2btqB27KSsrY1kGJCMx5BYDNMPj7j9Mb4zCNnWOI7qqRcybMJYhow8g4aGWuK6rOcpn5UbXmTQwCQ2104kl2X0kHpGnz4GFiymyz9Ka+sBWra9SuvGzWx//Ekad+2gyPOwIu8jAKWIiGWH9pj1w28z8YzRSNCFEqHtjTa+fecysvk8N91wLelMlrPravDDkEg8zq7df+bOn95GsrKc6z55NSPraxj5gTrUvAWsnr2OLXMXcU4EMsIpeeGUACgRRGvKOrtpf3U7duhgOjtTFJeWcN2NN/PA/fcDmifWPst1115NsqoCExpy3RkWffR6XtjwHGDY2dLKj75/K53tRylPKjq37yTh+9iSosJG6RSuU+pBFRAqRTLw2fOnjahIhFg0QseRo6x76jlKK6oZVNfAs888g1KKaFERkYjHrl172LT5ZQbUDKaodCBrnnyGXCZDNBrBak3rs89ThSWAU86BU26iQyuURz06X9xMKpfDGkOyKsmcWVPoOnqQ1w8cou4DQzl3wlhM3ief9xkxYhgfOm8Chw+2ku1qY+4l04mXFOMAR1JdZF/aSmksijnF+O/XKmRFiMdiqB072b//EGfUDMT3fe74dhMTJzSidaFhSVZWEBqDCESjUZbfcwf3/uohkskKPrJwHtnuDLGiGFtf2Ym358940Qi+te/vKtSbB3guibZ2Wra+wqhhDYRHO/E8l89c/0nCXIb7mldQXlZKEIaIWIK8T1Wygs9/4dOAItvVRRgYnESMlk1bqEilsFXlqNCcsgdOOYR686DKBLRueBFRGqUgNIYwl2HX7r2UxONEiqIopSitSBKLRbFWwBhSR45ireCoQroefO4FqpQQCP2qyv0ikkIrlEU8OjZuoiufRSuFqzWO1vz0rl/T0FCHWCGX91na9E3ObJzOyHEz+NZ37iRRlii4XmvaO1N0b97S7/jvNwArQqwnD/btO4TreURiMa6/6as88NBjjBo5nGwmi7WW4acN4ZKLp1NXW81/fOU2brn1vykqjuN6Hntb9hLpiX9537YSJ9kZvpkHbezZ+gqjhn2AjvZ2Zk6/kNGjRhAvLSXIZEgUF3H1VZdz9Uf/AQl89rbu57XtLXR1pihLJmnZtJXKk8W/esu7++OB3vlQbmEgOS5Ij9UDE7B3w4sYKTQ/8y+bTVV5GQ8/9Hv27DtIBocAhYQhNgwZXFPNzGnno0QIrOXAcxupPD7+e8aXoGC56iEJbH88UNSzdQhShmith2kvtHsFUIpQhIqIx84XNmMdTVmygtBxuGjuTNY8vp5vfX0ZpmUPEyY0Un3ueIY2jqK+oY7yWDGJqiSpIKRr8xYS0SiBCEqBhIJSCneAi67Q5A6HuI6iqK8AjBVrjRgc2BLCHA90pyWb8fEGuETKNeZooQEXZYnHiyja9jL3Nz9IsbW0rH+GzEtbKTv0OtO70yR8n9ymjbT97BfsKi8nHDaU4sYxDJt8Ae3d3ZS3tKCLoviBBQS3wsUpdzA5Ifdnn7gB7cIWH7SjMEaMNSc2pScAKC3S8coyV7e25v3/Uti1Ucf5iKdoNODvC8jHHLwqTaRCY44YsinLmDDPzn+9ke4wZIhYEtEIOhLBuprQi5MoKaYScMIAf9sWUhuf58Dd9yCuyxmeRy5UuGUObqWLyVvy+wNieSHmKp4X+HVGeN63xnRbqSr33OJiFT0JgLVWBHXgcW/ZkmvLBjavcmc99nQ364+EZkOJVtMiylkUUQwPhey+gHxRgdjSPUBGpTVoRagLzYlvbaHbEsEAISDKQcV7AIUCIgSlikiFxgZC7kBAJGdJuIptWrE8L6z1xYZpI1UVnr54fkIvmlny0JA65+eFtmGtoekk1KJ2IHxx8ry7VnTe/OCazDmrnusm59swUeLo2Z5SV0QUg4F0KJgehg4HTJvBpk2fqEUnodGVBRLYb3uTWtwtcH8grPZFutPGlsS1nnVeMQtmFK+/an7iFjVi3aq+kLs9S32zbn/qex//n5WpL/9uTea0tZsyiJJwYLGj53pKzfMUVQJpI0iJQyTpHqNEbPdxHClv50SxkG8L0ZkCuXsQeNAXVgYiR7utcbVyp00o5vJp8W0fvTjx9QGTn/5Vzhfei9w9Qf9adIxe/0Tp9kdevv7Xf+j6txVPZgZsfDULnjINcUcvcGF2RFHSw1KrUk2kx8CwLcRmeuj1Ege3B6DfFkK3pVQrOhx4xBd+F8CBjDEY9KQxceZfFN931ZzSb9XPGHGnUnfn+kyvv7tOMKN2w/LOzy3/Q/q6h9dmirbvyQtFyp4Zc/RCDy7yFK4teEQnCjqBBIVlEQ1+m0HSBYEj58AqX/hNCLuz1pAXPea0GHOnxlNXzkrccdaCqmVKPdLWb4HjrRLTk0un6It6JSaZMfLxnx79z+Wr0lc/uj7D/td9S4nD+IjjLPYUk46XmMo1IgXus0QrjANPBcLyALbmrSFj1ZC6qHPJ5Hi46MMld03+2KBvKLVy9zGJqWmt6Rud1h+Rb8/U8x9YdvZjV106Qioq6gQ9KHTLas2FVXXygx5hb01tvTxRWy/rG+rluzX18sGqOlGJgsg3oKpePnb5GfLIDyf8Vo5OG99fke//JbNqB2Tz5Hk/v6Vxw9yLhktRcUFmLaqotXMG1Mkv6+rlZ7X1Mq2qTiIFmTUsSdTKFTOHy73fHLdOtk/+8LG8e79l1rd7ZInzptDdrNvWnv/P3/3SWTunfPA0caIFoTtZWWvLe4Rur6hGZl5wuvzoq2O3dj17wZWxyLFJ/usK3e+g2NO7Yu1Yed6Xv3b96MMTxgwV3MJRg0lnD5PbPjtmf+vqSTeKfCz2d3HU4N3PTMyqeX75xNtvuObM7s9+fGTHlt9O/JrI/OTf5WGPdz1uc2jaWElNOfP9PG7zf7JwcfsE6G4tAAAAAElFTkSuQmCC" /> 
  
const ROLES = ["Jungler", "Mid Laner", "Gold Laner", "Exp Laner", "Roamer"];

const ROLE_STYLE = {
  Jungler: { accent: "#8B5CF6", soft: "rgba(139,92,246,0.14)", label: "JUNG" },
  "Mid Laner": { accent: "#22D3EE", soft: "rgba(34,211,238,0.14)", label: "MID" },
  "Gold Laner": { accent: "#FBBF24", soft: "rgba(251,191,36,0.14)", label: "GOLD" },
  "Exp Laner": { accent: "#FB7185", soft: "rgba(251,113,133,0.14)", label: "EXP" },
  Roamer: { accent: "#34D399", soft: "rgba(52,211,153,0.14)", label: "ROAM" },
};

const ALL_TIME_LEGENDS = {
  Jungler: [
    ["Alberttt", 93], ["Demonkite", 84], ["Kairi", 93], ["Nnael", 90], ["Sutsujin", 84], ["Reyy", 79], ["Rinee", 80], ["AyamJAGO", 80], ["Aether", 77], ["1rad", 80], ["Sugar", 77], ["Marlo", 79],
    ["Oura", 84], ["Celiboy", 89], ["Kayn", 79], ["Kevin", 80], ["Tazz", 80], ["Super Kenn", 75], ["Kenn", 80], ["JessNoLimit", 86], ["High", 80], ["Woshipaul", 78], ["DoyokSyl", 75], ["Maykids", 80],
    ["Nazara", 78], ["Affan", 80], ["Andoryuuu", 81], ["Rave", 80], ["Vincent", 79], ["Faviann", 83], ["Variety", 79], ["Yazuke", 81], ["Fearless", 74],["Gebe", 75], ["Joshua", 79], ["Ferxiic", 84], ["Van", 76]
  ],
  "Mid Laner": [
    ["SANZ", 92], ["DrianW", 72], ["Luminaire", 93], ["RINZ", 84], ["Yehezkiel", 86], ["Clayyy", 81], ["Swaylow", 79], ["Roundel", 78], ["Wannn", 90], ["Kido", 77],
    ["Jiizee", 81], ["Hajirin", 77], ["Dalvin", 83], ["Moreno", 87], ["Swaylow", 79], ["Facehugger", 83], ["Renbo", 80], ["Hijume", 84], ["Crish", 73], ["Emperor", 80], ["Cr1te", 77],
    ["Octa", 80], ["Drichel", 80], ["Billy", 78], ["ABOY", 81], ["Udil", 88], ["Lemon", 95],["Ryzaa", 71], ["Rexxy", 76], ["Tezet", 74], ["Drian", 81], ["UK1R", 78], ["Treacky", 76]
  ],
  "Gold Laner": [
    ["CW", 90], ["REKT", 95], ["EMANN", 90], ["Erlan", 83], ["Branz", 85], ["Cadera", 83], ["Tuturu", 88], ["Clover", 79], ["BunnyQT", 73], ["Dee", 75], ["Savero", 87], ["Maungzy", 79], ["SuperToyy", 73], ["Kyou", 76],
    ["Kelra", 89], ["Dingarai", 82], ["Watt", 83], ["Arthur", 77], ["Skylar", 91], ["Mattt", 76], ["Spade", 79], ["Nino", 81], ["Kabuki", 83], ["Marky", 80], ["Xyve", 80], ["Ahmad", 81], ["Aeronshiki", 84],
    ["Keven", 83], ["Maybeee", 81], ["Zeonn", 79], ["KennzyySkie", 80], ["Xinnn", 89], ["Sasa", 85], ["Arfy", 84], ["Haizz", 77], ["Kuroky", 74], ["Taka", 78], ["Wizzking", 82], ["Revicii", 79]
  ],
  "Exp Laner": [
    ["Antimage", 92], ["REKT", 80], ["Butss", 91], ["Lutpiii", 90], ["Rimitchi", 79],["Veldora", 78], ["Rezz", 75], ["Luke", 82], ["G", 79], ["R7", 95], ["Super Dann", 70],
    ["Nino", 84], ["Shogun", 86], ["Rendyy", 78], ["Aran", 83], ["Banana", 79], ["Pendragon", 75], ["Saykots", 83], ["PAI", 82], ["Watt", 80], ["Edward", 81],
    ["Joshua", 77], ["QINN", 81], ["MarceL", 75], ["Karss", 80], ["Oura", 98], ["Fluffy",83], ["Dyrenn", 82], ["Rippo", 80], ["Rinazmi", 78], ["Xorizo", 78]
  ],
  Roamer: [
    ["Donkey", 89], ["Kiboy", 91], ["LJ", 86], ["Psychoo", 87], ["Leomurphy", 83], ["Yawi", 82], ["Dreams", 83],["Fredo", 79], ["Marsha", 79], ["IOS", 79], ["Instinct", 82], ["Bajan", 80], ["Egatzy", 79],
    ["Finn", 85], ["Muezza", 80], ["Said", 78], ["Alexander", 84], ["Godiva", 82], ["Xwin", 74],["Rave", 82], ["Baloyskie", 84], ["widy", 81], ["Alek", 85], ["Drian", 90], ["Rasy", 80], ["Caesius", 74],
    ["Lyoni", 70], ["APHRO", 83], ["AudyTzy", 77], ["Itoshi Kesu", 81], ["REKT", 89], ["Naomi", 83], ["Brusko", 82], ["Liam", 84],["Owenn", 73], ["Shanee", 79], ["Darknesss", 74]
  ],
};

const TEAM_NAMES = [
  "Geek Fam", "Evos Esport", "Dewa United", "RRQ Hoshi", "Liquid ID", "Bigetron Vitality", "Onic Esport", "Alter Ego", "NAVI"
];

const FORMATIONS = {
  "1-3-1": {
    label: "Seimbang",
    accent: "#8B5CF6",
    desc: "Exp Laner main sendiri di atas, Jungler, Roamer, Mid Laner  di tengah Roam dan Milane bisa rotasi fleks, Gold Laner farming aman di bawah.",
    lines: { "Exp Laner": "Depan", Jungler: "Tengah", Roamer: "Tengah", "Mid Laner": "Tengah", "Gold Laner": "Belakang" },
  },
  "2-1-2": {
    label: "Serang Total",
    accent: "#FB7185",
    desc: "Exp & Mid/support press atas dan rotasi cepat nyari objektif, Jungler sendirian farming di tengah, Roamer & Gold Laner pressing goldlane di bawah.",
    lines: { "Exp Laner": "Depan", "Mid Laner": "Depan", Jungler: "Tengah", Roamer: "Belakang", "Gold Laner": "Belakang" },
  },
  "3-1-1": {
    label: "Bertahan / Farming",
    accent: "#22D3EE",
    desc: "Exp, Roamer, & Mid Laner pressing explane di atas dan bisa rotasi cepet, Jungler sendirian pegang tengah, Gold Laner farming sendiri di bawah.",
    lines: { "Exp Laner": "Depan", Roamer: "Depan", "Mid Laner": "Depan", Jungler: "Tengah", "Gold Laner": "Belakang" },
  },
  "1-1-3": {
    label: "Hyper Aggressive",
    accent: "#FBBF24",
    desc: "Exp Laner sendiri di atas, Jungler sendiri farming di tengah, Roamer + Mid Laner + Gold Laner menangin goldlane di bawah.",
    lines: { "Exp Laner": "Depan", Jungler: "Tengah", Roamer: "Belakang", "Mid Laner": "Belakang", "Gold Laner": "Belakang" },
  },
  "2-2-1": {
    label: "Kontrol Map",
    accent: "#34D399",
    desc: "Exp & Roamer di atas dan bisa fleks clear cepat lalu rotasi dan open map, Mid Laner & Jungler di tengah, Gold Laner sendiri bermain aman dan farming di bawah.",
    lines: { "Exp Laner": "Depan", Roamer: "Depan", "Mid Laner": "Tengah", Jungler: "Tengah", "Gold Laner": "Belakang" },
  },
  "0-5-0": {
    label: "Straight Push",
    accent: "#F87171",
    desc: "Semua 5 role maksa push mid bareng-bareng di awal game, kalo itu gagal masih bisa di fleksibel nyebar lagi.",
    lines: { Roamer: "Tengah", Jungler: "Tengah", "Exp Laner": "Tengah", "Mid Laner": "Tengah", "Gold Laner": "Tengah" },
  },
};
const FORMATION_KEYS = Object.keys(FORMATIONS);

function getAiGameFormation(baseFormation) {
  if (Math.random() < 0.4) return baseFormation;
  return FORMATION_KEYS[randInt(0, FORMATION_KEYS.length - 1)];
}

const FORMATION_CYCLE = ["1-3-1", "2-1-2", "0-5-0", "2-2-1", "3-1-1", "1-1-3"];
const COUNTER_BONUS = 6;

function getMetaCounterModifier(myFormation, oppFormation) {
  const idx = FORMATION_CYCLE.indexOf(myFormation);
  const oppIdx = FORMATION_CYCLE.indexOf(oppFormation);
  if (idx === -1 || oppIdx === -1 || idx === oppIdx) return 0;
  const n = FORMATION_CYCLE.length;
  if ((idx + 1) % n === oppIdx) return COUNTER_BONUS; // aku counter dia
  if ((idx - 1 + n) % n === oppIdx) return -COUNTER_BONUS; // dia counter aku
  return 0;
}

function getCounterInfo(formation) {
  const idx = FORMATION_CYCLE.indexOf(formation);
  if (idx === -1) return null;
  const n = FORMATION_CYCLE.length;
  return {
    beats: FORMATION_CYCLE[(idx + 1) % n],
    losesTo: FORMATION_CYCLE[(idx - 1 + n) % n],
  };
}

const CAREER_STARTING_BUDGET = 300000000;
const CAREER_INJURY_CHANCE = 0.05;
const CAREER_INJURY_MIN_MATCHES = 1;
const CAREER_INJURY_MAX_MATCHES = 3;
const CAREER_SELL_FACTOR = 0.6;

function getPlayerPrice(rating) {
  return Math.round((rating * rating * 6000) / 100000) * 100000;
}
function getPlayerSalary(rating) {
  return Math.round((getPlayerPrice(rating) * 0.08) / 100000) * 100000;
}
function formatRupiah(n) {
  return "Rp " + Math.round(n).toLocaleString("id-ID");
}
function generateCareerMarket() {
  const freshPool = generatePool();
  const picks = [];
  ROLES.forEach((role) => {
    drawCandidates(freshPool, role, 2).forEach((p) => {
      picks.push({ ...p, id: `market-${p.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, price: getPlayerPrice(p.rating) });
    });
  });
  return picks;
}

function effectivePower(team, opponent) {
  return teamPower(team.squad, team.formation) + getMetaCounterModifier(team.formation, opponent.formation);
}
const LINE_WEIGHT = { Belakang: 0.9, Tengah: 1.0, Depan: 1.2 };

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePool() {
  const pool = {};
  ROLES.forEach((role) => {
    pool[role] = ALL_TIME_LEGENDS[role]
      .map(([name, rating], i) => ({ id: `${role}-${i}-${name}`, name, role, rating }))
      .sort((a, b) => b.rating - a.rating);
  });
  return pool;
}

function drawCandidates(pool, role, count = 3) {
  const available = pool[role];
  const picks = [];
  const copy = [...available];
  while (picks.length < count && copy.length) {
    const idx = randInt(0, copy.length - 1);
    picks.push(copy[idx]);
    copy.splice(idx, 1);
  }
  return picks;
}

function removeFromPool(pool, role, id) {
  return { ...pool, [role]: pool[role].filter((p) => p.id !== id) };
}

function generateAiTeam(pool, name) {
  const squad = [];
  let workingPool = pool;
  ROLES.forEach((role) => {
    const options = [...workingPool[role]].sort((a, b) => b.rating - a.rating);
    const pick = options[randInt(0, Math.min(4, options.length - 1))];
    if (pick) {
      squad.push(pick);
      workingPool = removeFromPool(workingPool, role, pick.id);
    }
  });
  const formation = FORMATION_KEYS[randInt(0, FORMATION_KEYS.length - 1)];
  return { name, squad, pool: workingPool, formation };
}

function pickRandomPlayer(squad) {
  return squad[randInt(0, squad.length - 1)];
}

const PBP_TEMPLATES = [
  "{w1} ({wt}) dapet First Blood dari {l1} ({lt})!",
  "{wt} berhasil curi Lord lewat rotasi cepat {w2}.",
  "War 5v5 pecah di base musuh — {wt} menang telak!",
  "{w1} triple kill lewat combo ultimate!",
  "{l1} ({lt}) salah posisi, langsung diserbu {wt}.",
  "{wt} amanin Turtle tanpa perlawanan berarti.",
  "{w2} carry abis lewat build item late game.",
  "{lt} coba comeback tapi telat, {wt} udah keburu unggul jauh.",
  "{l1} coba split push sendirian, malah kena gank & mati sia-sia.",
  "Objective control {wt} dari early game bikin {lt} kewalahan.",
  "{w1} pull off outplay 1v2 di late game!",
  "{lt} coba all-in death ball tapi gagal total, {wt} langsung tekan balik.",
  "Clash di river dimenangin {wt} berkat rotasi {w2}.",
  "{l1} keburu diganking pas farming sendirian di jungle musuh.",
];

function generatePlayByPlay(winnerName, winnerSquad, loserName, loserSquad) {
  const w1 = pickRandomPlayer(winnerSquad);
  const w2 = pickRandomPlayer(winnerSquad);
  const l1 = pickRandomPlayer(loserSquad);
  const fill = (t) =>
    t
      .replaceAll("{w1}", `${w1.role} ${w1.name}`)
      .replaceAll("{w2}", `${w2.role} ${w2.name}`)
      .replaceAll("{l1}", `${l1.role} ${l1.name}`)
      .replaceAll("{wt}", winnerName)
      .replaceAll("{lt}", loserName);
  const shuffled = [...PBP_TEMPLATES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, randInt(2, 3)).map(fill);
}

function pickGameMVP(winnerSquad) {
  const sorted = [...winnerSquad].sort((a, b) => b.rating - a.rating);
  if (Math.random() < 0.25 && sorted.length > 1) {
    return sorted[randInt(1, Math.min(2, sorted.length - 1))];
  }
  return sorted[0];
}

function computeSeriesMVP(gameLog) {
  const counts = {};
  gameLog.forEach((g) => {
    if (!g.mvp) return;
    const key = g.mvp.name + "|" + g.mvp.role;
    if (!counts[key]) counts[key] = { player: g.mvp, count: 0 };
    counts[key].count += 1;
  });
  const arr = Object.values(counts);
  if (arr.length === 0) return null;
  arr.sort((a, b) => b.count - a.count || b.player.rating - a.player.rating);
  return arr[0].player;
}

function teamPower(squad, formationKey) {
  const lines = FORMATIONS[formationKey]?.lines || FORMATIONS["1-3-1"].lines;
  let weightedSum = 0;
  let totalWeight = 0;
  squad.forEach((p) => {
    const line = lines[p.role] || "Tengah";
    const w = LINE_WEIGHT[line];
    weightedSum += p.rating * w;
    totalWeight += w;
  });
  return weightedSum / totalWeight;
}

function simulateMatch(teamA, teamB) {
  const teamAForGame = { ...teamA, formation: getAiGameFormation(teamA.formation) };
  const teamBForGame = { ...teamB, formation: getAiGameFormation(teamB.formation) };
  const powerA = effectivePower(teamAForGame, teamBForGame) + randInt(-12, 12);
  const powerB = effectivePower(teamBForGame, teamAForGame) + randInt(-12, 12);
  let aWins = powerA >= powerB;
  if (Math.random() < 0.12) aWins = !aWins; // sesekali ada upset biar gak selalu tim kuat menang
  const winner = aWins ? teamA : teamB;
  const loserGames = Math.random() < 0.45 ? 1 : 0;
  return {
    home: teamA.name,
    away: teamB.name,
    scoreHome: aWins ? 2 : loserGames,
    scoreAway: aWins ? loserGames : 2,
    winner: winner.name,
  };
}

function simulateSeries(teamA, teamB, bestOf) {
  const winsNeeded = Math.ceil((bestOf + 1) / 2);
  let winsA = 0;
  let winsB = 0;
  while (winsA < winsNeeded && winsB < winsNeeded) {
     const teamAForGame = { ...teamA, formation: getAiGameFormation(teamA.formation) };
    const teamBForGame = { ...teamB, formation: getAiGameFormation(teamB.formation) };
    const powerA = effectivePower(teamAForGame, teamBForGame) + randInt(-12, 12);
    const powerB = effectivePower(teamBForGame, teamAForGame) + randInt(-12, 12);
    let aWinsGame = powerA >= powerB;
    if (Math.random() < 0.12) aWinsGame = !aWinsGame;
    if (aWinsGame) winsA += 1;
    else winsB += 1;
  }
  const winner = winsA > winsB ? teamA.name : teamB.name;
  return { home: teamA.name, away: teamB.name, scoreHome: winsA, scoreAway: winsB, winner, bestOf };
}

function roundRobinSchedule(teams) {
  const matches = [];
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      matches.push([teams[i], teams[j]]);
    }
  }
  return matches;
}

function RoleTag({ role }) {
  const s = ROLE_STYLE[role];
  return (
    <span className="ldm-tag" style={{ color: s.accent, background: s.soft }}>
      {s.label}
    </span>
  );
}

function FormationMapBoard({ starters, bench, assign, onAssignChange, injuries, formation, onSaveFormation, seasonNum }) {
  const ZONES = ["Depan", "Tengah", "Belakang"];
  const ZONE_LABELS = { Depan: "Atas", Tengah: "Tengah", Belakang: "Bawah" };
  const OFF_ROLE_PENALTY = 10;
  const roster = [...starters, ...bench];
  const [selectedId, setSelectedId] = React.useState(null);

  function getBadgeStyle(rating) {
    return rating >= 90
      ? { background: "#1a1a1a", color: "#f0c96a" }
      : { background: "#e8ecf2", color: "#12213d" };
  }

  function placePlayerInRole(playerId, role) {
    const player = roster.find((p) => p.id === playerId);
    if (!player) return;
    const starter = starters.find((s) => s.role === role);
    if (player.id === starter?.id) {
      onAssignChange((prev) => { const n = { ...prev }; delete n[role]; return n; });
    } else {
      onAssignChange((prev) => ({ ...prev, [role]: player.id }));
    }
    setSelectedId(null);
  }

  function toggleSelect(p) {
    setSelectedId((prev) => (prev === p.id ? null : p.id));
  }


  const [lines, setLines] = React.useState(
    () => ({ ...(FORMATIONS[formation]?.lines || FORMATIONS["1-3-1"].lines) })
  );
  React.useEffect(() => {
    setLines({ ...(FORMATIONS[formation]?.lines || FORMATIONS["1-3-1"].lines) });
  }, [formation]);

  function activePlayerForRole(role) {
    const assignedId = assign[role];
    if (assignedId) return roster.find((p) => p.id === assignedId);
    return starters.find((s) => s.role === role);
  }
  function isBenched(p) {
    return !ROLES.some((r) => activePlayerForRole(r)?.id === p.id);
  }

  function handleZoneDrop(e, zone) {
    e.preventDefault();
    let data;
    try { data = JSON.parse(e.dataTransfer.getData("text/plain") || "{}"); } catch { return; }
    if (data.kind !== "role") return;
    setLines((prev) => ({ ...prev, [data.role]: zone }));
  }

  function handleSlotDrop(e, role) {
    e.preventDefault();
    e.stopPropagation();
    let data;
    try { data = JSON.parse(e.dataTransfer.getData("text/plain") || "{}"); } catch { return; }
    if (data.kind !== "player") return;
    placePlayerInRole(data.id, role);
  }

  function clearSlot(role) {
    onAssignChange((prev) => { const n = { ...prev }; delete n[role]; return n; });
  }

  function saveCustomFormation() {
    const key = "Meta Custom";
    FORMATIONS[key] = {
      label: "Racikan Sendiri",
      accent: "#A78BFA",
      desc: "Formasi hasil racikan sendiri lewat map builder.",
      lines: { ...lines },
    };
    if (!FORMATION_KEYS.includes(key)) FORMATION_KEYS.push(key);
    onSaveFormation(key);
  }

  const injuredCount = roster.filter((p) => (injuries[p.id] || 0) > 0).length;

  return (
    <div style={{ background: "#0F1424", borderRadius: "14px", padding: "16px", border: "1px solid rgba(255,255,255,0.08)", marginBottom: "20px" }}>
      <div className="ldm-squad-label" style={{ marginBottom: "10px" }}>Atur Skuad & Meta {seasonNum ? `(Musim ${seasonNum})` : ""}</div>
      {injuredCount > 0 && (
        <p style={{ fontSize: "11px", color: "#FB7185", marginTop: 0, marginBottom: "10px" }}>
          🩹 Ada {injuredCount} pemain cedera — otomatis diganti pas main kalau ada opsi sehat.
        </p>
      )}
      <div className="ldm-map-wrap">
        <div className="ldm-map-board">
          {ZONES.map((zone) => (
            <div key={zone} className="ldm-map-zone" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleZoneDrop(e, zone)}>
              <span className="ldm-map-zone-label">{ZONE_LABELS[zone].toUpperCase()}</span>
              <div className="ldm-map-zone-slots">
                {ROLES.filter((r) => (lines[r] || "Tengah") === zone).map((role) => {
                  const s = ROLE_STYLE[role];
                  const activePlayer = activePlayerForRole(role);
                  const starter = starters.find((st) => st.role === role);
                  const offRole = activePlayer && activePlayer.id !== starter?.id && activePlayer.role !== role;
                  const effRating = activePlayer ? (offRole ? Math.max(40, activePlayer.rating - OFF_ROLE_PENALTY) : activePlayer.rating) : null;
                  const injured = activePlayer && (injuries[activePlayer.id] || 0) > 0;
                  return (
                    <div
                      key={role}
                      className={`ldm-map-slot${selectedId ? " ldm-map-slot-target" : ""}`}
                      style={{ borderColor: s.accent + "55" }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleSlotDrop(e, role)}
                      onClick={() => { if (selectedId) placePlayerInRole(selectedId, role); }}
                      title={selectedId ? "Klik buat tempatin pemain terpilih di sini" : undefined}
                    >
                      <div
                        className="ldm-map-slot-zonepick"
                        draggable
                        onDragStart={(e) => { e.stopPropagation(); e.dataTransfer.setData("text/plain", JSON.stringify({ kind: "role", role })); }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {ZONES.map((z) => (
                          <button
                            key={z}
                            type="button"
                            className={`ldm-zone-btn${(lines[role] || "Tengah") === z ? " ldm-zone-btn-active" : ""}`}
                            title={`Pindah ke ${ZONE_LABELS[z]}`}
                            onClick={() => setLines((prev) => ({ ...prev, [role]: z }))}
                          >
                            {ZONE_LABELS[z][0]}
                          </button>
                        ))}
                      </div>
                      <div className="ldm-map-slot-dot" style={{ background: s.accent }}>{s.label[0]}</div>
                      <div className="ldm-map-slot-role">{s.label}</div>
                      <div className="ldm-map-slot-name">{activePlayer ? activePlayer.name : "—"}</div>
                      {activePlayer && (
                        <div style={{ fontSize: "10px", color: "#64748B" }}>
                          {effRating} OVR{offRole ? ` (-${OFF_ROLE_PENALTY})` : ""}{injured ? " 🩹" : ""}
                        </div>
                      )}
                      {assign[role] && (
                        <button onClick={(e) => { e.stopPropagation(); clearSlot(role); }} className="ldm-map-slot-clear">kembalikan starter</button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="ldm-bench-rail">
          <div className="ldm-squad-label" style={{ marginBottom: "8px", fontSize: "11px" }}>
            Pemain ({roster.length}) — {selectedId ? "klik role di map buat nempatin" : "klik pemain lalu klik role, atau geser ke map"}
          </div>
          <div className="ldm-pcard-grid">
            {roster.map((p) => {
              const benched = isBenched(p);
              const injured = (injuries[p.id] || 0) > 0;
              const selected = selectedId === p.id;
              return (
                <div
                  key={p.id}
                  className={`ldm-pcard ${benched ? "ldm-pcard-draggable" : "ldm-pcard-active"}${selected ? " ldm-pcard-selected" : ""}`}
                  draggable={benched}
                  onClick={() => { if (benched) toggleSelect(p); }}
                  onDragStart={(e) => e.dataTransfer.setData("text/plain", JSON.stringify({ kind: "player", id: p.id }))}
                >
                  <div className="ldm-pcard-top">
                    <div className="ldm-pcard-badge" style={getBadgeStyle(p.rating)}>{p.rating}</div>
                    <div className="ldm-pcard-role" style={{ color: ROLE_STYLE[p.role].accent }}>{ROLE_STYLE[p.role].label}</div>
                  </div>
                  <div className="ldm-pcard-avatar" />
                  <div className="ldm-pcard-bottom">
                    <div className="ldm-pcard-name">{p.name}</div>
                    <span className="ldm-pcard-tag" style={{ color: benched ? "#94A3B8" : "#34D399" }}>
                      {benched ? (selected ? "TERPILIH" : "CADANGAN") : "MAIN"}
                    </span>
                    {injured && <span style={{ position: "absolute", right: 6, top: 4, fontSize: 12 }}>🩹</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <button onClick={saveCustomFormation} className="ldm-reroll-btn" style={{ marginTop: "12px" }}>
        Simpan sebagai Meta Custom & Pakai
      </button>
    </div>
  );
}

function getFormationInsight(formationKey) {
  const f = FORMATIONS[formationKey];
  const lines = f.lines;
  const strongRoles = ROLES.filter((r) => lines[r] === "Depan");
  const weakRoles = ROLES.filter((r) => lines[r] === "Belakang");
  const neutralRoles = ROLES.filter((r) => lines[r] === "Tengah");
  return { strongRoles, weakRoles, neutralRoles, label: f.label };
}

function getTeamInsight(squad) {
  const sorted = [...squad].sort((a, b) => b.rating - a.rating);
  return { best: sorted[0], worst: sorted[sorted.length - 1] };
}

function ScoutingReport({ team, onViewRoster }) {
  const insight = getFormationInsight(team.formation);
  const teamInsight = getTeamInsight(team.squad);
  return (
    <div style={{ background: "#0F1424", borderRadius: "14px", padding: "16px", border: "1px solid rgba(255,255,255,0.08)", marginBottom: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px", gap: "8px", flexWrap: "wrap" }}>
        <div className="ldm-squad-label" style={{ marginBottom: 0 }}>
          Scouting Report — {team.name}
        </div>
        {onViewRoster && (
          <button
            onClick={() => onViewRoster(team)}
            className="ldm-reroll-btn"
            style={{ color: "#22D3EE", background: "rgba(34,211,238,0.1)", borderColor: "rgba(34,211,238,0.3)" }}
          >
            <Users className="w-3.5 h-3.5" /> Lihat Roster
          </button>
        )}
      </div>

      <div style={{ fontSize: "12px", color: "#94A3B8", marginBottom: "10px" }}>
        Pakai meta <strong style={{ color: "#E5E9F0" }}>{team.formation}</strong> ({insight.label})
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "12px" }}>
        <div style={{ flex: "1 1 140px" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, color: "#FB7185", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.03em" }}>
            Lemah di formasi
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {insight.weakRoles.length > 0 ? (
              insight.weakRoles.map((r) => <RoleTag key={r} role={r} />)
            ) : (
              <span style={{ fontSize: "11px", color: "#64748B" }}>Nggak ada lini lemah</span>
            )}
          </div>
        </div>
        <div style={{ flex: "1 1 140px" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, color: "#34D399", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.03em" }}>
            Kuat di formasi
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {insight.strongRoles.length > 0 ? (
              insight.strongRoles.map((r) => <RoleTag key={r} role={r} />)
            ) : (
              <span style={{ fontSize: "11px", color: "#64748B" }}>Nggak ada lini kuat</span>
            )}
          </div>
        </div>
      </div>

      <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "10px 0" }} />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <div style={{ flex: "1 1 140px" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, color: "#FB7185", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.03em" }}>
            Titik lemah tim
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <RoleTag role={teamInsight.worst.role} />
            <span style={{ fontSize: "12px", color: "#E5E9F0" }}>{teamInsight.worst.name}</span>
            <span style={{ fontSize: "11px", color: "#64748B" }}>{teamInsight.worst.rating}</span>
          </div>
        </div>
        <div style={{ flex: "1 1 140px" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, color: "#34D399", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.03em" }}>
            Pemain andalan
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <RoleTag role={teamInsight.best.role} />
            <span style={{ fontSize: "12px", color: "#E5E9F0" }}>{teamInsight.best.name}</span>
            <span style={{ fontSize: "11px", color: "#64748B" }}>{teamInsight.best.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamRosterModal({ team, onClose }) {
  if (!team) return null;
  const sortedSquad = ROLES.map((r) => team.squad.find((p) => p.role === r)).filter(Boolean);
  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(5,8,15,0.85)", zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#141A2E", borderRadius: "16px", padding: "20px", maxWidth: "420px", width: "100%",
          border: "1px solid rgba(255,255,255,0.1)", maxHeight: "80vh", overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#E5E9F0" }}>{team.name}</div>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: "#64748B", fontSize: "22px", cursor: "pointer", lineHeight: 1, padding: "4px" }}
          >
            ×
          </button>
        </div>
        {team.formation && (
          <div style={{ fontSize: "12px", color: "#94A3B8", marginBottom: "14px" }}>
            Meta: <strong style={{ color: "#FBBF24" }}>{team.formation}</strong>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {sortedSquad.map((p) => (
            <div
              key={p.role}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: "#0F1424", borderRadius: "10px", padding: "10px 12px",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <RoleTag role={p.role} />
                <span style={{ fontSize: "13px", color: "#E5E9F0", fontWeight: 500 }}>{p.name}</span>
              </div>
              <span style={{ fontSize: "12px", color: "#FBBF24", fontWeight: 700 }}>{p.rating} OVR</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CounterCycleLegend() {
  return (
    <div
      style={{
        display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px", fontSize: "10px", color: "#94A3B8",
        background: "#0F1424", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "8px 12px", marginBottom: "14px",
      }}
    >
      <span style={{ fontWeight: 700, color: "#CBD5E1" }}>Siklus Counter:</span>
      {FORMATION_CYCLE.map((k, i) => (
        <React.Fragment key={k}>
          <span style={{ color: FORMATIONS[k].accent, fontWeight: 600 }}>{k}</span>
          <span>{i < FORMATION_CYCLE.length - 1 ? "›" : `› (balik ke ${FORMATION_CYCLE[0]})`}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

export default function LigaDraftML() {
  const [phase, setPhase] = useState("modeSelect");
  const [pool, setPool] = useState(() => generatePool());
  const [roleIndex, setRoleIndex] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [userSquad, setUserSquad] = useState([]);
  const [userTeamName, setUserTeamName] = useState("Timku FC");
  const [formation, setFormation] = useState("1-3-1");
  const [season, setSeason] = useState(null);
  const [standingsTab, setStandingsTab] = useState("klasemen");
  const [rerollsLeft, setRerollsLeft] = useState(3);
  const [aiTeams, setAiTeams] = useState([]);
  const [aiVsAiResults, setAiVsAiResults] = useState([]);
  const [matchResults, setMatchResults] = useState([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [playoffSeeds, setPlayoffSeeds] = useState([]);
  const [playoffStage, setPlayoffStage] = useState("m1");
  const [bracket, setBracket] = useState({});
  const [playoffLog, setPlayoffLog] = useState([]);
  const [pendingPlayoffMatch, setPendingPlayoffMatch] = useState(null);
  const [pendingAdvance, setPendingAdvance] = useState(null);
  const [championTeam, setChampionTeam] = useState(null);
  const [showLiveStandings, setShowLiveStandings] = useState(false);
  const [showBracket, setShowBracket] = useState(false);
  const [bracketReturnPhase, setBracketReturnPhase] = useState("standings");
  const [chemistry, setChemistry] = useState({ signature: null, streak: 0 });
  const [chemistryB, setChemistryB] = useState({ signature: null, streak: 0 });

  const [userSub, setUserSub] = useState(null);
  const [subRerollsLeft, setSubRerollsLeft] = useState(2);
  const [subSlotRole, setSubSlotRole] = useState(null);
 const [seriesWins, setSeriesWins] = useState({ home: 0, away: 0 });
const [seriesGameLog, setSeriesGameLog] = useState([]);

const [gameMode, setGameMode] = useState(null); 
const [draftingTeam, setDraftingTeam] = useState("A");
const [teamBSquad, setTeamBSquad] = useState([]);
const [teamBName, setTeamBName] = useState("Tim B");
const [teamBFormation, setTeamBFormation] = useState("1-3-1");
const [teamBSub, setTeamBSub] = useState(null);
const [teamBSubSlotRole, setTeamBSubSlotRole] = useState(null);
const [rerollsLeftB, setRerollsLeftB] = useState(3);
const [subRerollsLeftB, setSubRerollsLeftB] = useState(2);
const [activeSide, setActiveSide] = useState("A");
  const [careerBudget, setCareerBudget] = useState(CAREER_STARTING_BUDGET);
  const [careerBench, setCareerBench] = useState([]);
  const [careerBenchAssign, setCareerBenchAssign] = useState({});
  const [careerSeasonNum, setCareerSeasonNum] = useState(1);
  const [careerDynastyLog, setCareerDynastyLog] = useState([]);
  const [careerStats, setCareerStats] = useState({});
  const [careerInjuries, setCareerInjuries] = useState({});
  const [careerMarket, setCareerMarket] = useState([]);
  const [careerSeasonSummary, setCareerSeasonSummary] = useState(null);
  const [viewingRosterTeam, setViewingRosterTeam] = useState(null);
  const [aiMatchFormation, setAiMatchFormation] = useState(null);
const [matchQueue, setMatchQueue] = useState([]);
const [queueIndex, setQueueIndex] = useState(0);
const [abContext, setAbContext] = useState("regular");
const [teamAData, setTeamAData] = useState(null);
const [teamBData, setTeamBData] = useState(null);
const [duelTurn, setDuelTurn] = useState("A");
const [duelFormationA, setDuelFormationA] = useState("1-3-1");
const [duelFormationB, setDuelFormationB] = useState("1-3-1");
const [duelSubActiveA, setDuelSubActiveA] = useState(false);
const [duelSubActiveB, setDuelSubActiveB] = useState(false);
const [duelWins, setDuelWins] = useState({ a: 0, b: 0 });
const [duelBestOf, setDuelBestOf] = useState(3);
const [duelGameLog, setDuelGameLog] = useState([]);

  const [simCommentary, setSimCommentary] = useState([]);
  const [simHomeName, setSimHomeName] = useState("");
  const [simAwayName, setSimAwayName] = useState("");
  const simTimersRef = useRef([]);
  const simActionRef = useRef(null);
  const simOutcomeRef = useRef(null);

  useEffect(() => {
    return () => {
      simTimersRef.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if ((phase === "matchPrep" || phase === "playoffPrep") && seriesGameLog.length === 0){
      const opp =
      phase === "playoffPrep"
        ?(pendingPlayoffMatch?.home?.isUser ? pendingPlayoffMatch.away : pendingPlayoffMatch?.home)
        : getCurrentOpponent();
        if (oop) setAiMatchFormation(getAiGameFormation(oop.formation));
    }
  }, [phase]);

const TOTAL_LEGS = 2;
const REGULAR_BEST_OF = 3;
  const PLAYOFF_ORDER = ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8"];
  const PLAYOFF_BEST_OF = { m1: 5, m2: 5, m3: 5, m4: 5, m5: 5, m6: 5, m7: 7, m8: 7 };
  const OFF_ROLE_PENALTY = 10;
  const PLAYOFF_LABELS = {
    m1: "M1 — Upper Bracket Ronde 1", m2: "M2 — Upper Bracket Ronde 1",
    m3: "M3 — Upper Bracket Ronde 2", m4: "M4 — Upper Bracket Ronde 2",
    m5: "M5 — Lower Bracket Ronde 1", m6: "M6 — Upper Bracket Final (lolos langsung ke Grand Final)",
    m7: "M7 — Lower Bracket Final", m8: "M8 — Grand Final",
  };

  function resetRunState() {
    setCareerBudget(CAREER_STARTING_BUDGET);
    setCareerBench([]);
    setCareerBenchAssign({});
    setCareerSeasonNum(1);
    setCareerDynastyLog([]);
    setCareerStats({});
    setCareerInjuries({});
    setCareerMarket([]);
    setCareerSeasonSummary(null);
    setChemistry({ signature: null, streak: 0 });
    setChemistryB({ signature: null, streak: 0 });
    setUserSquad([]);
    setTeamBSquad([]);
    setTeamBName("Tim B");
    setTeamBFormation("1-3-1");
    setTeamBSub(null);
    setTeamBSubSlotRole(null);
    setDuelBestOf(3);
    setRerollsLeftB(3);
    setSubRerollsLeftB(2);
    setActiveSide("A");
    setMatchQueue([]);
    setQueueIndex(0);
    setAbContext("regular");
    setRoleIndex(0);
    setCandidates([]);
    setRerollsLeft(3);
    setUserSub(null);
    setSubRerollsLeft(2);
    setAiTeams([]);
    setAiVsAiResults([]);
    setMatchResults([]);
    setCurrentMatchIndex(0);
    setPlayoffSeeds([]);
    setPlayoffStage("m1");
    setBracket({});
    setPlayoffLog([]);
    setPendingPlayoffMatch(null);
    setPendingAdvance(null);
    setChampionTeam(null);
    setShowLiveStandings(false);
    setSeason(null);
    setSeriesWins({ home: 0, away: 0 });
    setSeriesGameLog([]);
  }

  function chooseMode(mode) {
    setGameMode(mode);
    setDraftingTeam("A");
    setUserTeamName(mode === "solo" ? "Timku FC" : "Tim A");
    setFormation("1-3-1");
    setPhase("intro");
  }

  function beginDraftPhase() {
    const sharePoolWithTeamA = gameMode === "direct1v1" && draftingTeam === "B";
    const activePool = sharePoolWithTeamA ? pool : generatePool();
    if (!sharePoolWithTeamA) setPool(activePool);
    resetRunState();
    setCandidates(drawCandidates(activePool, ROLES[0]));
    setPhase("draft");
  }

  function startNewGame() {
    resetRunState();
    setGameMode(null);
    setDraftingTeam("A");
    setTeamAData(null);
    setTeamBData(null);
    setUserTeamName("Timku FC");
    setFormation("1-3-1");
    setDuelTurn("A");
    setDuelFormationA("1-3-1");
    setDuelFormationB("1-3-1");
    setDuelSubActiveA(false);
    setDuelSubActiveB(false);
    setDuelWins({ a: 0, b: 0 });
    setDuelGameLog([]);
    setCareerBudget(CAREER_STARTING_BUDGET);
    setCareerBench([]);
    setCareerBenchAssign({});
    setCareerSeasonNum(1);
    setCareerDynastyLog([]);
    setCareerStats({});
    setCareerInjuries({});
    setCareerMarket([]);
    setCareerSeasonSummary(null);
    setPool(generatePool());
    setPhase("modeSelect");
  }

  function rerollCandidates() {
    const isB = (gameMode === "liga1v1" || gameMode === "direct1v1") && draftingTeam === "B";
    const left = isB ? rerollsLeftB : rerollsLeft;
    if (left <= 0) return;
    setCandidates(drawCandidates(pool, ROLES[roleIndex]));
    if (isB) setRerollsLeftB(rerollsLeftB - 1);
    else setRerollsLeft(rerollsLeft - 1);
  }

  function drawSubCandidates(currentPool) {
    const shuffledRoles = [...ROLES].sort(() => Math.random() - 0.5).slice(0, 3);
    return shuffledRoles
      .map((role) => drawCandidates(currentPool, role, 1)[0])
      .filter(Boolean);
  }

  function pickPlayer(player) {
    const newPool = removeFromPool(pool, player.role, player.id);
    setPool(newPool);

    if (gameMode === "liga1v1" || gameMode === "direct1v1") {
      if (draftingTeam === "A") {
        setUserSquad((prev) => [...prev, player]);
        setDraftingTeam("B");
        setCandidates(drawCandidates(newPool, ROLES[roleIndex]));
        return;
      }
      setTeamBSquad((prev) => [...prev, player]);
      setDraftingTeam("A");
      if (roleIndex + 1 < ROLES.length) {
        const nextRole = ROLES[roleIndex + 1];
        setCandidates(drawCandidates(newPool, nextRole));
        setRoleIndex(roleIndex + 1);
      } else {
        setSubRerollsLeft(2);
        setCandidates(drawSubCandidates(newPool));
        setPhase("draftSub");
      }
      return;
    }

    const newSquad = [...userSquad, player];
    setUserSquad(newSquad);
    if (roleIndex + 1 < ROLES.length) {
      const nextRole = ROLES[roleIndex + 1];
      setCandidates(drawCandidates(newPool, nextRole));
      setRoleIndex(roleIndex + 1);
    } else {
      setSubRerollsLeft(2);
      setCandidates(drawSubCandidates(newPool));
      setPhase("draftSub");
    }
  }

  function rerollSubCandidates() {
    const isB = (gameMode === "liga1v1" || gameMode === "direct1v1") && draftingTeam === "B";
    const left = isB ? subRerollsLeftB : subRerollsLeft;
    if (left <= 0) return;
    setCandidates(drawSubCandidates(pool));
    if (isB) setSubRerollsLeftB(subRerollsLeftB - 1);
    else setSubRerollsLeft(subRerollsLeft - 1);
  }

  function startDuel(finalPool, teamBSubPlayer) {
    const teamA = { name: userTeamName.trim() || "Tim A", squad: userSquad, sub: userSub, formation };
    const teamBFormationPick = teamBFormation || FORMATION_KEYS[randInt(0, FORMATION_KEYS.length - 1)];
    const teamB = { name: teamBName.trim() || "Tim B", squad: teamBSquad, sub: teamBSubPlayer, formation: teamBFormationPick };
    setTeamAData(teamA);
    setTeamBData(teamB);
    setDuelTurn("A");
    setDuelFormationA(teamA.formation);
    setDuelFormationB(teamB.formation);
    setDuelSubActiveA(false);
    setDuelSubActiveB(false);
    setDuelWins({ a: 0, b: 0 });
    setDuelGameLog([]);
    setPool(finalPool);
    setPhase("duelPrep");
  }

  function finalizeCareerDraft(basePool, bench) {
    setCareerBench(bench);
    setCareerBenchAssign({});
    setCareerBudget(CAREER_STARTING_BUDGET);
    setCareerSeasonNum(1);
    setCareerDynastyLog([]);
    setCareerStats({});
    setCareerInjuries({});
    setCareerSeasonSummary(null);
    setCareerMarket(generateCareerMarket());
    finalizeDraft(basePool);
  }

  function pickSubPlayer(player) {
    const newPool = removeFromPool(pool, player.role, player.id);
    setPool(newPool);

    if (gameMode === "career") {
      const newBench = [...careerBench, player];
      if (newBench.length < 2) {
        setSubRerollsLeft(2);
        setCandidates(drawSubCandidates(newPool));
        setCareerBench(newBench);
        return;
      }
      finalizeCareerDraft(newPool, newBench);
      return;
    }

    if ((gameMode === "liga1v1" || gameMode === "direct1v1") && draftingTeam === "A") {
      setUserSub(player);
      setDraftingTeam("B");
      setSubRerollsLeft(2);
      setCandidates(drawSubCandidates(newPool));
      return;
    }
    if (gameMode === "liga1v1" && draftingTeam === "B") {
      const teamBFormationPick = FORMATION_KEYS[randInt(0, FORMATION_KEYS.length - 1)];
      const teamB = { name: teamBName.trim() || "Tim B", squad: teamBSquad, sub: player, formation: teamBFormationPick };
      finalizeDraft(newPool, teamB);
      return;
    }
    if (gameMode === "direct1v1" && draftingTeam === "B") {
      startDuel(newPool, player);
      return;
    }

    setUserSub(player);
    finalizeDraft(newPool);
  }

  function skipSubDraft() {
    if (gameMode === "career") {
      finalizeCareerDraft(pool, careerBench);
      return;
    }
    if ((gameMode === "liga1v1" || gameMode === "direct1v1") && draftingTeam === "A") {
      setUserSub(null);
      setDraftingTeam("B");
      setSubRerollsLeft(2);
      setCandidates(drawSubCandidates(pool));
      return;
    }
    if (gameMode === "liga1v1" && draftingTeam === "B") {
      const teamBFormationPick = FORMATION_KEYS[randInt(0, FORMATION_KEYS.length - 1)];
      const teamB = { name: teamBName.trim() || "Tim B", squad: teamBSquad, sub: null, formation: teamBFormationPick };
      finalizeDraft(pool, teamB);
      return;
    }
    if (gameMode === "direct1v1" && draftingTeam === "B") {
      startDuel(pool, null);
      return;
    }
    setUserSub(null);
    finalizeDraft(pool);
  }

  function buildMatchQueue(pureAiTeams) {
    const n = pureAiTeams.length;
    const offset = Math.max(1, Math.floor(n / 2));
    const q = [];
    for (let leg = 1; leg <= TOTAL_LEGS; leg++) {
      for (let i = 0; i < n; i++) {
        const oppForA = pureAiTeams[i];
        const oppForB = pureAiTeams[(i + offset) % n];
        q.push({ kind: "AI", side: "A", opponent: oppForA, leg });
        q.push({ kind: "AI", side: "B", opponent: oppForB, leg });
      }
    }
    q.push({ kind: "AB", leg: 1 });
    q.push({ kind: "AB", leg: 2 });
    return q;
  }

  function finalizeDraft(basePool, extraTeam) {
    let workingPool = basePool;
    const pureAiTeams = [];
    TEAM_NAMES.forEach((name) => {
      const t = generateAiTeam(workingPool, name);
      workingPool = t.pool;
      pureAiTeams.push({ name: t.name, squad: t.squad, formation: t.formation });
    });
    const newAiTeams = extraTeam ? [...pureAiTeams, extraTeam] : pureAiTeams;
    setAiTeams(newAiTeams);
    if (extraTeam) {
      setTeamBSub(extraTeam.sub || null);
      setTeamBFormation(extraTeam.formation);
    }
    const aiFixturesLeg1 = roundRobinSchedule(pureAiTeams);
    const aiFixturesLeg2 = aiFixturesLeg1.map(([a, b]) => [b, a]);
    const aiResults = [...aiFixturesLeg1, ...aiFixturesLeg2].map(([a, b]) => simulateMatch(a, b));
    setAiVsAiResults(aiResults);
    setMatchResults([]);
    setCurrentMatchIndex(0);
    setSubSlotRole(null);
    setTeamBSubSlotRole(null);
    setSeriesWins({ home: 0, away: 0 });
    setSeriesGameLog([]);

    if (gameMode === "liga1v1") {
      const q = buildMatchQueue(pureAiTeams);
      setMatchQueue(q);
      setQueueIndex(0);
      setAbContext("regular");
      const first = q[0];
      if (first.kind === "AB") {
        setActiveSide("A");
        setPhase("abMetaA");
      } else {
        setActiveSide(first.side);
        setPhase("matchPrep");
      }
    } else {
      setPhase("matchPrep");
    }
  }

function getDuelTeamObj(side) {
  const data = side === "A" ? teamAData : teamBData;
    const subActiveVal = side === "A" ? duelSubActiveA : duelSubActiveB;
    const formationUsed = side === "A" ? duelFormationA : duelFormationB;
    let squad = data.squad;
    if (subActiveVal && data.sub) {
      squad = data.squad.map((p) => (p.role === data.sub.role ? data.sub : p));
    }
  return { name: data.name, squad, formation: formationUsed };
}
  function playDuelGame() {
    const teamA = getDuelTeamObj("A");
    const teamB = getDuelTeamObj("B");
    const basePowerA = effectivePower(teamA, teamB);
    const basePowerB = effectivePower(teamB, teamA);
    let aWinsGame = consumeSimOutcome(basePowerA, basePowerB);
    const winsNeeded = Math.ceil((duelBestOf + 1) / 2);
    const newWins = { a: duelWins.a + (aWinsGame ? 1 : 0), b: duelWins.b + (aWinsGame ? 0 : 1) };
    const gameEntry = {
      gameNumber: duelGameLog.length + 1,
      formationA: teamA.formation, formationB: teamB.formation,
      winner: aWinsGame ? "A" : "B",
    };
    const newLog = [...duelGameLog, gameEntry];
    setDuelWins(newWins);
    setDuelGameLog(newLog);
    if (newWins.a >= winsNeeded || newWins.b >= winsNeeded) {
      setPhase("duelResult");
    } else {
      setPhase("duelGameResult");
    }
  }
  
  function renderDuelSquadManager(side) {
    const data = side === "A" ? teamAData : teamBData;
    const subActiveVal = side === "A" ? duelSubActiveA : duelSubActiveB;
    const setSubActiveVal = side === "A" ? setDuelSubActiveA : setDuelSubActiveB;
    return (
      <div style={{ background: "#0F1424", borderRadius: "14px", padding: "16px", border: "1px solid rgba(255,255,255,0.08)", marginBottom: "20px" }}>
        <div className="ldm-squad-label" style={{ marginBottom: "10px" }}>Atur Skuad {data.name}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {data.squad.map((p) => {
            const isSubHere = !!(data.sub && data.sub.role === p.role);
            const playing = isSubHere && subActiveVal ? data.sub : p;
        return (
              <div
                key={p.role}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px",
                  background: "#141A2E", borderRadius: "10px", padding: "8px 12px",
                  border: `1px solid ${isSubHere && subActiveVal ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.05)"}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
                  <RoleTag role={p.role} />
                  <span style={{ fontSize: "13px", color: "#E5E9F0", fontWeight: 500 }}>{playing.name}</span>
                  <span style={{ fontSize: "11px", color: "#64748B" }}>{playing.rating} OVR</span>
                </div>
                {isSubHere && (
                  <button
                    onClick={() => setSubActiveVal(!subActiveVal)}
                    className="ldm-reroll-btn"
                    style={{
                      color: subActiveVal ? "#34D399" : "#94A3B8",
                      background: subActiveVal ? "rgba(52,211,153,0.1)" : "rgba(148,163,184,0.08)",
                      borderColor: subActiveVal ? "rgba(52,211,153,0.3)" : "rgba(148,163,184,0.2)",
                    }}
                     >
                    {subActiveVal ? `Balikin ${p.name}` : `Pasang ${data.sub.name}`}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

   function renderDuelFormationGrid(side) {
    const activeKey = side === "A" ? duelFormationA : duelFormationB;
    const setKey = side === "A" ? setDuelFormationA : setDuelFormationB;
    return (
      <div className="ldm-formation-grid">
        {FORMATION_KEYS.map((key) => {
          const f = FORMATIONS[key];
          const active = activeKey === key;
          const lineOrder = ["Depan", "Tengah", "Belakang"];
          const grouped = { Depan: [], Tengah: [], Belakang: [] };
          ROLES.forEach((r) => grouped[f.lines[r]]?.push(r));
          return (
            <button
              key={key}
              onClick={() => setKey(key)}
              className="ldm-formation-card"
              style={{
                border: `2px solid ${active ? f.accent : "rgba(255,255,255,0.06)"}`,
                background: active ? f.accent + "14" : "#0F1424",
              }}
            >
              <div className="ldm-formation-key-col">
                <span className="ldm-formation-key" style={{ color: active ? f.accent : "#E5E9F0" }}>{key}</span>
                <span className="ldm-formation-label" style={{ color: active ? f.accent : "#7C8797" }}>{f.label}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="ldm-formation-lines">
                  {lineOrder.map((line) => (
                    <div key={line} className="ldm-formation-line">
                      {grouped[line].map((r) => (
                        <div key={r} title={r} className="ldm-dot" style={{ background: ROLE_STYLE[r].accent }}>
                          {ROLE_STYLE[r].label[0]}
                        </div>
                      ))}
                    </div>
              ))}
                </div>
                <div className="ldm-formation-desc">{f.desc}</div>
              </div>
            </button>
          );
        })}
      </div>
    );
  }
  
  function getStageResult(stage) {
    return playoffLog.find((l) => l.roundLabel === PLAYOFF_LABELS[stage]);
  }

  function openBracket(fromPhase) {
    setBracketReturnPhase(fromPhase);
    setPhase("bracket");
  }

  function renderBracketMatch(stage, home, away) {
    const stageResult = getStageResult(stage);
    const winner = bracket[stage];
    const bo = PLAYOFF_BEST_OF[stage];
    return (
      <div key={stage} style={{ background: "#0F1424", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "10px 12px", marginBottom: "8px" }}>
        <div style={{ fontSize: "10px", color: "#64748B", marginBottom: "6px", display: "flex", justifyContent: "space-between" }}>
          <span>{stage.toUpperCase()}</span><span>Bo{bo}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", fontSize: "13px" }}>
          <span
            onClick={() => home && setViewingRosterTeam(home)}
            style={{
              fontWeight: winner && home && winner.name === home.name ? 700 : 400,
              color: winner && home && winner.name === home.name ? "#34D399" : home ? "#E5E9F0" : "#475569",
              flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              cursor: home ? "pointer" : "default", textDecoration: home ? "underline" : "none", textDecorationColor: "rgba(255,255,255,0.2)", textUnderlineOffset: "2px",
            }}
          >
            {home ? home.name : "TBD"}
          </span>
          <span style={{ color: "#FBBF24", fontWeight: 700, fontSize: "12px", flexShrink: 0 }}>
            {stageResult ? `${stageResult.result.scoreHome}–${stageResult.result.scoreAway}` : "vs"}
          </span>
          <span
            onClick={() => away && setViewingRosterTeam(away)}
            style={{
              fontWeight: winner && away && winner.name === away.name ? 700 : 400,
              color: winner && away && winner.name === away.name ? "#34D399" : away ? "#E5E9F0" : "#475569",
              flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "right",
              cursor: away ? "pointer" : "default", textDecoration: away ? "underline" : "none", textDecorationColor: "rgba(255,255,255,0.2)", textUnderlineOffset: "2px",
            }}
          >
            {away ? away.name : "TBD"}
          </span>
        </div>
      </div>
    );
  }

  function getCareerEffectiveSquad() {
    return userSquad.map((starter) => {
      const assignedId = careerBenchAssign[starter.role];
      let candidate = starter;
      if (assignedId) {
        const benchPlayer = careerBench.find((b) => b.id === assignedId);
        if (benchPlayer) {
          const offRole = benchPlayer.role !== starter.role;
          const effectiveRating = offRole ? Math.max(40, benchPlayer.rating - OFF_ROLE_PENALTY) : benchPlayer.rating;
          candidate = { ...benchPlayer, role: starter.role, rating: effectiveRating };
        }
      }
      if ((careerInjuries[candidate.id] || 0) > 0) {
        const pool = [starter, ...careerBench].filter((p) => (careerInjuries[p.id] || 0) <= 0);
        if (pool.length > 0) {
          const sameRole = pool.find((p) => p.role === starter.role);
          const pick = sameRole || [...pool].sort((a, b) => b.rating - a.rating)[0];
          const offRole = pick.role !== starter.role;
          const effectiveRating = offRole ? Math.max(40, pick.rating - OFF_ROLE_PENALTY) : pick.rating;
          candidate = { ...pick, role: starter.role, rating: effectiveRating };
        } else {
          candidate = { ...candidate, rating: Math.max(30, candidate.rating - 15) };
        }
      }
      return candidate;
    });
  }

  function getTeamObjForSide(side) {
    if (gameMode === "career") {
      return { name: userTeamName.trim() || "Timku FC", squad: getCareerEffectiveSquad(), isUser: true, side: "A", formation };
    }
    if (side === "B") {
      let squad = teamBSquad;
      if (teamBSubSlotRole && teamBSub) {
        const offRole = teamBSub.role !== teamBSubSlotRole;
        const effectiveRating = offRole ? Math.max(40, teamBSub.rating - OFF_ROLE_PENALTY) : teamBSub.rating;
        squad = teamBSquad.map((p) =>
          p.role === teamBSubSlotRole ? { ...teamBSub, role: teamBSubSlotRole, rating: effectiveRating } : p
        );
      }
      return { name: teamBName.trim() || "Tim B", squad, isUser: true, side: "B", formation: teamBFormation };
    }
    let squad = userSquad;
    if (subSlotRole && userSub) {
      const offRole = userSub.role !== subSlotRole;
      const effectiveRating = offRole ? Math.max(40, userSub.rating - OFF_ROLE_PENALTY) : userSub.rating;
      squad = userSquad.map((p) =>
        p.role === subSlotRole ? { ...userSub, role: subSlotRole, rating: effectiveRating } : p
      );
    }
    return { name: userTeamName.trim() || "Timku FC", squad, isUser: true, side: "A", formation };
  }

const CHEMISTRY_MAX_STREAK = 6;
const CHEMISTRY_BONUS_PER_STREAK = 0.5;

function getLineupSignature(squad) {
  return squad.map((p) => p.role + ":" + p.name).sort().join("|");
}

function getChemistryBonus(streak) {
  return Math.min(streak, CHEMISTRY_MAX_STREAK) * CHEMISTRY_BONUS_PER_STREAK;
}

function getChemistryFor(side) {
  return side === "B" ? chemistryB : chemistry;
}

function updateChemistryFor(side, squad, won) {
  const chem = getChemistryFor(side);
  const sig = getLineupSignature(squad);
  let newStreak;
  if (won && sig === chem.signature) newStreak = chem.streak + 1;
  else if (won) newStreak = 1;
  else newStreak = 0;
  const next = { signature: sig, streak: newStreak };
  if (side === "B") setChemistryB(next);
  else setChemistry(next);
  return next;
}

  function advanceInjuries() {
    const next = {};
    Object.keys(careerInjuries).forEach((id) => {
      const remaining = careerInjuries[id] - 1;
      if (remaining > 0) next[id] = remaining;
    });
    if (Math.random() < CAREER_INJURY_CHANCE) {
      const lineup = getCareerEffectiveSquad();
      const candidate = lineup[randInt(0, lineup.length - 1)];
      if (candidate) next[candidate.id] = randInt(CAREER_INJURY_MIN_MATCHES, CAREER_INJURY_MAX_MATCHES);
    }
    setCareerInjuries(next);
  }

  function recordCareerGameStats(squad, won) {
    setCareerStats((prev) => {
      const next = { ...prev };
      squad.forEach((p) => {
        const cur = next[p.id] || { played: 0, won: 0 };
        next[p.id] = { played: cur.played + 1, won: cur.won + (won ? 1 : 0) };
      });
      return next;
    });
  }

  function getUserTeamObj() {
    return getTeamObjForSide(gameMode === "liga1v1" ? activeSide : "A");
  }

  function getActiveFormation() {
    return gameMode === "liga1v1" && activeSide === "B" ? teamBFormation : formation;
  }
  function setActiveFormation(key) {
    if (gameMode === "liga1v1" && activeSide === "B") setTeamBFormation(key);
    else setFormation(key);
  }

  function renderSquadManager() {
    const side = gameMode === "liga1v1" ? activeSide : "A";
    const squadSrc = side === "B" ? teamBSquad : userSquad;
    const subSrc = side === "B" ? teamBSub : userSub;
    const slotRole = side === "B" ? teamBSubSlotRole : subSlotRole;
    const setSlotRole = side === "B" ? setTeamBSubSlotRole : setSubSlotRole;
    return renderSquadManagerFor(squadSrc, subSrc, slotRole, setSlotRole);
  }

  function renderCareerSquadManager() {
    return (
      <FormationMapBoard
        starters={userSquad}
        bench={careerBench}
        assign={careerBenchAssign}
        onAssignChange={setCareerBenchAssign}
        injuries={careerInjuries}
        formation={formation}
        onSaveFormation={setFormation}
        seasonNum={careerSeasonNum}
      />
    );
  }

  function renderSquadManagerFor(userSquad, userSub, subSlotRole, setSubSlotRole) {
    return (
      <div style={{ background: "#0F1424", borderRadius: "14px", padding: "16px", border: "1px solid rgba(255,255,255,0.08)", marginBottom: "20px" }}>
        <div className="ldm-squad-label" style={{ marginBottom: "10px" }}>Atur Skuad</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {userSquad.map((p) => {
            const isSubHere = subSlotRole === p.role;
            const offRole = userSub && userSub.role !== p.role;
            const subRatingHere = userSub ? (offRole ? Math.max(40, userSub.rating - OFF_ROLE_PENALTY) : userSub.rating) : null;
            const playingName = isSubHere ? userSub.name : p.name;
            const playingRating = isSubHere ? subRatingHere : p.rating;
            return (
              <div
                key={p.role}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px",
                  background: "#141A2E", borderRadius: "10px", padding: "8px 12px",
                  border: `1px solid ${isSubHere ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.05)"}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
                  <RoleTag role={p.role} />
                  <span style={{ fontSize: "13px", color: "#E5E9F0", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {playingName}
                  </span>
                  <span style={{ fontSize: "11px", color: "#64748B", flexShrink: 0 }}>{playingRating} OVR</span>
                  {isSubHere && offRole && (
                    <span style={{ fontSize: "10px", color: "#FB7185", flexShrink: 0 }}>
                      (-{OFF_ROLE_PENALTY}, bukan role asli)
                    </span>
                  )}
                </div>
                {userSub && (
                  <button
                    onClick={() => setSubSlotRole(isSubHere ? null : p.role)}
                    className="ldm-reroll-btn"
                    style={{
                      flexShrink: 0,
                      color: isSubHere ? "#34D399" : "#94A3B8",
                      background: isSubHere ? "rgba(52,211,153,0.1)" : "rgba(148,163,184,0.08)",
                      borderColor: isSubHere ? "rgba(52,211,153,0.3)" : "rgba(148,163,184,0.2)",
                    }}
                  >
                    {isSubHere
                      ? `Balikin ${p.name}`
                      : `Pasang ${userSub.name} (${offRole ? Math.max(40, userSub.rating - OFF_ROLE_PENALTY) : userSub.rating} OVR)`}
                  </button>
                )}
              </div>
            );
          })}
        </div>
        {userSub ? (
          <p style={{ fontSize: "11px", color: "#64748B", marginTop: "10px", marginBottom: 0 }}>
            Cadangan: <strong style={{ color: "#CBD5E1" }}>{userSub.name}</strong> ({userSub.rating} OVR, role asli {userSub.role}) —
            bisa dipasang gantiin starter di role MANAPUN. Di role aslinya OVR-nya penuh, di role lain turun {OFF_ROLE_PENALTY} poin.
            Ganti-ganti bebas sebelum tiap game dimulai.
          </p>
        ) : (
          <p style={{ fontSize: "11px", color: "#64748B", marginTop: "10px", marginBottom: 0 }}>
            Kamu nggak ambil pemain cadangan waktu draft.
          </p>
        )}
      </div>
    );
  }

  function computeLiveStandings() {
    const anchorTeam = gameMode === "liga1v1" ? getTeamObjForSide("A") : getUserTeamObj();
    const allTeams = [anchorTeam, ...aiTeams];
    const standings = {};
    allTeams.forEach((t) => {
      standings[t.name] = { name: t.name, isUser: !!t.isUser, squad: t.squad, formation: t.formation, w: 0, l: 0, gf: 0, ga: 0, pts: 0 };
    });
    matchResults.forEach((m) => {
      const r = m.result;
      standings[r.home].gf += r.scoreHome;
      standings[r.home].ga += r.scoreAway;
      standings[r.away].gf += r.scoreAway;
      standings[r.away].ga += r.scoreHome;
      if (r.winner === r.home) {
        standings[r.home].w += 1;
        standings[r.away].l += 1;
        standings[r.home].pts += 3;
      } else {
        standings[r.away].w += 1;
        standings[r.home].l += 1;
        standings[r.away].pts += 3;
      }
    });
    aiVsAiResults.forEach((r) => {
      standings[r.home].gf += r.scoreHome;
      standings[r.home].ga += r.scoreAway;
      standings[r.away].gf += r.scoreAway;
      standings[r.away].ga += r.scoreHome;
      if (r.winner === r.home) {
        standings[r.home].w += 1;
        standings[r.away].l += 1;
        standings[r.home].pts += 3;
      } else {
        standings[r.away].w += 1;
        standings[r.home].l += 1;
        standings[r.away].pts += 3;
      }
    });
    return Object.values(standings).sort((a, b) => b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga));
  }

  function getCurrentOpponent() {
    if (gameMode === "liga1v1") {
      const entry = matchQueue[queueIndex];
      if (!entry) return aiTeams[0];
      return entry.kind === "AI" ? entry.opponent : getTeamObjForSide(activeSide === "A" ? "B" : "A");
    }
    return aiTeams[currentMatchIndex % aiTeams.length];
  }
  function getCurrentLeg() {
    if (gameMode === "liga1v1") return matchQueue[queueIndex]?.leg || 1;
    return Math.floor(currentMatchIndex / aiTeams.length) + 1;
  }

  function generateMatchNarrative(favoriteName, underdogName, favoriteWins) {
    const earlyLines = [
      (f, u) => `${f} ambil early advantage di lane atas!`,
      (f, u) => `${f} rotasi cepat amanin Turtle pertama!`,
      (f, u) => `${f} menang farming dari lawan ${u}!`,
      (f, u) => `Team fight pertama dimenangin ${f} telak!`,
      (f, u) => `${f} menang gold jauh di menit-menit awal!`,
      (f, u) => `${f} dapet First Blood duluan!`,
    ];
    const midLines = [
      (f, u) => `${f} terus tekan, ${u} kesusahan nahan rotasi!`,
      (f, u) => ` blunder dari ${u} membuat keuntungan free lord untuk ${f}`,
      (f, u) => `Splitpush ${f} bikin ${u} kesusahan jaga map!`,
      (f, u) => `${u} mencoba comeback tapi ${f} masih bisa pegang kendali!`,
      (f, u) => `${f} unggul jauh objective control yang bagus`,
      (f, u) => `${u} memenangkan kontes lord memaksa ${f} untuk melakukan defense`,

    ];
    const closingLinesWin = [
      (f, u) => `${f} tutup game dengan clean sweep, ${u} bertekuk lutut!`,
      (f, u) => `pembantai oleh ${f} membuat ${u} bertekuk lutut`,
      (f, u) => `${u}mencoba melakukan defense lord, tapi langsung di end oleh${f}`,
      (f, u) => `${u} coba all-in death ball tapi telat, ${f} udah merebut kemenangan!`,
      (f, u) => `${u} wiped out ${f} langsung one straight push mid dan melakukan end game`,
    ];
    const comebackLines = [
      (f, u) => `Tapi di late game, ${u} COMEBACK dan wipe out ${f} abis-abisan!`,
      (f, u) => `${u} kaiting teamfight krusial, wipe out ${f} momentum langsung balik!`,
      (f, u) => `${u} pull off outplay gila, ${f}, dan balikin keadaan di detik-detik akhir!`,
      (f, u) => `${f} lengah di area lord ${u} nyelinap comeback lewat backdoor!`,
      (f, u) => `reverse sweep berkelas yang di lakukan oleh ${f}`,
    ];

    const lines = [];
    const e = [...earlyLines].sort(() => Math.random() - 0.5).slice(0, 2);
    const m = [...midLines].sort(() => Math.random() - 0.5).slice(0, 2);
    lines.push(...e.map((fn) => fn(favoriteName, underdogName)));
    lines.push(...m.map((fn) => fn(favoriteName, underdogName)));

    const closing = favoriteWins
      ? closingLinesWin[randInt(0, closingLinesWin.length - 1)]
      : comebackLines[randInt(0, comebackLines.length - 1)];
    lines.push(closing(favoriteName, underdogName));
    return lines;
  }

  function consumeSimOutcome(fallbackPowerHome, fallbackPowerAway) {
    if (simOutcomeRef.current !== null) {
      const val = simOutcomeRef.current;
      simOutcomeRef.current = null;
      return val;
    }
    let result = fallbackPowerHome + randInt(-12, 12) >= fallbackPowerAway + randInt(-12, 12);
    if (Math.random() < 0.12) result = !result;
    return result;
  }

  function startMatchSimulation(nameHome, nameAway, powerHome, powerAway, actionFn) {
    simTimersRef.current.forEach(clearTimeout);
    simTimersRef.current = [];

    let homeWins = powerHome + randInt(-12, 12) >= powerAway + randInt(-12, 12);
    if (Math.random() < 0.12) homeWins = !homeWins;
    simOutcomeRef.current = homeWins;

    const favoriteIsHome = powerHome >= powerAway;
    const favoriteName = favoriteIsHome ? nameHome : nameAway;
    const underdogName = favoriteIsHome ? nameAway : nameHome;
    const favoriteWins = favoriteIsHome ? homeWins : !homeWins;

    const lines = generateMatchNarrative(favoriteName, underdogName, favoriteWins);
    setSimHomeName(nameHome);
    setSimAwayName(nameAway);
    setSimCommentary([]);
    setPhase("simulating");
    simActionRef.current = actionFn;

    const totalDuration = 8000;
    const stepDuration = totalDuration / (lines.length + 1);
    lines.forEach((line, i) => {
      const t = setTimeout(() => {
        setSimCommentary((prev) => [...prev, line]);
      }, stepDuration * (i + 1));
      simTimersRef.current.push(t);
    });
    const finalTimer = setTimeout(() => {
      if (simActionRef.current) simActionRef.current();
    }, totalDuration);
    simTimersRef.current.push(finalTimer);
  }

  function playRegularGame() {
    const userTeam = getUserTeamObj();
    const opponent = getCurrentOpponent();
           const chemSide = gameMode === "liga1v1" ? activeSide : "A";
    const chemBefore = getChemistryFor(chemSide);
    const chemBonus = getChemistryBonus(chemBefore.streak);
    const opponentForGame = { ...opponent, formation: aiMatchFormation || getAiGameFormation(opponent.formation) };
    const basePowerA = effectivePower(userTeam, opponentForGame) + chemBonus;
    const basePowerB = effectivePower(opponentForGame, userTeam);
    let userWinsGame = consumeSimOutcome(basePowerA, basePowerB);
    updateChemistryFor(chemSide, userTeam.squad, userWinsGame);
    if (gameMode === "career") recordCareerGameStats(userTeam.squad, userWinsGame);

    const winsNeeded = Math.ceil((REGULAR_BEST_OF + 1) / 2);
    const newWins = {
      home: seriesWins.home + (userWinsGame ? 1 : 0),
      away: seriesWins.away + (userWinsGame ? 0 : 1),
    };
    const activeSub = gameMode === "liga1v1" && activeSide === "B" ? teamBSubSlotRole && teamBSub : subSlotRole && userSub;
    const winnerSquad = userWinsGame ? userTeam.squad : opponent.squad;
    const loserSquad = userWinsGame ? opponent.squad : userTeam.squad;
    const winnerNameForGame = userWinsGame ? userTeam.name : opponent.name;
    const loserNameForGame = userWinsGame ? opponent.name : userTeam.name;
    const gameEntry = {
      gameNumber: seriesGameLog.length + 1,
      formationUser: userTeam.formation,
      formationOpp: opponentForGame.formation,
      winner: winnerNameForGame,
      usedSub: !!activeSub,
      playByPlay: generatePlayByPlay(winnerNameForGame, winnerSquad, loserNameForGame, loserSquad),
      mvp: pickGameMVP(winnerSquad),
      chemistryStreak: chemBefore.streak,
      chemistryBonus: chemBonus,
    };
    const newLog = [...seriesGameLog, gameEntry];
    setSeriesWins(newWins);
    setSeriesGameLog(newLog);

    if (newWins.home >= winsNeeded || newWins.away >= winsNeeded) {
      const result = {
        home: userTeam.name,
        away: opponent.name,
        scoreHome: newWins.home,
        scoreAway: newWins.away,
        winner: newWins.home > newWins.away ? userTeam.name : opponent.name,
      };
      setMatchResults([
        ...matchResults,
        {
          result, opponentName: opponent.name, gameLog: newLog,
          userPower: basePowerA, oppPower: basePowerB, formationUsed: userTeam.formation,
          leg: getCurrentLeg(), side: gameMode === "liga1v1" ? activeSide : "A",
          matchMvp: computeSeriesMVP(newLog),
        },
      ]);
      setPhase("matchResult");
    } else {
      setPhase("matchGameResult");
    }
  }

  function continueRegularSeries() {
    setPhase("matchPrep");
  }

  function playABGame() {
    const teamA = getTeamObjForSide("A");
    const teamB = getTeamObjForSide("B");
        const chemAbefore = getChemistryFor("A");
    const chemBbefore = getChemistryFor("B");
    const basePowerA = effectivePower(teamA, teamB) + getChemistryBonus(chemAbefore.streak);
    const basePowerB = effectivePower(teamB, teamA) + getChemistryBonus(chemBbefore.streak);
    let aWinsGame = consumeSimOutcome(basePowerA, basePowerB);
    updateChemistryFor("A", teamA.squad, aWinsGame);
    updateChemistryFor("B", teamB.squad, !aWinsGame);

    const winsNeeded = Math.ceil((REGULAR_BEST_OF + 1) / 2);
    const newWins = {
      home: seriesWins.home + (aWinsGame ? 1 : 0),
      away: seriesWins.away + (aWinsGame ? 0 : 1),
    };
    const winnerSquadAB = aWinsGame ? teamA.squad : teamB.squad;
    const loserSquadAB = aWinsGame ? teamB.squad : teamA.squad;
    const winnerNameAB = aWinsGame ? teamA.name : teamB.name;
    const loserNameAB = aWinsGame ? teamB.name : teamA.name;
    const gameEntry = {
      gameNumber: seriesGameLog.length + 1,
      formationUser: teamA.formation,
      formationOpp: teamB.formation,
      winner: winnerNameAB,
      usedSub: false,
      playByPlay: generatePlayByPlay(winnerNameAB, winnerSquadAB, loserNameAB, loserSquadAB),
      mvp: pickGameMVP(winnerSquadAB),
            chemistryStreak: chemAbefore.streak,
      chemistryBonus: getChemistryBonus(chemAbefore.streak),
    };
    const newLog = [...seriesGameLog, gameEntry];
    setSeriesWins(newWins);
    setSeriesGameLog(newLog);

    if (newWins.home >= winsNeeded || newWins.away >= winsNeeded) {
      const result = {
        home: teamA.name, away: teamB.name,
        scoreHome: newWins.home, scoreAway: newWins.away,
        winner: newWins.home > newWins.away ? teamA.name : teamB.name,
      };
      setMatchResults([
        ...matchResults,
        {
          result, opponentName: teamB.name, gameLog: newLog,
          userPower: basePowerA, oppPower: basePowerB, formationUsed: teamA.formation,
          leg: matchQueue[queueIndex]?.leg || 1, side: "AB",
          matchMvp: computeSeriesMVP(newLog),
        },
      ]);
      setActiveSide("A");
      setPhase("matchResult");
    } else {
      setActiveSide("A");
      setPhase("abMetaA");
    }
  }

  function nextMatch() {
    if (gameMode === "career") advanceInjuries();
    setSeriesWins({ home: 0, away: 0 });
    setSeriesGameLog([]);
    if (gameMode === "liga1v1") {
      if (queueIndex + 1 < matchQueue.length) {
        const nextIdx = queueIndex + 1;
        setQueueIndex(nextIdx);
        const entry = matchQueue[nextIdx];
        if (entry.kind === "AB") {
          setActiveSide("A");
          setPhase("abMetaA");
        } else {
          setActiveSide(entry.side);
          setPhase("matchPrep");
        }
      } else {
        finalizeRegularSeason();
      }
      return;
    }
    if (currentMatchIndex + 1 < aiTeams.length * TOTAL_LEGS) {
      setCurrentMatchIndex(currentMatchIndex + 1);
      setPhase("matchPrep");
    } else {
      finalizeRegularSeason();
    }
  }

  function finalizeRegularSeason() {
    const allTeams = gameMode === "liga1v1"
      ? [getTeamObjForSide("A"), ...aiTeams]
      : [getUserTeamObj(), ...aiTeams];
    const userResults = matchResults.map((m) => m.result);
    const allResults = [...userResults, ...aiVsAiResults];

    const standings = {};
    allTeams.forEach((t) => {
      standings[t.name] = { name: t.name, isUser: !!t.isUser, squad: t.squad, formation: t.formation, w: 0, l: 0, gf: 0, ga: 0, pts: 0 };
    });
    allResults.forEach((r) => {
      standings[r.home].gf += r.scoreHome;
      standings[r.home].ga += r.scoreAway;
      standings[r.away].gf += r.scoreAway;
      standings[r.away].ga += r.scoreHome;
      if (r.winner === r.home) {
        standings[r.home].w += 1;
        standings[r.away].l += 1;
        standings[r.home].pts += 3;
      } else {
        standings[r.away].w += 1;
        standings[r.home].l += 1;
        standings[r.away].pts += 3;
      }
    });
    const table = Object.values(standings).sort(
      (a, b) => b.pts - a.pts || b.gf - b.ga - (a.gf - a.ga)
    );

    setSeason({ teams: allTeams, results: allResults, table });
    setPhase("standings");
  }

  function getPlayoffMatch(stage, seeds, bracketObj) {
    switch (stage) {
      case "m1": return { home: seeds[2], away: seeds[5] };
      case "m2": return { home: seeds[3], away: seeds[4] };
      case "m3": return { home: seeds[0], away: bracketObj.m1 };
      case "m4": return { home: seeds[1], away: bracketObj.m2 };
      case "m5": return { home: bracketObj.m3_loser, away: bracketObj.m4_loser };
      case "m6": return { home: bracketObj.m3, away: bracketObj.m4 };
      case "m7": return { home: bracketObj.m6_loser, away: bracketObj.m5 };
      case "m8": return { home: bracketObj.m6, away: bracketObj.m7 };
      default: return null;
    }
  }

  function playPlayoffGame(home, away, stage) {
    const bo = PLAYOFF_BEST_OF[stage];
    return bo ? simulateSeries(home, away, bo) : simulateMatch(home, away);
  }

  function resolveStage(stage, seeds, bracketObj) {
    const match = { ...getPlayoffMatch(stage, seeds, bracketObj), roundLabel: PLAYOFF_LABELS[stage] };
    setPlayoffStage(stage);
    setPendingPlayoffMatch(match);
    if (match.home.isUser || match.away.isUser) {
      setSeriesWins({ home: 0, away: 0 });
      setSeriesGameLog([]);
      setPhase("playoffPrep");
    } else {
      const result = playPlayoffGame(match.home, match.away, stage);
      const winnerTeam = result.winner === match.home.name ? match.home : match.away;
      const loserTeam = result.winner === match.home.name ? match.away : match.home;
      const logEntry = { roundLabel: match.roundLabel, result, interactive: false };
      setPlayoffLog((prev) => [...prev, logEntry]);
      setPendingAdvance({ stage, winnerTeam, loserTeam, bracketObj });
      setPhase("playoffResult");
    }
  }

  function startPlayoffs() {
    const seeds = season.table.slice(0, 6).map((row) => season.teams.find((t) => t.name === row.name));
    setPlayoffSeeds(seeds);
    setBracket({});
    setPlayoffLog([]);
    resolveStage("m1", seeds, {});
  }

  function playPlayoffGameSingle() {
    const match = pendingPlayoffMatch;
    const userIsHome = match.home.isUser;
    const home = userIsHome ? getUserTeamObj() : match.home;
    const away = userIsHome ? match.away : getUserTeamObj();
    const bo = PLAYOFF_BEST_OF[playoffStage];
    const winsNeeded = Math.ceil((bo + 1) / 2);

       const chemSide = gameMode === "liga1v1" ? activeSide : "A";
    const chemBefore = getChemistryFor(chemSide);
    const chemBonus = getChemistryBonus(chemBefore.streak);
    const homeForGame = userIsHome ? home : { ...home, formation: aiMatchFormation || getAiGameFormation(home.formation) };
    const awayForGame = userIsHome ? { ...away, formation: aiMatchFormation || getAiGameFormation(away.formation) } : away;
    const basePowerHome = effectivePower(homeForGame, awayForGame) + (userIsHome ? chemBonus : 0);
    const basePowerAway = effectivePower(awayForGame, homeForGame) + (!userIsHome ? chemBonus : 0);
    let homeWinsGame = consumeSimOutcome(basePowerHome, basePowerAway);
    const userWonThisGame = userIsHome ? homeWinsGame : !homeWinsGame;
    updateChemistryFor(chemSide, userIsHome ? home.squad : away.squad, userWonThisGame);
    if (gameMode === "career") recordCareerGameStats(userIsHome ? home.squad : away.squad, userWonThisGame);

    const newWins = {
      home: seriesWins.home + (homeWinsGame ? 1 : 0),
      away: seriesWins.away + (homeWinsGame ? 0 : 1),
    };
    const winnerSquadPO = homeWinsGame ? home.squad : away.squad;
    const loserSquadPO = homeWinsGame ? away.squad : home.squad;
    const winnerNamePO = homeWinsGame ? home.name : away.name;
    const loserNamePO = homeWinsGame ? away.name : home.name;
    const gameEntry = {
      gameNumber: seriesGameLog.length + 1,
      formationHome: homeForGame.formation,
      formationAway: awayForGame.formation,
      winner: winnerNamePO,
      usedSub: !!subSlotRole && !!userSub,
      playByPlay: generatePlayByPlay(winnerNamePO, winnerSquadPO, loserNamePO, loserSquadPO),
      mvp: pickGameMVP(winnerSquadPO),
            chemistryStreak: chemBefore.streak,
      chemistryBonus: chemBonus,
    };
    const newLog = [...seriesGameLog, gameEntry];
    setSeriesWins(newWins);
    setSeriesGameLog(newLog);

    if (newWins.home >= winsNeeded || newWins.away >= winsNeeded) {
      const result = {
        home: home.name, away: away.name,
        scoreHome: newWins.home, scoreAway: newWins.away,
        winner: newWins.home > newWins.away ? home.name : away.name,
        bestOf: bo,
      };
      const winnerTeam = result.winner === home.name ? home : away;
      const loserTeam = result.winner === home.name ? away : home;
      const userTeamObj = userIsHome ? home : away;
      const oppTeamObj = userIsHome ? away : home;
      const userPower = effectivePower(userTeamObj, oppTeamObj);
      const oppPower = effectivePower(oppTeamObj, userTeamObj);
      const logEntry = {
        roundLabel: match.roundLabel, result, interactive: true, opponentName: oppTeamObj.name,
        userPower, oppPower, formationUsed: userTeamObj.formation, gameLog: newLog,
        matchMvp: computeSeriesMVP(newLog),
      };
      setPlayoffLog((prev) => [...prev, logEntry]);
      setPendingAdvance({ stage: playoffStage, winnerTeam, loserTeam, bracketObj: bracket });
      setPhase("playoffResult");
    } else {
      setPhase("playoffGameResult");
    }
  }

  function continuePlayoffSeries() {
    setPhase("playoffPrep");
  }

  function continuePlayoff() {
    const { stage, winnerTeam, loserTeam, bracketObj } = pendingAdvance;
    const newBracket = { ...bracketObj, [stage]: winnerTeam, [`${stage}_loser`]: loserTeam };
    setBracket(newBracket);
    const idx = PLAYOFF_ORDER.indexOf(stage);
    if (idx === PLAYOFF_ORDER.length - 1) {
      setChampionTeam(winnerTeam);
      setPhase("champion");
      return;
    }
    resolveStage(PLAYOFF_ORDER[idx + 1], playoffSeeds, newBracket);
  }

  function processCareerOffseason() {
    const fullRoster = [...userSquad, ...careerBench];
    const totalSalary = fullRoster.reduce((sum, p) => sum + getPlayerSalary(p.rating), 0);

    const changes = fullRoster.map((p) => {
      const stat = careerStats[p.id];
      let delta;
      if (!stat || stat.played === 0) delta = -1;
      else {
        const wr = stat.won / stat.played;
        if (wr >= 0.65) delta = 3;
        else if (wr >= 0.5) delta = 2;
        else if (wr >= 0.35) delta = 0;
        else delta = -2;
      }
      const newRating = Math.max(40, Math.min(99, p.rating + delta));
      return { ...p, oldRating: p.rating, newRating, delta, played: stat ? stat.played : 0 };
    });

    const newUserSquad = changes
      .filter((p) => userSquad.some((s) => s.id === p.id))
      .map((p) => ({ id: p.id, name: p.name, role: p.role, rating: p.newRating }));
    const newBench = changes
      .filter((p) => careerBench.some((s) => s.id === p.id))
      .map((p) => ({ id: p.id, name: p.name, role: p.role, rating: p.newRating }));

    const finalName = userTeamName.trim() || "Timku FC";
    const isChamp = !!(championTeam && championTeam.name === finalName);
    const standing = season ? season.table.findIndex((t) => t.name === finalName) + 1 : null;
    const newBudget = careerBudget - totalSalary;

    const logEntry = {
      season: careerSeasonNum, champion: championTeam ? championTeam.name : "-",
      isChamp, standing: standing && standing > 0 ? standing : null, budgetAfter: newBudget, totalSalary,
    };

    setUserSquad(newUserSquad);
    setCareerBench(newBench);
    setCareerBudget(newBudget);
    setCareerDynastyLog((prev) => [...prev, logEntry]);
    setCareerSeasonSummary({ changes, logEntry });
    setCareerStats({});
    setPhase("careerOffseason");
  }

  function openCareerMarket() {
    setCareerMarket(generateCareerMarket());
    setPhase("careerMarket");
  }

  function buyCareerPlayer(marketPlayer) {
    if (careerBudget < marketPlayer.price) return;
    if (careerBench.length >= 2) return;
    setCareerBudget(careerBudget - marketPlayer.price);
    setCareerBench([...careerBench, { id: marketPlayer.id, name: marketPlayer.name, role: marketPlayer.role, rating: marketPlayer.rating }]);
    setCareerMarket(careerMarket.filter((p) => p.id !== marketPlayer.id));
  }

  function sellCareerPlayer(playerId, fromBench) {
    const rosterSize = userSquad.length + careerBench.length;
    if (rosterSize <= 5) return;
    const source = fromBench ? careerBench : userSquad;
    const player = source.find((p) => p.id === playerId);
    if (!player) return;
    if (!fromBench) {
      if (careerBench.length === 0) return;
      const replacement = careerBench[0];
      setUserSquad(userSquad.map((p) => (p.id === playerId ? { ...replacement, role: p.role } : p)));
      setCareerBench(careerBench.slice(1));
    } else {
      setCareerBench(careerBench.filter((p) => p.id !== playerId));
    }
    setCareerBudget(careerBudget + Math.round(getPlayerPrice(player.rating) * CAREER_SELL_FACTOR));
    setCareerBenchAssign((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((role) => {
        if (next[role] === playerId) delete next[role];
      });
      return next;
    });
  }

  function startNextCareerSeason() {
    setCareerSeasonNum((n) => n + 1);
    setCareerBenchAssign({});
    setCareerInjuries({});
    setMatchResults([]);
    setAiVsAiResults([]);
    setCurrentMatchIndex(0);
    setPlayoffSeeds([]);
    setPlayoffStage("m1");
    setBracket({});
    setPlayoffLog([]);
    setPendingPlayoffMatch(null);
    setPendingAdvance(null);
    setChampionTeam(null);
    setSeason(null);
    setSeriesWins({ home: 0, away: 0 });
    setSeriesGameLog([]);
    setChemistry({ signature: null, streak: 0 });
    setCareerSeasonSummary(null);

    let workingPool = generatePool();
    const pureAiTeams = [];
    TEAM_NAMES.forEach((name) => {
      const t = generateAiTeam(workingPool, name);
      workingPool = t.pool;
      pureAiTeams.push({ name: t.name, squad: t.squad, formation: t.formation });
    });
    setAiTeams(pureAiTeams);
    const fixturesLeg1 = roundRobinSchedule(pureAiTeams);
    const fixturesLeg2 = fixturesLeg1.map(([a, b]) => [b, a]);
    setAiVsAiResults([...fixturesLeg1, ...fixturesLeg2].map(([a, b]) => simulateMatch(a, b)));
    setPhase("matchPrep");
  }


  return (
    <div className="ldm-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        html, body, #root {
          margin: 0; padding: 0; min-height: 100%; height: 100%;
          background: #060811;
        }
        .ldm-page * { box-sizing: border-box; }
        .ldm-page {
          min-height: 100vh; width: 100%; color: #E5E9F0; display: flex; flex-direction: column;
          align-items: center; padding: 24px 16px; font-family: 'Inter', sans-serif;
          background:
            radial-gradient(1200px 600px at 50% -10%, #182240 0%, #0A0E1A 55%, #060811 100%),
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.035) 1px, transparent 0);
          background-size: auto, 26px 26px;
        }
        .ldm-container { width: 100%; max-width: 720px; }
        .ldm-header { margin-bottom: 24px; margin-top: 8px; }
        .ldm-header-row { display: flex; align-items: center; gap: 8px; }
        .ldm-icon-box { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 12px; background: rgba(251,191,36,0.14); flex-shrink: 0; }
        .ldm-title { font-family: 'Rajdhani', sans-serif; font-size: 30px; font-weight: 700; letter-spacing: 0.02em; color: #FFFFFF; margin: 0; }
        .ldm-subtitle-row { display: flex; align-items: center; gap: 8px; margin-top: 8px; margin-left: 4px; }
        .ldm-subtitle-bar { height: 4px; width: 40px; border-radius: 999px; background: #22D3EE; }
        .ldm-subtitle-text { font-size: 12px; color: #94A3B8; }
        .ldm-card { border-radius: 16px; padding: 24px; border: 1px solid rgba(255,255,255,0.08); background: rgba(19,24,41,0.9); box-shadow: 0 10px 40px rgba(0,0,0,0.35); }
        .ldm-text { color: #CBD5E1; line-height: 1.6; margin-bottom: 16px; }
        .ldm-text-small { font-size: 12px; color: #64748B; line-height: 1.6; margin-bottom: 20px; }
        .ldm-label { display: block; font-size: 14px; margin-bottom: 6px; font-weight: 500; color: #94A3B8; }
        .ldm-input { width: 100%; margin-bottom: 20px; border-radius: 12px; padding: 0 16px; font-size: 20px; font-family: 'Rajdhani', sans-serif; font-weight: 700; outline: none; border: 1px solid rgba(255,255,255,0.1); color: #fff; background: #0F1424; height: 68px; transition: border-color .15s; display: block; }
        .ldm-input:focus { border-color: #22D3EE; }
        .ldm-input::placeholder { color: #475569; }
        .ldm-formation-grid { display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 24px; }
        @media (min-width: 640px) { .ldm-formation-grid { grid-template-columns: 1fr 1fr; } }
        .ldm-formation-card { text-align: left; border-radius: 16px; padding: 16px; display: flex; gap: 16px; align-items: center; transition: all .15s ease; cursor: pointer; width: 100%; }
        .ldm-formation-key-col { display: flex; flex-direction: column; align-items: center; justify-content: center; flex-shrink: 0; width: 64px; }
        .ldm-formation-key { font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 22px; line-height: 1; }
        .ldm-formation-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.03em; margin-top: 4px; text-align: center; }
        .ldm-formation-lines { display: flex; flex-direction: column; gap: 6px; margin-bottom: 10px; }
        .ldm-formation-line { display: flex; align-items: center; gap: 6px; }
        .ldm-dot { width: 20px; height: 20px; border-radius: 999px; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 700; flex-shrink: 0; color: #0A0E1A; }
        .ldm-formation-desc { font-size: 13px; color: rgba(148,163,184,0.9); line-height: 1.5; }
        .ldm-btn-primary { display: inline-flex; align-items: center; gap: 8px; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 18px; letter-spacing: 0.02em; color: #0A0E1A; padding: 12px 22px; border-radius: 12px; border: none; background: #FBBF24; cursor: pointer; transition: filter .15s; }
        .ldm-btn-primary:hover { filter: brightness(1.1); }
        .ldm-btn-secondary { display: inline-flex; align-items: center; gap: 8px; font-family: 'Rajdhani', sans-serif; font-weight: 700; letter-spacing: 0.02em; padding: 12px 22px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.12); background: #0F1424; color: #E5E9F0; cursor: pointer; transition: filter .15s; }
        .ldm-btn-secondary:hover { filter: brightness(1.25); }
        .ldm-draft-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
        .ldm-draft-pick { display: flex; align-items: center; gap: 8px; color: #94A3B8; font-size: 14px; }
        .ldm-draft-role { font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 20px; letter-spacing: 0.02em; }
        .ldm-formation-note { font-size: 12px; color: #64748B; margin-bottom: 16px; }
        .ldm-reroll-btn { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: #FBBF24; background: rgba(251,191,36,0.1); border: 1px solid rgba(251,191,36,0.3); padding: 5px 10px; border-radius: 999px; transition: filter .15s; }
        .ldm-map-wrap { display: flex; gap: 16px; flex-wrap: wrap; }
        .ldm-map-board { flex: 1; min-width: 260px; display: flex; flex-direction: column; gap: 10px; background: #0a1730; border-radius: 12px; padding: 12px; }
        .ldm-map-zone { border: 1px dashed rgba(255,255,255,0.12); border-radius: 10px; padding: 10px; min-height: 74px; }
        .ldm-map-zone-label { font-size: 10px; letter-spacing: 0.08em; color: #64748B; font-weight: 700; }
        .ldm-map-zone-slots { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 6px; }
        .ldm-map-slot { position: relative; width: 96px; border: 1.5px solid; border-radius: 10px; background: #12213d; padding: 8px 6px 6px; text-align: center; transition: transform .12s, box-shadow .12s, border-color .12s; }
        .ldm-map-slot:hover { transform: translateY(-2px); }
        .ldm-map-slot-target { cursor: pointer; border-color: #FBBF24 !important; box-shadow: 0 0 0 2px rgba(251,191,36,0.35); animation: ldm-pulse 1.1s ease-in-out infinite; }
        .ldm-map-slot-zonepick { position: absolute; top: 3px; right: 3px; display: flex; gap: 2px; }
        .ldm-zone-btn { width: 20px; height: 20px; border-radius: 5px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.05); color: #7C8797; font-size: 10px; font-weight: 700; line-height: 1; cursor: pointer; padding: 0; touch-action: manipulation; }
        .ldm-zone-btn-active { background: #FBBF24; border-color: #FBBF24; color: #12213d; }
        @media (max-width: 480px) { .ldm-zone-btn { width: 24px; height: 24px; font-size: 11px; } }
        @keyframes ldm-pulse { 0%, 100% { box-shadow: 0 0 0 2px rgba(251,191,36,0.35); } 50% { box-shadow: 0 0 0 4px rgba(251,191,36,0.15); } }
        .ldm-map-slot-dot { width: 24px; height: 24px; border-radius: 50%; margin: 0 auto 4px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #0a1730; }
        .ldm-map-slot-role { font-size: 9px; color: #7C8797; font-weight: 700; }
        .ldm-map-slot-name { font-size: 12px; color: #E5E9F0; font-weight: 500; margin-top: 2px; }
        .ldm-map-slot-clear { margin-top: 4px; font-size: 9px; color: #FBBF24; background: none; border: none; cursor: pointer; text-decoration: underline; padding: 0; }
        .ldm-bench-rail { width: 240px; }
        .ldm-pcard-grid { display: flex; flex-wrap: wrap; gap: 10px; }
        .ldm-pcard { position: relative; width: 96px; border-radius: 12px; overflow: hidden; background: #12213d; box-shadow: 0 0 0 1px rgba(255,255,255,0.06); transition: transform .12s, box-shadow .12s; }
        .ldm-pcard-draggable { cursor: pointer; }
        .ldm-pcard-draggable:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 4px 12px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.12); }
        .ldm-pcard-selected { box-shadow: 0 0 0 2px #FBBF24, 0 4px 12px rgba(0,0,0,0.35) !important; transform: translateY(-3px) scale(1.03); }
        .ldm-pcard-active { opacity: 0.55; cursor: default; }
        .ldm-pcard-top { padding: 6px 6px 0; display: flex; justify-content: space-between; align-items: flex-start; }
        .ldm-pcard-badge { width: 24px; height: 26px; background: #c9ced6; clip-path: polygon(0 0,100% 0,100% 70%,50% 100%,0 70%); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: #12213d; }
        .ldm-pcard-role { font-size: 8px; font-weight: 700; letter-spacing: 0.05em; }
        .ldm-pcard-avatar { width: 44px; height: 44px; border-radius: 50%; background: #1d3358; margin: 4px auto; }
        .ldm-pcard-bottom { background: #0a1730; padding: 6px 4px 8px; text-align: center; }
        .ldm-pcard-name { font-size: 10px; color: #fff; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .ldm-pcard-tag { font-size: 8px; font-weight: 700; }
        .ldm-reroll-btn:hover:not(:disabled) { filter: brightness(1.2); }
        .ldm-sim-dot { width: 8px; height: 8px; border-radius: 50%; background: #FBBF24; display: inline-block; animation: ldm-sim-bounce 1s infinite ease-in-out; }
        .ldm-counter-badge { display: inline-block; margin-top: 4px; font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 4px; letter-spacing: 0.02em; }
        .ldm-counter-good { color: #34D399; background: rgba(52,211,153,0.14); }
        .ldm-counter-bad { color: #FB7185; background: rgba(251,113,133,0.14); }
        @keyframes ldm-sim-bounce { 0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); } 40% { opacity: 1; transform: scale(1.2); } }
        .ldm-sim-line { animation: ldm-sim-fadein .35s ease-out; }
        @keyframes ldm-sim-fadein { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .ldm-player-grid { display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 24px; }
        @media (min-width: 640px) { .ldm-player-grid { grid-template-columns: 1fr 1fr 1fr; } }
        .ldm-player-btn { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; border-radius: 16px; padding: 24px; border-width: 2px; border-style: solid; background: #0F1424; cursor: pointer; transition: all .15s; min-height: 220px; width: 100%; }
        .ldm-player-btn:hover { filter: brightness(1.1); transform: scale(1.02); }
        .ldm-player-name { font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 28px; color: #fff; margin-top: 16px; margin-bottom: 12px; line-height: 1.2; }
        .ldm-player-rating { display: flex; align-items: center; gap: 8px; font-size: 18px; font-weight: 700; color: #FBBF24; }
        .ldm-tag { font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; font-family: 'Rajdhani', sans-serif; letter-spacing: 0.02em; display: inline-block; }
        .ldm-squad-label { font-size: 12px; color: #64748B; margin-bottom: 8px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.03em; }
        .ldm-squad-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .ldm-squad-chip { display: flex; align-items: center; gap: 6px; font-size: 12px; border-radius: 999px; padding: 4px 12px 4px 4px; border: 1px solid rgba(255,255,255,0.08); background: #0F1424; }
        .ldm-squad-name { color: #E2E8F0; font-weight: 500; }
        .ldm-squad-rating { color: #64748B; }
        .ldm-trophy-card { border-radius: 16px; padding: 24px; display: flex; align-items: center; gap: 16px; border: 1px solid rgba(251,191,36,0.4); background: linear-gradient(135deg, rgba(251,191,36,0.16), rgba(19,24,41,0.4)); box-shadow: 0 8px 30px rgba(251,191,36,0.08); position: relative; overflow: hidden; margin-bottom: 20px; }
        .ldm-trophy-glow-bg { position: absolute; right: -32px; top: -32px; width: 128px; height: 128px; border-radius: 999px; opacity: 0.2; filter: blur(24px); background: #FBBF24; }
        .ldm-trophy-icon { display: flex; align-items: center; justify-content: center; width: 64px; height: 64px; border-radius: 16px; flex-shrink: 0; position: relative; background: rgba(251,191,36,0.16); animation: trophyGlow 2.4s ease-in-out infinite; }
        .ldm-trophy-label { font-size: 12px; color: #94A3B8; font-weight: 500; text-transform: uppercase; letter-spacing: 0.03em; }
        .ldm-trophy-name { font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 24px; color: #fff; }
        .ldm-trophy-sub { font-size: 14px; color: #94A3B8; }
        .ldm-standings-card { border-radius: 16px; border: 1px solid rgba(255,255,255,0.08); background: rgba(19,24,41,0.9); overflow: hidden; margin-bottom: 20px; }
        .ldm-tabs { display: flex; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .ldm-tab { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 16px; font-size: 14px; font-family: 'Rajdhani', sans-serif; font-weight: 700; letter-spacing: 0.02em; background: none; border: none; cursor: pointer; border-bottom: 2px solid transparent; }
        .ldm-table { width: 100%; font-size: 14px; border-collapse: collapse; }
        .ldm-table th { text-align: left; font-size: 12px; color: #64748B; font-weight: 500; padding: 10px 16px; }
        .ldm-table th.center, .ldm-table td.center { text-align: center; }
        .ldm-table td { padding: 10px 16px; border-top: 1px solid rgba(255,255,255,0.06); }
        .ldm-table tbody tr:hover td { background: rgba(255,255,255,0.03); }
        .ldm-match-grid { padding: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        @media (min-width: 640px) { .ldm-match-grid { grid-template-columns: 1fr 1fr 1fr; } }
        .ldm-match-card { font-size: 13px; border-radius: 8px; padding: 10px 12px; display: flex; flex-direction: column; align-items: center; gap: 4px; border: 1px solid rgba(255,255,255,0.06); background: #0F1424; transition: filter .15s; }
        .ldm-match-card:hover { filter: brightness(1.1); }
        .ldm-match-team { text-align: center; line-height: 1.3; color: #CBD5E1; width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .ldm-match-score { font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 16px; color: #FBBF24; }
        @keyframes trophyGlow {
          0%, 100% { box-shadow: 0 0 0 rgba(251,191,36,0.0); }
          50% { box-shadow: 0 0 24px rgba(251,191,36,0.35); }
        }
      `}</style>

      <div className="ldm-container">
        <header className="ldm-header">
          <div className="ldm-header-row">
            <div className="ldm-icon-box">
              <img src={LOGO_DATA_URI} alt="Logo" style={{ width: "28px", height: "28px", objectFit: "contain" }} />
            </div>
            <h1 className="ldm-title">ML DRAFTLINE</h1>
          </div>
          <div className="ldm-subtitle-row">
            <div className="ldm-subtitle-bar" />
            <span className="ldm-subtitle-text">ALL-STAR MPL ID S1-18</span>

{phase ==="modeSelect" && (
             <p style={{ marginTop: "10px", maxWidth:"520px", fontSize: "13px", fontWeight: 400, lineHeight: 1.6, color:"#94A3B8" }}>
               Membuat dream team mpl id all time dan di bisa di mainkan melawan AI ataupun teman
              Rating/OVR player bedasarkan prestasi dan lamanya player bermain di mpl id</p>
)}
                    
          </div>
        </header>

        
        {phase === "simulating" && (
          <div className="ldm-card">
            <div className="ldm-draft-header">
              <div className="ldm-draft-pick">
                <Swords className="w-4 h-4" />
                <span>MATCH BERLANGSUNG...</span>
              </div>
            </div>
          

            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <span style={{ fontSize: "15px", fontWeight: 700, color: "#E5E9F0" }}>{simHomeName}</span>
              <span style={{ fontSize: "13px", color: "#64748B", margin: "0 10px" }}>VS</span>
              <span style={{ fontSize: "15px", fontWeight: 700, color: "#E5E9F0" }}>{simAwayName}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginBottom: "20px" }}>
              <span className="ldm-sim-dot" style={{ animationDelay: "0s" }} />
              <span className="ldm-sim-dot" style={{ animationDelay: "0.2s" }} />
              <span className="ldm-sim-dot" style={{ animationDelay: "0.4s" }} />
            </div>

            <div style={{ background: "#0F1424", borderRadius: "14px", padding: "16px", border: "1px solid rgba(255,255,255,0.08)", minHeight: "160px" }}>
              <div className="ldm-squad-label" style={{ marginBottom: "10px" }}>Play-by-Play</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {simCommentary.length === 0 && (
                  <div style={{ fontSize: "12px", color: "#64748B" }}>Kick-off...</div>
                )}
                {simCommentary.map((line, i) => (
                  <div
                    key={i}
                    className="ldm-sim-line"
                    style={{
                      fontSize: "12px", color: "#CBD5E1", background: "#141A2E",
                      borderRadius: "8px", padding: "8px 12px", border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {phase === "modeSelect" && (
          <div className="ldm-card">
            <p className="ldm-text">Pilih Mode</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button onClick={() => chooseMode("solo")} className="ldm-formation-card" style={{ border: "2px solid rgba(139,92,246,0.4)", background: "#0F1424" }}>
                <div style={{ textAlign: "left" }}>
                  <div className="ldm-formation-key" style={{ color: "#8B5CF6" }}>SOLO VS AI</div>
                  <div className="ldm-formation-desc">Draft 1 tim, main liga & playoff lawan 9 tim AI kayak biasa.</div>
                </div>
              </button>
              <button onClick={() => chooseMode("liga1v1")} className="ldm-formation-card" style={{ border: "2px solid rgba(34,211,238,0.4)", background: "#0F1424" }}>
                <div style={{ textAlign: "left" }}>
                  <div className="ldm-formation-key" style={{ color: "#22D3EE" }}>1V1 LIGA </div>
                  <div className="ldm-formation-desc">
                    Kamu (Tim A) & Tim B gantian milih pemain satu-satu waktu draft, abis itu dua-duanya
                    langsung main bareng di 1 liga yang sama lawan 9 tim AI lainnya.
                  </div>
                </div>
              </button>
              <button onClick={() => chooseMode("direct1v1")} className="ldm-formation-card" style={{ border: "2px solid rgba(251,191,36,0.4)", background: "#0F1424" }}>
                <div style={{ textAlign: "left" }}>
                  <div className="ldm-formation-key" style={{ color: "#FBBF24" }}>1V1</div>
                  <div className="ldm-formation-desc">
                    Tim A & Tim B draft skuad masing-masing (gantian device), abis itu langsung diadu Bo3
                    head-to-head, nggak ada AI.
                  </div>
                </div>
              </button>
              <button onClick={() => chooseMode("career")} className="ldm-formation-card" style={{ border: "2px solid rgba(52,211,153,0.4)", background: "#0F1424" }}>
                <div style={{ textAlign: "left" }}>
                  <div className="ldm-formation-key" style={{ color: "#34D399" }}>MODE KARIR</div>
                  <div className="ldm-formation-desc">
                    Jadi manajer dinasti multi-musim: skuad kepake terus musim demi musim, pemain naik/turun rating
                    sesuai performa, ada 2 pemain cadangan, cedera, gaji, dan transfer market pake Rupiah.
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {phase === "intro" && (
          <div className="ldm-card">
            {gameMode && gameMode !== "solo" && (
            <div style={{ fontSize: "12px", color: "#FBBF24", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.03em", marginBottom: "10px" }}>
              Giliran {draftingTeam === "A" ? "Tim A" : "Tim B"}
              </div>
            )}
            <p className="ldm-text">

               Menjadi coach tim MPL ID dengan draft 5 pemain (Jungler, Mid, Gold, Exp, Roamer) satu per satu dari player acak yang pernah
              Bermain di MPL ID S1-S18
            </p>

            <label className="ldm-label">{(gameMode === "liga1v1" || gameMode === "direct1v1") ? "Nama Tim A (kamu)" : "Nama timmu"}</label>
            <input
              value={userTeamName}
              onChange={(e) => setUserTeamName(e.target.value)}
              placeholder="Timku FC"
              className="ldm-input"
              maxLength={24}
            />

            {(gameMode === "liga1v1" || gameMode === "direct1v1") && (
              <>
                <label className="ldm-label">Nama Tim B</label>
                <input
                  value={teamBName}
                  onChange={(e) => setTeamBName(e.target.value)}
                  placeholder="Tim B"
                  className="ldm-input"
                  maxLength={24}
                />
              </>
            )}

            {gameMode === "direct1v1" && (
              <>
                <label className="ldm-label">Pilih Best of (jumlah game per match)</label>
                <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
                  {[3, 5, 7].map((bo) => (
                    <button
                      key={bo}
                      onClick={() => setDuelBestOf(bo)}
                      style={{
                        flex: 1, textAlign: "center", padding: "14px 8px", borderRadius: "12px", cursor: "pointer",
                        border: `2px solid ${duelBestOf === bo ? "#FBBF24" : "rgba(255,255,255,0.06)"}`,
                        background: duelBestOf === bo ? "rgba(251,191,36,0.12)" : "#0F1424",
                      }}
                    >
                      <span className="ldm-formation-key" style={{ color: duelBestOf === bo ? "#FBBF24" : "#E5E9F0" }}>
                        Bo{bo}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {gameMode === "solo" && (
              <>
                <label className="ldm-label">Pilih Meta</label>
                <div className="ldm-formation-grid">
                  {FORMATION_KEYS.map((key) => {
                    const f = FORMATIONS[key];
                    const active = formation === key;
                    const lineOrder = ["Depan", "Tengah", "Belakang"];
                    const grouped = { Depan: [], Tengah: [], Belakang: [] };
                    ROLES.forEach((r) => grouped[f.lines[r]]?.push(r));
                    return (
                      <button
                        key={key}
                        onClick={() => setFormation(key)}
                        className="ldm-formation-card"
                        style={{
                          border: `2px solid ${active ? f.accent : "rgba(255,255,255,0.06)"}`,
                          background: active ? f.accent + "14" : "#0F1424",
                        }}
                      >
                        <div className="ldm-formation-key-col">
                          <span className="ldm-formation-key" style={{ color: active ? f.accent : "#E5E9F0" }}>
                            {key}
                          </span>
                          <span className="ldm-formation-label" style={{ color: active ? f.accent : "#7C8797" }}>
                            {f.label}
                          </span>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="ldm-formation-lines">
                            {lineOrder.map((line) => (
                              <div key={line} className="ldm-formation-line">
                                {grouped[line].map((r) => (
                                  <div key={r} title={r} className="ldm-dot" style={{ background: ROLE_STYLE[r].accent }}>
                                    {ROLE_STYLE[r].label[0]}
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                          <div className="ldm-formation-desc">{f.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            <button onClick={beginDraftPhase} className="ldm-btn-primary">
              MULAI DRAFT <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {phase === "draft" && (
          <div className="ldm-card">
            {(gameMode === "liga1v1" || gameMode === "direct1v1") && (
              <div style={{ fontSize: "12px", color: draftingTeam === "A" ? "#8B5CF6" : "#22D3EE", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.03em", marginBottom: "10px" }}>
                Giliran {draftingTeam === "A" ? (userTeamName.trim() || "Tim A") : (teamBName.trim() || "Tim B")} milih pemain
              </div>
            )}
            <div className="ldm-draft-header">
              <div className="ldm-draft-pick">
                <Users className="w-4 h-4" />
                <span>PICK {roleIndex + 1} / {ROLES.length}</span>
              </div>
              <span className="ldm-draft-role" style={{ color: ROLE_STYLE[ROLES[roleIndex]].accent }}>
                {ROLES[roleIndex]}
              </span>
            </div>
            <div className="ldm-formation-note" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
              <span>
                Formasi: <strong style={{ color: "#CBD5E1" }}>{formation}</strong> — {FORMATIONS[formation].label}
              </span>
              <button
                onClick={rerollCandidates}
                disabled={((gameMode === "liga1v1" || gameMode === "direct1v1") && draftingTeam === "B" ? rerollsLeftB : rerollsLeft) <= 0}
                className="ldm-reroll-btn"
                style={{ opacity: ((gameMode === "liga1v1" || gameMode === "direct1v1") && draftingTeam === "B" ? rerollsLeftB : rerollsLeft) <= 0 ? 0.4 : 1, cursor: ((gameMode === "liga1v1" || gameMode === "direct1v1") && draftingTeam === "B" ? rerollsLeftB : rerollsLeft) <= 0 ? "not-allowed" : "pointer" }}
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reroll Player ({(gameMode === "liga1v1" || gameMode === "direct1v1") && draftingTeam === "B" ? rerollsLeftB : rerollsLeft} tersisa)
              </button>
            </div>

            <div className="ldm-player-grid">
              {candidates.map((p) => {
                const s = ROLE_STYLE[p.role];
                return (
                  <button
                    key={p.id}
                    onClick={() => pickPlayer(p)}
                    className="ldm-player-btn"
                    style={{ borderColor: s.accent + "66" }}
                  >
                    <RoleTag role={p.role} />
                    <div className="ldm-player-name">{p.name}</div>
                    <div className="ldm-player-rating">
                      <Star className="w-5 h-5" /> {p.rating} OVR
                    </div>
                  </button>
                );
              })}
            </div>

            {userSquad.length > 0 && (
              <div>
                <div className="ldm-squad-label">{(gameMode === "liga1v1" || gameMode === "direct1v1") ? `Squad ${userTeamName.trim() || "Tim A"}` : "Squad sejauh ini"}</div>
                <div className="ldm-squad-list">
                  {userSquad.map((p) => (
                    <span key={p.id} className="ldm-squad-chip">
                      <RoleTag role={p.role} />
                      <span className="ldm-squad-name">{p.name}</span>
                      <span className="ldm-squad-rating">{p.rating}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {(gameMode === "liga1v1" || gameMode === "direct1v1") && teamBSquad.length > 0 && (
              <div style={{ marginTop: "14px" }}>
                <div className="ldm-squad-label">Squad {teamBName.trim() || "Tim B"}</div>
                <div className="ldm-squad-list">
                  {teamBSquad.map((p) => (
                    <span key={p.id} className="ldm-squad-chip">
                      <RoleTag role={p.role} />
                      <span className="ldm-squad-name">{p.name}</span>
                      <span className="ldm-squad-rating">{p.rating}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {phase === "draftSub" && (
          <div className="ldm-card">
            {gameMode === "career" && (
              <div style={{ fontSize: "12px", color: "#34D399", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.03em", marginBottom: "10px" }}>
                Pemain Cadangan {careerBench.length + 1} dari 2
              </div>
            )}
            {(gameMode === "liga1v1" || gameMode === "direct1v1") && (
              <div style={{ fontSize: "12px", color: draftingTeam === "A" ? "#8B5CF6" : "#22D3EE", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.03em", marginBottom: "10px" }}>
                Giliran {draftingTeam === "A" ? (userTeamName.trim() || "Tim A") : (teamBName.trim() || "Tim B")} milih cadangan
              </div>
            )}
            <div className="ldm-draft-header">
              <div className="ldm-draft-pick">
                <Users className="w-4 h-4" />
                <span>PEMAIN CADANGAN</span>
              </div>
              <button
                onClick={rerollSubCandidates}
                disabled={((gameMode === "liga1v1" || gameMode === "direct1v1") && draftingTeam === "B" ? subRerollsLeftB : subRerollsLeft) <= 0}
                className="ldm-reroll-btn"
                style={{ opacity: ((gameMode === "liga1v1" || gameMode === "direct1v1") && draftingTeam === "B" ? subRerollsLeftB : subRerollsLeft) <= 0 ? 0.4 : 1, cursor: ((gameMode === "liga1v1" || gameMode === "direct1v1") && draftingTeam === "B" ? subRerollsLeftB : subRerollsLeft) <= 0 ? "not-allowed" : "pointer" }}
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reroll Player ({(gameMode === "liga1v1" || gameMode === "direct1v1") && draftingTeam === "B" ? subRerollsLeftB : subRerollsLeft} tersisa)
              </button>
            </div>
            <p className="ldm-text">
              Starting five kamu udah lengkap. Sekarang pilih 1 pemain cadangan — 3 kandidat di bawah
              masing-masing dari role yang beda-beda (acak, hoki-hokian). Setelah dipilih, cadangan ini
              bisa dipasang gantiin starter di role MANAPUN nanti — kalau dipasang di role aslinya OVR-nya
              penuh, kalau di role lain OVR-nya turun.
            </p>

            <div className="ldm-squad-label">
              Squad Starter {(gameMode === "liga1v1" || gameMode === "direct1v1") ? (draftingTeam === "A" ? (userTeamName.trim() || "Tim A") : (teamBName.trim() || "Tim B")) : ""}
            </div>
            <div className="ldm-squad-list" style={{ marginBottom: "20px" }}>
              {((gameMode === "liga1v1" || gameMode === "direct1v1") && draftingTeam === "B" ? teamBSquad : userSquad).map((p) => (
                <span key={p.id} className="ldm-squad-chip">
                  <RoleTag role={p.role} />
                  <span className="ldm-squad-name">{p.name}</span>
                  <span className="ldm-squad-rating">{p.rating}</span>
                </span>
              ))}
            </div>

            <div className="ldm-player-grid">
              {candidates.map((p) => {
                const s = ROLE_STYLE[p.role];
                return (
                  <button
                    key={p.id}
                    onClick={() => pickSubPlayer(p)}
                    className="ldm-player-btn"
                    style={{ borderColor: s.accent + "66" }}
                  >
                    <RoleTag role={p.role} />
                    <div className="ldm-player-name">{p.name}</div>
                    <div className="ldm-player-rating">
                      <Star className="w-5 h-5" /> {p.rating} OVR
                    </div>
                  </button>
                );
              })}
            </div>

            <button onClick={skipSubDraft} className="ldm-btn-secondary">
              {gameMode === "career" ? `LEWATI SISANYA (${careerBench.length}/2 cadangan)` : "LEWATI, MAIN TANPA CADANGAN"}
            </button>
          </div>
        )}

        {phase === "matchPrep" && aiTeams[currentMatchIndex % aiTeams.length] && (
          <div className="ldm-card">
            {gameMode === "career" && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", fontWeight: 700, marginBottom: "10px" }}>
                <span style={{ color: "#34D399", textTransform: "uppercase", letterSpacing: "0.03em" }}>Musim {careerSeasonNum}</span>
                <span style={{ color: "#FBBF24" }}>{formatRupiah(careerBudget)}</span>
              </div>
            )}
            {gameMode === "liga1v1" && (
              <div style={{ fontSize: "12px", color: activeSide === "A" ? "#8B5CF6" : "#22D3EE", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.03em", marginBottom: "10px" }}>
                Giliran {activeSide === "A" ? (userTeamName.trim() || "Tim A") : (teamBName.trim() || "Tim B")} main
              </div>
            )}
            <div className="ldm-draft-header">
              <div className="ldm-draft-pick">
                <Swords className="w-4 h-4" />
                <span>
                  MATCH {gameMode === "liga1v1" ? queueIndex + 1 : currentMatchIndex + 1} / {gameMode === "liga1v1" ? matchQueue.length : aiTeams.length * TOTAL_LEGS} &middot; LEG {getCurrentLeg()}
                </span>
              </div>
              <span className="ldm-draft-role" style={{ color: "#FBBF24" }}>
                vs {getCurrentOpponent().name}
              </span>
            </div>
            <div className="ldm-formation-note">
              GAME {seriesGameLog.length + 1} dari Bo{REGULAR_BEST_OF} &middot; Skor sementara{" "}
              <strong style={{ color: "#FBBF24" }}>{seriesWins.home}–{seriesWins.away}</strong>
            </div>

            <button
              onClick={() => setShowLiveStandings(!showLiveStandings)}
              className="ldm-reroll-btn"
              style={{ color: "#22D3EE", background: "rgba(34,211,238,0.1)", borderColor: "rgba(34,211,238,0.3)", marginTop: "10px" }}
            >
              <Shield className="w-3.5 h-3.5" /> {showLiveStandings ? "Tutup Klasemen" : "Lihat Klasemen Sementara"}
            </button>

            {showLiveStandings && (
              <div style={{ marginTop: "12px", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
                <table className="ldm-table">
                  <thead>
                    <tr>
                      <th>Tim</th>
                      <th className="center">M</th>
                      <th className="center">K</th>
                      <th className="center">GF</th>
                      <th className="center">GA</th>
                      <th className="center">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {computeLiveStandings().map((t, i) => (
                      <tr key={t.name} style={{ background: t.isUser ? "rgba(251,191,36,0.08)" : "transparent" }}>
                        <td style={{ fontWeight: 500, color: t.isUser ? "#FBBF24" : "#E5E9F0" }}>
                          <button
                            onClick={() => setViewingRosterTeam(t)}
                            style={{ background: "none", border: "none", padding: 0, font: "inherit", color: "inherit", cursor: "pointer", textDecoration: "underline", textDecorationColor: "rgba(255,255,255,0.2)", textUnderlineOffset: "2px" }}
                          >
                            {i + 1}. {t.name}
                          </button>
                        </td>
                        <td className="center" style={{ color: "#CBD5E1" }}>{t.w}</td>
                        <td className="center" style={{ color: "#CBD5E1" }}>{t.l}</td>
                        <td className="center" style={{ color: "#94A3B8" }}>{t.gf}</td>
                        <td className="center" style={{ color: "#94A3B8" }}>{t.ga}</td>
                        <td className="center" style={{ fontWeight: 700, color: "#fff" }}>{t.pts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p style={{ fontSize: "10px", color: "#64748B", padding: "8px 16px", margin: 0 }}>
                  * Poin tim AI vs AI udah ikut kehitung sejak awal, bukan cuma dari match kamu.
                </p>
              </div>
            )}
            <p className="ldm-text" style={{ marginTop: "8px" }}>
              Sebelum game ini, mau pakai meta apa? Kamu bisa ganti-ganti meta & pemain di tiap game
              dalam match Bo{REGULAR_BEST_OF} ini buat nyari strategi yang paling pas lawan tim ini.
            </p>

            <ScoutingReport 
            team={{...getCurrentOpponent(), formation: aiMatchFormation || getCurrentOpponent().formation}} onViewRoster={setViewingRosterTeam} />
            {gameMode === "career" ? renderCareerSquadManager() : renderSquadManager()}

            {seriesGameLog.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <div className="ldm-squad-label">Riwayat Game Match Ini</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {seriesGameLog.map((g) => {
                    const finalName = getUserTeamObj().name;
                    const won = g.winner === finalName;
                    return (
                      <div
                        key={g.gameNumber}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          fontSize: "12px", background: "#0F1424", borderRadius: "8px", padding: "8px 12px",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <span style={{ color: "#94A3B8" }}>Game {g.gameNumber} &middot; meta {g.formationUser}</span>
                        <span style={{ fontWeight: 700, color: won ? "#34D399" : "#FB7185" }}>
                          {won ? "MENANG" : "KALAH"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <label className="ldm-label">Pilih Meta</label>
            <div className="ldm-formation-grid">
              {FORMATION_KEYS.map((key) => {
                const f = FORMATIONS[key];
                const active = getActiveFormation() === key;
                const lineOrder = ["Depan", "Tengah", "Belakang"];
                const grouped = { Depan: [], Tengah: [], Belakang: [] };
                ROLES.forEach((r) => grouped[f.lines[r]]?.push(r));
                return (
                  <button
                    key={key}
                    onClick={() => setActiveFormation(key)}
                    className="ldm-formation-card"
                    style={{
                      border: `2px solid ${active ? f.accent : "rgba(255,255,255,0.06)"}`,
                      background: active ? f.accent + "14" : "#0F1424",
                    }}
                  >
                    <div className="ldm-formation-key-col">
                      <span className="ldm-formation-key" style={{ color: active ? f.accent : "#E5E9F0" }}>
                        {key}
                      </span>
                      <span className="ldm-formation-label" style={{ color: active ? f.accent : "#7C8797" }}>
                        {f.label}
                      </span>
                      {(() => {
                        const mod = getMetaCounterModifier(key, getCurrentOpponent().formation);
                        if (mod > 0) return <span className="ldm-counter-badge ldm-counter-good">▲ COUNTER</span>;
                        if (mod < 0) return <span className="ldm-counter-badge ldm-counter-bad">▼ LEMAH</span>;
                        return null;
                      })()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="ldm-formation-lines">
                        {lineOrder.map((line) => (
                          <div key={line} className="ldm-formation-line">
                            {grouped[line].map((r) => (
                              <div key={r} title={r} className="ldm-dot" style={{ background: ROLE_STYLE[r].accent }}>
                                {ROLE_STYLE[r].label[0]}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                      <div className="ldm-formation-desc">{f.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                const uT = getUserTeamObj();
                const opp = getCurrentOpponent();
                startMatchSimulation(uT.name, opp.name, effectivePower(uT, opp), effectivePower(opp, uT), playRegularGame);
              }}
              className="ldm-btn-primary"
            >
              {seriesGameLog.length === 0 ? "MULAI GAME 1" : `MAIN GAME ${seriesGameLog.length + 1}`} <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {phase === "matchGameResult" && seriesGameLog.length > 0 && (() => {
          const last = seriesGameLog[seriesGameLog.length - 1];
          const finalName = getUserTeamObj().name;
          const won = last.winner === finalName;
          return (
            <div className="ldm-card">
              <div
                className="ldm-trophy-card"
                style={{
                  border: `1px solid ${won ? "rgba(52,211,153,0.4)" : "rgba(251,113,133,0.4)"}`,
                  background: won
                    ? "linear-gradient(135deg, rgba(52,211,153,0.16), rgba(19,24,41,0.4))"
                    : "linear-gradient(135deg, rgba(251,113,133,0.16), rgba(19,24,41,0.4))",
                  marginBottom: "20px",
                }}
              >
                <div
                  className="ldm-trophy-icon"
                  style={{ background: won ? "rgba(52,211,153,0.16)" : "rgba(251,113,133,0.16)", animation: "none" }}
                >
                  <Trophy className="w-9 h-9" style={{ color: won ? "#34D399" : "#FB7185" }} />
                </div>
                <div>
                  <div className="ldm-trophy-label">
                    Game {last.gameNumber} vs {getCurrentOpponent().name} &middot; meta {last.formationUser}
                  </div>
                  <div className="ldm-trophy-name">{won ? "MENANG" : "KALAH"}</div>
                  <div className="ldm-trophy-sub">
                    Skor sementara {seriesWins.home}–{seriesWins.away} (Bo{REGULAR_BEST_OF})
                  </div>
                </div>
              </div>

              {last.playByPlay && last.playByPlay.length > 0 && (
                <div style={{ background: "#0F1424", borderRadius: "12px", padding: "14px", border: "1px solid rgba(255,255,255,0.08)", marginBottom: "14px" }}>
                  <div className="ldm-squad-label" style={{ marginBottom: "8px" }}>Play-by-Play</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {last.playByPlay.map((line, idx) => (
                      <div key={idx} style={{ fontSize: "13px", color: "#CBD5E1", display: "flex", gap: "8px" }}>
                        <span style={{ color: "#FBBF24" }}>▸</span> {line}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {last.mvp && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.3)", borderRadius: "10px", padding: "10px 14px", marginBottom: "16px" }}>
                  <Star className="w-4 h-4" style={{ color: "#FBBF24" }} />
                  <span style={{ fontSize: "12px", color: "#94A3B8" }}>MVP Game Ini:</span>
                  <RoleTag role={last.mvp.role} />
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#FBBF24" }}>{last.mvp.name}</span>
                  <span style={{ fontSize: "11px", color: "#64748B" }}>{last.mvp.rating} OVR</span>
                </div>
              )}

{last.chemistryStreak > 0 && (
  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: "10px", padding: "10px 14px", marginBottom: "16px" }}>
    <span style={{ fontSize: "16px" }}>🔥</span>
    <span style={{ fontSize: "12px", color: "#94A3B8" }}>Chemistry:</span>
    <span style={{ fontSize: "13px", fontWeight: 700, color: "#8B5CF6" }}>{last.chemistryStreak}x menang beruntun bareng lineup ini</span>
    <span style={{ fontSize: "11px", color: "#64748B" }}>(+{last.chemistryBonus.toFixed(1)} power)</span>
  </div>
)}

              <p className="ldm-text-small" style={{ marginBottom: "16px" }}>
                Match belum selesai. Mau ganti meta atau pasang/lepas cadangan buat game berikutnya?
              </p>

              <button onClick={continueRegularSeries} className="ldm-btn-primary">
                LANJUT KE GAME {last.gameNumber + 1} <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          );
        })()}

        {phase === "abMetaA" && (
          <div className="ldm-card">
            <div style={{ fontSize: "12px", color: "#8B5CF6", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.03em", marginBottom: "10px" }}>
              Duel Langsung &middot; Giliran {userTeamName.trim() || "Tim A"} atur meta dulu
            </div>
            <div className="ldm-draft-header">
              <div className="ldm-draft-pick">
                <Swords className="w-4 h-4" />
                <span>GAME {seriesGameLog.length + 1} dari Bo{REGULAR_BEST_OF} &middot; Skor {seriesWins.home}–{seriesWins.away}</span>
              </div>
              <span className="ldm-draft-role" style={{ color: "#FBBF24" }}>
                vs {teamBName.trim() || "Tim B"}
              </span>
            </div>
            <p className="ldm-text" style={{ marginTop: "8px" }}>
              Ketemu langsung sama Tim B! {userTeamName.trim() || "Tim A"} atur meta &amp; skuad dulu, abis itu
              baru gantian Tim B yang atur. Tim B nggak bisa lihat pilihan kamu.
            </p>

            {renderSquadManagerFor(userSquad, userSub, subSlotRole, setSubSlotRole)}

            <CounterCycleLegend />
            <label className="ldm-label">Pilih Meta</label>
            <div className="ldm-formation-grid">
              {FORMATION_KEYS.map((key) => {
                const f = FORMATIONS[key];
                const active = formation === key;
                const lineOrder = ["Depan", "Tengah", "Belakang"];
                const grouped = { Depan: [], Tengah: [], Belakang: [] };
                ROLES.forEach((r) => grouped[f.lines[r]]?.push(r));
                return (
                  <button
                    key={key}
                    onClick={() => setFormation(key)}
                    className="ldm-formation-card"
                    style={{
                      border: `2px solid ${active ? f.accent : "rgba(255,255,255,0.06)"}`,
                      background: active ? f.accent + "14" : "#0F1424",
                    }}
                  >
                    <div className="ldm-formation-key-col">
                      <span className="ldm-formation-key" style={{ color: active ? f.accent : "#E5E9F0" }}>{key}</span>
                      <span className="ldm-formation-label" style={{ color: active ? f.accent : "#7C8797" }}>{f.label}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="ldm-formation-lines">
                        {lineOrder.map((line) => (
                          <div key={line} className="ldm-formation-line">
                            {grouped[line].map((r) => (
                              <div key={r} title={r} className="ldm-dot" style={{ background: ROLE_STYLE[r].accent }}>
                                {ROLE_STYLE[r].label[0]}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                      <div className="ldm-formation-desc">{f.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <button onClick={() => setPhase("abMetaB")} className="ldm-btn-primary">
              LANJUT: GILIRAN TIM B <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {phase === "abMetaB" && (
          <div className="ldm-card">
            <div style={{ fontSize: "12px", color: "#22D3EE", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.03em", marginBottom: "10px" }}>
              Duel Langsung &middot; Giliran {teamBName.trim() || "Tim B"} atur meta
            </div>
            <div className="ldm-draft-header">
              <div className="ldm-draft-pick">
                <Swords className="w-4 h-4" />
                <span>GAME {seriesGameLog.length + 1} dari Bo{REGULAR_BEST_OF} &middot; Skor {seriesWins.home}–{seriesWins.away}</span>
              </div>
              <span className="ldm-draft-role" style={{ color: "#FBBF24" }}>
                vs {userTeamName.trim() || "Tim A"}
              </span>
            </div>
            <p className="ldm-text" style={{ marginTop: "8px" }}>
              Giliran {teamBName.trim() || "Tim B"} sekarang — meta {userTeamName.trim() || "Tim A"} udah dikunci,
              nggak bisa diliat. Atur meta &amp; skuad, terus mainkan game-nya.
            </p>

            {renderSquadManagerFor(teamBSquad, teamBSub, teamBSubSlotRole, setTeamBSubSlotRole)}

            <CounterCycleLegend />
            <label className="ldm-label">Pilih Meta</label>
            <div className="ldm-formation-grid">
              {FORMATION_KEYS.map((key) => {
                const f = FORMATIONS[key];
                const active = teamBFormation === key;
                const lineOrder = ["Depan", "Tengah", "Belakang"];
                const grouped = { Depan: [], Tengah: [], Belakang: [] };
                ROLES.forEach((r) => grouped[f.lines[r]]?.push(r));
                return (
                  <button
                    key={key}
                    onClick={() => setTeamBFormation(key)}
                    className="ldm-formation-card"
                    style={{
                      border: `2px solid ${active ? f.accent : "rgba(255,255,255,0.06)"}`,
                      background: active ? f.accent + "14" : "#0F1424",
                    }}
                  >
                    <div className="ldm-formation-key-col">
                      <span className="ldm-formation-key" style={{ color: active ? f.accent : "#E5E9F0" }}>{key}</span>
                      <span className="ldm-formation-label" style={{ color: active ? f.accent : "#7C8797" }}>{f.label}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="ldm-formation-lines">
                        {lineOrder.map((line) => (
                          <div key={line} className="ldm-formation-line">
                            {grouped[line].map((r) => (
                              <div key={r} title={r} className="ldm-dot" style={{ background: ROLE_STYLE[r].accent }}>
                                {ROLE_STYLE[r].label[0]}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                      <div className="ldm-formation-desc">{f.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                const tA = getTeamObjForSide("A");
                const tB = getTeamObjForSide("B");
                startMatchSimulation(tA.name, tB.name, effectivePower(tA, tB), effectivePower(tB, tA), playABGame);
              }}
              className="ldm-btn-primary"
            >
              {seriesGameLog.length === 0 ? "MAINKAN GAME 1" : `MAINKAN GAME ${seriesGameLog.length + 1}`} <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {phase === "matchResult" && matchResults.length > 0 && (() => {
          const last = matchResults[matchResults.length - 1];
          const finalName = getUserTeamObj().name;
          const won = last.result.winner === finalName;
          return (
            <div className="ldm-card">
              <div
                className="ldm-trophy-card"
                style={{
                  border: `1px solid ${won ? "rgba(52,211,153,0.4)" : "rgba(251,113,133,0.4)"}`,
                  background: won
                    ? "linear-gradient(135deg, rgba(52,211,153,0.16), rgba(19,24,41,0.4))"
                    : "linear-gradient(135deg, rgba(251,113,133,0.16), rgba(19,24,41,0.4))",
                  marginBottom: "20px",
                }}
              >
                <div
                  className="ldm-trophy-icon"
                  style={{ background: won ? "rgba(52,211,153,0.16)" : "rgba(251,113,133,0.16)", animation: "none" }}
                >
                  <Trophy className="w-9 h-9" style={{ color: won ? "#34D399" : "#FB7185" }} />
                </div>
                <div>
                  <div className="ldm-trophy-label">{won ? "Menang" : "Kalah"} vs {last.opponentName} &middot; Leg {last.leg}</div>
                  <div className="ldm-trophy-name">{last.result.scoreHome}–{last.result.scoreAway}</div>
                  <div className="ldm-trophy-sub">Meta game terakhir: {last.formationUsed}</div>
                </div>
              </div>

              {last.gameLog && last.gameLog.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <div className="ldm-squad-label">Rincian Per Game</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {last.gameLog.map((g) => {
                      const gWon = g.winner === finalName;
                      return (
                        <div
                          key={g.gameNumber}
                          style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            fontSize: "12px", background: "#0F1424", borderRadius: "8px", padding: "8px 12px",
                            border: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <span style={{ color: "#94A3B8" }}>Game {g.gameNumber} &middot; meta {g.formationUser}</span>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            {g.mvp && (
                              <span style={{ fontSize: "10px", color: "#FBBF24" }}>
                                <Star className="w-3 h-3" style={{ display: "inline", marginRight: "2px" }} />
                                {g.mvp.name}
                              </span>
                            )}
                            <span style={{ fontWeight: 700, color: gWon ? "#34D399" : "#FB7185" }}>
                              {gWon ? "MENANG" : "KALAH"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {last.matchMvp && (
                <div
                  style={{
                    display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap",
                    background: "linear-gradient(135deg, rgba(251,191,36,0.16), rgba(19,24,41,0.4))",
                    border: "1px solid rgba(251,191,36,0.4)", borderRadius: "12px", padding: "12px 16px", marginBottom: "20px",
                  }}
                >
                  <Star className="w-6 h-6" style={{ color: "#FBBF24" }} />
                  <div>
                    <div style={{ fontSize: "10px", color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.03em" }}>Match MVP</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <RoleTag role={last.matchMvp.role} />
                      <span style={{ fontSize: "15px", fontWeight: 700, color: "#FBBF24" }}>{last.matchMvp.name}</span>
                      <span style={{ fontSize: "12px", color: "#64748B" }}>{last.matchMvp.rating} OVR</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="ldm-squad-label">Rating Kekuatan Tim</div>
              <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
                <div style={{ flex: 1, background: "#0F1424", borderRadius: "12px", padding: "14px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: "11px", color: "#64748B", marginBottom: "4px" }}>Timmu</div>
                  <div className="ldm-title" style={{ fontSize: "24px", color: "#FBBF24" }}>{last.userPower.toFixed(1)}</div>
                </div>
                <div style={{ flex: 1, background: "#0F1424", borderRadius: "12px", padding: "14px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: "11px", color: "#64748B", marginBottom: "4px" }}>{last.opponentName}</div>
                  <div className="ldm-title" style={{ fontSize: "24px", color: "#E5E9F0" }}>{last.oppPower.toFixed(1)}</div>
                </div>
              </div>

              <p className="ldm-text-small" style={{ marginBottom: "16px" }}>
                {currentMatchIndex + 1 < aiTeams.length * TOTAL_LEGS
                  ? "Mau ganti meta buat match berikutnya, atau tetap pakai yang sekarang? Kamu bisa ubah pilihan di layar selanjutnya."
                  : "Ini match terakhir regular season — sisa pertandingan antar tim lawan bakal disimulasikan otomatis buat nentuin siapa yang lolos 6 besar."}
              </p>

              <button onClick={nextMatch} className="ldm-btn-primary">
                {currentMatchIndex + 1 < aiTeams.length * TOTAL_LEGS ? "LANJUT KE MATCH BERIKUTNYA" : "LIHAT HASIL REGULAR SEASON"} <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          );
        })()}

        {phase === "standings" && season && (
          <div>
            <div className="ldm-trophy-card">
              <div className="ldm-trophy-glow-bg" />
              <div className="ldm-trophy-icon">
                <Trophy className="w-9 h-9" style={{ color: "#FBBF24" }} />
              </div>
              <div style={{ position: "relative" }}>
                <div className="ldm-trophy-label">Regular Season Selesai</div>
                <div className="ldm-trophy-name">Puncak Klasemen: {season.table[0].name}</div>
                <div className="ldm-trophy-sub">
                  6 besar lolos ke babak playoff (1 leg, sistem gugur)
                </div>
              </div>
            </div>

            <div className="ldm-standings-card">
              <div className="ldm-tabs">
                <button
                  onClick={() => setStandingsTab("klasemen")}
                  className="ldm-tab"
                  style={{
                    color: standingsTab === "klasemen" ? "#FBBF24" : "#7C8797",
                    borderBottomColor: standingsTab === "klasemen" ? "#FBBF24" : "transparent",
                  }}
                >
                  <Shield className="w-4 h-4" /> KLASEMEN
                </button>
                <button
                  onClick={() => setStandingsTab("hasil")}
                  className="ldm-tab"
                  style={{
                    color: standingsTab === "hasil" ? "#FBBF24" : "#7C8797",
                    borderBottomColor: standingsTab === "hasil" ? "#FBBF24" : "transparent",
                  }}
                >
                  <Swords className="w-4 h-4" /> HASIL PERTANDINGAN
                </button>
              </div>

              {standingsTab === "klasemen" ? (
                <table className="ldm-table">
                  <thead>
                    <tr>
                      <th>Tim</th>
                      <th className="center">M</th>
                      <th className="center">K</th>
                      <th className="center">GF</th>
                      <th className="center">GA</th>
                      <th className="center">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {season.table.map((t, i) => (
                      <tr key={t.name} style={{ background: t.isUser ? "rgba(251,191,36,0.08)" : "transparent" }}>
                        <td style={{ fontWeight: 500, color: t.isUser ? "#FBBF24" : "#E5E9F0" }}>
                          <button
                            onClick={() => setViewingRosterTeam(t)}
                            style={{ background: "none", border: "none", padding: 0, font: "inherit", color: "inherit", cursor: "pointer", textDecoration: "underline", textDecorationColor: "rgba(255,255,255,0.2)", textUnderlineOffset: "2px" }}
                          >
                            {i + 1}. {t.name}
                          </button>
                          {t.formation && (
                            <span style={{ marginLeft: "8px", fontSize: "10px", color: "#64748B", fontWeight: 400 }}>
                              ({t.formation})
                            </span>
                          )}
                          {i < 6 && (
                            <span style={{ marginLeft: "8px", fontSize: "9px", fontWeight: 700, color: "#34D399", background: "rgba(52,211,153,0.14)", padding: "2px 6px", borderRadius: "4px" }}>
                              LOLOS
                            </span>
                          )}
                        </td>
                        <td className="center" style={{ color: "#CBD5E1" }}>{t.w}</td>
                        <td className="center" style={{ color: "#CBD5E1" }}>{t.l}</td>
                        <td className="center" style={{ color: "#94A3B8" }}>{t.gf}</td>
                        <td className="center" style={{ color: "#94A3B8" }}>{t.ga}</td>
                        <td className="center" style={{ fontWeight: 700, color: "#fff" }}>{t.pts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="ldm-match-grid">
                  {season.results.map((r, idx) => (
                    <div key={idx} className="ldm-match-card">
                      <span className="ldm-match-team">{r.home}</span>
                      <span className="ldm-match-score">{r.scoreHome}–{r.scoreAway}</span>
                      <span className="ldm-match-team">{r.away}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {(() => {
              const nameA = userTeamName.trim() || "Timku FC";
              const rankA = season.table.findIndex((t) => t.name === nameA);
              if (gameMode !== "liga1v1") {
                const qualified = rankA < 6;
                return (
                  <p className="ldm-text-small" style={{ margin: "16px 0" }}>
                    {qualified
                      ? `Timmu finish di posisi ke-${rankA + 1} — lolos ke playoff! Kamu bakal main tiap match yang melibatkan timmu.`
                      : `Timmu finish di posisi ke-${rankA + 1}, gak lolos 6 besar. Playoff tetap berjalan buat nentuin juara antar tim lain.`}
                  </p>
                );
              }
              const nameB = teamBName.trim() || "Tim B";
              const rankB = season.table.findIndex((t) => t.name === nameB);
              return (
                <p className="ldm-text-small" style={{ margin: "16px 0" }}>
                  {nameA} finish posisi ke-{rankA + 1} ({rankA < 6 ? "lolos playoff" : "gak lolos"}) &middot;{" "}
                  {nameB} finish posisi ke-{rankB + 1} ({rankB < 6 ? "lolos playoff" : "gak lolos"}).
                  Match yang melibatkan salah satu dari kalian tetap dimainkan interaktif gantian.
                </p>
              );
            })()}

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button onClick={startPlayoffs} className="ldm-btn-primary">
                LANJUT KE PLAYOFF <ChevronRight className="w-5 h-5" />
              </button>
              <button onClick={() => openBracket("standings")} className="ldm-btn-secondary">
                <Trophy className="w-4 h-4" /> LIHAT BRACKET
              </button>
            </div>
          </div>
        )}

        {phase === "playoffPrep" && pendingPlayoffMatch && (
          <div className="ldm-card">
            {gameMode === "career" && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", fontWeight: 700, marginBottom: "10px" }}>
                <span style={{ color: "#34D399", textTransform: "uppercase", letterSpacing: "0.03em" }}>Musim {careerSeasonNum}</span>
                <span style={{ color: "#FBBF24" }}>{formatRupiah(careerBudget)}</span>
              </div>
            )}
            <div className="ldm-draft-header">
              <div className="ldm-draft-pick">
                <Trophy className="w-4 h-4" />
                <span>PLAYOFF &middot; {pendingPlayoffMatch.roundLabel}</span>
              </div>
              <span className="ldm-draft-role" style={{ color: "#FBBF24" }}>
                {pendingPlayoffMatch.home.isUser
                  ? `vs ${pendingPlayoffMatch.away.name}`
                  : `vs ${pendingPlayoffMatch.home.name}`}
              </span>
            </div>

            <button
              onClick={() => openBracket("playoffPrep")}
              className="ldm-reroll-btn"
              style={{ color: "#8B5CF6", background: "rgba(139,92,246,0.1)", borderColor: "rgba(139,92,246,0.3)", marginTop: "10px", marginBottom: "10px" }}
            >
              <Trophy className="w-3.5 h-3.5" /> Lihat Bracket
            </button>

            <p className="ldm-text" style={{ marginTop: "4px" }}>
              Ini pertandingan Best of {PLAYOFF_BEST_OF[playoffStage]}. Pilih meta & susunan pemain terbaikmu
              buat tiap game — kamu bisa ganti-ganti lagi sebelum game berikutnya kalau seriesnya belum selesai.
            </p>

            <div className="ldm-formation-note">
              GAME {seriesGameLog.length + 1} dari Bo{PLAYOFF_BEST_OF[playoffStage]} &middot; Skor sementara{" "}
              <strong style={{ color: "#FBBF24" }}>
                {pendingPlayoffMatch.home.isUser ? seriesWins.home : seriesWins.away}–
                {pendingPlayoffMatch.home.isUser ? seriesWins.away : seriesWins.home}
              </strong>
            </div>

<ScoutingReport
  team={{
    ...(pendingPlayoffMatch.home.isUser ? pendingPlayoffMatch.away : pendingPlayoffMatch.home),
    formation: aiMatchFormation || (pendingPlayoffMatch.home.isUser ? pendingPlayoffMatch.away : pendingPlayoffMatch.home).formation,
  }}
  onViewRoster={setViewingRosterTeam}
/>            {gameMode === "career" ? renderCareerSquadManager() : renderSquadManager()}

            {seriesGameLog.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <div className="ldm-squad-label">Riwayat Game Series Ini</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {seriesGameLog.map((g) => {
                    const userIsHome = pendingPlayoffMatch.home.isUser;
                    const userFormation = userIsHome ? g.formationHome : g.formationAway;
                    const userTeamName_ = userIsHome ? pendingPlayoffMatch.home.name : pendingPlayoffMatch.away.name;
                    const won = g.winner === userTeamName_;
                    return (
                      <div
                        key={g.gameNumber}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          fontSize: "12px", background: "#0F1424", borderRadius: "8px", padding: "8px 12px",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <span style={{ color: "#94A3B8" }}>Game {g.gameNumber} &middot; meta {userFormation}</span>
                        <span style={{ fontWeight: 700, color: won ? "#34D399" : "#FB7185" }}>
                          {won ? "MENANG" : "KALAH"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <label className="ldm-label">Pilih Meta</label>
            <div className="ldm-formation-grid">
              {FORMATION_KEYS.map((key) => {
                const f = FORMATIONS[key];
                const active = getActiveFormation() === key;
                const lineOrder = ["Depan", "Tengah", "Belakang"];
                const grouped = { Depan: [], Tengah: [], Belakang: [] };
                ROLES.forEach((r) => grouped[f.lines[r]]?.push(r));
                return (
                  <button
                    key={key}
                    onClick={() => setActiveFormation(key)}
                    className="ldm-formation-card"
                    style={{
                      border: `2px solid ${active ? f.accent : "rgba(255,255,255,0.06)"}`,
                      background: active ? f.accent + "14" : "#0F1424",
                    }}
                  >
                    <div className="ldm-formation-key-col">
                      <span className="ldm-formation-key" style={{ color: active ? f.accent : "#E5E9F0" }}>
                        {key}
                      </span>
                      <span className="ldm-formation-label" style={{ color: active ? f.accent : "#7C8797" }}>
                        {f.label}
                      </span>
                      {(() => {
                        const oppTeam = pendingPlayoffMatch.home.isUser ? pendingPlayoffMatch.away : pendingPlayoffMatch.home;
                        const mod = getMetaCounterModifier(key, aiMatchFormation || getCurrentOpponent().formation);
                        if (mod > 0) return <span className="ldm-counter-badge ldm-counter-good">▲ COUNTER</span>;
                        if (mod < 0) return <span className="ldm-counter-badge ldm-counter-bad">▼ LEMAH</span>;
                        return null;
                      })()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="ldm-formation-lines">
                        {lineOrder.map((line) => (
                          <div key={line} className="ldm-formation-line">
                            {grouped[line].map((r) => (
                              <div key={r} title={r} className="ldm-dot" style={{ background: ROLE_STYLE[r].accent }}>
                                {ROLE_STYLE[r].label[0]}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                      <div className="ldm-formation-desc">{f.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                const userIsHome = pendingPlayoffMatch.home.isUser;
                const h = userIsHome ? getUserTeamObj() : pendingPlayoffMatch.home;
                const a = userIsHome ? pendingPlayoffMatch.away : getUserTeamObj();
                startMatchSimulation(h.name, a.name, effectivePower(h, a), effectivePower(a, h), playPlayoffGameSingle);
              }}
              className="ldm-btn-primary"
            >
              {seriesGameLog.length === 0 ? "MULAI GAME 1" : `MAIN GAME ${seriesGameLog.length + 1}`} <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {phase === "playoffGameResult" && seriesGameLog.length > 0 && pendingPlayoffMatch && (() => {
          const last = seriesGameLog[seriesGameLog.length - 1];
          const userIsHome = pendingPlayoffMatch.home.isUser;
          const userTeamName_ = userIsHome ? pendingPlayoffMatch.home.name : pendingPlayoffMatch.away.name;
          const oppName = userIsHome ? pendingPlayoffMatch.away.name : pendingPlayoffMatch.home.name;
          const userFormationUsed = userIsHome ? last.formationHome : last.formationAway;
          const won = last.winner === userTeamName_;
          const userScore = userIsHome ? seriesWins.home : seriesWins.away;
          const oppScore = userIsHome ? seriesWins.away : seriesWins.home;
          return (
            <div className="ldm-card">
              <div
                className="ldm-trophy-card"
                style={{
                  border: `1px solid ${won ? "rgba(52,211,153,0.4)" : "rgba(251,113,133,0.4)"}`,
                  background: won
                    ? "linear-gradient(135deg, rgba(52,211,153,0.16), rgba(19,24,41,0.4))"
                    : "linear-gradient(135deg, rgba(251,113,133,0.16), rgba(19,24,41,0.4))",
                  marginBottom: "20px",
                }}
              >
                <div
                  className="ldm-trophy-icon"
                  style={{ background: won ? "rgba(52,211,153,0.16)" : "rgba(251,113,133,0.16)", animation: "none" }}
                >
                  <Trophy className="w-9 h-9" style={{ color: won ? "#34D399" : "#FB7185" }} />
                </div>
                <div>
                  <div className="ldm-trophy-label">
                    Game {last.gameNumber} vs {oppName} &middot; meta {userFormationUsed}
                  </div>
                  <div className="ldm-trophy-name">{won ? "MENANG" : "KALAH"}</div>
                  <div className="ldm-trophy-sub">
                    Skor sementara {userScore}–{oppScore} (Bo{PLAYOFF_BEST_OF[playoffStage]})
                  </div>
                </div>
              </div>

              {last.playByPlay && last.playByPlay.length > 0 && (
                <div style={{ background: "#0F1424", borderRadius: "12px", padding: "14px", border: "1px solid rgba(255,255,255,0.08)", marginBottom: "14px" }}>
                  <div className="ldm-squad-label" style={{ marginBottom: "8px" }}>Play-by-Play</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {last.playByPlay.map((line, idx) => (
                      <div key={idx} style={{ fontSize: "13px", color: "#CBD5E1", display: "flex", gap: "8px" }}>
                        <span style={{ color: "#FBBF24" }}>▸</span> {line}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {last.mvp && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.3)", borderRadius: "10px", padding: "10px 14px", marginBottom: "16px" }}>
                  <Star className="w-4 h-4" style={{ color: "#FBBF24" }} />
                  <span style={{ fontSize: "12px", color: "#94A3B8" }}>MVP Game Ini:</span>
                  <RoleTag role={last.mvp.role} />
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#FBBF24" }}>{last.mvp.name}</span>
                  <span style={{ fontSize: "11px", color: "#64748B" }}>{last.mvp.rating} OVR</span>
                </div>
              )}

              <p className="ldm-text-small" style={{ marginBottom: "16px" }}>
                Series belum selesai. Mau ganti meta atau pasang/lepas cadangan buat game berikutnya?
              </p>

              <button onClick={continuePlayoffSeries} className="ldm-btn-primary">
                LANJUT KE GAME {last.gameNumber + 1} <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          );
        })()}

        {phase === "playoffResult" && playoffLog.length > 0 && (() => {
          const last = playoffLog[playoffLog.length - 1];
          const isFinalRound = pendingAdvance?.stage === "m8";
          const won = last.interactive ? pendingAdvance.winnerTeam.isUser : false;
          return (
            <div className="ldm-card">
              <div
                className="ldm-trophy-card"
                style={{
                  border: last.interactive
                    ? `1px solid ${won ? "rgba(52,211,153,0.4)" : "rgba(251,113,133,0.4)"}`
                    : "1px solid rgba(255,255,255,0.1)",
                  background: last.interactive
                    ? won
                      ? "linear-gradient(135deg, rgba(52,211,153,0.16), rgba(19,24,41,0.4))"
                      : "linear-gradient(135deg, rgba(251,113,133,0.16), rgba(19,24,41,0.4))"
                    : "linear-gradient(135deg, rgba(139,92,246,0.14), rgba(19,24,41,0.4))",
                  marginBottom: "20px",
                }}
              >
                <div
                  className="ldm-trophy-icon"
                  style={{
                    background: last.interactive ? (won ? "rgba(52,211,153,0.16)" : "rgba(251,113,133,0.16)") : "rgba(139,92,246,0.16)",
                    animation: "none",
                  }}
                >
                  <Trophy className="w-9 h-9" style={{ color: last.interactive ? (won ? "#34D399" : "#FB7185") : "#8B5CF6" }} />
                </div>
                <div>
                  <div className="ldm-trophy-label">{last.roundLabel}</div>
                  <div className="ldm-trophy-name">
                    {last.result.home} {last.result.scoreHome}–{last.result.scoreAway} {last.result.away}
                  </div>
                  <div className="ldm-trophy-sub">
                    {last.interactive
                      ? `${won ? "Timmu menang" : "Timmu kalah"} — pakai meta ${last.formationUsed}`
                      : `Pemenang: ${last.result.winner}`}
                  </div>
                </div>
              </div>

              {last.interactive && last.gameLog && last.gameLog.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <div className="ldm-squad-label">Rincian Per Game</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {last.gameLog.map((g) => {
                      const finalName = getUserTeamObj().name;
                      const userWonGame = g.winner === finalName;
                      return (
                        <div
                          key={g.gameNumber}
                          style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            fontSize: "12px", background: "#0F1424", borderRadius: "8px", padding: "8px 12px",
                            border: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <span style={{ color: "#94A3B8" }}>Game {g.gameNumber}</span>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            {g.mvp && (
                              <span style={{ fontSize: "10px", color: "#FBBF24" }}>
                                <Star className="w-3 h-3" style={{ display: "inline", marginRight: "2px" }} />
                                {g.mvp.name}
                              </span>
                            )}
                            <span style={{ fontWeight: 700, color: userWonGame ? "#34D399" : "#FB7185" }}>
                              {userWonGame ? "MENANG" : "KALAH"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {last.matchMvp && (
                <div
                  style={{
                    display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap",
                    background: "linear-gradient(135deg, rgba(251,191,36,0.16), rgba(19,24,41,0.4))",
                    border: "1px solid rgba(251,191,36,0.4)", borderRadius: "12px", padding: "12px 16px", marginBottom: "20px",
                  }}
                >
                  <Star className="w-6 h-6" style={{ color: "#FBBF24" }} />
                  <div>
                    <div style={{ fontSize: "10px", color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.03em" }}>Match MVP</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <RoleTag role={last.matchMvp.role} />
                      <span style={{ fontSize: "15px", fontWeight: 700, color: "#FBBF24" }}>{last.matchMvp.name}</span>
                      <span style={{ fontSize: "12px", color: "#64748B" }}>{last.matchMvp.rating} OVR</span>
                    </div>
                  </div>
                </div>
              )}

              {last.interactive && (
                <>
                  <div className="ldm-squad-label">Rating Kekuatan Tim</div>
                  <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
                    <div style={{ flex: 1, background: "#0F1424", borderRadius: "12px", padding: "14px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ fontSize: "11px", color: "#64748B", marginBottom: "4px" }}>Timmu</div>
                      <div className="ldm-title" style={{ fontSize: "24px", color: "#FBBF24" }}>{last.userPower.toFixed(1)}</div>
                    </div>
                    <div style={{ flex: 1, background: "#0F1424", borderRadius: "12px", padding: "14px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ fontSize: "11px", color: "#64748B", marginBottom: "4px" }}>{last.opponentName}</div>
                      <div className="ldm-title" style={{ fontSize: "24px", color: "#E5E9F0" }}>{last.oppPower.toFixed(1)}</div>
                    </div>
                  </div>
                </>
              )}

              <p className="ldm-text-small" style={{ marginBottom: "16px" }}>
                {isFinalRound ? "Ini Grand Final — saatnya lihat siapa juaranya!" : "Lanjut ke babak berikutnya."}
              </p>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button onClick={continuePlayoff} className="ldm-btn-primary">
                  {isFinalRound ? "LIHAT JUARA" : "LANJUT BABAK BERIKUTNYA"} <ChevronRight className="w-5 h-5" />
                </button>
                <button onClick={() => openBracket("playoffResult")} className="ldm-btn-secondary">
                  <Trophy className="w-4 h-4" /> LIHAT BRACKET
                </button>
              </div>
            </div>
          );
        })()}

        {phase === "bracket" && season && (() => {
          const seeds = playoffSeeds.length
            ? playoffSeeds
            : season.table.slice(0, 6).map((row) => season.teams.find((t) => t.name === row.name));
          if (seeds.length < 6) return null;
          const m1h = seeds[2], m1a = seeds[5];
          const m2h = seeds[3], m2a = seeds[4];
          const m3h = seeds[0], m3a = bracket.m1 || null;
          const m4h = seeds[1], m4a = bracket.m2 || null;
          const m5h = bracket.m3_loser || null, m5a = bracket.m4_loser || null;
          const m6h = bracket.m3 || null, m6a = bracket.m4 || null;
          const m7h = bracket.m6_loser || null, m7a = bracket.m5 || null;
          const m8h = bracket.m6 || null, m8a = bracket.m7 || null;
          return (
            <div>
              <div className="ldm-card" style={{ marginBottom: "16px" }}>
                <div className="ldm-draft-header" style={{ marginBottom: "12px" }}>
                  <span className="ldm-draft-role" style={{ color: "#FBBF24" }}>
                    Playoff Bracket {playoffSeeds.length ? "" : "(Prediksi)"}
                  </span>
                </div>
                <p className="ldm-text-small" style={{ marginBottom: "16px" }}>
                  Seed 1 & 2 dapet bye langsung ke Ronde 2 Upper Bracket. Kalah di M1/M2 langsung tersingkir.
                  Pemenang M6 (Upper Bracket Final) lolos langsung ke Grand Final; yang kalah masih dapet
                  kesempatan lewat Lower Bracket Final (M7).
                </p>

                <div className="ldm-squad-label">Upper Bracket — Ronde 1</div>
                {renderBracketMatch("m1", m1h, m1a)}
                {renderBracketMatch("m2", m2h, m2a)}

                <div className="ldm-squad-label" style={{ marginTop: "12px" }}>Upper Bracket — Ronde 2</div>
                {renderBracketMatch("m3", m3h, m3a)}
                {renderBracketMatch("m4", m4h, m4a)}

                <div className="ldm-squad-label" style={{ marginTop: "12px" }}>Lower Bracket — Ronde 1</div>
                {renderBracketMatch("m5", m5h, m5a)}

                <div className="ldm-squad-label" style={{ marginTop: "12px" }}>Upper Bracket Final</div>
                {renderBracketMatch("m6", m6h, m6a)}

                <div className="ldm-squad-label" style={{ marginTop: "12px" }}>Lower Bracket Final</div>
                {renderBracketMatch("m7", m7h, m7a)}

                <div className="ldm-squad-label" style={{ marginTop: "12px" }}>Grand Final</div>
                {renderBracketMatch("m8", m8h, m8a)}
              </div>

              <button onClick={() => setPhase(bracketReturnPhase)} className="ldm-btn-secondary">
                KEMBALI
              </button>
            </div>
          );
        })()}

        {phase === "champion" && championTeam && (
          <div>
            <div
              className="ldm-trophy-card"
              style={{
                border: "1px solid rgba(251,191,36,0.5)",
                background: "linear-gradient(135deg, rgba(251,191,36,0.2), rgba(19,24,41,0.4))",
              }}
            >
              <div className="ldm-trophy-glow-bg" />
              <div className="ldm-trophy-icon">
                <Trophy className="w-9 h-9" style={{ color: "#FBBF24" }} />
              </div>
              <div style={{ position: "relative" }}>
                <div className="ldm-trophy-label">Juara MPL ID ALLSTAR</div>
                <div className="ldm-trophy-name" style={{ fontSize: "28px" }}>
                  {championTeam.isUser ? `🏆 ${championTeam.name} (Kamu!)` : championTeam.name}
                </div>
                <div className="ldm-trophy-sub">
                  {championTeam.isUser
                    ? "Selamat! Timmu berhasil jadi juara turnamen."
                    : "Timmu belum berhasil jadi juara musim ini."}
                </div>
              </div>
            </div>

            <div className="ldm-standings-card" style={{ padding: "16px" }}>
              <div className="ldm-squad-label" style={{ marginBottom: "12px" }}>Rekap Playoff</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {playoffLog.map((log, idx) => (
                  <div key={idx} className="ldm-match-card" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "11px", color: "#64748B", width: "110px" }}>{log.roundLabel}</span>
                    <span className="ldm-match-team" style={{ width: "auto", flex: 1 }}>{log.result.home}</span>
                    <span className="ldm-match-score">{log.result.scoreHome}–{log.result.scoreAway}</span>
                    <span className="ldm-match-team" style={{ width: "auto", flex: 1 }}>{log.result.away}</span>
                  </div>
                ))}
              </div>
            </div>

            {gameMode === "career" ? (
              <button onClick={processCareerOffseason} className="ldm-btn-primary" style={{ marginTop: "20px" }}>
                LANJUT KE OFF-SEASON <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button onClick={startNewGame} className="ldm-btn-secondary" style={{ marginTop: "20px" }}>
                <RotateCcw className="w-4 h-4" /> MAIN LAGI
              </button>
            )}
          </div>
      )}

        {phase === "careerOffseason" && careerSeasonSummary && (
          <div>
            <div
              className="ldm-trophy-card"
              style={{ border: "1px solid rgba(52,211,153,0.4)", background: "linear-gradient(135deg, rgba(52,211,153,0.14), rgba(19,24,41,0.4))" }}
            >
              <div className="ldm-trophy-icon" style={{ background: "rgba(52,211,153,0.16)", animation: "none" }}>
                <Trophy className="w-9 h-9" style={{ color: "#34D399" }} />
              </div>
              <div>
                <div className="ldm-trophy-label">Off-Season &middot; Musim {careerSeasonSummary.logEntry.season} Selesai</div>
                <div className="ldm-trophy-name" style={{ fontSize: "20px" }}>
                  {careerSeasonSummary.logEntry.isChamp
                    ? "🏆 Kamu Juara!"
                    : careerSeasonSummary.logEntry.standing
                    ? `Posisi ke-${careerSeasonSummary.logEntry.standing}`
                    : "Musim berakhir"}
                </div>
                <div className="ldm-trophy-sub">
                  Gaji dibayar: {formatRupiah(careerSeasonSummary.logEntry.totalSalary)} &middot; Budget sekarang: {formatRupiah(careerSeasonSummary.logEntry.budgetAfter)}
                </div>
              </div>
            </div>

            <div className="ldm-standings-card" style={{ padding: "16px" }}>
              <div className="ldm-squad-label" style={{ marginBottom: "12px" }}>Perkembangan Pemain</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {careerSeasonSummary.changes.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px",
                      background: "#141A2E", borderRadius: "10px", padding: "8px 12px", border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
                      <RoleTag role={p.role} />
                      <span style={{ fontSize: "13px", color: "#E5E9F0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {p.name}
                      </span>
                      <span style={{ fontSize: "10px", color: "#64748B" }}>{p.played} game</span>
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: p.delta > 0 ? "#34D399" : p.delta < 0 ? "#FB7185" : "#94A3B8" }}>
                      {p.oldRating} → {p.newRating} {p.delta !== 0 ? `(${p.delta > 0 ? "+" : ""}${p.delta})` : ""}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {careerDynastyLog.length > 1 && (
              <div className="ldm-standings-card" style={{ padding: "16px" }}>
                <div className="ldm-squad-label" style={{ marginBottom: "12px" }}>Riwayat Dinasti</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {careerDynastyLog.map((log) => (
                    <div key={log.season} style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#CBD5E1" }}>
                      <span>Musim {log.season}</span>
                      <span>{log.isChamp ? "🏆 Juara" : log.standing ? `Posisi ke-${log.standing}` : "-"}</span>
                      <span style={{ color: "#64748B" }}>{formatRupiah(log.budgetAfter)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button onClick={openCareerMarket} className="ldm-btn-primary" style={{ marginTop: "20px" }}>
              BUKA TRANSFER MARKET <ChevronRight className="w-5 h-5" />
            </button>
            <button onClick={startNewGame} className="ldm-btn-secondary" style={{ marginTop: "10px" }}>
              <RotateCcw className="w-4 h-4" /> KELUAR DARI KARIR
            </button>
          </div>
        )}

        {phase === "careerMarket" && (
          <div>
            <div className="ldm-card">
              <div className="ldm-draft-header">
                <div className="ldm-draft-pick">
                  <Users className="w-4 h-4" />
                  <span>TRANSFER MARKET</span>
                </div>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#34D399" }}>{formatRupiah(careerBudget)}</span>
              </div>

              <div className="ldm-squad-label" style={{ marginBottom: "10px" }}>Skuad Kamu (jual buat dapetin cash)</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "20px" }}>
                {userSquad.map((p) => (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", background: "#0F1424", borderRadius: "10px", padding: "8px 12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
                      <RoleTag role={p.role} />
                      <span style={{ fontSize: "13px", color: "#E5E9F0" }}>{p.name}</span>
                      <span style={{ fontSize: "11px", color: "#64748B" }}>{p.rating} OVR</span>
                    </div>
                    <button
                      onClick={() => sellCareerPlayer(p.id, false)}
                      disabled={careerBench.length === 0}
                      className="ldm-reroll-btn"
                      style={{ opacity: careerBench.length === 0 ? 0.4 : 1, cursor: careerBench.length === 0 ? "not-allowed" : "pointer", color: "#FB7185", background: "rgba(251,113,133,0.1)", borderColor: "rgba(251,113,133,0.3)" }}
                    >
                      Jual ({formatRupiah(Math.round(getPlayerPrice(p.rating) * CAREER_SELL_FACTOR))})
                    </button>
                  </div>
                ))}
                {careerBench.map((p) => (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", background: "#0F1424", borderRadius: "10px", padding: "8px 12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
                      <RoleTag role={p.role} />
                      <span style={{ fontSize: "13px", color: "#E5E9F0" }}>{p.name}</span>
                      <span style={{ fontSize: "11px", color: "#64748B" }}>{p.rating} OVR &middot; Cadangan</span>
                    </div>
                    <button
                      onClick={() => sellCareerPlayer(p.id, true)}
                      className="ldm-reroll-btn"
                      style={{ color: "#FB7185", background: "rgba(251,113,133,0.1)", borderColor: "rgba(251,113,133,0.3)" }}
                    >
                      Jual ({formatRupiah(Math.round(getPlayerPrice(p.rating) * CAREER_SELL_FACTOR))})
                    </button>
                  </div>
                ))}
              </div>

              <div className="ldm-squad-label" style={{ marginBottom: "10px" }}>
                Pemain Tersedia {careerBench.length >= 2 && <span style={{ color: "#FB7185", fontWeight: 400 }}>(bench penuh, jual dulu buat beli)</span>}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {careerMarket.map((p) => {
                  const canAfford = careerBudget >= p.price;
                  const canBuy = canAfford && careerBench.length < 2;
                  return (
                    <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", background: "#0F1424", borderRadius: "10px", padding: "8px 12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
                        <RoleTag role={p.role} />
                        <span style={{ fontSize: "13px", color: "#E5E9F0" }}>{p.name}</span>
                        <span style={{ fontSize: "11px", color: "#64748B" }}>{p.rating} OVR</span>
                      </div>
                      <button
                        onClick={() => buyCareerPlayer(p)}
                        disabled={!canBuy}
                        className="ldm-reroll-btn"
                        style={{
                          opacity: canBuy ? 1 : 0.4, cursor: canBuy ? "pointer" : "not-allowed",
                          color: "#34D399", background: "rgba(52,211,153,0.1)", borderColor: "rgba(52,211,153,0.3)",
                        }}
                      >
                        Beli ({formatRupiah(p.price)})
                      </button>
                    </div>
                  );
                })}
              </div>

              <button onClick={startNextCareerSeason} className="ldm-btn-primary" style={{ marginTop: "20px" }}>
                MULAI MUSIM {careerSeasonNum + 1} <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {phase === "duelPrep" && teamAData && teamBData && (
          <div className="ldm-card">
            <div className="ldm-draft-header">
              <div className="ldm-draft-pick">
                <Swords className="w-4 h-4" />
                <span>HEAD-TO-HEAD &middot; GAME {duelGameLog.length + 1} (Bo{duelBestOf})</span>
              </div>
              <span className="ldm-draft-role" style={{ color: "#FBBF24" }}>
                Giliran {duelTurn === "A" ? teamAData.name : teamBData.name}
              </span>
              </div>

            <p className="ldm-text">
              {duelTurn === "A" ? teamAData.name : teamBData.name} pilih meta & susunan pemain dulu, abis itu oper device.
            </p>

            <div className="ldm-formation-note">
              Skor sementara: {teamAData.name} <strong style={{ color: "#FBBF24" }}>{duelWins.a}</strong> – <strong style={{ color: "#FBBF24" }}>{duelWins.b}</strong> {teamBData.name}
            </div>

            {renderDuelSquadManager(duelTurn)}

            <CounterCycleLegend />
            <label className="ldm-label">Pilih Meta</label>
            {renderDuelFormationGrid(duelTurn)}

            <button
              onClick={() => (duelTurn === "A" ? setDuelTurn("B") : (() => {
                const tA = getDuelTeamObj("A");
                const tB = getDuelTeamObj("B");
                startMatchSimulation(tA.name, tB.name, effectivePower(tA, tB), effectivePower(tB, tA), playDuelGame);
              })())}
              className="ldm-btn-primary"
              >
              {duelTurn === "A" ? `LANJUT: GILIRAN ${teamBData.name}` : `MULAI GAME ${duelGameLog.length + 1}`} <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {phase === "duelGameResult" && duelGameLog.length > 0 && teamAData && teamBData && (() => {
          const last = duelGameLog[duelGameLog.length - 1];
          const winnerName = last.winner === "A" ? teamAData.name : teamBData.name;
          return (
            <div className="ldm-card">
              <div className="ldm-trophy-card" style={{ border: "1px solid rgba(251,191,36,0.4)", background: "linear-gradient(135deg, rgba(251,191,36,0.16), rgba(19,24,41,0.4))", marginBottom: "20px" }}>
                <div className="ldm-trophy-icon" style={{ background: "rgba(251,191,36,0.16)", animation: "none" }}>
                  <Trophy className="w-9 h-9" style={{ color: "#FBBF24" }} />
                </div>
                <div>
                   <div className="ldm-trophy-label">Game {last.gameNumber}</div>
                  <div className="ldm-trophy-name">{winnerName} Menang</div>
                  <div className="ldm-trophy-sub">
                    {teamAData.name} {duelWins.a} – {duelWins.b} {teamBData.name} &middot; meta {last.formationA} vs {last.formationB}
                  </div>
                </div>
              </div>
              <button onClick={() => { setDuelTurn((last.gameNumber + 1) % 2 === 0 ? "B" : "A"); setPhase("duelPrep"); }} className="ldm-btn-primary">
                LANJUT KE GAME {last.gameNumber + 1} <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          );
        })()}
{phase === "duelResult" && teamAData && teamBData && (() => {
          const championName = duelWins.a > duelWins.b ? teamAData.name : teamBData.name;
          return (
            <div>
              <div className="ldm-trophy-card" style={{ border: "1px solid rgba(251,191,36,0.5)", background: "linear-gradient(135deg, rgba(251,191,36,0.2), rgba(19,24,41,0.4))" }}>
                <div className="ldm-trophy-glow-bg" />
                <div className="ldm-trophy-icon">
                  <Trophy className="w-9 h-9" style={{ color: "#FBBF24" }} />
                </div>
                <div style={{ position: "relative" }}>
                  <div className="ldm-trophy-label">Hasil Head-to-Head</div>
                  <div className="ldm-trophy-name" style={{ fontSize: "28px" }}>🏆 {championName}</div>
                  <div className="ldm-trophy-sub">{teamAData.name} {duelWins.a} – {duelWins.b} {teamBData.name}</div>
                </div>
              </div>
 <div className="ldm-standings-card" style={{ padding: "16px" }}>
                <div className="ldm-squad-label" style={{ marginBottom: "12px" }}>Rincian Per Game</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {duelGameLog.map((g) => (
                    <div key={g.gameNumber} className="ldm-match-card" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "11px", color: "#64748B", width: "60px" }}>Game {g.gameNumber}</span>
                      <span className="ldm-match-team" style={{ width: "auto", flex: 1 }}>{teamAData.name} ({g.formationA})</span>
                      <span className="ldm-match-score">{g.winner === "A" ? "W" : "L"}-{g.winner === "B" ? "W" : "L"}</span>
                      <span className="ldm-match-team" style={{ width: "auto", flex: 1 }}>{teamBData.name} ({g.formationB})</span>
                    </div>
                  ))}
                </div>
              </div>
               <button onClick={startNewGame} className="ldm-btn-secondary" style={{ marginTop: "20px" }}>
                <RotateCcw className="w-4 h-4" /> MAIN LAGI
              </button>
            </div>
          );
        })()}
      </div>

      <TeamRosterModal team={viewingRosterTeam} onClose={() => setViewingRosterTeam(null)} />
    </div>
  );
}
