export interface PaymentSystem {
  id: string;
  name: string;
  emoji: string;
  minWithdrawal: number;
  fee: number;
  feeType: 'fixed' | 'percentage';
}

export const PAYMENT_SYSTEMS: PaymentSystem[] = [
  { id: 'mgb_wallet', name: 'MGB', emoji: '💰', minWithdrawal: 500000, fee: 0, feeType: 'fixed' }
];
