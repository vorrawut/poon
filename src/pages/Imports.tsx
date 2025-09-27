import { FadeIn, SplitText } from '../components/ui';

export function Imports() {
  return (
    <div className="p-6">
      <FadeIn direction="down">
        <SplitText className="text-3xl font-bold text-gray-900 mb-6">
          Import Data
        </SplitText>
        <p className="text-gray-600">Import transactions from CSV files or connect bank accounts.</p>
      </FadeIn>
      
      <div className="mt-8 text-center">
        <p className="text-gray-500">🚧 Coming Soon</p>
      </div>
    </div>
  );
}
