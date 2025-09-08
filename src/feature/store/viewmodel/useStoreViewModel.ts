import { useState } from 'react';
import StoreViewModel from './StoreViewModel';

export const useStoreViewModel = () => {
  const [viewModel] = useState(() => new StoreViewModel());
  return viewModel;
};
