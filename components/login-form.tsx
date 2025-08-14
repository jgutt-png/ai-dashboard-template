'use client';

import { motion } from 'framer-motion';
import { AuroraBackground } from './aurora-background';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { UserAuthForm } from './user-auth-form';

export default function LoginForm() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="relative flex flex-col items-center justify-center gap-4 px-4">
        <Card className="mx-auto w-full max-w-md shadow-xl border-0 bg-background/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-center text-2xl font-semibold tracking-tight">
              Welcome back
            </CardTitle>
            <CardDescription className="text-center text-sm text-muted-foreground">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <UserAuthForm />
          </CardContent>
        </Card>
      </motion.div>
    </AuroraBackground>
  );
}
