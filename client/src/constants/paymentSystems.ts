export interface PaymentSystem {
  id: string;
  name: string;
  emoji: string;
  minWithdrawal: number;
  fee: number;
  feeType: 'fixed' | 'percentage';
}

export const PAYMENT_SYSTEMS: PaymentSystem[] = [
  { id: 'ton_coin', name: 'TON Coin', emoji: '💎', minWithdrawal: 4.0, fee: 4, feeType: 'percentage' }
];
