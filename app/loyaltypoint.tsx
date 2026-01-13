import React, { useState, useEffect } from 'react';
import api from './api/axios';
import { IoTrophyOutline, IoStarOutline } from 'react-icons/io5';

interface LoyaltyData {
  total_points: number;
  lifetime_points: number;
  tier: string;
}

interface Transaction {
  id: number;
  points: number;
  transaction_type: string;
  reason: string;
  created_at: string;
}

const LoyaltyPoints: React.FC = () => {
  const [loyalty, setLoyalty] = useState<LoyaltyData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLoyaltyData();
  }, []);

  const fetchLoyaltyData = async () => {
    try {
      const [loyaltyRes, transactionsRes] = await Promise.all([
        api.get('/auth/loyalty/my_points/'),
        api.get('/auth/loyalty/transactions/')
      ]);
      
      setLoyalty(loyaltyRes.data);
      setTransactions(transactionsRes.data);
    } catch (error) {
      console.error('Error fetching loyalty data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'platinum':
        return 'from-purple-400 to-purple-600';
      case 'gold':
        return 'from-yellow-400 to-yellow-600';
      case 'silver':
        return 'from-gray-300 to-gray-500';
      default:
        return 'from-orange-400 to-orange-600';
    }
  };

  const getTierBenefits = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'platinum':
        return ['15% discount', 'Free shipping', 'Priority support', 'Exclusive access'];
      case 'gold':
        return ['10% discount', 'Free shipping', 'Priority support'];
      case 'silver':
        return ['5% discount', 'Free shipping on orders over ₦50,000'];
      default:
        return ['Earn points on purchases', 'Birthday bonus'];
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse bg-white rounded-xl shadow-lg p-6">
        <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!loyalty) return null;

  return (
    <div className="space-y-6">
      {/* Loyalty Card */}
      <div className={`bg-gradient-to-br ${getTierColor(loyalty.tier)} rounded-2xl shadow-2xl p-8 text-white`}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-white/80 text-sm uppercase tracking-wide mb-1">Loyalty Tier</p>
            <h2 className="text-4xl font-bold capitalize">{loyalty.tier}</h2>
          </div>
          <IoTrophyOutline className="text-5xl text-white/30" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-white/80 text-sm mb-1">Available Points</p>
            <p className="text-3xl font-bold">{loyalty.total_points.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-white/80 text-sm mb-1">Lifetime Points</p>
            <p className="text-3xl font-bold">{loyalty.lifetime_points.toLocaleString()}</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/20">
          <p className="text-white/80 text-sm mb-2">Your Benefits</p>
          <div className="flex flex-wrap gap-2">
            {getTierBenefits(loyalty.tier).map((benefit, index) => (
              <span
                key={index}
                className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs"
              >
                {benefit}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      {transactions.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-rose-900 mb-4 flex items-center gap-2">
            <IoStarOutline className="text-rose-600" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex justify-between items-center p-3 bg-rose-50 rounded-lg"
              >
                <div>
                  <p className="font-semibold text-gray-900">{transaction.reason}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(transaction.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className={`text-lg font-bold ${
                  transaction.transaction_type === 'earn' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.transaction_type === 'earn' ? '+' : '-'}
                  {transaction.points}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tier Progress */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-rose-900 mb-4">Next Tier Progress</h3>
        <div className="space-y-4">
          {['Bronze', 'Silver', 'Gold', 'Platinum'].map((tier, index) => {
            const thresholds = [0, 20000, 50000, 100000];
            const isCurrentTier = tier.toLowerCase() === loyalty.tier.toLowerCase();
            const isPastTier = thresholds[index] < loyalty.lifetime_points;
            
            return (
              <div key={tier} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isPastTier || isCurrentTier
                    ? 'bg-rose-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {isPastTier && !isCurrentTier ? '✓' : index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className={`font-semibold ${isCurrentTier ? 'text-rose-600' : 'text-gray-700'}`}>
                      {tier}
                    </span>
                    <span className="text-sm text-gray-600">
                      {thresholds[index].toLocaleString()} points
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isPastTier || isCurrentTier ? 'bg-rose-600' : 'bg-gray-300'
                      }`}
                      style={{
                        width: isPastTier
                          ? '100%'
                          : isCurrentTier
                          ? `${Math.min(100, (loyalty.lifetime_points / thresholds[index + 1 || index]) * 100)}%`
                          : '0%'
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LoyaltyPoints;