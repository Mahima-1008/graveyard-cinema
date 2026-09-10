import { useNavigate } from 'react-router-dom';
import { EmptyState } from '@/components/common';
import { ROUTES } from '@/routes/routes';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] p-8 mt-14 md:mt-20">
      <EmptyState 
        title="404 - The Void" 
        description="You have wandered too far from the path. This page does not exist."
        actionLabel="Flee to Safety"
        onAction={() => navigate(ROUTES.HOME)}
      />
    </div>
  );
}
