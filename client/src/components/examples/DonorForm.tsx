import DonorForm from '../DonorForm';

export default function DonorFormExample() {
  return (
    <div className="max-w-2xl p-6">
      <DonorForm
        onSubmit={(data) => console.log('Donor submitted:', data)}
        isLoading={false}
      />
    </div>
  );
}
