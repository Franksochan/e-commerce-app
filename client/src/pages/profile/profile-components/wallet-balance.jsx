import { getUserProfile } from '../../../../hooks/useGetProfile';

export const WalletBalance = () => {
  const { user } = getUserProfile()
  return (
    <div>
      <p> Money : ${user.money}</p>
    </div>
  )
}