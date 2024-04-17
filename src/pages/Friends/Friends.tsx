import { PageWrapper } from '../../components/styled/styled';
import { useFriendsCountQuery, useReferFriendMutation } from '../../App.operations.generated';
import { useTelegram } from '../../hooks/useTelegram';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Friends = () => {
  const { data: friendsCountData } = useFriendsCountQuery({ fetchPolicy: 'cache-and-network' });
  const [referRequest] = useReferFriendMutation();
  const { tg } = useTelegram();
  const navigate = useNavigate();

  const referFriend = async () => {
    await referRequest({ fetchPolicy: 'no-cache' });
  };

  useEffect(() => {
    tg.BackButton.onClick(() => navigate(-1));
    tg.BackButton.show();

    tg.MainButton.text = 'Get the referral link';
    tg.MainButton.onClick(referFriend);
    tg.MainButton.show();

    return () => {
      tg.MainButton.hide();
      tg.BackButton.hide();
    };
  }, []);

  return (
    <PageWrapper>
      <span>Invite a friends and earn 500 coins immediately and 20% from the cost of each their caught fish!</span>
      <span>Total friends: {friendsCountData?.friendsCount || 0}</span>
    </PageWrapper>
  );
};

export default Friends;
