import WtSuspenseWrapper from '@/components/WtSuspenseWrapper/WtSuspenseWrapper';
import WtDetailsMain from '@/modules/details/WtDetailsMain/WtDetailsMain';

export default function Details() {
  return (
    <WtSuspenseWrapper>
      <WtDetailsMain />
    </WtSuspenseWrapper>
  );
}
