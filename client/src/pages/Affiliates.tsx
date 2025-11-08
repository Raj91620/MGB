import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { showNotification } from '@/components/AppNotification';
import Layout from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { Copy, UserPlus, Users } from 'lucide-react';

interface User {
  id: string;
  username?: string;
  firstName?: string;
  referralCode?: string;
  [key: string]: any;
}

interface ReferralStats {
  referralCount: number;
  referralEarnings: string;
  level1Earnings: string;
}

interface Referral {
  id: string;
  referredUserId: string;
  referredUser?: {
    firstName?: string;
    username?: string;
    totalEarned?: string;
  };
}

export default function Affiliates() {
  const { user: authUser } = useAuth();
  
  const { data: user, isLoading: userLoading } = useQuery<User>({
    queryKey: ['/api/auth/user'],
    retry: false,
  });

  const { data: stats, isLoading: statsLoading } = useQuery<ReferralStats>({
    queryKey: ['/api/referrals/stats'],
    retry: false,
  });

  const { data: referrals = [], isLoading: referralsLoading } = useQuery<Referral[]>({
    queryKey: ['/api/referrals/list'],
    retry: false,
  });

  const isLoading = userLoading || statsLoading;

  const botUsername = import.meta.env.VITE_BOT_USERNAME || 'ManiGainBot';
  const referralLink = user?.referralCode 
    ? `https://t.me/${botUsername}?start=${user.referralCode}`
    : '';

  const copyReferralLink = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      showNotification('Copied!', 'success');
    }
  };

  const inviteFriend = () => {
    if (referralLink && window.Telegram?.WebApp?.openTelegramLink) {
      const shareText = `Join me and earn MGB rewards! 💰`;
      window.Telegram.WebApp.openTelegramLink(
        `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(shareText)}`
      );
    } else {
      copyReferralLink();
    }
  };

  const totalEarned = Math.round(parseFloat(stats?.level1Earnings || '0') * 500000);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin text-primary text-3xl mb-4">
              <i className="fas fa-spinner"></i>
            </div>
            <div className="text-foreground font-medium">Loading...</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="max-w-md mx-auto px-4 pb-24 pt-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <Users className="w-8 h-8 text-emerald-400" />
            Invite Friends!
          </h1>
          <p className="text-sm text-emerald-300/80 font-medium">Invite friends and earn 10% MGB from their ad income!</p>
          <p className="text-xs text-muted-foreground mt-1">Build your team and grow your passive earnings</p>
        </div>

        <Card className="mb-4 bg-gradient-to-br from-emerald-900/40 via-teal-900/30 to-green-900/40 border border-emerald-500/30 rounded-2xl shadow-xl backdrop-blur-sm hover:scale-[1.01] transition-all duration-300">
          <CardContent className="pt-5 pb-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-emerald-500/20">
                <div className="text-xs text-emerald-300 mb-2 font-medium">Total Friends</div>
                <div className="text-3xl font-bold text-white mb-1">{stats?.referralCount || 0}</div>
                <div className="text-[10px] text-emerald-400">Active Referrals</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-teal-500/20">
                <div className="text-xs text-teal-300 mb-2 font-medium">Total Earned</div>
                <div className="text-3xl font-bold text-white mb-1">{totalEarned.toLocaleString()}</div>
                <div className="text-[10px] text-teal-400">MGB Rewards</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works Card */}
        <Card className="mb-4 bg-gradient-to-br from-violet-900/40 via-purple-900/30 to-fuchsia-900/40 border border-violet-500/30 rounded-2xl shadow-xl backdrop-blur-sm">
          <CardContent className="pt-4 pb-4">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-lg">💡</span>
              How Referral Works
            </h3>
            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex items-start gap-2 p-2 bg-white/5 rounded-lg">
                <span className="text-violet-400 font-bold">1.</span>
                <span>Share your unique referral link with friends</span>
              </div>
              <div className="flex items-start gap-2 p-2 bg-white/5 rounded-lg">
                <span className="text-violet-400 font-bold">2.</span>
                <span>When they join and watch ads, you earn 10% of their income</span>
              </div>
              <div className="flex items-start gap-2 p-2 bg-white/5 rounded-lg">
                <span className="text-violet-400 font-bold">3.</span>
                <span>Earnings are automatically added to your balance</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Share Buttons */}
        <Card className="mb-4 bg-gradient-to-br from-blue-900/40 via-indigo-900/30 to-purple-900/40 border border-blue-500/30 rounded-2xl shadow-xl backdrop-blur-sm">
          <CardContent className="pt-5 pb-5">
            <h3 className="text-sm font-bold text-white mb-3 text-center">Share Your Link</h3>
            <div className="flex gap-4 justify-center mb-3">
              <div className="text-center">
                <Button
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/30 to-cyan-500/30 border border-blue-400/50 hover:from-blue-400/40 hover:to-cyan-400/40 hover:scale-110 transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                  onClick={inviteFriend}
                  disabled={!referralLink}
                >
                  <UserPlus className="w-7 h-7 text-blue-200" />
                </Button>
                <p className="text-[10px] text-blue-300 mt-1 font-medium">Invite</p>
              </div>
              
              <div className="text-center">
                <Button
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 border border-purple-400/50 hover:from-purple-400/40 hover:to-pink-400/40 hover:scale-110 transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40"
                  onClick={copyReferralLink}
                  disabled={!referralLink}
                >
                  <Copy className="w-7 h-7 text-purple-200" />
                </Button>
                <p className="text-[10px] text-purple-300 mt-1 font-medium">Copy Link</p>
              </div>
            </div>
            {referralLink && (
              <div className="bg-black/30 rounded-lg p-2 text-center">
                <p className="text-[10px] text-gray-400 mb-1">Your Referral Code</p>
                <p className="text-sm font-mono font-bold text-cyan-400">{user?.referralCode}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Friends List */}
        {referrals && referrals.length > 0 ? (
          <Card className="bg-gradient-to-br from-slate-900/40 to-gray-900/40 border border-slate-500/30 rounded-2xl shadow-xl backdrop-blur-sm">
            <CardContent className="pt-4 pb-4">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-400" />
                  Your Team ({referrals.length})
                </span>
                <span className="text-xs text-emerald-400">Active</span>
              </h3>
              <div className="space-y-2">
                {referrals.map((referral) => {
                  const friendName = referral.referredUser?.firstName || 
                                    referral.referredUser?.username || 
                                    'User';
                  const mgbEarned = Math.round(parseFloat(referral.referredUser?.totalEarned || '0') * 500000 * 0.1);
                  
                  return (
                    <div key={referral.id} className="flex justify-between items-center py-3 px-3 border-b border-border last:border-0 bg-white/5 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all">
                      <span className="text-white font-medium">{friendName}</span>
                      <span className="text-emerald-400 text-sm font-semibold">+{mgbEarned.toLocaleString()} MGB</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-gradient-to-br from-slate-900/40 to-gray-900/40 border border-slate-500/30 rounded-2xl shadow-xl backdrop-blur-sm">
            <CardContent className="pt-8 pb-8 text-center">
              <Users className="w-16 h-16 mx-auto mb-3 text-slate-600" />
              <h3 className="text-base font-bold text-white mb-2">No Referrals Yet</h3>
              <p className="text-sm text-muted-foreground mb-4">Start inviting friends to build your earning team!</p>
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3">
                <p className="text-xs text-emerald-300">💰 Earn 10% from every friend's ad income</p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </Layout>
  );
}
