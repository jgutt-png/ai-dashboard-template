import { AIChatInterface } from '@/components/ai-chat-interface';
import { GlassmorphicNavbar } from '@/components/glassmorphic-navbar';

export const metadata = {
  title: 'AI Assistant',
  description: 'Your intelligent data companion',
};

export default async function Page() {
  return (
    <>
      <GlassmorphicNavbar 
        title="AI Assistant" 
        description="Your intelligent data companion"
      />
      <div className="flex-1 bg-transparent overflow-auto">
        <AIChatInterface />
      </div>
    </>
  );
}
