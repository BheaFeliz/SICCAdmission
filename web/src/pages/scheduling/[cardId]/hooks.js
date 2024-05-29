import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { useSchedule } from '@/hooks/redux/useSchedule'; // Adjust the path as needed

const useCardDetailsHooks = () => {
  const router = useRouter();
  const { cardId } = router.query;

  const { schedule: cardData, error, isLoading } = useSchedule(cardId);

  const breadcrumbs = useMemo(() => [
    { title: 'Home', href: '/' },
    { title: 'Card Details', href: `/cards/${cardId}` }
  ], [cardId]);

  const handleDeleteCard = (cardId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this card?");
    if (confirmDelete) {
      // Implement delete functionality here
      console.log('Deleting card:', cardId);
      // You might need to dispatch a Redux action to delete the card
    }
  };

  return {
    cardData,
    isLoading,
    error,
    breadcrumbs,
    handleDeleteCard,
  };
};

export default useCardDetailsHooks;
