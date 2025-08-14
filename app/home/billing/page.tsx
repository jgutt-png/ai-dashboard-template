import { GlassmorphicNavbar } from '@/components/glassmorphic-navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckIcon, ShoppingCartIcon } from 'lucide-react';

export const metadata = {
  title: 'Billing - AI tool layout',
  description: 'Manage your subscription and payment details.',
};

export default function Billing() {
  return (
    <>
      <GlassmorphicNavbar 
        title="Billing" 
        description="Manage your subscription and payment details"
      >
        <Button size="sm">
          <ShoppingCartIcon className="mr-2 h-4 w-4" />
          Upgrade Plan
        </Button>
      </GlassmorphicNavbar>

      <div className="flex-1 p-6 space-y-8 bg-transparent overflow-auto min-h-[calc(100vh-4rem)]">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Subscription Plans</h2>
            <p className="text-muted-foreground mb-6">Choose the plan that best fits your needs</p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="relative">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Starter</CardTitle>
                    <div className="rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
                      Current
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">$9</span>
                    <span className="text-sm text-muted-foreground ml-1">
                      /month
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckIcon className="h-4 w-4 text-green-600 shrink-0" />
                    <span className="text-sm">1 user</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckIcon className="h-4 w-4 text-green-600 shrink-0" />
                    <span className="text-sm">1 GB storage</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckIcon className="h-4 w-4 text-green-600 shrink-0" />
                    <span className="text-sm">Basic support</span>
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button variant="outline" className="w-full">
                    Current Plan
                  </Button>
                </div>
              </Card>

              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Pro</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">$29</span>
                    <span className="text-sm text-muted-foreground ml-1">
                      /month
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckIcon className="h-4 w-4 text-green-600 shrink-0" />
                    <span className="text-sm">5 users</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckIcon className="h-4 w-4 text-green-600 shrink-0" />
                    <span className="text-sm">10 GB storage</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckIcon className="h-4 w-4 text-green-600 shrink-0" />
                    <span className="text-sm">Priority support</span>
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button className="w-full">
                    Upgrade to Pro
                  </Button>
                </div>
              </Card>

              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Enterprise</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">$99</span>
                    <span className="text-sm text-muted-foreground ml-1">
                      /month
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckIcon className="h-4 w-4 text-green-600 shrink-0" />
                    <span className="text-sm">Unlimited users</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckIcon className="h-4 w-4 text-green-600 shrink-0" />
                    <span className="text-sm">Unlimited storage</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckIcon className="h-4 w-4 text-green-600 shrink-0" />
                    <span className="text-sm">Enterprise support</span>
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button variant="outline" className="w-full">
                    Contact Sales
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-blue-900 dark:text-blue-100">Need Help?</CardTitle>
              <CardDescription className="text-blue-700 dark:text-blue-300">
                Our support team is here to assist you with any billing questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">
                If you have any questions about your subscription, billing, or need assistance with your account, please don&apos;t hesitate to reach out to our support team.
              </p>
              <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
