import React, { FC } from 'react';
import { useTelegram } from '../../../../hooks/useTelegram';
import { FlexBoxCol } from '../../../../components/styled/styled';

const UserInfo: FC = () => {
  const { tg } = useTelegram();

  return (
    <FlexBoxCol>
      <div style={{ width: 100, height: 100, margin: '0 auto', borderRadius: '50%', overflow: 'hidden' }}>
        <img
          style={{ width: 'auto', maxHeight: '100%', maxWidth: '100%' }}
          src={tg.initDataUnsafe.user?.photo_url || '/img/user.png'}
          alt=""
        />
      </div>
      <span
        style={{
          textAlign: 'center',
          marginTop: 16,
          fontSize: 22,
          fontWeight: 500,
        }}
      >
        {tg.initDataUnsafe.user?.first_name || 'John'} {tg.initDataUnsafe.user?.last_name || 'Joe'}
      </span>
    </FlexBoxCol>
  );
};

export default UserInfo;
