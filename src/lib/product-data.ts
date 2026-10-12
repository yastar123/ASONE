export const product = {
  capacityLiters: 3.2,
  claimedPh: 9,
  usesElectricity: false,
  mainMaterial: "Plastik Tritan",
  operatingSystem: "Penyaringan",
  filterMedia: ["Arang aktif", "Bio keramik", "Bio alkaline"],
  boxDimensionsCm: [26, 16, 27],
  purchaseUrl:
    "https://shopee.co.id/product/586916982/52203218935?d_id=1c878&uls_trackid=56rsji9m05k0&utm_content=3Wp7jgrxkh9KgqCfMXKoYEi1HCRd&is_from_login=true",
  allowedForBabies: false,
  prohibitedWithCartridge: ["Minuman berkarbonasi", "Susu", "Kopi", "Teh"],
} as const;

export function describePh(ph: number) {
  if (ph < 7)
    return {
      label: "Asam",
      explanation:
        "Nilai di bawah 7 menunjukkan sifat asam. Nilai pH saja tidak menentukan keamanan air minum.",
    };
  if (ph === 7)
    return {
      label: "Netral",
      explanation:
        "pH 7 bersifat netral. Air yang jernih dan netral tetap perlu memenuhi persyaratan mikrobiologi dan kimia.",
    };
  return {
    label: "Basa / alkali",
    explanation:
      "Nilai di atas 7 menunjukkan sifat basa. Semakin tinggi pH tidak berarti air semakin sehat atau aman.",
  };
}
