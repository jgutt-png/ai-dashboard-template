import { GlassmorphicNavbar } from '@/components/glassmorphic-navbar';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CopyIcon } from 'lucide-react';

export const metadata = {
  title: 'Image Generation',
  description: 'Generate images using AI',
};

export default function ImageGeneration() {
  return (
    <>
      <GlassmorphicNavbar 
        title="Image Generation" 
        description="Create stunning AI-generated images from text prompts"
      />
      <div className="flex-1 grid lg:grid-cols-[1fr_380px] bg-transparent min-h-[calc(100vh-4rem)]">
        <div className="flex flex-col">
          <div className="flex-1 p-6">
            <div className="flex h-[calc(100vh-8rem)] items-center justify-center rounded-xl border-2 border-dashed border-muted bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm shadow-sm">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="p-4 rounded-full bg-primary/10">
                  <Icons.imagePlaceHolder className="h-20 w-20 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="text-base font-medium">Your generated image will appear here</p>
                  <p className="text-sm text-muted-foreground max-w-sm">Enter a detailed prompt and click generate to create stunning AI artwork</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-l bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm">
          <div className="flex h-[calc(100vh-4rem)] flex-col gap-6 p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Generate Image</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="model" className="text-sm font-medium">Model</Label>
                    <Select defaultValue="stable-diffusion">
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stable-diffusion">
                          Stable Diffusion
                        </SelectItem>
                        <SelectItem value="dall-e">DALL-E</SelectItem>
                        <SelectItem value="midjourney">Midjourney</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prompt" className="text-sm font-medium">Prompt</Label>
                    <Textarea
                      id="prompt"
                      placeholder="Describe the image you want to generate..."
                      rows={3}
                      className="resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="width" className="text-sm font-medium">Width</Label>
                      <Input id="width" type="number" defaultValue={512} className="h-9" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height" className="text-sm font-medium">Height</Label>
                      <Input id="height" type="number" defaultValue={512} className="h-9" />
                    </div>
                  </div>
                  <Button className="w-full font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg" size="lg">
                    Generate Image
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 min-h-0">
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                  <div className="w-1 h-4 bg-primary rounded-full"></div>
                  Recent Generations
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {[
                    { title: 'A beautiful sunset landscape', date: '2024-06-22' },
                    { title: 'Futuristic city with neon lights', date: '2024-06-21' },
                    { title: 'Abstract surreal portrait art', date: '2024-06-20' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/10 dark:bg-gray-800/10 hover:bg-white/20 dark:hover:bg-gray-700/20 transition-colors border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center shrink-0">
                        <Icons.imagePlaceHolder className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{item.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {item.date}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="shrink-0">
                        <CopyIcon className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
