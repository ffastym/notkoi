import { useCallback, useEffect } from 'react';
import { useTelegram } from './useTelegram';
import { useNavigate } from 'react-router-dom';

export function useBackButton() {
  const { tg } = useTelegram();
  const navigate = useNavigate();
  const handleGoBack = useCallback(() => navigate(-1), [navigate]);

  useEffect(() => {
    tg.onEvent('backButtonClicked', handleGoBack);

    if (!tg.BackButton.isVisible) {
      tg.BackButton.show();
    }

    return () => {
      tg.offEvent('backButtonClicked', handleGoBack);

      if (tg.BackButton.isVisible) {
        tg.BackButton.hide();
      }
    };
  }, [handleGoBack, navigate, tg, tg.BackButton]);
}
