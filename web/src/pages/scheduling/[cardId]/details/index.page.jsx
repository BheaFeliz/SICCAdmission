// pages/cards/[cardId]/details.js

import { useRouter } from 'next/router';

import RoomDetails from '@/components/organisms/RoomDetails';

const CardDetailsPage = () => {
  const router = useRouter();
  const { cardId } = router.query;

  if (!cardId) return <div>Loading...</div>;

  return (
    <RoomDetails cardId={cardId} closeDetails={() => router.push('/scheduling')} />
  );
};

export default CardDetailsPage;
