import { FadeIn, SplitText } from "../components/ui";

export function Accounts() {
  return (
    <div className="p-6">
      <FadeIn direction="down">
        <SplitText className="text-3xl font-bold text-gray-900 mb-6">
          Accounts
        </SplitText>
        <p className="text-gray-600">
          Manage your connected bank accounts and view balances.
        </p>
      </FadeIn>

      <div className="mt-8 text-center">
        <p className="text-gray-500">🚧 Coming Soon</p>
      </div>
    </div>
  );
}
