import FormEditor from '@/components/form-editor/FormEditor';
import BackButton from '@/components/ui/back-button';

export default async function FormEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <BackButton backTo="/dashboard" />
      <p>{id}</p>;
      <FormEditor />
    </div>
  );
}
