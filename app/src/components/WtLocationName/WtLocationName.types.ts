import { WtLoadableProps } from '@/components/components.types';

export interface WtLocationNameProps extends WtLoadableProps {
  name: string;
  region?: string;
  country: string;
}
