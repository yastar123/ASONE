import { describe, expect, it } from 'vitest';
import { product, describePh } from '@/lib/product-data';

describe('Seller product specifications', () => {
  it('does not use electricity', () => expect(product.usesElectricity).toBe(false));
  it('uses Tritan plastic as its main material', () => expect(product.mainMaterial).toBe('Plastik Tritan'));
  it('operates through filtration', () => expect(product.operatingSystem).toBe('Penyaringan'));
  it('contains the three supplied filter media', () => expect(product.filterMedia).toEqual(['Arang aktif', 'Bio keramik', 'Bio alkaline']));
  it('has a 3.2 liter capacity', () => expect(product.capacityLiters).toBe(3.2));
  it('identifies pH 9 as a seller claim', () => expect(product.claimedPh).toBe(9));
  it('has the supplied box dimensions', () => expect(product.boxDimensionsCm).toEqual([26, 16, 27]));
  it('does not allow use for babies', () => expect(product.allowedForBabies).toBe(false));
  it('prohibits the supplied beverages while the cartridge is installed', () => expect(product.prohibitedWithCartridge).toEqual(['Minuman berkarbonasi', 'Susu', 'Kopi', 'Teh']));
  it('sends purchase to the supplied Shopee product', () => expect(new URL(product.purchaseUrl).pathname).toBe('/product/586916982/52203218935'));
});
describe('pH classification', () => {
  it('classifies neutral pH 7', () => expect(describePh(7).label).toBe('Netral'));
  it('classifies pH 6 as acidic', () => expect(describePh(6).label).toBe('Asam'));
  it('classifies pH 9 as alkaline', () => expect(describePh(9).label).toBe('Basa / alkali'));
});